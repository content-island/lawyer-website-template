import type { LanguageCode } from '@content-island/api-client';

export interface CvEntry {
  id?: string;
  title: string;
  detail: string;
}

export interface ContactSection {
  id: string;
  eyebrow: string;
  /** Text between *asterisks* is highlighted */
  title: string;
  lead: string;
  formTitle: string;
  formSubtitle: string;
  subjects: string[];
  /** GDPR basic information. The API resolves only one level of relations: these arrive as ids */
  gdpr: (CvEntry | string)[];
  consent: string;
  submitLabel: string;
  responseTime: string;
}

/** Home page entry: only the contact section is read here */
export interface LawyerPage {
  id: string;
  contact: ContactSection;
  language: LanguageCode;
}

export interface Settings {
  id: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  address: string;
  schedule: string;
  language: LanguageCode;
}

export interface UiText {
  id: string;
  contactOfficeLabel: string;
  contactPhoneLabel: string;
  contactWhatsappLabel: string;
  contactEmailLabel: string;
  contactScheduleLabel: string;
  formNameLabel: string;
  formPhoneLabel: string;
  formEmailLabel: string;
  formSubjectLabel: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formGdprLabel: string;
  formPrivacyLinkLabel: string;
  formErrorMessage: string;
  formSuccessMessage: string;
  language: LanguageCode;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
}

/** The section id comes from the menu ("/#contacto") */
export interface Header {
  id: string;
  contact: NavigationItem;
  language: LanguageCode;
}

/** Only the privacy policy link is needed here (consent checkbox) */
export interface Footer {
  id: string;
  privacyPolicy: NavigationItem;
  language: LanguageCode;
}

export interface ContactSectionApiData {
  page: LawyerPage;
  /** Every CvEntry of the language, to resolve the GDPR ids */
  cvEntries: CvEntry[];
  settings: Settings;
  ui: UiText;
  header: Header;
  footer: Footer;
}
