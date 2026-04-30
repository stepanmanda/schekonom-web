"use client";

import Link from "next/link";
import {
  BookOpen,
  Wallet,
  FileText,
  Globe,
  ShieldCheck,
  Brain,
  Workflow,
  ArrowRight,
  Layers,
  Eye,
  Lock,
  Clock,
  TrendingUp,
  AlertOctagon,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import RoiCalculator from "@/components/marketing/RoiCalculator";

const modules = [
  {
    icon: BookOpen,
    title: "Účetní reporting",
    desc: "Skutečnost vs. plán, cash flow, prognózy a variance analýza — propojené napříč klientovou agendou.",
    href: "/modul-ucetnictvi",
  },
  {
    icon: Wallet,
    title: "Mzdy + ČSSZ + ZP",
    desc: "Mzdová uzávěrka, fluktuace, nemocnost, hlášení pojišťovnám. Jedna obrazovka pro celý měsíc.",
    href: "/modul-mzdy",
  },
  {
    icon: FileText,
    title: "Daně a DPH",
    desc: "Česká daňová agenda v jednom toku — DPPO, DPFO, DPH, kontrolní hlášení, e-fakturace, monitoring legislativy.",
    href: "/modul-dane",
  },
  {
    icon: Globe,
    title: "CZ / DE",
    desc: "Pendleři, Steuererklärung, Freistellung, Kindergeld, ELSTER, transferové ceny. Přeshraniční agenda bez papírování.",
    href: "/modul-cz-de",
  },
];

const aiPillars = [
  {
    icon: Brain,
    title: "Predikce",
    desc: "Aplikace předpovídá riziko odchodu klienta, posouvá termíny, hledá nejlepší moment ke kontaktu — z dat, která už máte.",
  },
  {
    icon: ShieldCheck,
    title: "Detekce",
    desc: "Fraud, podvodné změny IBAN, duplicitní faktury, nesoulady, podezřelá komunikace. 24/7 hlídání bez vašeho zásahu.",
  },
  {
    icon: Workflow,
    title: "Automatizace",
    desc: "Rutinní úkony běží na pozadí — příjem faktur, párování plateb, upomínky, uzávěrky. Vy schvalujete, robot pracuje.",
  },
];

const stats = [
  { value: "200+", label: "Analýz" },
  { value: "20+", label: "Datových zdrojů" },
  { value: "8", label: "Workflow" },
  { value: "24/7", label: "Online provoz" },
];

const impacts = [
  {
    icon: Clock,
    title: "Méně rutinní práce",
    desc: "OCR faktur, auto-párování plateb, hlídání termínů, příprava DPH KH. Co dnes děláte ručně, budete schvalovat — místo dělat.",
    expectation: "Cíl: pokles ručního času o desítky hodin měsíčně",
  },
  {
    icon: TrendingUp,
    title: "Růst bez najímání",
    desc: "Stejný tým obslouží víc firem. Pokud rostete, ale brzdí vás kapacita lidí, EkonomOS je tu proto, abyste mohli říct ano dalším klientům bez najímání.",
    expectation: "Cíl: zvládnout o desítky procent víc klientů",
  },
  {
    icon: AlertOctagon,
    title: "Méně chyb a fraud rizik",
    desc: "Aplikace ověří IBAN proti rejstříkům, označí duplicitní faktury, podezřelé změny. Cíl je zachytit chybu dřív, než z ní bude škoda.",
    expectation: "Cíl: záchyt rizik dřív než finanční úřad nebo banka",
  },
  {
    icon: UserCheck,
    title: "Méně odchodů klientů",
    desc: "Z dat klienta poznáme, že jeho komunikace s vámi se mění — dřív, než přijde výpověď. Vy stihnete reagovat, místo abyste se učili z odešlých klientů.",
    expectation: "Cíl: snížit počet odchodů, který dnes berete jako normu",
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
            EkonomOS rozděluje účetní firmu na čtyři moduly. Pod nimi běží AI vrstva,
            která propojuje data napříč moduly a hledá souvislosti, které byste
            jinak nevidíli. Detail funkčnosti vám ukážeme na osobní konzultaci.
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

        {/* Impact / oblasti dopadu */}
        <FadeInSection className="mb-8">
          <div className="flex items-center gap-4">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse-dot" />
              KDE TO POMŮŽE // OBLASTI DOPADU
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
          </div>
        </FadeInSection>

        <FadeInSection className="mb-12">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Čtyři oblasti, kde EkonomOS
            <br />
            <span className="text-gold">míří udělat rozdíl</span>
          </h2>
          <p className="text-text-secondary text-base max-w-3xl leading-relaxed">
            EkonomOS je nový produkt v pilotní fázi. Konkrétní čísla nemůžeme slíbit, dokud je společně se zákazníkem nezměříme. Tady jsou oblasti, kde produkt cílí na měřitelný rozdíl — a kde s vámi rádi nastavíme baseline a porovnáme stav před a po.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {impacts.map((i) => (
            <div key={i.title} className="hud-panel p-7">
              <div className="flex items-start gap-5">
                <div className="p-3 border border-gold/30 bg-gold/5 flex-shrink-0">
                  <i.icon size={22} className="text-gold" />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-white text-lg font-semibold mb-3"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {i.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-3">
                    {i.desc}
                  </p>
                  <div
                    className="text-cyan border-t border-cyan/10 pt-3"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    ◉ {i.expectation}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pilot pozvánka */}
        <FadeInSection className="mb-24">
          <div className="hud-panel p-10" style={{ borderTop: "2px solid rgba(212,175,55,0.5)" }}>
            <div
              className="text-gold mb-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              ◉ Pilot fáze — hledáme partnery
            </div>
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <h3
                  className="text-white text-2xl sm:text-3xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Buďte u toho první.
                  <br />
                  <span className="text-gold">Společně to změříme.</span>
                </h3>
                <p className="text-text-secondary text-base leading-relaxed mb-4 max-w-2xl">
                  EkonomOS je nový produkt. Místo abychom slibovali čísla bez podkladu, hledáme <strong className="text-white">3–5 prvních partnerských kanceláří</strong>, se kterými nasadíme produkt, společně nastavíme metriky a po 6 měsících veřejně publikujeme reálný dopad.
                </p>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li className="flex gap-3">
                    <CheckCircle2 size={16} className="text-status-green mt-0.5 flex-shrink-0" />
                    Pilot za zvýhodněných podmínek (sleva nebo prodloužené free období)
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 size={16} className="text-status-green mt-0.5 flex-shrink-0" />
                    Společný měřící framework — baseline před nasazením, výsledky za 6 měsíců
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 size={16} className="text-status-green mt-0.5 flex-shrink-0" />
                    Přímý přístup k vývojovému týmu — vaše požadavky se promítají do produktu
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 size={16} className="text-status-green mt-0.5 flex-shrink-0" />
                    Spoluautorství první case study (volitelně, anonymizovaně i otevřeně)
                  </li>
                </ul>
              </div>
              <Link href="/kontakt" className="btn-primary whitespace-nowrap self-start lg:self-center">
                Mám zájem o pilot
                <ArrowRight size={16} />
              </Link>
            </div>
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
              key={m.title}
              href={m.href}
              className="service-card p-8 flex flex-col group"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="p-3 border border-cyan/15 bg-cyan/5 group-hover:bg-cyan/15 transition-colors">
                  <m.icon size={22} className="text-cyan" />
                </div>
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
              <div className="pt-4 border-t border-cyan/8">
                <span className="inline-flex items-center gap-2 text-cyan text-sm font-medium group-hover:gap-3 transition-all">
                  Stručný přehled
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* AI pillars */}
        <FadeInSection className="mb-8">
          <div className="flex items-center gap-4">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse-dot" />
              AI VRSTVA // CO BĚŽÍ POD MODULY
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan/20 to-transparent" />
          </div>
        </FadeInSection>

        <FadeInSection className="mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Tři pilíře, které <span className="text-cyan">vidíte v každém modulu</span>
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {aiPillars.map((p) => (
            <div key={p.title} className="service-card service-card-ai p-8 flex flex-col">
              <div className="p-3 border border-cyan/30 bg-cyan/10 inline-flex w-fit mb-5">
                <p.icon size={22} className="text-cyan" />
              </div>
              <h3
                className="text-white text-xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {p.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed flex-1">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tease — Skryté signály */}
        <FadeInSection className="mb-24">
          <div className="hud-panel p-10 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
            <div className="p-4 border border-gold/30 bg-gold/5">
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
                Skryté signály
              </div>
              <h3
                className="text-white text-xl sm:text-2xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Drobnosti, kterých si lidé sami nevšimnou
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed max-w-2xl">
                Vedle účetních dat sleduje aplikace desítky signálů, ze kterých skládá obraz toho, co se s klientem opravdu děje. Konkrétní seznam ukazujeme až klientům — proč byste měli prozradit konkurenci, na co se my dívají.
              </p>
            </div>
            <Link
              href="/kontakt"
              className="btn-primary whitespace-nowrap"
            >
              Domluvit demo
              <ArrowRight size={16} />
            </Link>
          </div>
        </FadeInSection>

        {/* Komplet servis sekce */}
        <FadeInSection className="mb-24">
          <div className="hud-panel p-10 text-center">
            <Layers size={32} className="text-gold mx-auto mb-5" />
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Web, portál i aplikaci —
              <br />
              <span className="text-gold">postavíme za vás</span>
            </h2>
            <p className="text-text-secondary text-base max-w-2xl mx-auto leading-relaxed">
              Veřejný web na vaší doméně s vaším brandem. Pod ním klientský
              portál, kde se přihlásí vaši klienti. A administrátorská
              aplikace pro vás. Tři vrstvy, jedno řešení, postaví a hostuje studio VELYOS.
            </p>
          </div>
        </FadeInSection>

        {/* Final CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Lock size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Plný katalog je pro klienty
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Konkrétní analýzy, integrace a metodologii ukazujeme až po nezávazné konzultaci. Demo dostupné po krátkém hovoru.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn-primary">
                  Domluvit konzultaci
                  <ArrowRight size={16} />
                </Link>
                <Link href="/o-nas" className="btn-ghost">
                  Kdo za tím stojí
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
