import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';

test('renders the portfolio shell and canonical desk navigation', () => {
  render(<App />);

  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'SHARLIAN TSENG — Back to desk' })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: 'ALL WORKS' })).toHaveAttribute('href', '/works');
  expect(screen.getByRole('link', { name: /Emotion & Meaning/ })).toHaveAttribute('href', '/works/emotion');
  expect(screen.getByRole('link', { name: /Form & Culture/ })).toHaveAttribute('href', '/works/form');
  expect(screen.getByRole('link', { name: /Function & Reality/ })).toHaveAttribute('href', '/works/function');
});
