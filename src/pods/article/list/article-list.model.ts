import type { ArticleCardVm, LinkVm } from '../article.model';

export interface ArticleListVm {
  backLink: LinkVm;
  eyebrow: string;
  /** Safe HTML (title with emphasis) */
  titleHtml: string;
  lead: string;
  readMoreLabel: string;
  cards: ArticleCardVm[];
}
