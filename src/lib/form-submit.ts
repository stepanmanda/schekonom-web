import { getStoredAttribution } from "@/lib/tracking";

/**
 * Utility pro odesílání kontaktních formulářů.
 *
 * Primárně posílá JSON na same-origin Cloudflare Pages Function `/api/contact`.
 * Pokud endpoint selže, otevře jako nouzový fallback předvyplněný email.
 * Poptávku bezpečně uloží serverová Cloudflare Pages Function do D1 databáze;
 * žádné přihlašovací údaje ani API klíče se neposílají do prohlížeče.
 */

export type ContactFormPayload = {
  name: string;
  email: string;
  company?: string;
  inquiry?: string;
  message: string;
  /** Honeypot proti jednoduchým formulářovým botům. Musí zůstat prázdný. */
  website?: string;
};

// Mailto fallback adresa. Default = stepan@velyos.cz (existující email).
// Pokud zaregistruješ info@ekonomos.cz forwarding, přepni přes env var:
// NEXT_PUBLIC_CONTACT_EMAIL=info@ekonomos.cz
const FALLBACK_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "stepan@velyos.cz";

function buildMailto(data: ContactFormPayload): string {
  const attribution = getStoredAttribution();
  const subject = encodeURIComponent(
    `EkonomOS: ${data.inquiry || "zájem o produkt"}`,
  );
  const body = encodeURIComponent(
    [
      `Jméno: ${data.name}`,
      `E-mail: ${data.email}`,
      data.company ? `Firma: ${data.company}` : null,
      data.inquiry ? `Co potřebuji: ${data.inquiry}` : null,
      "",
      "Zpráva:",
      data.message,
      attribution.utm_source ? "" : null,
      attribution.utm_source ? `Zdroj: ${attribution.utm_source}` : null,
      attribution.utm_medium ? `Médium: ${attribution.utm_medium}` : null,
      attribution.utm_campaign ? `Kampaň: ${attribution.utm_campaign}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
}

function openMailtoFallback(data: ContactFormPayload) {
  if (typeof document === "undefined") return;
  const link = document.createElement("a");
  link.href = buildMailto(data);
  if (link.protocol !== "mailto:") return;
  link.rel = "noopener noreferrer";
  link.click();
}

export async function submitContactForm(
  data: ContactFormPayload,
): Promise<{ ok: boolean; mode: "endpoint" | "mailto"; error?: string }> {
  try {
    const attribution = getStoredAttribution();
    const payload: Record<string, string | undefined> = {
      ...data,
      source: "ekonomos.velyos.cz",
      subject: `EkonomOS: ${data.inquiry || "zájem o produkt"}`,
    };
    for (const [key, value] of Object.entries(attribution)) {
      if (value) payload[key] = value;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { ok: true, mode: "endpoint" };
    }
    openMailtoFallback(data);
    return {
      ok: true,
      mode: "mailto",
      error: `Endpoint vrátil ${response.status}`,
    };
  } catch (err) {
    openMailtoFallback(data);
    return {
      ok: true,
      mode: "mailto",
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}

export function getMailtoLink(data: ContactFormPayload): string {
  return buildMailto(data);
}
