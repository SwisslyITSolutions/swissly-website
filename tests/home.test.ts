import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Index from '../src/pages/index.astro';

const decode = (s: string) =>
  s.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<');

test('home renders the brand claim', async () => {
  const c = await AstroContainer.create();
  const html = decode(await c.renderToString(Index));
  expect(html).toContain('Webseiten, die einfach laufen.');
});

test('home offers the Erstgespräch CTA', async () => {
  const c = await AstroContainer.create();
  const html = decode(await c.renderToString(Index));
  expect(html).toContain('Erstgespräch');
  expect(html).toContain('href="/erstgespraech/"');
});

test('home emits ProfessionalService JSON-LD', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Index);
  expect(html).toContain('application/ld+json');
  expect(html).toContain('"ProfessionalService"');
  expect(html).toContain('"@type":"Organization"');
});

test('home links to the ECS project', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Index);
  expect(html).toContain('ecs-luzern.ch');
});

test('home links to the Leistungen overview', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Index);
  expect(html).toContain('href="/leistungen/"');
});
