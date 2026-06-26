// Single source of truth — site-wide constants

export interface NavItem {
  label: string;
  href: string;
}

export interface Address {
  street: string;
  zip: string;
  city: string;
  region: string;
  country: string;
}

export interface Social {
  github: string;
  linkedin?: string;
}

export interface EcsTeaser {
  label: string;
  name: string;
  text: string;
  url: string;
}

export interface Value {
  title: string;
  text: string;
}

export const site = {
  name: 'Swissly IT Solutions',
  legalName: 'Swissly IT Solutions KLG',
  claim: 'Webseiten, die einfach laufen.',
  tagline: 'Digital Innovation & Trust',
  email: 'info@swisslyit.ch',
  address: {
    street: 'Pilatusweg 23',
    zip: '6030',
    city: 'Ebikon',
    region: 'Luzern',
    country: 'CH',
  } satisfies Address,
  hours: 'Mo–Fr 09:00–17:00 Uhr',
  areaServed: 'Zentralschweiz',
  hourlyRate: 140,
  commercialRegister: 'CHE-288.328.570',
  vat: 'Aktuell nicht MWST-pflichtig',
  statusBar: 'Available · Hosted in Switzerland 🇨🇭',
  social: {
    github: 'https://github.com/SwisslyITSolutions',
  } satisfies Social,
  nav: [
    { label: 'Leistungen', href: '/leistungen/' },
    { label: 'Über uns', href: '/ueber-uns/' },
    { label: 'FAQ', href: '/faq/' },
    { label: 'Kontakt', href: '/kontakt/' },
  ] satisfies NavItem[],
  ctaLabel: 'Erstgespräch anfragen',
  ctaHref: '/erstgespraech/',
  ecs: {
    label: 'Aktuelles Projekt',
    name: 'ECS – Errante Car Solutions',
    text: 'Autohandel & Occasionen in Ebikon — eine moderne, schnelle Website (Astro, zweisprachig), umgesetzt von Swissly.',
    url: 'https://ecs-luzern.ch',
  } satisfies EcsTeaser,
  values: [
    {
      title: 'Verständlichkeit',
      text: 'Wir erklären IT so, dass Sie sie verstehen — ohne Fachjargon, ohne Abkürzungen, die niemand kennt. Klartext statt Kauderwelsch.',
    },
    {
      title: 'Verlässlichkeit',
      text: 'Ruhige, präzise Arbeit auch unter Druck. Wir halten Termine und Budgets ein, sind erreichbar und liefern, was wir versprechen.',
    },
    {
      title: 'Praxisnähe',
      text: 'Keine Theoriegebäude, keine überdimensionierten Lösungen. Wir bauen das, was in Ihrem echten Geschäftsalltag tatsächlich funktioniert.',
    },
  ] satisfies Value[],
} as const;
