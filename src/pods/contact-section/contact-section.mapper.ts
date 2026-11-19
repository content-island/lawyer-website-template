import type { LanguageCode } from '@content-island/api-client';
import { renderEmphasis, resolveRelated } from '@common/helpers';
import { sectionIdFromUrl, type Routes } from '@common/routing';
import type { ContactSectionApiData } from './api/contact-section.api-model';
import type { ContactFormVm, ContactVm } from './contact-section.model';
import { buildContactDetails } from './contact-section.business';

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
  errorMessage: ui.formErrorMessage,
  successMessage: ui.formSuccessMessage,
});

export const mapToContactVm = (data: ContactSectionApiData, lang: LanguageCode, routes: Routes): ContactVm => ({
  id: sectionIdFromUrl(data.header.contact.url),
  eyebrow: data.page.contact.eyebrow,
  titleHtml: renderEmphasis(data.page.contact.title, 'italic text-accent-light'),
  lead: data.page.contact.lead,
  details: buildContactDetails(data.settings, data.ui),
  form: mapForm(data, lang, routes),
});
