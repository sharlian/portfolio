import { NavLink } from 'react-router-dom';
import { collections } from '../data/projects';
import { useLanguage } from '../i18n/LanguageProvider';

export function SiteNav() {
  const { locale, labels } = useLanguage();

  return (
    <nav className="site-nav" aria-label={labels.primaryNavigation}>
      {collections.map((collection) => (
        <NavLink key={collection.slug} to={`/works/${collection.slug}`}>
          {collection.label[locale]}
        </NavLink>
      ))}
      <NavLink to="/works">{labels.allWorks}</NavLink>
    </nav>
  );
}
