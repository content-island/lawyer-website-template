import type { LanguageCode } from '@content-island/api-client';

export interface LinkVm {
  label: string;
  href: string;
}

export interface TopBarVm {
  /** "Col. nº 12345" */
  barNumber: string;
  barAssociation: string;
  barAssociationShort: string;
  schedule: string;
  email: string;
}

export interface LanguageOptionVm {
  lang: LanguageCode;
  /** "EN" */
  code: string;
  /** Language name written in that language: "English", "Español"… */
  nativeName: string;
  url: string;
  current: boolean;
}

export interface LanguageSwitcherVm {
  label: string;
  options: LanguageOptionVm[];
}

export interface HeaderVm {
  topBar: TopBarVm;
  logo: { logoUrl?: string; name: string; role: string; href: string; homeLabel: string };
  nav: { label: string; links: LinkVm[] };
  cta: LinkVm;
  phone: LinkVm;
  menuLabel: string;
  languageSwitcher: LanguageSwitcherVm;
}
