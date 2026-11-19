import type { LanguageCode } from '@content-island/api-client';

export interface Media {
  name: string;
  url: string;
}

export interface SectionHead {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
}

export interface WhyItem {
  id: string;
  title: string;
  text: string;
  /** SVG icon uploaded to Content Island */
  icon: Media;
}

/** Home page entry: only "why me" is read here */
export interface LawyerPage {
  id: string;
  whyHead: SectionHead;
  whyItems?: WhyItem[];
  language: LanguageCode;
}
