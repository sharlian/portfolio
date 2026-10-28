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
});
