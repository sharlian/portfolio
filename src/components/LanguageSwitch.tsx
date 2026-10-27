import { locales } from '../i18n/locales';
import { useLanguage } from '../i18n/LanguageProvider';

export function LanguageSwitch() {
  const { locale, setLocale, localeNames, labels } = useLanguage();

  return (
    <div className="language-switch" aria-label={labels.language}>
      {locales.map((language) => (
        <button
          aria-label={localeNames[language]}
          aria-pressed={locale === language}
          key={language}
          onClick={() => setLocale(language)}
          type="button"
        >
          {language === 'zh-Hant' ? '中繁' : language === 'zh-Hans' ? '中简' : 'En'}
        </button>
      ))}
    </div>
  );
}
