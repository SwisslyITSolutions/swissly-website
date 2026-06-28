import type { Lang } from './utils';
import { site } from '../data/site';

// German content modules (existing, unchanged)
import { process as processDe } from '../data/process';
import { packages as packagesDe, pricingNote as pricingNoteDe } from '../data/pricing';
import { services as servicesDe } from '../data/services';
import { team as teamDe } from '../data/team';
import { faq as faqDe } from '../data/faq';
import { carePlans as carePlansDe, carePlanNote as carePlanNoteDe } from '../data/careplans';

// English content modules
import { process as processEn } from '../data/en/process';
import { packages as packagesEn, pricingNote as pricingNoteEn } from '../data/en/pricing';
import { services as servicesEn } from '../data/en/services';
import { team as teamEn } from '../data/en/team';
import { faq as faqEn } from '../data/en/faq';
import { carePlans as carePlansEn, carePlanNote as carePlanNoteEn } from '../data/en/careplans';

// Language-dependent site-level strings (German source lives in data/site.ts)
const siteEn = {
  claim: 'Websites that just work.',
  ecs: {
    label: 'Current project',
    name: site.ecs.name, // proper noun, unchanged
    text: 'Car dealership and used cars in Ebikon. A modern, fast website (Astro, bilingual), built by Swissly.',
    url: site.ecs.url,
  },
  values: [
    {
      title: 'Clarity',
      text: 'We explain IT so you understand it. No jargon, no cryptic acronyms. Plain talk, not gibberish.',
    },
    {
      title: 'Reliability',
      text: 'Calm, precise work even under pressure. We keep to deadlines and budgets, stay reachable, and deliver what we promise.',
    },
    {
      title: 'Practicality',
      text: 'No ivory towers, no oversized solutions. We build what actually works in your day-to-day business.',
    },
  ],
};

const content = {
  de: {
    process: processDe,
    packages: packagesDe,
    pricingNote: pricingNoteDe,
    services: servicesDe,
    team: teamDe,
    faq: faqDe,
    carePlans: carePlansDe,
    carePlanNote: carePlanNoteDe,
    claim: site.claim,
    ecs: site.ecs,
    values: site.values,
  },
  en: {
    process: processEn,
    packages: packagesEn,
    pricingNote: pricingNoteEn,
    services: servicesEn,
    team: teamEn,
    faq: faqEn,
    carePlans: carePlansEn,
    carePlanNote: carePlanNoteEn,
    claim: siteEn.claim,
    ecs: siteEn.ecs,
    values: siteEn.values,
  },
} as const;

export function getContent(lang: Lang) {
  return content[lang] ?? content.de;
}
