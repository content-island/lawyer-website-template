/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// Unit tests for the pure layers (mappers, business, helpers). getViteConfig reuses Astro's setup, including the tsconfig path aliases.
export default getViteConfig({
  test: {
    include: ['src/**/*.spec.ts'],
  },
});
