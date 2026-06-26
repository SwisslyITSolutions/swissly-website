# Google Analytics 4 einrichten — Anleitung

Ziel: eine GA4-Property für **swisslyit.ch** erstellen, die **Mess-ID** (`G-XXXXXXXXXX`)
holen und an mich geben. Ich baue die Seite damit neu und deploye sie → danach läuft das
Besucher-Tracking.

> Wichtig: Die Website hat bereits einen **Cookie-Consent-Banner** mit **Google Consent
> Mode v2**. GA wird **erst geladen, wenn ein Besucher „Akzeptieren" klickt** — vorher
> werden keine Daten an Google gesendet. IP-Adressen werden anonymisiert. Das ist
> DSG/DSGVO-konform; ihr müsst dafür nichts weiter einstellen.

---

## Schritt 1 — Google-Konto / Analytics öffnen
1. Gehe zu **https://analytics.google.com** und melde dich mit dem gewünschten
   Google-Konto an (am besten ein Firmen-Google-Konto, z. B. für Swissly).
2. Falls noch kein Analytics-Konto existiert: **„Mit der Messung beginnen"** klicken.

## Schritt 2 — Konto anlegen (falls nötig)
- **Kontoname:** z. B. „Swissly IT Solutions".
- Datenfreigabe-Einstellungen: Standard belassen (oder nach Wunsch anpassen) → Weiter.

## Schritt 3 — Property anlegen
- **Property-Name:** z. B. „swisslyit.ch".
- **Zeitzone:** (GMT+01:00) Zürich.
- **Währung:** Schweizer Franken (CHF).
- Weiter → Branche/Grösse ausfüllen (beliebig) → Erstellen, Nutzungsbedingungen akzeptieren.

## Schritt 4 — Datenstream „Web" erstellen
1. Beim Schritt **„Datenerhebung"** / Plattform: **Web** wählen.
2. **Website-URL:** `https://swisslyit.ch`
3. **Stream-Name:** z. B. „Swissly Website".
4. **„Stream erstellen"** klicken.

## Schritt 5 — Mess-ID kopieren ⭐
Nach dem Erstellen zeigt der Stream oben rechts die **Mess-ID** im Format:

```
G-XXXXXXXXXX
```

👉 **Diese Mess-ID brauche ich.** (Sie ist nicht geheim — sie darf in den Chat.)
Falls du sie später suchst: Analytics → **Verwaltung** (Zahnrad) → **Datenstreams** →
deinen Web-Stream anklicken → oben rechts steht die **Mess-ID**.

## Schritt 6 — An mich geben
Schick mir einfach die `G-XXXXXXXXXX`. Dann:
- baue ich die Seite mit `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` neu,
- deploye sie auf swisslyit.ch,
- und das Tracking ist aktiv (nach Cookie-Zustimmung der Besucher).

## Schritt 7 — Prüfen (nach dem Deploy)
- In GA4: **Berichte → Echtzeit**. Öffne swisslyit.ch in einem zweiten Tab, klicke im
  Cookie-Banner **„Akzeptieren"** → du solltest dich nach ~30 Sek. als aktiver Nutzer sehen.
- Tipp: Wenn du **„Ablehnen"** klickst, darf **nichts** in Echtzeit erscheinen — so siehst
  du, dass der Consent-Mechanismus greift.

---

## Bonus: Google Search Console (für SEO empfohlen)
Damit Google die neue Seite sauber crawlt/indexiert:
1. **https://search.google.com/search-console** → Property hinzufügen → **Domain** `swisslyit.ch`
   (oder URL-Präfix `https://swisslyit.ch`).
2. Inhaberschaft bestätigen (DNS-TXT-Eintrag bei Hostpoint, oder über das verknüpfte
   GA4-Konto — am einfachsten, wenn GA4 schon eingerichtet ist).
3. **Sitemap einreichen:** `https://swisslyit.ch/sitemap-index.xml`.

Sag Bescheid, wenn du bei einem Schritt Hilfe brauchst oder die Mess-ID hast.
