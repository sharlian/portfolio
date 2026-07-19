import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, test } from 'vitest';
import { LanguageProvider } from '../i18n/LanguageProvider';
import { CollectionPage } from './CollectionPage';

test('filters the collection page to one design theme', () => {
  render(<MemoryRouter initialEntries={['/works/emotion']}><LanguageProvider><Routes><Route element={<CollectionPage />} path="/works/:slug" /></Routes></LanguageProvider></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Emotion & Meaning' })).toBeInTheDocument();
  expect(screen.getByText(/Together/)).toBeInTheDocument();
});
