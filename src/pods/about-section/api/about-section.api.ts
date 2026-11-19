import type { LanguageCode } from '@content-island/api-client';
import { getContent, getContentList } from '@common/api';
import type { AboutSectionApiData, CvEntry, Header, LawyerPage, Settings, UiText } from './about-section.api-model';

export const getAboutSection = async (lang: LanguageCode): Promise<AboutSectionApiData> => {
  const [page, cvEntries, settings, ui, header] = await Promise.all([
    getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true }),
    getContentList<CvEntry & { id: string }>({ contentType: 'CvEntry', language: lang }),
    getContent<Settings>({ contentType: 'Settings', language: lang }),
    getContent<UiText>({ contentType: 'UiText', language: lang }),
    getContent<Header>({ contentType: 'Header', language: lang, includeRelatedContent: true }),
  ]);
  return { page, cvEntries, settings, ui, header };
};
