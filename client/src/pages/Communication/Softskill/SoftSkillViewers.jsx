import React, { useEffect, useState, useContext, useRef } from "react";
import { Spinner, Button, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import softSkillService from "../../../services/softSkillService";
import { AppContext } from "../../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/logo.jpg";
import bgImage from "../../../assets/background.jpg";
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
    <div
      className="softskill-page d-flex flex-column"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div className="softskill-header d-flex justify-content-between align-items-center p-0" style={{ background: "#2575fc", color: "#fff" }}>
        <div className="d-flex align-items-center">
          <img src={logo} alt="logo" width={190} height={100}  />
          <span className="fw-bold fs-3 ms-2"></span>
        </div>
        <div>
          <Button variant="outline-light" className="me-2" onClick={() => navigate(-1)}>← Back</Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      {/* BODY */}
      <div className="d-flex flex-grow-1 text-white" style={{ overflowY: "auto" }}>
        {/* SIDEBAR */}
        <div className="p-3" style={{ flex: "0 0 20%" }}>
          <h5 className="mb-3">Soft Skills</h5>
          <ul className="list-unstyled">
            {skills.map((s) => (
              <li
                key={s.id}
                className={`p-2 mb-2 ${selectedSkill === s.id ? "bg-primary text-white" : ""}`}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #ccc",
                }}
                onClick={() => handleSkillClick(s.id)}
              >
                {s.name}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTENT */}
        <div className="flex-grow-1 p-3" >
          <div className=" text-white">
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
</div>
          {/* Video Cards */}
          {skills.length > 0 ? (
  <div className="row mt-4">
    {skills.map((skill) => (
      <div key={skill.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <Card
          ref={(el) => (cardRefs.current[skill.id] = el)}
          className={`shadow-sm ${
            selectedSkill === skill.id ? "border border-primary" : ""
          }`}
          onClick={() => handleSkillClick(skill.id, true)}
          style={{ cursor: "pointer", height: "100%" }}
        >
          {skill.videoUrl && (
            <video
              src={skill.videoUrl}
              controls
              className="w-100"
              style={{ height: "170px", objectFit: "cover" }}
            />
          )}
          <Card.Body>
            <Card.Title>{skill.name}</Card.Title>
            <Card.Text
              className="text-muted text-truncate-multiline"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {skill.description || "No description."}
            </Card.Text>
            {skill.idioms && (
              <Badge bg="warning" text="dark">
                for more
              </Badge>
            )}
          </Card.Body>
        </Card>
      </div>
    ))}
  </div>
) : (
  <div className="text-muted text-center mt-5">
    No soft skills available.
  </div>
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
