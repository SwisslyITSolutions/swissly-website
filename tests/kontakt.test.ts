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

test('form does not have novalidate (uses native HTML5 validation)', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Kontakt);
  expect(html).not.toContain('novalidate');
});

test('form labels use light-tone ink text (visible on offwhite background)', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Kontakt);
  // FormField tone="light" renders labels with text-ink class (dark text on light bg)
  expect(html).toContain('text-ink');
  // The form inputs must use white background (not navy) for light-tone fields
  expect(html).toContain('bg-white');
});

test('danke page has noindex', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Danke);
  expect(html).toContain('noindex');
});
