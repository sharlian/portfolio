import { Link } from 'react-router-dom';
import { LanguageSwitch } from './LanguageSwitch';

export function SiteHeader() {
  return (
    <header className="portfolio-header">
      <Link aria-label="SHARLIAN TSENG — Back to desk" className="portfolio-brand" to="/">
        <strong>SHARLIAN TSENG</strong>
        <span>Product &amp; Furniture Designer</span>
      </Link>
      <nav aria-label="Direct portfolio navigation" className="portfolio-header__navigation">
        <Link className="portfolio-all-works" to="/works">ALL WORKS</Link>
      </nav>
      <div className="portfolio-header__language"><LanguageSwitch /></div>
    </header>
  );
}
