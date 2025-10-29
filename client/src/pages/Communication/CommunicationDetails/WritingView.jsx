import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// You might need to install 'uuid': npm install uuid

const WritingView = () => {
  // --- Static/Initial writing data ---
  const initialWritings = [
    {
      id: uuidv4(),
      title: "Formal Letter to Principal",
      category: "Letter",
      description:
        "A formal request to the school principal seeking permission for a science exhibition...",
      content: "Dear Principal, I am writing to request permission for...", // Add full content for dynamic display
      uploadTime: "2025-10-20T10:30:00",
    },
    {
      id: uuidv4(),
      title: "Job Application Email",
      category: "Email",
      description:
        "An email template for applying to a job professionally, including subject and closing lines...",
      content: "Dear Hiring Manager, I am writing to express my interest in...",
      uploadTime: "2025-10-21T09:00:00",
    },
    {
      id: uuidv4(),
      title: "My Dream City",
      category: "Essay",
      description:
        "An essay describing the perfect city with clean air, advanced technology, and happy citizens...",
      content: "My dream city would be a haven of innovation and tranquility...",
      uploadTime: "2025-10-22T15:45:00",
    },
    {
      id: uuidv4(),
      title: "The Secret Garden",
      category: "Story",
      description:
        "A short story about friendship, courage, and the hidden beauty of nature waiting to be discovered...",
      content: "Elara stumbled upon an old, ivy-covered gate...",
      uploadTime: "2025-10-23T11:20:00",
    },
    {
      id: uuidv4(),
      title: "The Power of Words",
      category: "Article",
      description:
        "An article discussing how words can inspire, heal, and transform the world we live in...",
      content: "Words are more than mere symbols; they are powerful catalysts...",
      uploadTime: "2025-10-24T08:10:00",
    },
  ];

  const LOCAL_STORAGE_KEY = 'skicaWritingDeskData';

  const [writings, setWritings] = useState(() => {
    // Load writings from localStorage on initial mount
    const savedWritings = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedWritings ? JSON.parse(savedWritings) : initialWritings;
  });

  // Writing categories for display (now includes 'Article' if needed, but interactive are fixed)
  const displayCategories = ["Letter", "Email", "Essay", "Story", "Article"];

  // Re-categorize writings whenever the `writings` state changes
  const categorizedWritings = displayCategories.map((cat) => ({
    category: cat,
    files: writings.filter(
      (f) => f.category && f.category.toLowerCase() === cat.toLowerCase()
    ),
  }));

  // --- State for Interactive Writing Desk ---
  const [writingMode, setWritingMode] = useState('letter'); // Default interactive mode
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [showFullContentId, setShowFullContentId] = useState(null); // To toggle full content view

  // Ref for the textarea to potentially focus it or get specific spell check info
  const textareaRef = useRef(null);


  // Function to update body and word count
  const handleBodyChange = (e) => {
    const text = e.target.value;
    setBody(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  // Reset interactive writing form when mode changes
  useEffect(() => {
    setTitle('');
    setRecipient('');
    setSender('');
    setSubject('');
    setBody('');
    setWordCount(0);
  }, [writingMode]);


  // Render different input fields based on the selected mode
  const renderInteractiveModeSpecificInputs = () => {
    switch (writingMode) {
      case 'letter':
        return (
          <>
            <div className="form-group">
              <label htmlFor="recipient">Recipient:</label>
              <input
                type="text"
                id="recipient"
                className="form-control"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g., Mr. John Doe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="sender">Sender (Your Name/Address):</label>
              <input
                type="text"
                id="sender"
                className="form-control"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="e.g., Jane Smith, 123 Main St"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Letter Title/Reference:</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Application for Job XYZ"
              />
            </div>
          </>
        );
      case 'email':
        return (
          <>
            <div className="form-group">
              <label htmlFor="recipient">To:</label>
              <input
                type="email"
                id="recipient"
                className="form-control"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g., example@domain.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="sender">From:</label>
              <input
                type="email"
                id="sender"
                className="form-control"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="e.g., your_email@domain.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                className="form-control"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Regarding Your Inquiry"
              />
            </div>
          </>
        );
      case 'essay':
        return (
          <div className="form-group">
            <label htmlFor="title">Essay Title:</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., The Impact of Technology on Society"
            />
          </div>
        );
      case 'story':
        return (
          <div className="form-group">
            <label htmlFor="title">Story Title:</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., The Mystery of the Old Mansion"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSaveInteractive = () => {
    // Basic validation
    if (!title && (writingMode === 'essay' || writingMode === 'story')) {
      alert("Please enter a title for your " + writingMode);
      return;
    }
    if (!recipient && writingMode === 'email') {
      alert("Please enter a recipient for your email.");
      return;
    }
    if (!body.trim()) {
      alert("Please write some content before saving.");
      return;
    }

    const newWriting = {
      id: uuidv4(), // Generate a unique ID
      title: title || `Untitled ${writingMode.charAt(0).toUpperCase() + writingMode.slice(1)}`,
      category: writingMode.charAt(0).toUpperCase() + writingMode.slice(1), // Match existing categories
      description: body.substring(0, 100) + (body.length > 100 ? '...' : ''), // Short description
      content: body, // Full content for "Read More"
      uploadTime: new Date().toISOString(),
    };

    const updatedWritings = [...writings, newWriting];
    setWritings(updatedWritings);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedWritings)); // Save to localStorage

    alert(`Your ${writingMode} "${newWriting.title}" has been saved!`);
    handleClearInteractive(); // Clear the form after saving
  };

  const handleClearInteractive = () => {
    setTitle('');
    setRecipient('');
    setSender('');
    setSubject('');
    setBody('');
    setWordCount(0);
    alert('Interactive writing area cleared!');
  };

  const toggleFullContent = (id) => {
    setShowFullContentId(showFullContentId === id ? null : id);
  };


  return (
    <div
      style={{
        background: "linear-gradient(135deg, #001f3f, #003366, #004080, #0a2351)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#f5f5f5",
        padding: '20px'
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
        <h1 className="fw-bold">✍️ Skica Writing Desk</h1>
        <p className="lead">
          Explore beautifully crafted letters, professional emails, inspiring essays,
          and creative stories. Write, express, and share with the world.
        </p>
      </header>

      {/* Main Content */}
      <main className="container py-5 flex-grow-1">

        {/* --- Interactive Writing Section --- */}
        <div className="mb-5 p-4 rounded shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.95)', color: '#333' }}>
            <h3 className="mb-4 text-center fw-bold" style={{ color: '#00bfff', borderBottom: "2px solid #00bfff", paddingBottom: "10px", display: "inline-block" }}>
                Start a New Writing Piece
            </h3>
            <div className="mode-selector mb-4 d-flex justify-content-center flex-wrap gap-2">
                {['letter', 'email', 'essay', 'story'].map(mode => (
                    <button
                        key={mode}
                        className={`btn btn-outline-${writingMode === mode ? 'primary' : 'secondary'}`}
                        onClick={() => setWritingMode(mode)}
                        style={{ minWidth: '120px' }}
                    >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                ))}
            </div>

            <div className="writing-area">
                <h4 className="text-center mb-4 text-dark">{writingMode.charAt(0).toUpperCase() + writingMode.slice(1)} Mode</h4>

                {renderInteractiveModeSpecificInputs()}

                <div className="form-group full-width">
                  <label htmlFor="body">Content (Spellcheck enabled):</label>
                  <textarea
                    id="body"
                    className="form-control"
                    value={body}
                    onChange={handleBodyChange}
                    placeholder={`Start writing your ${writingMode} here...`}
                    rows="15"
                    style={{ minHeight: '200px' }}
                    spellCheck="true" // Enable browser's native spell check
                    ref={textareaRef}
                  ></textarea>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <small className="text-muted">Word Count: {wordCount}</small>
                    <div>
                        <button onClick={handleSaveInteractive} className="btn btn-success me-2">Save Writing</button>
                        <button onClick={handleClearInteractive} className="btn btn-warning">Clear</button>
                    </div>
                </div>
            </div>
        </div>

        {/* --- Display Existing Writings Section --- */}
        <div className="text-center mt-5">
            <h2 className="fw-bold mb-4" style={{ color: '#00bfff' }}>
                Browse Our Collection
            </h2>
        </div>

        {categorizedWritings.map(
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
                <div className="row justify-content-center">
                  {section.files.map((f) => (
                    <div key={f.id} className="col-lg-4 col-md-6 mb-4">
                      <div
                        className="card h-100 shadow-lg text-primary"
                        style={{
                          borderRadius: "15px",
                          background: "white",
                          transition: "transform 0.3s ease, box-shadow 0.3s",
                          maxWidth: '350px',
                          margin: '0 auto'
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.03)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        <div className="card-body d-flex flex-column">
                          {/* Upload Time */}
                          <p
                            className="text-secondary text-start"
                            style={{
                              fontSize: "0.8rem",
                              marginBottom: "8px",
                            }}
                          >
                            🕒 Uploaded on:{" "}
                            {new Date(f.uploadTime).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>

                          <h5 className="card-title text-center fw-bold text-dark flex-grow-1">
                            {f.title}
                          </h5>

                          {/* Description or Full Content */}
                          {showFullContentId === f.id ? (
                            <div className="card-text text-dark text-start full-content">
                                <p style={{ whiteSpace: 'pre-wrap' }}>{f.content}</p>
                            </div>
                          ) : (
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
                              {f.description}
                            </p>
                          )}


                          {/* Read More / Show Less Button */}
                          <div className="text-center mt-3">
                            <button
                              className="btn btn-outline-info btn-sm"
                              onClick={() => toggleFullContent(f.id)}
                            >
                              {showFullContentId === f.id ? "Show Less" : "Read More"}
                            </button>
                          </div>
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
          © {new Date().getFullYear()} <strong>Skica</strong> — Write. Inspire.
          Connect.
        </p>
      </footer>
    </div>
  );
};

export default WritingView;