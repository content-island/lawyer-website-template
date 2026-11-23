/**
 * Contact form validation (Zod).
 * Pure: runs in the browser before sending, and must run again on the server when a provider is connected
 * (browser validation can be bypassed). See the "Contact form" section of the README.
 */
import { z } from 'astro/zod';

export const CONTACT_FORM_FIELDS = ['name', 'phone', 'email', 'subject', 'message', 'consent'] as const;
export type ContactFormField = (typeof CONTACT_FORM_FIELDS)[number];

/** Max length of each text field */
export const CONTACT_FORM_LIMITS = { name: 100, phone: 20, email: 254, message: 2000 } as const;

/** Error messages per rule, translated (UiText in Content Island) */
export interface ContactFormErrorMessages {
  required: string;
  email: string;
  phone: string;
  tooLong: string;
  invalidChars: string;
  subject: string;
  consent: string;
}

/** Raw values as they come from the form */
export interface ContactFormInput {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

/** HTML injection characters. The apostrophe is allowed: "Jordi d'Ors" */
const FORBIDDEN_IN_NAME = /[<>&"/\\]/;
/** Free text keeps quotes, "&" and "/" ("300 €/mes", "el 12/05"); only HTML tags are blocked */
const FORBIDDEN_IN_MESSAGE = /[<>\\]/;
/** Optional "+", then 6 to 15 digits, which may be separated by spaces, "(", ")" or "-" */
const PHONE = /^\+?(?:[\s()-]*\d){6,15}[\s()-]*$/;

export const createContactFormSchema = (subjects: string[], messages: ContactFormErrorMessages) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, { error: messages.required })
      .max(CONTACT_FORM_LIMITS.name, { error: messages.tooLong })
      .refine(value => !FORBIDDEN_IN_NAME.test(value), { error: messages.invalidChars }),
    phone: z
      .string()
      .trim()
      .min(1, { error: messages.required })
      .max(CONTACT_FORM_LIMITS.phone, { error: messages.tooLong })
      .regex(PHONE, { error: messages.phone }),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, { error: messages.required })
      .max(CONTACT_FORM_LIMITS.email, { error: messages.tooLong })
      // The email format already rejects <, >, quotes and slashes
      .pipe(z.email({ error: messages.email })),
    // Optional; when sent, it must be one of the options of the select
    subject: z
      .string()
      .trim()
      .refine(value => value === '' || subjects.includes(value), { error: messages.subject }),
    // Optional
    message: z
      .string()
      .trim()
      .max(CONTACT_FORM_LIMITS.message, { error: messages.tooLong })
      .refine(value => !FORBIDDEN_IN_MESSAGE.test(value), { error: messages.invalidChars }),
    consent: z.boolean().refine(Boolean, { error: messages.consent }),
  });

export type ContactFormData = z.output<ReturnType<typeof createContactFormSchema>>;

/** Summary under the button when the form is invalid, translated (UiText in Content Island) */
export interface ContactFormSummaryMessages {
  /** Some field and the privacy checkbox fail */
  fieldsAndConsent: string;
  /** Only fields fail: it doesn't mention the checkbox */
  fields: string;
  /** Only the privacy checkbox fails */
  consent: string;
}

/** Picks the summary so it only mentions the privacy checkbox when the checkbox is failing */
export const summaryErrorMessage = (
  errors: Partial<Record<ContactFormField, string>>,
  messages: ContactFormSummaryMessages
): string => {
  const consentFails = Boolean(errors.consent);
  const fieldsFail = CONTACT_FORM_FIELDS.some(field => field !== 'consent' && Boolean(errors[field]));
  if (consentFails && !fieldsFail) {
    return messages.consent;
  }
  if (fieldsFail && !consentFails) {
    return messages.fields;
  }
  return messages.fieldsAndConsent;
};

/** First error message of each invalid field */
export const firstErrorPerField = (error: z.ZodError): Partial<Record<ContactFormField, string>> => {
  const errors: Partial<Record<ContactFormField, string>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactFormField;
    errors[field] ??= issue.message;
  }
  return errors;
};
