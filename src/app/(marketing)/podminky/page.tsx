import type { Metadata } from "next";
import Link from "next/link";
import { ScrollText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Obchodní podmínky",
  description:
    "Obecné podmínky používání webu ekonomos.velyos.cz a demo přístupu k aplikaci EkonomOS.",
  alternates: { canonical: "/podminky" },
};

export default function PodminkyPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            PRÁVNÍ // OBCHODNÍ PODMÍNKY
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Obchodní podmínky
          </h1>
          <p className="mt-4 text-text-muted text-sm">
            Účinné od 30. 4. 2026
          </p>
        </div>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              1. Provozovatel
            </h2>
            <p>
              Web <strong className="text-white">ekonomos.velyos.cz</strong> a produkt
              EkonomOS provozuje Studio VELYOS, kontaktní osoba Štěpán Manda,{" "}
              <a
                href="mailto:stepan@velyos.cz"
                className="text-cyan hover:underline"
              >
                stepan@velyos.cz
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              2. Charakter webu
            </h2>
            <p>
              Web slouží jako prezentace produktu EkonomOS a kanál pro
              navazování obchodní spolupráce. Obsah webu je informativní,
              nenahrazuje smluvní dokumentaci.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              3. Demo přístup
            </h2>
            <p>
              Demo aplikace EkonomOS dostupné na{" "}
              <Link href="/prihlaseni" className="text-cyan hover:underline">
                /prihlaseni
              </Link>{" "}
              slouží k seznámení se s funkčností. Demo data jsou anonymizovaná
              a nesouvisejí s žádnými reálnými klienty. Demo přístup je
              poskytován zdarma a může být kdykoli omezen nebo ukončen bez
              předchozího upozornění.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              4. Pilot fáze
            </h2>
            <p>
              Pilotní spolupráce vzniká samostatnou písemnou smlouvou mezi
              partnerskou účetní firmou a Studiem VELYOS. Tato smlouva upravuje
              cenu, rozsah služeb, SLA, retention dat, exit klauzuli a další
              podmínky. Web informativně popisuje obvyklý průběh pilotu, ale
              neuzavírá smlouvu.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              5. Duševní vlastnictví
            </h2>
            <p>
              Veškerý obsah webu (texty, vizuál, kód) je duševním vlastnictvím
              Studia VELYOS. Bez výslovného souhlasu jej nelze přebírat,
              kopírovat ani modifikovat pro komerční účely. Pro citaci
              v odborném kontextu (články, recenze, akademická práce) postačí
              uvedení zdroje.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              6. Omezení odpovědnosti
            </h2>
            <p>
              Informace na webu jsou poskytovány „jak jsou" (as-is). Nepřebíráme
              odpovědnost za rozhodnutí učiněná na základě obsahu webu před
              uzavřením písemné smlouvy.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              7. Změny podmínek
            </h2>
            <p>
              Tyto podmínky můžeme jednostranně měnit. Aktuální verze je vždy
              dostupná na této stránce.
            </p>
          </section>

          <section>
            <p className="text-text-muted text-sm border-t border-cyan/10 pt-6 mt-8">
              Pro pilot smlouvu, MSA nebo DPA template — ozvěte se přímo na{" "}
              <a
                href="mailto:stepan@velyos.cz"
                className="text-cyan hover:underline"
              >
                stepan@velyos.cz
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 text-center">
          <div className="glass-panel inline-block p-10 max-w-xl">
            <ScrollText size={28} className="text-cyan mx-auto mb-4" />
            <h3
              className="text-white text-xl font-semibold mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Domluvit smluvní podmínky
            </h3>
            <p className="text-text-secondary mb-6 text-sm leading-relaxed">
              Pilot smlouva je individuální. Domluvíme ji po krátkém hovoru.
            </p>
            <Link href="/kontakt" className="btn-primary">
              Domluvit hovor
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
