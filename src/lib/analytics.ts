/**
 * GA4 with Consent Mode v2.
 *
 * Strategy:
 *   1. The caller (BaseLayout) sets up the gtag stub + consent defaults
 *      via an inline script BEFORE calling initAnalytics().
 *   2. initAnalytics() subscribes to consent decisions via onConsent().
 *   3. The GA script is injected ONLY when consent is 'granted'.
 *   4. IP anonymisation is enabled via anonymize_ip config.
 *
 * The function is a no-op when:
 *   - `id` is empty / undefined
 *   - Running outside a browser (SSR / test without jsdom)
 */

import { onConsent } from './consent';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Ensure window.dataLayer + window.gtag exist (idempotent). */
function ensureGtagStub(): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    // eslint-disable-next-line prefer-rest-params
    window.gtag = function (..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

let _scriptInjected = false;

/** Inject the GA script tag and send the initial config hit. */
function loadGAScript(id: string): void {
  if (_scriptInjected || typeof document === 'undefined') return;
  _scriptInjected = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

/**
 * Initialise GA4 with Consent Mode v2.
 *
 * @param id GA4 Measurement ID, e.g. "G-XXXXXXXXXX".
 *           Defaults to `import.meta.env.PUBLIC_GA_MEASUREMENT_ID`.
 *           Pass `undefined` explicitly in tests where you control the id.
 */
export function initAnalytics(
  id: string | undefined = import.meta.env.PUBLIC_GA_MEASUREMENT_ID,
): void {
  if (!id || typeof window === 'undefined') return;

  _scriptInjected = false; // reset in case module is re-used across HMR

  ensureGtagStub();

  // Consent Mode v2 default — denied for all signals.
  // (Inline script in BaseLayout sets this before GA can fire, but we also
  // set it here so the function is self-contained and testable.)
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });

  // Subscribe to consent decisions.
  // onConsent fires immediately if a choice already exists (e.g. returning visitor).
  onConsent((value) => {
    if (value === 'granted') loadGAScript(id);
  });
}
