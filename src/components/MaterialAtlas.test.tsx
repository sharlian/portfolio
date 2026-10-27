import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { featuredProjects } from '../data/projects';
import { LanguageProvider } from '../i18n/LanguageProvider';
import { MaterialAtlas } from './MaterialAtlas';

test('reveals metadata when a featured card receives keyboard focus', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><LanguageProvider><MaterialAtlas projects={featuredProjects} /></LanguageProvider></MemoryRouter>);

  await user.tab();

  expect(screen.getByText(featuredProjects[0].copy['zh-Hant'].title)).toBeVisible();
});

test('shows a project link after mobile disclosure', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><LanguageProvider><MaterialAtlas projects={featuredProjects} /></LanguageProvider></MemoryRouter>);

  await user.click(screen.getAllByRole('button', { name: '顯示作品資訊' })[0]);

  expect(screen.getAllByRole('link', { name: /閱讀案例/ })[0]).toBeVisible();
});

test('records pointer position for a desktop card response', () => {
  render(<MemoryRouter><LanguageProvider><MaterialAtlas projects={featuredProjects} /></LanguageProvider></MemoryRouter>);
  const card = screen.getAllByRole('link')[0].closest('article')!;
  Object.defineProperty(card, 'getBoundingClientRect', { value: () => ({ left: 0, top: 0, width: 100, height: 100 }) });

  fireEvent.pointerMove(card, { clientX: 80, clientY: 20 });

  expect(card).toHaveStyle({ '--pointer-x': '0.30', '--pointer-y': '-0.30' });
});

test('moves the atlas composition with the pointer', () => {
  render(<MemoryRouter><LanguageProvider><MaterialAtlas projects={featuredProjects} /></LanguageProvider></MemoryRouter>);
  const stage = document.querySelector('.atlas-stage')!;
  Object.defineProperty(stage, 'getBoundingClientRect', { value: () => ({ left: 0, top: 0, width: 100, height: 100 }) });
  fireEvent.pointerMove(stage, { clientX: 80, clientY: 20 });
  expect(stage).toHaveStyle({ '--orbit-x': '0.30', '--orbit-y': '-0.30' });
});
