import React, { useEffect, useState } from "react";
import axios from "axios";
import readingService from "../../../services/ReadingService";

const ReadingView = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    readingService.getAll().then((res) => setFiles(res.data));
  }, []);

  // Secure PDF Viewer
 const handleViewPdf = async (url) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      responseType: "blob",
    };

    // ✅ Only include header if token exists and looks valid
    if (token && token.split(".").length === 3) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    const response = await axios.get(url, config);

    const fileBlob = new Blob([response.data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(fileBlob);
    window.open(fileURL, "_blank");
  } catch (error) {
    console.error("Error viewing PDF:", error);
    alert("Unable to load file. Please log in if it's restricted.");
  }
};

  // Categorize files
  const categories = ["Novel", "Newspaper", "Magazine", "Book"];
  const categorizedFiles = categories.map((cat) => ({
    category: cat,
    files: files.filter(
      (f) => f.category && f.category.toLowerCase() === cat.toLowerCase()
    ),
  }));

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #001f3f, #003366, #004080, #0a2351)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#f5f5f5",
      }}
    >
      {/* Header */}
      <header
        className="text-center py-5"
        style={{
          color: "white",
          backdropFilter: "blur(6px)",
        }}
      >
        <h1 className="fw-bold">📚 Reading Library</h1>
        <p className="lead">
          Dive into Skica’s Reading Library — explore insightful novels,
          trending newspapers, inspiring magazines, and timeless books.
          Knowledge begins here.
        </p>
      </header>

      {/* Content */}
      <main className="container py-5 flex-grow-1">
        {categorizedFiles.map(
          (section) =>
            section.files.length > 0 && (
              <div key={section.category} className="mb-5 text-center">
                <h3
                  className="mb-3 text-uppercase fw-bold"
                  style={{
                    borderBottom: "3px solid #00bfff",
                    display: "inline-block",
                    color: "#00bfff",
                  }}
                >
                  {section.category}
                </h3>
                <div className="row">
                  {section.files.map((f) => (
                    <div key={f.id} className="col-md-4 mb-4">
                      <div
                        className="card h-100 shadow-lg text-primary"
                        style={{
                          borderRadius: "15px",
                          background: "white",
                          transition: "transform 0.3s ease, box-shadow 0.3s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        {f.thumbnailUrl && (
                          <img
                            src={f.thumbnailUrl}
                            className="card-img-top"
                            alt={f.title}
                            style={{
                              height: "200px",
                              objectFit: "cover",
                              borderTopLeftRadius: "15px",
                              borderTopRightRadius: "15px",
                            }}
                          />
                        )}
                        <div className="card-body">
                          <h5 className="card-title text-center">{f.title}</h5>

                          {/* Description - 2 lines only */}
                          <p
                            className="card-text text-info text-center"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              minHeight: "45px",
                            }}
                          >
                            {f.description || "No description available."}
                          </p>

                          {/* Upload time */}
                          {f.uploadTime && (
                            <p
                              className="text-secondary text-start"
                              style={{
                                fontSize: "0.8rem",
                                marginBottom: "8px",
                              }}
                            >
                              Uploaded on:{" "}
                              {new Date(f.uploadTime).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          )}

                          {/* Secure PDF View Button */}
                          {f.fileUrl && (
                            <div className="text-center">
                              <button
                                className="btn btn-outline-info btn-sm"
                                onClick={() => handleViewPdf(f.fileUrl)}
                              >
                                View PDF
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </main>

      {/* Footer */}
      <footer
        className="text-center py-4 mt-auto"
        style={{
          background: "rgba(108, 147, 255, 0.85)",
          color: "white",
          fontSize: "0.95rem",
          letterSpacing: "0.5px",
        }}
      >
        <p className="mb-0">
          © {new Date().getFullYear()} <strong>Skica</strong> — Read. Think.
          Evolve.
        </p>
      </footer>
    </div>
  );
};

export default ReadingView;
