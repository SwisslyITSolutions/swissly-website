import { describe, it, expect } from 'vitest';
import { t, ui } from '../src/i18n/ui';

describe('t()', () => {
  it('returns DE + EN strings for a known key', () => {
    expect(t('de', 'cta.label')).toBe('Erstgespräch anfragen');
    expect(t('en', 'cta.label')).toBe('Book a free intro call');
  });

  it('falls back to the key when missing', () => {
    expect(t('en', 'nonexistent.key')).toBe('nonexistent.key');
  });

  it('has matching key sets for de and en', () => {
    const deKeys = Object.keys(ui.de).sort();
    const enKeys = Object.keys(ui.en).sort();
    expect(enKeys).toEqual(deKeys);
  });
});
