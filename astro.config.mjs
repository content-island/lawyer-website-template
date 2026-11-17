// @ts-check
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';

// Site domain (optional, in .env): used to generate the hreflang tags for each language
const { SITE_URL } = loadEnv('', decodeURIComponent(new URL('.', import.meta.url).pathname), '');

// https://astro.build/config
export default defineConfig({
  site: SITE_URL || undefined,
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      // READ-ONLY token for the Content Island project (.env)
      CONTENT_ISLAND_ACCESS_TOKEN: envField.string({ context: 'server', access: 'secret', optional: false }),
    },
  },
});
