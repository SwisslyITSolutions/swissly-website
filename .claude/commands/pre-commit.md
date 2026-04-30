Prüfe den aktuellen Staging-Bereich vor einem Git-Commit.

Schritte:

1. Liste alle staged files (git diff --cached --name-only)
2. Pro Datei prüfen:
   - Keine console.log oder debugger statements
   - Keine TODO-Kommentare ohne Begründung
   - Keine vergessenen .env-Werte oder API-Keys im Code
   - Tailwind-Klassen sind sauber (keine inline-styles)
   - TypeScript-Types sind sauber (kein `any`)
3. Lokalen Build testen: `npm run build`
4. Falls Build erfolgreich: Vorschlag für Commit-Message im Conventional-Commits-Stil
   (feat:, fix:, docs:, style:, refactor:, test:, chore:)
5. Falls Build scheitert: Fehler analysieren und Fix vorschlagen

Ergebnis: Klare Empfehlung "ready to commit" oder "fix erst diese Dinge".
