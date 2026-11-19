import type { SectionHeadVm } from '@common/models';

export interface PracticeAreaVm {
  title: string;
  description: string;
  iconUrl: string;
  image: { url: string; alt: string };
  /** Main practice area: accent border, inverted icon block and optional tag */
  isMain: boolean;
  tag?: string;
  cta: { label: string; href: string };
}

export interface AreasVm {
  id: string;
  head: SectionHeadVm;
  items: PracticeAreaVm[];
}
