import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://swisslyit.ch',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Exclude noindex pages from the sitemap
      filter: (page) =>
        !page.includes('/kontakt/danke/') &&
        !page.includes('/404/'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
