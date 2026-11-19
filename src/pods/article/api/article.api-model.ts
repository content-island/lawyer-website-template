import type { LanguageCode } from '@content-island/api-client';

export interface Media {
  name: string;
  url: string;
}

/**
 * Article / news item. If none are published, the home section,
 * the menu link and the article pages are not generated.
 */
export interface Article {
  id: string;
  slug: string;
  category: string;
  /** Legal reference used as the typographic cover (e.g. "Art. 92") */
  reference: string;
  date: string; // ISO 8601
  readingTime: string;
  title: string;
  excerpt: string;
  /** Body in markdown */
  body: string;
  /** Optional. Without an image, a typographic cover is drawn in a theme color that alternates by position */
  coverImage?: Media;
  coverImageAlt?: string;
  language: LanguageCode;
}

/** Texts of the article pages and of the home section */
export interface ArticlesExtra {
  id: string;
  allLabel: string;
  readMoreLabel: string;
  listEyebrow: string;
  /** Text between *asterisks* is highlighted */
  listTitle: string;
  listLead: string;
  backLabel: string;
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  language: LanguageCode;
}

export interface UiText {
  id: string;
  backToHomeLabel: string;
  moreArticlesTitle: string;
  language: LanguageCode;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
}

/** Menu links: home section id ("articles") and contact section (article call to action) */
export interface Header {
  id: string;
  articles: NavigationItem;
  contact: NavigationItem;
  language: LanguageCode;
}

export interface SectionHead {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
}

/** Home page entry: only the header of the articles section is read here (optional) */
export interface LawyerPage {
  id: string;
  articlesHead?: SectionHead;
  language: LanguageCode;
}
