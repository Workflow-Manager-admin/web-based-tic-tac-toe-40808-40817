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
  fireEvent.click(screen.getByRole('button', { name: /restart/i }));
  // Board should be empty again
  screen.getAllByRole('button', { name: /Cell/i }).forEach(cell =>
    expect(cell.textContent).toBe('')
  );
  // Next: X again
  expect(screen.getByText(/Next:/)).toBeInTheDocument();
  expect(screen.getByText('X')).toBeInTheDocument();
});
