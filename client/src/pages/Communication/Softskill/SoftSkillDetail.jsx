import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Badge, Spinner, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import softSkillService from "../../../services/softSkillService";
import { AppContext } from "../../../context/AppContext";
import { assets } from "../../../assets/assets";

const SoftSkillDetail = () => {
  const { id } = useParams();
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSkill = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await softSkillService.getById(id, token);
      setSkill(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchSkill();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" />
      </div>
    );

  if (!skill) return <p className="text-center mt-5">Skill not found</p>;

  return (
    <div className="softskill-detail-page" style={{ minHeight: "100vh", position: "relative", paddingBottom: "80px" }}>
      {/* Header */}
      <div
  className="d-flex justify-content-between align-items-center p-3"
  style={{ background: "#0d47a1", color: "#fff" }}
>
  {/* Left side: Logo + Name */}
  <Link
    to="/"
    className="d-flex align-items-center text-decoration-none text-white"
  >
    <img
      className="rounded-pill"
      src={assets.logo}
      alt="logo"
      width={60}
      height={60}
    />
    <span className="fw-bold fs-3 ms-2">SKICA</span>
  </Link>

  {/* Right side: Back + Logout */}
  <div className="d-flex align-items-center">
    <Button
      variant="light"
      onClick={() => navigate(-1)}
      className="me-2"
    >
      ← Back
    </Button>
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  </div>
</div>

      <Container className="mt-4">
        {/* Skill Name */}
        <h1 className="text mb-4" style={{ fontWeight: "700", color: "#0d47a1" }}>
          {skill.name}
        </h1>
        {/* Description */}
        <Row className="mb-3">
          <Col>
            <h5>Description</h5>
            <p>{skill.description}</p>
          </Col>
        </Row>

        {/* Video */}
        {skill.videoUrl && (
          <div className="text-center mb-4">
            <video
              src={skill.videoUrl}
              controls
              style={{ maxWidth: "80%", height: "auto", borderRadius: "10px" }}
            />
          </div>
        )}

        

        {/* Used It */}
        <Row className="mb-3">
          <Col>
            <h5>Used It</h5>
            <p>{skill.usedIt}</p>
          </Col>
        </Row>

        {/* Example */}
        <Row className="mb-3">
          <Col>
            <h5>Example</h5>
            <p>{skill.example}</p>
          </Col>
        </Row>

        {/* Idioms */}
        {skill.idioms && (
          <Row className="mb-3">
            <Col>
              <h5>Idioms</h5>
              <div
                style={{
                  border: "2px dashed #0d47a1",
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "#e3f2fd",
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                }}
              >
                "{skill.idioms}"
              </div>
            </Col>
          </Row>
        )}

        {/* Example of Idioms */}
        {skill.exampleUsage && (
          <Row className="mb-3">
            <Col>
              <h5>Example of Idioms</h5>
              <p>{skill.exampleUsage}</p>
            </Col>
          </Row>
        )}
      </Container>

      {/* Footer */}
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          background: "#0d47a1",
          color: "#fff",
          textAlign: "center",
          padding: "10px 0",
        }}
      >
        &copy; {new Date().getFullYear()} SKICA. All rights reserved.
      </footer>
    </div>
  );
};

export default SoftSkillDetail;
