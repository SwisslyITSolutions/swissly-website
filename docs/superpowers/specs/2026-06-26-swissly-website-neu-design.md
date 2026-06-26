# Swissly IT Solutions — Neue Website (Design-Spec)

**Datum:** 2026-06-26
**Status:** In Abnahme (Design freigegeben, Spec-Review ausstehend)
**Projektort:** `C:\Users\Admin\Code\swissly\swissly-website-neu`

---

## 1. Ziel & Kontext

Ablösung der bestehenden WordPress-Seite (`swisslyit.ch`, lokal gehostet) durch eine
**komplett neu gebaute, statisch generierte Website** mit denselben — konsolidierten —
Inhalten, aber deutlich moderner, mit technisch optimiertem SEO und DSG-konformem
Besucher-Tracking.

**Erfolgskriterien**
- Designrichtung **A „Swiss Digital Engineering, elevated"** sauber umgesetzt (dunkles
  Navy-Premium, Code-Editor-Ästhetik, Gold-Akzent).
- Lighthouse ~100 (Performance/SEO/Best-Practices/A11y).
- Google Analytics 4 mit Consent-Banner liefert Besucherzahl, Herkunft/Geo, Quellen.
- Alle Rechtstexte (Impressum, Datenschutz, AGB) vorhanden & aktualisiert.
- Statisch deploybar auf Hostpoint (Schweiz), Formular → Notion-Leads-DB + E-Mail.

**Quellen der Wahrheit**
- Inhalt: konsolidiert aus Notion (Stand 25.06.2026, „Texte v1", „Briefing v1.2",
  Produkte-DB) **und** der Live-Seite (Abgleich, Widersprüche bereinigt).
- Marke/Design: Notion-Branding (Farben, Fonts, Motiv) + Designrichtung A.
- Recht: Live-Seite (Impressum/DSV/AGB) wörtlich übernommen + Erweiterungen.

---

## 2. Getroffene Entscheidungen (Brainstorming)

| Thema | Entscheidung |
|---|---|
| Ausgangsbasis | Komplett neu (nicht auf vorhandenem `swissly-website`-Repo aufbauen), Inhalte/Assets als Quelle |
| Stack | Astro 6 + Tailwind 4 + TypeScript (strict), statisch, Islands |
| Tracking | Google Analytics 4 + Consent Mode v2 + Cookie-Banner |
| Inhalte | Notion + Live konsolidiert zu finaler Fassung |
| Sprache | Deutsch, i18n-ready (Struktur vorbereitet) |
| Design | Mutiger Neuentwurf — Richtung A (dunkel, Code-Editor, Gold) |
| Hosting | Hostpoint Schweiz (statisch), PHP-Formular-Endpoint |
| Formular | Notion „📨 Leads"-DB + E-Mail-Benachrichtigung an info@ |
| Referenzen | Dezenter ECS-Teaser (Social Proof), keine eigene Referenzseite |
| Fonts | Self-hosted (Geist, Inter, JetBrains Mono — alle Open Source) |
| Abnahme | Lokal bauen & im Browser zeigen, Go-Live separat |

---

## 3. Tech-Architektur

- **Astro 6** (output `static`), **Tailwind 4** (`@tailwindcss/vite`), **TypeScript strict**.
- **Islands** (minimales JS) nur für: Cookie-Consent, Mobile-Menü, FAQ-Accordion,
  Leaflet-Karte, Formular-Validierung/Submit, Scroll-Reveal (IntersectionObserver).
- **@astrojs/sitemap** für `sitemap.xml`.
- **Inhalts-Datenschicht:** `src/content/` (bzw. typed `src/data/*.ts`) als zentrale,
  einmal gepflegte Quelle für Leistungen, Preise/Pakete, Care-Pläne, FAQ, Team, Prozess.
  Komponenten rendern daraus → konsistent, wartbar, i18n-ready.
- **Konfiguration/Secrets** (nicht im Repo): `PUBLIC_GA_MEASUREMENT_ID`,
  `NOTION_TOKEN`, `NOTION_LEADS_DB_ID`, Mail-Empfänger. `.env.example` dokumentiert sie.

### Formular-Backend (Hostpoint)
- `contact-handler.php`: nimmt POST entgegen, validiert serverseitig, prüft Honeypot +
  einfaches Rate-Limit, schreibt Lead via Notion-API in die Leads-DB, sendet Mail an
  info@swisslyit.ch, antwortet JSON. Bei Erfolg Redirect/Anzeige `/kontakt/danke`.
- Datenfluss bleibt schweiz-/EU-nah; Notion (US) als Auftragsverarbeiter in DSV deklariert.

### Deployment
- `astro build` → statischer Output → Upload zu Hostpoint (Git-Deploy/SFTP).
- `.htaccess`: HTTPS-Redirect, saubere URLs, Cache-Header (immutable Assets),
  Security-Header (CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy),
  **301-Redirects** von Alt-URLs.

---

## 4. Projektstruktur

```
swissly-website-neu/
├─ docs/superpowers/specs/      # diese Spec + spätere Pläne
├─ public/
│  ├─ fonts/                    # self-hosted woff2 (Geist, Inter, JetBrains Mono)
│  ├─ images/logo/              # logo-mark.svg, logo-banner.svg
│  ├─ vendor/leaflet/           # lokales Leaflet
│  ├─ robots.txt
│  └─ contact-handler.php       # Formular-Endpoint (Hostpoint)
├─ src/
│  ├─ components/
│  │  ├─ layout/   Header.astro, Footer.astro, Nav, MobileMenu, StatusBar
│  │  ├─ sections/ Hero, WasWirTun, WieWirArbeiten, HostingSchweiz,
│  │  │            PreisTeaser, EcsTeaser, CtaBlock, TeamGrid, FaqList
│  │  ├─ ui/       ServiceCard, PricingCard, CarePlanCard, ProcessStep,
│  │  │            FormField, Accordion, Eyebrow, Button, Badge, Map
│  │  └─ seo/      Seo.astro (Head: meta/OG/canonical), JsonLd.astro
│  ├─ layouts/     BaseLayout.astro
│  ├─ data/        services.ts, pricing.ts, careplans.ts, faq.ts, team.ts,
│  │               process.ts, site.ts (NAP, Claims, Social)
│  ├─ lib/         consent.ts, analytics.ts, scroll-reveal.ts
│  ├─ pages/       (siehe Sitemap)
│  └─ styles/      global.css (Tokens, Tailwind-Layer)
├─ astro.config.mjs, tailwind/postcss, tsconfig.json, package.json
└─ .env.example
```

**Designprinzip:** jede Komponente hat eine klare Aufgabe, rendert aus typisierten
Daten, ist isoliert verständlich/testbar. Inhalte ≠ Darstellung (Daten in `src/data`).

---

## 5. Sitemap & Seiten

| Pfad | Inhalt |
|---|---|
| `/` | Hero → Was wir tun (4) → Wie wir arbeiten (4 Schritte) → Hosting Schweiz/Vertrauen → Preis-Teaser → ECS-Teaser → CTA |
| `/leistungen` | Übersicht + **öffentliche Preise** (3 Web-Pakete, 3 Care-Pläne, Stundensatz 140) + Links zu Detailseiten |
| `/leistungen/webseiten` | Webseiten & Redesign (SEO-Landingpage) |
| `/leistungen/webshops` | Webshops (WooCommerce, TWINT) |
| `/leistungen/wartung-care` | Wartung & Support / Care-Pläne (Flaggschiff) |
| `/leistungen/migrationen` | Migrationen (WP/Joomla/Typo3 → modern, 301-Erhalt) |
| `/leistungen/seo-performance` | Technisches SEO & Performance |
| `/leistungen/it-support` | IT-Support & Infrastruktur (15-Min-Takt) |
| `/leistungen/schulungen` | KI- & IT-Schulungen für KMU |
| `/ueber-uns` | Story, Werte (Verständlichkeit/Verlässlichkeit/Praxisnähe), Team Georg & Taha |
| `/faq` | 8 Fragen (Accordion, FAQPage-Schema) |
| `/kontakt` | Formular (Name/Firma, E-Mail, Tel optional, Anliegen) + NAP + Karte |
| `/kontakt/danke` | Bestätigung |
| `/erstgespraech` | Kostenloses Erstgespräch (15–30 Min), 3 Schritte, Anfrageformular |
| `/impressum` | siehe §8 |
| `/datenschutzerklaerung` | siehe §8 |
| `/agb` | siehe §8 |
| `/404` | Fehlerseite im Markenlook |

**URL-Kontinuität / SEO:** Live-Slugs beibehalten (`/leistungen/`, `/ueber-uns/`,
`/faq/`, `/kontakt/`, `/erstgespraech/`, `/impressum/`, `/datenschutzerklaerung/`,
`/agb/`). Für geänderte/neue Pfade 301-Redirects in `.htaccess`.

---

## 6. Design-System (Richtung A)

**Farb-Tokens**
- `--navy-900 #0C1828`, `--navy-800 #14253A`, `--navy-700 #1A2D45` (Basis dunkel)
- `--offwhite #FAFAF7` (Kontrast-Sektionen), `--paper #FFFFFF`
- `--gold #B89968`; auf Dunkel aufgehellt `--gold-bright #C9A96A` (Kontrast ≥ AA für Text)
- Text hell-BG `--ink #1A2D45` / `--muted #4A5568`; Text dunkel-BG `#E6EDF5` / `#9FB3C8`
- Trenner `--line #E8EAED` (hell) / `rgba(255,255,255,.10)` (dunkel)

**Typografie** (self-hosted woff2, subset latin, `font-display:swap`)
- Headlines: **Geist** (700/800) — kräftig, modern, leicht negatives Tracking
- Body: **Inter** (400/500/600)
- Mono/Akzent: **JetBrains Mono** (400/500/700) — Eyebrows, Labels, Code, Status-Bar

**Motiv & Komponenten-Sprache**
- Eyebrows als `// kommentar` in Mono/Gold.
- Status-Bar (Header/Footer): `● Available · Hosted in Switzerland 🇨🇭`.
- Feines Dot-/Line-Grid auf dunklen Sektionen; Gold als „Syntax-Highlight".
- Hero mit Code-Snippet-Element (`const stack = ['Astro','Tailwind','🇨🇭']`).
- Buttons: Primär = Gold-Fill (Text Navy), Sekundär = Outline hell.
- Cards mit dezenter Border + Hover-Glow.

**Motion** (dezent, performant, `prefers-reduced-motion` respektiert)
- Scroll-Reveal (fade/translate), Hover-States, animierter Status-Punkt,
  optional getippter Code im Hero. Kein Layout-Shift, keine schweren Libs.

**Layout**
- Dunkel-first; gezielte Off-White-Sektionen für dichte Inhalte (Preise, FAQ) zur
  Lesbarkeit/Kontrast. Max-Breite-Container, klare vertikale Rhythmik, 12-Spalten-Gefühl.

---

## 7. Inhalts-Konsolidierung (Notion + Live)

- **Claim:** „Webseiten, die einfach laufen." · **Tagline:** „Digital Innovation & Trust."
- **Positionierung:** junge, fokussierte Tech-Boutique aus Ebikon/Zentralschweiz;
  ehrlich, verständlich, verlässlich, praxisnah; Swissness (CH-Hosting/revDSG).
- **Reihenfolge:** Websites → Care → IT → Schulungen.
- **Bereinigungen ggü. Live:** „Content-Updates" → „Anpassungen"; keine MWST-Hinweise
  (nicht MWST-pflichtig); Kontakt info@ (nicht admin@); Preise/Care-Pläne öffentlich
  (Live & Notion stimmen überein: Pakete 1'490 / 3'900 / 6'400; Care 59 / 149 / 289);
  Paketnamen vereinheitlicht auf Starter/Business/Commerce.
- **Tonalität:** „Sie", warm-direkt, technisch fundiert ohne Jargon.
- **Team:** Taha Afif (Web & Kundenkommunikation), Georg Ristic (Cybersecurity & Organisation).
- **NAP:** Swissly IT Solutions KLG, Pilatusweg 23, 6030 Ebikon; info@swisslyit.ch;
  keine Telefonnummer; Karte via OpenStreetMap/Leaflet (kein Google Maps).

### Preise (öffentlich, CHF, netto/steuerbefreit)
- Pakete (verbindliche Namen = Notion): **Starter 1'490** · **Business 3'900** · **Commerce 6'400**
  (Live-Labels „Corporate"/„E-Commerce" werden auf Business/Commerce vereinheitlicht).
- Care-Pläne (Jahresabo): Foundation **59/Mt** · Growth **149/Mt** (Most Popular) · Scale **289/Mt**.
- Stundensatz **140/h** (IT-Support 15-Min-Takt). Module/Schulungen auf Anfrage.

---

## 8. Recht

### Impressum (übernehmen + ergänzen)
Wörtlich von Live: Swissly IT Solutions KLG · Georg Ristic & Taha Afif · Pilatusweg 23,
6030 Ebikon · info@swisslyit.ch · Rechtsform KG · HR **CHE-288.328.570** · aktuell nicht
MWST-pflichtig · Öffnungszeiten Mo–Fr 09:00–17:00. **Ergänzen:** Standard-Blöcke „Haftung
für Inhalte", „Haftung für Links", „Urheberrecht".

### Datenschutzerklärung (übernehmen + erweitern)
Bestehende, umfangreiche Fassung (revDSG, Verantwortlicher, Sicherheits-/Hosting-/
Logfile-/Kontakt-Abschnitte) übernehmen, vereinheitlicht auf **revDSG-first** (DSGVO als
Ergänzung). **Neue Abschnitte ergänzen:**
- **Google Analytics 4** (Anbieter Google, Zweck Reichweitenmessung, verarbeitete Daten,
  Cookies/Speicherdauer, IP-Anonymisierung, US-Transfer via **DPF** + SCC, Opt-out/Widerruf).
- **Einwilligungsverwaltung (Consent)** — Cookie-Banner, Speicherung & Widerruf.
- **Kartendienst OpenStreetMap** (Kachel-Server, IP-Übermittlung beim Laden).
- **Notion (Notion Labs Inc., US)** als Auftragsverarbeiter fürs Kontaktformular (DPF).
- Stand-Datum aktualisieren.

### AGB
Bestehende Fassung übernehmen (Geltungsbereich, Vertragsschluss, Preise/Zahlung,
Mitwirkung, Care-Pläne, Haftung, Gerichtsstand Ebikon/Luzern, Schweizer Recht).

---

## 9. Tracking & Cookie-Consent

- **Consent Mode v2**: vor Einwilligung alle Consent-Typen `denied`; GA-Script wird
  **erst nach Zustimmung** geladen (`analytics_storage` → `granted`).
- **Cookie-Banner**: Akzeptieren / Ablehnen / Einstellungen; Auswahl persistiert
  (localStorage/Cookie); **Widerruf** jederzeit über Footer-Link „Cookie-Einstellungen".
- **GA4**: `PUBLIC_GA_MEASUREMENT_ID`, IP-Anonymisierung; liefert Besucher, Geo/Herkunft,
  Quellen, Geräte, Verhalten.
- Banner barrierefrei (Fokus-Trap, ARIA, Tastatur), kein Layout-Shift, blockiert Inhalt nicht.

---

## 10. SEO (technischer Schwerpunkt)

- Pro Seite: `title`, `meta description`, `canonical`, `lang=de-CH`, OG + Twitter Cards,
  OG-Image (Markenlook).
- **JSON-LD**: `ProfessionalService`/`LocalBusiness` (Name, Adresse Ebikon, `geo`,
  `areaServed` Zentralschweiz, `openingHours`, `email`, `sameAs` GitHub/LinkedIn),
  `Service` je Leistungsseite, `BreadcrumbList`, `FAQPage` auf `/faq`, `Organization`.
- `sitemap.xml` (@astrojs/sitemap) + `robots.txt`.
- Semantisches HTML, saubere H1–H3-Hierarchie, sprechende `alt`-Texte, interne Verlinkung.
- **Local SEO**: Keywords Ebikon/Luzern/Zentralschweiz; konsistente NAP.
- `hreflang`-vorbereitet (Struktur für spätere Sprachen).

---

## 11. Performance & Barrierefreiheit

- Lighthouse-Ziel ~100/100. Self-hosted Fonts (woff2, subset, preload kritisch),
  Astro `<Image>` (AVIF/WebP, responsive), minimal JS, kein render-blocking.
- **WCAG 2.1 AA**: geprüfte Kontraste (Gold/Navy für Text), sichtbare Fokus-Stile,
  Skip-Link, `prefers-reduced-motion`, ARIA für Accordion/Menü/Banner, Landmarks,
  Formular-Labels/Fehlermeldungen.

---

## 12. Scope / Nicht-Ziele (YAGNI)

**Nicht zum Launch:** Blog, zweite Sprache (nur vorbereitet), eigener Shop,
Buchungskalender (Erstgespräch via Formular; cal.com optional später), eigene
Referenzseite (nur dezenter ECS-Teaser).

---

## 13. Benötigte Assets / Zugänge (vor Go-Live)

- GA4-Property + `Measurement ID`.
- Notion-Integration-Token + Leads-DB-ID (Feld-Mapping bestätigen).
- Logo-SVGs (vorhanden im alten Repo, wiederverwendbar) + ggf. Team-Fotos, OG-Image.
- Hostpoint-Zugang (FTP/Git) + PHP-Mail/SMTP-Konfig.
- Bestätigung der finalen Domain/URL-Struktur für 301-Map.

---

## 14. Offene Punkte für Implementierungsplan

- Konkrete Sektions-Reihenfolge & Copy je Detailseite finalisieren.
- 301-Redirect-Map (Alt→Neu) erstellen.
- Notion-Leads-Feld-Mapping bestätigen.
- Self-Hosting der Fonts (Quellen/Subsetting) und Leaflet-Tiles-Strategie.
