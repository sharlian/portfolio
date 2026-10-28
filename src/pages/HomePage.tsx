import { Link } from 'react-router-dom';
import { collections, site } from '../data/projects';

export function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="home-hero">
        <p className="eyebrow">{site.role}</p>
        <h1>{site.name}</h1>
        <p className="home-hero__introduction">{site.introduction}</p>
        <Link aria-label="Browse all works" className="button-link" to="/works">All Works</Link>
      </section>

      <section aria-labelledby="categories-heading" className="home-categories">
        <h2 className="sr-only" id="categories-heading">Browse work by category</h2>
        {collections.map((collection) => (
          <Link className="category-card" key={collection.slug} to={`/works/${collection.slug}`}>
            <span><strong>{collection.title}</strong><small>View works</small></span>
            <p>{collection.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
