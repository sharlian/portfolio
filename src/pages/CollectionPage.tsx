import { Link, useParams } from 'react-router-dom';
import { getCollection, projects } from '../data/projects';
import { NotFoundPage } from './NotFoundPage';

export function CollectionPage() {
  const { slug } = useParams();
  const collection = getCollection(slug);
  if (slug && !collection) return <NotFoundPage />;

  const items = collection
    ? collection.projectSlugs
        .map((projectSlug) => projects.find((project) => project.slug === projectSlug))
        .filter((project) => project !== undefined)
    : projects;

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="listing">
        <header className="page-heading">
          <p className="eyebrow">Portfolio</p>
          <h1>{collection?.title ?? 'All Works'}</h1>
          {collection ? <p>{collection.description}</p> : null}
        </header>
        <div className="work-grid">
          {items.map((project) => (
            <Link className="work-card" key={project.slug} to={`/projects/${project.slug}`}>
              <img alt={project.cover.alt} height={project.cover.height} loading="lazy" src={project.cover.src} width={project.cover.width} />
              <span>{project.title}</span>
              {project.year ? <small>{project.year}</small> : null}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
