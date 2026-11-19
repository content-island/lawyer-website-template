import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { CredentialsSectionApiData, Header, LawyerPage, UiText } from './credentials-section.api-model';

export const getCredentialsSection = async (lang: LanguageCode): Promise<CredentialsSectionApiData> => {
  const [page, ui, header] = await Promise.all([
    getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true }),
    getContent<UiText>({ contentType: 'UiText', language: lang }),
    getContent<Header>({ contentType: 'Header', language: lang, includeRelatedContent: true }),
  ]);
  return { page, ui, header };
};
