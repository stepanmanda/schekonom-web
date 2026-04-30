"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  Info,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

type Scenario = "conservative" | "realistic" | "optimistic";

const SCENARIO_MULT: Record<Scenario, number> = {
  conservative: 0.5,
  realistic: 1.0,
  optimistic: 1.3,
};

const SCENARIO_LABEL: Record<Scenario, string> = {
  conservative: "Konzervativní",
  realistic: "Realistický",
  optimistic: "Optimistický",
};

// Vstupní benchmarks (zdroje viz "Jak počítáme")
const HOURS_PER_EMPLOYEE_PER_WEEK = 10; // průměrná rutina (sběr, párování, hlídání) — odhad
const AUTOMATION_RATIO = 0.4; // EkonomOS automatizace ~40 % rutiny při realistic
const HOURLY_RATE = 500; // Kč/h (kvalifikovaná účetní práce, KAČR průměr)
const WEEKS_PER_MONTH = 4;
const CHURN_RATE_BASELINE = 0.12; // 12 % ročně, B2B služby
const CHURN_REDUCTION = 0.4; // EkonomOS predikce sníží o ~40 %
const REVENUE_PER_CLIENT = 80000; // Kč/rok průměr
const FRAUD_AVG_LOSS = 200000; // Kč průměrná škoda phishing IBAN
const FRAUD_INCIDENT_RATE = 0.4; // 40 % šance ročně u stř. firmy
const GROWTH_CAPACITY = 0.25; // +25 % klientů bez najímání

// Cena (rozsahy z /pilot stránky)
const SETUP_FEE = 130000; // střed 80–200K
const PLATFORM_FEE_PER_MONTH = 11000; // střed 8–15K
const PER_CLIENT_FEE = 400; // střed 300–500
const PILOT_DISCOUNT = 0.5; // 50 % v pilot fázi

function formatCzk(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace(".", ",")}M Kč`;
  }
  if (value >= 1000) {
    return `${Math.round(value / 1000)} K Kč`;
  }
  return `${Math.round(value)} Kč`;
}

function formatNum(value: number): string {
  return Math.round(value).toLocaleString("cs-CZ");
}

export default function RoiCalculator() {
  const { ref, inView } = useInView(0.1);
  const [clients, setClients] = useState(80);
  const [employees, setEmployees] = useState(18);
  const [hourlyRate, setHourlyRate] = useState(HOURLY_RATE);
  const [scenario, setScenario] = useState<Scenario>("realistic");
  const [showFormula, setShowFormula] = useState(false);

  const calc = useMemo(() => {
    const mult = SCENARIO_MULT[scenario];

    // Časová úspora
    const hoursSavedPerMonth =
      employees * HOURS_PER_EMPLOYEE_PER_WEEK * AUTOMATION_RATIO * WEEKS_PER_MONTH * mult;
    const moneySavedTime = hoursSavedPerMonth * hourlyRate;
    const yearlyTimeSaving = moneySavedTime * 12;

    // Růst bez najímání
    const additionalClients = Math.round(clients * GROWTH_CAPACITY * mult);
    const yearlyGrowthRevenue = additionalClients * REVENUE_PER_CLIENT;

    // Churn redukce
    const baselineChurnedClients = clients * CHURN_RATE_BASELINE;
    const savedClients = baselineChurnedClients * CHURN_REDUCTION * mult;
    const yearlyChurnSaving = savedClients * REVENUE_PER_CLIENT;

    // Fraud prevence (statistická hodnota)
    const yearlyFraudSaving =
      FRAUD_AVG_LOSS * FRAUD_INCIDENT_RATE * mult;

    // Total dopad
    const totalImpactPerYear =
      yearlyTimeSaving +
      yearlyGrowthRevenue +
      yearlyChurnSaving +
      yearlyFraudSaving;

    // Cena EkonomOS
    const fullMonthly = PLATFORM_FEE_PER_MONTH + PER_CLIENT_FEE * clients;
    const fullYearly = SETUP_FEE + fullMonthly * 12;
    const pilotMonthly = fullMonthly * (1 - PILOT_DISCOUNT);
    const pilotYearly = SETUP_FEE * (1 - PILOT_DISCOUNT) + pilotMonthly * 12;

    const roiFull = totalImpactPerYear / fullYearly;
    const roiPilot = totalImpactPerYear / pilotYearly;

    // Návratnost setup fee v měsících (podle realistického časového savingu)
    const paybackMonths = SETUP_FEE / moneySavedTime;

    return {
      hoursSavedPerMonth,
      moneySavedTime,
      yearlyTimeSaving,
      additionalClients,
      yearlyGrowthRevenue,
      savedClients,
      yearlyChurnSaving,
      yearlyFraudSaving,
      totalImpactPerYear,
      fullMonthly,
      fullYearly,
      pilotMonthly,
      pilotYearly,
      roiFull,
      roiPilot,
      paybackMonths,
    };
  }, [clients, employees, hourlyRate, scenario]);

  return (
    <section
      id="kalkulator"
      className="py-24 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className={`mb-12 ${inView ? "animate-float-up" : "opacity-0"}`}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse-dot" />
            ROI KALKULÁTOR // ODHAD PRO VAŠI KANCELÁŘ
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Spočítejte si <span className="text-gold">přibližný dopad</span> na vaši firmu
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Tři scénáře založené na průmyslových benchmarkech. <strong className="text-white">Není to závazek</strong> — je to rámcový odhad,
            abyste věděli, jestli má smysl s námi mluvit. Reálný dopad u vás změříme společně v pilotu.
          </p>
        </div>

        {/* Calculator panel */}
        <div className={`hud-panel p-6 lg:p-10 ${inView ? "animate-float-up delay-200" : "opacity-0"}`}>
          {/* Inputs */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Clients slider */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label
                  htmlFor="clients"
                  className="text-text-secondary"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Počet klientů
                </label>
                <span
                  className="text-cyan text-2xl font-bold"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {clients}
                </span>
              </div>
              <input
                type="range"
                id="clients"
                min={20}
                max={300}
                step={10}
                value={clients}
                onChange={(e) => setClients(Number(e.target.value))}
                className="roi-slider"
              />
              <div className="flex justify-between text-text-muted text-xs mt-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                <span>20</span>
                <span>300</span>
              </div>
            </div>

            {/* Employees slider */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label
                  htmlFor="employees"
                  className="text-text-secondary"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Zaměstnanci kanceláře
                </label>
                <span
                  className="text-cyan text-2xl font-bold"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {employees}
                </span>
              </div>
              <input
                type="range"
                id="employees"
                min={3}
                max={80}
                step={1}
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="roi-slider"
              />
              <div className="flex justify-between text-text-muted text-xs mt-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                <span>3</span>
                <span>80</span>
              </div>
            </div>

            {/* Hourly rate slider */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label
                  htmlFor="hourlyRate"
                  className="text-text-secondary"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Hodinová sazba účetní
                </label>
                <span
                  className="text-cyan text-2xl font-bold"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {hourlyRate} Kč
                </span>
              </div>
              <input
                type="range"
                id="hourlyRate"
                min={300}
                max={1200}
                step={50}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="roi-slider"
              />
              <div className="flex justify-between text-text-muted text-xs mt-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                <span>300 Kč</span>
                <span>1 200 Kč</span>
              </div>
            </div>
          </div>

          {/* Scenario picker */}
          <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-cyan/10">
            <span
              className="text-text-muted self-center mr-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Scénář:
            </span>
            {(["conservative", "realistic", "optimistic"] as Scenario[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScenario(s)}
                className={`px-4 py-2 border transition-all ${
                  scenario === s
                    ? "border-gold/60 bg-gold/10 text-gold"
                    : "border-cyan/15 bg-cyan/[0.03] text-text-muted hover:border-cyan/30"
                }`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {SCENARIO_LABEL[s]}
              </button>
            ))}
            <span
              className="self-center ml-2 text-text-muted text-xs"
              style={{ fontStyle: "italic" }}
            >
              Konzervativní = polovina benchmarků. Default je realistický.
            </span>
          </div>

          {/* Outputs */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <OutputCard
              label="Časová úspora"
              value={`${formatNum(calc.hoursSavedPerMonth)} h/měs`}
              detail={`= ${formatCzk(calc.yearlyTimeSaving)} ročně ušetřených mezd`}
              tone="cyan"
            />
            <OutputCard
              label="Růst bez najímání"
              value={`+${calc.additionalClients} klientů`}
              detail={`= ${formatCzk(calc.yearlyGrowthRevenue)} obratu navíc`}
              tone="cyan"
            />
            <OutputCard
              label="Méně odchodů klientů"
              value={`~${calc.savedClients.toFixed(1).replace(".", ",")} klienta/rok`}
              detail={`= ${formatCzk(calc.yearlyChurnSaving)} zachráněného obratu`}
              tone="cyan"
            />
            <OutputCard
              label="Fraud prevence"
              value={formatCzk(calc.yearlyFraudSaving)}
              detail="statistická hodnota zachycených ztrát"
              tone="cyan"
            />
          </div>

          {/* Bottom line */}
          <div
            className="hud-panel p-6 lg:p-8"
            style={{ borderTop: "2px solid rgba(212,175,55,0.5)" }}
          >
            <div
              className="text-gold mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Bottom line — {SCENARIO_LABEL[scenario].toLowerCase()} scénář
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mb-5">
              <Metric label="Roční dopad" value={formatCzk(calc.totalImpactPerYear)} accent="white" />
              <Metric
                label="Roční náklad — pilot"
                value={formatCzk(calc.pilotYearly)}
                detail={`(${formatCzk(calc.pilotMonthly)}/měs)`}
                accent="cyan"
              />
              <Metric
                label="ROI první rok"
                value={`${calc.roiPilot.toFixed(1).replace(".", ",")}×`}
                accent="gold"
              />
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Setup fee (
              <span className="text-white font-semibold">
                {formatCzk(SETUP_FEE * (1 - PILOT_DISCOUNT))}
              </span>{" "}
              v pilotu, sleva 50 %) se vrátí přibližně za{" "}
              <span className="text-white font-semibold">
                {Math.max(1, Math.round(calc.paybackMonths)).toString()} měsíce
              </span>{" "}
              při zvolené hodinové sazbě.
            </p>
          </div>

          {/* Formula transparency */}
          <button
            type="button"
            onClick={() => setShowFormula(!showFormula)}
            className="mt-6 flex items-center gap-2 text-text-muted hover:text-cyan transition-colors"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <Info size={14} />
            Jak to počítáme — vstupy, vzorce, zdroje
            <ChevronDown
              size={14}
              style={{
                transform: showFormula ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s ease",
              }}
            />
          </button>

          {showFormula && (
            <div className="mt-5 pt-5 border-t border-cyan/10 space-y-5 text-text-secondary text-sm leading-relaxed">
              <div>
                <h4 className="text-white font-semibold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  ⚙️ Konstanty (které neberete vy)
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-text-muted">
                  <li>
                    Rutinní práce na účetní: <strong className="text-white">10 h/týden</strong>{" "}
                    (sběr dokumentů, párování plateb, hlídání termínů, KH).
                    Odhad z rozhovorů s majiteli kanceláří.
                  </li>
                  <li>
                    Automatizace EkonomOS: <strong className="text-white">40 % rutiny</strong>{" "}
                    při realistickém scénáři. Pochází z benchmark studií o automatizaci back-office (McKinsey, Accenture).
                  </li>
                  <li>
                    Baseline churn rate: <strong className="text-white">12 % ročně</strong>. B2B
                    služby v ČR/EU.
                  </li>
                  <li>
                    Redukce churn s prediktivní vrstvou:{" "}
                    <strong className="text-white">~40 %</strong>. Akademické studie o uplift modelingu typicky uvádějí 30–50 %.
                  </li>
                  <li>
                    Průměrný roční obrat na klienta:{" "}
                    <strong className="text-white">80 000 Kč</strong>. Konzervativní střed pro malé/střední účetní firmy.
                  </li>
                  <li>
                    Fraud incident: BEC scams (phishing IBAN) průměrná škoda{" "}
                    <strong className="text-white">200 K Kč</strong>, výskyt cca{" "}
                    <strong className="text-white">40 %</strong> firem ročně dle EU studií.
                  </li>
                  <li>
                    Růstová kapacita bez najímání: <strong className="text-white">+25 %</strong> klientů.
                    Konzervativní odhad — automatizace 40 % rutiny dovoluje obsloužit více klientů.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  📐 Vzorce
                </h4>
                <pre
                  className="text-text-secondary bg-void-deep/60 p-4 overflow-x-auto whitespace-pre-wrap break-words"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    lineHeight: 1.7,
                  }}
                >
{`hodiny_ušetřené = zaměstnanci × 10 h/týden × 40 % × 4 týdny × multiplikátor

ušetřené_mzdy_ročně = hodiny_ušetřené × hodinová_sazba × 12

růst_obratu_ročně = klienti × 25 % × 80 000 Kč × multiplikátor

úspora_churn_ročně = klienti × 12 % × 40 % × 80 000 Kč × multiplikátor

úspora_fraud_ročně = 200 000 Kč × 40 % × multiplikátor

CELKEM_dopad = součet všech úspor

multiplikátor: konzervativní = 0,5  |  realistický = 1,0  |  optimistický = 1,3`}
                </pre>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  📚 Zdroje
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-text-muted text-xs">
                  <li>McKinsey: <em>The future of back-office automation</em> (2022)</li>
                  <li>Accenture: <em>Intelligent automation in finance &amp; accounting</em> (2023)</li>
                  <li>European Banking Authority: <em>BEC scam statistics</em> (2024)</li>
                  <li>KAČR / KDP statistiky o produktivitě účetních firem v ČR</li>
                  <li>Akademické studie o uplift modelingu (Kane et al., 2014; Gutierrez et al., 2017)</li>
                </ul>
                <p className="text-text-muted text-xs mt-3" style={{ fontStyle: "italic" }}>
                  Konstanty pravidelně aktualizujeme podle nových benchmarků a zkušeností z pilotů.
                </p>
              </div>

              <div className="hud-panel p-4 border-l-2 border-l-gold/50">
                <p className="text-text-secondary text-sm">
                  <strong className="text-white">Co kalkulátor nezahrnuje:</strong> reputační efekt
                  z klientského portálu, premium pricing pro „AI-powered" kancelář, snížení pokut za
                  zmeškané termíny, vyšší retention zaměstnanců (méně frustrující práce). Tyto faktory
                  obvykle dopad zvyšují, ale špatně se kvantifikují.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div
          className={`mt-10 text-center ${inView ? "animate-float-up delay-400" : "opacity-0"}`}
        >
          <p className="text-text-secondary text-base mb-5 max-w-2xl mx-auto leading-relaxed">
            Chcete přesnější odhad pro vaši konkrétní firmu? Při auditu projedeme váš stack, identifikujeme největší úspory a připravíme nabídku na míru.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pilot" className="btn-primary">
              Mám zájem o pilot
              <ArrowRight size={16} />
            </Link>
            <Link href="/kontakt" className="btn-ghost">
              Domluvit audit zdarma
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutputCard({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: "cyan" | "gold";
}) {
  const color = tone === "cyan" ? "#00E5FF" : "rgba(212,175,55,0.95)";
  return (
    <div
      className="hud-panel p-5"
      style={{ borderLeft: `2px solid ${color}` }}
    >
      <div
        className="mb-2"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#7A8A9E",
        }}
      >
        {label}
      </div>
      <div
        className="text-2xl font-bold mb-1"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "#FFFFFF",
        }}
      >
        {value}
      </div>
      <div className="text-text-muted text-sm">{detail}</div>
    </div>
  );
}

function Metric({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail?: string;
  accent: "white" | "cyan" | "gold";
}) {
  const color =
    accent === "white"
      ? "#FFFFFF"
      : accent === "cyan"
        ? "#00E5FF"
        : "rgba(212,175,55,0.95)";
  return (
    <div className="text-center">
      <div
        className="text-3xl sm:text-4xl font-bold mb-1"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color,
          lineHeight: 1.05,
        }}
      >
        {value}
      </div>
      <div className="text-text-muted text-sm">{label}</div>
      {detail && (
        <div
          className="text-text-muted text-xs mt-1"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {detail}
        </div>
      )}
    </div>
  );
}
