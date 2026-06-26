import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import SlugPage, { getStaticPaths } from '../src/pages/leistungen/[slug].astro';
import { services } from '../src/data/services';

const decode = (s: string) =>
  s.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<');

test('getStaticPaths produces all seven service routes', async () => {
  const paths = getStaticPaths();
  expect(paths.map((p) => p.params.slug)).toEqual([
    'webseiten',
    'webshops',
    'wartung-care',
    'migrationen',
    'seo-performance',
    'it-support',
    'schulungen',
  ]);
});

for (const service of services) {
  test(`service "${service.slug}" renders title, a section heading and Service JSON-LD`, async () => {
    const c = await AstroContainer.create();
    const html = decode(await c.renderToString(SlugPage, { props: { service } }));

    // Title appears (H1)
    expect(html).toContain(service.title);
    // At least the first content section heading is present
    expect(html).toContain(service.sections[0].h);
    // Intro / eyebrow rendered
    expect(html).toContain(service.intro);
    // JSON-LD Service type
    expect(html).toContain('"@type":"Service"');
    expect(html).toContain('"BreadcrumbList"');
  });
}
