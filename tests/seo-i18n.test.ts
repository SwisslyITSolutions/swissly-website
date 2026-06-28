import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import BaseLayout from '../src/layouts/BaseLayout.astro';

const props = { title: 'Test', description: 'Desc' };
const slots = { default: '<p>content</p>' };

test('BaseLayout renders German by default with hreflang alternates', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(BaseLayout, { props: { ...props, path: '/' }, slots });
  expect(html).toContain('<html lang="de-CH">');
  expect(html).toContain('content="de_CH"');
  expect(html).toContain('rel="alternate" hreflang="de"');
  expect(html).toContain('rel="alternate" hreflang="en"');
  expect(html).toContain('rel="alternate" hreflang="x-default"');
  expect(html).toContain('https://swisslyit.ch/en/');
});

test('BaseLayout renders English when lang=en', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(BaseLayout, { props: { ...props, path: '/en/', lang: 'en' }, slots });
  expect(html).toContain('<html lang="en">');
  expect(html).toContain('content="en_GB"');
  // en alternate points to the EN path, de alternate to the root
  expect(html).toContain('hreflang="en" href="https://swisslyit.ch/en/"');
  expect(html).toContain('hreflang="de" href="https://swisslyit.ch/"');
});
