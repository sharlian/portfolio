import type { Locale } from '../i18n/locales';

export type CollectionSlug = 'emotion' | 'form' | 'function';

export type ProjectCopy = {
  title: string;
  kicker: string;
  statement: string;
  sections: { title: string; body: string }[];
};

export type Project = {
  slug: string;
  collection: CollectionSlug;
  featured: boolean;
  media: { src: string; alt: Record<Locale, string>; width: number; height: number }[];
  copy: Record<Locale, ProjectCopy>;
};

export const collections: { slug: CollectionSlug; label: Record<Locale, string> }[] = [
  { slug: 'emotion', label: { 'zh-Hant': 'Emotion & Meaning', 'zh-Hans': 'Emotion & Meaning', en: 'Emotion & Meaning' } },
  { slug: 'form', label: { 'zh-Hant': 'Form & Culture', 'zh-Hans': 'Form & Culture', en: 'Form & Culture' } },
  { slug: 'function', label: { 'zh-Hant': 'Function & Reality', 'zh-Hans': 'Function & Reality', en: 'Function & Reality' } },
];

const copy = (zhHant: ProjectCopy, zhHans: ProjectCopy, en: ProjectCopy): Record<Locale, ProjectCopy> => ({
  'zh-Hant': zhHant,
  'zh-Hans': zhHans,
  en,
});

export const projects: Project[] = [
  {
    slug: 'lighting-backbone', collection: 'function', featured: true,
    media: [{ src: 'https://freight.cargo.site/w/1200/i/L2604054356492964936923035945742/a3e5c8220823387.68c2a3ee2a5fa.png', width: 4096, height: 2618, alt: { 'zh-Hant': 'Backbone 照明設計', 'zh-Hans': 'Backbone 照明设计', en: 'Backbone lighting design' } }],
    copy: copy(
      { title: 'LIGHTING | Backbone', kicker: 'Function & Reality', statement: '以光線與結構為起點的照明設計。', sections: [] },
      { title: 'LIGHTING | Backbone', kicker: 'Function & Reality', statement: '以光线与结构为起点的照明设计。', sections: [] },
      { title: 'LIGHTING | Backbone', kicker: 'Function & Reality', statement: 'A lighting study that begins with structure and illumination.', sections: [] },
    ),
  },
  {
    slug: 'pet-human-together-ii', collection: 'emotion', featured: true,
    media: [{ src: 'https://freight.cargo.site/w/1200/i/L2604079142147044927509002406670/d5581b235069883.68d246ce7ea76.png', width: 4330, height: 2560, alt: { 'zh-Hant': 'Together.Ⅱ 寵物與人共居設計', 'zh-Hans': 'Together.Ⅱ 宠物与人共居设计', en: 'Together.II pet and human living design' } }],
    copy: copy(
      { title: 'PET_HUMAN | Together.Ⅱ', kicker: 'Emotion & Meaning', statement: '關於人與寵物共同生活的產品設計。', sections: [] },
      { title: 'PET_HUMAN | Together.Ⅱ', kicker: 'Emotion & Meaning', statement: '关于人与宠物共同生活的产品设计。', sections: [] },
      { title: 'PET_HUMAN | Together.Ⅱ', kicker: 'Emotion & Meaning', statement: 'A product-design exploration of living together with pets.', sections: [] },
    ),
  },
  {
    slug: 'lounge-chair-axiom-n', collection: 'form', featured: true,
    media: [{ src: 'https://freight.cargo.site/w/1200/i/O2603887371603435562233938529038/7cb3ec235381945.68d977ee6d2ea.png', width: 3559, height: 1993, alt: { 'zh-Hant': 'Axiom.N 休閒椅', 'zh-Hans': 'Axiom.N 休闲椅', en: 'Axiom.N lounge chair' } }],
    copy: copy(
      { title: 'LOUNGE CHAIR | Axiom.N', kicker: 'Form & Culture', statement: '一件以坐感與形式為核心的休閒椅。', sections: [] },
      { title: 'LOUNGE CHAIR | Axiom.N', kicker: 'Form & Culture', statement: '一件以坐感与形式为核心的休闲椅。', sections: [] },
      { title: 'LOUNGE CHAIR | Axiom.N', kicker: 'Form & Culture', statement: 'A lounge chair centred on form and the experience of sitting.', sections: [] },
    ),
  },
  {
    slug: 'sofa-the-marshals-crest', collection: 'form', featured: true,
    media: [{ src: 'https://freight.cargo.site/w/1200/i/D2605099425050061144789411646222/8d54db236010125.68e3f996e8712.png', width: 1200, height: 670, alt: { 'zh-Hant': 'The Marshal’s Crest 沙發', 'zh-Hans': 'The Marshal’s Crest 沙发', en: "The Marshal's Crest sofa" } }],
    copy: copy(
      { title: "SOFA | The Marshal's Crest", kicker: 'Form & Culture', statement: '一件關於比例、姿態與空間存在感的沙發。', sections: [] },
      { title: "SOFA | The Marshal's Crest", kicker: 'Form & Culture', statement: '一件关于比例、姿态与空间存在感的沙发。', sections: [] },
      { title: "SOFA | The Marshal's Crest", kicker: 'Form & Culture', statement: 'A sofa study in proportion, posture, and presence.', sections: [] },
    ),
  },
  {
    slug: 'tea-ceremony-zzzing', collection: 'emotion', featured: true,
    media: [{ src: 'https://freight.cargo.site/w/1200/i/G2603986097692274340216128883470/a08f7c127582669.6145f946977e0.png', width: 4802, height: 2780, alt: { 'zh-Hant': 'Zzzing 茶席設計', 'zh-Hans': 'Zzzing 茶席设计', en: 'Zzzing tea ceremony design' } }],
    copy: copy(
      { title: 'TEA CEREMONY DESIGN | Zzzing', kicker: 'Emotion & Meaning', statement: '以儀式感重新思考日常的品茶經驗。', sections: [] },
      { title: 'TEA CEREMONY DESIGN | Zzzing', kicker: 'Emotion & Meaning', statement: '以仪式感重新思考日常的品茶经验。', sections: [] },
      { title: 'TEA CEREMONY DESIGN | Zzzing', kicker: 'Emotion & Meaning', statement: 'A tea-ceremony design that reconsiders a daily ritual.', sections: [] },
    ),
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
