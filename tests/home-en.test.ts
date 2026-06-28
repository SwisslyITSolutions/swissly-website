import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import EnIndex from '../src/pages/en/index.astro';
import DeIndex from '../src/pages/index.astro';

const decode = (s: string) =>
  s.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<');

test('English homepage renders English copy and metadata', async () => {
  const c = await AstroContainer.create();
  const html = decode(await c.renderToString(EnIndex));
  expect(html).toContain('Fast, secure websites and personal IT support');
  expect(html).toContain('Websites that just work.');
  expect(html).toContain('<html lang="en">');
  expect(html).toContain('content="en_GB"');
  // CTA + nav are localised
  expect(html).toContain('Book a free intro call');
  // no German leftover from the migrated hero
  expect(html).not.toContain('Sie kümmern sich ums Geschäft');
});

test('German homepage is unchanged (claim + lang)', async () => {
  const c = await AstroContainer.create();
  const html = decode(await c.renderToString(DeIndex));
  expect(html).toContain('Webseiten, die einfach laufen.');
  expect(html).toContain('<html lang="de-CH">');
  expect(html).toContain('Erstgespräch anfragen');
});
