import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, test, expect } from 'vitest';
import App from './App';

afterEach(cleanup);

test('renders the portfolio shell and canonical work navigation', () => {
  render(<App />);

  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'SHARLIAN TSENG — Back to home' })).toHaveAttribute('href', '/');
  expect(screen.queryByRole('link', { name: 'All Works' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Browse all works' })).toHaveAttribute('href', '/works');
  expect(screen.getByRole('link', { name: /Emotion & Meaning/ })).toHaveAttribute('href', '/works/emotion');
  expect(screen.getByRole('link', { name: /Form & Culture/ })).toHaveAttribute('href', '/works/form');
  expect(screen.getByRole('link', { name: /Function & Reality/ })).toHaveAttribute('href', '/works/function');
  expect(screen.getAllByText('Product & Furniture Designer')).toHaveLength(2);
  expect(document.querySelectorAll('main img')).toHaveLength(0);
  expect(screen.queryByText('View works')).not.toBeInTheDocument();
  expect(screen.queryByText('Design with sense and sensibility — balancing emotion and logic in form.')).not.toBeInTheDocument();
  expect(document.querySelector('.home-hero .button-link')).not.toBeInTheDocument();
  expect(document.querySelector('.home-categories > .button-link')).toHaveAttribute('href', '/works');
});

test('adds decorative arrows to each category link without changing its accessible name', () => {
  render(<App />);

  const categoryNames = ['Emotion & Meaning', 'Form & Culture', 'Function & Reality'];

  categoryNames.forEach((name) => {
    const link = screen.getByRole('link', { name });
    const arrow = link.querySelector('.category-card__arrow');

    expect(arrow).toHaveTextContent('➜');
    expect(arrow).toHaveAttribute('aria-hidden', 'true');
  });
});

test('keeps contact links in the footer without repeating the designer name', () => {
  render(<App />);

  const footer = document.querySelector('.portfolio-footer');

  expect(footer?.querySelector('p')).not.toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Contact Sharlian' })).toBeInTheDocument();
});
