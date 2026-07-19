import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { useLanguage } from '../i18n/LanguageProvider';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { locale, labels } = useLanguage();
  const image = project.media[0];
  const copy = project.copy[locale];

  return (
    <article className={`atlas-card atlas-card--${index + 1}`}>
      <Link aria-label={`${copy.title} — ${labels.openCaseStudy}`} to={`/works/${project.slug}`}>
        {image ? <img alt={image.alt[locale]} height={image.height} src={image.src} width={image.width} /> : null}
        <span className="atlas-card__meta"><span>{copy.kicker}</span><strong>{copy.title}</strong></span>
      </Link>
    </article>
  );
}
