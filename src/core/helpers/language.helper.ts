import type { LanguageCode } from '@content-island/api-client';

/** Versión de la página actual en otro idioma (selector de idioma y <link rel="alternate" hreflang>) */
export interface LanguageAlternate {
  lang: LanguageCode;
  url: string;
  current: boolean;
}

/** Nombre del idioma escrito en ese mismo idioma, con mayúscula inicial: "English", "Español", "Français"… */
export const nativeLanguageName = (code: LanguageCode): string => {
  const name = new Intl.DisplayNames([code], { type: 'language' }).of(code) ?? code;
  return name.charAt(0).toLocaleUpperCase(code) + name.slice(1);
};
