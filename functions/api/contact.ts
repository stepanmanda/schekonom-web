type EmailAddress = {
  email: string;
  name?: string;
};

type EmailBinding = {
  send(message: {
    to: string | EmailAddress;
    from: string | EmailAddress;
    replyTo?: string | EmailAddress;
    subject: string;
    html: string;
    text: string;
  }): Promise<{ messageId: string }>;
};

type Env = {
  EMAIL?: EmailBinding;
  EKONOMOS_NOTIFY_EMAIL?: string;
  EKONOMOS_FROM_EMAIL?: string;
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
  subject?: unknown;
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

function attributionRows(payload: ContactPayload): string {
  const fields: Array<[string, unknown]> = [
    ["Vstupní stránka", payload.landing_page],
    ["Referrer", payload.referrer],
    ["UTM source", payload.utm_source],
    ["UTM medium", payload.utm_medium],
    ["UTM campaign", payload.utm_campaign],
    ["UTM content", payload.utm_content],
    ["UTM term", payload.utm_term],
  ];

  return fields
    .map(([label, value]) => [label, text(value, 500)] as const)
    .filter(([, value]) => value)
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join("");
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

  if (!env.EMAIL) {
    console.error("contact: EMAIL binding is not configured");
    return json({ ok: false, error: "service-unavailable" }, 503);
  }

  const name = text(payload.name, 120);
  const email = text(payload.email, 254);
  const company = text(payload.company, 200);
  const inquiry = text(payload.inquiry, 200);
  const message = text(payload.message, 5000);
  const source = text(payload.source, 200) || "ekonomos.velyos.cz";
  const safeSubject = (inquiry || "nová poptávka").replace(/[\r\n]+/g, " ");
  const recipient = env.EKONOMOS_NOTIFY_EMAIL || "stepan@velyos.cz";
  const sender = env.EKONOMOS_FROM_EMAIL || "noreply@velyos.cz";

  const htmlContent = `
    <h2>Nová poptávka — EkonomOS</h2>
    <p><strong>Jméno:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Firma:</strong> ${escapeHtml(company || "—")}</p>
    <p><strong>Co potřebuje:</strong> ${escapeHtml(inquiry || "—")}</p>
    <p><strong>Zdroj:</strong> ${escapeHtml(source)}</p>
    ${attributionRows(payload)}
    <hr>
    <p><strong>Zpráva:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;
  const textContent = [
    "Nová poptávka — EkonomOS",
    `Jméno: ${name}`,
    `E-mail: ${email}`,
    `Firma: ${company || "—"}`,
    `Co potřebuje: ${inquiry || "—"}`,
    `Zdroj: ${source}`,
    "",
    "Zpráva:",
    message,
  ].join("\n");

  try {
    await env.EMAIL.send({
      from: { email: sender, name: "EkonomOS" },
      to: recipient,
      replyTo: { email, name },
      subject: `EkonomOS — ${safeSubject}`,
      html: htmlContent,
      text: textContent,
    });

    return json({ ok: true }, 200);
  } catch {
    console.error("contact: Cloudflare Email Service delivery failed");
    return json({ ok: false, error: "delivery-failed" }, 502);
  }
};
