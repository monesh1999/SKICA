import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const ChessComponent = () => {
  const [mode, setMode] = useState(null); // single or multi
  const [game, setGame] = useState(new Chess());
  const [isGameOver, setIsGameOver] = useState(false);
  const [boardWidth, setBoardWidth] = useState(400);

  const [fromSquare, setFromSquare] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const squares = [
    "a8","b8","c8","d8","e8","f8","g8","h8",
    "a7","b7","c7","d7","e7","f7","g7","h7",
    "a6","b6","c6","d6","e6","f6","g6","h6",
    "a5","b5","c5","d5","e5","f5","g5","h5",
    "a4","b4","c4","d4","e4","f4","g4","h4",
    "a3","b3","c3","d3","e3","f3","g3","h3",
    "a2","b2","c2","d2","e2","f2","g2","h2",
    "a1","b1","c1","d1","e1","f1","g1","h1",
  ];

  // Responsive board
  useEffect(() => {
    const handleResize = () => setBoardWidth(Math.min(480, window.innerWidth * 0.9));
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleKey = (e) => {
      if (!mode || isGameOver) return;

      let rowMove = 0, colMove = 0;
      switch (e.key) {
        case "ArrowUp": rowMove = -1; break;
        case "ArrowDown": rowMove = 1; break;
        case "ArrowLeft": colMove = -1; break;
        case "ArrowRight": colMove = 1; break;
        case "Enter":
        case " ":
          handleEnter();
          return;
        default: return;
      }

      const row = Math.floor(selectedIndex / 8);
      const col = selectedIndex % 8;
      const newRow = Math.min(7, Math.max(0, row + rowMove));
      const newCol = Math.min(7, Math.max(0, col + colMove));
      setSelectedIndex(newRow * 8 + newCol);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedIndex, fromSquare, game, mode, isGameOver]);

  const handleEnter = () => {
    const square = squares[selectedIndex];
    if (!fromSquare) {
      if (!game.get(square)) return; // must pick piece
      setFromSquare(square);
    } else {
      if (fromSquare === square) {
        setFromSquare(null); // cancel pick
        return;
      }
      const moveMade = makeMove({ from: fromSquare, to: square, promotion: "q" });
      setFromSquare(null);
      if (moveMade) checkGameOver();
      if (mode === "single" && !game.isGameOver()) {
        setTimeout(() => {
          makeRandomMove();
          checkGameOver();
        }, 500);
      }
    }
  };

  const makeMove = (move) => {
    const copy = new Chess(game.fen());
    const result = copy.move(move);
    if (result) setGame(copy);
    return !!result;
  };

  const makeRandomMove = () => {
    const moves = game.moves();
    if (!moves.length) return;
    const move = moves[Math.floor(Math.random() * moves.length)];
    makeMove({ from: move.slice(0,2), to: move.slice(2,4) });
  };

  const onDrop = (source, target) => {
    if (isGameOver) return false;
    const moveMade = makeMove({ from: source, to: target, promotion: "q" });
    if (moveMade) {
      checkGameOver();
      if (mode === "single" && !game.isGameOver()) {
        setTimeout(() => {
          makeRandomMove();
          checkGameOver();
        }, 500);
      }
    }
    return moveMade;
  };

  const checkGameOver = () => {
    if (game.isGameOver()) {
      setIsGameOver(true);
      alert("Game Over!");
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setIsGameOver(false);
    setFromSquare(null);
    setSelectedIndex(0);
  };

  if (!mode) {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-4">Chess Game</h1>
        <div className="d-flex gap-3">
          <button className="btn btn-success" onClick={() => setMode("single")}>Single Player</button>
          <button className="btn btn-warning" onClick={() => setMode("multi")}>Two Players</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container text-center mt-4">
      <div className="d-flex justify-content-center">
        <div style={{ maxWidth: "400px", width: "100%" }}>
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            boardWidth={boardWidth}
            arePiecesDraggable={!isGameOver}
            customSquareStyles={
              fromSquare ? { [fromSquare]: { backgroundColor: "#f0ad4e88" } } : {}
            }
          />
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={resetGame}>Reset Game</button>
        <button className="btn btn-secondary" onClick={() => setMode(null)}>Change Mode</button>
      </div>
      <p className="mt-2">
        Use <b>Arrow Keys</b> to move selection, <b>Enter/Space</b> to pick/drop piece.
      </p>
    </div>
  );
};

export default ChessComponent;
