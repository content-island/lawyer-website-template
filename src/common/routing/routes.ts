import type { LanguageCode } from '@content-island/api-client';

/** Articles URL segment per language. For a new language, add it here (falls back to "articles") */
const ARTICLES_SEGMENTS: Partial<Record<LanguageCode, string>> = {
  es: 'articulos',
  en: 'articles',
  ca: 'articles',
  fr: 'articles',
  it: 'articoli',
  pt: 'artigos',
  de: 'artikel',
};
export const articlesSegment = (lang: LanguageCode): string => ARTICLES_SEGMENTS[lang] ?? 'articles';

/**
 * Anchors (#id) for home sections not in the menu, per language (if a language is missing, the English ones are used).
 * Menu anchors (areas, about, articles, contact) come from the NavigationItem URLs in Content Island.
 */
export type FixedSection = 'hero' | 'why' | 'process' | 'reviews' | 'faq';
const SECTION_ANCHORS: Partial<Record<LanguageCode, Record<FixedSection, string>>> = {
  es: { hero: 'inicio', why: 'por-que-elegirme', process: 'como-trabajo', reviews: 'opiniones', faq: 'preguntas-frecuentes' },
  en: { hero: 'home', why: 'why-me', process: 'how-i-work', reviews: 'reviews', faq: 'faq' },
};
export const sectionAnchor = (lang: LanguageCode, section: FixedSection): string => (SECTION_ANCHORS[lang] ?? SECTION_ANCHORS.en!)[section];

/** Home section id from a Content Island navigation URL: "/#areas" | "#areas" -> "areas" */
export const sectionIdFromUrl = (url: string): string => url.replace(/^\/?#?/, '');

/** Astro rest param from a URL: "/es/articulos/x/" -> "es/articulos/x" · "/" -> undefined (root) */
export const toPathParam = (url: string): string | undefined => url.replace(/^\/+|\/+$/g, '') || undefined;

/** URL builders. The default language has no prefix; the rest get "/<lang>" */
export const createRoutes = (defaultLanguage: LanguageCode) => {
  const langPrefix = (lang: LanguageCode) => (lang === defaultLanguage ? '' : `/${lang}`);
  return {
    home: (lang: LanguageCode) => `${langPrefix(lang)}/`,
    homeSection: (lang: LanguageCode, sectionId: string) => `${langPrefix(lang)}/#${sectionId}`,
    articles: (lang: LanguageCode) => `${langPrefix(lang)}/${articlesSegment(lang)}/`,
    article: (lang: LanguageCode, slug: string) => `${langPrefix(lang)}/${articlesSegment(lang)}/${slug}/`,
    /** Page by Content Island slug (legal pages) */
    page: (lang: LanguageCode, slug: string) => `${langPrefix(lang)}/${slug.replace(/^\/+/, '')}`,
    /** URL of a Content Island NavigationItem ("/#areas", "/politica-de-cookies") in the requested language */
    fromCms: (lang: LanguageCode, url: string) => `${langPrefix(lang)}${url.startsWith('/') ? url : `/${url}`}`,
  };
};

export type Routes = ReturnType<typeof createRoutes>;
