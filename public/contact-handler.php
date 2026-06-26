<?php
/**
 * Swissly IT — Contact Form Handler
 * ===================================
 * Receives the contact / Erstgespräch POST, validates, rate-limits, writes a
 * lead to the Notion Leads DB, sends a notification mail, then redirects.
 *
 * Notion DB property mapping (create these columns in your Notion DB):
 *   Property name  | Notion type   | Notes
 *   ─────────────────────────────────────────────────────────────────
 *   Name           | Title         | Visitor's name (required)
 *   E-Mail         | Email         | Visitor's email (required)
 *   Telefon        | Phone number  | Optional; stored as rich_text fallback
 *   Anliegen       | Rich text     | Free-text message (required)
 *   Betreff        | Rich text     | Subject line (from hidden field or auto)
 *   Status         | Select        | Options: Neu / In Bearbeitung / Erledigt
 *   Quelle         | Select        | Options: Website / Manuell
 *   Datum          | Date          | ISO-8601 timestamp of submission
 *   IP             | Rich text     | Submitter IP (internal; can be hidden)
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                   MANUAL TEST CHECKLIST                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 1. HONEYPOT                                                      │
 * │    curl -X POST https://swisslyit.ch/contact-handler.php \       │
 * │         -d "name=Bot&email=bot@x.ch&anliegen=spam&company_url=x" │
 * │    → Expected: HTTP 302 → /kontakt/danke/  (no Notion/mail)     │
 * │                                                                  │
 * │ 2. VALIDATION — missing required field                           │
 * │    curl -X POST … -d "name=&email=x@y.ch&anliegen=hi"           │
 * │    → Expected: HTTP 302 → /kontakt/?error=validation             │
 * │                                                                  │
 * │ 3. VALIDATION — bad email format                                 │
 * │    curl -X POST … -d "name=Hans&email=not-an-email&anliegen=hi" │
 * │    → Expected: HTTP 302 → /kontakt/?error=validation             │
 * │                                                                  │
 * │ 4. RATE-LIMIT (3 req/min per IP)                                 │
 * │    Send 4 valid POSTs within 60 s from the same IP               │
 * │    → Expected: 4th returns HTTP 429, body "Too many requests…"   │
 * │                                                                  │
 * │ 5. NOTION WRITE                                                  │
 * │    Submit a valid form. Check Notion DB "Leads" for new page:    │
 * │    - Name, E-Mail, Telefon, Anliegen, Betreff filled             │
 * │    - Status = "Neu", Quelle = "Website", Datum set               │
 * │                                                                  │
 * │ 6. NOTIFICATION MAIL                                             │
 * │    On success, check CONTACT_MAIL_TO inbox for mail with         │
 * │    subject "[Swissly] <Betreff> von <Name>"                      │
 * │                                                                  │
 * │ 7. SUCCESS REDIRECT                                              │
 * │    On valid form submission → HTTP 302 → /kontakt/danke/         │
 * └─────────────────────────────────────────────────────────────────┘
 */

declare(strict_types=1);

// ─── Config ──────────────────────────────────────────────────────────────────
// Secrets come from environment variables (set on the server) or from a local
// config.php (never committed — see config.php.example).
$configFile = __DIR__ . '/config.php';
if (is_file($configFile)) {
    /** @noinspection PhpIncludeInspection */
    require $configFile;
}

$notionToken  = getenv('NOTION_TOKEN')       ?: (defined('NOTION_TOKEN')       ? NOTION_TOKEN       : '');
$notionDbId   = getenv('NOTION_LEADS_DB_ID') ?: (defined('NOTION_LEADS_DB_ID') ? NOTION_LEADS_DB_ID : '');
$mailTo       = getenv('CONTACT_MAIL_TO')    ?: (defined('CONTACT_MAIL_TO')    ? CONTACT_MAIL_TO    : '');
// Comma-separated list of trusted reverse-proxy IPs (REMOTE_ADDR values).
// Empty by default ⇒ X-Forwarded-For is ignored entirely.
$trustedProxy = getenv('TRUSTED_PROXY')      ?: (defined('TRUSTED_PROXY')      ? TRUSTED_PROXY      : '');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function swissly_redirect(string $url): never
{
    header('Location: ' . $url, true, 302);
    exit;
}

function swissly_error(string $reason): never
{
    swissly_redirect('/kontakt/?error=' . urlencode($reason));
}

// ─── Method gate ─────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    swissly_redirect('/kontakt/');
}

// ─── Honeypot ────────────────────────────────────────────────────────────────
// If the hidden company_url field is non-empty, a bot filled it in.
// Respond with a benign redirect so automated scanners get no useful signal.
if (!empty($_POST['company_url'])) {
    swissly_redirect('/kontakt/danke/');
}

// ─── Client IP resolution ────────────────────────────────────────────────────
// Threat model: X-Forwarded-For is a client-supplied header. Trusting it lets an
// attacker forge a new IP per request and bypass the rate-limit (and poison the
// IP we store to Notion). So we ONLY honour the first XFF entry when the direct
// peer (REMOTE_ADDR) is a configured trusted proxy. Otherwise we use REMOTE_ADDR.
$remoteAddr = (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
$clientIp   = $remoteAddr;
if ($trustedProxy !== '') {
    $trusted = array_map('trim', explode(',', $trustedProxy));
    if (in_array($remoteAddr, $trusted, true) && !empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // First entry in XFF is the originating client (proxy appends itself last).
        $clientIp = trim((string) explode(',', (string) $_SERVER['HTTP_X_FORWARDED_FOR'])[0]);
    }
}
$ip = preg_replace('/[^0-9a-fA-F.:_-]/', '', $clientIp);
if ($ip === '') {
    $ip = '0.0.0.0';
}

// ─── Rate-limit (file-based; per IP; max 3 requests per 60 s) ───────────────
$rlDir  = rtrim(sys_get_temp_dir(), '/\\') . DIRECTORY_SEPARATOR . 'swissly_rl';
if (!is_dir($rlDir)) {
    @mkdir($rlDir, 0700, true);
}
$rlFile  = $rlDir . DIRECTORY_SEPARATOR . 'ip_' . md5($ip) . '.json';
$now     = time();
$window  = 60;
$maxReq  = 3;
$history = [];
if (is_file($rlFile)) {
    $decoded = json_decode((string) file_get_contents($rlFile), true);
    $history = is_array($decoded) ? $decoded : [];
}
// Keep only entries within the current window
$history = array_values(array_filter($history, static fn(int $t): bool => $t > $now - $window));
if (count($history) >= $maxReq) {
    $retryAfter = max(1, ($history[0] + $window) - $now);
    http_response_code(429);
    header('Retry-After: ' . $retryAfter);
    exit('Zu viele Anfragen. Bitte warten Sie eine Minute und versuchen Sie es erneut.');
}
$history[] = $now;
file_put_contents($rlFile, json_encode($history), LOCK_EX);

// ─── Validate ────────────────────────────────────────────────────────────────
$name     = trim((string) ($_POST['name']     ?? ''));
$email    = trim((string) ($_POST['email']    ?? ''));
$telefon  = trim((string) ($_POST['telefon']  ?? ''));
$anliegen = trim((string) ($_POST['anliegen'] ?? ''));
$betreff  = trim((string) ($_POST['betreff']  ?? ''));
$subject  = $betreff !== '' ? $betreff : 'Neue Kontaktanfrage';

if ($name === '' || $email === '' || $anliegen === '') {
    swissly_error('validation');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    swissly_error('validation');
}

// Enforce consent checkbox — must be present and non-empty (browsers send the value when checked).
if (empty($_POST['consent'])) {
    swissly_error('validation');
}

// Truncate inputs to reasonable limits
$name     = mb_substr($name,     0, 200, 'UTF-8');
$email    = mb_substr($email,    0, 254, 'UTF-8');
$telefon  = mb_substr($telefon,  0,  50, 'UTF-8');
$anliegen = mb_substr($anliegen, 0, 4000, 'UTF-8');
$subject  = mb_substr($subject,  0, 200, 'UTF-8');

// ─── Notion API ──────────────────────────────────────────────────────────────
if ($notionToken !== '' && $notionDbId !== '') {
    /**
     * POST a new page to the Notion Leads DB.
     *
     * Notion property types used:
     *   title      → Name (required title column)
     *   email      → E-Mail
     *   rich_text  → Telefon, Anliegen, Betreff, IP
     *   select     → Status ("Neu"), Quelle ("Website")
     *   date       → Datum (ISO 8601)
     */
    $payload = [
        'parent'     => ['database_id' => $notionDbId],
        'properties' => [
            'Name' => [
                'title' => [['text' => ['content' => $name]]],
            ],
            'E-Mail' => [
                'email' => $email,
            ],
            'Telefon' => [
                'rich_text' => [['text' => ['content' => $telefon]]],
            ],
            'Anliegen' => [
                'rich_text' => [['text' => ['content' => $anliegen]]],
            ],
            'Betreff' => [
                'rich_text' => [['text' => ['content' => $subject]]],
            ],
            'Status' => [
                'select' => ['name' => 'Neu'],
            ],
            'Quelle' => [
                'select' => ['name' => 'Website'],
            ],
            'Datum' => [
                'date' => ['start' => date('c')],
            ],
            'IP' => [
                'rich_text' => [['text' => ['content' => $ip]]],
            ],
        ],
    ];

    $ch = curl_init('https://api.notion.com/v1/pages');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $notionToken,
            'Notion-Version: 2022-06-28',
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS     => (string) json_encode($payload),
    ]);
    $notionResponse = curl_exec($ch);
    // We do not block on Notion errors — the visitor still receives a redirect.
    if ($notionResponse === false) {
        error_log('[contact-handler] Notion curl_exec failed: ' . curl_error($ch));
    } else {
        $notionHttpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($notionHttpCode < 200 || $notionHttpCode >= 300) {
            error_log('[contact-handler] Notion API returned HTTP ' . $notionHttpCode . ': ' . $notionResponse);
        }
    }
    curl_close($ch);
}

// ─── Notification mail ───────────────────────────────────────────────────────
if ($mailTo !== '') {
    $mailSubject = '[Swissly] ' . $subject . ' von ' . $name;
    $mailBody    = implode("\n", [
        'Neue Kontaktanfrage via swisslyit.ch',
        str_repeat('─', 45),
        'Name:     ' . $name,
        'E-Mail:   ' . $email,
        'Telefon:  ' . ($telefon !== '' ? $telefon : '—'),
        '',
        'Anliegen:',
        $anliegen,
        '',
        str_repeat('─', 45),
        'IP:    ' . $ip,
        'Zeit:  ' . date('d.m.Y H:i:s T'),
    ]);
    $headers = implode("\r\n", [
        'From: noreply@swisslyit.ch',
        'Reply-To: ' . $email,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: PHP/' . PHP_VERSION,
    ]);
    $mailOk = mail($mailTo, '=?UTF-8?B?' . base64_encode($mailSubject) . '?=', $mailBody, $headers);
    if ($mailOk === false) {
        error_log('[contact-handler] mail() failed for recipient ' . $mailTo);
    }
}

// ─── Success ─────────────────────────────────────────────────────────────────
swissly_redirect('/kontakt/danke/');
