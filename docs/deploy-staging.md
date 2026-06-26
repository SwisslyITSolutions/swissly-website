# Staging-Deploy → test.swisslyit.ch

Ziel: die neue Seite unter `https://test.swisslyit.ch` veröffentlichen, während die alte
Seite auf `swisslyit.ch` unverändert online bleibt. Der Staging-Build ist bewusst
**nicht indexierbar** (`noindex` auf allen Seiten + `robots.txt: Disallow /`), damit Google
die Testseite nicht erfasst und das Ranking der echten Seite nicht beeinträchtigt.

## 1. Staging-Build erzeugen
```bash
PUBLIC_SITE_URL=https://test.swisslyit.ch PUBLIC_STAGING=1 npm run build
```
Ergebnis: `dist/` mit korrekten test-URLs, `noindex` überall, `robots.txt = Disallow /`.
Ein fertiges Upload-Paket liegt bereits auf dem Desktop: **`swissly-test-build.zip`**.

## 2. Subdomain in Hostpoint anlegen (einmalig, im Hostpoint Control Panel)
1. Hostpoint Login → **Domains & DNS** → Subdomain hinzufügen: `test.swisslyit.ch`.
2. Als Dokument-Wurzel (Webroot) z. B. `/test.swisslyit.ch/` oder `/www/test/` wählen
   (ein **eigener** Ordner, getrennt von der Live-Seite!).
3. **SSL-Zertifikat** für die Subdomain aktivieren (Let's Encrypt, in Hostpoint 1 Klick).
   So funktioniert die HTTPS-Erzwingung in der `.htaccess`.

## 3. Dateien hochladen (eine der Optionen)

### A) Hostpoint File Manager (am einfachsten, keine Zugangsdaten nötig)
1. Control Panel → **File Manager** → in den Subdomain-Ordner wechseln.
2. `swissly-test-build.zip` hochladen → im File Manager **entpacken**.
3. Sicherstellen, dass `index.html` und `.htaccess` direkt im Webroot liegen
   (nicht in einem Unterordner `dist/`). Versteckte Dateien einblenden, damit `.htaccess` sichtbar ist.

### B) SFTP (z. B. WinSCP / FileZilla, oder Kommandozeile)
- Host: `<dein-hostpoint-server>` (z. B. `sXX.web.hostpoint.ch`), Port 22, Protokoll SFTP.
- Den **Inhalt** von `dist/` in den Subdomain-Webroot übertragen (inkl. `.htaccess`).
- Kommandozeile (Beispiel, interaktiv mit Passwort):
  ```bash
  cd dist && sftp BENUTZER@sXX.web.hostpoint.ch
  # im sftp-Prompt:  put -r .   (Zielordner vorher mit  cd  wählen)
  ```

## 4. Formular auf der Testseite
Das Kontaktformular postet zu `/contact-handler.php`. Auf der Testseite funktioniert es nur,
wenn dort `config.php` mit Notion-Token + Leads-DB hinterlegt ist (siehe `docs/deployment.md`).
Für eine reine optische Vorschau ist das nicht nötig — ohne `config.php` schlägt der Versand
einfach fehl (die Seite selbst bleibt voll funktionsfähig).

## 5. Optional: Testseite mit Passwort schützen (empfohlen)
Zusätzlich zu `noindex` kann die ganze Subdomain per HTTP-Basic-Auth geschützt werden.
In die `.htaccess` (oben) einfügen und eine `.htpasswd` anlegen:
```apache
AuthType Basic
AuthName "Swissly Staging"
AuthUserFile /absoluter/pfad/zu/.htpasswd
Require valid-user
```
`.htpasswd` erzeugt man in Hostpoint (Verzeichnisschutz) oder via `htpasswd -c .htpasswd benutzer`.

## Produktiv-Build (später, für swisslyit.ch)
```bash
npm run build      # nutzt die Defaults: site=https://swisslyit.ch, indexierbar
```
