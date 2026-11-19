import type { SectionHeadVm } from '@common/models';

export interface FaqItemVm {
  question: string;
  answer: string;
}

export interface FaqVm {
  id: string;
  head: SectionHeadVm;
  items: FaqItemVm[];
}
