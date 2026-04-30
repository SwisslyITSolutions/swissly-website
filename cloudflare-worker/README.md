# Swissly Contact Worker

Cloudflare Worker, der Kontaktformular-Submissions entgegennimmt und als Lead in der Notion-`📨 Leads`-Datenbank anlegt.

## Architektur

```
Browser (swisslyit.ch/kontakt)
      │ POST JSON
      ▼
Cloudflare Worker (api.swisslyit.ch/contact)
      │ Notion API
      ▼
Notion Leads-DB
```

## Einmaliges Setup

### 1. Notion-Integration anlegen

1. https://www.notion.so/profile/integrations → **New integration**
2. Name: `Swissly Contact Form`
3. Type: **Internal**
4. Workspace: Swissly
5. Capabilities: nur **Insert content** (Read + Update braucht es nicht)
6. **Save** → Token kopieren (`ntn_xxx...`) — **niemals committen**, sondern nur lokal in `.dev.vars` oder via `wrangler secret put` setzen

### 2. Datenbank mit Integration teilen

1. In Notion zur `📨 Leads`-Datenbank navigieren
2. Oben rechts `…` → **Connections** → **Swissly Contact Form** hinzufügen

### 3. Wrangler installieren + einloggen

```bash
cd cloudflare-worker
npm install
npx wrangler login
```

### 4. Secrets setzen

```bash
npx wrangler secret put NOTION_TOKEN
# → secret_xxx... einfügen

npx wrangler secret put LEADS_DATABASE_ID
# → b25acf939c5640f9b6d1be29c7a26f44
```

### 5. Deploy

```bash
npm run deploy
```

Wrangler gibt die Worker-URL aus, z.B. `https://swissly-contact.<subdomain>.workers.dev`.

### 6. Astro-Seite konfigurieren

In Repo-Root `.env`-Datei anlegen (siehe `.env.example`):

```
PUBLIC_CONTACT_ENDPOINT=https://swissly-contact.<subdomain>.workers.dev
```

`npm run build` neu bauen + deployen.

### 7. (Optional) Eigene Domain

In `wrangler.toml` die `[[routes]]`-Sektion auskommentieren und an Cloudflare-DNS koppeln:

```toml
[[routes]]
pattern = "api.swisslyit.ch/contact"
custom_domain = true
```

Dann nochmal `npm run deploy`.

## Lokal testen

```bash
cp .dev.vars.example .dev.vars
# .dev.vars bearbeiten und echten NOTION_TOKEN einsetzen

npm run dev
# Worker läuft auf http://localhost:8787
```

Test-Submit:

```bash
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test Tester",
    "email":"test@example.ch",
    "nachricht":"Das ist eine Testnachricht von der lokalen Worker-Instanz.",
    "thema":["webseite"],
    "website":""
  }'
```

Sollte `{"ok":true}` zurückgeben und einen Lead in Notion anlegen.

## Logs ansehen

```bash
npm run tail
```

## Field-Mapping

| Form-Feld   | Notion-Property              | Notion-Typ   |
| ----------- | ---------------------------- | ------------ |
| `name`      | `Lead`                       | title        |
| `firma`     | `Firma`                      | text         |
| `email`     | `E-Mail`                     | email        |
| `telefon`   | `Telefon`                    | phone_number |
| `thema[]`   | `Anfrage-Typ`                | multi_select |
| `nachricht` | `Nachricht`                  | text         |
| (auto)      | `Quelle = "Kontaktformular"` | select       |
| (auto)      | `Status = "Neu"`             | select       |
| (auto)      | `Eingangsdatum = heute`      | date         |

`thema`-Werte werden gemappt: `webseite → Neue Webseite`, `redesign → Redesign`, `webshop → Webshop`, `wartung → Wartung`, `seo → SEO`, `sonstiges → Sonstiges`.

## Anti-Spam

Honeypot-Feld `website`: wenn ausgefüllt → Worker antwortet `{ok:true}` ohne Notion-Aufruf (Bot ist getäuscht).
