/** View model of the shared section header (eyebrow + title + optional lead) */
export interface SectionHeadVm {
  eyebrow: string;
  /** Safe HTML (title with emphasis already rendered) */
  titleHtml: string;
  lead?: string;
}
