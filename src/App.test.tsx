import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, test, expect } from 'vitest';
import App from './App';

afterEach(cleanup);

test('renders the portfolio shell and canonical work navigation', () => {
  render(<App />);

  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'SHARLIAN TSENG — Back to home' })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: 'All Works' })).toHaveAttribute('href', '/works');
  expect(screen.getByRole('link', { name: /Emotion & Meaning/ })).toHaveAttribute('href', '/works/emotion');
  expect(screen.getByRole('link', { name: /Form & Culture/ })).toHaveAttribute('href', '/works/form');
  expect(screen.getByRole('link', { name: /Function & Reality/ })).toHaveAttribute('href', '/works/function');
  expect(screen.getAllByText('Product & Furniture Designer')).toHaveLength(2);
  expect(document.querySelectorAll('main img')).toHaveLength(0);
  expect(screen.queryByText('View works')).not.toBeInTheDocument();
  expect(screen.queryByText('Design with sense and sensibility — balancing emotion and logic in form.')).not.toBeInTheDocument();
});
