// Language helpers for the bilingual site (DE default at /, EN at /en/).

export type Lang = 'de' | 'en';

/** Resolve the active language from Astro's currentLocale; anything but 'en' is German. */
export function getLang(astro: { currentLocale?: string }): Lang {
  return astro.currentLocale === 'en' ? 'en' : 'de';
}

/**
 * Map a pathname to its counterpart in `lang`.
 * Accepts either-language input and is idempotent.
 *   localizedPath('en', '/leistungen/') -> '/en/leistungen/'
 *   localizedPath('de', '/en/leistungen/') -> '/leistungen/'
 */
export function localizedPath(lang: Lang, path: string): string {
  const bare = path.replace(/^\/en(?=\/|$)/, '') || '/';
  if (lang === 'en') return bare === '/' ? '/en/' : `/en${bare}`;
  return bare;
}
