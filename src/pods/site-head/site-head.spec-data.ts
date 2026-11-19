import type { Theme } from './api/site-head.api-model';

const font = (name: string) => ({ id: name, name, url: `https://fonts/${name}` });

export const theme: Theme = {
  id: 't',
  colorPrimary: '#1F4F82',
  colorSecondary: '#1C2B33',
  colorBackground: '#F5F4F0',
  colorTertiary: '#3C4B3F',
  fontDisplay: font('Libre Bodoni'),
  fontTitle: font('Newsreader'),
  fontBody: font('Instrument Sans'),
  fontSignature: font('Mrs Saint Delafield'),
  language: 'en',
};
