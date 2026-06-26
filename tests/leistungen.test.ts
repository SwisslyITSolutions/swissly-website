import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Leistungen from '../src/pages/leistungen/index.astro';
import { services } from '../src/data/services';

const decode = (s: string) =>
  s.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<');

const render = async () => {
  const c = await AstroContainer.create();
  return decode(await c.renderToString(Leistungen));
};

test('lists all seven service titles', async () => {
  const html = await render();
  for (const service of services) {
    expect(html).toContain(service.title);
  }
  expect(services.length).toBe(7);
});

test('shows all three website package prices', async () => {
  const html = await render();
  for (const price of ["1'490", "3'900", "6'400"]) {
    expect(html).toContain(price);
  }
});

test('shows all three care plan monthly prices', async () => {
  const html = await render();
  for (const price of ['59', '149', '289']) {
    expect(html).toContain(price);
  }
});

test('marks the Growth plan as Most Popular', async () => {
  const html = await render();
  expect(html).toContain('Most Popular');
});

test('states the hourly rate of CHF 140 and modules on request', async () => {
  const html = await render();
  expect(html).toContain('140');
  expect(html).toMatch(/auf Anfrage/);
});

test('links each service card to its detail route', async () => {
  const html = await render();
  for (const service of services) {
    expect(html).toContain(`href="/leistungen/${service.slug}/"`);
  }
});

test('emits a BreadcrumbList JSON-LD', async () => {
  const html = await render();
  expect(html).toContain('"BreadcrumbList"');
});
