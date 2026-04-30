"use client";

import Link from "next/link";
import {
  Rocket,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Target,
  Gift,
  Users,
  AlertCircle,
  Coins,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const criteria = [
  "Účetní firma 15–50 zaměstnanců, 50–200 klientů",
  "Otevřenost ke společnému měření a sdílení dat (anonymizovaně)",
  "Kontaktní osoba na úrovni majitele / jednatele",
  "Klientský mix včetně CZ–DE výhoda, ne podmínka",
  "Závazek k 6měsíčnímu společnému provozu (pak free decision)",
];

const phases = [
  {
    week: "Týden 1–2",
    title: "Audit a baseline",
    desc: "Probereme váš stav, zmapujeme bolesti, dohodneme metriky úspěchu. Vy nám ukážete, jak dnes pracujete. My nastavíme baseline, ze které budeme měřit změnu.",
  },
  {
    week: "Týden 3–6",
    title: "Integrace a customizace",
    desc: "Napojíme EkonomOS na vaše stávající systémy. Nastavíme workflow a alerty podle vašeho profilu. Trénink týmu, branding, testovací data.",
  },
  {
    week: "Týden 7–12",
    title: "Pilotní provoz",
    desc: "Tým EkonomOS aktivně používá. Týdenní check-iny. Vše dokumentujeme. Identifikujeme co funguje, co je třeba doladit, kde je největší dopad.",
  },
  {
    week: "Měsíc 4–6",
    title: "Měření a vyhodnocení",
    desc: "Porovnání před vs. po. Společně publikujeme case study (volitelně anonymně). Rozhodnete, jestli pokračujeme do plné komerční fáze.",
  },
];

const youGet = [
  "Sleva nebo prodloužené free období podle rozsahu pilotu",
  "Přímý přístup k vývojovému týmu — vaše požadavky jdou rovnou do produktu",
  "Spoluautorství první case study (anonymizovaně i otevřeně)",
  "Onboarding na míru a osobní training týmu",
  "Po 6 měsících zvýhodněné podmínky pro plný provoz",
];

const youProvide = [
  "Čas: ~2 hodiny týdně po dobu prvních 12 týdnů (kontaktní osoba)",
  "Přístup k systémům, na které budeme napojovat (s vaší IT podporou)",
  "Otevřenost k feedbacku — co funguje i nefunguje",
  "Souhlas se sběrem anonymizovaných metrik pro měření dopadu",
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

export default function PilotPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-16 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse-dot" />
            PILOT FÁZE // HLEDÁME PARTNERY
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Buďte u toho <span className="text-gold">první.</span>
            <br />
            Společně to <span className="text-cyan">změříme.</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            EkonomOS je nový produkt. Místo abychom slibovali čísla bez podkladu,
            hledáme <strong className="text-white">prvních 5 partnerských kanceláří</strong>,
            se kterými produkt nasadíme, společně nastavíme metriky a po 6 měsících
            publikujeme reálný dopad.
          </p>

          {/* Slots indicator */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background:
                      n <= 5
                        ? "rgba(212,175,55,0.4)"
                        : "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(212,175,55,0.6)",
                  }}
                />
              ))}
            </div>
            <span
              className="text-gold"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              5 z 5 míst volných
            </span>
          </div>
        </div>

        {/* Criteria */}
        <FadeInSection className="mb-16">
          <div className="hud-panel p-8">
            <div className="flex items-center gap-3 mb-5">
              <Target size={20} className="text-cyan" />
              <span
                className="text-cyan"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Koho hledáme
              </span>
            </div>
            <ul className="space-y-3">
              {criteria.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 text-text-secondary leading-relaxed"
                >
                  <CheckCircle2
                    size={18}
                    className="text-cyan mt-0.5 flex-shrink-0"
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeInSection>

        {/* Timeline */}
        <FadeInSection className="mb-8">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            TIMELINE // 6 MĚSÍCŮ
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-8"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Jak pilot <span className="text-cyan">probíhá</span>
          </h2>
        </FadeInSection>

        <div className="space-y-4 mb-16">
          {phases.map((p, i) => (
            <div
              key={p.title}
              className="hud-panel p-6 grid md:grid-cols-[180px_1fr] gap-5"
            >
              <div className="flex md:flex-col gap-2 items-start">
                <div
                  className="text-cyan"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  Fáze {i + 1}
                </div>
                <div
                  className="text-white text-lg font-semibold"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {p.week}
                </div>
              </div>
              <div>
                <h3
                  className="text-white text-lg font-semibold mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {p.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* You get / You provide */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <FadeInSection>
            <div className="hud-panel p-7" style={{ borderTop: "2px solid rgba(212,175,55,0.5)" }}>
              <div className="flex items-center gap-3 mb-5">
                <Gift size={20} className="text-gold" />
                <span
                  className="text-gold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  Co dostanete
                </span>
              </div>
              <ul className="space-y-3">
                {youGet.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-gold mt-0.5 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="hud-panel p-7" style={{ borderTop: "2px solid rgba(0,229,255,0.5)" }}>
              <div className="flex items-center gap-3 mb-5">
                <Users size={20} className="text-cyan" />
                <span
                  className="text-cyan"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  Co potřebujeme od vás
                </span>
              </div>
              <ul className="space-y-3">
                {youProvide.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-cyan mt-0.5 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>

        {/* Pricing model */}
        <FadeInSection className="mb-16">
          <div className="hud-panel p-8">
            <div className="flex items-center gap-3 mb-5">
              <Coins size={20} className="text-gold" />
              <span
                className="text-gold"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Cenový model
              </span>
            </div>
            <p className="text-text-secondary text-base leading-relaxed mb-6 max-w-3xl">
              Cena má tři složky. Uvedené rozsahy jsou orientační pro účetní firmu 15–50 zaměstnanců a 50–200 klientů. Konkrétní nabídku probereme po auditu vašeho stacku.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-cyan/10 bg-cyan/[0.03] p-5">
                <div
                  className="text-cyan mb-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  1) Setup (jednorázově)
                </div>
                <div
                  className="text-white text-xl font-semibold mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  80 – 200 K Kč
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Audit, integrace na vaše systémy, branding, training týmu. Pokrývá 8–12 týdnů onboarding.
                </p>
              </div>
              <div className="border border-cyan/10 bg-cyan/[0.03] p-5">
                <div
                  className="text-cyan mb-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  2) Platforma (měsíčně)
                </div>
                <div
                  className="text-white text-xl font-semibold mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  8 – 15 K Kč / měsíc
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Hosting, údržba, security patches, support. Fixní položka, nezávisí na počtu klientů.
                </p>
              </div>
              <div className="border border-cyan/10 bg-cyan/[0.03] p-5">
                <div
                  className="text-cyan mb-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  3) Per klient (měsíčně)
                </div>
                <div
                  className="text-white text-xl font-semibold mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  ~300 – 500 Kč / klient
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Skaluje s vaším úspěchem. AI compute, storage, integrace pro každého vašeho klienta zvlášť.
                </p>
              </div>
            </div>
            <p className="text-text-muted text-sm mt-6 leading-relaxed max-w-3xl">
              <strong className="text-white">V pilot fázi sleva 50 % na první rok</strong> nebo prodloužené free období. Pro kancelář se 100 klienty se měsíční cena pohybuje cca <strong className="text-white">38 – 65 K Kč/měsíc</strong> v plné fázi, v pilotu výrazně méně. Konkrétní rozsah dohodneme individuálně.
            </p>
          </div>
        </FadeInSection>

        {/* Honest disclaimer */}
        <FadeInSection className="mb-16">
          <div
            className="hud-panel p-6 flex gap-4 items-start"
            style={{ borderLeft: "2px solid rgba(212,175,55,0.5)" }}
          >
            <AlertCircle size={20} className="text-gold flex-shrink-0 mt-1" />
            <div>
              <h3
                className="text-white font-semibold mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Buďme upřímní
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Jsme nový produkt. Některé věci nepůjdou na první pokus. Některé
                workflow budeme dolaďovat za pochodu. Pokud potřebujete plně
                hotový enterprise SaaS s 5letou historií, počkejte 2 roky a
                vraťte se. Pokud chcete být u toho, kdy se to staví, a
                ovlivnit, jak to bude vypadat — pojďte do toho s námi.
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Calendar / next steps */}
        <FadeInSection className="mb-16">
          <div className="hud-panel p-8">
            <div className="flex items-center gap-3 mb-5">
              <Calendar size={20} className="text-cyan" />
              <span
                className="text-cyan"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Co se stane po vašem zájmu
              </span>
            </div>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <div className="hud-step-index">1</div>
                <div className="text-text-secondary text-sm leading-relaxed">
                  <strong className="text-white">Krátký hovor (30 min)</strong>{" "}
                  — bez prezentace. Zjistíme, co řešíte, a jestli vám EkonomOS
                  reálně může pomoct.
                </div>
              </li>
              <li className="flex gap-4">
                <div className="hud-step-index">2</div>
                <div className="text-text-secondary text-sm leading-relaxed">
                  <strong className="text-white">Demo a Q&A</strong> — ukážeme
                  produkt na živých datech (anonymizovaných). Odpovíme na
                  všechno, co vás zajímá.
                </div>
              </li>
              <li className="flex gap-4">
                <div className="hud-step-index">3</div>
                <div className="text-text-secondary text-sm leading-relaxed">
                  <strong className="text-white">Návrh pilotu</strong> —
                  připravíme konkrétní plán pro vaši firmu: co napojíme, co
                  budeme měřit, kolik to bude stát, časová osa.
                </div>
              </li>
              <li className="flex gap-4">
                <div className="hud-step-index">4</div>
                <div className="text-text-secondary text-sm leading-relaxed">
                  <strong className="text-white">Pilot smlouva nebo NDA</strong>{" "}
                  — pokud pokračujeme. Žádný tlak — pokud se nehodíme, řekneme
                  to upřímně.
                </div>
              </li>
            </ol>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Rocket size={32} className="text-gold mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Mám zájem o pilot
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Nezavazuje vás to. Začneme krátkým hovorem, pak se uvidí.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn-primary">
                  Domluvit hovor
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
