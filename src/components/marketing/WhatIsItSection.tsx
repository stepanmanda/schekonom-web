"use client";

import {
  CalendarClock,
  Receipt,
  ShieldAlert,
  Radio,
  Workflow,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const capabilities = [
  {
    icon: CalendarClock,
    title: "Hlídá termíny",
    desc: "DPH, KH, SH, ČSSZ, ZP, ELSTER, A1, ELDP. Upozorní vás dřív než finanční úřad.",
  },
  {
    icon: Receipt,
    title: "Automatizuje rutinu",
    desc: "OCR faktur, párování plateb, upomínky, mzdové uzávěrky. Vy schvalujete, robot pracuje.",
  },
  {
    icon: ShieldAlert,
    title: "Hlídá fraud",
    desc: "Změny IBAN, duplicitní faktury, podezřelá komunikace, deepfake doklady. 24/7 kontrola na pozadí.",
  },
  {
    icon: Radio,
    title: "Sleduje externí signály",
    desc: "ARES, insolvenční rejstřík, kurzy ČNB, výběrová řízení, tiskové zprávy. Co se s klientem děje venku.",
  },
  {
    icon: Workflow,
    title: "Propojí vaše systémy",
    desc: "Účetní software, dokumenty, banky, státní portály. Nic nepřepisujeme, pracujeme s tím, co máte.",
  },
];

export default function WhatIsItSection() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="co-je-to"
      className="py-24 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(0,229,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className={`mb-12 ${inView ? "animate-float-up" : "opacity-0"}`}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse-dot" />
            CO APLIKACE DĚLÁ ZA VÁS
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-3xl leading-[1.05]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Pět věcí <span className="text-cyan">na pozadí.</span>
          </h2>
        </div>

        {/* 6 schopností */}
        <div className={`mb-16 ${inView ? "animate-float-up delay-200" : "opacity-0"}`}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((c) => (
              <div key={c.title} className="hud-panel p-5">
                <div className="flex items-start gap-3 mb-2">
                  <c.icon size={18} className="text-cyan mt-0.5 flex-shrink-0" />
                  <h3
                    className="text-white font-semibold"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {c.title}
                  </h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed pl-7">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* V čem je rozdíl */}
        <div className={`${inView ? "animate-float-up delay-400" : "opacity-0"}`}>
          <div
            className="hud-panel p-7 lg:p-8"
            style={{ borderLeft: "2px solid rgba(212,175,55,0.5)" }}
          >
            <p className="text-white text-lg sm:text-xl leading-relaxed font-semibold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Klasická účetní firma má software pro účetnictví.
            </p>
            <p className="text-text-secondary leading-relaxed">
              <strong className="text-white">My jsme nadstavba</strong>, která propojí vaše systémy, automatizuje rutinu a hlídá rizika. Účetní práci dál děláte vy — jen máte víc času, méně chyb a klienta, který vidí, co se děje.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
