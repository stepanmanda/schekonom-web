"use client";

import Link from "next/link";
import {
  Heart,
  BrainCircuit,
  ArrowRight,
  Layers,
  Workflow,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const principles = [
  {
    icon: Layers,
    title: "Komplet servis",
    desc: "Web na vaší doméně, klientský portál pod ním, EkonomOS aplikace pro vás. Tři vrstvy, jedno řešení, žádná instalace na vaší straně.",
  },
  {
    icon: BrainCircuit,
    title: "Korelace dat",
    desc: "Hodnota není v množství dat, ale v souvislostech. Účetnictví, mzdy, komunikace, rejstříky a behaviorální stopy se potkají na jednom místě.",
  },
  {
    icon: Workflow,
    title: "AI pod dohledem",
    desc: "Aplikace navrhuje akce — vy schvalujete. Žádný autopilot bez kontroly. Lidský úsudek zůstává v každém kritickém kroku.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance first",
    desc: "GDPR, eIDAS, ISDOC, ELSTER, daňové ID. Co dělá Finanzamt nebo finanční úřad, EkonomOS umí mluvit jejich jazykem.",
  },
];

function FadeInSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${inView ? "animate-float-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function ONasPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            O EKONOMOS // KDO STOJÍ ZA PRODUKTEM
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-gold">Studio</span> za produktem.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            EkonomOS staví studio{" "}
            <a
              href="https://velyos.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              VELYOS
            </a>{" "}
            — tým, který se specializuje na B2B AI agenty a autonomní workflow
            pro profesionální služby. Zaměřujeme se na sektory, kde malé úspory
            a včasné varování generují největší hodnotu: účetnictví, daně,
            advokacie, poradenství.
          </p>
        </div>

        {/* Mission */}
        <FadeInSection className="mb-20">
          <div className="hud-panel p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <div
                  className="text-cyan mb-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Co děláme
                </div>
                <h2
                  className="text-3xl font-bold text-white mb-5"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Účetnictví <span className="text-cyan">jinak</span>
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Klasická účetní kancelář bojuje s e-maily, papíry a
                  Excelem. EkonomOS to mění tím, že propojí všechny zdroje dat
                  do jedné aplikace, nasadí AI na hlídání rizik a automatizuje
                  rutinu přes automatizovaný workflow.
                </p>
              </div>
              <div>
                <div
                  className="text-cyan mb-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Co dodáváme
                </div>
                <h2
                  className="text-3xl font-bold text-white mb-5"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Komplet <span className="text-gold">řešení</span>
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Veřejný web na vaší doméně, klientský portál pro vaše
                  zákazníky a administrátorská aplikace pro vás. Postavíme,
                  hostujeme, aktualizujeme. Vy se staráte o klienty, my se
                  staráme o technologii.
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Principles */}
        <FadeInSection className="mb-20">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            PRINCIPY // NA ČEM STAVÍME
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-10"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Čtyři principy, na kterých
            <br />
            <span className="text-cyan">EkonomOS stojí</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((p) => (
              <div
                key={p.title}
                className="glass-panel p-8 hover:border-cyan/25 transition-all"
              >
                <div className="inline-flex p-3 border border-cyan/20 bg-cyan/5 mb-5">
                  <p.icon size={22} className="text-cyan" />
                </div>
                <h3
                  className="text-white text-xl font-semibold mb-3"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {p.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* VELYOS section */}
        <FadeInSection className="mb-20">
          <div className="hud-panel p-10 text-center">
            <div
              className="inline-block mb-5 px-3 py-1.5 border border-cyan/20 bg-cyan/5"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(0,229,255,0.85)",
              }}
            >
              Studio VELYOS
            </div>
            <h2
              className="text-3xl font-bold text-white mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              B2B AI agenti pro
              <br />
              <span className="text-cyan">profesionální služby</span>
            </h2>
            <p className="text-text-secondary text-base max-w-2xl mx-auto leading-relaxed">
              VELYOS staví AI agenty a autonomní workflow pro firmy, které
              prodávají odbornou práci — účetní kanceláře, advokátní praxe,
              daňové poradny, controllingové studio. EkonomOS je první z
              produktů, které stavíme na míru tomuto vertikálu.
            </p>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Heart size={32} className="text-gold mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Pojďme si o tom promluvit
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Pokud řešíte, jak posunout vaši účetní firmu o úroveň výš,
                ozvěte se. Nezávazně, bez závazků, bez prezentace v PowerPointu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn-primary">
                  Domluvit konzultaci
                  <ArrowRight size={16} />
                </Link>
                <Link href="/funkce" className="btn-ghost">
                  Co produkt umí
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
