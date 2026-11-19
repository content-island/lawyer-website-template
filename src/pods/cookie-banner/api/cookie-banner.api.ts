import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { CookieBanner, Footer } from './cookie-banner.api-model';

export const getCookieBanner = (lang: LanguageCode) => getContent<CookieBanner>({ contentType: 'CookieBanner', language: lang });

export const getFooter = (lang: LanguageCode) => getContent<Footer>({ contentType: 'Footer', language: lang, includeRelatedContent: true });
