import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Quiz.css';


const QuizResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const quiz = state?.quiz || [];
  const userAnswers = state?.userAnswers || [];

  const correctCount = userAnswers.filter((ans) => ans.selected === ans.correct).length;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Quiz Result</h2>

      <div className="d-flex justify-content-around mb-4">
        <div className="p-3 bg-success text-white rounded">Correct: {correctCount}</div>
        <div className="p-3 bg-danger text-white rounded">Wrong: {quiz.length - correctCount}</div>
        <div className="p-3 bg-info text-white rounded">Total Score: {correctCount}/{quiz.length}</div>
      </div>

      <h4 className="mb-3">Review Answers</h4>

      {quiz.map((q, idx) => (
        <div key={idx} className="result-card">
          <p><strong>Q{idx + 1}: {q.question}</strong></p>
          <p>Your Answer: <span className={userAnswers[idx].selected === q.answer ? "correct" : "wrong"}>{userAnswers[idx].selected || "No Answer"}</span></p>
          <p>Correct Answer: <span className="correct">{q.answer}</span></p>
          <p>Explanation: {q.explanation}</p>
        </div>
      ))}

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/explore")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
