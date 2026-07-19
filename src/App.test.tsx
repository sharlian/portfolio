import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';

test('renders the portfolio shell', () => {
  render(<App />);

  expect(screen.getByRole('main')).toBeInTheDocument();
});
