import { describe, expect, it } from 'vitest';
import { renderCredentials } from './credentials-section.business';
import { mapToCredentialsVm } from './credentials-section.mapper';

describe('renderCredentials', () => {
  it('highlights {{text}} and **figures** and escapes HTML', () => {
    expect(renderCredentials('<b> **20** {{años}}', { highlight: 'h', number: 'n' })).toBe('&lt;b&gt; <b class="n">20</b> <span class="h">años</span>');
  });
});

describe('mapToCredentialsVm', () => {
  it('links to the about section of the menu', () => {
    const vm = mapToCredentialsVm({
      page: { id: 'p', credentials: { id: 'c', text: 'Más de **20** años', linkLabel: 'Sobre mí' }, language: 'es' },
      ui: { id: 'u', credentialsLabel: 'Credenciales', language: 'es' },
      header: { id: 'h', about: { id: 'a', label: 'Sobre mí', url: '/#sobre-mi' }, language: 'es' },
    });
    expect(vm.label).toBe('Credenciales');
    expect(vm.link).toEqual({ label: 'Sobre mí', href: '#sobre-mi' });
    expect(vm.textHtml).toContain('<b class="text-accent');
  });
});
