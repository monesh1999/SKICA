import React, { useState, useEffect } from "react";
import "./Sudoku.css";

const Sudoku = () => {
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const puzzles = [
    {
      puzzle: [
        [5, 3, null, null, 7, null, null, null, null],
        [6, null, null, 1, 9, 5, null, null, null],
        [null, 9, 8, null, null, null, null, 6, null],
        [8, null, null, null, 6, null, null, null, 3],
        [4, null, null, 8, null, 3, null, null, 1],
        [7, null, null, null, 2, null, null, null, 6],
        [null, 6, null, null, null, null, 2, 8, null],
        [null, null, null, 4, 1, 9, null, null, 5],
        [null, null, null, null, 8, null, null, 7, 9],
      ],
      solution: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9],
      ],
    },
    {
      puzzle: [
        [null, 2, null, null, null, 3, null, 8, null],
        [1, null, null, null, 2, null, 9, null, null],
        [null, 6, null, null, null, null, 3, null, null],
        [null, null, 8, null, null, null, 6, 2, null],
        [null, 7, null, 8, null, 1, null, 3, null],
        [null, 5, 2, null, null, null, 8, null, null],
        [null, null, 7, null, null, null, null, 5, null],
        [null, null, 5, null, 6, null, null, null, 7],
        [null, 9, null, 1, null, null, null, 6, null],
      ],
      solution: [
        [5, 2, 9, 6, 7, 3, 1, 8, 4],
        [1, 3, 4, 5, 2, 8, 9, 7, 6],
        [7, 6, 8, 4, 1, 9, 3, 2, 5],
        [9, 1, 8, 3, 5, 7, 6, 2, 4],
        [6, 7, 4, 8, 9, 1, 5, 3, 2],
        [3, 5, 2, 2, 4, 6, 8, 9, 1],
        [4, 8, 7, 9, 3, 2, 2, 5, 9],
        [2, 4, 5, 7, 6, 5, 4, 1, 7],
        [8, 9, 6, 1, 8, 4, 7, 6, 3],
      ],
    },
    {
      puzzle: [
        [null, null, null, 2, 6, null, 7, null, 1],
        [6, 8, null, null, 7, null, null, 9, null],
        [1, 9, null, null, null, 4, 5, null, null],
        [8, 2, null, 1, null, null, null, 4, null],
        [null, null, 4, 6, null, 2, 9, null, null],
        [null, 5, null, null, null, 3, null, 2, 8],
        [null, null, 9, 3, null, null, null, 7, 4],
        [null, 4, null, null, 5, null, null, 3, 6],
        [7, null, 3, null, 1, 8, null, null, null],
      ],
      solution: [
        [4, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, 9],
      ],
    },
  ];

  useEffect(() => {
    loadRandomSudoku();
  }, []);

  const loadRandomSudoku = () => {
    const random = puzzles[Math.floor(Math.random() * puzzles.length)];
    setBoard(random.puzzle);
    setSolution(random.solution);
    setMistakes(0);
    setGameOver(false);
  };

  const handleChange = (row, col, value) => {
    if (gameOver) return;
    const newBoard = board.map((r) => [...r]);
    if (newBoard[row][col] !== null) return;

    const num = parseInt(value);
    if (!isNaN(num)) {
      if (num === solution[row][col]) {
        newBoard[row][col] = num;
      } else {
        setMistakes((prev) => {
          const newCount = prev + 1;
          if (newCount >= 5) setGameOver(true);
          return newCount;
        });
      }
      setBoard(newBoard);
    }
  };

  return (
    <div className="sudoku-container">
      <h1 className="title">🧩 Sudoku Game</h1>
      <h2 className="subtitle">Mistakes: {mistakes}/5</h2>

      <div className={`sudoku-board ${gameOver ? "disabled" : ""}`}>
        {board.map((row, i) => (
          <div key={i} className="sudoku-row">
            {row.map((cell, j) => (
              <input
                key={j}
                className="sudoku-cell"
                type="text"
                maxLength="1"
                value={cell === null ? "" : cell}
                onChange={(e) => handleChange(i, j, e.target.value)}
                disabled={cell !== null}
              />
            ))}
          </div>
        ))}
      </div>

      {gameOver && (
        <h2 className="game-over">❌ Game Over — You exceeded 5 mistakes!</h2>
      )}

      <button className="reset-btn" onClick={loadRandomSudoku}>
        🔄 New Game
      </button>
    </div>
  );
};

export default Sudoku;
