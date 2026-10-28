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

test('renders the recovered Company assets in their original positions', () => {
  render(<MemoryRouter initialEntries={['/projects/company']}><Routes><Route element={<ProjectPage />} path="/projects/:slug" /></Routes></MemoryRouter>);

  expect(screen.queryByText(/Original asset unavailable/)).not.toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'PET URN | Company — image 7' })).toHaveAttribute('src', '/media/display/E2605376898779255339093382875918.avif');
  expect(screen.getByRole('img', { name: 'PET URN | Company — image 10' })).toHaveAttribute('src', '/media/display/L2605378966493245305270733064974.avif');
});
