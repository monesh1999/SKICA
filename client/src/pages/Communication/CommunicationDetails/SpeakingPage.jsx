import React, { useRef, useState } from "react";
import "./SpeakingPage.css";

const speakingResources = [
  {
    name: "Sivi",
    link: "https://www.mysivi.ai/",
    img: "https://bookface-images.s3.amazonaws.com/small_logos/0d0608c9504f2b85980b6db17c332126c43441a4.png",
    desc: "AI visuals for storytelling and confident communication.",
  },
  {
    name: "HelloTalk",
    link: "https://www.hellotalk.com/",
    img: "https://play-lh.googleusercontent.com/wRADow5V9OhwkcVgce24EaMSqhVq8VEVNNgiFZGDy07ywOAvEi1F9cQ4jElFIzKr-jU",
    desc: "Chat with native speakers and enhance fluency naturally.",
  },
  {
    name: "Progos",
    link: "https://progos.ai/en/",
    img: "https://tse4.mm.bing.net/th/id/OIP.5vH4qQSdtIbAj_QIOyO6ZgAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "AI-driven speaking assessment to improve communication.",
  },
  {
    name: "Lola Speak",
    link: "https://lolaspeak.com/",
    img: "https://play-lh.googleusercontent.com/whbQs__AtTzUnmvoOsdxIVO8-wbO1d3Im3hkRx_07GkCAyfIbM0h8pAHQuAsAX5Odi8",
    desc: "Personalized AI tutor to refine your English speaking skills.",
  },
  {
    name: "IELTS Speaking",
    link: "https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking",
    img: "https://avatars.githubusercontent.com/u/184799030?s=280&v=4",
    desc: "Official IELTS speaking test format and practice resources.",
  },
  {
    name: "PeerUp",
    link: "https://www.peerup.co.in/",
    img: "https://play-lh.googleusercontent.com/LwSZPj2dBGP55j5gMNe6-Gb_mOUYTYpy1oMzYhGAv3LGgrMRIodPtKg0TqaXdjc-s3g",
    desc: "Peer learning platform to practice and enhance communication.",
  },
];

// 💬 Prompts by difficulty
const prompts = {
  easy: [
    "What is your favorite food and why?",
    "Describe your best friend.",
    "What do you like to do on weekends?",
    "Talk about your favorite movie.",
    "Describe your hometown.",
  ],
  medium: [
    "What are the advantages and disadvantages of social media?",
    "Describe a challenge you faced and how you overcame it.",
    "If you could travel anywhere, where would you go and why?",
    "How do you manage your time effectively?",
    "What makes a good leader?",
  ],
  hard: [
    "Discuss the impact of technology on human relationships.",
    "Do you believe climate change is reversible? Why or why not?",
    "What role does education play in shaping society?",
    "Is AI a threat or an opportunity for humanity?",
    "Should governments prioritize economy or environment?",
  ],
};

const SpeakingPage = () => {
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [audioURL, setAudioURL] = useState(null);
  const [recording, setRecording] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [prompt, setPrompt] = useState(prompts.easy[0]);

  // 🎙️ Recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      alert("🎙️ Please allow microphone access!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const playRecording = () => {
    if (audioURL) new Audio(audioURL).play();
    else alert("No recording available yet 🎧");
  };

  // 💬 Prompt change logic
  const changeDifficulty = (level) => {
    setDifficulty(level);
    const newPrompt =
      prompts[level][Math.floor(Math.random() * prompts[level].length)];
    setPrompt(newPrompt);
  };

  const nextPrompt = () => {
    const newPrompt =
      prompts[difficulty][Math.floor(Math.random() * prompts[difficulty].length)];
    setPrompt(newPrompt);
  };

  return (
    <div className="speaking-page">
      {/* HEADER */}
      <header className="speaking-header">
        <h1>🗣️ Improve Your Speaking Skills</h1>
        <p>
          Speak confidently with clarity and purpose. Use prompts, record your
          sessions, and explore world-class platforms to enhance your fluency.
        </p>
      </header>
      {/* TIPS */}
      <section className="glass tips-section">
        <h2>✨ Speaking Tips</h2>
        <ul>
          <li>🎯 Focus on tone, clarity, and rhythm — not just speed.</li>
          <li>🎧 Listen to native speakers and imitate their flow.</li>
          <li>🎤 Record and replay your sessions for self-feedback.</li>
          <li>💬 Use prompts to start natural conversations daily.</li>
        </ul>
      </section>

      {/* PROMPT AREA */}
      <section className="glass prompt-section">
        <h2>💬 Practice Prompts</h2>
        <div className="difficulty-buttons">
          <button
            className={`diff-btn ${difficulty === "easy" ? "active" : ""}`}
            onClick={() => changeDifficulty("easy")}
          >
            Easy
          </button>
          <button
            className={`diff-btn ${difficulty === "medium" ? "active" : ""}`}
            onClick={() => changeDifficulty("medium")}
          >
            Medium
          </button>
          <button
            className={`diff-btn ${difficulty === "hard" ? "active" : ""}`}
            onClick={() => changeDifficulty("hard")}
          >
            Hard
          </button>
        </div>
        <div className="prompt-display">
          <p>{prompt}</p>
          <button className="next-btn" onClick={nextPrompt}>
            🔁 Next Prompt
          </button>
        </div>
      </section>

      

      {/* RECORD */}
      <section className="glass record-section">
        <h2>🎤 Practice & Record</h2>
        <p>
          Record your voice and listen back to identify areas to improve your
          speaking style.
        </p>

        <div className="record-buttons">
          <button
            className={`record-btn start ${recording ? "disabled" : ""}`}
            onClick={startRecording}
            disabled={recording}
          >
            {recording ? "Recording..." : "Start Recording"}
          </button>
          <button
            className="record-btn stop"
            onClick={stopRecording}
            disabled={!recording}
          >
            Stop
          </button>
          <button className="record-btn play" onClick={playRecording}>
            Play
          </button>
        </div>

        {audioURL && (
          <audio controls src={audioURL} className="audio-player"></audio>
        )}
      </section>

      {/* REFERENCES */}
      <section className="glass reference-section">
        <h2>🌐 Recommended Speaking Platforms</h2>
        <div className="card-grid">
          {speakingResources.map((res, index) => (
            <div
              className="resource-card"
              key={index}
              onClick={() => window.open(res.link, "_blank")}
            >
              <img src={res.img} alt={res.name} />
              <h3>{res.name}</h3>
              <p>{res.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="speaking-footer">
        © 2025 <span>Skica</span> — All rights reserved.
      </footer>
    </div>
  );
};

export default SpeakingPage;
