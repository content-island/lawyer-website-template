import type { LanguageCode } from '@content-island/api-client';
import { formatDate } from '@common/helpers';
import type { Routes } from '@common/routing';
import { coverTone, positionOf, relatedArticles } from '../article.business';
import { mapArticleToCardVm } from '../article.mapper';
import type { ArticleDetailSource, ArticleDetailVm } from './article-detail.model';

/** `bodyHtml`: the article markdown already converted to safe HTML */
export const mapToArticleDetailVm = (
  { article, articles, extra, ui, header }: ArticleDetailSource,
  bodyHtml: string,
  lang: LanguageCode,
  routes: Routes,
): ArticleDetailVm => ({
  hero: {
    backLink: { label: extra.backLabel, href: routes.articles(lang) },
    category: article.category,
    title: article.title,
    reference: article.reference,
    dateIso: article.date,
    dateLabel: formatDate(article.date, lang),
    readingTime: article.readingTime,
    cover: article.coverImage ? { url: article.coverImage.url, alt: article.coverImageAlt ?? '' } : undefined,
    coverTone: coverTone(positionOf(articles, article.slug)),
  },
  excerpt: article.excerpt,
  bodyHtml,
  cta: { title: extra.ctaTitle, text: extra.ctaText, label: extra.ctaLabel, href: routes.fromCms(lang, header.contact.url) },
  more: {
    title: ui.moreArticlesTitle,
    allLink: { label: extra.allLabel, href: routes.articles(lang) },
    cards: relatedArticles(articles, article.slug).map(item => mapArticleToCardVm(item, positionOf(articles, item.slug), lang, routes)),
  },
});
