import type { LanguageCode } from '@content-island/api-client';

export interface SectionHead {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** Home page entry: only the FAQ is read here. Optional: without it the section is not shown */
export interface LawyerPage {
  id: string;
  faqHead?: SectionHead;
  faqItems?: FaqItem[];
  language: LanguageCode;
}
