package com.monesh.Skyca.service;



import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.monesh.Skyca.entity.QuizQuestion;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class QuizService {

    private static final Logger log = LoggerFactory.getLogger(QuizService.class);

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public QuizService(WebClient.Builder builder, ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;

        HttpClient httpClient = HttpClient.create()
                .responseTimeout(Duration.ofSeconds(60));

        this.webClient = builder
                .baseUrl("https://generativelanguage.googleapis.com/v1/")
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }

    public Mono<List<QuizQuestion>> generateQuiz(String category, String subTopic) {
        log.info("Generating quiz for category: '{}', subTopic: '{}'", category, subTopic);

        String modelName = "gemini-2.5-flash"; // Or your preferred model

        String prompt = "Generate 10 multiple-choice " + category + " questions on " + subTopic +
                ". Each should have 4 options, one correct answer, and a short explanation." +
                " Return JSON array with keys: question, options (array of strings), answer, explanation." +
                " IMPORTANT: Ensure the JSON is valid and NOT wrapped in markdown code block characters (```json```)."; // Added a hint to the prompt!

        String url = "models/" + modelName + ":generateContent?key=" + geminiApiKey;

        return webClient.post()
                .uri(url)
                .bodyValue(Map.of(
                        "contents", List.of(Map.of(
                                "parts", List.of(Map.of("text", prompt))
                        ))
                ))
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse ->
                    clientResponse.bodyToMono(String.class)
                                  .flatMap(errorBody -> {
                                      log.error("Gemini API (model '{}') returned error status {}: {}", modelName, clientResponse.statusCode(), errorBody);
                                      return Mono.error(new RuntimeException("Gemini API error for model '" + modelName + "': " + errorBody));
                                  })
                )
                .bodyToMono(String.class)
                .flatMap(this::parseGeminiResponse)
                .onErrorResume(e -> {
                    log.error("Error generating quiz for category '{}', subTopic '{}' with model '{}': {}", category, subTopic, modelName, e.getMessage());
                    return Mono.just(Collections.emptyList());
                });
    }

    /**
     * Parses the raw JSON string received from the Gemini API into a list of QuizQuestion objects.
     * **Updated to handle markdown code block wrapping.**
     */
    private Mono<List<QuizQuestion>> parseGeminiResponse(String geminiJsonResponse) {
        try {
            JsonNode rootNode = objectMapper.readTree(geminiJsonResponse);
            JsonNode textNode = rootNode.path("candidates")
                                        .path(0)
                                        .path("content")
                                        .path("parts")
                                        .path(0)
                                        .path("text");

            if (textNode.isMissingNode() || !textNode.isTextual()) {
                log.error("Could not find the 'text' field in Gemini API response or it's not textual: {}", geminiJsonResponse);
                return Mono.error(new RuntimeException("Invalid Gemini API response format: 'text' field missing or not text."));
            }

            String quizJsonArrayString = textNode.asText();
            log.debug("Extracted raw quiz JSON text: {}", quizJsonArrayString);

            // --- IMPORTANT NEW LOGIC HERE ---
            // Remove markdown code block wrappers if present
            if (quizJsonArrayString.startsWith("```json")) {
                int startIndex = quizJsonArrayString.indexOf("```json") + "```json".length();
                int endIndex = quizJsonArrayString.lastIndexOf("```");
                if (endIndex > startIndex) {
                    quizJsonArrayString = quizJsonArrayString.substring(startIndex, endIndex).trim();
                } else {
                    // Fallback if closing ``` is not found correctly, try to strip just the start
                    quizJsonArrayString = quizJsonArrayString.substring(startIndex).trim();
                }
                log.debug("Stripped markdown, final JSON string: {}", quizJsonArrayString);
            }
            // --- END NEW LOGIC ---

            CollectionType listType = objectMapper.getTypeFactory()
                                                  .constructCollectionType(List.class, QuizQuestion.class);
            List<QuizQuestion> questions = objectMapper.readValue(quizJsonArrayString, listType);

            return Mono.just(questions);

        } catch (JsonProcessingException e) {
            log.error("Failed to parse Gemini API JSON response: {}", geminiJsonResponse, e);
            return Mono.error(new RuntimeException("Failed to parse Gemini API response", e));
        } catch (Exception e) {
            log.error("An unexpected error occurred during Gemini response parsing: {}", geminiJsonResponse, e);
            return Mono.error(new RuntimeException("Unexpected error during Gemini response parsing", e));
        }
    }

    // ... (listAvailableModels method can stay or be removed) ...
}