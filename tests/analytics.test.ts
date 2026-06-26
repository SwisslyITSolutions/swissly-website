// @vitest-environment jsdom
/**
 * GA4 analytics — consent-gating tests.
 *
 * Each test resets modules (via vi.resetModules) so module-level state
 * (_scriptInjected, consent listeners) is fresh on every run.
 */
import { describe, test, expect, beforeEach, vi } from 'vitest';

describe('analytics (consent-gated)', () => {
  beforeEach(() => {
    // Fresh module instances each test — clears _scriptInjected + listeners.
    vi.resetModules();
    localStorage.clear();

    // Remove any GA scripts injected by a previous test.
    document.querySelectorAll('script[src*="googletagmanager"]').forEach((s) => s.remove());

    // Clear gtag globals.
    delete (window as unknown as Record<string, unknown>).gtag;
    delete (window as unknown as Record<string, unknown>).dataLayer;
  });

  test('initAnalytics without consent does NOT inject a GA script', async () => {
    const { initAnalytics } = await import('../src/lib/analytics');

    initAnalytics('G-TEST123');

    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
  });

  test('initAnalytics after consent is granted INJECTS the GA script', async () => {
    const { initAnalytics } = await import('../src/lib/analytics');
    const { setConsent } = await import('../src/lib/consent');

    initAnalytics('G-TEST123');
    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();

    setConsent('granted');
    expect(document.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-TEST123"]')).not.toBeNull();
  });

  test('initAnalytics when consent already granted fires immediately', async () => {
    const { setConsent } = await import('../src/lib/consent');
    setConsent('granted');

    // Re-reset modules so analytics gets a clean _scriptInjected, but consent
    // already persisted in localStorage carries through.
    vi.resetModules();

    const { initAnalytics } = await import('../src/lib/analytics');
    initAnalytics('G-TEST123');

    // onConsent fires synchronously for already-granted choices.
    expect(document.querySelector('script[src*="googletagmanager.com/gtag/js"]')).not.toBeNull();
  });

  test('initAnalytics with no id is a no-op (no gtag, no script)', async () => {
    const { initAnalytics } = await import('../src/lib/analytics');

    initAnalytics(undefined);

    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
    expect((window as unknown as Record<string, unknown>).gtag).toBeUndefined();
  });

  test('consent denied does NOT inject a GA script', async () => {
    const { initAnalytics } = await import('../src/lib/analytics');
    const { setConsent } = await import('../src/lib/consent');

    initAnalytics('G-TEST123');
    setConsent('denied');

    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
  });
});
