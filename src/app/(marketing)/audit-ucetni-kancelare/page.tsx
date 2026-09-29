import type { Metadata } from "next";
import {
  ArrowDown,
  CheckCircle2,
  ClipboardCheck,
  Files,
  GitPullRequestArrow,
  Layers3,
  ShieldCheck,
  TimerReset,
} from "lucide-react";
import AuditLeadForm from "@/components/marketing/AuditLeadForm";

export const metadata: Metadata = {
  title: "Nezávazný rozbor procesu účetní kanceláře",
  description:
    "Popište jeden opakovaný proces účetní kanceláře. Prověříme, kde vzniká ruční práce, zdržení nebo předávání mezi systémy a navrhneme vhodný další krok.",
  alternates: {
    canonical: "/audit-ucetni-kancelare",
  },
  openGraph: {
    title: "Nezávazný rozbor procesu účetní kanceláře | EkonomOS",
    description:
      "Praktický úvodní rozbor jednoho workflow účetní kanceláře — bez předčasných slibů ceny nebo výsledku.",
    url: "/audit-ucetni-kancelare",
    type: "website",
  },
};

const painPoints = [
  {
    icon: Files,
    title: "Podklady od klientů",
    text: "Dokumenty přicházejí různými kanály, chybějí nebo je tým musí opakovaně dohledávat.",
  },
  {
    icon: TimerReset,
    title: "Termíny a výjimky",
    text: "Důležité úkoly se hlídají ručně a skutečné riziko je schované mezi běžnou operativou.",
  },
  {
    icon: GitPullRequestArrow,
    title: "Předávání mezi nástroji",
    text: "Informace se přepisují mezi e-mailem, tabulkami, účetním systémem a dalšími aplikacemi.",
  },
];

const outputs = [
  "Společně vymezíme jeden konkrétní proces a jeho současné kroky.",
  "Pojmenujeme místa, kde vzniká čekání, ruční práce nebo ztráta kontextu.",
  "Prověříme nástroje a integrace, které by bylo nutné před případným nasazením ověřit.",
  "Dostanete doporučení dalšího kroku — včetně možnosti nepokračovat, pokud řešení nedává smysl.",
];

const fitSignals = [
  "Spravujete více klientů a opakované workflow.",
  "Tým dohledává podklady, termíny nebo stav práce napříč nástroji.",
  "Nechcete nahrazovat účetní systém, ale propojit provoz kolem něj.",
  "Kritická rozhodnutí mají zůstat pod kontrolou člověka.",
];

export default function AccountingOfficeAuditPage() {
  return (
    <div className="pt-28 pb-24 overflow-hidden">
      <section className="relative border-b border-cyan/10 pb-20">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_20%,rgba(0,229,255,0.09),transparent_38%)]" />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div className="animate-float-up">
            <div className="section-tag mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
              NEZÁVAZNÝ ROZBOR // ÚČETNÍ KANCELÁŘE
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Najděte proces, který vaší účetní kanceláři
              <span className="text-cyan"> zbytečně bere čas.</span>
            </h1>
            <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-3xl">
              Vybereme jeden opakovaný workflow, projdeme jeho současný stav a
              ověříme, kde dává smysl automatizace nebo lepší provozní přehled.
              Bez předčasného slibu ceny, úspor nebo konkrétní integrace.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
              <a href="#formular" className="btn-primary justify-center">
                Požádat o rozbor
                <ArrowDown size={16} />
              </a>
              <span className="text-text-muted text-sm">
                Jeden proces · bez závazku · další krok podle skutečného stavu
              </span>
            </div>
          </div>

          <div className="hud-panel p-7 sm:p-8 animate-float-up delay-200">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardCheck size={21} className="text-gold" />
              <span className="text-gold text-xs tracking-[0.16em] uppercase font-mono">
                Co budeme zjišťovat
              </span>
            </div>
            <ol className="space-y-5">
              {[
                "Kde proces začíná a kdo za něj odpovídá.",
                "Které kroky se opakují nebo čekají na podklady.",
                "Mezi kterými nástroji se informace předávají.",
                "Kde musí zůstat lidská kontrola a schválení.",
              ].map((item, index) => (
                <li key={item} className="flex gap-4 text-text-secondary">
                  <span className="hud-step-index flex-shrink-0">{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl mb-10">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            KDE OBVYKLE VZNIKÁ TŘENÍ
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Začněme konkrétním problémem, ne seznamem funkcí.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {painPoints.map((item) => (
            <article key={item.title} className="hud-panel p-6">
              <item.icon size={22} className="text-cyan mb-5" />
              <h3 className="text-white text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-cyan/10 bg-cyan/[0.02] py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="section-tag mb-4">
              <Layers3 size={14} className="text-cyan" />
              PRAKTICKÝ VÝSTUP
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Co si z úvodního rozboru odnesete
            </h2>
            <ul className="space-y-4">
              {outputs.map((item) => (
                <li key={item} className="flex gap-3 text-text-secondary leading-relaxed">
                  <CheckCircle2 size={18} className="text-cyan mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hud-panel p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck size={21} className="text-gold" />
              <h3 className="text-white text-xl font-semibold">Kdy rozbor dává smysl</h3>
            </div>
            <ul className="space-y-4">
              {fitSignals.map((item) => (
                <li key={item} className="flex gap-3 text-text-secondary">
                  <CheckCircle2 size={17} className="text-gold mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
        <div>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            EKONOMOS // PROVOZNÍ VRSTVA
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Nenahrazuje účetní systém. Propojuje provoz kolem něj.
          </h2>
          <p className="text-text-secondary leading-relaxed mb-5">
            EkonomOS spojuje klienty, podklady, termíny, výjimky a schvalování
            do jednoho provozního přehledu. Kritické kroky zůstávají pod
            kontrolou člověka.
          </p>
          <p className="text-text-muted text-sm leading-relaxed">
            Konkrétní rozsah napojení na účetní, dokumentové, bankovní nebo
            veřejné systémy ověřujeme podle používaného stacku a jeho verzí.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            ["01", "Popis procesu", "Stačí popsat, co se opakuje a kde vzniká zdržení."],
            ["02", "Krátké upřesnění", "Doplníme role, nástroje, vstupy a požadovanou lidskou kontrolu."],
            ["03", "Další krok", "Navrhneme ověření, ukázku nebo nepokračování podle zjištěného stavu."],
          ].map(([number, title, text]) => (
            <div key={number} className="hud-panel p-5">
              <div className="text-cyan font-mono text-sm mb-5">{number}</div>
              <h3 className="text-white font-semibold mb-3">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="formular" className="scroll-mt-28 max-w-6xl mx-auto px-6 pt-8">
        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-10 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="section-tag mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              PRVNÍ KROK
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Popište jeden proces.
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Nepotřebujete znát řešení ani rozpočet. Napište, co se opakuje,
              kde tým čeká a které nástroje dnes používá.
            </p>
          </div>
          <AuditLeadForm />
        </div>
      </section>
    </div>
  );
}
