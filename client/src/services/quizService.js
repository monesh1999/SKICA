import axios from "axios";

const API_URL = "http://localhost:8082/api";

export const fetchQuiz = async (category, subTopic) => {
  try {
    const response = await axios.get(`${API_URL}/quiz`, {
      params: { category, subTopic },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return [];
  }
};
