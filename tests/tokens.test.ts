import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const css = readFileSync('src/styles/global.css', 'utf8');

test('brand color tokens present', () => {
  for (const v of ['#1A2D45', '#B89968', '#C9A96A', '#FAFAF7']) {
    expect(css).toContain(v);
  }
});

test('font-family token names referenced in global.css', () => {
  expect(css).toContain('--font-display');
  expect(css).toContain('--font-sans');
  expect(css).toContain('--font-mono');
});
