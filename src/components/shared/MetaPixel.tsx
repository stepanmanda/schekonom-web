"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  captureAttribution,
  CONSENT_EVENT,
  readConsent,
  trackMetaEvent,
} from "@/lib/tracking";

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  return () => window.removeEventListener(CONSENT_EVENT, onStoreChange);
}

function getMarketingConsent() {
  return Boolean(readConsent()?.marketing);
}

function initializePixel(pixelId: string) {
  if (window.fbq?.loaded) return;

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue?.push(args);
  }) as NonNullable<Window["fbq"]>;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  script.dataset.ekonomosMetaPixel = pixelId;
  document.head.appendChild(script);
  fbq("init", pixelId);
}

export default function MetaPixel({ pixelId }: { pixelId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const enabled = useSyncExternalStore(
    subscribeToConsent,
    getMarketingConsent,
    () => false,
  );
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || !pixelId) {
      lastPage.current = null;
      return;
    }
    initializePixel(pixelId);
    captureAttribution();

    const page = `${pathname}${searchParams.size ? `?${searchParams}` : ""}`;
    if (lastPage.current !== page) {
      trackMetaEvent("PageView");
      lastPage.current = page;
    }
  }, [enabled, pathname, pixelId, searchParams]);

  useEffect(() => {
    if (!enabled) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest("a");
      const href = link?.getAttribute("href") || "";
      if (href.startsWith("/kontakt") || href.startsWith("#kontakt")) {
        trackMetaEvent("ContactCTA", { destination: href }, true);
      } else if (href.startsWith("/prihlaseni")) {
        trackMetaEvent("DemoCTA", { destination: href }, true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);

  return null;
}
