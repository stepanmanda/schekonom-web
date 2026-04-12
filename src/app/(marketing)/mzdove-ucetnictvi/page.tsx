import {
  Users,
  FileText,
  Calculator,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mzdové účetnictví — SCH-EKONOM",
  description:
    "Kompletní zpracování mezd, personální administrativa a reporting pro firmy v Chebu a regionu.",
};

const features = [
  {
    icon: Calculator,
    title: "Zpracování mezd",
    desc: "Kompletní výpočet mezd, srážek, odvodů a čistých mezd pro zaměstnance i jednatele.",
  },
  {
    icon: Users,
    title: "Personální administrativa",
    desc: "Přihlašování a odhlašování zaměstnanců, správa pracovních smluv, dohod DPP/DPČ.",
  },
  {
    icon: FileText,
    title: "Měsíční hlášení",
    desc: "Zpracování a odeslání přehledů pro ČSSZ, zdravotní pojišťovny a finanční úřad.",
  },
  {
    icon: Shield,
    title: "Roční zúčtování",
    desc: "Roční zúčtování daně z příjmu ze závislé činnosti, potvrzení o příjmech.",
  },
  {
    icon: Clock,
    title: "Nemocenské dávky",
    desc: "Výpočet nemocenských dávek, ošetřovného, mateřské a rodičovské dovolené.",
  },
  {
    icon: CheckCircle,
    title: "Evidenční listy",
    desc: "Evidenční listy důchodového pojištění, potvrzení pro úřady a instituce.",
  },
];

const details = [
  "Výplatní pásky a mzdové listy",
  "Rekapitulace mezd za firmu",
  "Příkazy k úhradě mezd a odvodů",
  "Statistické výkazy (ČSÚ)",
  "Pracovní smlouvy a dodatky",
  "Dohody o provedení práce (DPP)",
  "Dohody o pracovní činnosti (DPČ)",
  "Výpovědi a ukončení pracovních poměrů",
  "Zápočtové listy",
  "Potvrzení o zaměstnání",
  "Přihlášky/odhlášky na ČSSZ a ZP",
  "Srážky ze mzdy (exekuce, insolvence)",
];

export default function MzdoveUcetnictviPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(0,229,160,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-status-green inline-block" />
            MZDOVÉ ÚČETNICTVÍ
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Kompletní <span className="text-status-green">mzdová agenda</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl leading-relaxed">
            Zpracování mezd, personální administrativa a veškeré hlášení pro
            ČSSZ, zdravotní pojišťovny i finanční úřad. Vy se staráte o
            podnikání, my o mzdy vašich zaměstnanců.
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="glass-panel p-6 group hover:border-status-green/30 transition-all duration-300"
              >
                <f.icon size={28} className="text-status-green mb-4" />
                <h3
                  className="text-white text-lg font-semibold mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {f.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail list */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Co vše zajistíme
              </h2>
              <p className="text-text-secondary mb-8">
                Kompletní mzdový servis od A do Z — od nástupu zaměstnance po
                ukončení pracovního poměru.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {details.map((d) => (
                <div
                  key={d}
                  className="flex items-start gap-2 p-3 border border-cyan/8 bg-white/2"
                >
                  <CheckCircle
                    size={14}
                    className="text-status-green mt-0.5 flex-shrink-0"
                  />
                  <span className="text-text-secondary text-sm">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="glass-panel p-10">
            <h2
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Potřebujete zpracovat mzdy?
            </h2>
            <p className="text-text-secondary mb-6">
              Kontaktujte naše mzdové oddělení — vedoucí Jaroslava Seitzová vám
              ráda poradí.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+420354433005" className="btn-primary">
                <ArrowRight size={14} /> +420 351 011 837
              </a>
              <a href="mailto:seitzova@schekonom.cz" className="btn-ghost">
                seitzova@schekonom.cz
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
