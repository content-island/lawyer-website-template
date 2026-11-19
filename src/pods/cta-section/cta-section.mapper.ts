import { sectionIdFromUrl } from '@common/routing';
import type { CtaSectionApiData } from './api/cta-section.api-model';
import type { CtaVm } from './cta-section.model';

export const mapToCtaVm = ({ page: { cta }, header }: CtaSectionApiData): CtaVm => ({
  title: cta.title,
  text: cta.text,
  image: { url: cta.image.url, alt: cta.imageAlt },
  link: { label: cta.ctaLabel, href: `#${sectionIdFromUrl(header.contact.url)}` },
});
