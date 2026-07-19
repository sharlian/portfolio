import { render, screen } from '@testing-library/react';
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
