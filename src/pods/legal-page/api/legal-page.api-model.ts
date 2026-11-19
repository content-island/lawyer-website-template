import type { LanguageCode } from '@content-island/api-client';

/** Content types "Cookies" and "PrivacyPolicy" share this shape */
export interface LegalPage {
  id: string;
  /** Automatic Content Island date (last time the entry was saved) */
  lastUpdate: string;
  /** Markdown */
  text: string;
  slug: string;
  language: LanguageCode;
}

export interface UiText {
  id: string;
  backToHomeLabel: string;
  /** «Última actualización» / «Last updated» */
  legalUpdatedLabel: string;
  language: LanguageCode;
}
