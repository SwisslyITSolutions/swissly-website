Baue eine komplette Webseiten-Sektion auf Basis unserer Texte v1.

Argument: $ARGUMENTS = Sektions-Name aus den Texten v1
(z.B. "hero", "was-wir-tun", "wie-wir-arbeiten", "hosting", "cta-mid")

Vorgehen:

1. Lies die Notion-Seite "Swissly Webseite – Texte v1" via Connector
2. Finde den Abschnitt für $ARGUMENTS
3. Baue die Sektion als Astro-Komponente in src/components/sections/

Designvorgaben:

- Engineering-Stil (Briefing v1.1)
- Eyebrow-Label im JetBrains-Mono-Stil (z.B. "// Was wir tun")
- H2-Hauptüberschrift in Geist
- Body in Inter
- Farben aus unserem Designsystem (Navy, Off-White, Gold)
- Mobile-first
- Maximale Container-Breite, ausreichend Padding

Vor dem Bauen:

- CLAUDE.md lesen
- Prüfen ob Sektion schon existiert
- Kurz erklären, was du bauen wirst und um Bestätigung bitten

Nach dem Bauen:

- Datei zeigen
- Erklären wo die Sektion in welcher Page importiert wird
- Ggf. nächste Schritte vorschlagen
