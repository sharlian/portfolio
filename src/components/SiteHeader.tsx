import { Link, useLocation } from 'react-router-dom';
import { site } from '../data/projects';

export function SiteHeader() {
  const { pathname } = useLocation();
  const showAllWorks = pathname !== '/' && pathname !== '/works';

  return (
    <header className="portfolio-header">
      <Link aria-label={`${site.name} — Back to home`} className="portfolio-brand" to="/">
        <strong>{site.name}</strong>
        <span>{site.role}</span>
      </Link>
      {showAllWorks ? (
        <nav aria-label="Portfolio navigation">
          <Link className="portfolio-all-works" to="/works">All Works</Link>
        </nav>
      ) : null}
    </header>
  );
}
