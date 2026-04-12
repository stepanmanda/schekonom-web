"use client";

import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Banknote,
  ArrowRight,
  Mail,
  Phone,
  Users,
  CheckCircle2,
  Clock,
  Building2,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const positions = [
  {
    code: "POS-001",
    title: "Vedouci ucetniho oddeleni",
    titleDisplay: "Vedoucí účetního oddělení",
    salary: "50 000 - 85 000 Kc",
    location: "Cheb",
    type: "Plny uvazek",
    desc: "Hledame zkuseneho vedouciho ucetniho oddeleni, ktery prevezme odpovednost za vedeni tymu ucetnich a zajisteni kvality ucetnich sluzeb pro nase klienty.",
    descDisplay:
      "Hledáme zkušeného vedoucího účetního oddělení, který převezme odpovědnost za vedení týmu účetních a zajištění kvality účetních služeb pro naše klienty.",
    requirements: [
      "Minimálně 5 let praxe v účetnictví",
      "Zkušenost s vedením týmu",
      "Znalost české daňové legislativy",
      "Komunikativnost a organizační schopnosti",
    ],
    highlight: true,
  },
  {
    code: "POS-002",
    title: "Datovy analytik",
    titleDisplay: "Datový analytik",
    salary: "50 000 - 85 000 Kc",
    location: "Cheb",
    type: "Plny uvazek",
    desc: "Hledame datoveho analytika pro vyvoj a spravu nasich internich analytickych nastroju a AI platformy pro financni analyzu.",
    descDisplay:
      "Hledáme datového analytika pro vývoj a správu našich interních analytických nástrojů a AI platformy pro finanční analýzu.",
    requirements: [
      "Znalost SQL, Python nebo R",
      "Zkušenost s datovou vizualizací",
      "Analytické myšlení a pozornost k detailu",
      "Výhodou: zkušenost s účetními/finančními daty",
    ],
    highlight: true,
  },
  {
    code: "POS-003",
    title: "Financni ucetni senior",
    titleDisplay: "Finanční účetní senior",
    salary: "25 000 - 40 000 Kc",
    location: "Cheb",
    type: "Plny uvazek",
    desc: "Zkuseny ucetni pro samostatne vedeni ucetnictvi portfolia klientu vcetne zpracovani danovych priznani a ucetnich zaverek.",
    descDisplay:
      "Zkušený účetní pro samostatné vedení účetnictví portfolia klientů včetně zpracování daňových přiznání a účetních závěrek.",
    requirements: [
      "Minimálně 3 roky praxe v účetnictví",
      "Znalost podvojného účetnictví a daňové evidence",
      "Zkušenost s účetním softwarem",
      "Samostatnost a spolehlivost",
    ],
    highlight: false,
  },
  {
    code: "POS-004",
    title: "Financni ucetni junior",
    titleDisplay: "Finanční účetní junior",
    salary: "25 000 - 30 000 Kc",
    location: "Cheb",
    type: "Plny uvazek",
    desc: "Pozice vhodna pro absolventy nebo ucetni s kratsi praxi, kteri chtejí rust v oboru ucetnictvi pod vedenim zkusenych kolegu.",
    descDisplay:
      "Pozice vhodná pro absolventy nebo účetní s kratší praxí, kteří chtějí růst v oboru účetnictví pod vedením zkušených kolegů.",
    requirements: [
      "SŠ/VŠ vzdělání ekonomického směru",
      "Základní znalost účetnictví",
      "Chuť učit se a rozvíjet",
      "Pečlivost a zodpovědnost",
    ],
    highlight: false,
  },
  {
    code: "POS-005",
    title: "Asistent/ka danoveho poradce",
    titleDisplay: "Asistent/ka daňového poradce",
    salary: null,
    location: "Cheb",
    type: "Plny uvazek",
    desc: "Podpora danovych poradcu pri priprave danovych priznani, analyze legislativnich zmen a komunikaci s financnimi urady.",
    descDisplay:
      "Podpora daňových poradců při přípravě daňových přiznání, analýze legislativních změn a komunikaci s finančními úřady.",
    requirements: [
      "VŠ vzdělání (ekonomie, právo nebo příbuzný obor)",
      "Zájem o daňovou problematiku",
      "Analytické myšlení",
      "Znalost AJ nebo NJ výhodou",
    ],
    highlight: false,
  },
  {
    code: "POS-006",
    title: "Asistentka / recepcni danove kancelare",
    titleDisplay: "Asistentka / recepční daňové kanceláře",
    salary: null,
    location: "Cheb",
    type: "Plny uvazek",
    desc: "Prvni kontakt pro nase klienty. Zajisteni hladkeho chodu kancelare, komunikace s klienty a administrativa.",
    descDisplay:
      "První kontakt pro naše klienty. Zajištění hladkého chodu kanceláře, komunikace s klienty a administrativa.",
    requirements: [
      "Příjemné vystupování a komunikativnost",
      "Organizační schopnosti",
      "Znalost práce s PC (MS Office)",
      "Znalost NJ výhodou",
    ],
    highlight: false,
  },
  {
    code: "POS-007",
    title: "IT Junior",
    titleDisplay: "IT Junior",
    salary: null,
    location: "Cheb",
    type: "Plny uvazek",
    desc: "Sprava IT infrastruktury, podpora uzivatelu a ucast na vyvoji internich nastroju a automatizaci procesu.",
    descDisplay:
      "Správa IT infrastruktury, podpora uživatelů a účast na vývoji interních nástrojů a automatizaci procesů.",
    requirements: [
      "Základní znalost sítí a serverové infrastruktury",
      "Znalost Windows/Linux prostředí",
      "Chuť učit se nové technologie",
      "Výhodou: zkušenost s webovými technologiemi",
    ],
    highlight: false,
  },
  {
    code: "POS-008",
    title: "Mzdovy ucetni junior",
    titleDisplay: "Mzdový účetní junior",
    salary: null,
    location: "Cheb",
    type: "Plny uvazek",
    desc: "Zpracovani mezd, personalni administrativa a komunikace s institucemi pod vedenim zkusenych mzdovych ucetnich.",
    descDisplay:
      "Zpracování mezd, personální administrativa a komunikace s institucemi pod vedením zkušených mzdových účetních.",
    requirements: [
      "SŠ/VŠ ekonomického směru",
      "Zájem o mzdovou problematiku",
      "Pečlivost a diskrétnost",
      "Znalost pracovního práva výhodou",
    ],
    highlight: false,
  },
];

const benefits = [
  "Stabilní zázemí firmy s 30+ lety na trhu",
  "Přátelský kolektiv a rodinná atmosféra",
  "Možnost profesního růstu a vzdělávání",
  "Moderní kancelářské prostory v Chebaně",
  "5 týdnů dovolené",
  "Příspěvek na stravování",
  "Flexibilní pracovní doba",
  "Možnost částečného home-office",
];

function FadeInSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${inView ? "animate-float-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

function PositionCard({
  position,
  index,
}: {
  position: (typeof positions)[0];
  index: number;
}) {
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`service-card ${position.highlight ? "service-card-ai" : ""} p-8 ${
        inView
          ? `animate-float-up delay-${((index % 4) + 1) * 100}`
          : "opacity-0"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 border ${position.highlight ? "border-cyan/30 bg-cyan/10" : "border-cyan/15 bg-cyan/5"}`}
          >
            <Briefcase
              size={18}
              className={position.highlight ? "text-cyan" : "text-cyan/70"}
            />
          </div>
          {position.highlight && (
            <span className="hud-chip" data-tone="cyan">
              Top pozice
            </span>
          )}
        </div>
        <span
          className="text-text-muted"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
          }}
        >
          {position.code}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-white text-xl font-semibold mb-3"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {position.titleDisplay}
      </h3>

      {/* Meta info */}
      <div className="flex flex-wrap gap-4 mb-5">
        {position.salary && (
          <div className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Banknote size={14} className="text-status-green flex-shrink-0" />
            {position.salary}
          </div>
        )}
        <div className="flex items-center gap-1.5 text-text-muted text-sm">
          <MapPin size={14} className="text-cyan/60 flex-shrink-0" />
          {position.location}
        </div>
        <div className="flex items-center gap-1.5 text-text-muted text-sm">
          <Clock size={14} className="text-cyan/60 flex-shrink-0" />
          {position.type}
        </div>
      </div>

      {/* Description */}
      <p className="text-text-muted text-sm leading-relaxed mb-6">
        {position.descDisplay}
      </p>

      {/* Requirements */}
      <ul className="space-y-2 mb-6">
        {position.requirements.map((req) => (
          <li
            key={req}
            className="flex items-start gap-2.5 text-text-muted text-sm"
          >
            <CheckCircle2
              size={14}
              className="text-cyan/50 mt-0.5 flex-shrink-0"
            />
            {req}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="pt-4 border-t border-cyan/8">
        <a
          href="mailto:klaudie.sulcova@schekonom.cz?subject=Zájem o pozici: ${position.titleDisplay}"
          className="inline-flex items-center gap-2 text-cyan text-sm font-medium hover:gap-3 transition-all"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Více informací
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

export default function VolnaMistaPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page header */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            KARIÉRA // VOLNÁ MÍSTA
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Pracujte s námi
            <br />v <span className="text-gold">SCH-EKONOM</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Hledáme kolegy, kteří chtějí růst v oboru účetnictví, daní a
            financí. Nabízíme stabilní zázemí, přátelský tým a možnost podílet
            se na moderní transformaci tradiční účetní firmy.
          </p>
        </div>

        {/* Stats */}
        <FadeInSection className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gold/10">
            {[
              { val: String(positions.length), label: "Otevřených pozic" },
              { val: "40+", label: "Kolegů v týmu" },
              { val: "30+", label: "Let na trhu" },
              { val: "2", label: "Pobočky" },
            ].map((s) => (
              <div key={s.label} className="bg-void px-5 py-5 text-center">
                <div
                  className="text-gold text-2xl font-bold"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-text-muted mt-1"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Benefits panel */}
        <FadeInSection className="mb-20">
          <div className="hud-panel p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-6">
              <Users size={20} className="text-gold" />
              <span
                className="text-gold"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Co nabizime
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-status-green mt-0.5 flex-shrink-0"
                  />
                  <span className="text-text-secondary text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Positions label */}
        <FadeInSection className="mb-8">
          <div className="flex items-center gap-4">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
              POZICE // {positions.length} OTEVŘENÝCH MÍST
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan/20 to-transparent" />
          </div>
        </FadeInSection>

        {/* Positions grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {positions.map((pos, i) => (
            <PositionCard key={pos.code} position={pos} index={i} />
          ))}
        </div>

        {/* Contact for applications */}
        <FadeInSection className="mb-24">
          <div className="section-tag mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            KONTAKT // JAK SE PŘIHLÁSIT
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* How to apply */}
            <div className="glass-panel p-8">
              <h3
                className="text-white text-xl font-semibold mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Jak se přihlásit
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Pošlete nám svůj životopis a motivační dopis na e-mail níže.
                Odpovíme do 5 pracovních dnů. Pokud máte jakékoli dotazy,
                neváhejte zavolat.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 border border-gold/15 bg-gold/5">
                    <Mail size={16} className="text-gold" />
                  </div>
                  <div>
                    <div
                      className="text-text-muted mb-0.5"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      E-mail
                    </div>
                    <a
                      href="mailto:klaudie.sulcova@schekonom.cz"
                      className="text-white text-sm hover:text-cyan transition-colors"
                    >
                      klaudie.sulcova@schekonom.cz
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 border border-gold/15 bg-gold/5">
                    <Phone size={16} className="text-gold" />
                  </div>
                  <div>
                    <div
                      className="text-text-muted mb-0.5"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Telefon
                    </div>
                    <a
                      href="tel:+420731037177"
                      className="text-white text-sm hover:text-cyan transition-colors"
                    >
                      +420 731 037 177
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Office */}
            <div className="glass-panel p-8 group hover:border-gold/20 transition-all">
              <h3
                className="text-white text-xl font-semibold mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Kde nás najdete
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Naše hlavní kancelář se nachází v moderní budově Chebana v
                centru Chebu. Rádi vás uvítáme osobně.
              </p>
              <div className="flex items-start gap-4">
                <div className="p-2.5 border border-cyan/15 bg-cyan/5">
                  <Building2 size={16} className="text-cyan" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Chebana</div>
                  <div className="text-text-muted text-sm">
                    Obrněné brigády 553/31
                  </div>
                  <div className="text-text-muted text-sm">350 02 Cheb</div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Briefcase size={32} className="text-gold mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Nenašli jste vhodnou pozici?
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Pošlete nám svůj životopis i tak. Rádi vás oslovíme, až se
                otevře pozice odpovídající vašemu profilu.
              </p>
              <a
                href="mailto:klaudie.sulcova@schekonom.cz?subject=Spontánní přihláška"
                className="btn-primary"
              >
                Poslat životopis
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
