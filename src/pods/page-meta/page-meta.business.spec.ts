import { describe, expect, it } from 'vitest';
import type { LanguageAlternate } from '@common/routing';
import type { Article, ArticlesExtra, PageMeta, Settings } from './api/page-meta.api-model';
import { buildHreflangLinks, buildSiteName, buildTitleAndDescription } from './page-meta.business';

const settings: Settings = { id: 's', lawyerName: 'Clara Ríos', role: 'Abogada', language: 'es' };
const alternates: LanguageAlternate[] = [
  { lang: 'en', url: '/articles/', current: false },
  { lang: 'es', url: '/es/articulos/', current: true },
];

describe('buildSiteName', () => {
  it('joins name and role', () => expect(buildSiteName(settings)).toBe('Clara Ríos · Abogada'));
});

describe('buildTitleAndDescription', () => {
  it('uses PageMeta as is for home and legal pages', () => {
    const meta: PageMeta = { id: 'm', pageId: 'Home', title: 'T', description: 'D', language: 'es' };
    expect(buildTitleAndDescription({ kind: 'home', settings, meta })).toEqual({ title: 'T', description: 'D' });
    expect(buildTitleAndDescription({ kind: 'legal', settings, meta })).toEqual({ title: 'T', description: 'D' });
  });

  it('adds the lawyer suffix on article pages', () => {
    const extra: ArticlesExtra = { id: 'x', listEyebrow: 'Artículos', listLead: 'Lead', language: 'es' };
    expect(buildTitleAndDescription({ kind: 'articles', settings, extra })).toEqual({ title: 'Artículos · Clara Ríos Abogada', description: 'Lead' });
    const article: Article = { id: 'a', slug: 's', title: 'Custodia', excerpt: 'Ex', language: 'es' };
    expect(buildTitleAndDescription({ kind: 'article', settings, article })).toEqual({ title: 'Custodia · Clara Ríos Abogada', description: 'Ex' });
  });
});

describe('buildHreflangLinks', () => {
  it('returns nothing without a site domain or with a single language', () => {
    expect(buildHreflangLinks(alternates, undefined, 'en')).toEqual([]);
    expect(buildHreflangLinks(alternates.slice(0, 1), new URL('https://x.es'), 'en')).toEqual([]);
  });

  it('builds absolute links plus x-default pointing to the default language', () => {
    expect(buildHreflangLinks(alternates, new URL('https://x.es'), 'en')).toEqual([
      { hreflang: 'en', href: 'https://x.es/articles/' },
      { hreflang: 'es', href: 'https://x.es/es/articulos/' },
      { hreflang: 'x-default', href: 'https://x.es/articles/' },
    ]);
  });
});
