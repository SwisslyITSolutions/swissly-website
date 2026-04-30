interface Env {
  NOTION_TOKEN: string;
  LEADS_DATABASE_ID: string;
  ALLOWED_ORIGIN: string;
}

interface ContactPayload {
  name?: string;
  firma?: string;
  email?: string;
  telefon?: string;
  thema?: string[];
  nachricht?: string;
  website?: string;
}

const THEMA_TO_NOTION: Record<string, string> = {
  webseite: "Neue Webseite",
  redesign: "Redesign",
  webshop: "Webshop",
  wartung: "Wartung",
  seo: "SEO",
  sonstiges: "Sonstiges",
};

function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(body: unknown, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin),
    },
  });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function createNotionLead(
  env: Env,
  payload: ContactPayload,
): Promise<void> {
  const themaLabels = (payload.thema ?? [])
    .map((value) => THEMA_TO_NOTION[value])
    .filter(Boolean)
    .map((name) => ({ name }));

  const properties: Record<string, unknown> = {
    Lead: {
      title: [{ text: { content: payload.name ?? "Unbekannt" } }],
    },
    "E-Mail": {
      email: payload.email ?? null,
    },
    Nachricht: {
      rich_text: [{ text: { content: payload.nachricht ?? "" } }],
    },
    Quelle: {
      select: { name: "Kontaktformular" },
    },
    Status: {
      select: { name: "Neu" },
    },
    Eingangsdatum: {
      date: { start: new Date().toISOString().split("T")[0] },
    },
  };

  if (payload.firma) {
    properties.Firma = { rich_text: [{ text: { content: payload.firma } }] };
  }
  if (payload.telefon) {
    properties.Telefon = { phone_number: payload.telefon };
  }
  if (themaLabels.length > 0) {
    properties["Anfrage-Typ"] = { multi_select: themaLabels };
  }

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: env.LEADS_DATABASE_ID },
      properties,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Notion API ${response.status}: ${errorText}`);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowedOrigins = (env.ALLOWED_ORIGIN || "https://swisslyit.ch")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const requestOrigin = request.headers.get("Origin") ?? "";
    const origin = allowedOrigins.includes(requestOrigin)
      ? requestOrigin
      : allowedOrigins[0];

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return jsonResponse(
        { ok: false, error: "Method not allowed" },
        405,
        origin,
      );
    }

    let payload: ContactPayload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: "Invalid JSON" }, 400, origin);
    }

    if (payload.website && payload.website.length > 0) {
      return jsonResponse({ ok: true }, 200, origin);
    }

    if (!payload.name || payload.name.trim().length < 2) {
      return jsonResponse({ ok: false, error: "Name fehlt" }, 400, origin);
    }
    if (!payload.email || !isValidEmail(payload.email)) {
      return jsonResponse(
        { ok: false, error: "Ungültige E-Mail" },
        400,
        origin,
      );
    }
    if (!payload.nachricht || payload.nachricht.trim().length < 10) {
      return jsonResponse(
        { ok: false, error: "Nachricht zu kurz" },
        400,
        origin,
      );
    }

    try {
      await createNotionLead(env, payload);
      return jsonResponse({ ok: true }, 200, origin);
    } catch (error) {
      console.error("Notion error:", error);
      return jsonResponse(
        {
          ok: false,
          error:
            "Speichern fehlgeschlagen. Bitte E-Mail an info@swisslyit.ch senden.",
        },
        500,
        origin,
      );
    }
  },
} satisfies ExportedHandler<Env>;
