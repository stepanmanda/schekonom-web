"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  LayoutDashboard,
  FolderOpen,
  CalendarClock,
  CheckSquare,
  CheckCircle2,
} from "lucide-react";

const pilotPerks = [
  "Pilot za zvýhodněných podmínek (sleva nebo prodloužené free období)",
  "Společný měřící framework — baseline před, výsledky za 6 měsíců",
  "Přímý přístup k vývojovému týmu — vaše požadavky jdou do produktu",
  "Spoluautorství první case study (volitelně anonymně)",
];

const badges = [
  { icon: LayoutDashboard, label: "Přehled" },
  { icon: FolderOpen, label: "Dokumenty" },
  { icon: CalendarClock, label: "Termíny" },
  { icon: CheckSquare, label: "Schválení" },
];

const tickerLines = [
  "FRAUD WATCH — AKTIVNÍ",
  "OCR FAKTURY — RUNNING",
  "PÁROVÁNÍ PLATEB — AKTIVNÍ",
  "RIZIKOVÁ DETEKCE — 1.2k×",
  "TERMÍNY HLÍDÁNY",
  "UPOMÍNKY — AUTO",
  "DPH KH — PŘIPRAVENO",
  "AI VRSTVA — ONLINE",
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
        {/* Base radial mesh */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 25% 30%, rgba(0,229,255,0.18) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(212,175,55,0.10) 0%, transparent 55%), radial-gradient(ellipse 90% 50% at 50% 100%, rgba(0,85,255,0.08) 0%, transparent 65%)",
          }}
        />

        {/* Slow drifting glow blobs */}
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

        {/* Animated rotating ring */}
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

        {/* Grid bg */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Diagonal scan lines */}
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

      {/* Floating data ticker — right side */}
      <div className="absolute top-32 right-6 z-[3] hidden xl:flex flex-col gap-2 max-w-xs opacity-0 animate-float-up delay-500">
        <div
          className="text-text-muted mb-2"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          ◉ LIVE PROVOZNÍ DATA
        </div>
        {tickerLines.map((line, i) => (
          <div
            key={line}
            className="hud-panel px-3 py-2 flex items-center gap-2 animate-float-up"
            style={{
              animationDelay: `${0.6 + i * 0.08}s`,
              animationFillMode: "backwards",
            }}
          >
            <span className="w-1 h-1 rounded-full bg-status-green animate-pulse-dot" />
            <span
              className="text-text-secondary"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
              }}
            >
              {line}
            </span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        {/* Section tag */}
        <div className="section-tag opacity-0 animate-float-up mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse-dot" />
          EKONOMOS &nbsp;// &nbsp;ÚČETNÍ FIRMA ONLINE &nbsp;// &nbsp;ČESKY
        </div>

        {/* Heading */}
        <h1
          className="opacity-0 animate-float-up delay-100 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.06] tracking-tight text-white max-w-4xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Klient vidí svoje
          <br />
          <span className="text-cyan">papíry</span>,&nbsp;
          <span className="text-cyan">úkoly</span> a&nbsp;
          <span className="text-cyan">termíny</span>.
          <br />
          Vy ušetříte <span className="text-gold">hodiny.</span>
        </h1>

        {/* Subtitle */}
        <p className="opacity-0 animate-float-up delay-200 mt-7 text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl">
          Postavíme vám web na vaší doméně, klientský portál pod ním a
          administrátorskou aplikaci pro vás. Napojíme se na vaše stávající
          systémy — účetní, dokumenty, banky i registry. Vy vidíte všechny klienty najednou — méně
          e-mailů, méně telefonů, méně chyb.
        </p>

        {/* Badges */}
        <div className="opacity-0 animate-float-up delay-300 mt-8 flex flex-wrap gap-3">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2.5 px-4 py-2.5 border border-cyan/15 bg-cyan/5 hover:border-cyan/30 hover:bg-cyan/8 transition-all duration-300"
            >
              <badge.icon size={14} className="text-cyan" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
                className="text-text-secondary"
              >
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="opacity-0 animate-float-up delay-400 mt-10 flex flex-wrap gap-4">
          <Link href="/funkce" className="btn-primary">
            Co aplikace umí
            <ArrowRight size={16} />
          </Link>
          <Link href="/prihlaseni" className="btn-ghost">
            Vyzkoušet demo
          </Link>
        </div>

        {/* Pilot CTA panel — nahrazuje původní stats grid */}
        <div
          className="opacity-0 animate-float-up delay-600 mt-20 hud-panel p-8 lg:p-10"
          style={{ borderTop: "2px solid rgba(212,175,55,0.5)" }}
        >
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div
                className="mb-4 inline-flex items-center gap-2 text-gold"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse-dot" />
                Pilot fáze — hledáme prvních 5 partnerských kanceláří
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Buďte u toho první.
                <br />
                <span className="text-gold">Společně to změříme.</span>
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-5 max-w-2xl">
                EkonomOS je <strong className="text-white">nový produkt</strong>. Místo abychom slibovali
                čísla bez podkladu, hledáme <strong className="text-white">3–5 prvních partnerských
                kanceláří</strong>, se kterými produkt nasadíme, společně nastavíme metriky a po 6
                měsících veřejně publikujeme reálný dopad.
              </p>
              <ul className="space-y-2">
                {pilotPerks.map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-status-green mt-0.5 flex-shrink-0"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex lg:flex-col gap-3 self-start lg:self-center">
              <Link
                href="/pilot"
                className="btn-primary whitespace-nowrap"
              >
                Mám zájem o pilot
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/funkce"
                className="btn-ghost whitespace-nowrap text-center justify-center"
              >
                Co produkt umí
              </Link>
            </div>
          </div>
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
