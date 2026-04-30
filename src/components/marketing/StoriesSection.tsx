"use client";

import Link from "next/link";
import { ShieldCheck, Calendar, UserMinus, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const stories = [
  {
    icon: ShieldCheck,
    code: "SCÉNÁŘ-01",
    headline: "Phishing IBAN",
    subhead: "Někdo vám podvrhne změnu účtu",
    body: [
      "Klient platí dlouhodobě stejnému dodavateli. Tentokrát přijde mail s fakturou — všechno jako vždycky, jen 'použijte prosím nový IBAN'.",
      "Klasický phishing. Účetní by v rutině zaplatila. Aplikace si toho má všimnout.",
    ],
    alert:
      'EkonomOS by měl říct: "Podezřelá změna IBAN — ověřit telefonicky na známém čísle. Neplatit do ověření."',
    outcome:
      "Účetní zavolá přímo dodavateli. Pokud žádnou změnu neposlal, vy jste právě ušetřili klientovi částku faktury.",
    contrast:
      "Bez aplikace by se peníze odeslaly na falešný účet, než by někdo zjistil, že IBAN nesedí.",
    accent: "red",
  },
  {
    icon: Calendar,
    code: "SCÉNÁŘ-02",
    headline: "Zaseknutá uzávěrka",
    subhead: "Klient nedodá podklady, výplaty se blíží",
    body: [
      "Klient měl poslat docházku do 10. dubna. 11. ráno: ticho. 12.: ticho. Bez docházky se nedají spočítat mzdy. Bez mezd nejdou výplaty 25.",
      "Účetní by to zjistila až na konci měsíce, kdyby zkusila zpracovat mzdy.",
    ],
    alert:
      'EkonomOS by měl říct: "Mzdová uzávěrka zablokovaná — chybí docházka. Eskalace na jednatele dnes."',
    outcome:
      "Vedoucí mezd okamžitě zavolá manažerovi klienta a pomůže vyřešit, proč podklady neposlal. Výplaty stihnou termín.",
    contrast:
      "Bez aplikace problém vyjde najevo, až mzdy zaseknou — to už je pozdě.",
    accent: "gold",
  },
  {
    icon: UserMinus,
    code: "SCÉNÁŘ-03",
    headline: "Tichý odchod klienta",
    subhead: "Klient přestane komunikovat",
    body: [
      "Nový klient v onboardingu měl poslat bankovní výpisy. Nedoručí. Na maily neodpovídá. Telefon nezvedá.",
      "Pro lidské oko: 'bude mít moc práce'. Pro aplikaci to vypadá jinak.",
    ],
    alert:
      'EkonomOS by měl říct: "Klient v prodlení a bez komunikace. Doporučení: osobní návštěva, nabídnout pomoc se sběrem dokumentů."',
    outcome:
      "Tým zajede osobně. Pokud má klient problém s předchozím účetním nebo zvažuje odchod, zachytíte to dřív, než pošle výpověď.",
    contrast:
      "Bez aplikace dostanete za měsíc e-mail 'Děkujeme za spolupráci, jdeme jinam'.",
    accent: "cyan",
  },
];

export default function StoriesSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="scenare"
      className="py-16 sm:py-24 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Section background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <div className={`mb-16 ${inView ? "animate-float-up" : "opacity-0"}`}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse-dot" />
            CO MÁ APLIKACE ZACHYTIT // 3 SCÉNÁŘE
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white max-w-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Tři situace, na které
            <br />
            <span className="text-gold">EkonomOS cílí.</span>
          </h2>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Tohle nejsou historické případy zákazníků — produkt je v pilotní fázi. Jsou to <strong className="text-white">scénáře</strong>, na které je aplikace stavěná. Pokud vám zní povědomě, jste přesně cílovka, kterou hledáme.
          </p>
        </div>

        {/* Stories grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {stories.map((s, i) => {
            const accentColor =
              s.accent === "red"
                ? "rgba(255,123,123,0.5)"
                : s.accent === "gold"
                  ? "rgba(212,175,55,0.5)"
                  : "rgba(0,229,255,0.5)";
            const accentBg =
              s.accent === "red"
                ? "rgba(255,123,123,0.06)"
                : s.accent === "gold"
                  ? "rgba(212,175,55,0.06)"
                  : "rgba(0,229,255,0.06)";

            return (
              <div
                key={s.code}
                className={`hud-panel p-7 flex flex-col relative ${
                  inView
                    ? `animate-float-up delay-${(i + 1) * 200}`
                    : "opacity-0"
                }`}
                style={{
                  borderTop: `2px solid ${accentColor}`,
                }}
              >
                {/* Top: code + icon */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="text-text-muted"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.code}
                  </span>
                  <div
                    className="p-2.5 border"
                    style={{
                      borderColor: accentColor,
                      background: accentBg,
                    }}
                  >
                    <s.icon size={20} style={{ color: accentColor }} />
                  </div>
                </div>

                {/* Headline */}
                <div className="mb-6">
                  <div
                    className="text-2xl sm:text-3xl font-bold mb-2"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      color: accentColor,
                      lineHeight: 1.05,
                    }}
                  >
                    {s.headline}
                  </div>
                  <div
                    className="text-white text-lg font-semibold"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {s.subhead}
                  </div>
                </div>

                {/* Body paragraphs — first paragraph always, second only on sm+ */}
                <div className="space-y-3 mb-5 text-text-secondary text-sm leading-relaxed">
                  {s.body.map((p, idx) => (
                    <p key={idx} className={idx > 0 ? "hidden sm:block" : ""}>
                      {p}
                    </p>
                  ))}
                </div>

                {/* Alert callout */}
                <div
                  className="p-4 mb-5 text-sm leading-relaxed"
                  style={{
                    borderLeft: `2px solid ${accentColor}`,
                    background: accentBg,
                    color: "#FFFFFF",
                    fontStyle: "italic",
                  }}
                >
                  {s.alert}
                </div>

                {/* Outcome */}
                <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                  {s.outcome}
                </p>

                {/* Contrast bottom — hidden on small screens to keep cards short */}
                <div className="pt-4 border-t border-cyan/10 hidden sm:block">
                  <p
                    className="text-text-muted text-xs leading-relaxed"
                    style={{ fontStyle: "italic" }}
                  >
                    <strong className="text-text-secondary not-italic">
                      Bez aplikace:
                    </strong>{" "}
                    {s.contrast.replace(/^Bez aplikace by /, "").replace(/^Bez aplikace bys /, "").replace(/^Bez aplikace /, "")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`mt-16 text-center ${inView ? "animate-float-up delay-800" : "opacity-0"}`}
        >
          <p className="text-text-secondary text-lg mb-6">
            Tyhle scénáře aplikace umí. Konkrétní dopad u vás společně změříme — produkt je v pilotní fázi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/funkce" className="btn-primary">
              Co všechno aplikace umí
              <ArrowRight size={16} />
            </Link>
            <Link href="/prihlaseni" className="btn-ghost">
              Vyzkoušet demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
