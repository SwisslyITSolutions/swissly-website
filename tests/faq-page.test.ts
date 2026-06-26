import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import FaqPage from '../src/pages/faq.astro';

test('renders 8 faq questions', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(FaqPage);
  expect(html).toContain('Wie läuft ein Webdesign-Projekt');
  expect(html).toContain('versteckte Kosten');
  expect(html).toContain('IT-Notfall');
  expect(html).toContain('Vor-Ort-Support');
  expect(html).toContain('Daten gespeichert');
  expect(html).toContain('bestehende Website');
  expect(html).toContain('kein IT-Profi');
  expect(html).toContain('Kündigungsfrist');
});

test('includes FAQPage JSON-LD schema', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(FaqPage);
  expect(html).toContain('"@type":"FAQPage"');
  expect(html).toContain('Wie läuft ein Webdesign-Projekt');
});
