import { render, screen } from '@testing-library/react';
import App from './App';

test('renders table header', () => {
  render(<App />);
  const tableHeader = screen.getByText(/Docked/i);
  expect(tableHeader).toBeInTheDocument();
});
