import { describe, expect, it } from 'vitest';
import { mapToWhatsappFloatVm } from './whatsapp-float.mapper';

describe('mapToWhatsappFloatVm', () => {
  it('maps the link and its accessible label', () => {
    expect(
      mapToWhatsappFloatVm({ id: 's', whatsappHref: 'https://wa.me/1', language: 'en' }, { id: 'u', whatsappLabel: 'Chat', language: 'en' }),
    ).toEqual({ href: 'https://wa.me/1', label: 'Chat' });
  });
});
