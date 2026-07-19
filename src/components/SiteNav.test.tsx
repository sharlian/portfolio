import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { LanguageProvider } from '../i18n/LanguageProvider';
import { SiteNav } from './SiteNav';

test('offers all four collection routes', () => {
  render(<MemoryRouter><LanguageProvider><SiteNav /></LanguageProvider></MemoryRouter>);

  expect(screen.getAllByRole('link')).toHaveLength(4);
  expect(screen.getByRole('link', { name: '所有作品' })).toHaveAttribute('href', '/works');
});
