import React, { useState } from "react";
import "./CommunicationDetails.css";
import { Button } from "react-bootstrap";
import logo from "../../../assets/logo.jpg";
import { FaMicrophone, FaBookOpen, FaPenFancy, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import SpeakingPage from "./SpeakingPage";
import ListeningPage from "./ListeningPage";
import ReadingView from "./ReadingView";
import WritingView from "./WritingView";

const CommunicationDetails = () => {
  // State to track which menu item is active
  const [activeTab, setActiveTab] = useState("Speak");

  // Content for each tab
  const renderContent = () => {
    switch (activeTab) {
      case "Speak":
        return <SpeakingPage/>;
      case "Learning":
        return <ListeningPage/>;
      case "Writing":
        return <WritingView/>;
      case "Reading":
        return <ReadingView />;
      default:
        return <div><h3>Welcome</h3><p>Select an option from the sidebar to start.</p></div>;
    }
  };

  return (
    <div className="comm-wrapper">
    <div className="comm-page1">
      {/* Sidebar */}
      <div className="sidebar1">
        <div className="logo-section">
         <Link
              to="/"
              className="d-flex align-items-center justify-content-center text-decoration-none"
            >
              <img
                className="rounded-pill"
                src={logo}
                alt="logo"
                width={190}
                height={100}
              />
              <span className="fw-bold fs-1 ms-2 text-light"></span>
            </Link>
        </div>

        <div className="menu-section">
          <Button
            variant="link"
            className={`menu-btn ${activeTab === "Speak" ? "active" : ""}`}
            onClick={() => setActiveTab("Speak")}
          >
            <FaMicrophone className="me-2" /> Speak
          </Button>

          <Button
            variant="link"
            className={`menu-btn ${activeTab === "Learning" ? "active" : ""}`}
            onClick={() => setActiveTab("Learning")}
          >
            <FaBookOpen className="me-2" /> Learning
          </Button>

          <Button
            variant="link"
            className={`menu-btn ${activeTab === "Writing" ? "active" : ""}`}
            onClick={() => setActiveTab("Writing")}
          >
            <FaPenFancy className="me-2" /> Writing
          </Button>

          <Button
            variant="link"
            className={`menu-btn ${activeTab === "Reading" ? "active" : ""}`}
            onClick={() => setActiveTab("Reading")}
          >
            <FaBook className="me-2" /> Reading
          </Button>
        </div>

        <div className="logout-section">
          <Button variant="danger" className="logout-btn">Logout</Button>
        </div>
      </div>

      {/* Right side content */}
      <div className="content">
        <div className="content-inner">
          {renderContent()}
        </div>
      </div>
    </div>
    </div>
  );
};

export default CommunicationDetails;
