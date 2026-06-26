import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Kontakt from '../src/pages/kontakt/index.astro';
import Danke from '../src/pages/kontakt/danke.astro';

test('form has correct action and POST method', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Kontakt);
  expect(html).toContain('action="/contact-handler.php"');
  expect(html).toContain('method="POST"');
});

test('form has required email input', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Kontakt);
  expect(html).toContain('type="email"');
  expect(html).toContain('required');
});

test('form has textarea for Anliegen', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Kontakt);
  expect(html).toContain('<textarea');
  expect(html).toContain('name="anliegen"');
});

test('form has hidden honeypot field', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Kontakt);
  expect(html).toContain('name="company_url"');
  expect(html).toContain('type="text"');
});

test('form links to datenschutzerklaerung', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Kontakt);
  expect(html).toContain('/datenschutzerklaerung/');
});

test('danke page has noindex', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Danke);
  expect(html).toContain('noindex');
});
