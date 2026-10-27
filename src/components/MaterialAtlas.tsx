import { type PointerEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { useLanguage } from '../i18n/LanguageProvider';
import { ProjectCard } from './ProjectCard';

export function MaterialAtlas({ projects }: { projects: Project[] }) {
  const { locale, labels } = useLanguage();
  const [openProject, setOpenProject] = useState<string | null>(null);

  function handleStagePointerMove(event: PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--orbit-x', ((event.clientX - bounds.left) / bounds.width - .5).toFixed(2));
    event.currentTarget.style.setProperty('--orbit-y', ((event.clientY - bounds.top) / bounds.height - .5).toFixed(2));
  }

  return (
    <section aria-label="Featured work" className="material-atlas">
      <div className="atlas-stage" onPointerMove={handleStagePointerMove}>
        <div className="atlas-title"><h1>Sharlian</h1><p>industrial design <span>|</span> product design <span>|</span> furniture design</p></div>
        <div className="atlas-desktop">{projects.map((project, index) => <ProjectCard index={index} key={project.slug} project={project} />)}</div>
      </div>
      <div className="atlas-mobile">
        {projects.map((project) => {
          const expanded = openProject === project.slug;
          const copy = project.copy[locale];
          const image = project.media[0];
          return <article className="mobile-project" key={project.slug}>
            {image ? <img alt={image.alt[locale]} height={image.height} loading="lazy" src={image.src} width={image.width} /> : null}
            <button aria-expanded={expanded} onClick={() => setOpenProject(expanded ? null : project.slug)} type="button">{labels.showProjectInfo}</button>
            {expanded && <div className="mobile-project__content"><p>{copy.kicker}</p><h2>{copy.title}</h2><p>{copy.statement}</p><Link to={`/works/${project.slug}`}>{labels.readCaseStudy}</Link></div>}
          </article>;
        })}
      </div>
    </section>
  );
}
