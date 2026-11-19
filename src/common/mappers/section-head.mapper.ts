import { renderEmphasis } from '@common/helpers';
import type { SectionHeadVm } from '@common/models';

export interface SectionHeadSource {
  eyebrow: string;
  title: string;
  lead?: string;
}

export const mapSectionHeadToVm = (head: SectionHeadSource): SectionHeadVm => ({
  eyebrow: head.eyebrow,
  titleHtml: renderEmphasis(head.title),
  lead: head.lead,
});
