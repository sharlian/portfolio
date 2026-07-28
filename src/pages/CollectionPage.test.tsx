import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, expect, test } from 'vitest';
import { projects } from '../data/projects';
import { LanguageProvider } from '../i18n/LanguageProvider';
import { CollectionPage } from './CollectionPage';

afterEach(cleanup);

test('filters the collection page to one design theme', () => {
  render(<MemoryRouter initialEntries={['/works/emotion']}><LanguageProvider><Routes><Route element={<CollectionPage />} path="/works/:slug" /></Routes></LanguageProvider></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Emotion & Meaning' })).toBeInTheDocument();
  expect(screen.getByText(/Together/)).toBeInTheDocument();
});

test('renders every project on the All Works route', () => {
  render(<MemoryRouter initialEntries={['/works']}><LanguageProvider><Routes><Route element={<CollectionPage />} path="/works" /></Routes></LanguageProvider></MemoryRouter>);

  expect(screen.getByRole('heading', { name: '所有作品' })).toBeInTheDocument();
  expect(screen.getAllByRole('link')).toHaveLength(projects.length);
});
