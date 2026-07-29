import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, test, expect } from 'vitest';
import App from './App';

afterEach(cleanup);

test('renders the portfolio shell and canonical desk navigation', () => {
  render(<App />);

  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'SHARLIAN TSENG — Back to desk' })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: 'ALL WORKS' })).toHaveAttribute('href', '/works');
  expect(screen.getByRole('link', { name: /Emotion & Meaning/ })).toHaveAttribute('href', '/works/emotion');
  expect(screen.getByRole('link', { name: /Form & Culture/ })).toHaveAttribute('href', '/works/form');
  expect(screen.getByRole('link', { name: /Function & Reality/ })).toHaveAttribute('href', '/works/function');
});

test('uses the same local day mode for the persistent shell and desk scene', () => {
  const { container } = render(<App now={new Date(2026, 6, 29, 12, 0)} />);

  expect(container.querySelector('.portfolio-app')).toHaveAttribute('data-mode', 'day');
  expect(container.querySelector('.desk-scene')).toHaveAttribute('data-mode', 'day');
});
