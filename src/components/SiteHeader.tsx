import { Link, useLocation } from 'react-router-dom';
import { site } from '../data/projects';

export function SiteHeader() {
  const { pathname } = useLocation();
  const firstName = site.name.split(' ')[0].toLocaleLowerCase();
  const brandName = firstName.charAt(0).toLocaleUpperCase() + firstName.slice(1);
  const showAllWorks = pathname !== '/' && pathname !== '/works';

  return (
    <header className="portfolio-header">
      <Link aria-label={`${brandName} — Back to home`} className="portfolio-brand" to="/">
        <strong className="portfolio-brand__wordmark">{brandName}</strong>
      </Link>
      {showAllWorks ? (
        <nav aria-label="Portfolio navigation">
          <Link className="portfolio-all-works" to="/works">All Works</Link>
        </nav>
      ) : null}
    </header>
  );
}
