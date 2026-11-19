import type { LanguageCode } from '@content-island/api-client';
import { renderEmphasis } from '@common/helpers';
import type { Routes } from '@common/routing';
import type { Article, ArticlesExtra, UiText } from '../api/article.api-model';
import { mapArticleToCardVm } from '../article.mapper';
import type { ArticleListVm } from './article-list.model';

export const mapToArticleListVm = (articles: Article[], extra: ArticlesExtra, ui: UiText, lang: LanguageCode, routes: Routes): ArticleListVm => ({
  backLink: { label: ui.backToHomeLabel, href: routes.home(lang) },
  eyebrow: extra.listEyebrow,
  titleHtml: renderEmphasis(extra.listTitle),
  lead: extra.listLead,
  readMoreLabel: extra.readMoreLabel,
  cards: articles.map((article, position) => mapArticleToCardVm(article, position, lang, routes)),
});
