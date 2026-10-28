import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

afterEach(cleanup);

test.each(['/', '/works'])('hides the redundant All Works link at %s', (path) => {
  render(<MemoryRouter initialEntries={[path]}><SiteHeader /></MemoryRouter>);

  expect(screen.getByRole('link', { name: 'SHARLIAN TSENG — Back to home' })).toHaveAttribute('href', '/');
  expect(screen.queryByText('Home')).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'All Works' })).not.toBeInTheDocument();
});

test.each(['/works/emotion', '/projects/tie'])('keeps All Works available from %s', (path) => {
  render(<MemoryRouter initialEntries={[path]}><SiteHeader /></MemoryRouter>);

  expect(screen.getByRole('link', { name: 'All Works' })).toHaveAttribute('href', '/works');
});

test('renders only verified contact destinations', () => {
  render(<MemoryRouter><SiteFooter /></MemoryRouter>);

  expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual(['Email', 'Behance', 'LinkedIn']);
});
