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

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  /** SVG icon uploaded to Content Island (inlined, takes the theme color) */
  icon: Media;
  image: Media;
  imageAlt: string;
  isMain: boolean;
  tag?: string;
  ctaLabel: string;
}

/** Home page entry: only the practice areas are read here (in the relation order) */
export interface LawyerPage {
  id: string;
  areasHead: SectionHead;
  practiceAreas?: PracticeArea[];
  language: LanguageCode;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
}

/** Section ids come from the menu: this section ("areas") and the contact section (card buttons) */
export interface Header {
  id: string;
  areas: NavigationItem;
  contact: NavigationItem;
  language: LanguageCode;
}

export interface AreasSectionApiData {
  page: LawyerPage;
  header: Header;
}
