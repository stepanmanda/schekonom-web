"use client";

import Link from "next/link";
import {
  BookOpen,
  Wallet,
  FileText,
  Globe,
  AlertTriangle,
  Brain,
  Phone as PhoneIcon,
  Workflow,
  ArrowRight,
  Layers,
  Cpu,
  Database,
  Plug,
  Building2,
  Mail as MailIcon,
  Banknote,
  Shield,
  Cloud,
  HeadphonesIcon,
  MapPin as MapPinIcon,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const modules = [
  {
    icon: BookOpen,
    code: "MOD-01",
    title: "Účetní reporting",
    desc: "Skutečnost vs. plán, cash flow, variance analýza. 9 analýz, které propojují účetnictví s rozpočtem a prognózou.",
    href: "/modul-ucetnictvi",
    analyses: 9,
  },
  {
    icon: Wallet,
    code: "MOD-02",
    title: "Mzdy + ČSSZ + ZP",
    desc: "Mzdové uzávěrky, fluktuace, nemocnost, ELDP, hlášení pojišťovnám. 10 analýz pro mzdovou agendu.",
    href: "/modul-mzdy",
    analyses: 10,
  },
  {
    icon: FileText,
    code: "MOD-03",
    title: "Daně + DPH",
    desc: "DPPO, DPFO, DPH, kontrolní hlášení, ViDA, e-fakturace. 10 analýz pro českou daňovou agendu.",
    href: "/modul-dane",
    analyses: 10,
  },
  {
    icon: Globe,
    code: "MOD-04",
    title: "CZ/DE + ELSTER",
    desc: "Steuererklärung, Freistellung, Kindergeld, pendleři A1, transferové ceny. 11 analýz pro CZ/DE agendu.",
    href: "/modul-cz-de",
    analyses: 11,
  },
];

const aiLayer = [
  {
    icon: AlertTriangle,
    title: "Detekce podvodů a chyb",
    desc: "Změny IBAN u dodavatelů, duplicitní faktury, nesoulady v dokumentech, deepfake faktury. Aplikace prochází data 24/7 a označí, co nesedí.",
  },
  {
    icon: PhoneIcon,
    title: "Hlasová a textová analýza",
    desc: "EkonomOS analyzuje tón a obsah klientské komunikace. Najde vážná témata mezi řádky, frustraci, požadavek, který jste mohli přehlédnout.",
  },
  {
    icon: Workflow,
    title: "Automatizovaná workflow",
    desc: "8 N8N workflow pro běžné úkony: OCR příjem faktur, párování plateb, 3stupňové upomínky, mzdové uzávěrky, ELSTER podání. Bez ručního klikání.",
  },
  {
    icon: Brain,
    title: "Prediktivní vrstva",
    desc: "Pět ML analýz na úrovni klienta: kdy odejde, co ho udrží, kdy ho oslovit, jakou cenu unese, jestli je v hledáčku akvizice. Detail níže.",
  },
];

const externalSignals = [
  { title: "ARES + VIES", source: "API", good: "Vše validní, plátce DPH", bad: "Dodavatel zrušen v ARES — fiktivní firma" },
  { title: "Insolvenční rejstřík", source: "justice.cz", good: "0 nálezů", bad: "Klient podal insolvenční návrh" },
  { title: "Pracovní inzeráty", source: "scraping", good: "Najímá — firma roste", bad: "Najímá účetní — chce nás nahradit?" },
  { title: "Tiskové zprávy", source: "RSS", good: "Pozitivní PR", bad: "Negativní média — reputační riziko" },
  { title: "Výběrová řízení", source: "portál", good: "Vyhrál zakázku 12M", bad: "Prohrál 3 tendry v řadě" },
  { title: "Regulatorní feeds", source: "CZ+DE+EU", good: "Připraven na novely", bad: "Novela ho zasáhne — neví o tom" },
  { title: "Kurzovní lístek", source: "ČNB + EZB API", good: "EUR stabilní, hedging nepotřeba", bad: "EUR +8 % za měsíc — nezajištěná pozice" },
  { title: "Sbírka listin", source: "justice.cz", good: "Výkazy zveřejněny", bad: "Nezveřejněny 2 roky — pokuta 100 K" },
];

const predictiveAnalyses = [
  {
    title: "Kdy klient odejde",
    method: "ML klasifikace",
    good: "0 % riziko odchodu",
    bad: "87 % pravděpodobnost odchodu do 60 dní",
  },
  {
    title: "Co ho zachrání",
    method: "Uplift modeling",
    good: "Klient stabilní — žádná akce nepotřeba",
    bad: "Osobní schůzka + sleva 10 % = 64 % šance na udržení",
  },
  {
    title: "Optimální moment kontaktu",
    method: "Behaviorální analýza",
    good: "Úterý 10:00 — response rate 89 %",
    bad: "Pátek 16:00 — response rate 12 %",
  },
  {
    title: "Cenová elasticita",
    method: "Historie reakcí",
    good: "Toleruje +20 % bez reakce",
    bad: "Zlomový bod při +3 % — okamžitý odchod",
  },
  {
    title: "Predikce akvizice / fúze",
    method: "Detekce signálů",
    good: "Stabilní struktura",
    bad: "3 signály fúze — připravit transition plán",
  },
];

const stats = [
  { value: "205", label: "Analýz" },
  { value: "184", label: "Datových zdrojů" },
  { value: "23", label: "Kategorií" },
  { value: "8", label: "Workflow" },
];

const integrations = [
  { icon: Database, name: "Money S3 / Pohoda", category: "Účetní systém" },
  { icon: Layers, name: "DocuWare", category: "DMS dokumenty" },
  { icon: HeadphonesIcon, name: "Daktela", category: "Contact center" },
  { icon: Banknote, name: "Bankovní API (FIO, KB, ČSOB)", category: "Transakce" },
  { icon: Building2, name: "ARES + VIES", category: "Rejstříky firem" },
  { icon: Shield, name: "ČSSZ + eNeschopenky", category: "Sociální pojištění" },
  { icon: FileText, name: "DIS+ (Finanční správa)", category: "Daňový portál" },
  { icon: Globe, name: "ELSTER / Finanzamt", category: "Německé daně" },
  { icon: MailIcon, name: "Email server (IMAP)", category: "Komunikace" },
  { icon: Building2, name: "Justice.cz", category: "Rejstříky" },
  { icon: MapPinIcon, name: "GPS + knihy jízd", category: "Geolokace" },
  { icon: Cloud, name: "Reenio", category: "Rezervace termínů" },
  { icon: Plug, name: "TeamViewer", category: "Vzdálená podpora" },
  { icon: Cloud, name: "ČHMÚ", category: "Meteorologická data" },
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

export default function FunkcePage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page header */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            FUNKCE // CO EKONOMOS UMÍ
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Čtyři <span className="text-cyan">moduly</span>,
            <br />
            jedna AI <span className="text-gold">vrstva</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            EkonomOS dělí účetní firmu do čtyř modulů. Pod nimi běží AI vrstva,
            která propojuje data napříč moduly a hledá souvislosti, které byste
            jinak nevidíli.
          </p>
        </div>

        {/* Stats */}
        <FadeInSection className="mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-cyan/10">
            {stats.map((s) => (
              <div key={s.label} className="bg-void px-5 py-5 text-center">
                <div
                  className="text-cyan text-2xl font-bold"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.value}
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

        {/* Module cards */}
        <FadeInSection className="mb-8">
          <div className="flex items-center gap-4">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              ZÁKLADNÍ MODULY // 4 OBLASTI
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {modules.map((m) => (
            <Link
              key={m.code}
              href={m.href}
              className="service-card p-8 flex flex-col group"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="p-3 border border-cyan/15 bg-cyan/5 group-hover:bg-cyan/15 transition-colors">
                  <m.icon size={22} className="text-cyan" />
                </div>
                <span
                  className="text-text-muted"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                  }}
                >
                  {m.code}
                </span>
              </div>
              <h3
                className="text-white text-xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {m.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                {m.desc}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-cyan/8">
                <span
                  className="hud-chip"
                  data-tone="cyan"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {m.analyses} analýz
                </span>
                <span className="inline-flex items-center gap-2 text-cyan text-sm font-medium group-hover:gap-3 transition-all">
                  Detail
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* AI layer label */}
        <FadeInSection className="mb-8">
          <div className="flex items-center gap-4">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse-dot" />
              AI VRSTVA // 4 NADMODULOVÉ FUNKCE
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan/20 to-transparent" />
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {aiLayer.map((a) => (
            <div key={a.title} className="service-card service-card-ai p-8">
              <div className="flex items-start justify-between mb-5">
                <div className="p-3 border border-cyan/30 bg-cyan/10">
                  <a.icon size={22} className="text-cyan" />
                </div>
                <span className="hud-chip" data-tone="cyan">
                  AI uvnitř
                </span>
              </div>
              <h3
                className="text-white text-xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {a.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {a.desc}
              </p>
            </div>
          ))}
        </div>

        {/* External signals layer */}
        <FadeInSection className="mb-8">
          <div className="flex items-center gap-4">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse-dot" />
              EXTERNÍ SIGNÁLY // 8 ZDROJŮ MIMO ÚČETNICTVÍ
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan/20 to-transparent" />
          </div>
        </FadeInSection>

        <FadeInSection className="mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Co se s klientem děje <span className="text-cyan">venku</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl leading-relaxed">
            Účetnictví ukazuje minulost. Externí signály ukazují, co se kolem
            klienta děje právě teď — z ARES, insolvenčního rejstříku, médií,
            tendrů a kurzů. Aplikace si všimne, co byste sami nestíhli sledovat.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-24">
          {externalSignals.map((s) => (
            <div key={s.title} className="hud-panel p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="hud-chip" data-tone="cyan">
                  KLIENT
                </span>
                <span
                  className="text-text-muted"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  ← {s.source}
                </span>
              </div>
              <h3
                className="text-white text-base font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {s.title}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span
                    className="text-status-green flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    OK:
                  </span>
                  <span className="text-text-secondary">{s.good}</span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="text-status-red flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Risk:
                  </span>
                  <span className="text-text-secondary">{s.bad}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Predictive layer detail */}
        <FadeInSection className="mb-8">
          <div className="flex items-center gap-4">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse-dot" />
              PREDIKTIVNÍ VRSTVA // 5 ML ANALÝZ NA KLIENTA
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
          </div>
        </FadeInSection>

        <FadeInSection className="mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Pět ML pohledů na <span className="text-gold">každého klienta</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl leading-relaxed">
            Pro každého klienta běží pět prediktivních analýz s drill-down do
            scénářů „dobrý stav" vs. „rizikový stav". Plus konkrétní akce, co
            dělat.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {predictiveAnalyses.map((p) => (
            <div key={p.title} className="hud-panel p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="hud-chip" data-tone="cyan">
                  KLIENT
                </span>
                <span
                  className="text-text-muted"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  ← {p.method}
                </span>
              </div>
              <h3
                className="text-white text-base font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {p.title}
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex gap-2">
                  <span
                    className="text-status-green flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Dobrý stav:
                  </span>
                  <span className="text-text-secondary">{p.good}</span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="text-status-red flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Riziko:
                  </span>
                  <span className="text-text-secondary">{p.bad}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integrace / Napojení na systémy */}
        <FadeInSection className="mb-8">
          <div className="flex items-center gap-4">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
              DATOVÉ ZDROJE // NAPOJENÍ
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan/20 to-transparent" />
          </div>
        </FadeInSection>

        <FadeInSection className="mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Napojíme se na <span className="text-cyan">vaše stávající systémy</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl leading-relaxed">
            EkonomOS nepřepisuje, co už používáte. Připojí se k vašim účetním
            systémům, dokumentovým úložištím, bankám, rejstříkům a státním
            portálům. 14 výchozích integrací na den jedna, další přidáváme na
            míru.
          </p>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-24">
          {integrations.map((i) => (
            <div
              key={i.name}
              className="hud-panel p-4 flex items-center gap-3 hover:border-cyan/25 transition-colors"
            >
              <div className="p-2 border border-cyan/15 bg-cyan/5 flex-shrink-0">
                <i.icon size={16} className="text-cyan" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white text-sm font-medium truncate">
                  {i.name}
                </div>
                <div
                  className="text-text-muted truncate"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  {i.category}
                </div>
              </div>
              <span className="hud-chip" data-tone="green">
                ●
              </span>
            </div>
          ))}
        </div>

        {/* Komplet servis sekce */}
        <FadeInSection className="mb-24">
          <div className="hud-panel p-10 text-center">
            <Layers size={32} className="text-gold mx-auto mb-5" />
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Web, portál i aplikace —
              <br />
              <span className="text-gold">postavíme za vás</span>
            </h2>
            <p className="text-text-secondary text-base max-w-2xl mx-auto leading-relaxed">
              Veřejný web na vaší doméně s vaším brandem. Pod ním klientský
              portál, kde se přihlásí vaši klienti. A administrátorská
              aplikace s 205 analýzami pro vás. Tři vrstvy, jedno řešení,
              postaví a hostuje studio VELYOS.
            </p>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Cpu size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Vyzkoušejte demo
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                3 demo profily bez registrace. Klient, mzdová účetní, daňový
                poradce. Otevřete si, prohlédněte si, vyzkoušejte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/prihlaseni" className="btn-primary">
                  Otevřít demo
                  <ArrowRight size={16} />
                </Link>
                <Link href="/kontakt" className="btn-ghost">
                  Domluvit konzultaci
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
