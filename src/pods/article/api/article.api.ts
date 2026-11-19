import type { LanguageCode } from '@content-island/api-client';
import { getContent, getContentList } from '@common/api';
import type { Article, ArticlesExtra, Header, LawyerPage, UiText } from './article.api-model';

/** Published articles, most recent first. Empty list if there are none */
export const getArticles = (lang: LanguageCode) =>
  getContentList<Article>({ contentType: 'Article', language: lang, sort: { 'fields.date': 'desc' } });

export const getArticle = (lang: LanguageCode, slug: string) => getContent<Article>({ contentType: 'Article', 'fields.slug': slug, language: lang });

export const getArticlesExtra = (lang: LanguageCode) => getContent<ArticlesExtra>({ contentType: 'ArticlesExtra', language: lang });

export const getUiText = (lang: LanguageCode) => getContent<UiText>({ contentType: 'UiText', language: lang });

export const getHeader = (lang: LanguageCode) => getContent<Header>({ contentType: 'Header', language: lang, includeRelatedContent: true });

export const getLawyerPage = (lang: LanguageCode) =>
  getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true });
