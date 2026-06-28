import type { Lang } from './utils';

// Central dictionary for UI strings that live inside components (not in data/).
// Keys are dot-paths. Every DE key MUST have an EN counterpart (enforced by test).
// Extended task-by-task as components are localised.
export const ui = {
  de: {
    // header / nav
    'skip.toContent': 'Zum Inhalt springen',
    'lang.aria': 'Sprache wählen',
    'logo.ariaHome': 'Swissly IT, Startseite',
    'nav.leistungen': 'Leistungen',
    'nav.ueberUns': 'Über uns',
    'nav.faq': 'FAQ',
    'nav.kontakt': 'Kontakt',
    'nav.aria.main': 'Hauptnavigation',
    'nav.aria.mobile': 'Mobile Navigation',
    'cta.label': 'Erstgespräch anfragen',
    'menu.open': 'Menü öffnen',
    'menu.close': 'Menü schliessen',
    // footer
    'footer.navHeading': 'Navigation',
    'footer.contactHeading': 'Kontakt',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.cookieSettings': 'Cookie-Einstellungen',
  },
  en: {
    // header / nav
    'skip.toContent': 'Skip to content',
    'lang.aria': 'Select language',
    'logo.ariaHome': 'Swissly IT, home',
    'nav.leistungen': 'Services',
    'nav.ueberUns': 'About',
    'nav.faq': 'FAQ',
    'nav.kontakt': 'Contact',
    'nav.aria.main': 'Main navigation',
    'nav.aria.mobile': 'Mobile navigation',
    'cta.label': 'Book a free intro call',
    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    // footer
    'footer.navHeading': 'Navigation',
    'footer.contactHeading': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.cookieSettings': 'Cookie settings',
  },
} satisfies Record<Lang, Record<string, string>>;

export function t(lang: Lang, key: string): string {
  return ui[lang]?.[key] ?? ui.de[key as keyof typeof ui.de] ?? key;
}
