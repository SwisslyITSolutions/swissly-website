import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Button from '../src/components/ui/Button.astro';
import PricingCard from '../src/components/ui/PricingCard.astro';
import CarePlanCard from '../src/components/ui/CarePlanCard.astro';
import ServiceCard from '../src/components/ui/ServiceCard.astro';
import Accordion from '../src/components/ui/Accordion.astro';
import FormField from '../src/components/ui/FormField.astro';
import Eyebrow from '../src/components/ui/Eyebrow.astro';

// Astro HTML-escapes text content (apostrophes -> &#39; etc); decode so we
// assert on the price/label as the user actually sees it.
const decode = (s: string) =>
  s.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<');

test('Button primary with href renders an anchor with label', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Button, {
    props: { href: '/erstgespraech/', label: 'Anfragen', variant: 'primary' },
  });
  expect(html).toContain('<a');
  expect(html).toContain('href="/erstgespraech/"');
  expect(html).toContain('Anfragen');
});

test('Button without href renders a button element', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Button, {
    props: { label: 'Senden', type: 'submit' },
  });
  expect(html).toContain('<button');
  expect(html).toContain('type="submit"');
});

test('PricingCard shows name, price and all features', async () => {
  const c = await AstroContainer.create();
  const html = decode(await c.renderToString(PricingCard, {
    props: { name: 'Starter', price: "1'490", features: ['Feature A', 'Feature B'] },
  }));
  expect(html).toContain('Starter');
  expect(html).toContain("1'490");
  expect(html).toContain('Feature A');
  expect(html).toContain('Feature B');
  expect(html).toContain('CHF');
});

test('CarePlanCard popular shows Most Popular badge and price', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(CarePlanCard, {
    props: { name: 'Growth', monthly: 149, popular: true, features: ['x'] },
  });
  expect(html).toContain('Most Popular');
  expect(html).toContain('149');
  expect(html).toContain('/Mt.');
});

test('ServiceCard links to its detail page', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(ServiceCard, {
    props: { title: 'Webseiten', teaser: 'Schnell', href: '/leistungen/webseiten/' },
  });
  expect(html).toContain('href="/leistungen/webseiten/"');
  expect(html).toContain('Webseiten');
});

test('Accordion renders all questions with aria wiring', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Accordion, {
    props: { items: [{ q: 'Frage eins?', a: 'Antwort eins.' }, { q: 'Frage zwei?', a: 'Antwort zwei.' }] },
  });
  expect(html).toContain('Frage eins?');
  expect(html).toContain('Frage zwei?');
  expect(html).toContain('aria-expanded="false"');
  expect(html).toContain('aria-controls');
});

test('FormField renders a labelled required input', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(FormField, {
    props: { name: 'email', label: 'E-Mail', type: 'email', required: true },
  });
  expect(html).toContain('for="field-email"');
  expect(html).toContain('name="email"');
  expect(html).toContain('type="email"');
  expect(html).toContain('required');
});

test('Eyebrow prefixes slot content with //', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Eyebrow, { slots: { default: 'was wir tun' } });
  expect(html).toContain('//');
  expect(html).toContain('was wir tun');
});
