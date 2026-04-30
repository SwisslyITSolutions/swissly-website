Erstelle eine neue Astro-Komponente. Argumente: $ARGUMENTS

Format der Argumente: <Speicherort> <ComponentName>
Mögliche Speicherorte:

- "ui" → src/components/ui/<ComponentName>.astro (atomar, z.B. Button)
- "section" → src/components/sections/<ComponentName>.astro (Seiten-Sektion)
- "layout" → src/layouts/<ComponentName>.astro (Layout)

Falls kein Speicherort angegeben → frag nach.

Anforderungen für jede Komponente:

- TypeScript strict
- Props-Interface explizit definiert
- Mindestens eine semantische Prop (z.B. headline, title)
- Default-Werte für alle Props
- Tailwind-Klassen aus unserem Designsystem (CLAUDE.md, Briefing v1.1)
- Schweizer Konvention in Texten (ss statt ß)
- Keine inline-styles, keine externen UI-Libraries
- Mobile-first responsive

Vor dem Erstellen:

1. CLAUDE.md lesen für Konventionen
2. Prüfen ob Komponente schon existiert (Konflikt vermeiden)

Nach dem Erstellen:

- Kurze Zusammenfassung was gebaut wurde
- Hinweis, wo die Komponente importiert werden muss
