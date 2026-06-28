import { describe, it, expect } from 'vitest';
import { getLang, localizedPath } from '../src/i18n/utils';

describe('i18n utils', () => {
  it('falls back to de when no locale', () => {
    expect(getLang({ currentLocale: undefined })).toBe('de');
  });

  it('returns en when currentLocale is en', () => {
    expect(getLang({ currentLocale: 'en' })).toBe('en');
  });

  it('treats any non-en locale as de', () => {
    expect(getLang({ currentLocale: 'de' })).toBe('de');
    expect(getLang({ currentLocale: 'fr' })).toBe('de');
  });

  it('maps a DE path to the EN counterpart', () => {
    expect(localizedPath('en', '/leistungen/')).toBe('/en/leistungen/');
    expect(localizedPath('en', '/')).toBe('/en/');
  });

  it('maps an EN path back to DE', () => {
    expect(localizedPath('de', '/en/leistungen/')).toBe('/leistungen/');
    expect(localizedPath('de', '/en/')).toBe('/');
  });

  it('is idempotent when target language already matches', () => {
    expect(localizedPath('en', '/en/faq/')).toBe('/en/faq/');
    expect(localizedPath('de', '/faq/')).toBe('/faq/');
  });
});
