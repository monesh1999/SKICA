import React from "react";
import { useNavigate } from "react-router-dom";

const QuizHome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", flexDirection: "column", textAlign: "center" }}
    >
      <h1>Welcome to the SKICA</h1>
      <p>Test your aptitude and reasoning skills with real-time AI questions!</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/quiz/select")}>
        Start Quiz
      </button>
    </div>
  );
};

export default QuizHome;
