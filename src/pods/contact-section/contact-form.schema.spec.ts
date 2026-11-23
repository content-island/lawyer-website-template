import { describe, expect, it } from 'vitest';
import { createContactFormSchema, firstErrorPerField, summaryErrorMessage, type ContactFormInput } from './contact-form.schema';

const messages = {
  required: 'required',
  email: 'email',
  phone: 'phone',
  tooLong: 'tooLong',
  invalidChars: 'invalidChars',
  subject: 'subject',
  consent: 'consent',
};
const schema = createContactFormSchema(['Divorcio', 'Herencia'], messages);

const valid: ContactFormInput = {
  name: 'Ana López',
  phone: '+34 600 00 00 00',
  email: 'ana@example.com',
  subject: 'Divorcio',
  message: 'Hola',
  consent: true,
};

const errorsOf = (input: Partial<ContactFormInput>) => {
  const result = schema.safeParse({ ...valid, ...input });
  return result.success ? {} : firstErrorPerField(result.error);
};

describe('contact form schema', () => {
  it('accepts valid data, trimmed and with the email in lowercase', () => {
    const result = schema.parse({ ...valid, name: '  Ana López ', email: ' ANA@Example.com ', message: ' Hola\n\nGracias ' });
    expect(result).toMatchObject({ name: 'Ana López', email: 'ana@example.com', message: 'Hola\n\nGracias' });
  });

  it('subject and message are optional', () => {
    expect(errorsOf({ subject: '', message: '' })).toEqual({});
  });

  it('rejects empty or whitespace-only required fields', () => {
    expect(errorsOf({ name: '   ', phone: '', email: ' \n ' })).toEqual({ name: 'required', phone: 'required', email: 'required' });
  });

  it('rejects HTML injection characters in the name, but allows apostrophes', () => {
    expect(errorsOf({ name: '<script>alert(1)</script>' })).toEqual({ name: 'invalidChars' });
    expect(errorsOf({ name: 'Ana "la abogada"' })).toEqual({ name: 'invalidChars' });
    expect(errorsOf({ name: 'Ana/López' })).toEqual({ name: 'invalidChars' });
    expect(errorsOf({ name: 'Ana \\ López' })).toEqual({ name: 'invalidChars' });
    expect(errorsOf({ name: "Jordi d'Ors" })).toEqual({});
  });

  it('rejects HTML in the message, but allows quotes, "&" and "/"', () => {
    expect(errorsOf({ message: '<img src=x onerror=alert(1)>' })).toEqual({ message: 'invalidChars' });
    expect(errorsOf({ message: 'Me pasa 300 €/mes desde el 12/05 & dice "ya pagaré"' })).toEqual({});
  });

  it('validates email and phone formats', () => {
    expect(errorsOf({ email: 'ana@', phone: 'call me' })).toEqual({ email: 'email', phone: 'phone' });
    expect(errorsOf({ email: '<ana>@example.com' })).toEqual({ email: 'email' });
    expect(errorsOf({ phone: '(+34) 961-23-45-67' })).toEqual({ phone: 'phone' });
    expect(errorsOf({ phone: '+34 (961) 23-45-67' })).toEqual({});
  });

  it('rejects texts that are too long', () => {
    expect(errorsOf({ name: 'a'.repeat(101), message: 'a'.repeat(2001) })).toEqual({ name: 'tooLong', message: 'tooLong' });
  });

  it('only accepts a subject from the list', () => {
    expect(errorsOf({ subject: 'Hacked' })).toEqual({ subject: 'subject' });
  });

  it('requires the privacy consent', () => {
    expect(errorsOf({ consent: false })).toEqual({ consent: 'consent' });
  });
});

describe('summaryErrorMessage', () => {
  const summary = { fieldsAndConsent: 'fields and consent', fields: 'fields', consent: 'consent only' };

  it('mentions the privacy checkbox only when it is the only thing failing', () => {
    expect(summaryErrorMessage(errorsOf({ consent: false }), summary)).toBe('consent only');
  });

  it("doesn't mention the privacy checkbox when it is checked and some field fails", () => {
    expect(summaryErrorMessage(errorsOf({ phone: '' }), summary)).toBe('fields');
    expect(summaryErrorMessage(errorsOf({ message: '<h1>XSS</h1>' }), summary)).toBe('fields');
  });

  it('mentions fields and checkbox when both fail', () => {
    expect(summaryErrorMessage(errorsOf({ phone: '', consent: false }), summary)).toBe('fields and consent');
  });
});
