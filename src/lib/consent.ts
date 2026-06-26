// Cookie / analytics consent store — single source of truth for the user's choice.
//
// Responsibilities (this module ONLY stores the choice + notifies listeners):
//   - getConsent(): read persisted choice ('granted' | 'denied' | null)
//   - setConsent(v): persist a choice and fire all onConsent() callbacks
//   - onConsent(cb): subscribe to consent grants/denials (fires immediately if
//     a choice already exists, so late subscribers — e.g. analytics — catch up)
//
// It also installs `window.swisslyConsent = { open, accept, reject, state }` so
// the footer "Cookie-Einstellungen" button and the cookie banner can drive it.
// GA4 / gtag loading is intentionally NOT done here — that is wired in a later
// chunk via an onConsent('granted') callback.

export type ConsentValue = 'granted' | 'denied';
export type ConsentState = ConsentValue | null;

const STORAGE_KEY = 'swissly-consent';
/** Custom event the banner listens for to re-open after a choice was made. */
export const OPEN_EVENT = 'swissly:open-consent';

type ConsentListener = (value: ConsentValue) => void;
const listeners = new Set<ConsentListener>();

function hasStorage(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
}

/** Current persisted consent choice, or `null` when the user has not decided. */
export function getConsent(): ConsentState {
  if (!hasStorage()) return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
  return raw === 'granted' || raw === 'denied' ? raw : null;
}

/** Persist a consent choice and notify every onConsent() subscriber. */
export function setConsent(value: ConsentValue): void {
  if (hasStorage()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage may be unavailable (private mode / quota) — fail soft */
    }
  }
  for (const cb of listeners) {
    try {
      cb(value);
    } catch (err) {
      console.error('[consent] listener error', err);
    }
  }
}

/**
 * Subscribe to consent decisions. If a choice already exists it fires the
 * callback immediately (so analytics added after page load still initialises).
 * Returns an unsubscribe function.
 */
export function onConsent(cb: ConsentListener): () => void {
  listeners.add(cb);
  const current = getConsent();
  if (current) {
    try {
      cb(current);
    } catch (err) {
      console.error('[consent] listener error', err);
    }
  }
  return () => {
    listeners.delete(cb);
  };
}

/** Re-open the consent UI (dispatches an event the banner reacts to). */
export function openConsent(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
  }
}

declare global {
  interface Window {
    swisslyConsent?: {
      open: () => void;
      accept: () => void;
      reject: () => void;
      readonly state: ConsentState;
    };
  }
}

// Install the global handle (used by the footer + banner). Safe to run multiple
// times; only meaningful in the browser.
if (typeof window !== 'undefined') {
  window.swisslyConsent = {
    open: openConsent,
    accept: () => setConsent('granted'),
    reject: () => setConsent('denied'),
    get state(): ConsentState {
      return getConsent();
    },
  };
}
