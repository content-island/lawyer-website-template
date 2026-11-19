import type { LanguageCode } from '@content-island/api-client';
import { mapSectionHeadToVm } from '@common/mappers';
import { sectionIdFromUrl, type Routes } from '@common/routing';
import type { Article, ArticlesExtra, Header, SectionHead } from '../api/article.api-model';
import { mapArticleToCardVm } from '../article.mapper';
import type { ArticleLatestVm } from './article-latest.model';

/** Number of articles shown on the home page */
export const LATEST_ARTICLES_LIMIT = 3;

export interface ArticleLatestSource {
  /** Optional header in LawyerPage: without it the section is not shown */
  head?: SectionHead;
  /** Published articles, most recent first */
  articles: Article[];
  /** Only fetched when there are articles */
  extra?: ArticlesExtra;
  header: Header;
}

/** undefined when there are no articles or no section header: the section is not shown */
export const mapToArticleLatestVm = ({ head, articles, extra, header }: ArticleLatestSource, lang: LanguageCode, routes: Routes): ArticleLatestVm | undefined => {
  if (!head || !extra || articles.length === 0) return undefined;
  return {
    id: sectionIdFromUrl(header.articles.url),
    head: mapSectionHeadToVm(head),
    cards: articles.slice(0, LATEST_ARTICLES_LIMIT).map((article, position) => mapArticleToCardVm(article, position, lang, routes)),
    allLink: { label: extra.allLabel, href: routes.articles(lang) },
  };
};
