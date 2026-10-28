import portfolioContent from './portfolio-content.json';
import type { Locale } from '../i18n/locales';

export type CollectionSlug = 'emotion' | 'form' | 'function';

export type ImageBlock = {
  type: 'image';
  src: string;
  width: number | null;
  height: number | null;
  alt: string;
};

export type VideoBlock = {
  type: 'video';
  src: string;
  width: number | null;
  height: number | null;
  alt: string;
};

export type ProjectBlock =
  | { type: 'text'; text: string }
  | { type: 'divider' }
  | ImageBlock
  | VideoBlock
  | { type: 'missing'; assetId: string; label: string };

export type Project = {
  slug: string;
  title: string;
  categories: CollectionSlug[];
  year?: string;
  cover: { src: string; width: number; height: number; alt: string };
  content: ProjectBlock[];
  // Compatibility for the archived desk prototype, which is no longer routed.
  collection: CollectionSlug;
  featured: boolean;
  media: { src: string; width: number; height: number; alt: Record<Locale, string> }[];
  copy: Record<Locale, { title: string; kicker: string; statement: string; sections: never[] }>;
};

export type Collection = {
  slug: CollectionSlug;
  title: string;
  description: string;
  projectSlugs: string[];
};

type PortfolioData = {
  site: {
    name: string;
    role: string;
    introduction: string;
    contacts: { label: string; href: string }[];
  };
  categories: Collection[];
  projects: Omit<Project, 'collection' | 'featured' | 'media' | 'copy'>[];
  missingAssets: {
    projectTitle: string;
    projectSlug: string;
    assetId: string;
    sourcePosition: number;
    reason: string;
  }[];
  sourceDefects: { projectTitle: string; detail: string }[];
};

const data = portfolioContent as PortfolioData;

export const site = data.site;
export const collections = data.categories;
export const missingAssets = data.missingAssets;
export const sourceDefects = data.sourceDefects;

export const projects: Project[] = data.projects.map((project, index) => {
  const collection = project.categories[0] ?? 'function';
  const statement = project.content.find((block) => block.type === 'text')?.text ?? '';
  const copy = {
    title: project.title,
    kicker: collections.find((item) => item.slug === collection)?.title ?? 'All Works',
    statement,
    sections: [] as never[],
  };
  const alt = { 'zh-Hant': project.cover.alt, 'zh-Hans': project.cover.alt, en: project.cover.alt };
  return {
    ...project,
    collection,
    featured: index < 5,
    media: [{ ...project.cover, alt }],
    copy: { 'zh-Hant': copy, 'zh-Hans': copy, en: copy },
  };
});

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
export function getCollection(slug: string | undefined): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}
