// @ts-check
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';

// Dominio de la web (opcional, en .env): con él se generan las etiquetas hreflang de los idiomas
const { SITE_URL } = loadEnv('', decodeURIComponent(new URL('.', import.meta.url).pathname), '');

// https://astro.build/config
export default defineConfig({
  site: SITE_URL || undefined,
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      // Token de SOLO LECTURA del proyecto de Content Island (.env)
      CONTENT_ISLAND_ACCESS_TOKEN: envField.string({ context: 'server', access: 'secret', optional: false }),
    },
  },
});
