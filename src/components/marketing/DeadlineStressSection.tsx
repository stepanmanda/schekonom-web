"use client";

import { CalendarClock, Send, FileCheck, CheckCircle2 } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const helpers = [
  {
    icon: CalendarClock,
    title: "Vidí, kdo nedodal podklady",
    desc: "Jedna obrazovka, všichni klienti, červené tečky u problémových. Žádné vyhledávání v 50 e-mailech.",
  },
  {
    icon: Send,
    title: "Sama posílá upomínky",
    desc: "3stupňový systém — e-mail (7 dní), SMS (14 dní), telefonát (21 dní). Vy nemusíte zvedat sluchátko.",
  },
  {
    icon: FileCheck,
    title: "Připravuje KH a SH automaticky",
    desc: "DPH, kontrolní hlášení, souhrnné hlášení se vygenerují z dat, která už máte. Vy zkontrolujete a podepíšete.",
  },
];

export default function DeadlineStressSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="terminy"
      className="py-24 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background accent — slight red urgency */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(255,123,123,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className={`mb-12 ${inView ? "animate-float-up" : "opacity-0"}`}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-status-red inline-block animate-pulse-dot" />
            TERMÍNOVÝ STRES // CO ZNÁTE Z 25.
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white max-w-4xl leading-[1.05]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            25. ráno. <span className="text-status-red">DPH za 6 hodin.</span>
            <br />
            Klient mlčí.
          </h2>
          <p className="mt-6 text-text-secondary text-lg sm:text-xl max-w-3xl leading-relaxed">
            Tohle znáte. Měsíční uzávěrky, daňová přiznání, kontrolní hlášení —
            v nich tone celá kancelář vždycky ten samý týden. Excel tabulky
            s deadliny, hromady mailů, klienti, kteří dodávají podklady na
            poslední chvíli (nebo vůbec). <strong className="text-white">EkonomOS to ředí za vás.</strong>
          </p>
        </div>

        {/* 3 helpers */}
        <div className={`mb-10 ${inView ? "animate-float-up delay-200" : "opacity-0"}`}>
          <div className="grid md:grid-cols-3 gap-5">
            {helpers.map((h, i) => (
              <div
                key={h.title}
                className="hud-panel p-6 lg:p-7"
                style={{ borderTop: "2px solid rgba(0,229,255,0.4)" }}
              >
                <div
                  className="absolute top-3 right-4 text-cyan/40"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    position: "absolute",
                  }}
                >
                  0{i + 1}
                </div>
                <div className="inline-flex p-3 border border-cyan/20 bg-cyan/5 mb-4">
                  <h.icon size={22} className="text-cyan" />
                </div>
                <h3
                  className="text-white text-lg font-semibold mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {h.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Před vs. Po */}
        <div className={`${inView ? "animate-float-up delay-400" : "opacity-0"}`}>
          <div className="grid md:grid-cols-2 gap-5">
            <div
              className="hud-panel p-6"
              style={{ borderLeft: "2px solid rgba(255,123,123,0.5)" }}
            >
              <div
                className="text-status-red mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                ◉ Bez aplikace
              </div>
              <p className="text-text-secondary leading-relaxed">
                Tým v posledním týdnu měsíce nestíhá. Telefonáty klientům, kdo
                ještě neposlal. Ruční sestavování KH v Excelu. Stres,
                přesčasy, riziko chyby z únavy.
              </p>
            </div>
            <div
              className="hud-panel p-6"
              style={{ borderLeft: "2px solid rgba(0,229,160,0.5)" }}
            >
              <div
                className="text-status-green mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                ◉ S aplikací
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="text-status-green mt-1 flex-shrink-0"
                />
                <p className="text-text-secondary leading-relaxed">
                  Hlídání podkladů a upomínky běží na pozadí. Tým má 80 %
                  hotovo už 20. Zbývá poslední kontrola a podání. Žádné
                  přesčasy, žádný panik mód.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
