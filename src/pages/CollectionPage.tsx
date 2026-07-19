import { Link, useParams } from 'react-router-dom';
import { collections, projects, type CollectionSlug } from '../data/projects';
import { useLanguage } from '../i18n/LanguageProvider';

export function CollectionPage() {
  const { slug } = useParams();
  const { locale } = useLanguage();
  const collection = collections.find((item) => item.slug === slug);
  const items = projects.filter((project) => project.collection === slug as CollectionSlug);
  if (!collection) return null;
  return <main id="main-content" tabIndex={-1}><section className="listing"><h1>{collection.label[locale]}</h1><div className="work-grid">{items.map((project) => <Link key={project.slug} to={`/works/${project.slug}`}>{project.media[0] && <img alt={project.media[0].alt[locale]} height={project.media[0].height} loading="lazy" src={project.media[0].src} width={project.media[0].width} />}<span>{project.copy[locale].title}</span></Link>)}</div></section></main>;
}
