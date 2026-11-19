import type { LanguageCode } from '@content-island/api-client';
import { formatDate } from '@common/helpers';
import type { Routes } from '@common/routing';
import type { Article } from './api/article.api-model';
import type { ArticleCardVm } from './article.model';
import { coverTone } from './article.business';

/** `position`: position in the full list (most recent = 0), decides the typographic cover color */
export const mapArticleToCardVm = (article: Article, position: number, lang: LanguageCode, routes: Routes): ArticleCardVm => ({
  href: routes.article(lang, article.slug),
  title: article.title,
  category: article.category,
  reference: article.reference,
  dateIso: article.date,
  dateLabel: formatDate(article.date, lang),
  readingTime: article.readingTime,
  excerpt: article.excerpt,
  cover: article.coverImage ? { url: article.coverImage.url, alt: article.coverImageAlt ?? '' } : undefined,
  coverTone: coverTone(position),
});
