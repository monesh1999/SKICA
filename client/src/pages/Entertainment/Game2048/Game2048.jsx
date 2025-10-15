import React, { useState, useEffect } from "react";
import "./Game2048.css";

const SIZE = 4;

const Game2048 = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [score, setScore] = useState(0);

  function createEmptyGrid() {
    return Array(SIZE).fill().map(() => Array(SIZE).fill(0));
  }

  function addRandomTile(newGrid) {
    const emptyCells = [];
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (newGrid[i][j] === 0) emptyCells.push([i, j]);
      }
    }
    if (emptyCells.length === 0) return newGrid;
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    newGrid[row][col] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
  }

  useEffect(() => {
    let newGrid = createEmptyGrid();
    newGrid = addRandomTile(newGrid);
    newGrid = addRandomTile(newGrid);
    setGrid(newGrid);
  }, []);

  const moveGrid = (direction) => {
    let rotated = rotateGrid(grid, direction);
    let moved = false;
    let newScore = score;
    const newGrid = rotated.map(row => {
      const filtered = row.filter(val => val !== 0);
      const merged = [];
      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i] === filtered[i + 1]) {
          merged.push(filtered[i] * 2);
          newScore += filtered[i] * 2;
          i++;
        } else {
          merged.push(filtered[i]);
        }
      }
      while (merged.length < SIZE) merged.push(0);
      if (!moved && merged.some((v, idx) => v !== row[idx])) moved = true;
      return merged;
    });
    const finalGrid = rotateGridBack(newGrid, direction);
    if (moved) {
      setGrid(addRandomTile(finalGrid));
      setScore(newScore);
    }
  };

  const rotateGrid = (matrix, dir) => {
    let newMatrix = JSON.parse(JSON.stringify(matrix));
    if (dir === "up") newMatrix = transpose(newMatrix);
    if (dir === "down") newMatrix = transpose(newMatrix).map(row => row.reverse());
    if (dir === "right") newMatrix = newMatrix.map(row => row.reverse());
    return newMatrix;
  };

  const rotateGridBack = (matrix, dir) => {
    let newMatrix = JSON.parse(JSON.stringify(matrix));
    if (dir === "up") newMatrix = transpose(newMatrix);
    if (dir === "down") newMatrix = matrix.map(row => row.reverse()).reduce((a,b)=>transpose([a,b]));
    if (dir === "right") newMatrix = newMatrix.map(row => row.reverse());
    return newMatrix;
  };

  const transpose = (matrix) => matrix[0].map((_, i) => matrix.map(row => row[i]));

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        moveGrid("up");
        break;
      case "ArrowDown":
        moveGrid("down");
        break;
      case "ArrowLeft":
        moveGrid("left");
        break;
      case "ArrowRight":
        moveGrid("right");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div>
      <h4>Score: {score}</h4>
      <div className="grid">
        {grid.map((row, i) => (
          <div className="grid-row" key={i}>
            {row.map((cell, j) => (
              <div className={`grid-cell value-${cell}`} key={j}>
                {cell !== 0 ? cell : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game2048;
