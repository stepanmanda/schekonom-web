type D1Result = { success: boolean };

type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<D1Result>;
};

type D1Database = {
  prepare(query: string): D1PreparedStatement;
};

type Env = {
  LEADS_DB?: D1Database;
  META_VERIFY_TOKEN?: string;
  META_APP_SECRET?: string;
  META_PAGE_ACCESS_TOKEN?: string;
};

type PagesContext<T> = {
  request: Request;
  env: T;
};

type MetaLeadValue = {
  leadgen_id?: unknown;
  page_id?: unknown;
  form_id?: unknown;
  ad_id?: unknown;
  created_time?: unknown;
};

type MetaWebhookPayload = {
  object?: unknown;
  entry?: Array<{
    id?: unknown;
    changes?: Array<{ field?: unknown; value?: MetaLeadValue }>;
  }>;
};

type MetaField = { name?: unknown; values?: unknown };
type MetaLead = {
  id?: unknown;
  created_time?: unknown;
  field_data?: MetaField[];
  ad_id?: unknown;
  ad_name?: unknown;
  campaign_id?: unknown;
  campaign_name?: unknown;
  form_id?: unknown;
};

const MAX_BODY_BYTES = 1_000_000;
const GRAPH_HOST = "graph.facebook.com";

function response(body: string, status: number, contentType = "text/plain; charset=utf-8"): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function json(body: Record<string, unknown>, status: number): Response {
  return response(JSON.stringify(body), status, "application/json; charset=utf-8");
}

function text(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function safeEqual(left: string, right: string): boolean {
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  let difference = leftBytes.length ^ rightBytes.length;
  const length = Math.max(leftBytes.length, rightBytes.length);
  for (let index = 0; index < length; index += 1) {
    difference |= (leftBytes[index] || 0) ^ (rightBytes[index] || 0);
  }
  return difference === 0;
}

async function hmacHex(secret: string, body: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return Array.from(new Uint8Array(signature), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

async function ensureSchema(db: D1Database): Promise<void> {
  const result = await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS meta_lead_events (
        leadgen_id TEXT PRIMARY KEY,
        received_at TEXT NOT NULL,
        page_id TEXT,
        form_id TEXT,
        ad_id TEXT,
        created_time INTEGER,
        status TEXT NOT NULL,
        error TEXT,
        payload_json TEXT NOT NULL,
        processed_at TEXT
      )`,
    )
    .run();
  if (!result.success) throw new Error("Schema initialization failed");
}

function extractEvents(payload: MetaWebhookPayload): MetaLeadValue[] {
  if (payload.object !== "page" || !Array.isArray(payload.entry)) return [];
  const events: MetaLeadValue[] = [];
  for (const entry of payload.entry) {
    if (!Array.isArray(entry.changes)) continue;
    for (const change of entry.changes) {
      if (change.field === "leadgen" && change.value) events.push(change.value);
    }
  }
  return events;
}

function mapFields(fieldData: MetaField[] | undefined): Record<string, string> {
  const fields: Record<string, string> = {};
  if (!Array.isArray(fieldData)) return fields;
  for (const field of fieldData) {
    const name = text(field.name, 120).toLowerCase();
    const values = Array.isArray(field.values)
      ? field.values.map((value) => text(value, 1000)).filter(Boolean)
      : [];
    if (name && values.length) fields[name] = values.join(", ");
  }
  return fields;
}

async function fetchLead(leadgenId: string, token: string): Promise<MetaLead> {
  const fields = [
    "id", "created_time", "field_data", "ad_id", "ad_name",
    "campaign_id", "campaign_name", "form_id",
  ].join(",");
  let url: URL;
  try {
    url = new URL(`https://${GRAPH_HOST}/${encodeURIComponent(leadgenId)}`);
  } catch {
    throw new Error("Invalid Graph API URL");
  }
  url.searchParams.set("fields", fields);
  const graphResponse = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  if (!graphResponse.ok) {
    throw new Error(`Graph API HTTP ${graphResponse.status}`);
  }
  const lead = (await graphResponse.json()) as MetaLead;
  if (!lead || typeof lead !== "object") throw new Error("Invalid Graph API response");
  return lead;
}

async function saveEvent(
  db: D1Database,
  event: MetaLeadValue,
  payload: MetaWebhookPayload,
): Promise<string> {
  const leadgenId = text(event.leadgen_id, 200);
  if (!leadgenId) throw new Error("Missing leadgen_id");
  const createdTime = Number(event.created_time);
  const result = await db
    .prepare(
      `INSERT INTO meta_lead_events(
        leadgen_id, received_at, page_id, form_id, ad_id, created_time,
        status, payload_json
      ) VALUES(?,?,?,?,?,?,?,?)
      ON CONFLICT(leadgen_id) DO UPDATE SET received_at=excluded.received_at`,
    )
    .bind(
      leadgenId,
      new Date().toISOString(),
      text(event.page_id, 200) || null,
      text(event.form_id, 200) || null,
      text(event.ad_id, 200) || null,
      Number.isFinite(createdTime) ? createdTime : null,
      "received",
      JSON.stringify(payload),
    )
    .run();
  if (!result.success) throw new Error("Event storage failed");
  return leadgenId;
}

async function markEvent(
  db: D1Database,
  leadgenId: string,
  status: string,
  error: string | null,
): Promise<void> {
  await db
    .prepare(
      `UPDATE meta_lead_events
       SET status=?, error=?, processed_at=? WHERE leadgen_id=?`,
    )
    .bind(status, error, new Date().toISOString(), leadgenId)
    .run();
}

async function saveLead(db: D1Database, leadgenId: string, lead: MetaLead): Promise<void> {
  const fields = mapFields(lead.field_data);
  const name =
    fields.full_name ||
    [fields.first_name, fields.last_name].filter(Boolean).join(" ").trim();
  const email = fields.email || fields.work_email;
  if (!name || !email) {
    await markEvent(db, leadgenId, "missing_required_fields", "Lead form must provide name and email");
    return;
  }

  const excluded = new Set([
    "full_name", "first_name", "last_name", "email", "work_email",
    "phone_number", "phone", "company_name", "company",
  ]);
  const answers = Object.entries(fields)
    .filter(([key]) => !excluded.has(key))
    .map(([key, value]) => `${key}: ${value}`);
  const phone = fields.phone_number || fields.phone;
  const message = [
    "Poptávka z formuláře Meta Lead Ads.",
    phone ? `Telefon: ${phone}` : null,
    ...answers,
  ]
    .filter(Boolean)
    .join("\n");
  const createdSeconds = Number(lead.created_time);
  const createdAt = Number.isFinite(createdSeconds)
    ? new Date(createdSeconds * 1000).toISOString()
    : new Date().toISOString();
  const result = await db
    .prepare(
      `INSERT INTO contact_leads(
        id, created_at, name, email, company, inquiry, message, source,
        utm_source, utm_medium, utm_campaign, utm_content
      ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(id) DO NOTHING`,
    )
    .bind(
      `meta_${leadgenId}`,
      createdAt,
      name.slice(0, 120),
      email.slice(0, 254),
      (fields.company_name || fields.company || "").slice(0, 200) || null,
      "Meta Lead Ads",
      message.slice(0, 5000),
      "meta_lead_ads",
      "meta",
      "paid_social",
      text(lead.campaign_name, 300) || text(lead.campaign_id, 200) || null,
      text(lead.ad_name, 300) || text(lead.ad_id, 200) || null,
    )
    .run();
  if (!result.success) throw new Error("Lead storage failed");
  await markEvent(db, leadgenId, "processed", null);
}

export const onRequestGet = async ({ request, env }: PagesContext<Env>): Promise<Response> => {
  if (!env.LEADS_DB || !env.META_VERIFY_TOKEN) {
    return json({ ok: false, error: "service-unavailable" }, 503);
  }
  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return json({ ok: false, error: "invalid-url" }, 400);
  }
  const mode = url.searchParams.get("hub.mode") || "";
  const suppliedToken = url.searchParams.get("hub.verify_token") || "";
  const challenge = url.searchParams.get("hub.challenge") || "";
  if (mode !== "subscribe" || !safeEqual(suppliedToken, env.META_VERIFY_TOKEN) || !challenge) {
    return response("Forbidden", 403);
  }
  try {
    await ensureSchema(env.LEADS_DB);
    return response(challenge, 200);
  } catch {
    console.error("meta-leads: schema initialization failed");
    return json({ ok: false, error: "storage-failed" }, 502);
  }
};

export const onRequestPost = async ({ request, env }: PagesContext<Env>): Promise<Response> => {
  if (!env.LEADS_DB || !env.META_APP_SECRET || !env.META_PAGE_ACCESS_TOKEN) {
    return json({ ok: false, error: "service-unavailable" }, 503);
  }
  const declaredLength = Number(request.headers.get("Content-Length") || "0");
  if (declaredLength > MAX_BODY_BYTES) return json({ ok: false, error: "payload-too-large" }, 413);

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) return json({ ok: false, error: "payload-too-large" }, 413);
  const suppliedSignature = request.headers.get("X-Hub-Signature-256") || "";
  const expectedSignature = `sha256=${await hmacHex(env.META_APP_SECRET, rawBody)}`;
  if (!safeEqual(suppliedSignature, expectedSignature)) {
    return json({ ok: false, error: "invalid-signature" }, 401);
  }

  let payload: MetaWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as MetaWebhookPayload;
  } catch {
    return json({ ok: false, error: "invalid-json" }, 400);
  }

  try {
    await ensureSchema(env.LEADS_DB);
    for (const event of extractEvents(payload)) {
      const leadgenId = await saveEvent(env.LEADS_DB, event, payload);
      try {
        const lead = await fetchLead(leadgenId, env.META_PAGE_ACCESS_TOKEN);
        await saveLead(env.LEADS_DB, leadgenId, lead);
      } catch (error) {
        const message = error instanceof Error ? error.message.slice(0, 300) : "Lead retrieval failed";
        await markEvent(env.LEADS_DB, leadgenId, "retrieval_failed", message);
      }
    }
    return json({ ok: true }, 200);
  } catch {
    console.error("meta-leads: webhook processing failed");
    return json({ ok: false, error: "processing-failed" }, 500);
  }
};
