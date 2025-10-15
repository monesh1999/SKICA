import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizSelection = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("Aptitude");
  const [subTopic, setSubTopic] = useState("");

  // Define subtopics per category
 const subTopicsMap = {
  Aptitude: [
    "Ratio",
    "Percentage",
    "Profit and Loss",
    "Simple Interest",
    "Compound Interest",
    "Time and Work",
    "Speed, Time and Distance",
    "Average",
    "Algebra (Basic)",
    "Number Series",
    "Mensuration (Basic)",
    "Probability",
    "Permutation & Combination"
  ],
  Maths: [
    "Algebra",
    "Geometry",
    "Trigonometry",
    "Calculus",
    "Coordinate Geometry",
    "Vectors",
    "Matrices",
    "Probability",
    "Statistics",
    "Set Theory",
    "Number Theory",
    "Complex Numbers",
    "Time and Distance",
    "Time and Work",
    "Mensuration",
    "Linear Equations",
    "Quadratic Equations"
  ],
  Reasoning: [
    "Verbal Reasoning",
    "Non-Verbal Reasoning",
    "Logical Venn Diagrams",
    "Series Completion",
    "Coding-Decoding",
    "Syllogisms",
    "Analogy",
    "Classification",
    "Blood Relations",
    "Direction Sense",
    "Seating Arrangement",
    "Puzzles",
    "Clocks & Calendars",
    "Statement & Conclusion",
    "Statement & Assumptions",
    "Decision Making",
    "Data Sufficiency"
  ]
};


  // Update subTopic when category changes
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubTopic(subTopicsMap[selectedCategory][0]); // select first subtopic by default
  };

  const handleStart = () => {
    navigate(`/quiz/play?category=${category}&subTopic=${subTopic}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", flexDirection: "column", textAlign: "center" }}>
      <h1 className="text-primary"><b>Select Your Quiz </b></h1>

      <div className="mt-4 ">
        <label className="text-info">Category: </label>
        <select value={category} onChange={handleCategoryChange} className="text-secondary">
          <option value="Aptitude">Aptitude</option>
          <option value="Maths">Maths</option>
          <option value="Reasoning">Reasoning</option>
        </select>
      </div>

      <div className="mt-3">
        <label className="text-info">Subtopic: </label>
        <select value={subTopic} onChange={(e) => setSubTopic(e.target.value)} className="text-secondary">
          {subTopicsMap[category].map((topic) => (
            <option key={topic} value={topic}>
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary mt-4" onClick={handleStart}>
        Start Quiz
      </button>
      <button className="btn btn-danger mt-3" onClick={() => navigate("/explore")}>
        Return Home
      </button>
    </div>
  );
};

export default QuizSelection;
