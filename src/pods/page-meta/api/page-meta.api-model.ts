import type { LanguageCode } from '@content-island/api-client';

export interface PageMeta {
  id: string;
  /** "Home", "Cookies", "PrivacyPolicy"… */
  pageId: string;
  title: string;
  description: string;
  language: LanguageCode;
}

export interface Settings {
  id: string;
  lawyerName: string;
  role: string;
  language: LanguageCode;
}

/** Only the meta of the home page entry is needed here */
export interface LawyerPage {
  id: string;
  meta: PageMeta;
  language: LanguageCode;
}

export interface ArticlesExtra {
  id: string;
  listEyebrow: string;
  listLead: string;
  language: LanguageCode;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  language: LanguageCode;
}

/** What each kind of page needs to build its <title> and description */
export type PageMetaSource =
  | { kind: 'home'; settings: Settings; meta: PageMeta }
  | { kind: 'legal'; settings: Settings; meta: PageMeta }
  | { kind: 'articles'; settings: Settings; extra: ArticlesExtra }
  | { kind: 'article'; settings: Settings; article: Article };
