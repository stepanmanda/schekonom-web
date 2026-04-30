"use client";

import {
  CalendarClock,
  Receipt,
  UserMinus,
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
    icon: UserMinus,
    title: "Predikuje odchod klienta",
    desc: "Z drobností v komunikaci pozná, že klient přemýšlí o odchodu. Dáme vám vědět dřív než výpověď.",
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
            CO JE TO ZA RAKETU // CELÝ PRODUKT V 30 VTEŘINÁCH
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white max-w-4xl leading-[1.05]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            EkonomOS je <span className="text-cyan">operační vrstva</span> pro účetní firmu.
          </h2>
          <p className="mt-6 text-text-secondary text-lg sm:text-xl max-w-3xl leading-relaxed">
            Nahrazuje Excel tabulky, lepicí lístky, e-mailové ping-pongy a hlídací notebook.
            Postavíme ji <strong className="text-white">na vaši doménu</strong>, napojíme na <strong className="text-white">vaše stávající systémy</strong>, a pustíme AI vrstvu, která hlídá to, na co lidé nemají kapacitu.
          </p>
        </div>

        {/* 3 vrstvy produktu */}
        <div className={`mb-16 ${inView ? "animate-float-up delay-200" : "opacity-0"}`}>
          <div
            className="text-gold mb-5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            ◉ Tři vrstvy, jeden balíček
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {layers.map((l, i) => (
              <div
                key={l.title}
                className="hud-panel p-7 relative"
                style={{ borderTop: "2px solid rgba(0,229,255,0.4)" }}
              >
                <div
                  className="absolute top-3 right-4 text-cyan/40"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                  }}
                >
                  0{i + 1}
                </div>
                <div className="inline-flex p-3 border border-cyan/20 bg-cyan/5 mb-4">
                  <l.icon size={22} className="text-cyan" />
                </div>
                <h3
                  className="text-white text-lg font-semibold mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {l.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {l.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6 schopností */}
        <div className={`mb-16 ${inView ? "animate-float-up delay-400" : "opacity-0"}`}>
          <div
            className="text-gold mb-5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            ◉ Šest věcí, které dělá za vás
          </div>
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
        <div className={`${inView ? "animate-float-up delay-600" : "opacity-0"}`}>
          <div
            className="hud-panel p-8 lg:p-10"
            style={{ borderLeft: "2px solid rgba(212,175,55,0.5)" }}
          >
            <div
              className="text-gold mb-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              ◉ V čem je rozdíl
            </div>
            <p className="text-white text-xl sm:text-2xl leading-relaxed font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Klasická účetní firma má software pro účetnictví.
            </p>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              <strong className="text-white">My jsme nadstavba</strong>, která vaše systémy propojí, automatizuje rutinu a hlídá rizika. Účetní práci dál děláte vy — jen máte víc času, méně chyb a klienta, který vidí, co se děje.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
