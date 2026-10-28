import { Link } from 'react-router-dom';
import { site } from '../data/projects';

export function SiteHeader() {
  return (
    <header className="portfolio-header">
      <Link aria-label={`${site.name} — Back to home`} className="portfolio-brand" to="/">
        <strong>{site.name}</strong>
        <span>{site.role}</span>
      </Link>
      <nav aria-label="Portfolio navigation">
        <Link className="portfolio-all-works" to="/works">All Works</Link>
      </nav>
    </header>
  );
}
