import type { LanguageCode } from '@content-island/api-client';
import { mapSectionHeadToVm } from '@common/mappers';
import { sectionAnchor } from '@common/routing';
import type { LawyerPage } from './api/process-section.api-model';
import type { ProcessVm } from './process-section.model';

export const mapToProcessVm = (page: LawyerPage, lang: LanguageCode): ProcessVm => ({
  id: sectionAnchor(lang, 'process'),
  head: mapSectionHeadToVm(page.processHead),
  steps: (page.processSteps ?? []).map((step, i) => ({ number: i + 1, title: step.title, text: step.text })),
});
