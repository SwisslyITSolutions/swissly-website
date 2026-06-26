import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Footer from '../src/components/layout/Footer.astro';

// Astro HTML-escapes text content (&, ', <, >); decode so we assert on what the
// user actually sees in the browser.
const decode = (s: string) =>
  s.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<');

test('Footer renders legal links, tagline, cookie trigger and copyright', async () => {
  const c = await AstroContainer.create();
  const html = decode(await c.renderToString(Footer));

  expect(html).toContain('href="/impressum/"');
  expect(html).toContain('href="/datenschutzerklaerung/"');
  expect(html).toContain('href="/agb/"');
  expect(html).toContain('Digital Innovation & Trust');
  expect(html).toContain('id="cookie-settings"');
  expect(html).toContain('Alle Rechte vorbehalten');
  expect(html).toContain('© 2026');
});

test('Footer exposes NAP and mail link', async () => {
  const c = await AstroContainer.create();
  const html = decode(await c.renderToString(Footer));
  expect(html).toContain('6030');
  expect(html).toContain('Ebikon');
  expect(html).toContain('mailto:info@swisslyit.ch');
});
