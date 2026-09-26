"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  Check,
  FileText,
  Landmark,
  Mail,
  RefreshCw,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import styles from "./ProcessJourney.module.css";

type ScenarioId = "document" | "payment" | "deadline";

type Scenario = {
  id: ScenarioId;
  label: string;
  short: string;
  phases: Array<{ status: string; caption: string; progress: number }>;
};

const scenarios: Scenario[] = [
  {
    id: "document",
    label: "Doklad a OCR",
    short: "A4 → data → objednávka",
    phases: [
      { status: "Doklad přijat", caption: "Do toku dorazila nová A4 faktura.", progress: 16 },
      { status: "Přesouvám do OCR", caption: "Doklad putuje do OCR skeneru. Originál zůstává zachovaný.", progress: 35 },
      { status: "Čtu dokument", caption: "OCR hledá dodavatele, částku a číslo objednávky.", progress: 56 },
      { status: "Vytahuji data", caption: "Rozpoznané údaje jsou připravené k porovnání.", progress: 78 },
      { status: "Shoda nalezena", caption: "Faktura patří k OBJ-2026-0418 a čeká na kontrolu.", progress: 100 },
    ],
  },
  {
    id: "payment",
    label: "Párování platby",
    short: "Banka → faktura → shoda",
    phases: [
      { status: "Pohyb přijat", caption: "Z bankovního napojení dorazil nový pohyb.", progress: 18 },
      { status: "Kontroluji částku", caption: "Systém porovnává částku 24 190 Kč s otevřenými fakturami.", progress: 40 },
      { status: "Ověřuji symbol", caption: "Variabilní symbol odpovídá faktuře 20260418.", progress: 63 },
      { status: "Páruji záznamy", caption: "Bankovní pohyb se propojuje s vydanou fakturou.", progress: 82 },
      { status: "Platba spárována", caption: "Shoda je potvrzená a připravená ke kontrole.", progress: 100 },
    ],
  },
  {
    id: "deadline",
    label: "Termín DPH",
    short: "Podklad → upomínka → schválení",
    phases: [
      { status: "Termín se blíží", caption: "Systém vidí blížící se termín DPH.", progress: 16 },
      { status: "Chybí podklad", caption: "V kontrolním seznamu chybí bankovní výpis.", progress: 36 },
      { status: "Připravuji upomínku", caption: "Klient dostává stručnou žádost o chybějící dokument.", progress: 57 },
      { status: "Podklad dorazil", caption: "Výpis je přijatý a kontrolní seznam je kompletní.", progress: 78 },
      { status: "Čeká na člověka", caption: "Podání je připravené. Finální krok schvaluje účetní.", progress: 100 },
    ],
  },
];

const phaseDelay = 1250;

export default function ProcessJourney() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<number | null>(null);
  const scenario = scenarios[scenarioIndex];

  const restart = useCallback(() => setPhase(0), []);

  const selectScenario = useCallback((index: number, manual = true) => {
    setScenarioIndex(index);
    setPhase(0);
    if (!manual) return;
    setAutoPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setAutoPaused(false), 12000);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    if (!inView || !pageVisible) return;

    const timer = window.setTimeout(() => {
      if (phase < scenario.phases.length - 1) {
        setPhase((value) => value + 1);
      } else if (!autoPaused) {
        setScenarioIndex((value) => (value + 1) % scenarios.length);
        setPhase(0);
      }
    }, phase === scenario.phases.length - 1 ? 1900 : phaseDelay);

    return () => window.clearTimeout(timer);
  }, [autoPaused, inView, pageVisible, phase, reducedMotion, scenario]);

  useEffect(
    () => () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    },
    [],
  );

  const visiblePhase = reducedMotion ? scenario.phases.length - 1 : phase;
  const activePhase = scenario.phases[visiblePhase];

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = (scenarioIndex + direction + scenarios.length) % scenarios.length;
    selectScenario(next);
    document.getElementById(`process-tab-${scenarios[next].id}`)?.focus();
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.tabs} role="tablist" aria-label="Ukázky automatizací">
        {scenarios.map((item, index) => (
          <button
            key={item.id}
            id={`process-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={index === scenarioIndex}
            aria-controls="process-stage"
            tabIndex={index === scenarioIndex ? 0 : -1}
            className={styles.tab}
            onClick={() => selectScenario(index)}
            onKeyDown={onTabKeyDown}
          >
            <span>{item.label}</span>
            <small>{item.short}</small>
          </button>
        ))}
      </div>

      <div
        id="process-stage"
        role="tabpanel"
        aria-labelledby={`process-tab-${scenario.id}`}
        className={`${styles.stage} ${styles[`scenario_${scenario.id}`]} ${styles[`phase_${visiblePhase}`]}`}
      >
        <div className={styles.stageHead}>
          <div>
            <span className={styles.kicker}>Živá cesta procesu</span>
            <strong>{scenario.label}</strong>
          </div>
          <span className={styles.status} aria-live="polite">
            <i /> {visiblePhase + 1} · {activePhase.status}
          </span>
        </div>

        <div className={styles.canvas} aria-hidden="true">
          {scenario.id === "document" && <DocumentScene />}
          {scenario.id === "payment" && <PaymentScene />}
          {scenario.id === "deadline" && <DeadlineScene />}
        </div>

        <div className={styles.stageFoot}>
          <p aria-live="polite">{activePhase.caption}</p>
          <button type="button" onClick={restart} aria-label="Přehrát tento proces znovu">
            <RefreshCw size={14} aria-hidden="true" /> Znovu
          </button>
        </div>
        <div className={styles.progress} aria-hidden="true">
          <span style={{ width: `${activePhase.progress}%` }} />
        </div>
      </div>
    </div>
  );
}

function DocumentScene() {
  return (
    <>
      <div className={`${styles.node} ${styles.nodeLeft}`}><Mail /><span>Příchozí doklad</span></div>
      <div className={`${styles.node} ${styles.nodeCenter}`}><ScanLine /><span>OCR skener</span></div>
      <div className={`${styles.node} ${styles.nodeRight}`}><Building2 /><span>Objednávka</span></div>
      <div className={styles.route} />
      <div className={styles.paper}>
        <b>OFFICEPRO</b><strong>FAKTURA<br />20260418</strong>
        <i /><i /><i className={styles.shortLine} />
        <em>CELKEM 24 190 Kč</em><small>A4</small>
      </div>
      <div className={styles.scanBeam} />
      <div className={styles.dataStack}>
        <span>Dodavatel <b>OfficePro</b></span>
        <span>Částka <b>24 190 Kč</b></span>
        <span>Objednávka <b>2026-0418</b></span>
      </div>
      <div className={styles.matchBadge}><Check /> PŘIŘAZENO</div>
    </>
  );
}

function PaymentScene() {
  return (
    <>
      <div className={`${styles.node} ${styles.nodeLeft}`}><Landmark /><span>Bankovní pohyb</span></div>
      <div className={`${styles.node} ${styles.nodeCenter}`}><ScanLine /><span>Kontrola shody</span></div>
      <div className={`${styles.node} ${styles.nodeRight}`}><FileText /><span>Faktura 20260418</span></div>
      <div className={styles.route} />
      <div className={styles.bankCard}><small>PŘÍCHOZÍ PLATBA</small><b>+ 24 190 Kč</b><span>VS 20260418</span></div>
      <div className={styles.compare}><span>24 190 Kč</span><span>20260418</span></div>
      <div className={styles.invoiceCard}><small>FAKTURA</small><b>24 190 Kč</b><span>VS 20260418</span></div>
      <div className={styles.matchBadge}><Check /> SPÁROVÁNO</div>
    </>
  );
}

function DeadlineScene() {
  return (
    <>
      <div className={`${styles.node} ${styles.nodeLeft}`}><CalendarClock /><span>Termín DPH</span></div>
      <div className={`${styles.node} ${styles.nodeCenter}`}><Mail /><span>Upomínka</span></div>
      <div className={`${styles.node} ${styles.nodeRight}`}><ShieldCheck /><span>Schválení účetní</span></div>
      <div className={styles.route} />
      <div className={styles.calendarCard}><small>DPH · DUBEN</small><b>25. 5.</b><span>Chybí 1 podklad</span></div>
      <div className={styles.reminderCard}><Mail /><b>Prosíme o bankovní výpis</b><span>Bez osobních údajů</span></div>
      <div className={styles.approvalCard}><ShieldCheck /><b>Připraveno</b><span>Čeká na vaše schválení</span></div>
      <ArrowRight className={styles.movingArrow} />
    </>
  );
}
