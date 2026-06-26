# Swissly IT Solutions — Website (Neu)

Statisch generierte Marketing-Website für Swissly IT Solutions KLG, Ebikon.

**Tech Stack:** Astro 6 · Tailwind CSS 4 · TypeScript (strict) · PHP form handler

## Schnellstart

```bash
cp .env.example .env
# Werte in .env eintragen (siehe Deployment-Doku)
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ erzeugen
npm run preview  # dist/ lokal testen
```

## Tests

```bash
npm test           # Vitest unit tests (74 Tests)
npm run e2e        # Playwright a11y + E2E (benötigt Browser)
```

## Deployment

Siehe [docs/deployment.md](docs/deployment.md) für vollständige Anleitung.

## Umgebungsvariablen

| Variable | Pflicht | Beschreibung |
|---|---|---|
| `PUBLIC_GA_MEASUREMENT_ID` | Nein | Google Analytics 4 Measurement-ID (G-XXXXXXXXXX) |
| `NOTION_TOKEN` | Für Formular | Notion Integration Token |
| `NOTION_LEADS_DB_ID` | Für Formular | Notion Datenbank-ID (Leads) |
| `CONTACT_MAIL_TO` | Für Formular | Ziel-E-Mail-Adresse |
| `TRUSTED_PROXY` | Für Formular | IP des Reverse Proxy (Rate-Limiting) |

**Wichtig:** Keine Secrets in Git committen. `.env` ist in `.gitignore`.
