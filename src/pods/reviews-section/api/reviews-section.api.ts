import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { LawyerPage, ReviewsSectionApiData, UiText } from './reviews-section.api-model';

export const getReviewsSection = async (lang: LanguageCode): Promise<ReviewsSectionApiData> => {
  const [page, ui] = await Promise.all([
    getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true }),
    getContent<UiText>({ contentType: 'UiText', language: lang }),
  ]);
  return { page, ui };
};
