import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Seo from '../src/components/seo/Seo.astro';
import JsonLd from '../src/components/seo/JsonLd.astro';

test('Seo emits title, canonical and OG tags', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Seo, {
    props: { title: 'T', description: 'D', path: '/x/' },
  });
  expect(html).toContain('<title>T</title>');
  expect(html).toContain('rel="canonical"');
  expect(html).toContain('https://swisslyit.ch/x/');
  expect(html).toContain('og:image');
  expect(html).toContain('content="de_CH"');
  expect(html).toContain('summary_large_image');
});

test('Seo honours noindex', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Seo, {
    props: { title: 'T', description: 'D', path: '/x/', noindex: true },
  });
  expect(html).toContain('noindex,nofollow');
});

test('JsonLd serialises schema', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(JsonLd, {
    props: { schema: { '@type': 'Organization', name: 'Swissly' } },
  });
  expect(html).toContain('application/ld+json');
  expect(html).toContain('"@type":"Organization"');
});
