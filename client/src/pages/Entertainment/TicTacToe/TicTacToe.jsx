import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [draws, setDraws] = useState(0);
  const [mistakes, setMistakes] = useState({ X: 0, O: 0 });
  const [winningLine, setWinningLine] = useState([]);

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index]) {
      const currentPlayer = isXTurn ? "X" : "O";
      setMistakes(prev => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1
      }));
      if (mistakes[isXTurn ? "X" : "O"] + 1 >= 5) {
        alert(`${currentPlayer} exceeded 5 mistakes! Turn forfeited.`);
        setIsXTurn(!isXTurn);
      }
      return;
    }
    if (winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinningLine(result.line);
      if (result.winner === "X") setXScore(prev => prev + 1);
      else setOScore(prev => prev + 1);
    } else if (!newBoard.includes(null)) {
      setDraws(prev => prev + 1);
    }

    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setMistakes({ X: 0, O: 0 });
    setWinningLine([]);
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Tic Tac Toe</h1>

      <div className="scoreboard mb-4">
        <span className="mx-3">X: {xScore}</span>
        <span className="mx-3">O: {oScore}</span>
        <span className="mx-3">Draws: {draws}</span>
      </div>

      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className={`cell btn btn-outline-primary ${
              winningLine.includes(index) ? "winner-cell" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="mt-3">
        {winner ? (
          <h3 className="text-success">{winner.winner} Wins!</h3>
        ) : board.includes(null) ? (
          <h4>Turn: {isXTurn ? "X" : "O"}</h4>
        ) : (
          <h3 className="text-warning">It's a Draw!</h3>
        )}
      </div>

      <div className="mt-2">
        <h6>
          Mistakes - X: {mistakes.X} /5, O: {mistakes.O} /5
        </h6>
      </div>

      <button className="btn btn-danger mt-3" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

// Helper function to calculate winner and winning line
function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

export default TicTacToe;
