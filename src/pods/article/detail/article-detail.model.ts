import type { Article, ArticlesExtra, Header, UiText } from '../api/article.api-model';
import type { ArticleCardVm, CoverTone, LinkVm } from '../article.model';

export interface ArticleHeroVm {
  backLink: LinkVm;
  category: string;
  title: string;
  reference: string;
  dateIso: string;
  dateLabel: string;
  readingTime: string;
  /** With a cover image the header is darkened with the theme ink; without it, a colored typographic cover */
  cover?: { url: string; alt: string };
  coverTone: CoverTone;
}

export interface ArticleCtaVm {
  title: string;
  text: string;
  label: string;
  href: string;
}

export interface MoreArticlesVm {
  title: string;
  allLink: LinkVm;
  cards: ArticleCardVm[];
}

export interface ArticleDetailVm {
  hero: ArticleHeroVm;
  excerpt: string;
  /** Safe HTML of the markdown body */
  bodyHtml: string;
  cta: ArticleCtaVm;
  /** Empty cards: the section is not shown */
  more: MoreArticlesVm;
}

export interface ArticleDetailSource {
  article: Article;
  /** Every published article, most recent first */
  articles: Article[];
  extra: ArticlesExtra;
  ui: UiText;
  header: Header;
}
