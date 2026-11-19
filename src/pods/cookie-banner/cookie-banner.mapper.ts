import type { LanguageCode } from '@content-island/api-client';
import type { Routes } from '@common/routing';
import type { CookieBanner, Footer } from './api/cookie-banner.api-model';
import type { CookieBannerVm } from './cookie-banner.model';

export const mapToCookieBannerVm = (banner: CookieBanner, footer: Footer, lang: LanguageCode, routes: Routes): CookieBannerVm => ({
  title: banner.title,
  description: banner.description,
  learnMore: { label: banner.learnMore, href: routes.fromCms(lang, footer.cookies.url) },
  acceptAllLabel: banner.acceptAll,
  onlyEssentialLabel: banner.onlyEssential,
});
