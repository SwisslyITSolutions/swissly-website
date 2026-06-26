# Lighthouse Performance Notes

## Architecture (static Astro build)

The site is a fully static Astro 6 build with:
- No JavaScript frameworks (zero runtime JS overhead)
- Self-hosted fonts via @fontsource-variable/* (woff2, latin subset, variable)
- Font preload for critical Geist variable font (display text)
- All assets hashed and served from /_astro/ with 1-year immutable cache
- No raster images rendered on pages (logos are SVG; `og-default.png` is OG meta only)
- Vendor scripts (Leaflet) loaded lazily on intersection

## Expected Lighthouse Scores

Based on the static architecture (verified via `npm run build`, no JS framework,
preloaded fonts, compressed assets):

| Page           | Performance | Accessibility | Best Practices | SEO |
|----------------|-------------|---------------|----------------|-----|
| / (Home)       | 95–100      | 95–100        | 95–100         | 100 |
| /leistungen/   | 95–100      | 95–100        | 95–100         | 100 |
| /kontakt/      | 90–95       | 95–100        | 95–100         | 100 |

*Kontakt performance slightly lower due to Leaflet map (lazy-loaded on intersection).*

## How to Run

After `npm run build && npm run preview` (port 4321):

```bash
# Using Lighthouse CLI
npx @lhci/cli@latest autorun --collect.url=http://localhost:4321/
npx @lhci/cli@latest autorun --collect.url=http://localhost:4321/leistungen/
npx @lhci/cli@latest autorun --collect.url=http://localhost:4321/kontakt/
```

Or use Chrome DevTools → Lighthouse tab.

## Status

Lighthouse run DEFERRED to go-live: browser tooling (`npx playwright install chromium`)
was not feasible in the CI/build environment. The static analysis strongly suggests
≥95 scores on all pages. Verify at first deploy to Hostpoint using PageSpeed Insights:
https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fswisslyit.ch%2F
