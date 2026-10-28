import { Link, useParams } from 'react-router-dom';
import { collections, getProject } from '../data/projects';
import { NotFoundPage } from './NotFoundPage';

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug ?? '');
  if (!project) return <NotFoundPage />;

  return (
    <main id="main-content" tabIndex={-1}>
      <article className="case-study">
        <header className="case-study__heading">
          {project.categories.length ? (
            <nav aria-label="Project categories" className="project-categories">
              {project.categories.map((categorySlug) => {
                const category = collections.find((item) => item.slug === categorySlug);
                return category ? <Link key={category.slug} to={`/works/${category.slug}`}>{category.title}</Link> : null;
              })}
            </nav>
          ) : <p className="eyebrow">All Works</p>}
          <h1>{project.title}</h1>
          {project.year ? <p className="project-year">{project.year}</p> : null}
        </header>

        <div className="case-study__content">
          {project.content.map((block, index) => {
            if (block.type === 'text') return <p className="project-copy" key={`text-${index}`}>{block.text}</p>;
            if (block.type === 'divider') return <hr key={`divider-${index}`} />;
            if (block.type === 'image') {
              return (
                <figure className="project-media" key={`${block.src}-${index}`}>
                  <img alt={block.alt} height={block.height ?? undefined} loading={index < 2 ? 'eager' : 'lazy'} src={block.src} width={block.width ?? undefined} />
                </figure>
              );
            }
            if (block.type === 'video') {
              return (
                <figure className="project-media" key={`${block.src}-${index}`}>
                  <video aria-label={block.alt} controls playsInline preload="metadata" src={block.src} />
                </figure>
              );
            }
            return (
              <aside className="missing-asset" key={`${block.assetId}-${index}`}>
                <strong>{block.label}</strong>
                <span>Asset ID: {block.assetId}</span>
              </aside>
            );
          })}
        </div>
      </article>
    </main>
  );
}
