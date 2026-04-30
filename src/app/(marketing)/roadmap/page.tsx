"use client";

import Link from "next/link";
import {
  Map,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
  Target,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

type Status = "done" | "in-progress" | "next" | "planned";

const phases: Array<{
  status: Status;
  period: string;
  title: string;
  items: string[];
}> = [
  {
    status: "done",
    period: "Q1 / Q2 2026",
    title: "MVP a alpha",
    items: [
      "Klientský portál + admin aplikace (3 role: klient, daně, mzdy)",
      "Integrace na účetní, dokumentové úložiště, banky a státní portály",
      "AI vrstva — predikce, fraud detection, automatizace workflow",
      "Pilot demo s anonymizovanými daty",
      "Compliance základ: GDPR, EU hosting, šifrování",
    ],
  },
  {
    status: "in-progress",
    period: "Q2 / Q3 2026",
    title: "Pilot fáze",
    items: [
      "Onboarding 3–5 prvních partnerských kanceláří",
      "Společný měřící framework — baseline před, výsledky za 6 měsíců",
      "Doladění integrací podle reálných stacků partnerů",
      "Tuning AI modelů na produkčních datech (s opt-in souhlasem)",
      "První case study (volitelně anonymně)",
    ],
  },
  {
    status: "next",
    period: "Q4 2026 / Q1 2027",
    title: "Veřejné spuštění",
    items: [
      "Public pricing podle pilotních dat",
      "Self-service onboarding pro menší kanceláře",
      "Marketplace integrací — partneři přidávají vlastní moduly",
      "Mobilní aplikace pro klienty (iOS / Android)",
      "Rozšíření do SK a DE trhu",
    ],
  },
  {
    status: "planned",
    period: "2027+",
    title: "Vize do budoucna",
    items: [
      "Plně autonomní AI agenti pro rutinní rozhodování (s human approval gates)",
      "Hlasový asistent pro klienty (telefon + chat)",
      "Network effect — sdílené benchmarky napříč anonymizovanými klienty",
      "ViDA / e-fakturace plně integrované",
      "Vertikální rozšíření: advokacie, controllingové firmy, daňoví poradci",
    ],
  },
];

const statusLabels: Record<Status, { label: string; tone: string; icon: typeof CheckCircle2 }> = {
  done: { label: "Hotovo", tone: "green", icon: CheckCircle2 },
  "in-progress": { label: "Probíhá", tone: "cyan", icon: Loader2 },
  next: { label: "V přípravě", tone: "gold", icon: Sparkles },
  planned: { label: "Plánováno", tone: "slate", icon: Target },
};

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

export default function RoadmapPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-16 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            ROADMAP
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Co je hotové, co se chystá, <span className="text-cyan">co plánujeme.</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Žádné marketingové roadmapy z výtahu. Tady je upřímný přehled, kde
            EkonomOS je dnes a kam směřujeme. Pilot fáze znamená, že priority
            ovlivníte i vy — co od partnerů uslyšíme, jde do produktu nahoru.
          </p>
        </div>

        {/* Phases */}
        <div className="space-y-6">
          {phases.map((phase) => {
            const meta = statusLabels[phase.status];
            const Icon = meta.icon;
            return (
              <FadeInSection key={phase.title}>
                <div className="hud-panel p-7 grid md:grid-cols-[200px_1fr] gap-6">
                  <div className="flex md:flex-col gap-3 items-start">
                    <div
                      className="text-text-muted"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                      }}
                    >
                      {phase.period}
                    </div>
                    <span className="hud-chip" data-tone={meta.tone}>
                      <Icon size={11} className={phase.status === "in-progress" ? "animate-spin-slow" : ""} />
                      {meta.label}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-white text-xl font-semibold mb-4"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {phase.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {phase.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                        >
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              phase.status === "done"
                                ? "bg-status-green"
                                : phase.status === "in-progress"
                                  ? "bg-cyan animate-pulse-dot"
                                  : phase.status === "next"
                                    ? "bg-gold"
                                    : "bg-text-muted/40"
                            }`}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>

        {/* Honest disclaimer */}
        <FadeInSection className="mt-16">
          <div className="hud-panel p-6">
            <p className="text-text-secondary text-sm leading-relaxed">
              <strong className="text-white">Buďme upřímní.</strong> Plánovaná fáze
              není slib — je to směr. Konkrétní priority dolaďujeme podle toho, co
              uslyšíme od pilotních partnerů. Pokud máte jiný problém, který chcete
              vidět v EkonomOS dřív, ozvěte se.
            </p>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection className="mt-16">
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Map size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Chcete ovlivnit, kam to půjde?
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Pilot partneři dostávají přímý hlas v plánování. Co budete potřebovat, postavíme dřív.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pilot" className="btn-primary">
                  Mám zájem o pilot
                  <ArrowRight size={16} />
                </Link>
                <Link href="/kontakt" className="btn-ghost">
                  Napsat dotaz
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
