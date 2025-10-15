// src/pages/MainPage.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import QuizHome from "../pages/quiz/QuizHome";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import Entertainment from "../pages/Entertainment/Entertainment";
import "./MainPage.css";
import Communication from "../pages/Communication/Communication";

const MainPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeContent, setActiveContent] = useState(null);
  const { isLoggedIn, setIsLoggedIn, setUserData } = useContext(AppContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setActiveContent(null);
  };

  const handleLoadPage = (page) => {
    switch (page) {
      case "Aptitude":
        setActiveContent(<QuizHome category="Aptitude" />);
        break;
      case "Communication":
        setActiveContent(
          <Communication />
        );
        break;
      case "Entertainment":
        setActiveContent(<Entertainment category="Entertainment" />);
        break;
      default:
        setActiveContent(null);
    }
  };

  return (
    <div className="mainpage-container d-flex min-vh-100 flex-column flex-lg-row">
      {/* Sidebar */}
      <div
        className={`d-flex sidebarm flex-column justify-content-between sidebar-gradient ${
          sidebarVisible ? "" : "d-none"
        }`}
        style={{ minWidth: "220px", height: "100vh" }}
      >
        {/* Top Section: Logo + Menu */}
        <div>
          <div className="sidebar-heading border-bottom text-center py-3 rounded">
            <Link
              to="/"
              className="d-flex align-items-center justify-content-center text-decoration-none"
            >
              <img
                className="rounded-pill"
                src={assets.logo}
                alt="logo"
                width={80}
                height={75}
              />
              <span className="fw-bold fs-1 ms-2 text-light">SKICA</span>
            </Link>
          </div>
          <div className="list-group list-group-flush">
            <button
              className="list-group-item list-group-item-action p-3"
              onClick={() => handleLoadPage("Communication")}
            >
              <i className="bi bi-chat-left-text me-2"></i>Communication
            </button>

            <button
              className="list-group-item list-group-item-action p-3"
              onClick={() => handleLoadPage("Aptitude")}
            >
              <i className="bi bi-journal-text me-2"></i>Aptitude
            </button>

            <button
              className="list-group-item list-group-item-action p-3"
              onClick={() => handleLoadPage("Entertainment")}
            >
              <i className="bi bi-controller me-2"></i>Entertainment
            </button>
          </div>
        </div>

        {/* Bottom Section: Login / Logout */}
        <div className="p-3">
          {isLoggedIn ? (
            <button className="btn btn-danger w-100" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button
              className="btn btn-success w-100"
              onClick={() => setActiveContent(<div>Login Page</div>)}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Toggle Sidebar Button for small screens */}
      <button
        className="btn btn-primary m-2 d-lg-none align-self-start"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        {sidebarVisible ? "Close Menu" : "Open Menu"}
      </button>

      {/* Main Content */}
      <main className="flex-grow-1 main-content p-3 p-lg-4">
        {activeContent || (
              <div className="container my-5 ">
      <header className="text-center mb-5">
        <h1 className="display-4">Welcome to Skica</h1>
        <p className="lead">
          Skica is an interactive platform designed to enhance your communication skills, soft skills & attitude, aptitude, and entertainment abilities. Explore, learn, and grow with engaging exercises, puzzles, and tests.
        </p>
      </header>

      {/* Communication Section */}
      <section className="mb-5 p-4  rounded shadow-sm">
        <h2 className="mb-3">Communication</h2>
        <p>
          In this section, Skica helps you improve your communication abilities through interactive exercises focused on conversation, articulation, and language usage. Learn to express your thoughts clearly and effectively, whether in professional settings or casual interactions.
        </p>
        <ul>
          <li>Interactive conversation exercises</li>
          <li>Pronunciation and articulation practice</li>
          <li>Language enrichment and vocabulary growth</li>
          <li>Real-life scenario simulations</li>
        </ul>
        <img
          src="https://via.placeholder.com/600x200/007BFF/ffffff?text=Communication"
          alt="Communication"
          className="img-fluid rounded mt-3"
        />
      </section>

      {/* Soft Skills & Attitude Section */}
      <section className="mb-5 p-4  rounded shadow-sm">
        <h2 className="mb-3">Soft Skills & Attitude</h2>
        <p>
          Skica enables you to enhance your soft skills and professional attitude. This includes developing empathy, teamwork, leadership, and maintaining a positive mindset. Learn to handle criticism, manage stress, and present yourself with confidence.
        </p>
        <ul>
          <li>Teamwork and collaboration exercises</li>
          <li>Leadership skill enhancement</li>
          <li>Empathy and emotional intelligence modules</li>
          <li>Positive mindset and confidence building</li>
        </ul>
        <img
          src="https://via.placeholder.com/600x200/28A745/ffffff?text=Soft+Skills"
          alt="Soft Skills"
          className="img-fluid rounded mt-3"
        />
      </section>

      {/* Aptitude Section */}
      <section className="mb-5 p-4  rounded shadow-sm">
        <h2 className="mb-3">Aptitude</h2>
        <p>
          Test and sharpen your aptitude skills with Skica's timed quizzes. Complete 30-second challenges that assess your logic, numerical reasoning, and problem-solving skills. Instantly view your score and track improvement over time.
        </p>
        <ul>
          <li>Quick 30-second aptitude tests</li>
          <li>Instant score display</li>
          <li>Logical reasoning and numerical exercises</li>
          <li>Progress tracking and improvement tips</li>
        </ul>
        <img
          src="https://via.placeholder.com/600x200/FFC107/ffffff?text=Aptitude"
          alt="Aptitude"
          className="img-fluid rounded mt-3"
        />
      </section>

      {/* Entertainment & Puzzles Section */}
      <section className="mb-5 p-4  rounded shadow-sm">
        <h2 className="mb-3">Entertainment & Puzzles</h2>
        <p>
          Relax and sharpen your mind with Skica's entertainment section. Play puzzle games designed to improve focus, peace of mind, and mental sharpness. Fun and educational, these activities enhance cognitive skills while keeping you engaged.
        </p>
        <ul>
          <li>Mind-sharpening puzzle games</li>
          <li>Focus and concentration exercises</li>
          <li>Stress-relieving activities</li>
          <li>Interactive and engaging gameplay</li>
        </ul>
        <img
          src="https://via.placeholder.com/600x200/DC3545/ffffff?text=Entertainment"
          alt="Entertainment"
          className="img-fluid rounded mt-3"
        />
      </section>

      <footer className="text-center mt-5">
        <p className="text-muted">
          Skica - Your one-stop platform for communication, soft skills, aptitude, and entertainment development.
        </p>
      </footer>
    </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
