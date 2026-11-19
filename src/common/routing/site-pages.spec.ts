import { describe, expect, it } from 'vitest';
import { createRoutes } from './routes';
import { buildSitePages } from './site-pages.business';
import { mapToLanguageRoutingData } from './site-pages.mapper';
import type { LanguageRoutingData } from './site-pages.model';

const routes = createRoutes('en');
const en: LanguageRoutingData = {
  lang: 'en',
  articles: [
    { id: 'a1', slug: 'custody' },
    { id: 'a2', slug: 'only-english' },
  ],
  legalSlugs: { Cookies: 'cookie-policy', PrivacyPolicy: 'privacy-policy' },
};
const es: LanguageRoutingData = {
  lang: 'es',
  articles: [{ id: 'a1', slug: 'custodia' }],
  legalSlugs: { Cookies: 'politica-de-cookies', PrivacyPolicy: 'politica-de-privacidad' },
};

describe('mapToLanguageRoutingData', () => {
  it('keeps id + slug and maps legal pages in LEGAL_TYPES order', () => {
    const data = mapToLanguageRoutingData('en', [{ id: 'a', slug: 's', date: '2026-01-01' }], [
      { id: 'c', slug: 'cookies' },
      { id: 'p', slug: 'privacy' },
    ]);
    expect(data).toEqual({ lang: 'en', articles: [{ id: 'a', slug: 's' }], legalSlugs: { Cookies: 'cookies', PrivacyPolicy: 'privacy' } });
  });

  it('stops the build when a legal page has no slug, instead of colliding with the home URL', () => {
    expect(() => mapToLanguageRoutingData('es', [], [{ id: 'c', slug: 'cookies' }, undefined])).toThrow(/PrivacyPolicy.*"es"/);
  });
});

describe('buildSitePages', () => {
  const pages = buildSitePages([en, es], routes);
  const find = (lang: string, url: string) => pages.find(page => page.lang === lang && page.url === url)!;

  it('builds every page of every language', () => {
    expect(pages.map(page => page.url)).toEqual([
      '/',
      '/articles/',
      '/articles/custody/',
      '/articles/only-english/',
      '/cookie-policy',
      '/privacy-policy',
      '/es/',
      '/es/articulos/',
      '/es/articulos/custodia/',
      '/es/politica-de-cookies',
      '/es/politica-de-privacidad',
    ]);
  });

  it('links the same article across languages by id', () => {
    expect(find('en', '/articles/custody/').alternates).toEqual([
      { lang: 'en', url: '/articles/custody/', current: true },
      { lang: 'es', url: '/es/articulos/custodia/', current: false },
    ]);
  });

  it('falls back to the article list when the article is not translated', () => {
    expect(find('en', '/articles/only-english/').alternates[1]!.url).toBe('/es/articulos/');
  });

  it('uses each language legal slug', () => {
    expect(find('es', '/es/politica-de-cookies').alternates[0]!.url).toBe('/cookie-policy');
  });

  it('skips article pages and links to home when a language has no articles', () => {
    const noArticles = { ...es, articles: [] };
    const result = buildSitePages([en, noArticles], routes);
    expect(result.some(page => page.lang === 'es' && page.kind !== 'home' && page.kind !== 'legal')).toBe(false);
    expect(result.find(page => page.url === '/articles/')!.alternates[1]!.url).toBe('/es/');
  });
});
