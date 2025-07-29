import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// PUBLIC_INTERFACE
test('renders minimalistic tic tac toe app UI and allows basic interaction', () => {
  render(<App />);
  // Game title
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();

  // There should be 9 cells (buttons)
  const cells = screen.getAllByRole('button', { name: /Cell/i });
  expect(cells.length).toBe(9);

  // Display of current player (X starts)
  expect(screen.getByText(/Next:/)).toBeInTheDocument();
  expect(screen.getByText('X')).toBeInTheDocument();

  // User interaction simulates a win
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X wins

  // After a win, winner is announced
  expect(screen.getByText(/X wins!/i)).toBeInTheDocument();

  // Restart resets game
  fireEvent.click(screen.getByRole('button', { name: /restart|start new game/i }));
  // Board should be empty again
  screen.getAllByRole('button', { name: /Cell/i }).forEach(cell =>
    expect(cell.textContent).toBe('')
  );
  // Next: X again
  expect(screen.getByText(/Next:/)).toBeInTheDocument();
  expect(screen.getByText('X')).toBeInTheDocument();
});

test('can play to a draw', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /Cell/i });
  // Fill the board: X O X / X X O / O X O (no winner)
  [
    0, 1, 2, 3, 4, 5, 6, 7, 8
  ].forEach(i => {
    if (cells[i].textContent === '') fireEvent.click(cells[i]);
    // alternate X and O automatically by the app logic
  });
  // Play moves: X, O, X, O, X, O, X, O, X in sequence
  // After draw, should see "It's a draw!"
  expect(screen.getByText(/draw!/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /restart|start new game/i })).toBeInTheDocument();
});
