import type { LanguageCode } from '@content-island/api-client';

export interface Media {
  name: string;
  url: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  language: LanguageCode;
}

export interface FooterColumn {
  id: string;
  title: string;
  /** The API resolves only one level of relations: column links arrive as ids */
  links: (NavigationItem | string)[];
}

export interface Footer {
  id: string;
  deontology: string;
  columns: FooterColumn[];
  copyRight: string;
  legalLinks?: NavigationItem[];
  cookies: NavigationItem;
  privacyPolicy: NavigationItem;
  language: LanguageCode;
}

export interface Settings {
  id: string;
  lawyerName: string;
  role: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  taxId: string;
  language: LanguageCode;
}

export interface UiText {
  id: string;
  logoHomeLabel: string;
  footerOfficeTitle: string;
  footerBookLabel: string;
  /** Tax ID label («NIF» / «Tax ID»): shown next to Settings.taxId */
  taxIdLabel: string;
  language: LanguageCode;
}

export interface General {
  id: string;
  logo?: Media;
  language: LanguageCode;
}

/** Only the contact link of the header is needed here ("Book a consultation") */
export interface Header {
  id: string;
  contact: NavigationItem;
  language: LanguageCode;
}

export interface FooterApiData {
  footer: Footer;
  navigationItems: NavigationItem[];
  settings: Settings;
  ui: UiText;
  general: General;
  header: Header;
}
