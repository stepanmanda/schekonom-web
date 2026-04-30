"use client";

import { useAuth } from "./context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PortalGuard({ children }: { children: React.ReactNode }) {
  const { session, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !session) router.replace("/prihlaseni");
  }, [ready, session, router]);

  // Wait for sessionStorage hydration before deciding to redirect
  if (!ready) return null;
  if (!session) return null;
  return <>{children}</>;
}
