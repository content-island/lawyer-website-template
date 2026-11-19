import type { Settings, UiText } from './api/whatsapp-float.api-model';
import type { WhatsappFloatVm } from './whatsapp-float.model';

export const mapToWhatsappFloatVm = (settings: Settings, ui: UiText): WhatsappFloatVm => ({
  href: settings.whatsappHref,
  label: ui.whatsappLabel,
});
