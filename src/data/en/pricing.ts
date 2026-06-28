import type { Package } from '../pricing';

export const packages: Package[] = [
  {
    name: 'Starter',
    price: "1'490",
    tagline: 'One-pager',
    features: [
      'Compact single page',
      'Responsive, mobile-first design',
      'Contact form + location map',
      'Basic SEO',
      'Go-live on a Swiss server',
    ],
  },
  {
    name: 'Business',
    price: "3'900",
    tagline: 'For established SMEs',
    featured: true,
    features: [
      'Up to 6 sub-pages',
      'Custom design system',
      'SEO + performance',
      'CMS for self-editing',
      'Onboarding',
      'Ready for more languages',
    ],
  },
  {
    name: 'Commerce',
    price: "6'400",
    tagline: 'Online shop',
    features: [
      'Everything in Business',
      'WooCommerce shop',
      'Swiss payment (TWINT/credit card)',
      'Product base setup (10 products)',
      'Basic training',
    ],
  },
];

export const pricingNote =
  'All prices in CHF, net. Swissly is currently not VAT-registered. Individual modules on request.';
