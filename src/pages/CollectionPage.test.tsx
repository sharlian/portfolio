import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, expect, test } from 'vitest';
import { projects } from '../data/projects';
import { CollectionPage } from './CollectionPage';

afterEach(cleanup);

test('filters the collection page to one design theme', () => {
  render(<MemoryRouter initialEntries={['/works/emotion']}><Routes><Route element={<CollectionPage />} path="/works/:slug" /></Routes></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Emotion & Meaning' })).toBeInTheDocument();
  expect(screen.getAllByRole('link')).toHaveLength(9);
  expect(screen.getByText('PET_HUMAN | Eat together !')).toBeInTheDocument();
});

test('renders every project on the All Works route', () => {
  render(<MemoryRouter initialEntries={['/works']}><Routes><Route element={<CollectionPage />} path="/works" /></Routes></MemoryRouter>);

  expect(screen.getByRole('heading', { name: 'All Works' })).toBeInTheDocument();
  expect(screen.getAllByRole('link')).toHaveLength(projects.length);
});
