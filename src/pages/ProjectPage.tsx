import { Link, useParams } from 'react-router-dom';
import { getProject, projects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageProvider';

export function ProjectPage() {
  const { slug } = useParams();
  const { locale, labels } = useLanguage();
  const project = getProject(slug ?? '');
  if (!project) return null;
  const copy = project.copy[locale];
  const related = projects.filter((item) => item.slug !== project.slug && item.collection === project.collection).slice(0, 3);
  return <main id="main-content" tabIndex={-1}><article className="case-study"><p>{copy.kicker}</p><h1>{copy.title}</h1><p className="case-study__statement">{copy.statement}</p>{project.media.map((image) => <img alt={image.alt[locale]} height={image.height} key={image.src} src={image.src} width={image.width} />)}{copy.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}<section><h2>{labels.relatedWork}</h2><ul>{related.map((item) => <li key={item.slug}><Link to={`/works/${item.slug}`}>{item.copy[locale].title}</Link></li>)}</ul></section></article></main>;
}
