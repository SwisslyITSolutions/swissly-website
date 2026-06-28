import type { CarePlan } from '../careplans';

export const carePlans: CarePlan[] = [
  {
    name: 'Foundation',
    monthly: 59,
    features: [
      'Swiss premium hosting',
      'Daily backups',
      'Technical & security updates',
      'Uptime monitoring',
    ],
  },
  {
    name: 'Growth',
    monthly: 149,
    popular: true,
    features: [
      'Everything in Foundation',
      '1 hr/mo of changes',
      'Priority support (< 24h)',
      'Annual performance & SEO check',
    ],
  },
  {
    name: 'Scale',
    monthly: 289,
    features: [
      'Everything in Growth',
      '2.5 hrs/mo of changes',
      'Priority support (< 12h)',
      'Quarterly report',
    ],
  },
];

export const carePlanNote =
  'Billed annually. Cancel with 30 days notice to the end of the billing period. You keep full control over your domain & data.';
