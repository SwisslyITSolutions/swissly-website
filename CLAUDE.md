# CLAUDE.md – Swissly IT Solutions Webseite

## Projekt

Webseite für Swissly IT Solutions KLG (swisslyit.ch).
Migration von WordPress zu Astro, Live-Gang geplant für 2026.

## Tech-Stack

- **Framework:** Astro 5.x mit TypeScript (strict mode)
- **Styling:** Tailwind CSS 4.x
- **Hosting:** Hostpoint Smart Webhosting (Schweiz)
- **Deployment:** Static Build, FTP-Upload zu Hostpoint
- **CMS:** Keines (statische Seiten)

## Wichtige Einschränkungen

- KEIN Server-Side Code möglich (Hostpoint Smart hat kein Node.js)
- Astro im Static-Mode (`output: 'static'`)
- Keine API-Routen, externe Services (Cloudflare Workers / Make.com) für Form-Anbindung

## Code-Konventionen

- TypeScript strict, keine `any`-Types
- Astro-Komponenten in PascalCase: `Hero.astro`, `ServiceCard.astro`
- Utility-Funktionen in camelCase
- Tailwind: nur Utility-Klassen, keine inline-styles
- Keine `console.log` in committeten Code (Debug-Logs vor Commit entfernen)
- Bilder via `astro:assets` für automatische Optimierung
- Schweizer Konvention überall: "ss" statt "ß", CHF als Währung, TT.MM.JJJJ

## Designsystem

Quelle: Notion-Seiten "Swissly Webseite – Briefing v1.1" und "Texte v1"

### Farben

- Navy `#1A2D45` (Primär, Hero-Background, Headlines)
- Off-White `#FAFAF7` (Sekundär, helle Sektionen)
- Gold `#B89968` (Akzent, CTAs)
- Body-Text `#4A5568`
- Sektion-Trenner `#E8EAED`

### Schriften

- Headlines: Geist (Google Fonts)
- Body: Inter (Google Fonts)
- Code/Status-Bar: JetBrains Mono (Google Fonts)

### Tonalität

- "Sie", warm und direkt
- KEIN Marketing-Bla-Bla
- Schweizer Konvention

## Verzeichnis-Struktur

src/
├── components/ # Wiederverwendbare Komponenten
│ ├── ui/ # Atomar (Button, Badge, ...)
│ └── sections/ # Seiten-Sektionen (HeroSection, FAQSection, ...)
├── layouts/ # Layout-Komponenten
├── pages/ # Seiten (= URLs)
└── styles/ # Global CSS

## Build & Test

- `npm run dev` – Lokaler Dev-Server auf http://localhost:4321
- `npm run build` – Static Build in `dist/`
- `npm run preview` – Preview des Builds vor Deployment

## Wichtig vor jedem Commit

- `npm run build` lokal durchlaufen lassen (kein Build-Fehler)
- Lighthouse-Score nicht künstlich verschlechtern
- Keine `console.log` oder `debugger`-Statements
- Sauberer Commit-Message (Conventional Commits: feat, fix, docs, style, refactor)

## Nicht hier behandelt

- AGB-Text → wird von Generator/Anwalt geliefert
- Datenschutzerklärung → wird von Generator/Anwalt geliefert
- Impressum → einmalig manuell

## Footer-Adresse

- Volle Adresse "Pilatusweg 23, 6030 Ebikon" erscheint NUR im Impressum
- Im Footer nur "6030 Ebikon, Luzern" (ohne Strasse)
- Kontakt-Mail: info@swisslyit.ch
- Tagline: "Digital Innovation & Trust" (Title-Case)
