import type { LanguageCode } from '@content-island/api-client';
import { mapSectionHeadToVm } from '@common/mappers';
import { sectionAnchor } from '@common/routing';
import type { LawyerPage } from './api/why-section.api-model';
import type { WhyVm } from './why-section.model';

export const mapToWhyVm = (page: LawyerPage, lang: LanguageCode): WhyVm => ({
  id: sectionAnchor(lang, 'why'),
  head: mapSectionHeadToVm(page.whyHead),
  items: (page.whyItems ?? []).map(item => ({ title: item.title, text: item.text, iconUrl: item.icon.url })),
});
