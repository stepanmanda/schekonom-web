"use client";

import Link from "next/link";
import { Eye, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

export default function LockedTeaser() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      className="py-16 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`hud-panel p-8 lg:p-10 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center ${
            inView ? "animate-float-up" : "opacity-0"
          }`}
        >
          <div
            className="p-4 border border-gold/30 flex-shrink-0"
            style={{ background: "rgba(212,175,55,0.06)" }}
          >
            <Eye size={28} className="text-gold" />
          </div>
          <div>
            <div
              className="text-gold mb-2"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              ◉ Skryté signály
            </div>
            <h3
              className="text-white text-xl sm:text-2xl font-semibold mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Drobnosti, kterých si lidé sami nevšimnou
            </h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl">
              Vedle účetních dat sleduje aplikace desítky signálů, ze kterých
              skládá obraz toho, co se s klientem opravdu děje. Konkrétní
              seznam ukazujeme až klientům — proč byste měli prozradit
              konkurenci, na co se my díváme.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="btn-primary whitespace-nowrap self-start md:self-center"
          >
            Domluvit demo
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
