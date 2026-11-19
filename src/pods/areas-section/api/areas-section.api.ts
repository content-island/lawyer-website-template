import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { AreasSectionApiData, Header, LawyerPage } from './areas-section.api-model';

export const getAreasSection = async (lang: LanguageCode): Promise<AreasSectionApiData> => {
  const [page, header] = await Promise.all([
    getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true }),
    getContent<Header>({ contentType: 'Header', language: lang, includeRelatedContent: true }),
  ]);
  return { page, header };
};
