export interface LinkVm {
  label: string;
  href: string;
}

export interface FooterColumnVm {
  title: string;
  links: LinkVm[];
}

export interface FooterOfficeVm {
  title: string;
  /** Safe HTML (address with line breaks) */
  addressHtml: string;
  phone: LinkVm;
  email: LinkVm;
  book: LinkVm;
}

export interface FooterVm {
  logo: { logoUrl?: string; name: string; role: string; href: string; homeLabel: string };
  deontology: string;
  columns: FooterColumnVm[];
  office: FooterOfficeVm;
  /** "© 2026 Clara Ríos · NIF 12345678A" */
  legalNotice: string;
  legalLinks: LinkVm[];
}
