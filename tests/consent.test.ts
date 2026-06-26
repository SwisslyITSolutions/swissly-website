// @vitest-environment jsdom
import { expect, test, beforeEach } from 'vitest';
import { getConsent, setConsent, onConsent } from '../src/lib/consent';

beforeEach(() => {
  localStorage.clear();
});

test('defaults to null then persists the choice', () => {
  expect(getConsent()).toBe(null);
  setConsent('granted');
  expect(getConsent()).toBe('granted');
  setConsent('denied');
  expect(getConsent()).toBe('denied');
});

test('onConsent fires when a choice is made', () => {
  const seen: string[] = [];
  onConsent((v) => seen.push(v));
  setConsent('granted');
  expect(seen).toEqual(['granted']);
});

test('onConsent fires immediately when a choice already exists', () => {
  setConsent('granted');
  const seen: string[] = [];
  onConsent((v) => seen.push(v));
  expect(seen).toEqual(['granted']);
});

test('window.swisslyConsent is installed and reflects state', () => {
  expect(window.swisslyConsent).toBeDefined();
  window.swisslyConsent!.accept();
  expect(window.swisslyConsent!.state).toBe('granted');
  window.swisslyConsent!.reject();
  expect(window.swisslyConsent!.state).toBe('denied');
});
