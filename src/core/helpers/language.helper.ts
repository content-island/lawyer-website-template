import type { LanguageCode } from '@content-island/api-client';

/** Current page in another language (language switcher and <link rel="alternate" hreflang>) */
export interface LanguageAlternate {
  lang: LanguageCode;
  url: string;
  current: boolean;
}

/** Language name written in that language, capitalized: "English", "Español", "Français"… */
export const nativeLanguageName = (code: LanguageCode): string => {
  const name = new Intl.DisplayNames([code], { type: 'language' }).of(code) ?? code;
  return name.charAt(0).toLocaleUpperCase(code) + name.slice(1);
};
