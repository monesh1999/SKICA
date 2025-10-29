import React from "react";
import { useNavigate } from "react-router-dom";
import "./Communication.css";

const Communication = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Communication",
      frontText: "Master effective communication.",
      backText:
        "Learn to express your ideas clearly with interactive speech, listening, and expression modules. Enhance your public speaking and confidence.",
      color: "primary",
      path: "/communicationdetails",
    },
    {
      title: "Soft Skills",
      frontText: "Develop essential soft skills.",
      backText:
        "Build teamwork, empathy, and leadership skills. Improve time management, adaptability, and professional behavior through engaging exercises.",
      color: "success",
      path: "/softskills-details",
    },
    {
      title: "Attitude",
      frontText: "Build a positive mindset.",
      backText:
        "Learn to handle challenges gracefully, stay optimistic, and maintain confidence even under pressure. Cultivate emotional intelligence and resilience.",
      color: "warning",
      path: "/attitude-details",
    },
  ];

  return (
    <div className="container  py-5">
      <h1 className="text-center mb-5 fw-bold text-light">
        Communication & Personality Growth
      </h1>
      <div className="row g-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
          >
            <div className={`flip-card border-0 shadow-lg`}>
              <div className="flip-card-inner">
                <div
                  className={`flip-card-front text-center text-light bg-${card.color} d-flex flex-column justify-content-center`}
                >
                  <h3 className="fw-bold">{card.title}</h3>
                  <p className="fs-5">{card.frontText}</p>
                </div>
                <div className="flip-card-back text-center text-dark d-flex flex-column justify-content-center">
                  <h4 className={`fw-bold text-${card.color}`}>{card.title}</h4>
                  <p className="px-3">{card.backText}</p>
                  <button
                    className={`btn btn-${card.color} mt-3 fw-bold`}
                    onClick={() => navigate(card.path)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communication;
