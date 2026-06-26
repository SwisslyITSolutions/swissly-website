import type { APIRoute } from 'astro';

// Staging builds (PUBLIC_STAGING=1, e.g. test.swisslyit.ch) block ALL crawlers so the
// test site never gets indexed. Production allows everything and points to the sitemap.
const staging = import.meta.env.PUBLIC_STAGING === '1';
const site = (import.meta.env.PUBLIC_SITE_URL || 'https://swisslyit.ch').replace(/\/$/, '');

const body = staging
  ? `User-agent: *\nDisallow: /\n`
  : `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap-index.xml\n`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
