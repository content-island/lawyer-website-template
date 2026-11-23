import type { LanguageCode } from '@content-island/api-client';
import { renderEmphasis, resolveRelated } from '@common/helpers';
import { sectionIdFromUrl, type Routes } from '@common/routing';
import type { ContactSectionApiData, UiText } from './api/contact-section.api-model';
import type { ContactFormMessages, ContactFormVm, ContactVm } from './contact-section.model';
import { buildContactDetails } from './contact-section.business';

const mapMessages = (ui: UiText): ContactFormMessages => ({
  errors: {
    required: ui.formRequiredError,
    email: ui.formEmailError,
    phone: ui.formPhoneError,
    tooLong: ui.formTooLongError,
    invalidChars: ui.formInvalidCharsError || ui.formErrorMessage,
    // Only fails if someone tampers with the select: the general message is enough
    subject: ui.formErrorMessage,
    consent: ui.formConsentError,
  },
  error: ui.formErrorMessage,
  fieldsError: ui.formFieldsErrorMessage || ui.formErrorMessage,
  success: ui.formSuccessMessage,
  providerMissing: ui.formProviderMissingMessage,
});

const mapForm = ({ page: { contact }, cvEntries, ui, footer }: ContactSectionApiData, lang: LanguageCode, routes: Routes): ContactFormVm => ({
  title: contact.formTitle,
  subtitle: contact.formSubtitle,
  labels: {
    name: ui.formNameLabel,
    phone: ui.formPhoneLabel,
    email: ui.formEmailLabel,
    subject: ui.formSubjectLabel,
    message: ui.formMessageLabel,
    messagePlaceholder: ui.formMessagePlaceholder,
    gdpr: ui.formGdprLabel,
  },
  subjects: contact.subjects,
  gdprRows: resolveRelated(contact.gdpr, cvEntries).map(({ title, detail }) => ({ title, detail })),
  consent: contact.consent,
  privacyLink: { label: ui.formPrivacyLinkLabel, href: routes.fromCms(lang, footer.privacyPolicy.url) },
  submitLabel: contact.submitLabel,
  responseTime: contact.responseTime,
  messages: mapMessages(ui),
});

export const mapToContactVm = (data: ContactSectionApiData, lang: LanguageCode, routes: Routes): ContactVm => ({
  id: sectionIdFromUrl(data.header.contact.url),
  eyebrow: data.page.contact.eyebrow,
  titleHtml: renderEmphasis(data.page.contact.title, 'italic text-accent-light'),
  lead: data.page.contact.lead,
  details: buildContactDetails(data.settings, data.ui),
  form: mapForm(data, lang, routes),
});
