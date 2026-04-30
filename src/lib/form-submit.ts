/**
 * Utility pro odesílání kontaktních formulářů.
 *
 * Funguje ve dvou módech:
 * 1. POST endpoint (NEXT_PUBLIC_CONTACT_ENDPOINT env var) — pošle JSON na URL
 *    (kompatibilní s Web3Forms, Formspree, vlastním backendem nebo velyos.cz API)
 * 2. mailto fallback — otevře mailový klient s předvyplněnou zprávou
 *
 * Pokud POST selže (síť / 4xx / 5xx), automaticky fallback na mailto.
 *
 * Konfigurace:
 *   .env.local:
 *     NEXT_PUBLIC_CONTACT_ENDPOINT=https://api.web3forms.com/submit
 *     NEXT_PUBLIC_CONTACT_ACCESS_KEY=<your-key>   (pokud provider potřebuje)
 *
 *   Pro Web3Forms:
 *     - Endpoint: https://api.web3forms.com/submit
 *     - Access key: získáš zdarma na web3forms.com
 *
 *   Pro Formspree:
 *     - Endpoint: https://formspree.io/f/<form-id>
 *     - Access key: ne potřeba
 *
 *   Pro velyos.cz vlastní endpoint:
 *     - Endpoint: https://velyos.cz/api/contact (nebo cokoli)
 *     - Backend musí povolit CORS pro ekonomos.velyos.cz
 *     - Pokud používá API key, dát ho do NEXT_PUBLIC_CONTACT_ACCESS_KEY
 */

export type ContactFormPayload = {
  name: string;
  email: string;
  company?: string;
  inquiry?: string;
  message: string;
};

const FALLBACK_EMAIL = "info@ekonomos.cz";

function buildMailto(data: ContactFormPayload): string {
  const subject = encodeURIComponent(
    `EkonomOS — ${data.inquiry || "zájem o produkt"}`,
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
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
}

export async function submitContactForm(
  data: ContactFormPayload,
): Promise<{ ok: boolean; mode: "endpoint" | "mailto"; error?: string }> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  const accessKey = process.env.NEXT_PUBLIC_CONTACT_ACCESS_KEY;

  // Pokud je nastavený endpoint, zkus POST
  if (endpoint) {
    try {
      const payload: Record<string, string> = {
        ...data,
        source: "ekonomos.velyos.cz",
        subject: `EkonomOS — ${data.inquiry || "zájem o produkt"}`,
      };
      if (accessKey) {
        payload.access_key = accessKey;
      }

      const response = await fetch(endpoint, {
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
      // Fall through to mailto
      return {
        ok: false,
        mode: "mailto",
        error: `Endpoint vrátil ${response.status}`,
      };
    } catch (err) {
      // Sítová chyba → fallback na mailto
      return {
        ok: false,
        mode: "mailto",
        error: err instanceof Error ? err.message : "Network error",
      };
    }
  }

  // Žádný endpoint nakonfigurován → mailto
  if (typeof window !== "undefined") {
    window.location.href = buildMailto(data);
  }
  return { ok: true, mode: "mailto" };
}

export function getMailtoLink(data: ContactFormPayload): string {
  return buildMailto(data);
}
