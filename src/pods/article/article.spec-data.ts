import type { Article, ArticlesExtra } from './api/article.api-model';

export const article = (slug: string, coverImage?: Article['coverImage']): Article => ({
  id: slug,
  slug,
  category: 'Familia',
  reference: 'Art. 92',
  date: '2026-10-28T00:00:00Z',
  readingTime: '5 min',
  title: `Title ${slug}`,
  excerpt: 'Excerpt',
  body: '# Body',
  coverImage,
  language: 'es',
});

export const articlesExtra: ArticlesExtra = {
  id: 'x',
  allLabel: 'Ver todos',
  readMoreLabel: 'Leer',
  listEyebrow: 'Artículos',
  listTitle: 'Notas *legales*',
  listLead: 'Lead',
  backLabel: 'Artículos',
  ctaTitle: 'CTA',
  ctaText: 'Text',
  ctaLabel: 'Pedir cita',
  language: 'es',
};
