package com.monesh.Skyca.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monesh.Skyca.entity.QuizQuestion;
import com.monesh.Skyca.service.QuizService;

import reactor.core.publisher.Mono;

import java.util.List;

@RestController
public class QuizController {

    private static final Logger log = LoggerFactory.getLogger(QuizController.class);

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/quiz")
    public Mono<ResponseEntity<List<QuizQuestion>>> generateQuiz(
            @RequestParam String category,
            @RequestParam String subTopic) {
        log.info("Received request to generate quiz for category: '{}', subTopic: '{}'", category, subTopic);

        return quizService.generateQuiz(category, subTopic)
                .map(quizQuestions -> {
                    if (quizQuestions.isEmpty()) {
                        log.warn("No quiz questions generated for category: '{}', subTopic: '{}'", category, subTopic);
                        return new ResponseEntity<>(quizQuestions, HttpStatus.NO_CONTENT);
                    }
                    log.info("Successfully generated {} quiz questions.", quizQuestions.size());
                    return new ResponseEntity<>(quizQuestions, HttpStatus.OK);
                })
                .onErrorResume(e -> {
                    log.error("Error generating quiz in controller: {}", e.getMessage());
                    return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
                });
    }

    
}