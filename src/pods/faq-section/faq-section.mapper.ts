import type { LanguageCode } from '@content-island/api-client';
import { mapSectionHeadToVm } from '@common/mappers';
import { sectionAnchor } from '@common/routing';
import type { LawyerPage } from './api/faq-section.api-model';
import type { FaqVm } from './faq-section.model';

/** undefined when there is no header or no questions: the section is not shown */
export const mapToFaqVm = (page: LawyerPage, lang: LanguageCode): FaqVm | undefined => {
  const items = page.faqItems ?? [];
  if (!page.faqHead || items.length === 0) return undefined;
  return {
    id: sectionAnchor(lang, 'faq'),
    head: mapSectionHeadToVm(page.faqHead),
    items: items.map(({ question, answer }) => ({ question, answer })),
  };
};
