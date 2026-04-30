/**
 * EkonomOS contact endpoint — Cloudflare Pages Function
 *
 * INSTRUKCE:
 *   1. Zkopíruj tento soubor do velyos-web repo jako:
 *      functions/api/ekonomos-contact.ts
 *   2. Cloudflare Pages dashboard → velyos-web → Settings → Environment variables:
 *      Už máš nastavené (z diagnostika endpointu):
 *        - BREVO_API_KEY
 *        - SHEET_WEBHOOK_URL
 *        - SHEET_WEBHOOK_SECRET
 *      Nové (volitelné, defaulty viz konstanty níže):
 *        - EKONOMOS_NOTIFY_EMAIL (default: stepan@velyos.cz)
 *        - EKONOMOS_FROM_EMAIL (default: noreply@velyos.cz)
 *   3. Push do main → Cloudflare Pages auto-deploy → endpoint dostupný na
 *      https://velyos.cz/api/ekonomos-contact
 *   4. V ekonomos repo .env.local přidej:
 *      NEXT_PUBLIC_CONTACT_ENDPOINT=https://velyos.cz/api/ekonomos-contact
 *
 * Co endpoint dělá:
 *   - Validuje payload (rate limit, honeypot, min/max délky)
 *   - Posílá email Štěpánovi přes Brevo
 *   - Append do Google Sheet "EKONOMOS LEADS" (přes Apps Script webhook)
 *   - Vrací JSON { ok: true } nebo { ok: false, error: "..." }
 *   - CORS: povoleno pro ekonomos.velyos.cz + localhost:3000 (dev)
 */

interface Env {
  BREVO_API_KEY: string;
  SHEET_WEBHOOK_URL: string;
  SHEET_WEBHOOK_SECRET: string;
  EKONOMOS_NOTIFY_EMAIL?: string;
  EKONOMOS_FROM_EMAIL?: string;
  RATE_LIMIT?: KVNamespace;
}

const ALLOWED_ORIGINS = [
  "https://ekonomos.velyos.cz",
  "https://velyos.cz",
  "http://localhost:3000",
  "http://localhost:3001",
];

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SEC = 600;

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

interface Payload {
  name?: string;
  email?: string;
  company?: string;
  inquiry?: string;
  message?: string;
  source?: string;
  // honeypot (pokud je vyplněný, je to bot)
  website?: string;
}

function validate(p: Payload): string | null {
  if (p.website && p.website.length > 0) return "spam-detected";
  if (!p.name || p.name.length < 2 || p.name.length > 120) return "invalid-name";
  if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return "invalid-email";
  if (!p.message || p.message.length < 5 || p.message.length > 5000) return "invalid-message";
  if (p.company && p.company.length > 200) return "invalid-company";
  if (p.inquiry && p.inquiry.length > 200) return "invalid-inquiry";
  return null;
}

async function checkRateLimit(env: Env, ip: string): Promise<boolean> {
  if (!env.RATE_LIMIT) return true; // KV not bound = skip
  const key = `ekonomos:${ip}`;
  const cur = parseInt((await env.RATE_LIMIT.get(key)) || "0", 10);
  if (cur >= RATE_LIMIT_MAX) return false;
  await env.RATE_LIMIT.put(key, String(cur + 1), { expirationTtl: RATE_LIMIT_WINDOW_SEC });
  return true;
}

async function sendBrevoNotification(env: Env, p: Payload): Promise<void> {
  const to = env.EKONOMOS_NOTIFY_EMAIL || "stepan@velyos.cz";
  const from = env.EKONOMOS_FROM_EMAIL || "noreply@velyos.cz";
  const html = `
    <h2>Nový lead — EkonomOS</h2>
    <p><strong>Jméno:</strong> ${escapeHtml(p.name || "")}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(p.email || "")}</p>
    <p><strong>Firma:</strong> ${escapeHtml(p.company || "—")}</p>
    <p><strong>Co potřebuje:</strong> ${escapeHtml(p.inquiry || "—")}</p>
    <p><strong>Zdroj:</strong> ${escapeHtml(p.source || "ekonomos.velyos.cz")}</p>
    <hr/>
    <p><strong>Zpráva:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(p.message || "")}</pre>
  `;

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "EkonomOS", email: from },
      to: [{ email: to }],
      replyTo: { email: p.email, name: p.name },
      subject: `EkonomOS lead — ${p.inquiry || p.name}`,
      htmlContent: html,
    }),
  });
}

async function appendToSheet(env: Env, p: Payload): Promise<void> {
  if (!env.SHEET_WEBHOOK_URL) return;
  await fetch(env.SHEET_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Webhook-Secret": env.SHEET_WEBHOOK_SECRET,
    },
    body: JSON.stringify({
      sheet: "EKONOMOS LEADS",
      timestamp: new Date().toISOString(),
      name: p.name,
      email: p.email,
      company: p.company || "",
      inquiry: p.inquiry || "",
      message: p.message,
      source: p.source || "ekonomos.velyos.cz",
    }),
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const onRequestOptions: PagesFunction<Env> = ({ request }) => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("Origin")),
  });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get("Origin");
  const headers = corsHeaders(origin);

  // Rate limit
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (!(await checkRateLimit(env, ip))) {
    return Response.json({ ok: false, error: "rate-limit" }, { status: 429, headers });
  }

  // Parse
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return Response.json({ ok: false, error: "invalid-json" }, { status: 400, headers });
  }

  // Validate
  const err = validate(payload);
  if (err) {
    return Response.json({ ok: false, error: err }, { status: 400, headers });
  }

  // Process — fire-and-forget by tu byl ideální (waitUntil), ale držím to await pro jistotu
  try {
    await Promise.all([sendBrevoNotification(env, payload), appendToSheet(env, payload)]);
    return Response.json({ ok: true }, { status: 200, headers });
  } catch (e) {
    console.error("ekonomos-contact: pipeline error", e);
    return Response.json({ ok: false, error: "pipeline-error" }, { status: 500, headers });
  }
};
