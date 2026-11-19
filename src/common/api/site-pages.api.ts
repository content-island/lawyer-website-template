import type { LanguageCode } from '@content-island/api-client';
import { getContent, getContentList } from './client';
import { LEGAL_TYPES, mapToLanguageRoutingData, type Article, type LanguageRoutingData, type LegalPage } from '@common/routing';

const getArticles = (lang: LanguageCode) =>
  getContentList<Article>({ contentType: 'Article', language: lang, sort: { 'fields.date': 'desc' } });

const getLegalPage = (lang: LanguageCode, type: (typeof LEGAL_TYPES)[number]) => getContent<LegalPage>({ contentType: type, language: lang });

/** Articles and legal slugs of every language, to build the static paths */
export const getSiteRoutingData = (languages: LanguageCode[]): Promise<LanguageRoutingData[]> =>
  Promise.all(
    languages.map(async lang => {
      const [articles, ...legalPages] = await Promise.all([getArticles(lang), ...LEGAL_TYPES.map(type => getLegalPage(lang, type))]);
      return mapToLanguageRoutingData(lang, articles, legalPages);
    }),
  );
