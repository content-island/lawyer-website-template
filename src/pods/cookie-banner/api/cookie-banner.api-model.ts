import type { LanguageCode } from '@content-island/api-client';

export interface CookieBanner {
  id: string;
  title: string;
  description: string;
  learnMore: string;
  acceptAll: string;
  onlyEssential: string;
  language: LanguageCode;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
}

/** Only the cookie policy link of the footer is needed here */
export interface Footer {
  id: string;
  cookies: NavigationItem;
  language: LanguageCode;
}
