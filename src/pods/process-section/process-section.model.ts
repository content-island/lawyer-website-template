import type { SectionHeadVm } from '@common/models';

export interface ProcessStepVm {
  /** 1, 2, 3… */
  number: number;
  title: string;
  text: string;
}

export interface ProcessVm {
  id: string;
  head: SectionHeadVm;
  steps: ProcessStepVm[];
}
