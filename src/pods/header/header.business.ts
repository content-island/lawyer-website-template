import type { LanguageCode } from '@content-island/api-client';
import { sectionIdFromUrl, type Routes, type LanguageAlternate } from '@common/routing';
import type { Header } from './api/header.api-model';
import type { LanguageOptionVm, LinkVm } from './header.model';

export interface NavContext {
  lang: LanguageCode;
  /** On the home page links are anchors (#areas); on other pages they go back to the home page (/es/#areas) */
  onHome: boolean;
  routes: Routes;
}

export const toSectionHref = (url: string, { lang, onHome, routes }: NavContext): string =>
  onHome ? `#${sectionIdFromUrl(url)}` : routes.homeSection(lang, sectionIdFromUrl(url));

/** Menu links. "Articles" only appears if there are published articles, and links to the full list */
export const buildNavLinks = (header: Header, showArticles: boolean, context: NavContext): LinkVm[] => [
  { label: header.areas.label, href: toSectionHref(header.areas.url, context) },
  { label: header.about.label, href: toSectionHref(header.about.url, context) },
  ...(showArticles ? [{ label: header.articles.label, href: context.routes.articles(context.lang) }] : []),
  { label: header.contact.label, href: toSectionHref(header.contact.url, context) },
];

/** Language name written in that language, capitalized: "English", "Español", "Français"… */
export const nativeLanguageName = (code: LanguageCode): string => {
  const name = new Intl.DisplayNames([code], { type: 'language' }).of(code) ?? code;
  return name.charAt(0).toLocaleUpperCase(code) + name.slice(1);
};

export const buildLanguageOptions = (alternates: LanguageAlternate[]): LanguageOptionVm[] =>
  alternates.map(alt => ({ ...alt, code: alt.lang.toUpperCase(), nativeName: nativeLanguageName(alt.lang) }));
