import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, test } from 'vitest';
import { LanguageProvider } from '../i18n/LanguageProvider';
import { ProjectPage } from './ProjectPage';

test('renders the case-study heading and related work', () => {
  render(<MemoryRouter initialEntries={['/works/lighting-backbone']}><LanguageProvider><Routes><Route element={<ProjectPage />} path="/works/:slug" /></Routes></LanguageProvider></MemoryRouter>);
  expect(screen.getByRole('heading', { name: /Backbone/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '相關作品' })).toBeInTheDocument();
});
