import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, test } from 'vitest';
import { ProjectPage } from './ProjectPage';

test('renders the original project content in order', () => {
  render(<MemoryRouter initialEntries={['/projects/axiom-n']}><Routes><Route element={<ProjectPage />} path="/projects/:slug" /></Routes></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'LOUNGE CHAIR | Axiom.N' })).toBeInTheDocument();
  expect(screen.getByText(/Redefines modern relaxation/)).toBeInTheDocument();
  expect(screen.getByText(/year 2023/i)).toBeInTheDocument();
  expect(screen.getAllByRole('img')).toHaveLength(20);
});

test('marks missing Cargo assets without inventing replacements', () => {
  render(<MemoryRouter initialEntries={['/projects/company']}><Routes><Route element={<ProjectPage />} path="/projects/:slug" /></Routes></MemoryRouter>);
  expect(screen.getAllByText(/Original asset unavailable/)).toHaveLength(2);
});
