import type { LanguageCode } from '@content-island/api-client';
import { getContent, getContentList } from '@common/api';
import type { ContactSectionApiData, CvEntry, Footer, Header, LawyerPage, Settings, UiText } from './contact-section.api-model';

export const getContactSection = async (lang: LanguageCode): Promise<ContactSectionApiData> => {
  const [page, cvEntries, settings, ui, header, footer] = await Promise.all([
    getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true }),
    getContentList<CvEntry & { id: string }>({ contentType: 'CvEntry', language: lang }),
    getContent<Settings>({ contentType: 'Settings', language: lang }),
    getContent<UiText>({ contentType: 'UiText', language: lang }),
    getContent<Header>({ contentType: 'Header', language: lang, includeRelatedContent: true }),
    getContent<Footer>({ contentType: 'Footer', language: lang, includeRelatedContent: true }),
  ]);
  return { page, cvEntries, settings, ui, header, footer };
};
