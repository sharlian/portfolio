import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { isLocale, localeNames, type Locale, sharedLabels } from './locales';

const storageKey = 'sharlian-locale';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  labels: (typeof sharedLabels)[Locale];
  localeNames: typeof localeNames;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLocale(): Locale {
  const storedLocale = localStorage.getItem(storageKey);
  return isLocale(storedLocale) ? storedLocale : 'zh-Hant';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem(storageKey, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, labels: sharedLabels[locale], localeNames }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used within LanguageProvider');
  return value;
}
