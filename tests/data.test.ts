import { expect, test } from 'vitest';
import { packages } from '../src/data/pricing';
import { carePlans } from '../src/data/careplans';
import { services } from '../src/data/services';
import { faq } from '../src/data/faq';
import { site } from '../src/data/site';
import { team } from '../src/data/team';
import { process } from '../src/data/process';

// --- pricing ---
test('pricing exact', () => {
  expect(packages.map((p) => p.name)).toEqual(['Starter', 'Business', 'Commerce']);
  expect(packages.map((p) => p.price)).toEqual(["1'490", "3'900", "6'400"]);
});

test('pricing Business is featured', () => {
  expect(packages.find((p) => p.name === 'Business')?.featured).toBe(true);
});

// --- care plans ---
test('care plans exact', () => {
  expect(carePlans.map((c) => c.monthly)).toEqual([59, 149, 289]);
  expect(carePlans.find((c) => c.name === 'Growth')?.popular).toBe(true);
});

// --- services ---
test('seven services in order', () => {
  expect(services.map((s) => s.slug)).toEqual([
    'webseiten',
    'webshops',
    'wartung-care',
    'migrationen',
    'seo-performance',
    'it-support',
    'schulungen',
  ]);
});

test('every service has non-empty metaTitle and metaDescription', () => {
  for (const s of services) {
    expect(s.metaTitle.length, `metaTitle empty for ${s.slug}`).toBeGreaterThan(0);
    expect(s.metaDescription.length, `metaDescription empty for ${s.slug}`).toBeGreaterThan(0);
  }
});

test('every service has bullets and sections', () => {
  for (const s of services) {
    expect(s.bullets.length, `no bullets for ${s.slug}`).toBeGreaterThan(0);
    expect(s.sections.length, `no sections for ${s.slug}`).toBeGreaterThan(0);
  }
});

// --- faq ---
test('eight faq entries', () => expect(faq.length).toBe(8));

test('faq entries have non-empty q and a', () => {
  for (const entry of faq) {
    expect(entry.q.length).toBeGreaterThan(0);
    expect(entry.a.length).toBeGreaterThan(0);
  }
});

// --- site ---
test('site constants', () => {
  expect(site.claim).toBe('Webseiten, die einfach laufen.');
  expect(site.email).toBe('info@swisslyit.ch');
  expect(site.hourlyRate).toBe(140);
  expect(site.nav.length).toBe(4);
  expect(site.values.length).toBe(3);
});

// --- team ---
test('two team members', () => {
  expect(team.length).toBe(2);
  expect(team.map((m) => m.name)).toEqual(['Taha Afif', 'Georg Ristic']);
});

// --- process ---
test('four process steps', () => {
  expect(process.length).toBe(4);
  expect(process.map((s) => s.index)).toEqual([1, 2, 3, 4]);
});
