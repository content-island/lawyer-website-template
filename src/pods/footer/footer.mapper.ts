import type { LanguageCode } from '@content-island/api-client';
import { renderLines } from '@common/helpers';
import type { Routes } from '@common/routing';
import type { FooterApiData, NavigationItem } from './api/footer.api-model';
import type { FooterVm, LinkVm } from './footer.model';
import { legalLinksOf, resolveColumnLinks } from './footer.business';

export const mapToFooterVm = (
  { footer, navigationItems, settings, ui, general, header }: FooterApiData,
  lang: LanguageCode,
  routes: Routes,
): FooterVm => {
  // Content Island URLs with the language prefix: "/#areas" -> "/es/#areas" (or "/#areas" in the default language)
  const toLink = (item: NavigationItem): LinkVm => ({ label: item.label, href: routes.fromCms(lang, item.url) });
  return {
    logo: { logoUrl: general.logo?.url, name: settings.lawyerName, role: settings.role, href: routes.home(lang), homeLabel: ui.logoHomeLabel },
    deontology: footer.deontology,
    columns: footer.columns.map(column => ({ title: column.title, links: resolveColumnLinks(column.links, navigationItems).map(toLink) })),
    office: {
      title: ui.footerOfficeTitle,
      addressHtml: renderLines(settings.address),
      phone: { label: settings.phone, href: settings.phoneHref },
      email: { label: settings.email, href: `mailto:${settings.email}` },
      book: { label: ui.footerBookLabel, href: routes.fromCms(lang, header.contact.url) },
    },
    legalNotice: `${footer.copyRight} · ${ui.taxIdLabel} ${settings.taxId}`,
    legalLinks: legalLinksOf(footer).map(toLink),
  };
};
