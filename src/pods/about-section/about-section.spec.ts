import { describe, expect, it } from 'vitest';
import type { AboutSectionApiData } from './api/about-section.api-model';
import { buildBarMembership, buildCvGroups, listLabel } from './about-section.business';
import { mapToAboutVm } from './about-section.mapper';

const data = (): AboutSectionApiData => ({
  page: {
    id: 'p',
    about: {
      id: 'ab',
      eyebrow: 'Sobre mí',
      title: 'Clara *Ríos*',
      intro: 'Intro',
      body: 'Body',
      signature: 'Clara',
      signatureMeta: 'Abogada',
      educationTitle: 'Formación',
      education: ['cv1', { title: 'Máster', detail: 'UV' }, 'unknown'],
      membershipsTitle: 'Colegiación',
      memberships: ['cv2'],
    },
    language: 'es',
  },
  cvEntries: [
    { id: 'cv1', title: 'Derecho', detail: 'UV' },
    { id: 'cv2', title: 'Mediadora', detail: 'CGPJ' },
  ],
  settings: { id: 's', barAssociation: 'ICAV', barNumber: '12345', barSince: '2004', language: 'es' },
  ui: { id: 'u', barNumberPrefix: 'Col. nº', barSinceLabel: 'desde', language: 'es' },
  header: { id: 'h', about: { id: 'a', label: 'Sobre mí', url: '/#sobre-mi' }, language: 'es' },
});

describe('about business', () => {
  it('builds the bar membership from Settings and puts it first in memberships', () => {
    const { settings, ui } = data();
    const bar = buildBarMembership(settings, ui);
    expect(bar).toEqual({ title: 'ICAV', detail: 'Col. nº 12345 desde 2004' });
    expect(buildCvGroups({ title: 'F', items: [] }, { title: 'C', items: [{ title: 'M', detail: 'D' }] }, bar)[1]!.items).toEqual([
      { title: 'ICAV', detail: 'Col. nº 12345 desde 2004' },
      { title: 'M', detail: 'D' },
    ]);
  });

  it('joins group titles with the language list format', () => {
    expect(listLabel(['Formación', 'Colegiación'], 'es')).toBe('Formación y Colegiación');
    expect(listLabel(['Education', 'Memberships'], 'en')).toBe('Education and Memberships');
  });
});

describe('mapToAboutVm', () => {
  it('resolves CV entries and takes the section id from the menu', () => {
    const vm = mapToAboutVm(data(), 'es');
    expect(vm.id).toBe('sobre-mi');
    expect(vm.titleHtml).toBe('Clara <em class="emph">Ríos</em>');
    expect(vm.cvLabel).toBe('Formación y Colegiación');
    expect(vm.cvGroups.map(group => group.items.map(item => item.title))).toEqual([['Derecho', 'Máster'], ['ICAV', 'Mediadora']]);
  });
});
