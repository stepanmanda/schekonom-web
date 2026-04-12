"use client";

import { useAuth } from "./context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PortalGuard({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.replace("/prihlaseni");
  }, [session, router]);

  if (!session) return null;
  return <>{children}</>;
}
