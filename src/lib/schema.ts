// Reusable JSON-LD builders shared by DE + EN pages.
import { site } from '../data/site';
import type { Lang } from '../i18n/utils';

const origin = 'https://swisslyit.ch';
const orgId = `${origin}/#organization`;

/** Authority links for the business entity (Organization/ProfessionalService sameAs). */
export const sameAs: string[] = [
  site.social.github,
  site.social.instagram,
  site.social.googleBusiness,
].filter((u): u is string => Boolean(u));

/** WebSite entity — anchors the site as a single entity for search engines. */
export function websiteSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: lang === 'en' ? `${origin}/en/` : `${origin}/`,
    name: site.name,
    description:
      lang === 'en'
        ? 'Fast, secure websites and personal IT support for SMEs in Central Switzerland.'
        : 'Schnelle, sichere Websites und persönlicher IT-Support für KMU in der Zentralschweiz.',
    publisher: { '@id': orgId },
    inLanguage: lang === 'en' ? 'en' : 'de-CH',
  };
}

interface Member {
  name: string;
  role: string;
  bio: string;
}

/** Person entities for the team — strengthens E-E-A-T (who is behind the company). */
export function personSchemas(team: Member[]) {
  return team.map((m) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: m.name,
    jobTitle: m.role,
    worksFor: { '@type': 'Organization', '@id': orgId, name: site.legalName },
    description: m.bio,
  }));
}
