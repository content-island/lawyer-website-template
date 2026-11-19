import { mapSectionHeadToVm } from '@common/mappers';
import { sectionIdFromUrl } from '@common/routing';
import type { AreasSectionApiData, PracticeArea } from './api/areas-section.api-model';
import type { AreasVm, PracticeAreaVm } from './areas-section.model';

const mapPracticeArea = (area: PracticeArea, contactHref: string): PracticeAreaVm => ({
  title: area.title,
  description: area.description,
  iconUrl: area.icon.url,
  image: { url: area.image.url, alt: area.imageAlt },
  isMain: area.isMain,
  tag: area.tag,
  cta: { label: area.ctaLabel, href: contactHref },
});

export const mapToAreasVm = ({ page, header }: AreasSectionApiData): AreasVm => ({
  id: sectionIdFromUrl(header.areas.url),
  head: mapSectionHeadToVm(page.areasHead),
  items: (page.practiceAreas ?? []).map(area => mapPracticeArea(area, `#${sectionIdFromUrl(header.contact.url)}`)),
});
