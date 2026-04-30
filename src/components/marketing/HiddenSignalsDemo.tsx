"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Smile,
  Type,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Play,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

type SignalKey = "smajliky" | "vykani" | "ton" | "response";

type Signal = {
  key: SignalKey;
  icon: typeof Smile;
  title: string;
  unit: string;
  baseline: string;
  /** values per week (12 týdnů). 100 = baseline, 0 = nulový */
  weeks: number[];
  /** týden kdy aplikace zaznamená alert (1-indexed) */
  alertWeek: number;
  /** krátký scenario text */
  scenario: {
    situation: string;
    aiCall: string;
    action: string;
    saved: string;
  };
};

const SIGNALS: Record<SignalKey, Signal> = {
  smajliky: {
    key: "smajliky",
    icon: Smile,
    title: "Smajlíky v e-mailech",
    unit: "% mailů se smajlíkem",
    baseline: "~80 %",
    weeks: [82, 78, 80, 75, 70, 60, 40, 20, 10, 5, 0, 0],
    alertWeek: 8,
    scenario: {
      situation:
        "Klient #007 vám 6 měsíců posílal v každém e-mailu smajlík. Žádný velký, jen takový obyčejný. Ve 4. týdnu nárůstu pracovních úkolů ho začal vynechávat. V 8. týdnu úplně přestal.",
      aiCall:
        "Klient #007 změnil tón. Posledních 14 dní bez emocí. Riziko odchodu během 60 dní výrazně zvýšené.",
      action:
        "Zavoláte mu, omluvíte se za nestihnutý termín z minulého týdne, naplánujete kávu.",
      saved: "Klient zůstal. Roční obrat zachráněn.",
    },
  },
  vykani: {
    key: "vykani",
    icon: Type,
    title: "Vykání → tykání",
    unit: "% formálních oslovení",
    baseline: "100 %",
    weeks: [100, 100, 100, 100, 100, 100, 100, 60, 30, 0, 0, 0],
    alertWeek: 9,
    scenario: {
      situation:
        "Klient #012 vám 4 roky vykal. Najednou v 8. týdnu začne tykat. „Ahoj, můžeš mi to poslat?\" Změna sama o sobě nic neznamená. V kombinaci s dalšími signály ano.",
      aiCall:
        "Klient #012 současně: přestal odpovídat na první mail (3× za sebou), řádově víc ad-hoc dotazů, přestal číst přílohy. Vícenásobné riziko. Doporučení: osobní schůzka tento týden.",
      action:
        "Sjednáte schůzku. Klient přizná, že hledal jiného účetního, ale dáte mu důvěru zpět.",
      saved: "Měli jste reálnou šanci ho udržet — zvládli jste to.",
    },
  },
  ton: {
    key: "ton",
    icon: MessageSquare,
    title: "Tón pondělí vs. pátek",
    unit: "sentiment skóre",
    baseline: "vyrovnaný",
    weeks: [85, 80, 75, 70, 65, 55, 45, 35, 30, 25, 20, 15],
    alertWeek: 6,
    scenario: {
      situation:
        "Klient #003 píše v pondělí drsněji než v pátek. Zpočátku malý rozdíl. Postupně se rozevírá. V 6. týdnu pondělní maily začnou být téměř výhružné, páteční zase přátelské.",
      aiCall:
        "Klient #003: rostoucí divergence v tónu. Indikátor stresu. 78 % pravděpodobnost, že má napjaté cash flow nebo problém v týmu.",
      action:
        "Místo standardní pondělní upomínky pošlete e-mail typu „Všimli jsme si, že máte hodně. Jak vám můžeme pomoct?\"",
      saved:
        "Klient přizná, že má kontrolu z FÚ. Pomůžete připravit podklady, posílíte vztah.",
    },
  },
  response: {
    key: "response",
    icon: Clock,
    title: "Rychlost odpovědí",
    unit: "h do první odpovědi",
    baseline: "~4 h",
    weeks: [3, 4, 5, 4, 6, 8, 12, 18, 24, 36, 48, 72],
    alertWeek: 7,
    scenario: {
      situation:
        "Klient #018 odpovídal průměrně do 4 hodin. Postupně se to zhoršuje. Týden po týdnu trvá déle, než se ozve. V 7. týdnu už neodpovídá ani druhý den.",
      aiCall:
        "Klient #018 reagoval pomaleji o 600 % oproti baselinu. Pattern indikuje buď ztrátu zájmu, nebo přepracování. Riziko ghostingu.",
      action:
        "Místo dalšího mailu zavoláte. Zjistíte, že klient přijal velkou zakázku a nemá čas. Dohodnete jiný způsob komunikace.",
      saved:
        "Místo postupného odchodu získáte loajálnějšího klienta s upraveným servisem.",
    },
  },
};

const TIMELINE_WEEKS = 12;

export default function HiddenSignalsDemo() {
  const { ref, inView } = useInView(0.1);
  const [activeKey, setActiveKey] = useState<SignalKey>("smajliky");
  const [revealedWeek, setRevealedWeek] = useState(0);
  const [playing, setPlaying] = useState(false);

  const active = SIGNALS[activeKey];

  // auto-play při změně signálu
  useEffect(() => {
    setRevealedWeek(0);
    setPlaying(true);
  }, [activeKey]);

  useEffect(() => {
    if (!playing) return;
    if (revealedWeek >= TIMELINE_WEEKS) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => {
      setRevealedWeek((w) => w + 1);
    }, 220);
    return () => clearTimeout(id);
  }, [playing, revealedWeek]);

  const restart = () => {
    setRevealedWeek(0);
    setPlaying(true);
  };

  return (
    <section
      id="signaly"
      className="py-24 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className={`mb-12 ${inView ? "animate-float-up" : "opacity-0"}`}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse-dot" />
            INTERAKTIVNÍ UKÁZKA // SKRYTÉ SIGNÁLY
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Vyzkoušejte si, co aplikace <span className="text-gold">vidí, co vy ne.</span>
          </h2>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Klikněte na signál. Spustí se 12týdenní vývoj fiktivního klienta.
            Sledujte, jak se signál postupně mění, kde aplikace zachytí riziko
            a co s tím uděláte. <strong className="text-white">Demo data</strong> — postupy jsou autentické,
            klienti vymyšlení.
          </p>
        </div>

        {/* Signal selector */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 ${inView ? "animate-float-up delay-200" : "opacity-0"}`}>
          {(Object.values(SIGNALS) as Signal[]).map((s) => {
            const isActive = s.key === activeKey;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setActiveKey(s.key)}
                className={`p-4 lg:p-5 border text-left transition-all ${
                  isActive
                    ? "border-gold/50 bg-gold/[0.06]"
                    : "border-cyan/12 bg-cyan/[0.02] hover:border-cyan/30 hover:bg-cyan/[0.04]"
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <s.icon
                    size={20}
                    className={isActive ? "text-gold" : "text-cyan"}
                  />
                  {isActive && (
                    <span
                      className="ml-auto text-gold text-xs"
                      style={{
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      ◉ Aktivní
                    </span>
                  )}
                </div>
                <div
                  className={`font-semibold mb-1 ${isActive ? "text-white" : "text-text-secondary"}`}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.title}
                </div>
                <div className="text-text-muted text-xs">{s.unit}</div>
              </button>
            );
          })}
        </div>

        {/* Main viz panel */}
        <div className={`hud-panel p-6 lg:p-10 ${inView ? "animate-float-up delay-400" : "opacity-0"}`}>
          {/* Top: signal info + replay */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <div
                className="text-cyan mb-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                ◉ Klient #007 — vývoj 12 týdnů
              </div>
              <h3
                className="text-white text-xl font-semibold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {active.title}
              </h3>
              <div className="text-text-muted text-sm mt-1">
                Baseline: <span className="text-text-secondary">{active.baseline}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={restart}
              disabled={playing}
              className="hud-button-secondary flex items-center gap-2 disabled:opacity-50"
            >
              {revealedWeek >= TIMELINE_WEEKS ? (
                <>
                  <RotateCcw size={14} />
                  Spustit znovu
                </>
              ) : playing ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-cyan animate-pulse-dot" />
                  Probíhá ({revealedWeek}/{TIMELINE_WEEKS})
                </>
              ) : (
                <>
                  <Play size={14} />
                  Spustit
                </>
              )}
            </button>
          </div>

          {/* Timeline visualization */}
          <div className="mb-8">
            <div className="grid grid-cols-12 gap-1 mb-3" style={{ minHeight: "140px" }}>
              {active.weeks.map((value, i) => {
                const week = i + 1;
                const isRevealed = week <= revealedWeek;
                const isAlert = week === active.alertWeek;
                const isPostAlert = week > active.alertWeek;
                const heightPct = Math.max(8, value);

                let barColor = "rgba(0,229,255,0.6)";
                if (isPostAlert) barColor = "rgba(255,123,123,0.6)";
                if (isAlert) barColor = "rgba(212,175,55,0.85)";

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-end relative"
                    style={{ height: "140px" }}
                  >
                    {isAlert && isRevealed && (
                      <div
                        className="absolute -top-1 left-1/2 -translate-x-1/2"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          color: "rgba(212,175,55,0.95)",
                        }}
                      >
                        ◉
                      </div>
                    )}
                    <div
                      style={{
                        width: "100%",
                        height: isRevealed ? `${heightPct}%` : "0%",
                        background: barColor,
                        transition: "height 0.4s ease, background 0.4s ease",
                        opacity: isRevealed ? 1 : 0.15,
                        borderTop: isAlert
                          ? "2px solid rgba(212,175,55,0.95)"
                          : "none",
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-12 gap-1">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="text-center text-text-muted"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  T{i + 1}
                </div>
              ))}
            </div>
            {revealedWeek >= active.alertWeek && (
              <div
                className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 border border-gold/40 bg-gold/[0.06]"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(212,175,55,0.95)",
                }}
              >
                <AlertTriangle size={12} />
                Týden {active.alertWeek}: aplikace zaznamenala riziko
              </div>
            )}
          </div>

          {/* Story unfolds with weeks */}
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Situation */}
            <div
              className={`hud-panel p-5 transition-all duration-500 ${
                revealedWeek >= 1 ? "opacity-100" : "opacity-30"
              }`}
              style={{ borderLeft: "2px solid rgba(0,229,255,0.5)" }}
            >
              <div
                className="text-cyan mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                01 / Co se děje
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {active.scenario.situation}
              </p>
            </div>

            {/* AI alert */}
            <div
              className={`hud-panel p-5 transition-all duration-500 ${
                revealedWeek >= active.alertWeek ? "opacity-100" : "opacity-30"
              }`}
              style={{ borderLeft: "2px solid rgba(212,175,55,0.6)" }}
            >
              <div
                className="text-gold mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                02 / EkonomOS hlásí
              </div>
              <p
                className="text-white text-sm leading-relaxed"
                style={{ fontStyle: "italic" }}
              >
                &ldquo;{active.scenario.aiCall}&rdquo;
              </p>
            </div>

            {/* Action + outcome */}
            <div
              className={`hud-panel p-5 transition-all duration-500 ${
                revealedWeek >= TIMELINE_WEEKS ? "opacity-100" : "opacity-30"
              }`}
              style={{ borderLeft: "2px solid rgba(0,229,160,0.5)" }}
            >
              <div
                className="text-status-green mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                03 / Co uděláte
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                {active.scenario.action}
              </p>
              <div className="pt-3 border-t border-cyan/10 flex items-start gap-2">
                <CheckCircle2 size={14} className="text-status-green mt-0.5 flex-shrink-0" />
                <p className="text-text-secondary text-xs leading-relaxed">
                  {active.scenario.saved}
                </p>
              </div>
            </div>
          </div>

          {/* Footer disclaimer */}
          <p
            className="mt-8 pt-6 border-t border-cyan/10 text-text-muted text-xs leading-relaxed"
            style={{ fontStyle: "italic" }}
          >
            Demo dataset s fiktivním klientem. Princip detekce a doporučení odpovídá tomu, jak EkonomOS pracuje na produkci. Konkrétní formulace alertů a metodologii ladíme s pilotními partnery.
          </p>
        </div>

        {/* CTA */}
        <div
          className={`mt-12 text-center ${inView ? "animate-float-up delay-600" : "opacity-0"}`}
        >
          <p className="text-text-secondary text-base mb-5 max-w-2xl mx-auto leading-relaxed">
            Toto jsou 4 z 50+ signálů, které aplikace sleduje. Plný katalog ukazujeme partnerům po nezávazné konzultaci.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pilot" className="btn-primary">
              Mám zájem o pilot
              <ArrowRight size={16} />
            </Link>
            <Link href="/funkce" className="btn-ghost">
              Co všechno aplikace umí
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
