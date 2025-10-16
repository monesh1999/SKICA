import React, { useEffect, useState, useContext, useRef } from "react";
import { Spinner, Button, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import softSkillService from "../../../services/softSkillService";
import { AppContext } from "../../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/logo.jpg";
import "./SoftSkillViewers.css";

const SoftSkillViewer = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const navigate = useNavigate();
  const cardRefs = useRef({});

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await softSkillService.getAll(token);
        setSkills(res.data);
      } catch (err) {
        toast.error("Failed to load soft skills");
      } finally {
        setLoading(false);
      }
    };
    if (isLoggedIn) fetchSkills();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSkillClick = (skillId, redirect = false) => {
    setSelectedSkill(skillId);

    if (cardRefs.current[skillId]) {
      cardRefs.current[skillId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (redirect) {
      navigate(`/softskill/${skillId}`);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" />
      </div>
    );

  return (
    <div className="softskill-page">
      {/* HEADER */}
      <div className="softskill-header d-flex justify-content-between align-items-center p-2" style={{ background: "#2575fc", color: "#fff" }}>
        <div className="d-flex align-items-center">
          <img src={logo} alt="logo" width={70} height={65} className="rounded-pill" />
          <span className="fw-bold fs-3 ms-2">SKICA</span>
        </div>
        <div>
          <Button variant="outline-light" className="me-2" onClick={() => navigate(-1)}>← Back</Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      {/* BODY */}
      <div className="d-flex">
        {/* SIDEBAR */}
        <div className="p-3" style={{ width: "250px", background: "#f0f0f0", minHeight: "100vh" }}>
          <h5>Soft Skills</h5>
          <ul className="list-unstyled">
            {skills.map((s) => (
              <li
                key={s.id}
                className={`p-2 mb-2 ${selectedSkill === s.id ? "bg-primary text-white" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleSkillClick(s.id)}
              >
                {s.name}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTENT */}
        <div className="flex-grow-1 p-3" style={{ background: "#fff" }}>
          <h1 className="text-center mb-4">Comprehensive Guide to Soft Skills</h1>

          <p>Learn all about soft skills in this comprehensive guide. Discover how developing these interpersonal attributes can enhance your professional success.</p>

          <p>Soft skills are becoming increasingly important in today's job market. They refer to personal attributes like communication, teamwork, problem-solving, and time management. Employers value these alongside technical skills.</p>

          <h2>What are Soft Skills?</h2>
          <p>Soft skills are personal attributes, behaviors, and social attitudes that help individuals interact effectively in the workplace and social environments. Examples include:</p>
          <ul>
            <li>Communication</li>
            <li>Teamwork</li>
            <li>Problem-solving</li>
            <li>Critical thinking</li>
            <li>Adaptability</li>
            <li>Time management</li>
            <li>Leadership</li>
            <li>Creativity</li>
            <li>Emotional intelligence</li>
          </ul>

          <h2>How to Share Soft Skills on Your Resume</h2>
          <ol>
            <li>Identify the soft skills required for the job.</li>
            <li>Include soft skills in your resume objective or summary.</li>
            <li>Provide examples in the experience section.</li>
            <li>Highlight soft skills in the skills section.</li>
            <li>Include certifications or awards for additional evidence.</li>
          </ol>

          {/* Video Cards */}
          {skills.length > 0 ? (
            <div className="d-flex flex-wrap gap-3 mt-4">
              {skills.map((skill) => (
                <Card
                  key={skill.id}
                  ref={(el) => (cardRefs.current[skill.id] = el)}
                  className={`shadow-sm ${selectedSkill === skill.id ? "border border-primary" : ""}`}
                  onClick={() => handleSkillClick(skill.id, true)}
                  style={{ width: "300px", cursor: "pointer" }}
                >
                  {skill.videoUrl && <video src={skill.videoUrl} controls className="w-100" />}
                  <Card.Body>
                    <Card.Title>{skill.name}</Card.Title>
                    <Card.Text className="text-muted">{skill.description || "No description."}</Card.Text>
                    {skill.usedIt && <Badge bg="info" className="me-1">Used: {skill.usedIt}</Badge>}
                    {skill.idioms && <Badge bg="warning" text="dark">Idiom</Badge>}
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-muted text-center mt-5">No soft skills available.</div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center p-2" style={{ background: "#2575fc", color: "#fff" }}>
        © {new Date().getFullYear()} SKICA — All rights reserved.
      </footer>

      <ToastContainer />
    </div>
  );
};

export default SoftSkillViewer;
