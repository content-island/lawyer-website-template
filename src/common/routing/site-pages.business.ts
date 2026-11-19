import type { Routes } from './routes';
import { LEGAL_TYPES, type LanguageRoutingData, type PageTarget, type SitePage } from './site-pages.model';

/** Pages of one language: home, article list + articles (only if there are any) and legal pages */
const targetsOf = (data: LanguageRoutingData): PageTarget[] => [
  { kind: 'home' },
  ...(data.articles.length > 0 ? [{ kind: 'articles' } as const, ...data.articles.map(({ slug }) => ({ kind: 'article', slug }) as const)] : []),
  ...LEGAL_TYPES.map(legalType => ({ kind: 'legal', legalType }) as const),
];

/**
 * URL of `target` (a page of `source`'s language) in the `other` language.
 * If that page doesn't exist there, it falls back to that language's article list or home.
 */
export const alternateUrl = (target: PageTarget, source: LanguageRoutingData, other: LanguageRoutingData, routes: Routes): string => {
  const { lang } = other;
  if (target.kind === 'home') return routes.home(lang);
  if (target.kind === 'legal') return routes.page(lang, other.legalSlugs[target.legalType]);
  if (other.articles.length === 0) return routes.home(lang);
  if (target.kind === 'articles') return routes.articles(lang);
  const articleId = source.articles.find(article => article.slug === target.slug)?.id;
  const translated = other.articles.find(article => article.id === articleId);
  return translated ? routes.article(lang, translated.slug) : routes.articles(lang);
};

/** Every page of the site, with its URL and its URL in each language (in the order of `languages`) */
export const buildSitePages = (languages: LanguageRoutingData[], routes: Routes): SitePage[] =>
  languages.flatMap(source =>
    targetsOf(source).map(target => ({
      ...target,
      lang: source.lang,
      url: alternateUrl(target, source, source, routes),
      alternates: languages.map(other => ({
        lang: other.lang,
        url: alternateUrl(target, source, other, routes),
        current: other.lang === source.lang,
      })),
    })),
  );
