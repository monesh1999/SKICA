import React from "react";
import "./VideoGalleryCards.css";
import Header from "../Header";

const VideoGalleryCards = () => {
  const testimonials = [
    {
      name: "Alice Johnson",
      role: "Software Engineer",
      quote: "This platform transformed my learning experience!",
    },
    {
      name: "Mark Smith",
      role: "Student",
      quote: "The aptitude and soft skills sections are extremely helpful.",
    },
    {
      name: "Sophie Lee",
      role: "Designer",
      quote: "I love the interactive video demos and entertainment section!",
    },
  ];

  return (
    <>
      {/* 🟦 SECTION 1 — FEATURED VIDEO */}
      <section className="gallery-video py-5" style={{
        background: "linear-gradient(30deg,rgba(12, 0, 107, 1) 0%,rgba(9, 9, 121, 1) 50%,rgba(0, 212, 255, 1) 100%)",
  color: "white"          
      }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 col-md-10">
              <div className="position-relative video-wrapper shadow-lg rounded-4 overflow-hidden">
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/9nv3lyI4F2w"
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                <div className="video-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4 bg-dark bg-opacity-50 text-light">
                  <h4 className="fw-bold">Featured Demo Video</h4>
                  <p>Experience our platform in action with stunning visuals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟩 SECTION 2 — HEADER */}
      <section className="header-section py-3 bg-light">
        <div className="container">
          <Header />
        </div>
      </section>

      {/* 🟨 SECTION 3 — FEATURE CARDS */}
      <section className="features-section py-5 bg-light" style={{
        background: "linear-gradient(60deg,rgba(12, 0, 107, 1) 0%,rgba(9, 9, 121, 1) 50%,rgba(0, 212, 255, 1) 100%)",
  color: "white"          
      }}>
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Our Features</h2>
          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-md-6 col-lg-3">
              <div className="card feature-card h-100 text-center shadow-sm border-0">
                <div className="card-body">
                  <i className="bi bi-chat-dots fs-1 text-primary mb-3"></i>
                  <h5 className="card-title fw-bold">Communication</h5>
                  <p className="card-text">
                    Improve your speaking and writing skills with our tips and exercises.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-6 col-lg-3">
              <div className="card feature-card h-100 text-center shadow-sm border-0">
                <div className="card-body">
                  <i className="bi bi-pencil fs-1 text-success mb-3"></i>
                  <h5 className="card-title fw-bold">Aptitude</h5>
                  <p className="card-text">
                    Sharpen your problem-solving and logical reasoning abilities.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-6 col-lg-3">
              <div className="card feature-card h-100 text-center shadow-sm border-0">
                <div className="card-body">
                  <i className="bi bi-emoji-smile fs-1 text-warning mb-3"></i>
                  <h5 className="card-title fw-bold">Entertainment</h5>
                  <p className="card-text">
                    Relax and have fun with interactive games and activities that boost focus.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-md-6 col-lg-3">
              <div className="card feature-card h-100 text-center shadow-sm border-0">
                <div className="card-body">
                  <i className="bi bi-people fs-1 text-danger mb-3"></i>
                  <h5 className="card-title fw-bold">Soft Skills</h5>
                  <p className="card-text">
                    Learn leadership, teamwork, and other professional soft skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟪 SECTION 4 — TESTIMONIALS */}
      <section className="testimonials-section py-5" style={{ background: "#f8f9fa" }}>
        <div className="container">
          <h3 className="text-center mb-4 fw-bold">What Our Users Say</h3>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                id="testimonialCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {testimonials.map((t, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <div className="card shadow-lg border-0 p-4 text-center">
                        <p className="mb-2 fst-italic text-dark">"{t.quote}"</p>
                        <h6 className="fw-bold mb-0 text-primary">{t.name}</h6>
                        <small className="text-muted">{t.role}</small>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#testimonialCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#testimonialCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoGalleryCards;
