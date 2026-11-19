import { renderLines } from '@common/helpers';
import type { Settings, UiText } from './api/contact-section.api-model';
import type { ContactDetailVm } from './contact-section.model';

/** Office, phone, WhatsApp (new tab), email and opening hours */
export const buildContactDetails = (settings: Settings, ui: UiText): ContactDetailVm[] => [
  { label: ui.contactOfficeLabel, kind: 'text', html: renderLines(settings.address) },
  { label: ui.contactPhoneLabel, kind: 'link', text: settings.phone, href: settings.phoneHref, external: false },
  { label: ui.contactWhatsappLabel, kind: 'link', text: settings.whatsapp, href: settings.whatsappHref, external: true },
  { label: ui.contactEmailLabel, kind: 'link', text: settings.email, href: `mailto:${settings.email}`, external: false },
  { label: ui.contactScheduleLabel, kind: 'text', html: renderLines(settings.schedule) },
];
