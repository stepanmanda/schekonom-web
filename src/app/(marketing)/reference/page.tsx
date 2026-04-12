"use client";

import {
  Quote,
  MapPin,
  ArrowRight,
  Star,
  Building2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    quote:
      "SCH-EKONOM nám ušetřil stovky hodin ročně automatizací účetních procesů. Přeshraniční operace s Bavorskem zvládají jako jediní v regionu bezchybně. Oceňuji hlavně osobní přístup — vždy mám na druhé straně odborníka, který zná moji firmu.",
    author: "Tomáš Nový",
    role: "Jednatel, TN Holz s.r.o.",
    region: "Cheb → Bavorsko",
    service: "Přeshraniční CZ/DE",
    area: "Dřevozpracující průmysl",
    rating: 5,
  },
  {
    quote:
      "Profesionalita na úrovni velkých pražských kanceláří, ale s osobním přístupem malé rodinné firmy. Vždy dostupní, vždy připravení pomoct. Za 6 let spolupráce jsem neměla jediný problém s finančním úřadem.",
    author: "Eva Marková",
    role: "OSVČ, Architektonické studio",
    region: "Cheb, CZ",
    service: "Daňové poradenství",
    area: "Architektura",
    rating: 5,
  },
  {
    quote:
      "AI systém detekoval chybu v našem předchozím přiznání, která by nás stála přes 200 000 Kč. Investice do jejich služeb se vrátila během prvního měsíce. Prediktivní analýza cash-flow nám navíc pomáhá lépe plánovat investice.",
    author: "Martin Dvořák",
    role: "CFO, Strojírny Cheb a.s.",
    region: "Cheb, CZ",
    service: "AI Finanční analýza",
    area: "Strojírenství",
    rating: 5,
  },
  {
    quote:
      "Kindergeld vyřídili během 6 týdnů, přičemž předchozí poradce to nezvládl za půl roku. Komunikace s Familienkasse v němčině bez problémů. Teď řeší i moje Steuererklärung a vrácení daně je vždy vyšší, než jsem čekal.",
    author: "Petr Šimůnek",
    role: "Pendler, Automobilový průmysl",
    region: "Cheb → Weiden",
    service: "Německé daně",
    area: "Automobilový průmysl",
    rating: 5,
  },
  {
    quote:
      "Už 8 let spolupracujeme a nikdy jsme neměli jediný problém s finančním úřadem. To mluví samo za sebe. Mzdovou agendu pro 45 zaměstnanců zpracovávají vždy přesně a včas — žádné opravy, žádné zpoždění.",
    author: "Jana Kratochvílová",
    role: "Jednatelka, JK Fashion s.r.o.",
    region: "Karlovy Vary, CZ",
    service: "Účetnictví & mzdy",
    area: "Maloobchod",
    rating: 5,
  },
  {
    quote:
      "Automatizované reporty nám dávají přehled o finanční kondici firmy v reálném čase. Už nemusíme čekat na měsíční uzávěrku. Dashboard je přehledný a upozornění na překročení prahů funguje skvěle.",
    author: "Ing. Vladimír Beneš",
    role: "CEO, BenTech Solutions s.r.o.",
    region: "Cheb, CZ",
    service: "AI Reporting",
    area: "IT služby",
    rating: 5,
  },
  {
    quote:
      "Přeshraniční poradenství, jaké jinde nenajdete. Pomohli nám s transferovými cenami a strukturou pro německé investory. Bez jejich expertízy bychom vstup na český trh nezvládli tak hladce.",
    author: "Klaus Müller",
    role: "Geschäftsführer, Müller Metallbau GmbH",
    region: "Marktredwitz → Cheb",
    service: "Přeshraniční CZ/DE",
    area: "Kovovýroba",
    rating: 5,
  },
  {
    quote:
      "Freistellung vyřídili rychle a bez komplikací. Úspora na srážkové dani činí ročně přes 800 000 Kč. Navíc pohlídají všechny termíny a sami upozorní na blížící se expiraci certifikátu.",
    author: "Ing. Pavel Horák",
    role: "Finanční ředitel, Cheb Logistics s.r.o.",
    region: "Cheb, CZ",
    service: "Freistellung",
    area: "Logistika",
    rating: 5,
  },
  {
    quote:
      "Po letech hledání jsme konečně našli poradce, který rozumí specifice pendlerů. Steuererklärung i sociální pojištění mají pod kontrolou. Roční vrácení daně z Německa se díky nim zvýšilo o 40 %.",
    author: "Lucie Veselá",
    role: "Zdravotní sestra, pendler",
    region: "Cheb → Waldsassen",
    service: "Německé daně",
    area: "Zdravotnictví",
    rating: 5,
  },
];

const stats = [
  { val: "340+", label: "Aktivních klientů" },
  { val: "30+", label: "Let na trhu" },
  { val: "99 %", label: "Spokojenost klientů" },
  { val: "92 %", label: "Klientů nás doporučuje" },
];

const serviceAreas = [
  "Účetnictví",
  "Daňové poradenství",
  "Mzdy",
  "Německé daně",
  "Přeshraniční CZ/DE",
  "AI analýza",
  "AI reporting",
  "Freistellung",
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`glass-panel p-8 flex flex-col group hover:border-gold/20 transition-all duration-300 ${
        inView
          ? `animate-float-up delay-${((index % 3) + 1) * 200}`
          : "opacity-0"
      }`}
    >
      {/* Rating stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-gold fill-gold" />
        ))}
      </div>

      {/* Quote icon */}
      <Quote size={24} className="text-gold/25 mb-3 flex-shrink-0" />

      {/* Quote text */}
      <p className="text-text-secondary text-sm leading-relaxed flex-1 italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Service & area tags */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        <span className="hud-chip" data-tone="cyan">
          {testimonial.service}
        </span>
        <span className="hud-chip" data-tone="slate">
          {testimonial.area}
        </span>
      </div>

      {/* Author */}
      <div className="mt-5 pt-4 border-t border-cyan/10">
        <div className="flex items-start justify-between">
          <div>
            <div
              className="text-white font-semibold text-sm"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {testimonial.author}
            </div>
            <div className="text-text-muted text-xs mt-0.5">
              {testimonial.role}
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
            <MapPin size={10} className="text-cyan/60" />
            <span
              className="text-text-muted"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
              }}
            >
              {testimonial.region}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

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

export default function ReferencePage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            REFERENCE // KLIENTI
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Co říkají naši <span className="text-gold">klienti</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            340+ aktivních klientů nám svěřuje své finance. Podívejte se, proč
            nám důvěřují podnikatelé, firmy a pendleři z celého regionu Cheb,
            Karlovy Vary, Plzeň a přilehlého Bavorska.
          </p>
        </div>

        {/* Stats bar */}
        <FadeInSection className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gold/10">
            {stats.map((s) => (
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

        {/* Service area filter (visual, non-interactive) */}
        <FadeInSection className="mb-12">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-text-muted"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Oblasti:
            </span>
            {serviceAreas.map((area) => (
              <span key={area} className="hud-chip" data-tone="slate">
                {area}
              </span>
            ))}
          </div>
        </FadeInSection>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.author} testimonial={t} index={i} />
          ))}
        </div>

        {/* Trust indicators */}
        <FadeInSection className="mb-24">
          <div className="hud-panel p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-6">
              <Building2 size={18} className="text-gold" />
              <span
                className="text-gold"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Proc nam klienti doveruji
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  val: "30+",
                  label: "Let nepřetržité praxe",
                  desc: "Stabilní firma se zkušeným týmem od 90. let",
                },
                {
                  val: "0",
                  label: "Penále za chybu",
                  desc: "Žádné sankce způsobené naší chybou za celou historii",
                },
                {
                  val: "40+",
                  label: "Odborníků v týmu",
                  desc: "Daňoví poradci, účetní, mzdové specialistky",
                },
                {
                  val: "2",
                  label: "Pobočky",
                  desc: "Cheb (hlavní kancelář) a Plzeň",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    className="text-gold text-2xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {item.val}
                  </div>
                  <div
                    className="text-white text-sm font-semibold mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {item.label}
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Users size={32} className="text-gold mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Připojte se k 340+ spokojeným klientům
              </h3>
              <p className="text-text-secondary mb-8 max-w-md leading-relaxed">
                Nezávazná konzultace zdarma. Pojďme společně zjistit, jak vám
                můžeme pomoct s účetnictvím, daněmi nebo mzdami.
              </p>
              <Link href="/kontakt" className="btn-primary">
                Domluvit konzultaci
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
