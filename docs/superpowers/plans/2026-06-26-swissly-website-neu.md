# Swissly Website (Neu) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a brand-new, statically generated, top-modern Swissly IT marketing website (Design direction A "Swiss Digital Engineering, elevated") replacing the old WordPress site, with consolidated content, technical SEO, GA4 + cookie consent, and a Notion-backed contact form, deployable to Hostpoint (Switzerland).

**Architecture:** Astro 6 static output with Tailwind 4 and TypeScript (strict). Content lives in typed data modules (`src/data/*.ts`); pages/components render from that single source. Interactivity is isolated into small client islands (cookie consent, mobile menu, FAQ accordion, Leaflet map, form submit, scroll reveal). A PHP endpoint on Hostpoint receives the form and writes to a Notion Leads DB + sends mail.

**Tech Stack:** Astro 6, Tailwind CSS 4 (`@tailwindcss/vite`), TypeScript (strict), `@astrojs/sitemap`, Vitest (unit/data/SEO tests via Astro Container API), Playwright + axe-core (a11y/E2E verification), Leaflet (vendored), GA4 (gtag, Consent Mode v2), PHP (form handler).

## Global Constraints

- Node `>= 22.12.0`. Astro `^6`. Tailwind `^4`. TypeScript `strict: true`.
- Output: `static` (no SSR). Site must build with zero runtime backend (form handler is a separate PHP file deployed to Hostpoint).
- Language `de-CH`; Swiss orthography ("ss" not "ß", "Sie" form). i18n-ready structure, but ship German only.
- Brand color tokens (verbatim): navy `#1A2D45` / `#14253A` / `#0C1828`; off-white `#FAFAF7`; gold `#B89968`, gold-bright (on dark) `#C9A96A`; body `#4A5568`; line `#E8EAED`.
- Fonts (self-hosted woff2, Open Source): Geist (headlines), Inter (body), JetBrains Mono (mono/accent). No external font CDN calls.
- Claim: "Webseiten, die einfach laufen." · Tagline: "Digital Innovation & Trust."
- Positioning order: Websites → Care → IT → Schulungen.
- NAP: Swissly IT Solutions KLG, Pilatusweg 23, 6030 Ebikon; info@swisslyit.ch; **no phone**; map = OpenStreetMap/Leaflet (never Google Maps).
- Prices (CHF, net/tax-exempt): Packages Starter 1'490 / Business 3'900 / Commerce 6'400; Care Foundation 59/mo / Growth 149/mo (Most Popular) / Scale 289/mo; hourly 140.
- Package names canonical = Starter / Business / Commerce (Live labels "Corporate"/"E-Commerce" unified).
- GA4 loads ONLY after explicit consent (Consent Mode v2 default = denied). Consent revocable via footer link.
- Secrets never committed: `PUBLIC_GA_MEASUREMENT_ID`, `NOTION_TOKEN`, `NOTION_LEADS_DB_ID`, mail target. `.env.example` documents them.
- Keep live URL slugs for SEO continuity: `/leistungen/`, `/ueber-uns/`, `/faq/`, `/kontakt/`, `/erstgespraech/`, `/impressum/`, `/datenschutzerklaerung/`, `/agb/`.
- DRY, YAGNI, TDD, frequent commits.

---

## File Structure (decomposition)

```
public/
  fonts/                      # geist/inter/jetbrains woff2 + subset
  images/logo/                # logo-mark.svg, logo-banner.svg, og-default.png
  vendor/leaflet/             # leaflet.css/js + marker images
  robots.txt
  contact-handler.php         # Hostpoint form endpoint (Notion + mail)
  .htaccess                   # https, clean urls, caching, security, 301s
src/
  data/                       # SINGLE SOURCE OF TRUTH (content)
    site.ts  services.ts  pricing.ts  careplans.ts  faq.ts  team.ts  process.ts  legal.ts
  lib/
    consent.ts  analytics.ts  scroll-reveal.ts
  components/
    layout/  Header.astro  Footer.astro  MobileMenu.astro  StatusBar.astro
    seo/     Seo.astro  JsonLd.astro
    ui/      Button.astro  Eyebrow.astro  Badge.astro  Section.astro
             ServiceCard.astro  PricingCard.astro  CarePlanCard.astro
             ProcessStep.astro  Accordion.astro  FormField.astro  Map.astro
             CookieBanner.astro
    sections/ Hero.astro  WasWirTun.astro  WieWirArbeiten.astro
              HostingSchweiz.astro  PreisTeaser.astro  EcsTeaser.astro  CtaBlock.astro
  layouts/  BaseLayout.astro  ServiceLayout.astro
  pages/    index.astro  leistungen/index.astro  leistungen/[slug].astro
            ueber-uns.astro  faq.astro  kontakt/index.astro  kontakt/danke.astro
            erstgespraech.astro  impressum.astro  datenschutzerklaerung.astro
            agb.astro  404.astro
  styles/   global.css        # tokens + tailwind layers
tests/      *.test.ts (vitest)   e2e/*.spec.ts (playwright)
astro.config.mjs  tsconfig.json  package.json  vitest.config.ts  .env.example
```

---

## PHASE 0 — Project setup & tooling

### Task 1: Scaffold Astro + Tailwind + TS project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/global.css`, `src/pages/index.astro`, `.env.example`, `src/env.d.ts`

**Interfaces:**
- Produces: working `npm run dev` / `npm run build`; Tailwind 4 active; `@astrojs/sitemap` configured with `site`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "swissly-website-neu",
  "type": "module",
  "version": "1.0.0",
  "engines": { "node": ">=22.12.0" },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test"
  },
  "dependencies": {
    "astro": "^6.1.10",
    "@astrojs/sitemap": "^3.7.2",
    "@tailwindcss/vite": "^4.2.4",
    "tailwindcss": "^4.2.4"
  },
  "devDependencies": {
    "vitest": "^2.1.0",
    "@playwright/test": "^1.48.0",
    "axe-core": "^4.10.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://swisslyit.ch',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Create `src/styles/global.css`** (tokens placeholder, expanded in Task 3)

```css
@import "tailwindcss";
:root { --navy-700:#1A2D45; --gold:#B89968; }
```

- [ ] **Step 5: Create `src/pages/index.astro` smoke page**

```astro
---
---
<html lang="de-CH"><head><title>Swissly</title></head>
<body><h1>Swissly</h1></body></html>
```

- [ ] **Step 6: Create `.env.example`**

```
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NOTION_TOKEN=secret_xxx
NOTION_LEADS_DB_ID=xxxxxxxxxxxx
CONTACT_MAIL_TO=info@swisslyit.ch
```

- [ ] **Step 7: Install & build**

Run: `npm install && npm run build`
Expected: build succeeds, `dist/index.html` exists.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "chore: scaffold Astro 6 + Tailwind 4 + TS project"
```

### Task 2: Test harness (Vitest + Astro Container API)

**Files:**
- Create: `vitest.config.ts`, `tests/smoke.test.ts`

**Interfaces:**
- Produces: `npm test` runs; helper pattern to render `.astro` components via `experimental_AstroContainer`.

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { getViteConfig } from 'astro/config';
export default getViteConfig({ test: { environment: 'node', include: ['tests/**/*.test.ts'] } });
```

- [ ] **Step 2: Write failing smoke test `tests/smoke.test.ts`**

```ts
import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Index from '../src/pages/index.astro';

test('home renders brand name', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Index);
  expect(html).toContain('Swissly');
});
```

- [ ] **Step 3: Run to verify pass**

Run: `npm test`
Expected: PASS (1 test).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "test: add vitest + astro container harness"
```

---

## PHASE 1 — Design system & layout foundation

### Task 3: Design tokens, Tailwind theme & self-hosted fonts

**Files:**
- Modify: `src/styles/global.css`
- Create: `public/fonts/` (Geist, Inter, JetBrains Mono woff2), `tests/tokens.test.ts`

**Interfaces:**
- Produces: CSS custom properties + Tailwind `@theme` tokens: colors `navy-900/800/700`, `offwhite`, `gold`, `gold-bright`, `ink`, `muted`, `line`; font families `font-display` (Geist), `font-sans` (Inter), `font-mono` (JetBrains). Utility base styles (dark-first body, container, dot-grid, focus ring).

- [ ] **Step 1: Add fonts** — download Geist (OFL), Inter (OFL), JetBrains Mono (OFL) woff2 (latin subset) into `public/fonts/`. Record source URLs in `public/fonts/README.md`.

- [ ] **Step 2: Write `src/styles/global.css`** with `@font-face` (font-display:swap), `@theme` mapping, base layer:

```css
@import "tailwindcss";

@font-face{font-family:"Geist";src:url("/fonts/geist-700.woff2") format("woff2");font-weight:700;font-display:swap}
@font-face{font-family:"Geist";src:url("/fonts/geist-800.woff2") format("woff2");font-weight:800;font-display:swap}
@font-face{font-family:"Inter";src:url("/fonts/inter-variable.woff2") format("woff2");font-weight:400 600;font-display:swap}
@font-face{font-family:"JetBrains Mono";src:url("/fonts/jetbrains-mono-variable.woff2") format("woff2");font-weight:400 700;font-display:swap}

@theme {
  --color-navy-900:#0C1828; --color-navy-800:#14253A; --color-navy-700:#1A2D45;
  --color-offwhite:#FAFAF7; --color-paper:#FFFFFF;
  --color-gold:#B89968; --color-gold-bright:#C9A96A;
  --color-ink:#1A2D45; --color-muted:#4A5568; --color-line:#E8EAED;
  --font-display:"Geist",ui-sans-serif,system-ui,sans-serif;
  --font-sans:"Inter",ui-sans-serif,system-ui,sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,monospace;
}

@layer base {
  html{scroll-behavior:smooth}
  @media (prefers-reduced-motion:reduce){html{scroll-behavior:auto} *{animation-duration:.01ms!important;transition-duration:.01ms!important}}
  body{background:var(--color-navy-900);color:#E6EDF5;font-family:var(--font-sans);-webkit-font-smoothing:antialiased}
  :focus-visible{outline:2px solid var(--color-gold-bright);outline-offset:2px}
}
@utility container-x { margin-inline:auto; max-width:80rem; padding-inline:1.25rem }
@utility dot-grid { background-image:radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px); background-size:22px 22px }
```

- [ ] **Step 3: Write failing test `tests/tokens.test.ts`**

```ts
import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';
const css = readFileSync('src/styles/global.css','utf8');
test('brand tokens present', () => {
  for (const v of ['#1A2D45','#B89968','#C9A96A','#FAFAF7']) expect(css).toContain(v);
  expect(css).toContain('font-display:swap');
});
```

- [ ] **Step 4: Run test** — Run: `npm test tests/tokens.test.ts` — Expected: PASS.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat(design): tokens, tailwind theme, self-hosted fonts"`

### Task 4: BaseLayout + SEO + JSON-LD components

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/seo/Seo.astro`, `src/components/seo/JsonLd.astro`, `tests/seo.test.ts`

**Interfaces:**
- `Seo.astro` props: `{ title:string; description:string; path:string; ogImage?:string; noindex?:boolean }` → emits `<title>`, meta description, canonical (`site`+path), OG + Twitter tags, lang.
- `JsonLd.astro` props: `{ schema: object }` → `<script type="application/ld+json">`.
- `BaseLayout.astro` props: `{ title; description; path; ogImage?; jsonLd?: object|object[] }`; slots default; includes Header/Footer/global.css; injects Consent init (Task 24).

- [ ] **Step 1: Write `src/components/seo/Seo.astro`**

```astro
---
const { title, description, path, ogImage = '/images/logo/og-default.png', noindex = false } = Astro.props;
const canonical = new URL(path, Astro.site).href;
const ogUrl = new URL(ogImage, Astro.site).href;
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
{noindex && <meta name="robots" content="noindex,nofollow" />}
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={ogUrl} />
<meta property="og:locale" content="de_CH" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogUrl} />
```

- [ ] **Step 2: Write `src/components/seo/JsonLd.astro`**

```astro
---
const { schema } = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

- [ ] **Step 3: Write `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import Seo from '../components/seo/Seo.astro';
import JsonLd from '../components/seo/JsonLd.astro';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import CookieBanner from '../components/ui/CookieBanner.astro';
const { title, description, path, ogImage, jsonLd } = Astro.props;
const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
---
<!doctype html>
<html lang="de-CH">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="preload" as="font" type="font/woff2" href="/fonts/geist-800.woff2" crossorigin />
    <Seo title={title} description={description} path={path} ogImage={ogImage} />
    {blocks.map((s) => <JsonLd schema={s} />)}
  </head>
  <body>
    <a href="#main" class="sr-only focus:not-sr-only">Zum Inhalt springen</a>
    <Header />
    <main id="main"><slot /></main>
    <Footer />
    <CookieBanner />
  </body>
</html>
```

- [ ] **Step 4: Write failing test `tests/seo.test.ts`** (render BaseLayout via container with a child)

```ts
import { expect, test } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Seo from '../src/components/seo/Seo.astro';
test('Seo emits canonical + og', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Seo, { props: { title:'T', description:'D', path:'/x/' } });
  expect(html).toContain('<title>T</title>');
  expect(html).toContain('rel="canonical"');
  expect(html).toContain('og:image');
});
```

- [ ] **Step 5: Run** — `npm test tests/seo.test.ts` — Expected PASS. (Note: Header/Footer/CookieBanner must exist before BaseLayout renders; this test only renders `Seo`, so it passes independently. BaseLayout full render is verified in Task 9.)

- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat(seo): BaseLayout, Seo, JsonLd components"`

### Task 5: Header + StatusBar + MobileMenu

**Files:** Create `src/components/layout/Header.astro`, `src/components/layout/StatusBar.astro`, `src/components/layout/MobileMenu.astro`, `tests/header.test.ts`. Consumes `src/data/site.ts` nav (define minimal nav inline here, move to site.ts in Task 8 — use site.ts now if Task 8 done first; otherwise inline `NAV` const and refactor).

**Interfaces:** Header renders logo (`/images/logo/logo-mark.svg` + "SWISSLY IT"), desktop nav (Leistungen, Über uns, FAQ, Kontakt), primary CTA "Erstgespräch anfragen" → `/erstgespraech/`, sticky w/ scroll-solidify (tiny inline script, reduced-motion safe), and a mobile menu toggle (ARIA `aria-expanded`, focus trap).

- [ ] **Step 1:** Write `StatusBar.astro` — mono line `<span>● </span>Available · Hosted in Switzerland 🇨🇭` with animated dot (CSS, reduced-motion safe).
- [ ] **Step 2:** Write `Header.astro` (sticky, nav array, CTA Button, includes MobileMenu for `<lg`).
- [ ] **Step 3:** Write `MobileMenu.astro` island (`<script>` toggles panel, `aria-expanded`, Esc closes, traps focus).
- [ ] **Step 4:** Write failing `tests/header.test.ts`: render Header, assert it contains "Erstgespräch anfragen", `href="/erstgespraech/"`, all 4 nav labels, `aria-label` on nav.
- [ ] **Step 5:** Run `npm test tests/header.test.ts` → PASS.
- [ ] **Step 6:** Commit — `git commit -am "feat(layout): header, status bar, mobile menu"`

### Task 6: Footer

**Files:** Create `src/components/layout/Footer.astro`, `tests/footer.test.ts`.

**Interfaces:** Renders full logo banner + tagline "Digital Innovation & Trust", nav columns (Über uns, Leistungen, Schulungen, FAQ, Kontakt), legal row (Impressum, Datenschutzerklärung, AGB), NAP (6030 Ebikon, Luzern · info@swisslyit.ch), StatusBar, copyright "© 2026 Swissly IT Solutions. Alle Rechte vorbehalten.", and a button `#cookie-settings` ("Cookie-Einstellungen") that calls `window.swisslyConsent.open()` (defined Task 24).

- [ ] **Step 1:** Write `Footer.astro` (links use trailing-slash paths matching Global Constraints).
- [ ] **Step 2:** Write failing `tests/footer.test.ts`: assert legal links `/impressum/`, `/datenschutzerklaerung/`, `/agb/`, tagline, `id="cookie-settings"`, copyright present.
- [ ] **Step 3:** Run → PASS.
- [ ] **Step 4:** Commit — `git commit -am "feat(layout): footer with legal nav + cookie settings trigger"`

### Task 7: UI primitives

**Files:** Create `src/components/ui/{Button,Eyebrow,Badge,Section,ServiceCard,PricingCard,CarePlanCard,ProcessStep,Accordion,FormField}.astro`, `tests/ui.test.ts`.

**Interfaces (props):**
- `Button`: `{ href?:string; variant?:'primary'|'outline'; label:string }` (primary = gold fill/navy text).
- `Eyebrow`: slot text, renders `// ` prefix in mono/gold.
- `Section`: `{ tone?:'dark'|'light'; id?:string }` wrapper with `container-x` + vertical rhythm; light = offwhite bg + ink text.
- `ServiceCard`: `{ title; teaser; href; icon? }`.
- `PricingCard`: `{ name; price; period?; features:string[]; href; featured?:boolean }`.
- `CarePlanCard`: `{ name; monthly:number; features:string[]; popular?:boolean }`.
- `ProcessStep`: `{ index:number; title; text }`.
- `Accordion`: `{ items:{q:string;a:string}[] }` island (details/summary or button+ARIA).
- `FormField`: `{ name; label; type?; required?; as?:'input'|'textarea' }`.

- [ ] **Step 1:** Implement each component (dark-first styling; gold accents; hover-glow on cards; `Eyebrow` uses `font-mono text-gold-bright`).
- [ ] **Step 2:** Write failing `tests/ui.test.ts`: render `PricingCard` with `{name:'Starter',price:"1'490",features:['a','b']}` → contains "Starter", "1'490", both features; render `CarePlanCard` popular → contains "Most Popular"; render `Button` primary href → `<a` with href and label.
- [ ] **Step 3:** Run → PASS.
- [ ] **Step 4:** Commit — `git commit -am "feat(ui): core primitives (button, cards, accordion, form field)"`

---

## PHASE 2 — Data layer (single source of truth)

### Task 8: Typed content data modules

**Files:** Create `src/data/{site,services,pricing,careplans,faq,team,process}.ts`, `tests/data.test.ts`.

**Interfaces (exports):**
- `site.ts`: `export const site = { name, legalName:'Swissly IT Solutions KLG', claim:'Webseiten, die einfach laufen.', tagline:'Digital Innovation & Trust', email:'info@swisslyit.ch', address:{street:'Pilatusweg 23',zip:'6030',city:'Ebikon',region:'Luzern',country:'CH'}, hours:'Mo–Fr 09:00–17:00', areaServed:'Zentralschweiz', social:{github:'https://github.com/SwisslyITSolutions', linkedin?:string}, nav:[...], hourlyRate:140 }`.
- `services.ts`: `export interface Service { slug; title; eyebrow; teaser; intro; bullets:string[]; sections:{h:string;p:string}[]; metaTitle; metaDescription }` and `export const services: Service[]` with 7 entries: `webseiten, webshops, wartung-care, migrationen, seo-performance, it-support, schulungen` (content per spec §7 / Notion). Order = Websites→Care→IT→Schulungen.
- `pricing.ts`: `export const packages = [{name:'Starter',price:"1'490",features:[…]},{name:'Business',price:"3'900",…},{name:'Commerce',price:"6'400",…}]`.
- `careplans.ts`: `export const carePlans = [{name:'Foundation',monthly:59,features:[…]},{name:'Growth',monthly:149,popular:true,features:[…]},{name:'Scale',monthly:289,features:[…]}]`.
- `faq.ts`: `export const faq:{q;a}[]` (8 entries, answers verbatim-consolidated from live FAQ).
- `team.ts`: `export const team = [{name:'Taha Afif',role:'Web & Kundenkommunikation',bio,photo?},{name:'Georg Ristic',role:'Cybersecurity & Organisation',bio,photo?}]`.
- `process.ts`: `export const process = [{index:1,title:'Erstgespräch',text:'30 Min, kostenlos'},{2:'Konzept & Angebot'},{3:'Umsetzung (Staging)'},{4:'Launch & Betreuung'}]`.

- [ ] **Step 1:** Write all data modules with real consolidated content (prices/labels per Global Constraints; service copy from spec/Notion; FAQ answers from captured live text).
- [ ] **Step 2:** Write failing `tests/data.test.ts`:

```ts
import { expect, test } from 'vitest';
import { packages } from '../src/data/pricing';
import { carePlans } from '../src/data/careplans';
import { services } from '../src/data/services';
import { faq } from '../src/data/faq';
test('pricing exact', () => {
  expect(packages.map(p=>p.name)).toEqual(['Starter','Business','Commerce']);
  expect(packages.map(p=>p.price)).toEqual(["1'490","3'900","6'400"]);
});
test('care plans exact', () => {
  expect(carePlans.map(c=>c.monthly)).toEqual([59,149,289]);
  expect(carePlans.find(c=>c.name==='Growth')?.popular).toBe(true);
});
test('seven services in order', () => {
  expect(services.map(s=>s.slug)).toEqual(['webseiten','webshops','wartung-care','migrationen','seo-performance','it-support','schulungen']);
});
test('eight faq entries', () => expect(faq.length).toBe(8));
```

- [ ] **Step 3:** Run → PASS. (If Header/Footer used inline nav in Tasks 5/6, refactor them now to import `site.nav`; re-run header/footer tests → PASS.)
- [ ] **Step 4:** Commit — `git commit -am "feat(data): typed content modules (single source of truth)"`

---

## PHASE 3 — Pages

### Task 9: Home page + section components

**Files:** Create `src/components/sections/{Hero,WasWirTun,WieWirArbeiten,HostingSchweiz,PreisTeaser,EcsTeaser,CtaBlock}.astro`, rewrite `src/pages/index.astro`, `tests/home.test.ts`.

**Interfaces:** `index.astro` uses BaseLayout with `ProfessionalService` + `Organization` JSON-LD (from `site.ts`); composes the 7 sections. `Hero` shows eyebrow `// digital innovation & trust`, H1 claim, code-snippet element, primary+secondary CTAs, StatusBar. `EcsTeaser` = dezent: "Aktuelles Projekt" → ECS – Errante Car Solutions, link `https://ecs-luzern.ch`.

- [ ] **Step 1:** Build section components (render from data; dark-first with one light `HostingSchweiz`/`PreisTeaser` section for contrast).
- [ ] **Step 2:** Rewrite `index.astro` (BaseLayout props: title "Swissly IT Solutions — Webseiten, IT & KI in der Zentralschweiz", meta description, path "/", jsonLd LocalBusiness).
- [ ] **Step 3:** Write failing `tests/home.test.ts`: render `index.astro` via container → contains claim "Webseiten, die einfach laufen.", "Erstgespräch", a `application/ld+json` with `"ProfessionalService"`, ECS teaser link `ecs-luzern.ch`.
- [ ] **Step 4:** Run → PASS. Also run `npm run build` to confirm full BaseLayout (Header/Footer/CookieBanner) compiles.
- [ ] **Step 5:** Commit — `git commit -am "feat(pages): home page + section components"`

### Task 10: Leistungen overview + public pricing

**Files:** Create `src/pages/leistungen/index.astro`, `tests/leistungen.test.ts`.

**Interfaces:** Lists all 7 services (ServiceCard → `/leistungen/<slug>/`), pricing section (3 PricingCards), care plans section (3 CarePlanCards, Growth popular), hourly rate note, modules "auf Anfrage". JSON-LD `BreadcrumbList`.

- [ ] **Step 1:** Build page from `services`, `packages`, `carePlans`.
- [ ] **Step 2:** Failing `tests/leistungen.test.ts`: contains all 7 service titles, "1'490"/"3'900"/"6'400", "59"/"149"/"289", "Most Popular", "CHF 140".
- [ ] **Step 3:** Run → PASS.
- [ ] **Step 4:** Commit — `git commit -am "feat(pages): leistungen overview with public pricing"`

### Task 11: Service detail pages (dynamic, 7 routes)

**Files:** Create `src/layouts/ServiceLayout.astro`, `src/pages/leistungen/[slug].astro`, `tests/service-detail.test.ts`.

**Interfaces:** `[slug].astro` `getStaticPaths()` from `services`; renders `ServiceLayout` with eyebrow, H1 title, intro, bullets, content sections, related CTA. Per-page `Seo` from `service.metaTitle/metaDescription`; JSON-LD `Service` + `BreadcrumbList`.

- [ ] **Step 1:** Implement `getStaticPaths` + ServiceLayout.
- [ ] **Step 2:** Failing `tests/service-detail.test.ts`: for each of the 7 slugs, render path props → contains the service title + at least one section heading; assert JSON-LD `"@type":"Service"`.
- [ ] **Step 3:** Run → PASS; `npm run build` → 7 `/leistungen/<slug>/index.html` exist.
- [ ] **Step 4:** Commit — `git commit -am "feat(pages): 7 service detail landing pages"`

### Task 12: Über uns

**Files:** Create `src/pages/ueber-uns.astro`, `tests/ueber-uns.test.ts`.
- [ ] **Step 1:** Build: story, 3 values (Verständlichkeit/Verlässlichkeit/Praxisnähe), TeamCards (Taha, Georg from `team.ts`), ECS teaser optional, CTA.
- [ ] **Step 2:** Failing test: contains "Taha", "Georg", all 3 value names.
- [ ] **Step 3:** Run → PASS. **Step 4:** Commit — `git commit -am "feat(pages): über uns"`

### Task 13: FAQ + FAQPage schema

**Files:** Create `src/pages/faq.astro`, `tests/faq-page.test.ts`.
- [ ] **Step 1:** Render `Accordion` from `faq`; add JSON-LD `FAQPage` built from `faq` (mainEntity Q/A).
- [ ] **Step 2:** Failing test: 8 questions present; JSON-LD contains `"FAQPage"` and a known question string.
- [ ] **Step 3:** Run → PASS. **Step 4:** Commit — `git commit -am "feat(pages): faq with FAQPage schema"`

### Task 14: Kontakt + danke

**Files:** Create `src/pages/kontakt/index.astro`, `src/pages/kontakt/danke.astro`, `tests/kontakt.test.ts`.

**Interfaces:** Form `method=POST action="/contact-handler.php"` with fields Name/Firma (required), E-Mail (required), Telefon (optional), Anliegen (required, textarea), honeypot field `company_url` (hidden), consent checkbox linking `/datenschutzerklaerung/`. Includes `Map` (Task 26) + NAP. `danke.astro` = confirmation.

- [ ] **Step 1:** Build kontakt page (FormField components, honeypot, required attrs, `noindex` on danke).
- [ ] **Step 2:** Failing `tests/kontakt.test.ts`: form `action="/contact-handler.php"`, required E-Mail input, textarea Anliegen, honeypot hidden, link to datenschutz.
- [ ] **Step 3:** Run → PASS. **Step 4:** Commit — `git commit -am "feat(pages): kontakt + danke"`

### Task 15: Erstgespräch

**Files:** Create `src/pages/erstgespraech.astro`, `tests/erstgespraech.test.ts`.
- [ ] **Step 1:** Build: "Kostenloses Erstgespräch", 3 steps (Situationsanalyse → Engpässe → Empfehlung), request form (same endpoint, subject preset "Erstgespräch").
- [ ] **Step 2:** Failing test: contains "Kostenloses Erstgespräch", form action endpoint, 3 step labels.
- [ ] **Step 3:** Run → PASS. **Step 4:** Commit — `git commit -am "feat(pages): erstgespräch"`

### Task 16: Legal pages (Impressum, Datenschutzerklärung, AGB)

**Files:** Create `src/data/legal.ts` (long-form text content), `src/pages/impressum.astro`, `src/pages/datenschutzerklaerung.astro`, `src/pages/agb.astro`, `tests/legal.test.ts`.

**Content source:** Verbatim text captured from the live site (Impressum, full Datenschutzerklärung, AGB sections) — reproduce faithfully. **Extend DSV** with new sections (per spec §8): Google Analytics 4 (DPF/SCC, IP-anonymisation, opt-out), Consent management, OpenStreetMap tiles, Notion (US, DPF) as processor. **Extend Impressum** with Haftung für Inhalte / Haftung für Links / Urheberrecht blocks. Unify DSV to revDSG-first. Update "Stand" date to 2026-06-26.

- [ ] **Step 1:** Put legal copy in `src/data/legal.ts` as structured sections; render pages from it (light tone for readability).
- [ ] **Step 2:** Failing `tests/legal.test.ts`: Impressum contains "CHE-288.328.570" + "Pilatusweg 23" + "Haftung für Links"; DSV contains "Google Analytics" + "Data Privacy Framework" + "Notion" + "OpenStreetMap"; AGB contains "Gerichtsstand".
- [ ] **Step 3:** Run → PASS. **Step 4:** Commit — `git commit -am "feat(pages): legal pages (impressum, datenschutz, agb) with GA4/cookie extensions"`

### Task 17: 404

**Files:** Create `src/pages/404.astro`.
- [ ] **Step 1:** Branded 404 (claim tone, links home + leistungen + kontakt). **Step 2:** `npm run build` → `dist/404.html` exists. **Step 3:** Commit — `git commit -am "feat(pages): branded 404"`

---

## PHASE 4 — Integrations

### Task 18: Consent module + Cookie banner

**Files:** Create `src/lib/consent.ts`, `src/components/ui/CookieBanner.astro`, `tests/consent.test.ts`.

**Interfaces:** `consent.ts` exports `getConsent():'granted'|'denied'|null`, `setConsent(v)`, `onConsent(cb)`, persists to `localStorage['swissly-consent']`; exposes `window.swisslyConsent = { open, accept, reject, state }`. Banner: Akzeptieren / Ablehnen / Einstellungen, ARIA dialog, focus trap, no layout shift; footer `#cookie-settings` calls `window.swisslyConsent.open()`.

- [ ] **Step 1:** Write `consent.ts` (pure, testable: storage get/set, default `null`→denied behaviour). Write `tests/consent.test.ts` with a jsdom localStorage mock:

```ts
import { expect, test, beforeEach, vi } from 'vitest';
// @vitest-environment jsdom
import { getConsent, setConsent } from '../src/lib/consent';
beforeEach(()=>localStorage.clear());
test('defaults to null then persists', () => {
  expect(getConsent()).toBe(null);
  setConsent('granted');
  expect(getConsent()).toBe('granted');
});
```
(Add `// @vitest-environment jsdom` and ensure `jsdom` available, or stub `localStorage`.)

- [ ] **Step 2:** Run → PASS.
- [ ] **Step 3:** Write `CookieBanner.astro` island (renders only if `getConsent()===null`, wires buttons to `window.swisslyConsent`).
- [ ] **Step 4:** `npm run build` → succeeds. **Step 5:** Commit — `git commit -am "feat(consent): consent module + cookie banner"`

### Task 19: GA4 with Consent Mode v2

**Files:** Create `src/lib/analytics.ts`; wire init into `BaseLayout.astro`; `tests/analytics.test.ts`.

**Interfaces:** `analytics.ts` exports `initAnalytics(id)` — sets `gtag('consent','default',{analytics_storage:'denied',...})` immediately; loads GA script + `gtag('consent','update',{analytics_storage:'granted'})` **only** after `onConsent('granted')`; IP anonymisation. Reads `import.meta.env.PUBLIC_GA_MEASUREMENT_ID`. No-op if id missing.

- [ ] **Step 1:** Write `analytics.ts` (guard: do nothing without consent; expose `enableAnalytics()` called from consent grant).
- [ ] **Step 2:** Failing `tests/analytics.test.ts`: with no consent, calling init does NOT inject `googletagmanager` script (spy on document); after simulated grant, it does.
- [ ] **Step 3:** Run → PASS.
- [ ] **Step 4:** Add init `<script>` to BaseLayout head (Consent Mode default denied) + load gate. `npm run build` → succeeds.
- [ ] **Step 5:** Commit — `git commit -am "feat(analytics): GA4 with Consent Mode v2 (consent-gated)"`

### Task 20: Map (Leaflet / OpenStreetMap)

**Files:** Add `public/vendor/leaflet/*` (css/js/markers), create `src/components/ui/Map.astro`, used on kontakt.

**Interfaces:** `Map.astro` props `{ lat; lng; label }` → renders a `div#map` + island script initialising Leaflet with OSM tiles, marker at Ebikon (Pilatusweg 23). Lazy-init on intersection.

- [ ] **Step 1:** Vendor Leaflet; build `Map.astro`; place on kontakt page.
- [ ] **Step 2:** `npm run build` → succeeds; manual: map renders in `npm run preview`.
- [ ] **Step 3:** Commit — `git commit -am "feat(ui): OpenStreetMap (Leaflet) contact map"`

### Task 21: Scroll-reveal & motion polish

**Files:** Create `src/lib/scroll-reveal.ts`; opt-in via `data-reveal` attribute; import once in BaseLayout.
- [ ] **Step 1:** IntersectionObserver adds `.is-visible`; CSS transitions in global.css; **must** check `prefers-reduced-motion` and skip.
- [ ] **Step 2:** Apply `data-reveal` to key sections. `npm run build` → succeeds.
- [ ] **Step 3:** Commit — `git commit -am "feat(motion): reduced-motion-safe scroll reveal"`

### Task 22: PHP contact handler (Notion + mail)

**Files:** Create `public/contact-handler.php`, `public/.htaccess` (partial here, completed Task 25), `tests/php-handler.test.ts` (only if `php` CLI available; else manual checklist).

**Interfaces:** Validates required fields + email format; rejects if honeypot `company_url` non-empty (200 fake-OK); rate-limit by IP (simple file/APCu); POSTs to Notion API (`/v1/pages`, parent = `NOTION_LEADS_DB_ID`, properties mapped to Leads DB) using `NOTION_TOKEN`; sends mail to `CONTACT_MAIL_TO`; redirects to `/kontakt/danke/`. Reads secrets from environment / a non-public `config.php` (documented, not committed).

- [ ] **Step 1:** Write `contact-handler.php` with server-side validation, honeypot, Notion `curl` call, `mail()`/SMTP, redirect.
- [ ] **Step 2:** If `php` available: write `tests/php-handler` checks (run `php -l` lint + a CLI invocation with mocked env asserting honeypot rejection). Else: add a manual test checklist comment block.
- [ ] **Step 3:** Run `php -l public/contact-handler.php` → "No syntax errors".
- [ ] **Step 4:** Commit — `git commit -am "feat(form): PHP contact handler → Notion leads + mail"`

---

## PHASE 5 — SEO, performance, a11y, deploy

### Task 23: robots, sitemap verify, per-page SEO audit

**Files:** Create `public/robots.txt`; `tests/seo-audit.test.ts`.
- [ ] **Step 1:** `robots.txt` (allow all, `Sitemap: https://swisslyit.ch/sitemap-index.xml`).
- [ ] **Step 2:** `npm run build`; write `tests/seo-audit.test.ts` that reads every `dist/**/index.html` and asserts each has exactly one `<title>`, a meta description, a canonical link, and that home + service pages contain `application/ld+json`.
- [ ] **Step 3:** Run → PASS. **Step 4:** Commit — `git commit -am "feat(seo): robots + automated per-page SEO audit"`

### Task 24: .htaccess (https, caching, security headers, 301 map)

**Files:** Create/extend `public/.htaccess`; create `docs/redirect-map.md`.
- [ ] **Step 1:** Build redirect map old→new (list any path changes; live slugs are preserved, so mainly enforce trailing slash + https + www→non-www).
- [ ] **Step 2:** Write `.htaccess`: force HTTPS, `www`→apex, trailing-slash normalisation, `Cache-Control` for `/fonts`,`/_astro`,`/images` (immutable, 1y), security headers (`X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, a CSP that allows self + GA when consented), `ErrorDocument 404 /404.html`, 301s from map.
- [ ] **Step 3:** `npm run build` → `.htaccess` copied to `dist/`. **Step 4:** Commit — `git commit -am "feat(deploy): .htaccess security/caching/redirects"`

### Task 25: Performance, images, font preload pass

- [ ] **Step 1:** Convert raster images to AVIF/WebP via Astro `<Image>`; ensure hero LCP element prioritised; preload only critical font(s).
- [ ] **Step 2:** Run `npm run build && npm run preview`; run Lighthouse (or `@lhci/cli` if installed) on `/`, `/leistungen/`, `/kontakt/`. Record scores in `docs/lighthouse.md`. Target ≥95 each (aim 100).
- [ ] **Step 3:** Fix regressions. **Step 4:** Commit — `git commit -am "perf: image optimisation + font preload, lighthouse pass"`

### Task 26: Accessibility pass (axe + manual)

**Files:** Create `tests/e2e/a11y.spec.ts` (Playwright + axe).
- [ ] **Step 1:** Write Playwright test that runs axe on `/`, `/leistungen/`, `/kontakt/`, `/faq/` and asserts no serious/critical violations; check keyboard nav of header menu, accordion, cookie banner; verify gold/navy text contrast ≥ AA.
- [ ] **Step 2:** Run `npm run build && npm run preview` then `npm run e2e` → PASS (fix violations).
- [ ] **Step 3:** Commit — `git commit -am "test(a11y): axe + keyboard checks, fixes"`

### Task 27: Deployment docs + final verification

**Files:** Create `README.md`, `docs/deployment.md`.
- [ ] **Step 1:** Document: env vars, build, Hostpoint upload (Git/SFTP), where `config.php` secrets go, GA4 + Notion setup steps, how to add a language later.
- [ ] **Step 2:** Final gate: `npm test` (all green), `npm run build` (no errors), `npm run e2e` (green), manual click-through in `npm run preview` (nav, forms post to handler path, consent banner accept→GA loads, reject→no GA, map renders).
- [ ] **Step 3:** Commit — `git commit -am "docs: deployment guide + final verification"`

---

## Self-Review (author checklist — completed)

- **Spec coverage:** §2 stack→T1/T3; §3 architecture→T1,T22,T24; §4 structure→all; §5 sitemap→T9–T17; §6 design system→T3,T5–T7,T9; §7 content→T8,T9–T16; §8 legal→T16; §9 consent/GA4→T18,T19; §10 SEO→T4,T9–T13,T23; §11 perf/a11y→T25,T26; §12 scope (no blog/i18n/shop/booking) honoured (not built); §13 assets→T27/.env.example. All covered.
- **Placeholder scan:** Infrastructure tasks carry full code; content tasks point to typed `src/data` modules (the real content) and the captured live legal text. Legal verbatim text is intentionally produced in execution from the captured source rather than re-pasted here (too long); this is a sourcing instruction, not a placeholder.
- **Type consistency:** `site.nav` (T8) consumed by Header/Footer (T5/T6, refactor noted); `services[].slug/metaTitle` (T8) consumed by T10/T11; `packages`/`carePlans` shapes consumed by T7 cards + T10; `window.swisslyConsent` defined T18, consumed by Footer (T6) + analytics (T19). Consistent.
```
