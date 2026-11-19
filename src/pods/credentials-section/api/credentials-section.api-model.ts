import type { LanguageCode } from '@content-island/api-client';

export interface Credentials {
  id: string;
  /** Editorial sentence: {{...}} highlights in ink and **x** marks the large italic accent figure */
  text: string;
  linkLabel: string;
}

/** Home page entry: only the credentials are read here */
export interface LawyerPage {
  id: string;
  credentials: Credentials;
  language: LanguageCode;
}

export interface UiText {
  id: string;
  credentialsLabel: string;
  language: LanguageCode;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
}

/** The link goes to the "about" section, whose id comes from the menu */
export interface Header {
  id: string;
  about: NavigationItem;
  language: LanguageCode;
}

export interface CredentialsSectionApiData {
  page: LawyerPage;
  ui: UiText;
  header: Header;
}
