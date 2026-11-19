import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { PageTarget } from '@common/routing';
import type { Article, ArticlesExtra, LawyerPage, PageMeta, PageMetaSource, Settings } from './page-meta.api-model';

const getSettings = (lang: LanguageCode) => getContent<Settings>({ contentType: 'Settings', language: lang });

type PageSource = DistributiveOmit<PageMetaSource, 'settings'>;
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

const getPageSource = async (lang: LanguageCode, page: PageTarget): Promise<PageSource> => {
  switch (page.kind) {
    case 'home': {
      const { meta } = await getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true });
      return { kind: 'home', meta };
    }
    case 'legal': {
      const meta = await getContent<PageMeta>({ contentType: 'PageMeta', 'fields.pageId': page.legalType, language: lang });
      return { kind: 'legal', meta };
    }
    case 'articles':
      return { kind: 'articles', extra: await getContent<ArticlesExtra>({ contentType: 'ArticlesExtra', language: lang }) };
    case 'article':
      return { kind: 'article', article: await getContent<Article>({ contentType: 'Article', 'fields.slug': page.slug, language: lang }) };
  }
};

/** Settings and the page's own query are fetched in parallel */
export const getPageMetaSource = async (lang: LanguageCode, page: PageTarget): Promise<PageMetaSource> => {
  const [settings, source] = await Promise.all([getSettings(lang), getPageSource(lang, page)]);
  return { ...source, settings } as PageMetaSource;
};
