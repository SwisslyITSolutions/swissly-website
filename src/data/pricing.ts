// Website package pricing — single source of truth

export interface Package {
  name: string;
  price: string; // CHF, formatted with apostrophe as thousands separator
  tagline: string;
  features: string[];
  featured?: boolean;
}

export const packages: Package[] = [
  {
    name: 'Starter',
    price: "1'490",
    tagline: 'One-Pager',
    features: [
      'Kompakte Single-Page',
      'Responsives Mobile-First-Design',
      'Kontaktformular + Standortkarte',
      'Basis-SEO',
      'Go-Live auf Schweizer Server',
    ],
  },
  {
    name: 'Business',
    price: "3'900",
    tagline: 'Für etablierte KMU',
    featured: true,
    features: [
      'Bis zu 6 Unterseiten',
      'Individuelles Designsystem',
      'SEO + Performance',
      'CMS zur Eigenpflege',
      'Einschulung',
      'Mehrsprachig erweiterbar',
    ],
  },
  {
    name: 'Commerce',
    price: "6'400",
    tagline: 'Online-Shop',
    features: [
      'Business-Umfang inklusive',
      'WooCommerce-Shop',
      'Schweizer Payment (TWINT/Kreditkarte)',
      'Produkt-Grundsetup (10 Produkte)',
      'Basis-Schulung',
    ],
  },
];

/** Disclaimer shown below the pricing section */
export const pricingNote =
  'Alle Preise in CHF, netto. Swissly ist aktuell nicht MWST-pflichtig. Einzelmodule auf Anfrage.';
