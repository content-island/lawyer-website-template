import { describe, expect, it } from 'vitest';
import { createRoutes } from '@common/routing';
import type { CookieBanner, Footer } from './api/cookie-banner.api-model';
import { mapToCookieBannerVm } from './cookie-banner.mapper';

describe('mapToCookieBannerVm', () => {
  it('maps texts and links the cookie policy in the current language', () => {
    const banner: CookieBanner = { id: 'c', title: 'Cookies', description: 'We use cookies.', learnMore: 'More', acceptAll: 'Accept', onlyEssential: 'Essential', language: 'es' };
    const footer: Footer = { id: 'f', cookies: { id: 'n', label: 'Cookies', url: '/politica-de-cookies' }, language: 'es' };
    expect(mapToCookieBannerVm(banner, footer, 'es', createRoutes('en'))).toEqual({
      title: 'Cookies',
      description: 'We use cookies.',
      learnMore: { label: 'More', href: '/es/politica-de-cookies' },
      acceptAllLabel: 'Accept',
      onlyEssentialLabel: 'Essential',
    });
  });
});
