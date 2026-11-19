import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { LawyerPage } from './faq-section.api-model';

export const getFaqSection = (lang: LanguageCode) =>
  getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true });
