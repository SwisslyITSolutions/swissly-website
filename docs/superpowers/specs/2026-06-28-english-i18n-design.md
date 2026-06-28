# Design-Spec: Englische Version der Swissly-Website (i18n)

**Datum:** 2026-06-28
**Status:** Entwurf — zur Freigabe
**Ziel:** Die bestehende deutsche Astro-Website zweisprachig machen (Deutsch + Englisch), Englisch unter `swisslyit.ch/en/`.

---

## 1. Festgelegte Entscheidungen

| Thema | Entscheidung |
|---|---|
| **URL-Struktur** | Englisch als Unterordner: `swisslyit.ch/en/…`. Deutsch bleibt auf `swisslyit.ch/…`. Eine Domain, ein Hosting, ein SSL. |
| **Standardsprache** | Deutsch. Kein automatischer Redirect. |
| **Sprachwahl** | Manueller `DE | EN`-Umschalter im Header. |
| **Englisch-Variante** | Britisch/international (organisation, optimise, centre). |
| **Übersetzung** | Durch Claude; Schweizer Kontext bleibt erhalten (TWINT, KMU, Zentralschweiz, CHF). User kann nachpolieren. |
| **Umfang EN** | Startseite, Leistungen + 7 Unterseiten, Über uns, FAQ, Kontakt, Erstgespräch, 404, Danke + alle UI-Texte. |
| **Nicht übersetzt** | AGB, Datenschutz, Impressum (rechtlich in CH massgeblich, bleiben Deutsch). EN-Links dorthin führen auf die DE-Version. |

---

## 2. Architektur

### 2.1 Routing
Astro natives i18n:
```js
i18n: {
  defaultLocale: 'de',
  locales: ['de', 'en'],
  routing: { prefixDefaultLocale: false }, // DE auf /, EN auf /en/
}
```
`trailingSlash: 'always'` bleibt → EN-URLs z. B. `/en/leistungen/webseiten/`.

### 2.2 Übersetzungs-Organisation
Zwei Quellen, beide werden sprachfähig:

1. **UI-Strings** (in Komponenten eingebetteter Text: Menü, Footer, Button-Labels, Eyebrows, Sektions-Überschriften/Intros, Cookie-Banner, StatusBar) → zentrales Dictionary `src/i18n/ui.ts` als `{ de: {...}, en: {...} }` mit Helper `t(lang, key)`. Komponenten erhalten eine `lang`-Prop.

2. **Inhalts-Daten** (`data/services.ts`, `faq.ts`, `team.ts`, `careplans.ts`, `pricing.ts`, `process.ts`, `site.ts` Werte) → pro Sprache über einen Accessor `getX(lang)`. Genaue Datei-Form (erweiterte Struktur vs. `data/en/`-Kopien) wird im Implementierungsplan festgelegt; Kriterium: minimale Brüche an bestehenden Imports, gute Wartbarkeit.

### 2.3 Seiten
- `src/pages/` = Deutsch (unverändert).
- `src/pages/en/` = englische Varianten. Jede ist ein dünner Wrapper, der dieselben Sektions-Komponenten mit `lang='en'` rendert und EN-Daten zieht. Kein dupliziertes Markup-Layout.

### 2.4 Layout & SEO (`BaseLayout.astro`, `Seo.astro`)
Beide werden `lang`-fähig:
- `<html lang>` → `de-CH` bzw. `en`.
- `og:locale` → `de_CH` bzw. `en_GB`.
- `hreflang`-Alternates: jede Seite verweist auf ihr Gegenstück (`de` ↔ `en`) plus `x-default` (Deutsch).
- `canonical` pro Sprachversion.
- Sitemap enthält beide Sprachen (mit hreflang).

### 2.5 Sprachumschalter
Neue Komponente im Header (und ggf. Footer): `DE | EN`. Verlinkt auf die **gleiche** Seite in der anderen Sprache (Pfad-Mapping DE↔EN). Auf rein-deutschen Seiten (Legal) wird EN ausgeblendet oder zeigt auf die DE-Seite.

### 2.6 Kontaktformular
- EN-Kontaktseite + EN-Danke-Seite.
- `contact-handler.php` (in `public/`) bekommt ein `lang`-Feld → sprachrichtige Bestätigung/Redirect auf `/en/kontakt/danke/`. Separates Deploy (PHP liegt im Webroot).

---

## 3. Vorgehen (Phasen)

1. **Gerüst** — i18n-Config, `src/i18n/ui.ts` + `t()`-Helper, `lang`-Prop-Konvention, `BaseLayout`/`Seo` lang-fähig, Sprachumschalter. **Verifiziert an der Startseite** (DE unverändert + EN live).
2. **Inhalte** — Übersetzung + EN-Seiten, Seite für Seite: Startseite → Leistungen (+7) → Über uns → FAQ → Kontakt → Erstgespräch → 404/Danke.
3. **Formular** — EN-Kontakt/Danke + PHP-Handler-Anpassung.
4. **Abschluss** — Sitemap/hreflang verifizieren, Build + 140 Tests + Browser-Check (DE + EN, Desktop + Mobile inkl. Sprachumschalter), dann Deploy-Paket.

Nach jeder Phase Build + Tests grün; DE-Seiten dürfen sich nie verändern.

---

## 4. Nebenarbeiten
- DE-Header „Datenschutz ist kein **Afterthought**" → deutsche Formulierung (Anglizismus raus), passend zum Klartext-Anspruch.

## 5. Risiken / Offene Punkte
- **Hauptaufwand** ist das Lösen des in Komponenten eingebetteten Texts (UI-Strings) — sorgfältig, damit DE-Darstellung 1:1 bleibt.
- **Übersetzungsqualität:** Claude liefert vollständige EN-Fassung; finale Politur durch den User möglich.
- **PHP-Handler** wird angepasst und separat deployed (kein Astro-Build).
- **Legal-Links aus EN-Seiten:** zeigen bewusst auf DE — im EN-Footer als solche kennzeichnen („Legal notice (German)").

---

## 6. Erfolgskriterien
- `swisslyit.ch/en/` und alle EN-Unterseiten erreichbar, vollständig auf Englisch, kein deutscher Resttext.
- Deutsche Seiten unverändert (Inhalt + Optik).
- Sprachumschalter wechselt korrekt seitengenau in beide Richtungen.
- `hreflang`/`lang`/`og:locale`/Sitemap pro Sprache korrekt.
- Kontaktformular funktioniert in beiden Sprachen.
- Build sauber, 140 Tests grün, Browser-Check DE+EN ok.
