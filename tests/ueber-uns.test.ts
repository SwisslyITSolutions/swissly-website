import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import UeberUns from '../src/pages/ueber-uns.astro';

test('renders team members', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(UeberUns);
  expect(html).toContain('Taha');
  expect(html).toContain('Georg');
});

test('renders team portraits with descriptive alt text', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(UeberUns);
  expect(html).toContain('Taha Afif —');
  expect(html).toContain('Georg Ristic —');
  expect(html).toMatch(/<img[^>]+alt="Taha Afif/);
});

test('renders 3 value names', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(UeberUns);
  expect(html).toContain('Verständlichkeit');
  expect(html).toContain('Verlässlichkeit');
  expect(html).toContain('Praxisnähe');
});
