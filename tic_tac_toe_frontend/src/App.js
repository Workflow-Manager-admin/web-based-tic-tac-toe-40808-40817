import React, { useState } from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Main App component for minimalistic Tic Tac Toe game.
 * - Renders a centered 3x3 grid
 * - Shows current player, winner, or draw info
 * - Allows restart/new game
 */
function App() {
  // Game board: Array of 9 cells (null | "X" | "O")
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Who is the current player? ("X" or "O")
  const currentPlayer = xIsNext ? "X" : "O";

  // PUBLIC_INTERFACE
  function handleClick(i) {
    if (board[i] || winner) return;
    const nextBoard = board.slice();
    nextBoard[i] = currentPlayer;
    setBoard(nextBoard);
    const result = calculateWinner(nextBoard);
    if (result) {
      setWinner(result);
    } else if (nextBoard.every(Boolean)) {
      setWinner("draw");
    } else {
      setXIsNext(!xIsNext);
    }
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
  }

  function renderSquare(i) {
    return (
      <button
        className="ttt-square"
        onClick={() => handleClick(i)}
        aria-label={`Cell ${i + 1} (${board[i] ? board[i] : "empty"})`}
        style={getSquareStyle(i, board, winner)}
      >
        {board[i]}
      </button>
    );
  }

  // Game status display (winner, draw, or next player)
  let status;
  if (winner === "draw") {
    status = (
      <span className="ttt-draw">
        It's a draw!
      </span>
    );
  } else if (winner && winner.player) {
    status = (
      <span className="ttt-winner">
        {winner.player} wins!
      </span>
    );
  } else {
    status = (
      <span>
        Next:{" "}
        <span style={{ color: "var(--primary)", fontWeight: 600 }}>
          {currentPlayer}
        </span>
      </span>
    );
  }

  return (
    <div className="ttt-outer">
      <div className="ttt-main-centered">
        <main className="ttt-container" role="main">
          <h1 className="ttt-title">Tic Tac Toe</h1>
          <div
            className="ttt-board"
            role="grid"
            aria-label="Tic Tac Toe board"
          >
            {[0, 1, 2].map((row) => (
              <div className="ttt-row" key={row}>
                {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
              </div>
            ))}
          </div>
          <div className="ttt-info">
            <div className="ttt-status" data-testid="status-msg">{status}</div>
            <button
              className="ttt-restart"
              onClick={handleRestart}
              aria-label="Restart game"
            >
              {winner || board.some(Boolean) ? "Restart" : "Start New Game"}
            </button>
          </div>
        </main>
        {/* Lightweight, minimal floating footer */}
        <footer className="ttt-footer-floating">
          <small>
            Developed by Kavia
          </small>
        </footer>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(board) {
  /**
   * Returns an object {player: "X"|"O", line: [i,j,k]} if a player has won
   * Returns null if no winner
   */
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6] // Diags
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }
  return null;
}

// Returns style overrides for a cell (highlight the winning line, color x/o)
function getSquareStyle(i, board, winner) {
  let style = {
    color:
      board[i] === "X"
        ? "var(--primary)"
        : board[i] === "O"
        ? "var(--accent)"
        : "inherit",
    borderColor: "var(--secondary)",
    fontWeight: 500,
    boxShadow: "none",
    background: "#fff",
    transition: "background 0.2s, color 0.2s",
  };
  // If this cell is part of winning line, highlight
  if (winner && Array.isArray(winner.line) && winner.line.includes(i)) {
    style.background = "var(--secondary)";
    style.boxShadow = `0 0 3px 2px var(--accent, #f44336)55`;
    style.fontWeight = 700;
    style.color = "var(--accent)";
    style.borderColor = "var(--accent)";
  }
  return style;
}

export default App;
