import type { LanguageCode } from '@content-island/api-client';

export interface SectionHead {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  caseType: string;
  /** 0-5 */
  rating: number;
}

/** Home page entry: only the reviews are read here. Optional: without them the section is not shown */
export interface LawyerPage {
  id: string;
  reviewsHead?: SectionHead;
  reviews?: Review[];
  language: LanguageCode;
}

export interface UiText {
  id: string;
  reviewsLabel: string;
  reviewsPrevLabel: string;
  reviewsNextLabel: string;
  language: LanguageCode;
}

export interface ReviewsSectionApiData {
  page: LawyerPage;
  ui: UiText;
}
