import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { LawyerPage } from './process-section.api-model';

export const getProcessSection = (lang: LanguageCode) =>
  getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true });
