import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { LanguageProvider } from '../i18n/LanguageProvider';
import { LanguageSwitch } from './LanguageSwitch';

test('switches every language button with an accessible pressed state', async () => {
  const user = userEvent.setup();
  render(<LanguageProvider><LanguageSwitch /></LanguageProvider>);

  await user.click(screen.getByRole('button', { name: 'English' }));

  expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true');
});
