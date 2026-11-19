export interface LegalPageVm {
  backLink: { label: string; href: string };
  /** Safe HTML: markdown body with the "last updated" line below the title */
  html: string;
}
