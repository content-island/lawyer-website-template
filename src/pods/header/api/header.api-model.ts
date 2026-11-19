import type { LanguageCode } from '@content-island/api-client';

export interface Media {
  name: string;
  url: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
}

export interface Header {
  id: string;
  areas: NavigationItem;
  about: NavigationItem;
  /** Only shown in the menu if there are published articles */
  articles: NavigationItem;
  contact: NavigationItem;
  ctaLabel: string;
  menuLabel: string;
  language: LanguageCode;
}

export interface Settings {
  id: string;
  lawyerName: string;
  role: string;
  barAssociation: string;
  /** Short version for the top bar on mobile (e.g. "ICA Valencia") */
  barAssociationShort: string;
  barNumber: string;
  phone: string;
  phoneHref: string;
  email: string;
  scheduleShort: string;
  language: LanguageCode;
}

export interface General {
  id: string;
  /** Logo (SVG). Optional: if missing, a monogram with the initials of Settings.lawyerName is drawn */
  logo?: Media;
  language: LanguageCode;
}

export interface UiText {
  id: string;
  barNumberPrefix: string;
  mainNavLabel: string;
  logoHomeLabel: string;
  /** Language switcher accessibility */
  languageLabel: string;
  language: LanguageCode;
}

export interface Article {
  id: string;
  date: string; // ISO 8601, used to sort
}

export interface HeaderApiData {
  header: Header;
  settings: Settings;
  general: General;
  ui: UiText;
  articles: Article[];
}
