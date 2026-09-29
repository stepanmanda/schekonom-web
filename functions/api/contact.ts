type D1Result = {
  success: boolean;
};

type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<D1Result>;
  first<T>(): Promise<T | null>;
};

type D1Database = {
  prepare(query: string): D1PreparedStatement;
};

type Env = {
  LEADS_DB?: D1Database;
};

type PagesContext<T> = {
  request: Request;
  env: T;
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  inquiry?: unknown;
  message?: unknown;
  source?: unknown;
  website?: unknown;
  landing_page?: unknown;
  referrer?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_content?: unknown;
  utm_term?: unknown;
};

const ALLOWED_ORIGINS = new Set([
  "https://ekonomos.velyos.cz",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);
const MAX_REQUEST_BYTES = 20_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 600;

function json(body: Record<string, unknown>, status: number): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function text(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validate(payload: ContactPayload): string | null {
  if (text(payload.website, 200)) return "spam-detected";

  const name = text(payload.name, 121);
  const email = text(payload.email, 255);
  const company = text(payload.company, 201);
  const inquiry = text(payload.inquiry, 201);
  const message = text(payload.message, 5001);

  if (name.length < 2 || name.length > 120) return "invalid-name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "invalid-email";
  if (company.length > 200) return "invalid-company";
  if (inquiry.length > 200) return "invalid-inquiry";
  if (message.length < 5 || message.length > 5000) return "invalid-message";
  return null;
}

async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

async function isRateLimited(db: D1Database, request: Request): Promise<boolean> {
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const ipHash = await sha256(ip);
  const now = Math.floor(Date.now() / 1000);
  const cutoff = now - RATE_LIMIT_WINDOW_SECONDS;

  await db
    .prepare("DELETE FROM contact_rate_limits WHERE window_start < ?")
    .bind(now - 86_400)
    .run();

  await db
    .prepare(
      `INSERT INTO contact_rate_limits (ip_hash, window_start, request_count)
       VALUES (?, ?, 1)
       ON CONFLICT(ip_hash) DO UPDATE SET
         window_start = CASE
           WHEN contact_rate_limits.window_start < ? THEN excluded.window_start
           ELSE contact_rate_limits.window_start
         END,
         request_count = CASE
           WHEN contact_rate_limits.window_start < ? THEN 1
           ELSE contact_rate_limits.request_count + 1
         END`,
    )
    .bind(ipHash, now, cutoff, cutoff)
    .run();

  const row = await db
    .prepare("SELECT request_count FROM contact_rate_limits WHERE ip_hash = ?")
    .bind(ipHash)
    .first<{ request_count: number }>();

  return (row?.request_count || 0) > RATE_LIMIT_MAX;
}

export const onRequestPost = async ({
  request,
  env,
}: PagesContext<Env>): Promise<Response> => {
  const origin = request.headers.get("Origin");
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return json({ ok: false, error: "forbidden-origin" }, 403);
  }

  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
    return json({ ok: false, error: "unsupported-content-type" }, 415);
  }

  const declaredLength = Number(request.headers.get("Content-Length") || "0");
  if (declaredLength > MAX_REQUEST_BYTES) {
    return json({ ok: false, error: "payload-too-large" }, 413);
  }

  let payload: ContactPayload;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_REQUEST_BYTES) {
      return json({ ok: false, error: "payload-too-large" }, 413);
    }
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return json({ ok: false, error: "invalid-json" }, 400);
    }
    payload = parsed as ContactPayload;
  } catch {
    return json({ ok: false, error: "invalid-json" }, 400);
  }

  const validationError = validate(payload);
  if (validationError) {
    return json({ ok: false, error: validationError }, 400);
  }

  if (!env.LEADS_DB) {
    console.error("contact: LEADS_DB binding is not configured");
    return json({ ok: false, error: "service-unavailable" }, 503);
  }

  try {
    if (await isRateLimited(env.LEADS_DB, request)) {
      return json({ ok: false, error: "rate-limit" }, 429);
    }

    const result = await env.LEADS_DB
      .prepare(
        `INSERT INTO contact_leads (
          id, created_at, name, email, company, inquiry, message, source,
          landing_page, referrer, utm_source, utm_medium, utm_campaign,
          utm_content, utm_term
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        crypto.randomUUID(),
        new Date().toISOString(),
        text(payload.name, 120),
        text(payload.email, 254),
        text(payload.company, 200) || null,
        text(payload.inquiry, 200) || null,
        text(payload.message, 5000),
        text(payload.source, 200) || "ekonomos.velyos.cz",
        text(payload.landing_page, 1000) || null,
        text(payload.referrer, 1000) || null,
        text(payload.utm_source, 200) || null,
        text(payload.utm_medium, 200) || null,
        text(payload.utm_campaign, 300) || null,
        text(payload.utm_content, 300) || null,
        text(payload.utm_term, 300) || null,
      )
      .run();

    if (!result.success) {
      throw new Error("D1 insert failed");
    }

    return json({ ok: true }, 201);
  } catch {
    console.error("contact: D1 storage failed");
    return json({ ok: false, error: "storage-failed" }, 502);
  }
};
