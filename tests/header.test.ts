import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Header from '../src/components/layout/Header.astro';

test('Header renders nav labels, CTA and accessible nav landmark', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Header);

  for (const label of ['Leistungen', 'Über uns', 'FAQ', 'Kontakt']) {
    expect(html).toContain(label);
  }
  expect(html).toContain('Erstgespräch anfragen');
  expect(html).toContain('href="/erstgespraech/"');
  expect(html).toContain('aria-label="Hauptnavigation"');
});

test('Header mobile menu toggle exposes aria-expanded', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Header);
  expect(html).toContain('aria-expanded="false"');
  expect(html).toContain('aria-controls="mobile-menu"');
});
