import type { SectionHeadVm } from '@common/models';

export interface ReviewVm {
  quote: string;
  author: string;
  caseType: string;
  stars: string;
  ratingLabel: string;
}

export interface ReviewsVm {
  id: string;
  head: SectionHeadVm;
  /** Accessible names of the carousel and its buttons */
  label: string;
  prevLabel: string;
  nextLabel: string;
  items: ReviewVm[];
}
