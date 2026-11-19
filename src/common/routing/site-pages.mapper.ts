import type { LanguageCode } from '@content-island/api-client';
import type { Article, LegalPage } from './site-pages.api-model';
import { LEGAL_TYPES, type LanguageRoutingData, type LegalType } from './site-pages.model';

const legalSlug = (lang: LanguageCode, type: LegalType, page: LegalPage | undefined): string => {
  // Without a slug the legal page would get the home URL and overwrite it: stop the build instead
  if (!page?.slug) throw new Error(`Content Island: the "${type}" page has no slug in "${lang}" (is it published?)`);
  return page.slug;
};

/** `legalPages` comes in the LEGAL_TYPES order */
export const mapToLanguageRoutingData = (lang: LanguageCode, articles: Article[], legalPages: (LegalPage | undefined)[]): LanguageRoutingData => ({
  lang,
  articles: articles.map(({ id, slug }) => ({ id, slug })),
  legalSlugs: Object.fromEntries(LEGAL_TYPES.map((type, i) => [type, legalSlug(lang, type, legalPages[i])])) as Record<LegalType, string>,
});
