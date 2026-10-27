import type { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { useLanguage } from '../i18n/LanguageProvider';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { locale, labels } = useLanguage();
  const image = project.media[0];
  const copy = project.copy[locale];

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5).toFixed(2);
    const y = ((event.clientY - bounds.top) / bounds.height - .5).toFixed(2);
    event.currentTarget.style.setProperty('--pointer-x', x);
    event.currentTarget.style.setProperty('--pointer-y', y);
  }

  return (
    <article className={`atlas-card atlas-card--${index + 1}`} onPointerMove={handlePointerMove}>
      <Link aria-label={`${copy.title} — ${labels.openCaseStudy}`} to={`/works/${project.slug}`}>
        {image ? <img alt={image.alt[locale]} height={image.height} src={image.src} width={image.width} /> : null}
        <span className="atlas-card__meta"><span>{copy.kicker}</span><strong>{copy.title}</strong></span>
      </Link>
    </article>
  );
}
