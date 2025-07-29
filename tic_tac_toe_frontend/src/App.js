import React, { useState } from 'react';
import './App.css';

// Color palette from requirements
const COLORS = {
  primary: '#1976d2', // blue
  secondary: '#e3e3e3', // light gray
  accent: '#f44336', // red for winner highlight
};

// PUBLIC_INTERFACE
function App() {
  /**
   * This is the main app for the Tic Tac Toe game.
   * Game board and state are managed here.
   */

  // The empty board template
  const initialBoard = Array(9).fill(null);

  // React state hooks
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Compute next player's mark
  const currentPlayer = xIsNext ? 'X' : 'O';

  // PUBLIC_INTERFACE
  function handleClick(index) {
    // If the square is filled or game over, ignore clicks
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check for winner after the move
    const gameResult = calculateWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
    } else if (newBoard.every(Boolean)) {
      setWinner('draw');
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

  // Board rendering logic
  function renderSquare(i) {
    return (
      <button
        className="ttt-square"
        onClick={() => handleClick(i)}
        aria-label={`Cell ${i+1} (${board[i] ? board[i] : 'empty'})`}
        style={getSquareStyle(i, board, winner)}
      >
        {board[i]}
      </button>
    );
  }

  // Build the game status message
  let status;
  if (winner === 'draw') {
    status = <span className="ttt-draw">It's a draw!</span>;
  } else if (winner) {
    status = (
      <span className="ttt-winner">
        {winner.player} wins!
      </span>
    );
  } else {
    status = (
      <span>
        Next: <span style={{color: COLORS.primary, fontWeight: 600}}>{currentPlayer}</span>
      </span>
    );
  }

  // Find winning line to highlight squares (if applicable)
  const winningLine = Array.isArray(winner?.line) ? winner.line : null;

  // Minimal and centered layout with light theme
  return (
    <div className="ttt-outer">
      <main className="ttt-container" role="main">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
          {[0,1,2].map(row => (
            <div className="ttt-row" key={row}>
              { [0,1,2].map(col =>
                renderSquare(row * 3 + col))}
            </div>
          ))}
        </div>
        <div className="ttt-info">
          <div className="ttt-status">{status}</div>
          <button
            className="ttt-restart"
            onClick={handleRestart}
            aria-label="Restart game"
          >
            Restart
          </button>
        </div>
      </main>
      <footer className="ttt-footer">
        <small>
          Developed by Kavia
        </small>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(board) {
  /**
   * Determines the winner of the Tic Tac Toe game, if any. Returns:
   *   - {player: X|O, line: [i,j,k]} if there's a winner
   *   - null otherwise
   */
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let line of lines) {
    const [a,b,c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {player: board[a], line};
    }
  }
  return null;
}

// Helper for conditional highlight styling
function getSquareStyle(i, board, winner) {
  let style = {
    color: board[i] === 'X' ? COLORS.primary : (board[i] === 'O' ? COLORS.accent : 'inherit'),
    borderColor: COLORS.secondary,
    fontWeight: 500,
    boxShadow: 'none',
    background: '#fff',
    transition: 'background 0.2s, color 0.2s'
  };
  // Highlight winning line
  if (Array.isArray(winner?.line) && winner.line.includes(i)) {
    style.background = COLORS.secondary;
    style.boxShadow = `0 0 3px 2px ${COLORS.accent}55`;
    style.fontWeight = 700;
    style.color = COLORS.accent;
    style.borderColor = COLORS.accent;
  }
  return style;
}

export default App;
