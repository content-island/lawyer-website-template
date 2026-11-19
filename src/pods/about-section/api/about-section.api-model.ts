import type { LanguageCode } from '@content-island/api-client';

export interface CvEntry {
  id?: string;
  title: string;
  detail: string;
}

export interface About {
  id: string;
  eyebrow: string;
  /** Text between *asterisks* is highlighted */
  title: string;
  intro: string;
  body: string;
  signature: string;
  signatureMeta: string;
  educationTitle: string;
  /** The API resolves only one level of relations: these arrive as ids */
  education: (CvEntry | string)[];
  membershipsTitle: string;
  memberships: (CvEntry | string)[];
}

/** Home page entry: only "about me" is read here */
export interface LawyerPage {
  id: string;
  about: About;
  language: LanguageCode;
}

export interface Settings {
  id: string;
  barAssociation: string;
  barNumber: string;
  barSince: string;
  language: LanguageCode;
}

export interface UiText {
  id: string;
  barNumberPrefix: string;
  /** «desde» / «since» */
  barSinceLabel: string;
  language: LanguageCode;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
}

/** The section id comes from the menu ("/#sobre-mi") */
export interface Header {
  id: string;
  about: NavigationItem;
  language: LanguageCode;
}

export interface AboutSectionApiData {
  page: LawyerPage;
  /** Every CvEntry of the language, to resolve the ids of education and memberships */
  cvEntries: CvEntry[];
  settings: Settings;
  ui: UiText;
  header: Header;
}
