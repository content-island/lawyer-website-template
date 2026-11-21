import type { ContactFormErrorMessages } from './contact-form.schema';

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
  messages: ContactFormMessages;
}

export interface ContactFormMessages {
  /** One per validation rule, shown under the field */
  errors: ContactFormErrorMessages;
  /** Summary when some field is invalid, or when sending fails */
  error: string;
  success: string;
  /** While no email provider is connected */
  providerMissing: string;
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
