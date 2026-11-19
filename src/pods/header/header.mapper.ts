import type { LanguageAlternate } from '@common/routing';
import type { HeaderApiData } from './api/header.api-model';
import type { HeaderVm } from './header.model';
import { buildLanguageOptions, buildNavLinks, toSectionHref, type NavContext } from './header.business';

export const mapToHeaderVm = (
  { header, settings, general, ui, articles }: HeaderApiData,
  alternates: LanguageAlternate[],
  context: NavContext,
): HeaderVm => ({
  topBar: {
    barNumber: `${ui.barNumberPrefix} ${settings.barNumber}`,
    barAssociation: settings.barAssociation,
    barAssociationShort: settings.barAssociationShort,
    schedule: settings.scheduleShort,
    email: settings.email,
  },
  logo: {
    logoUrl: general.logo?.url,
    name: settings.lawyerName,
    role: settings.role,
    href: context.routes.home(context.lang),
    homeLabel: ui.logoHomeLabel,
  },
  nav: { label: ui.mainNavLabel, links: buildNavLinks(header, articles.length > 0, context) },
  cta: { label: header.ctaLabel, href: toSectionHref(header.contact.url, context) },
  phone: { label: settings.phone, href: settings.phoneHref },
  menuLabel: header.menuLabel,
  languageSwitcher: { label: ui.languageLabel, options: buildLanguageOptions(alternates) },
});
