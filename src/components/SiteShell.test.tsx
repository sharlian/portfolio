import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../i18n/LanguageProvider';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

afterEach(cleanup);

test('uses the designer name as the only home link', () => {
  render(<MemoryRouter><LanguageProvider><SiteHeader /></LanguageProvider></MemoryRouter>);

  expect(screen.getByRole('link', { name: 'SHARLIAN TSENG — Back to desk' })).toHaveAttribute('href', '/');
  expect(screen.queryByText('Home')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'ALL WORKS' })).toHaveAttribute('href', '/works');
});

test('renders only verified contact destinations', () => {
  render(<MemoryRouter><SiteFooter /></MemoryRouter>);

  expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual(['Email', 'Behance', 'LinkedIn']);
});
