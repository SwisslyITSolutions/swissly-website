Analysiere die aktuelle Webseiten-Performance.

Schritte:

1. Build erstellen: `npm run build`
2. Preview starten: `npm run preview`
3. Hinweise geben, welche Metriken in Lighthouse zu prüfen sind:
   - Performance (Ziel: 95+)
   - Accessibility (Ziel: 100)
   - Best Practices (Ziel: 100)
   - SEO (Ziel: 100)
4. Code-seitig analysieren, was optimierbar ist:
   - Bilder zu gross?
   - JavaScript-Bundles unnötig schwer?
   - Render-blocking CSS?
   - Fonts-Loading-Strategie?
5. Konkrete Empfehlungen für Optimierungen

Wichtig: Wir wollen Performance auf Hostpoint Smart Webhosting halten,
also keine SSR-Empfehlungen. Static-Mode bleibt.
