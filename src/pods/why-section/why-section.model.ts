import type { SectionHeadVm } from '@common/models';

export interface WhyItemVm {
  title: string;
  text: string;
  iconUrl: string;
}

export interface WhyVm {
  id: string;
  head: SectionHeadVm;
  items: WhyItemVm[];
}
