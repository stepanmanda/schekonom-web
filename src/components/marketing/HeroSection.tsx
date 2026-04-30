"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Globe2,
  Users,
  Monitor,
  PlayCircle,
} from "lucide-react";

const layers = [
  { icon: Globe2, title: "Web", subtitle: "Na vaší doméně" },
  { icon: Users, title: "Klientský portál", subtitle: "Pro vaše klienty" },
  { icon: Monitor, title: "Admin aplikace", subtitle: "Pro vás a tým" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlayOpacity = Math.min(0.92, 0.6 + scrollY * 0.0003);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated mesh background */}
      <div className="absolute inset-0 z-0 bg-void-deep">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 25% 30%, rgba(0,229,255,0.18) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(212,175,55,0.10) 0%, transparent 55%), radial-gradient(ellipse 90% 50% at 50% 100%, rgba(0,85,255,0.08) 0%, transparent 65%)",
          }}
        />

        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30 animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,255,0.25) 0%, transparent 60%)",
            animationDuration: "8s",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-20 animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 60%)",
            animationDuration: "12s",
            animationDelay: "2s",
          }}
        />

        <div
          className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[480px] h-[480px] hidden lg:block animate-spin-slow opacity-50"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(0,229,255,0.20) 60deg, transparent 120deg, rgba(212,175,55,0.12) 200deg, transparent 280deg)",
            mask: "radial-gradient(circle, transparent 60%, black 61%, black 70%, transparent 71%)",
            WebkitMask:
              "radial-gradient(circle, transparent 60%, black 61%, black 70%, transparent 71%)",
          }}
        />

        <div className="absolute inset-0 grid-bg opacity-30" />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent 0, transparent 6px, rgba(0,229,255,0.015) 6px, rgba(0,229,255,0.015) 7px)",
          }}
        />
      </div>

      {/* Bottom fade overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 0%, transparent 55%, rgba(3,8,13,${overlayOpacity * 0.6}) 80%, rgba(3,8,13,0.97) 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        {/* Tagline chip */}
        <div className="section-tag opacity-0 animate-float-up mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse-dot" />
          EKONOMOS &nbsp;//&nbsp; OPERAČNÍ VRSTVA PRO ÚČETNÍ FIRMY
        </div>

        {/* H1 — sharp claim */}
        <h1
          className="opacity-0 animate-float-up delay-100 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.06] tracking-tight text-white max-w-4xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Účetní firma, která má
          <br />
          všechno <span className="text-cyan">pod kontrolou.</span>
        </h1>

        {/* Subtitle — co kupují */}
        <p className="opacity-0 animate-float-up delay-200 mt-6 text-text-secondary text-lg sm:text-xl leading-relaxed max-w-3xl">
          Postavíme vám <strong className="text-white">web na vaší doméně</strong>,{" "}
          <strong className="text-white">klientský portál</strong> pro vaše klienty
          a <strong className="text-white">admin aplikaci</strong> pro vás. AI vrstva hlídá termíny, fraud a klienty, kteří chtějí odejít.
        </p>

        {/* 3 produkt vrstvy — vizuální co kupuju */}
        <div className="opacity-0 animate-float-up delay-300 mt-10 grid grid-cols-3 gap-3 max-w-3xl">
          {layers.map((l) => (
            <div
              key={l.title}
              className="border border-cyan/15 bg-cyan/[0.03] hover:border-cyan/30 hover:bg-cyan/[0.06] transition-all px-4 py-4 sm:px-5 sm:py-5"
            >
              <l.icon size={20} className="text-cyan mb-2.5" />
              <div
                className="text-white font-semibold text-sm sm:text-base"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {l.title}
              </div>
              <div
                className="text-text-muted mt-0.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {l.subtitle}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="opacity-0 animate-float-up delay-400 mt-10 flex flex-wrap gap-4 items-center">
          <Link href="/prihlaseni" className="btn-primary">
            <PlayCircle size={16} />
            Vyzkoušet demo
          </Link>
          <Link href="/pilot" className="btn-ghost">
            Domluvit pilot
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Pilot scarcity — kompaktní */}
        <div className="opacity-0 animate-float-up delay-500 mt-10 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.4)",
                  border: "1px solid rgba(212,175,55,0.7)",
                }}
              />
            ))}
          </div>
          <Link
            href="/pilot"
            className="text-gold hover:text-white transition-colors"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            ◉ Pilot fáze · 5 z 5 míst volných · zvýhodněné podmínky →
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-float-up delay-800">
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-text-muted"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-cyan/40 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
