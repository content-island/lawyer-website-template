import { describe, expect, it } from 'vitest';
import { createRoutes } from '@common/routing';
import { buildContactDetails } from './contact-section.business';
import { mapToContactVm } from './contact-section.mapper';
import { contactData } from './contact-section.spec-data';

describe('buildContactDetails', () => {
  it('returns office, phone, WhatsApp (external), email and schedule', () => {
    const { settings, ui } = contactData();
    const details = buildContactDetails(settings, ui);
    expect(details.map(detail => detail.label)).toEqual(['Despacho', 'Teléfono', 'WhatsApp', 'Email', 'Horario']);
    expect(details[0]).toEqual({ label: 'Despacho', kind: 'text', html: 'Calle 1<br />Valencia' });
    expect(details[2]).toEqual({ label: 'WhatsApp', kind: 'link', text: '+34 600', href: 'https://wa.me/34600', external: true });
    expect(details[3]).toMatchObject({ href: 'mailto:a@b.es', external: false });
  });
});

describe('mapToContactVm', () => {
  const vm = mapToContactVm(contactData(), 'es', createRoutes('en'));

  it('takes the section id from the menu and renders the title emphasis', () => {
    expect(vm.id).toBe('contacto');
    expect(vm.titleHtml).toBe('Hablemos <em class="italic text-accent-light">hoy</em>');
  });

  it('resolves the GDPR rows and links the privacy policy in the current language', () => {
    expect(vm.form.gdprRows).toEqual([{ title: 'Responsable', detail: 'Clara Ríos' }]);
    expect(vm.form.privacyLink).toEqual({ label: 'política de privacidad', href: '/es/politica-de-privacidad' });
    expect(vm.form.subjects).toEqual(['Divorcio', 'Herencias']);
  });

  it('takes the form messages from UiText', () => {
    expect(vm.form.messages).toEqual({
      errors: {
        required: 'Obligatorio',
        email: 'Correo',
        phone: 'Teléfono',
        tooLong: 'Largo',
        invalidChars: 'Error',
        subject: 'Error',
        consent: 'Consentimiento',
      },
      error: 'Error',
      fieldsError: 'Error',
      success: 'OK',
      providerMissing: 'Configura tu proveedor',
    });
  });

  it('uses formInvalidCharsError when it exists in Content Island', () => {
    const data = contactData();
    data.ui = { ...data.ui, formInvalidCharsError: 'Caracteres no permitidos' };
    expect(mapToContactVm(data, 'es', createRoutes('en')).form.messages.errors.invalidChars).toBe('Caracteres no permitidos');
  });

  it('uses formFieldsErrorMessage when it exists in Content Island', () => {
    const data = contactData();
    data.ui = { ...data.ui, formFieldsErrorMessage: 'Revisa los campos marcados' };
    expect(mapToContactVm(data, 'es', createRoutes('en')).form.messages.fieldsError).toBe('Revisa los campos marcados');
  });
});
