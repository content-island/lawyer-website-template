import type { LanguageCode } from '@content-island/api-client';

export interface Settings {
  id: string;
  whatsappHref: string;
  language: LanguageCode;
}

export interface UiText {
  id: string;
  whatsappLabel: string;
  language: LanguageCode;
}
