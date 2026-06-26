import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';
import { expect, test, describe } from 'vitest';

const DIST = 'dist';

function walkHtml(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkHtml(full, found);
    } else if (entry === 'index.html') {
      found.push(full);
    }
  }
  return found;
}

const distExists = existsSync(DIST);

describe.skipIf(!distExists)('SEO audit — dist HTML files', () => {
  const pages = distExists ? walkHtml(DIST) : [];

  describe('every page: title, description, canonical', () => {
    for (const page of pages) {
      const label = page.split(sep).slice(1).join('/') || 'index.html';
      const html = existsSync(page) ? readFileSync(page, 'utf-8') : '';

      test(`${label}: exactly one <title>`, () => {
        const matches = html.match(/<title[^>]*>/g);
        expect(matches, 'must have at least one <title>').not.toBeNull();
        expect(matches!.length, 'must have exactly one <title>').toBe(1);
      });

      test(`${label}: meta description present`, () => {
        expect(html).toMatch(/meta name="description"/);
      });

      test(`${label}: canonical link present`, () => {
        expect(html).toMatch(/rel="canonical"/);
      });
    }
  });

  describe('home + service pages: JSON-LD present', () => {
    const jsonLdPages = pages.filter(p => {
      const normalized = p.replace(/\\/g, '/');
      return (
        normalized === 'dist/index.html' ||
        normalized.startsWith('dist/leistungen/')
      );
    });

    for (const page of jsonLdPages) {
      const label = page.split(sep).slice(1).join('/') || 'index.html';
      const html = existsSync(page) ? readFileSync(page, 'utf-8') : '';

      test(`${label}: application/ld+json present`, () => {
        expect(html).toContain('application/ld+json');
      });
    }
  });
});
