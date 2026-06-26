import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Erstgespraech from '../src/pages/erstgespraech.astro';

test('renders Kostenloses Erstgespräch heading', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Erstgespraech);
  expect(html).toContain('Kostenloses Erstgespräch');
});

test('form posts to correct endpoint', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Erstgespraech);
  expect(html).toContain('action="/contact-handler.php"');
});

test('renders 3 step labels', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Erstgespraech);
  expect(html).toContain('Situationsanalyse');
  expect(html).toContain('Engpässe');
  expect(html).toContain('Empfehlung');
});
