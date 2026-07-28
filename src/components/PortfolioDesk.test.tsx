import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { PortfolioDesk } from './PortfolioDesk';

test('renders the four canonical desk destinations in reading order', () => {
  render(<MemoryRouter><PortfolioDesk now={new Date(2026, 6, 29, 12, 0)} /></MemoryRouter>);

  expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
    '/works',
    '/works/emotion',
    '/works/form',
    '/works/function',
  ]);
});

test('uses the same four navigation destinations in night mode', () => {
  const { container } = render(<MemoryRouter><PortfolioDesk now={new Date(2026, 6, 29, 22, 0)} /></MemoryRouter>);

  expect(container.querySelector('[data-mode="night"]')).toBeInTheDocument();
  expect(within(container).getAllByRole('link')).toHaveLength(4);
});
