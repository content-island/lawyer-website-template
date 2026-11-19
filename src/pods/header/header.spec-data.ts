import type { HeaderApiData } from './api/header.api-model';

const nav = (id: string, label: string, url: string) => ({ id, label, url });

export const headerData: HeaderApiData = {
  header: {
    id: 'h',
    areas: nav('1', 'Areas', '/#areas'),
    about: nav('2', 'About', '/#about'),
    articles: nav('3', 'Articles', '/#articles'),
    contact: nav('4', 'Contact', '/#contact'),
    ctaLabel: 'Book',
    menuLabel: 'Menu',
    language: 'en',
  },
  settings: {
    id: 's',
    lawyerName: 'Clara Ríos',
    role: 'Lawyer',
    barAssociation: 'Valencia Bar Association',
    barAssociationShort: 'ICAV',
    barNumber: '12345',
    phone: '+34 961',
    phoneHref: 'tel:+34961',
    email: 'a@b.es',
    scheduleShort: 'Mon-Fri',
    language: 'en',
  },
  general: { id: 'g', language: 'en' },
  ui: { id: 'u', barNumberPrefix: 'Bar no.', mainNavLabel: 'Main', logoHomeLabel: 'home', languageLabel: 'Language', language: 'en' },
  articles: [{ id: 'a', date: '2026-01-01' }],
};
