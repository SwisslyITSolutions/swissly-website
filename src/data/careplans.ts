// Monthly care plan data — single source of truth

export interface CarePlan {
  name: string;
  monthly: number; // CHF per month (billed annually)
  features: string[];
  popular?: boolean;
}

export const carePlans: CarePlan[] = [
  {
    name: 'Foundation',
    monthly: 59,
    features: [
      'Schweizer Premium-Hosting',
      'Tägliche Backups',
      'Technik- & Sicherheitsupdates',
      'Uptime-Monitoring',
    ],
  },
  {
    name: 'Growth',
    monthly: 149,
    popular: true,
    features: [
      'Alles aus Foundation',
      '1 Std./Monat Anpassungen',
      'Priorisierter Support (< 24 Std.)',
      'Jährlicher Performance- & SEO-Check',
    ],
  },
  {
    name: 'Scale',
    monthly: 289,
    features: [
      'Alles aus Growth',
      '2,5 Std./Monat Anpassungen',
      'Priorisierter Support (< 12 Std.)',
      'Quartalsweiser Report',
    ],
  },
];

/** Disclaimer shown below the care-plan section */
export const carePlanNote =
  'Jährliche Verrechnung. Kündigung 30 Tage auf Ende der Rechnungsperiode. Sie behalten die volle Kontrolle über Domain & Daten.';
