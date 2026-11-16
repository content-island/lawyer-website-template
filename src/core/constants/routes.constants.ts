import type { LanguageCode } from '@content-island/api-client';
import { LANGUAGES } from './language.constants';

/**
 * Idioma inicial = el PRIMERO de la lista de idiomas del proyecto en Content Island.
 * Se sirve en la raíz, sin prefijo y sin redirecciones (/, /articles/…); el resto lleva prefijo (/es/, /es/articulos/…).
 * Si se reordenan o se quitan idiomas en Content Island, las rutas cambian solas en la siguiente build.
 */
export const DEFAULT_LANGUAGE: LanguageCode = LANGUAGES[0]!;

/** Segmento de la URL de artículos en cada idioma. Para un idioma nuevo, añadirlo aquí (si falta se usa "articles") */
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
 * Anclas (#id) de las secciones de la home que no están en el menú, en cada idioma (si falta un idioma, se usan las inglesas).
 * Las del menú (áreas, sobre mí, artículos, contacto) salen de las URL de NavigationItem en Content Island.
 */
type FixedSection = 'hero' | 'why' | 'process' | 'reviews' | 'faq';
const SECTION_ANCHORS: Partial<Record<LanguageCode, Record<FixedSection, string>>> = {
  es: { hero: 'inicio', why: 'por-que-elegirme', process: 'como-trabajo', reviews: 'opiniones', faq: 'preguntas-frecuentes' },
  en: { hero: 'home', why: 'why-me', process: 'how-i-work', reviews: 'reviews', faq: 'faq' },
};
export const sectionAnchor = (lang: LanguageCode, section: FixedSection) => (SECTION_ANCHORS[lang] ?? SECTION_ANCHORS.en!)[section];

/** "" para el idioma inicial, "/es" para el resto */
export const langPrefix = (lang: LanguageCode) => (lang === DEFAULT_LANGUAGE ? '' : `/${lang}`);

export const routes = {
  home: (lang: LanguageCode) => `${langPrefix(lang)}/`,
  homeSection: (lang: LanguageCode, sectionId: string) => `${langPrefix(lang)}/#${sectionId}`,
  articles: (lang: LanguageCode) => `${langPrefix(lang)}/${articlesSegment(lang)}/`,
  article: (lang: LanguageCode, slug: string) => `${langPrefix(lang)}/${articlesSegment(lang)}/${slug}/`,
  /** Página por slug de Content Island (páginas legales) */
  page: (lang: LanguageCode, slug: string) => `${langPrefix(lang)}/${slug.replace(/^\/+/, '')}`,
  /** URL de un NavigationItem de Content Island ("/#areas", "/politica-de-cookies") en el idioma pedido */
  fromCms: (lang: LanguageCode, url: string) => `${langPrefix(lang)}${url.startsWith('/') ? url : `/${url}`}`,
};
