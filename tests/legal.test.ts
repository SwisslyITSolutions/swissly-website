import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Impressum from '../src/pages/impressum.astro';
import Datenschutz from '../src/pages/datenschutzerklaerung.astro';
import Agb from '../src/pages/agb.astro';

test('Impressum contains CHE number and address', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Impressum);
  expect(html).toContain('CHE-288.328.570');
  expect(html).toContain('Pilatusweg 23');
  expect(html).toContain('Haftung für Links');
});

test('Datenschutz contains GA4, DPF, Notion, OpenStreetMap', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Datenschutz);
  expect(html).toContain('Google Analytics');
  expect(html).toContain('Data Privacy Framework');
  expect(html).toContain('Notion');
  expect(html).toContain('OpenStreetMap');
});

test('AGB contains Gerichtsstand', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Agb);
  expect(html).toContain('Gerichtsstand');
});
