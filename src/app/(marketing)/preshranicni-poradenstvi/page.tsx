import {
  Globe,
  Building2,
  FileText,
  Scale,
  Users,
  CheckCircle,
  ArrowRight,
  MapPin,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Přeshraniční CZ/DE poradenství — SCH-EKONOM",
  description:
    "Daňové poradenství pro německé subjekty v ČR. Založení firmy, transferové ceny, zamezení dvojího zdanění.",
};

const services = [
  {
    icon: Building2,
    title: "Založení firmy v ČR",
    desc: "Kompletní poradenství při zakládání české pobočky nebo dceřiné společnosti pro německé investory. Od registrace přes obchodní rejstřík po daňovou registraci.",
  },
  {
    icon: FileText,
    title: "Daňové poradenství DE→CZ",
    desc: "Komplexní daňové poradenství pro německé společnosti podnikající v České republice. DPPO, DPH, srážkové daně.",
  },
  {
    icon: Scale,
    title: "Transferové ceny",
    desc: "Nastavení a dokumentace transferových cen mezi propojenými osobami v souladu s českou i německou legislativou a směrnicemi OECD.",
  },
  {
    icon: Globe,
    title: "Zamezení dvojího zdanění",
    desc: "Aplikace smlouvy o zamezení dvojího zdanění mezi ČR a SRN. Optimalizace daňové zátěže, Freistellung, refundace.",
  },
  {
    icon: Users,
    title: "Vysílání zaměstnanců",
    desc: "Formuláře A1, sociální a zdravotní pojištění, pracovní povolení, splnění oznamovacích povinností.",
  },
  {
    icon: FileText,
    title: "Zastupování před úřady",
    desc: "Zastupování před českými finančními úřady, ČSSZ, zdravotními pojišťovnami a dalšími institucemi v českém jazyce.",
  },
];

const advantages = [
  "Znalost české i německé legislativy",
  "Tým hovořící česky i německy",
  "Přímá komunikace s německými úřady",
  "Sídlo v příhraničním regionu Cheb–Bavorsko",
  "30+ let praxe s přeshraničními klienty",
  "Kompletní servis v jednom místě",
];

export default function PreshranicniPoradenstviPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(212,175,55,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            PŘESHRANIČNÍ PORADENSTVÍ // CZ ↔ DE
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Německé subjekty{" "}
            <span className="text-gold">v České republice</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl leading-relaxed">
            Specializované daňové a účetní poradenství pro německé firmy a
            investory podnikající v ČR. Pomůžeme vám s celým procesem — od
            založení firmy po průběžné daňové poradenství.
          </p>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hud-panel p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin size={20} className="text-gold" />
              <h2
                className="text-xl font-bold text-white"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Proč SCH-EKONOM pro přeshraniční poradenství?
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {advantages.map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-2 p-3 border border-gold/10 bg-gold/3"
                >
                  <CheckCircle size={14} className="text-gold flex-shrink-0" />
                  <span className="text-text-secondary text-sm">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-2xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Jaké služby německým firmám nabízíme?
          </h2>
          <p className="text-text-secondary mb-10 max-w-2xl">
            Komplexní servis pro německé podnikatele — od prvního kroku na český
            trh po průběžnou správu daní a účetnictví.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="glass-panel p-6 group hover:border-gold/30 transition-all duration-300"
              >
                <s.icon size={28} className="text-gold mb-4" />
                <h3
                  className="text-white text-lg font-semibold mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="glass-panel p-10">
            <h2
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Plánujete podnikat v České republice?
            </h2>
            <p className="text-text-secondary mb-6">
              Kontaktujte Ottu Zeitlera — manažera vztahů s klienty pro Německo.
              Komunikujeme plynně česky i německy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+420351011050" className="btn-primary">
                <ArrowRight size={14} /> +420 351 011 050
              </a>
              <a href="mailto:otto.zeitler@schekonom.cz" className="btn-ghost">
                otto.zeitler@schekonom.cz
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
