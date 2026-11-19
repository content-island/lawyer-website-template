import type { LanguageCode } from '@content-island/api-client';

export interface Media {
  name: string;
  url: string;
}

/** Banner with background photo and translucent panel (Figma: CTA Asesoramiento) */
export interface CtaBanner {
  id: string;
  title: string;
  text: string;
  ctaLabel: string;
  image: Media;
  imageAlt: string;
}

/** Home page entry: only the banner is read here */
export interface LawyerPage {
  id: string;
  cta: CtaBanner;
  language: LanguageCode;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
}

/** The button goes to the contact section, whose id comes from the menu */
export interface Header {
  id: string;
  contact: NavigationItem;
  language: LanguageCode;
}

export interface CtaSectionApiData {
  page: LawyerPage;
  header: Header;
}
