import type { LanguageCode } from '@content-island/api-client';

export interface Media {
  name: string;
  url: string;
}

export interface Font {
  id: string;
  name: string;
  url: string;
}

/** Theming: 4 colors + 4 fonts. The remaining colors are derived from these in global.css */
export interface Theme {
  id: string;
  colorPrimary: string;
  colorSecondary: string;
  colorBackground: string;
  colorTertiary: string;
  fontDisplay: Font;
  fontTitle: Font;
  fontBody: Font;
  fontSignature: Font;
  language: LanguageCode;
}

export interface General {
  id: string;
  favIcon: Media;
  language: LanguageCode;
}
