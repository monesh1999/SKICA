import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import './Quiz.css';
import { fetchQuiz } from "../../services/quizService";

const QuizPlay = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const category = query.get("category");
  const subTopic = query.get("subTopic");

  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const getQuiz = async () => {
      setLoading(true);
      const data = await fetchQuiz(category, subTopic);
      setQuiz(data);
      setLoading(false);
    };
    getQuiz();
  }, [category, subTopic]);

  useEffect(() => {
    if (!loading && quiz.length > 0) {
      setTimer(30);
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            handleAnswer(null); // skip question if time out
            return 30;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [index, loading, quiz]);

  const handleAnswer = (option) => {
    const currentQuestion = quiz[index];
    setUserAnswers([...userAnswers, { selected: option, correct: currentQuestion.answer }]);

    if (index + 1 < quiz.length) {
      setIndex(index + 1);
    } else {
      navigate("/quiz/result", { state: { quiz, userAnswers: [...userAnswers, { selected: option, correct: currentQuestion.answer }] } });
    }
  };

  if (loading) return <h3 className="text-center mt-5">Loading quiz...</h3>;
  if (quiz.length === 0) return <h3 className="text-center mt-5">No quiz available.</h3>;

  const q = quiz[index];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Question {index + 1} of {quiz.length}</h4>
        <div className="timer">{timer}s</div>
      </div>

      <div className="quiz-card">
        <p className="mb-4"><strong>{q.question}</strong></p>

        {q.options.map((option, idx) => (
          <button
            key={idx}
            className="btn btn-outline-primary d-block w-100 my-2 mx-4 quiz-option"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPlay;
