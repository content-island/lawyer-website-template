/** Browser side of the contact form: Zod validation, field errors and sending through the provider */
import {
  CONTACT_FORM_FIELDS,
  createContactFormSchema,
  firstErrorPerField,
  summaryErrorMessage,
  type ContactFormField,
} from './contact-form.schema';
import type { ContactFormMessages } from './contact-section.model';
import { sendContactForm } from './contact-form.provider';

/** What the component passes in `data-config` */
export interface ContactFormConfig {
  subjects: string[];
  messages: ContactFormMessages;
}

export const setupContactForm = (form: HTMLFormElement) => {
  const { subjects, messages } = JSON.parse(form.dataset.config ?? '{}') as ContactFormConfig;
  const schema = createContactFormSchema(subjects, messages.errors);
  const status = form.querySelector<HTMLElement>('[data-intake-msg]');

  const fieldInput = (field: ContactFormField) => form.elements.namedItem(field) as HTMLInputElement | null;

  const showFieldError = (field: ContactFormField, message = '') => {
    const error = form.querySelector<HTMLElement>(`[data-error-for="${field}"]`);
    if (error) error.textContent = message;
    fieldInput(field)?.setAttribute('aria-invalid', String(Boolean(message)));
  };

  const showStatus = (kind: 'ok' | 'err' | '', message = '') => {
    if (!status) return;
    status.className = `form-msg ${kind}`.trim();
    status.textContent = message;
  };

  // The error of a field disappears as soon as the visitor edits it
  CONTACT_FORM_FIELDS.forEach(field => {
    const input = fieldInput(field);
    const clear = () => showFieldError(field);
    input?.addEventListener('input', clear);
    input?.addEventListener('change', clear);
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(form);
    const text = (field: ContactFormField) => String(data.get(field) ?? '');
    const result = schema.safeParse({
      name: text('name'),
      phone: text('phone'),
      email: text('email'),
      subject: text('subject'),
      message: text('message'),
      consent: data.has('consent'),
    });

    if (!result.success) {
      const errors = firstErrorPerField(result.error);
      CONTACT_FORM_FIELDS.forEach(field => showFieldError(field, errors[field]));
      showStatus(
        'err',
        summaryErrorMessage(errors, {
          fieldsAndConsent: messages.error,
          fields: messages.fieldsError,
          consent: messages.errors.consent,
        })
      );
      fieldInput(CONTACT_FORM_FIELDS.find(field => errors[field])!)?.focus();
      return;
    }

    CONTACT_FORM_FIELDS.forEach(field => showFieldError(field));
    try {
      const sent = await sendContactForm(result.data);
      if (!sent) {
        showStatus('err', messages.providerMissing);
        return;
      }
      showStatus('ok', messages.success);
      form.reset();
    } catch {
      showStatus('err', messages.error);
    }
  });
};
