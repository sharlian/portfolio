import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { LanguageProvider, useLanguage } from './LanguageProvider';

function Probe() {
  const { locale, setLocale } = useLanguage();

  return (
    <>
      <output>{locale}</output>
      <button type="button" onClick={() => setLocale('zh-Hant')}>繁體中文</button>
    </>
  );
}

test('stores the selected locale and restores it', async () => {
  localStorage.setItem('sharlian-locale', 'en');
  const user = userEvent.setup();

  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>,
  );

  expect(screen.getByText('en')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: '繁體中文' }));
  expect(localStorage.getItem('sharlian-locale')).toBe('zh-Hant');
});
