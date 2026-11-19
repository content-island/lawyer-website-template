import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { HeroSectionApiData, LawyerPage, Settings } from './hero-section.api-model';

export const getHeroSection = async (lang: LanguageCode): Promise<HeroSectionApiData> => {
  const [page, settings] = await Promise.all([
    getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true }),
    getContent<Settings>({ contentType: 'Settings', language: lang }),
  ]);
  return { page, settings };
};
