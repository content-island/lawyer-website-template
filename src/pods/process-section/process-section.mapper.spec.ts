import { describe, expect, it } from 'vitest';
import { mapToProcessVm } from './process-section.mapper';

describe('mapToProcessVm', () => {
  it('numbers the steps in order', () => {
    const vm = mapToProcessVm(
      {
        id: 'p',
        processHead: { id: 'h', eyebrow: 'Cómo trabajo', title: 'Tres *pasos*' },
        processSteps: [
          { id: '1', title: 'Escucho', text: 'T1' },
          { id: '2', title: 'Actúo', text: 'T2' },
        ],
        language: 'es',
      },
      'en',
    );
    expect(vm.id).toBe('how-i-work');
    expect(vm.steps).toEqual([
      { number: 1, title: 'Escucho', text: 'T1' },
      { number: 2, title: 'Actúo', text: 'T2' },
    ]);
  });
});
