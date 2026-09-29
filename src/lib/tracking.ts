export const CONSENT_STORAGE_KEY = "ekonomos-consent-v1";
export const ATTRIBUTION_STORAGE_KEY = "ekonomos-attribution-v1";
export const CONSENT_EVENT = "ekonomos:consent";

export type ConsentChoice = {
  version: 1;
  marketing: boolean;
  updatedAt: string;
};

export type MarketingAttribution = Partial<{
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  landing_page: string;
}>;

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[][];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
  }
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) || "null");
    if (value?.version === 1 && typeof value.marketing === "boolean") {
      return value as ConsentChoice;
    }
  } catch {
    // Invalid or inaccessible storage means no consent.
  }
  return null;
}

export function saveConsent(marketing: boolean): ConsentChoice {
  const value: ConsentChoice = {
    version: 1,
    marketing,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  if (marketing) {
    captureAttribution();
  } else {
    sessionStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
    clearMetaCookies();
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  return value;
}

export function captureAttribution(): MarketingAttribution {
  if (typeof window === "undefined" || !readConsent()?.marketing) return {};
  const params = new URLSearchParams(window.location.search);
  const attribution: MarketingAttribution = {
    landing_page: window.location.href,
  };
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ] as const) {
    const value = params.get(key);
    if (value) attribution[key] = value.slice(0, 250);
  }
  try {
    const existing = getStoredAttribution();
    const merged = { ...attribution, ...existing };
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return attribution;
  }
}

export function getStoredAttribution(): MarketingAttribution {
  if (typeof window === "undefined" || !readConsent()?.marketing) return {};
  try {
    return JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}") as MarketingAttribution;
  } catch {
    return {};
  }
}

export function trackMetaEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
  custom = false,
): void {
  if (!readConsent()?.marketing || typeof window.fbq !== "function") return;
  window.fbq(custom ? "trackCustom" : "track", name, params || {});
}

function clearMetaCookies(): void {
  if (typeof document === "undefined") return;
  for (const name of ["_fbp", "_fbc", "fr"]) {
    for (const domain of ["", location.hostname, ".velyos.cz"]) {
      document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax`;
    }
  }
}
