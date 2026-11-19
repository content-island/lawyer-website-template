import type { FooterApiData, NavigationItem } from './api/footer.api-model';

export const navItem = (id: string, label: string, url: string): NavigationItem => ({ id, label, url, language: 'es' });

export const footerData: FooterApiData = {
  footer: {
    id: 'f',
    deontology: 'Deontology',
    columns: [{ id: 'c', title: 'Areas', links: ['n1', navItem('n2', 'Wills', '/#areas'), 'missing'] }],
    copyRight: '© 2026 Clara Ríos',
    legalLinks: [navItem('l', 'Legal notice', '/aviso-legal')],
    cookies: navItem('ck', 'Cookies', '/politica-de-cookies'),
    privacyPolicy: navItem('pp', 'Privacy', '/politica-de-privacidad'),
    language: 'es',
  },
  navigationItems: [navItem('n1', 'Divorce', '/#areas')],
  settings: {
    id: 's',
    lawyerName: 'Clara Ríos',
    role: 'Abogada',
    phone: '+34 961',
    phoneHref: 'tel:+34961',
    email: 'a@b.es',
    address: 'Calle 1\nValencia',
    taxId: '123A',
    language: 'es',
  },
  ui: { id: 'u', logoHomeLabel: 'inicio', footerOfficeTitle: 'Office', footerBookLabel: 'Book', taxIdLabel: 'NIF', language: 'es' },
  general: { id: 'g', logo: { name: 'logo', url: '/logo.svg' }, language: 'es' },
  header: { id: 'h', contact: navItem('ct', 'Contact', '/#contacto'), language: 'es' },
};
