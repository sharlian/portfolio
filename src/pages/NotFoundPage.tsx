import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="not-found" id="main-content" tabIndex={-1}>
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <Link className="button-link" to="/works">View all works</Link>
    </main>
  );
}
