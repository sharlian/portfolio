import { Link } from 'react-router-dom';

export function AllWorksHotspot() {
  return (
    <Link aria-label="All Works — Browse every project" className="desk-hotspot desk-hotspot--all" to="/works">
      <span aria-hidden="true" className="desk-hotspot__object desk-hotspot__object--all">
        <span>FORM · FEELING · USE</span>
      </span>
      <span className="desk-hotspot__copy">
        <strong className="desk-hotspot__title">ALL WORKS</strong>
        <span className="desk-hotspot__description">Objects, studies and resolved work.</span>
      </span>
    </Link>
  );
}
