import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Production defaults to swisslyit.ch; a staging build overrides via PUBLIC_SITE_URL
  // (e.g. PUBLIC_SITE_URL=https://test.swisslyit.ch PUBLIC_STAGING=1 npm run build)
  site: process.env.PUBLIC_SITE_URL || 'https://swisslyit.ch',
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
