import React, { useState, useEffect } from "react";
import "./attitude.css";
import logo from "../../../assets/logo.jpg";
import { Link } from "react-router-dom";
// --- Data ---
const lessons = [
  {
    title: "Growth Mindset",
    video: "https://www.youtube.com/embed/75GFzikmRY0",
    points: [
      "Believe skills are learnable",
      "See challenges as opportunity",
      "Feedback helps improvement",
    ],
  },
  {
    title: "Solution-Oriented Mindset",
    video: "https://www.youtube.com/embed/LXg0XFGdT6A?si=2sCzValU63judg_L",
    points: [
      "Don’t complain — solve",
      "Focus on how not why problem",
      "Think alternatives quickly",
    ],
  },
  {
    title: "POSH Awareness",
    video: "https://www.youtube.com/embed/O1NxyrvGrrA?si=goDqGhE1z8FvDlVL",
    points: [
      "Respect all at workplace",
      "Know POSH rights",
      "Zero tolerance workplace ethics",
    ],
  },
  {
    title: "Criticism Handling",
    video: "https://www.youtube.com/embed/oINoO2S7hrE?si=lFR2GhTefaTu62Ra",
    points: [
      "Listen, don't react",
      "Separate message from emotion",
      "Use criticism for improvement",
    ],
  },
  {
    title: "Networking Skills",
    video: "https://www.youtube.com/embed/OVf5c7NthSw?si=2gAZaP9UG7j4rgQE",
    points: [
      "Build real connections",
      "Give value before asking",
      "Follow-up & maintain relations",
    ],
  },
  {
    title: "Think Global",
    video: "https://www.youtube.com/embed/3KLod7XiU2I?si=3QcVABs4Ljc-2G5S",
    points: [
      "See beyond local boundaries",
      "Understand global markets",
      "Upgrade to global thinking",
    ],
  },
];

// --- Child Components ---

const ProgressBar = () => {
  const [scrollWidth, setScrollWidth] = useState("0%");

  useEffect(() => {
    const handleScroll = () => {
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? (window.scrollY / height) * 100 : 0;
      setScrollWidth(progress + "%");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div className="progress-bar1" style={{ width: scrollWidth }}></div>;
};

const Header = ({ onMenuClick }) => (
  <header className="header1">
    <div className="header-left">
      <button className="menu-button" onClick={onMenuClick} aria-label="Open menu">
        &#9776;
      </button>
      <div className="logo-container">
        <Link
                      to="/"
                      className="d-flex align-items-center justify-content-center text-decoration-none"
                    >
                      <img
                        className="rounded-pill"
                        src={logo}
                        alt="logo"
                        width={190}
                        height={80}
                      />
                      <span className="fw-bold fs-1 ms-2 text-light"></span>
                    </Link>
      </div>
    </div>
    <div className="header-right">
      <button className="btn btn-secondary" onClick={() => window.history.back()}>
        ⬅ Back
      </button>
      <button className="btn btn-danger">Logout</button>
    </div>
  </header>
);

const Sidebar = ({ lessons, isOpen, closeSidebar }) => (
  <nav className={`sidebar ${isOpen ? "open" : ""}`}>

    <h1></h1>
    
    <div className="text-white text-center">
    <h4> Topics</h4>
    <hr />
    <ul>
      {lessons.map((lesson, i) => (
        <li key={i}>
          <a href={`#lesson${i}`} onClick={closeSidebar}>
            {i + 1}. {lesson.title}
          </a>
        </li>
      ))}
    </ul> </div>
  </nav>
);

const LessonCard = ({ index, lesson, isOpen, onToggle, onExport }) => {
  const { title, video, points } = lesson;
  return (
    <div className="card" id={`lesson${index}`}>
      <h5 className="card-header" onClick={() => onToggle(index)}>
        {title} <span>{isOpen ? "▲" : "▼"}</span>
      </h5>
      {isOpen && (
        <div className="card-content">
          <div className="video-container">
            <iframe
              src={video}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <ul>
            {points.map((p, j) => <li key={j}>{p}</li>)}
          </ul>
          <button
            className="btn btn-light"
            onClick={() => onExport(title, points)}
          >
            📄 Export Notes
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main Page Component ---

const AttitudePage = () => {
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  

  // Daily Streak Logic
 
  // --- Event Handlers ---
  const toggleCard = (index) => {
    setOpenCardIndex(openCardIndex === index ? null : index);
  };

  const exportPDF = (title, points) => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head><title>${title} Notes</title></head>
        <body style="font-family: sans-serif;">
          <h3>${title}</h3>
          <ul>${points.map(p => `<li>${p}</li>`).join('')}</ul>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
    win.close();
  };

  return (
    <>
      <ProgressBar />
       <div className="attitude-wrapper">
      <div className="attitude-layout1">
        <Header onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
        <Sidebar 
          lessons={lessons} 
          isOpen={isSidebarOpen} 
          closeSidebar={() => setSidebarOpen(false)} 
        />

        {/* Overlay for closing sidebar on mobile */}
        {isSidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}

        <main className="content">
          <h1 className="streak-counter text-white">
            WELCOME TO ATTITUDE PAGE 
          </h1>
          <div className="text-white h5">
          <h2>What is Attitude?</h2>
          <ul >
<li><strong>About:</strong><br/>
<ul >
<li>It is a <strong>psychological tendency that is expressed by evaluating a particular entity</strong> with some degree of favour or disfavour.</li>
<li>The evaluations which <strong>people make can range from extremely unfavourable to the extremely favourable</strong>, or can be more moderate.</li>
<li>Attitudes can be<strong> mixed, and with regard to the same object</strong>, may vary from time to time.</li>
</ul>
</li>
<li><strong>Classification:</strong> <br/>
<ul >
<li><strong>Explicit:</strong><br/>
<ul >
<li>If a <strong>person is aware of his attitudes,</strong> and they influence his behaviour and beliefs, his attitudes are explicit.</li>
<li>Explicit attitudes are <strong>formed consciously.</strong></li>
</ul>
</li>
<li><strong>Implicit:</strong><br/>
<ul >
<li>A person <strong>may be unaware of his implicit beliefs</strong> though these still have some influence on his conduct and behaviour.</li>
<li>Implicit attitudes are <strong>subconscious attitudes.</strong></li>
</ul>
</li>
</ul>
</li>
</ul>
</div>
          <div className="lessons-grid">
            {lessons.map((lesson, i) => (
              <LessonCard
                key={i}
                index={i}
                lesson={lesson}
                isOpen={openCardIndex === i}
                onToggle={toggleCard}
                onExport={exportPDF}
              />
            ))}
          </div>
        </main>
        
        <footer className="footer bg-primary text-white">
            © Skica | 2025
        </footer>
      </div>
      </div>
    </>
  );
};

export default AttitudePage;