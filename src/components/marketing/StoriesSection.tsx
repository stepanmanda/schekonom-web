"use client";

import Link from "next/link";
import { ShieldCheck, Calendar, UserMinus, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const stories = [
  {
    icon: ShieldCheck,
    code: "FRAUD-01",
    headline: "672 000 Kč",
    subhead: "Někdo se nás snažil okrást",
    body: [
      "Stavební firma platila dlouhodobě německému dodavateli. Tentokrát přišel mail s fakturou — všechno jako vždycky, jen 'použijte prosím nový IBAN'.\",
      "Klasický phishing. Účetní by v rutině zaplatila. Aplikace si všimla.",
    ],
    alert: 'EkonomOS hlásí ⟶ "Podezřelá změna IBAN u Kranbau. Ověřit telefonicky na známém čísle. Neplatit do ověření."',
    outcome:
      "Schneider zavolal Kranbau na známé číslo — žádnou změnu neposlali. Někdo se vlomil do mailu. Klient ušetřen 672 000 Kč.",
    contrast: "Bez aplikace by se 672 000 Kč nasadilo na falešný účet.",
    accent: "red",
  },
  {
    icon: Calendar,
    code: "DEADLINE-02",
    headline: "Mzdy by zamrzly",
    subhead: "Restaurace nedodala docházku",
    body: [
      "Restaurace měla poslat docházku za březen do 10. dubna. Nepřišla. 11. ráno: ticho. 12.: ticho. 13. ráno: aplikace se ozvala.",
      "Bez docházky se nedají spočítat mzdy. Bez mezd nejdou výplaty 25.",
    ],
    alert: 'EkonomOS hlásí ⟶ "Mzdová uzávěrka zablokovaná — chybí docházka. Deadline 13. 4. Eskalovat na jednatele."',
    outcome:
      "Vedoucí mezd zavolala manažerce, zjistila, že nová pokladní neumí systém. Domluvily se na středu. Výplaty stihly.",
    contrast:
      "Bez aplikace by problém vyšel najevo, až by se mzdy začaly počítat. Tehdy už pozdě.",
    accent: "gold",
  },
  {
    icon: UserMinus,
    code: "CHURN-03",
    headline: "Klient se chystal odejít",
    subhead: "Aplikace to věděla dřív než my",
    body: [
      "Nový klient v onboardingu měl poslat bankovní výpisy do 5. dubna. Nedoručil. Na maily neodpovídal. Telefon nezvedal.",
      "Pro lidské oko: „bude mít moc práce". Aplikace to vidí jinak.",
    ],
    alert: 'EkonomOS hlásí ⟶ "Onboarding v prodlení — klient neodpovídá. Pravděpodobnost odchodu rostoucí. Doporučení: osobní návštěva, nabídnout pomoc se sběrem dokumentů."',
    outcome:
      "Mácalová zajela osobně. Klient měl problém s předchozím účetním a chtěl se vrátit zpátky. Vyřešila to. Klient zůstal.",
    contrast:
      "Bez aplikace bys za měsíc dostal e-mail „Děkujeme za spolupráci, jdeme jinam".",
    accent: "cyan",
  },
];

export default function StoriesSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="pribehy"
      className="py-28 relative"
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
            CO APLIKACE VČERA UDĚLALA // 3 SITUACE
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white max-w-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Tři dny, kdy aplikace
            <br />
            <span className="text-gold">zachránila víc, než stála.</span>
          </h2>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Reálná data z portálu — anonymizovaná, ale autentická. Tohle se v
            jedné účetní firmě <strong className="text-white">stalo za jediný týden</strong>.
            Vy se ráno otevřete aplikaci a vidíte to první.
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

                {/* Big number / title */}
                <div className="mb-6">
                  <div
                    className="text-3xl sm:text-4xl font-bold mb-2"
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

                {/* Body paragraphs */}
                <div className="space-y-3 mb-5 text-text-secondary text-sm leading-relaxed">
                  {s.body.map((p, idx) => (
                    <p key={idx}>{p}</p>
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

                {/* Contrast bottom */}
                <div className="pt-4 border-t border-cyan/10">
                  <p
                    className="text-text-muted text-xs leading-relaxed"
                    style={{ fontStyle: "italic" }}
                  >
                    <strong className="text-text-secondary not-italic">
                      Bez aplikace:
                    </strong>{" "}
                    {s.contrast.replace(/^Bez aplikace by /, "").replace(/^Bez aplikace bys /, "")}
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
            205 dalších analýz pracuje na pozadí, abyste tyhle situace viděli první.
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
