// English (en-GB) translation of service data. Mirrors src/data/services.ts
// Type is imported from the German source (single source of truth for the shape).

import type { Service } from '../services';

export const services: Service[] = [
  {
    slug: 'webseiten',
    title: 'Websites & Redesign',
    eyebrow: 'websites & redesign',
    teaser:
      'Modern, fast websites for SMEs: from a one-pager to a full company site, and ownership stays with you.',
    intro:
      'We build websites that look good and are technically sound: mobile-first, fast-loading and compliant with Swiss data protection (FADP). The code, domain and files belong to you.',
    bullets: [
      'Mobile-first design & a custom visual identity',
      'From one-pager to multi-page company site',
      'Basic SEO & on-page optimisation',
      'Swiss hosting, FADP-compliant base structure',
      'You own the code, domain and files',
    ],
    sections: [
      {
        h: 'The right solution for every business',
        p: 'Your website should present your offering clearly and build trust. We create tailor-made sites with or without a CMS, on a stack that stays maintainable for the long term (Astro, Next.js).',
      },
      {
        h: 'Technically sound and data-protection compliant',
        p: 'We host in Switzerland, set up an FADP-compliant base structure and implement structured data for search engines. All standard, no surcharge.',
      },
      {
        h: 'Your ownership, your control',
        p: 'The code, domain and files belong to you: no lock-in, no hidden dependencies. Would you rather not deal with the tech after launch? With a Care plan we take care of the maintenance.',
      },
    ],
    metaTitle: 'Websites & redesign for SMEs | Swissly IT Ebikon',
    metaDescription:
      'Professional websites for SMEs in Central Switzerland. Mobile-first, fast, FADP-compliant, Swiss hosting. You keep ownership. Request a free initial consultation.',
  },
  {
    slug: 'webshops',
    title: 'Online Shops',
    eyebrow: 'e-commerce',
    teaser:
      'Online shops with a clear backend and a simple ordering process, including Swiss payment methods like TWINT and credit card.',
    intro:
      'We set up an online shop that you maintain yourself after handover. Swiss payment solutions, a clean backend and training are included from the start.',
    bullets: [
      'Swiss payment methods (TWINT, credit card, invoice)',
      'Simple backend for managing your own products',
      'Shipping logic & base setup for approx. 500 products',
      'WooCommerce base, customisable',
      'Training included',
    ],
    sections: [
      {
        h: 'Selling online made simple',
        p: 'We build your online shop on a proven base (WooCommerce) and configure it so you can run it yourself after launch. Only what you actually need.',
      },
      {
        h: 'Swiss payment solutions',
        p: 'TWINT, credit card and invoice via Stripe, Datatrans or Wallee. We integrate the payment providers your customers know and trust.',
      },
      {
        h: 'Training and handover',
        p: 'You get clear training on products, prices and order management, so you are genuinely independent. And if questions come up later, we are here.',
      },
    ],
    metaTitle: 'Online shops for SMEs | Swissly IT, Ebikon Lucerne',
    metaDescription:
      'Online shops with TWINT, credit card & invoice. WooCommerce base, simple backend, training included. Swissly IT in Ebikon. Free, no-obligation enquiry.',
  },
  {
    slug: 'wartung-care',
    title: 'Maintenance & Care plans',
    eyebrow: 'maintenance & care',
    teaser:
      'Worry-free care for your website: updates, backups, monitoring and support on Swiss servers, from CHF 59/mo.',
    intro:
      'Our Care plans look after your website completely: security and platform updates, daily backups, uptime monitoring and small changes. All on Swiss premium servers, cancellable monthly.',
    bullets: [
      'Daily backups & security updates',
      'Uptime monitoring & performance checks',
      'Swiss premium hosting included',
      'Small changes within your monthly allowance',
      '30-day cancellation, no hidden costs',
    ],
    sections: [
      {
        h: 'So you never have to worry about the tech',
        p: 'Plugins go out of date, security gaps appear, backups get forgotten. With a Care plan we handle all of it for you: quietly in the background, without you lifting a finger.',
      },
      {
        h: 'Three plans, one philosophy',
        p: 'Foundation covers basic maintenance. Growth adds a monthly budget for changes and priority support. Scale offers faster response times and quarterly reports for demanding operations. All plans are billed annually and can be cancelled with 30 days notice to the end of the billing period.',
      },
      {
        h: 'Hosting in Switzerland included',
        p: 'Every Care plan includes Swiss premium hosting. Your data never leaves Switzerland. And you keep full control over your domain and data at all times.',
      },
    ],
    metaTitle: 'Website maintenance & Care plans | Swissly IT Ebikon',
    metaDescription:
      'Worry-free care for your website: updates, backups, monitoring & Swiss hosting from CHF 59/mo. Three Care plans, 30-day cancellation. Swissly IT. Request a consultation now.',
  },
  {
    slug: 'migrationen',
    title: 'Migrations',
    eyebrow: 'migrations',
    teaser:
      'A safe move from outdated systems to modern stacks, with no data loss and no drop in rankings.',
    intro:
      'We migrate your existing website from WordPress, Joomla or Typo3 to a modern stack: clean, structured and with 301 redirects for full SEO continuity.',
    bullets: [
      'Move from WordPress, Joomla, Typo3 and more',
      '301 redirects for SEO continuity',
      'A test environment before go-live (no flying blind)',
      'Optional hosting move to Switzerland',
      'No data loss, no drop in rankings',
    ],
    sections: [
      {
        h: 'Modern stack, familiar content',
        p: 'We carefully move your content to a new, high-performance platform (Astro, Next.js or a lean WordPress). You see the result first on a staging environment. Only once you are delighted with it do we go live.',
      },
      {
        h: 'Keeping your SEO with clean redirects',
        p: 'Every old URL gets a 301 redirect. That way you keep your Google ranking and lose no visitors to error pages. For search engines, the switch stays seamless.',
      },
      {
        h: 'Switch hosting if you wish',
        p: 'Want to move to Swiss hosting at the same time? We coordinate the DNS move and ensure a smooth cutover: transparent for you, invisible to your visitors.',
      },
    ],
    metaTitle: 'Website migration | Swissly IT, Ebikon Lucerne',
    metaDescription:
      'Migrate WordPress, Joomla or Typo3 to a modern platform without losing SEO. 301 redirects, staging environment, optional Swiss hosting. Free initial consultation.',
  },
  {
    slug: 'seo-performance',
    title: 'SEO & Performance',
    eyebrow: 'seo & performance',
    teaser:
      'Technical SEO and performance optimisation for better rankings and faster load times. Lighthouse 90+.',
    intro:
      'We improve the technical foundation of your website: load time, mobile optimisation, clean meta tags and structured data, all measurable via Google Search Console. No content marketing, no advertising, just honest technical work.',
    bullets: [
      'Performance audit & Lighthouse 90+',
      'Image, code and caching optimisation',
      'Meta tags & structured data (Schema.org)',
      'Mobile optimisation',
      'Monitoring via Google Search Console',
    ],
    sections: [
      {
        h: 'Technical SEO: what really counts',
        p: 'We focus on the fundamentals: load time, mobile optimisation, a clean page structure and correct meta data. These are exactly the factors search engines assess, and they directly affect your visibility.',
      },
      {
        h: 'What we do not offer, and why',
        p: 'We do not offer content marketing, Google Ads or SEA. Sustainable rankings come from technically clean pages and relevant content, not from paid clicks.',
      },
      {
        h: 'Measurable progress',
        p: 'Every measure is documented and monitored with Google Search Console. You see what we do and what it achieves: transparent, easy to follow, with no jargon.',
      },
    ],
    metaTitle: 'SEO & performance optimisation | Swissly IT Ebikon',
    metaDescription:
      'Technical SEO for SMEs: Lighthouse 90+, meta tags, structured data, monitoring via Search Console. No content marketing, just honest technical work. Swissly IT.',
  },
  {
    slug: 'it-support',
    title: 'IT Support & Infrastructure',
    eyebrow: 'it-support',
    teaser:
      'Personal IT support, remote and on site. Billed in 15-minute increments at CHF 140/hour, with no flat rates.',
    intro:
      'When something is not working, we help quickly and without fuss: remotely or on site in Central Switzerland. Billing in 15-minute increments, no minimum charge, no silly questions.',
    bullets: [
      'Remote and on-site support in Central Switzerland',
      'Billing in 15-minute increments (CHF 140/hour)',
      'Workstation setup (PC/Mac ready to go)',
      'Networks & secure backups',
      'PC and printer problems fixed fast',
    ],
    sections: [
      {
        h: 'Help, whenever you need it',
        p: 'Whether it is a printer problem, a new PC, a slow network or data loss: we sort it quickly and explain what happened along the way. No jargon, no waffle.',
      },
      {
        h: 'Fair billing in 15-minute increments',
        p: 'You only pay for the time we actually need: in 15-minute increments at an hourly rate of CHF 140. No call-out fees, no minimum charge, no subscription required.',
      },
      {
        h: 'Infrastructure with foresight',
        p: 'We do not just set up your workstation, we think ahead with you: secure backup concepts, stable networks and an infrastructure that grows with your business.',
      },
    ],
    metaTitle: 'IT support & infrastructure | Swissly IT, Ebikon',
    metaDescription:
      'Personal IT support in Central Switzerland. Remote & on site, 15-minute billing, CHF 140/hour. PCs, networks, backups, troubleshooting. No silly questions. Swissly IT.',
  },
  {
    slug: 'schulungen',
    title: 'AI & IT Training',
    eyebrow: 'training',
    teaser:
      'Practical AI and IT training for SMEs: easy to understand, data-protection compliant and ready to use in your everyday work.',
    intro:
      'We train your staff in the safe use of AI tools, data protection and digital working. Half-day workshops of up to 4 hours, explained patiently and tailored to your business.',
    bullets: [
      'AI workshops (up to 4 hours) for SME teams',
      'Data-protection-compliant AI use in everyday work',
      'Digital tools explained clearly',
      'At your level, no prior knowledge needed',
      'Up to 4 people per session',
    ],
    sections: [
      {
        h: 'AI without the fear',
        p: 'ChatGPT and other AI tools make everyday work easier, once you know how to use them sensibly and safely. In our workshops we show you exactly that, step by step and with no prior knowledge required.',
      },
      {
        h: 'Data protection is not an afterthought',
        p: 'We explain which data you may entrust to AI tools and which you should not. Data-protection-compliant use is a core part of every workshop, not an appendix that nobody reads.',
      },
      {
        h: 'Clear for everyone',
        p: 'Our training is not made for IT pros. We speak plainly, assume no prior knowledge and take time for your questions. Up to 4 people per session, so nobody gets left behind.',
      },
    ],
    metaTitle: 'AI & IT training for SMEs | Swissly IT Ebikon',
    metaDescription:
      'Practical AI workshops & IT training for SMEs in Central Switzerland. Data-protection compliant, easy to understand, up to 4 people. Swissly IT Ebikon. Book a session now.',
  },
];
