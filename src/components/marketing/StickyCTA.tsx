"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Link
      href="/pilot"
      className="fixed bottom-6 right-6 z-40 hud-panel px-5 py-3 flex items-center gap-3 hover:border-gold/40 transition-all"
      style={{
        borderTop: "1px solid rgba(212,175,55,0.5)",
        background: "rgba(3, 8, 13, 0.92)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Rocket size={16} className="text-gold" />
      <span
        className="text-white"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Pilot — máme volné sloty
      </span>
    </Link>
  );
}
