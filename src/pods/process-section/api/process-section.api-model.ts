import type { LanguageCode } from '@content-island/api-client';

export interface SectionHead {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  text: string;
}

/** Home page entry: only "how I work" is read here (steps in the relation order) */
export interface LawyerPage {
  id: string;
  processHead: SectionHead;
  processSteps?: ProcessStep[];
  language: LanguageCode;
}
