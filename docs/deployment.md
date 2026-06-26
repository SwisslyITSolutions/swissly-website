# Deployment-Anleitung — Swissly IT Solutions Website

## Übersicht

Die Website ist eine statisch generierte Astro-Site (Output: `dist/`).
Das PHP-Kontaktformular (`contact-handler.php`) wird separat auf Hostpoint deployed.

---

## 1. Voraussetzungen

- Node.js ≥ 22.12.0
- npm (kommt mit Node)
- Hostpoint-Hosting-Zugang (FTP/SFTP oder Git)

---

## 2. Lokale Einrichtung

```bash
git clone <repo-url>
cd swissly-website-neu
cp .env.example .env
# .env ausfüllen (siehe Abschnitt "Umgebungsvariablen")
npm install
npm run dev      # Dev-Server auf http://localhost:4321
```

---

## 3. Build

```bash
npm run build    # Erzeugt dist/
npm run preview  # Testet dist/ lokal auf http://localhost:4321
npm test         # 74 Unit-Tests (Vitest)
```

---

## 4. Umgebungsvariablen

Datei `.env` (nie committen, ist in `.gitignore`):

| Variable | Beschreibung | Beispiel |
|---|---|---|
| `PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement-ID (optional, leer = kein Analytics) | `G-XXXXXXXXXX` |
| `NOTION_TOKEN` | Notion Integration Secret Token | `secret_xxx...` |
| `NOTION_LEADS_DB_ID` | Notion Datenbank-ID (Leads-DB) | `abc123...` |
| `CONTACT_MAIL_TO` | E-Mail-Empfänger für Kontaktformular | `info@swisslyit.ch` |
| `TRUSTED_PROXY` | IP des Reverse Proxy (Rate-Limiting im PHP) | `127.0.0.1` |

**Hinweis:** `PUBLIC_*`-Variablen sind im Browser sichtbar (GA-ID ist öffentlich). Alle anderen nur serverseitig (im PHP-Handler).

---

## 5. Hostpoint Deployment (statische Dateien)

### 5a. Via SFTP

1. `npm run build` lokal ausführen
2. Inhalt von `dist/` via FileZilla/WinSCP auf den Hostpoint-Webroot hochladen
3. Zielordner: `/httpdocs/` (oder `public_html/` je nach Hostpoint-Plan)
4. `.htaccess` wird automatisch mitgeliefert (liegt in `dist/`)

### 5b. Via Git Deploy (empfohlen)

Hostpoint bietet Git-Deployment an:
1. Repository auf Hostpoint verknüpfen
2. Build-Hook konfigurieren: `npm install && npm run build`
3. Deploy-Pfad: `dist/`

---

## 6. PHP Kontaktformular

### config.php (NICHT committen)

Erstelle auf dem Server (ausserhalb von `httpdocs/`!) eine Datei `config.php`:

```php
<?php
define('NOTION_TOKEN',        'secret_xxx');
define('NOTION_LEADS_DB_ID',  'abc123...');
define('CONTACT_MAIL_TO',     'info@swisslyit.ch');
define('TRUSTED_PROXY',       '127.0.0.1');
```

Der PHP-Handler (`contact-handler.php`) liest diese Datei via:
```php
require_once dirname(__DIR__) . '/config.php';
```

### Notion Leads-Datenbank

Erstelle in Notion eine Datenbank mit diesen Properties:
| Property | Typ |
|---|---|
| Name | Title |
| Firma | Text |
| E-Mail | Email |
| Telefon | Phone |
| Anliegen | Text |
| Quelle | Select (Werte: Kontaktformular, Erstgespräch) |
| Datum | Date |
| IP-Hash | Text |

Gib der Notion Integration (Token) Zugriff auf die Datenbank.

---

## 7. Google Analytics 4

1. GA4-Property auf analytics.google.com anlegen
2. Measurement-ID (G-XXXXXXXXXX) kopieren
3. In `.env` eintragen: `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
4. Neu bauen: `npm run build`

GA4 lädt erst nach expliziter Nutzer-Einwilligung (Consent Mode v2).

---

## 8. SSL / HTTPS

Hostpoint stellt Let's Encrypt SSL kostenlos bereit.
Die `.htaccess` erzwingt HTTPS (HTTP → HTTPS 301) und www → apex-Redirect.

**HSTS aktivieren** (nach 30-tägigem Test-Betrieb):
In `public/.htaccess` diese Zeile auskommentieren:
```apache
# Header always set Strict-Transport-Security "max-age=86400; includeSubDomains"
```
Ersetzen durch:
```apache
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```
Dann auf https://hstspreload.org/ anmelden.

---

## 9. Neue Sprache hinzufügen (i18n-Erweiterung)

Das Projekt ist i18n-vorbereitet (Inhalt in `src/data/*.ts`, Texte nicht hardcoded im Layout).

Schritte:
1. Ordner `src/pages/fr/` anlegen (analog zu `src/pages/`)
2. Daten-Module in `src/data/fr/` anlegen (übersetzte Versionen von `site.ts`, `services.ts` usw.)
3. `astro.config.mjs` um `i18n`-Config erweitern:
   ```js
   i18n: {
     defaultLocale: 'de',
     locales: ['de', 'fr'],
   }
   ```
4. `@astrojs/sitemap` generiert automatisch `<hreflang>` Links
5. Neue `hreflang`-Tags in `Seo.astro` ergänzen

---

## 10. Wartung & Updates

```bash
# Abhängigkeiten aktualisieren
npm update
npm run build
npm test

# Inhalt ändern
# → Dateien in src/data/*.ts editieren
# → Keine Template-Anpassung nötig
```

---

## 11. Checkliste vor Go-Live

- [ ] `.env` auf Hostpoint gesetzt (oder Git-Deploy-Env-Vars)
- [ ] `config.php` auf Server (ausserhalb httpdocs) angelegt
- [ ] Notion Integration Token + DB-ID konfiguriert
- [ ] Formular-Test: Kontakt-Formular absenden → Notion-Eintrag + E-Mail erhalten
- [ ] GA4: Cookie-Banner "Akzeptieren" → GA lädt; "Ablehnen" → kein GA
- [ ] HTTPS-Redirect: http://swisslyit.ch → https://swisslyit.ch ✓
- [ ] www-Redirect: https://www.swisslyit.ch → https://swisslyit.ch ✓
- [ ] Sitemap: https://swisslyit.ch/sitemap-index.xml erreichbar ✓
- [ ] 404-Seite: bei ungültigem Pfad → branded 404 ✓
- [ ] PageSpeed Insights: https://pagespeed.web.dev/?url=https://swisslyit.ch/ → ≥90 überall
- [ ] axe DevTools Browser-Extension: keine kritischen Violations
