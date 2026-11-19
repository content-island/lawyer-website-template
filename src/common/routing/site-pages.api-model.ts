export interface Article {
  id: string;
  slug: string;
  date: string; // ISO 8601, used to sort
}

export interface LegalPage {
  id: string;
  slug: string;
}
