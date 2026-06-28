import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import LanguageSwitcher from '../src/components/layout/LanguageSwitcher.astro';

test('switcher links to both languages for a sub-page (DE current)', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(LanguageSwitcher, {
    props: { lang: 'de', path: '/leistungen/' },
  });
  expect(html).toContain('href="/leistungen/"');
  expect(html).toContain('href="/en/leistungen/"');
  expect(html).toContain('aria-current="true"');
});

test('switcher maps an EN path back to DE (EN current)', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(LanguageSwitcher, {
    props: { lang: 'en', path: '/en/faq/' },
  });
  expect(html).toContain('href="/faq/"');
  expect(html).toContain('href="/en/faq/"');
  expect(html).toContain('aria-current="true"');
});
