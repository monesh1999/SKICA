import React, { useEffect, useRef, useState } from "react";
import "./BlockBlast.css";

const BlockBlast = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);

  // Game settings
  const paddleWidth = 100;
  const paddleHeight = 10;
  const ballRadius = 8;
  const rowCount = 3;
  const columnCount = 5;
  const blockWidth = 70;
  const blockHeight = 20;
  const blockPadding = 10;
  const blockOffsetTop = 30;
  const blockOffsetLeft = 35;

  const [paddleX, setPaddleX] = useState(0);
  const [dx, setDx] = useState(2);
  const [dy, setDy] = useState(-2);
  const [ballX, setBallX] = useState(150);
  const [ballY, setBallY] = useState(200);

  // Initialize blocks
  const blocks = useRef([]);
  for (let c = 0; c < columnCount; c++) {
    blocks.current[c] = [];
    for (let r = 0; r < rowCount; r++) {
      blocks.current[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  const drawBall = (ctx) => {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#007bff";
    ctx.fill();
    ctx.closePath();
  };

  const drawPaddle = (ctx) => {
    ctx.beginPath();
    ctx.rect(paddleX, ctx.canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#28a745";
    ctx.fill();
    ctx.closePath();
  };

  const drawBlocks = (ctx) => {
    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < rowCount; r++) {
        const b = blocks.current[c][r];
        if (b.status === 1) {
          const blockX = c * (blockWidth + blockPadding) + blockOffsetLeft;
          const blockY = r * (blockHeight + blockPadding) + blockOffsetTop;
          b.x = blockX;
          b.y = blockY;
          ctx.beginPath();
          ctx.rect(blockX, blockY, blockWidth, blockHeight);
          ctx.fillStyle = "#dc3545";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  };

  const collisionDetection = () => {
    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < rowCount; r++) {
        const b = blocks.current[c][r];
        if (b.status === 1) {
          if (
            ballX > b.x &&
            ballX < b.x + blockWidth &&
            ballY > b.y &&
            ballY < b.y + blockHeight
          ) {
            setDy(-dy);
            b.status = 0;
            setScore((prev) => prev + 1);
          }
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setPaddleX((canvas.width - paddleWidth) / 2);

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setPaddleX((prev) => Math.min(prev + 20, canvas.width - paddleWidth));
      } else if (e.key === "ArrowLeft") {
        setPaddleX((prev) => Math.max(prev - 20, 0));
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBlocks(ctx);
      drawBall(ctx);
      drawPaddle(ctx);
      collisionDetection();

      // Bounce off walls
      if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
        setDx(-dx);
      }
      if (ballY + dy < ballRadius) {
        setDy(-dy);
      } else if (ballY + dy > canvas.height - ballRadius - paddleHeight) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
          setDy(-dy);
        } else if (ballY + dy > canvas.height - ballRadius) {
          alert("GAME OVER");
          document.location.reload();
        }
      }

      setBallX((prev) => prev + dx);
      setBallY((prev) => prev + dy);
    }, 10);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ballX, ballY, dx, dy, paddleX]);

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={300} className="border" />
      <div className="mt-2">Score: {score}</div>
    </div>
  );
};

export default BlockBlast;
