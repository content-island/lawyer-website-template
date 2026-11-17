import type { LanguageCode } from '@content-island/api-client';
import { LANGUAGES } from './language.constants';

/**
 * Default language = the FIRST one in the project's language list in Content Island.
 * It is served at the root, with no prefix and no redirects (/, /articles/…); the rest are prefixed (/es/, /es/articulos/…).
 * If languages are reordered or removed in Content Island, routes update automatically on the next build.
 */
export const DEFAULT_LANGUAGE: LanguageCode = LANGUAGES[0]!;

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
export const articlesSegment = (lang: LanguageCode) => ARTICLES_SEGMENTS[lang] ?? 'articles';

/**
 * Anchors (#id) for home sections not in the menu, per language (if a language is missing, the English ones are used).
 * Menu anchors (areas, about, articles, contact) come from the NavigationItem URLs in Content Island.
 */
type FixedSection = 'hero' | 'why' | 'process' | 'reviews' | 'faq';
const SECTION_ANCHORS: Partial<Record<LanguageCode, Record<FixedSection, string>>> = {
  es: { hero: 'inicio', why: 'por-que-elegirme', process: 'como-trabajo', reviews: 'opiniones', faq: 'preguntas-frecuentes' },
  en: { hero: 'home', why: 'why-me', process: 'how-i-work', reviews: 'reviews', faq: 'faq' },
};
export const sectionAnchor = (lang: LanguageCode, section: FixedSection) => (SECTION_ANCHORS[lang] ?? SECTION_ANCHORS.en!)[section];

/** "" for the default language, "/es" for the rest */
export const langPrefix = (lang: LanguageCode) => (lang === DEFAULT_LANGUAGE ? '' : `/${lang}`);

export const routes = {
  home: (lang: LanguageCode) => `${langPrefix(lang)}/`,
  homeSection: (lang: LanguageCode, sectionId: string) => `${langPrefix(lang)}/#${sectionId}`,
  articles: (lang: LanguageCode) => `${langPrefix(lang)}/${articlesSegment(lang)}/`,
  article: (lang: LanguageCode, slug: string) => `${langPrefix(lang)}/${articlesSegment(lang)}/${slug}/`,
  /** Page by Content Island slug (legal pages) */
  page: (lang: LanguageCode, slug: string) => `${langPrefix(lang)}/${slug.replace(/^\/+/, '')}`,
  /** URL of a Content Island NavigationItem ("/#areas", "/politica-de-cookies") in the requested language */
  fromCms: (lang: LanguageCode, url: string) => `${langPrefix(lang)}${url.startsWith('/') ? url : `/${url}`}`,
};
