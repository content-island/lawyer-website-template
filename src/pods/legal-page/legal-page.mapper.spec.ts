import { describe, expect, it } from 'vitest';
import { createRoutes } from '@common/routing';
import type { LegalPage, UiText } from './api/legal-page.api-model';
import { mapToLegalPageVm } from './legal-page.mapper';

describe('mapToLegalPageVm', () => {
  it('links back to home and inserts the update date', () => {
    const page: LegalPage = { id: 'c', lastUpdate: '2026-11-12T12:00:00Z', text: '# T', slug: 'politica-de-cookies', language: 'es' };
    const ui: UiText = { id: 'u', backToHomeLabel: 'Volver', legalUpdatedLabel: 'Última actualización', language: 'es' };
    const vm = mapToLegalPageVm(page, '<h1>T</h1>', ui, 'es', createRoutes('en'));
    expect(vm.backLink).toEqual({ label: 'Volver', href: '/es/' });
    expect(vm.html).toBe('<h1>T</h1><p class="legal-updated"><time datetime="2026-11-12T12:00:00Z">Última actualización: 12 de noviembre de 2026</time></p>');
  });
});
