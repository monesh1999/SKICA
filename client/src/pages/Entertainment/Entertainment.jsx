import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Entertainment.css";

// Import images for each game (you can replace with your own)
import sudokuImg from "../../assets/sudoku.png";
import tictactoeImg from "../../assets/tictactoe.png";
import chessImg from "../../assets/chess.png";
import blockBlastImg from "../../assets/blockblast.png";
import game2048Img from "../../assets/2048.png";

const Entertainment = () => {
  const navigate = useNavigate();

  const games = [
    { name: "Sudoku", image: sudokuImg, path: "/sudoku" },
    { name: "Tic Tac Toe", image: tictactoeImg, path: "/tictactoe" },
    { name: "Chess", image: chessImg, path: "/chess" },
    { name: "Block Blast", image: blockBlastImg, path: "/blockblast" },
    { name: "2048", image: game2048Img, path: "/game2048" },
  ];

  return (
    <div className="container Entertainment-container mt-4">
      <h2 className="text-center mb-4">Entertainment</h2>
      <div className="row">
        {games.map((game, idx) => (
          <div className="col-6 col-md-3 mb-4" key={idx}>
            <div
              className="card game-card"
              onClick={() => navigate(game.path)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={game.image}
                className="card-img-top"
                alt={game.name}
              />
              <div className="card-body text-center">
                <h5 className="card-title text-primary">{game.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entertainment;
