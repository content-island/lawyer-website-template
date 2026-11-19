import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { CtaSectionApiData, Header, LawyerPage } from './cta-section.api-model';

export const getCtaSection = async (lang: LanguageCode): Promise<CtaSectionApiData> => {
  const [page, header] = await Promise.all([
    getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true }),
    getContent<Header>({ contentType: 'Header', language: lang, includeRelatedContent: true }),
  ]);
  return { page, header };
};
