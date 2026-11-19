import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { LawyerPage } from './why-section.api-model';

export const getWhySection = (lang: LanguageCode) =>
  getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true });
