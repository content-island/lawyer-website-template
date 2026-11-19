import type { LanguageAlternate } from '@common/routing';
import type { PageMetaSource, Settings } from './api/page-meta.api-model';

/** "Clara Ríos · Abogada" (og:site_name) */
export const buildSiteName = (settings: Settings): string => `${settings.lawyerName} · ${settings.role}`;

/**
 * Home and legal pages use their PageMeta entry as is.
 * Article pages: "<page title> · <lawyer name> <role>".
 */
export const buildTitleAndDescription = (source: PageMetaSource): { title: string; description: string } => {
  const suffix = `${source.settings.lawyerName} ${source.settings.role}`;
  switch (source.kind) {
    case 'home':
    case 'legal':
      return { title: source.meta.title, description: source.meta.description };
    case 'articles':
      return { title: `${source.extra.listEyebrow} · ${suffix}`, description: source.extra.listLead };
    case 'article':
      return { title: `${source.article.title} · ${suffix}`, description: source.article.excerpt };
  }
};

/**
 * <link rel="alternate" hreflang> for each language + x-default (the default language).
 * hreflang needs absolute URLs: only generated when a domain is set (`site` in astro.config.mjs).
 */
export const buildHreflangLinks = (alternates: LanguageAlternate[], site: URL | undefined, defaultLanguage: string) => {
  if (!site || alternates.length <= 1) return [];
  const absolute = (url: string) => new URL(url, site).href;
  const defaultUrl = alternates.find(alt => alt.lang === defaultLanguage)?.url ?? '/';
  return [
    ...alternates.map(alt => ({ hreflang: alt.lang, href: absolute(alt.url) })),
    { hreflang: 'x-default', href: absolute(defaultUrl) },
  ];
};
