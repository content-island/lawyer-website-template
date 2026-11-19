export interface LinkVm {
  label: string;
  href: string;
}

export type ContactDetailVm =
  | { label: string; kind: 'text'; html: string }
  | { label: string; kind: 'link'; text: string; href: string; external: boolean };

export interface ContactFormVm {
  title: string;
  subtitle: string;
  labels: { name: string; phone: string; email: string; subject: string; message: string; messagePlaceholder: string; gdpr: string };
  subjects: string[];
  /** GDPR basic information (rows of the data protection summary) */
  gdprRows: { title: string; detail: string }[];
  consent: string;
  privacyLink: LinkVm;
  submitLabel: string;
  responseTime: string;
  errorMessage: string;
  successMessage: string;
}

export interface ContactVm {
  id: string;
  eyebrow: string;
  /** Safe HTML */
  titleHtml: string;
  lead: string;
  details: ContactDetailVm[];
  form: ContactFormVm;
}
