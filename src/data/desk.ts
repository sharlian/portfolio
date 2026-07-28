export type DeskCategoryId = 'emotion' | 'form' | 'function';

export type DeskCategory = {
  id: DeskCategoryId;
  title: string;
  description: string;
  href: `/works/${DeskCategoryId}`;
};

export type DeskContact = {
  label: 'Email' | 'Behance' | 'LinkedIn';
  href: string;
  external: boolean;
};

export const deskCategories: DeskCategory[] = [
  {
    id: 'emotion',
    title: 'Emotion & Meaning',
    description: 'Objects shaped by memory, emotion and human connection.',
    href: '/works/emotion',
  },
  {
    id: 'form',
    title: 'Form & Culture',
    description: 'Forms translated from culture, architecture and visual memory.',
    href: '/works/form',
  },
  {
    id: 'function',
    title: 'Function & Reality',
    description: 'Design resolved through function, ergonomics and production.',
    href: '/works/function',
  },
];

export const deskContacts: DeskContact[] = [
  { label: 'Email', href: 'mailto:juby9988@gmail.com', external: false },
  { label: 'Behance', href: 'https://www.behance.net/Sharlian', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sharlian/', external: true },
];
