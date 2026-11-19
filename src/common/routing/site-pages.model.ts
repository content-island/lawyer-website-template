import type { LanguageCode } from '@content-island/api-client';

/** Content Island content types of the legal pages (their slug comes from the CMS) */
export type LegalType = 'Cookies' | 'PrivacyPolicy';
export const LEGAL_TYPES: readonly LegalType[] = ['Cookies', 'PrivacyPolicy'];

/** The current page in another language (language switcher and <link rel="alternate" hreflang>) */
export interface LanguageAlternate {
  lang: LanguageCode;
  url: string;
  current: boolean;
}

export type PageTarget = { kind: 'home' } | { kind: 'articles' } | { kind: 'article'; slug: string } | { kind: 'legal'; legalType: LegalType };

/** A page of the site: what to render, its URL and its URL in every language */
export type SitePage = PageTarget & {
  lang: LanguageCode;
  url: string;
  alternates: LanguageAlternate[];
};

/** What decides the routes of one language */
export interface LanguageRoutingData {
  lang: LanguageCode;
  /** Published articles. The same article has the same id in every language even if the slug changes */
  articles: { id: string; slug: string }[];
  legalSlugs: Record<LegalType, string>;
}
