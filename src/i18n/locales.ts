export const locales = ['zh-Hant', 'zh-Hans', 'en'] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  'zh-Hant': '繁體中文',
  'zh-Hans': '简体中文',
  en: 'English',
};

export const sharedLabels: Record<Locale, {
  language: string;
  primaryNavigation: string;
  allWorks: string;
  openCaseStudy: string;
  showProjectInfo: string;
  readCaseStudy: string;
  relatedWork: string;
}> = {
  'zh-Hant': {
    language: '網站語言', primaryNavigation: '主要導覽', allWorks: '所有作品',
    openCaseStudy: '閱讀案例', showProjectInfo: '顯示作品資訊', readCaseStudy: '閱讀案例', relatedWork: '相關作品',
  },
  'zh-Hans': {
    language: '网站语言', primaryNavigation: '主要导航', allWorks: '所有作品',
    openCaseStudy: '阅读案例', showProjectInfo: '显示作品信息', readCaseStudy: '阅读案例', relatedWork: '相关作品',
  },
  en: {
    language: 'Site language', primaryNavigation: 'Primary navigation', allWorks: 'All works',
    openCaseStudy: 'Open case study', showProjectInfo: 'Show project information', readCaseStudy: 'Read case study', relatedWork: 'Related work',
  },
};

export function isLocale(value: string | null): value is Locale {
  return value !== null && locales.includes(value as Locale);
}
