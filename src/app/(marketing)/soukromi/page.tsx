import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description:
    "Jak EkonomOS zachází s osobními údaji návštěvníků webu a klientů — GDPR-compliant, EU hosting, opt-in citlivé funkce.",
  alternates: { canonical: "/soukromi" },
};

export default function SoukromiPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            PRÁVNÍ // OCHRANA OSOBNÍCH ÚDAJŮ
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ochrana osobních údajů
          </h1>
          <p className="mt-4 text-text-muted text-sm">
            Účinné od 30. 4. 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              1. Správce údajů
            </h2>
            <p>
              Správcem osobních údajů je Studio VELYOS, provozovatel produktu
              EkonomOS. Kontakt:{" "}
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
              2. Jaké údaje sbíráme z webu
            </h2>
            <p>
              Web <strong className="text-white">ekonomos.velyos.cz</strong> nepoužívá
              žádné trackovací cookies. Pokud máme aktivní analytiku
              (Plausible Analytics), sbíráme pouze anonymní pageviews bez
              identifikace návštěvníka, bez fingerprintingu, bez crossite
              trackingu.
            </p>
            <p>
              Pokud vyplníte kontaktní formulář, zpracováváme: jméno, e-mail,
              název firmy a obsah zprávy. Účelem je odpověď na vaši poptávku.
              Právní základ: čl. 6 odst. 1 písm. b) GDPR (jednání před uzavřením smlouvy).
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              3. Demo přístup
            </h2>
            <p>
              Demo aplikace EkonomOS pracuje s anonymizovanými testovacími
              daty. Pokud demo používáte, nesbíráme žádné osobní údaje
              související s vaší činností v aplikaci.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              4. Jak dlouho údaje uchováváme
            </h2>
            <p>
              Údaje z kontaktního formuláře uchováváme po dobu nezbytnou pro
              vyřízení poptávky a běžnou obchodní komunikaci, maximálně však
              3 roky. Po této době údaje mažeme.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              5. Komu údaje předáváme
            </h2>
            <p>
              Pro odeslání transakčních e-mailů (oznámení o vyplnění formuláře)
              používáme službu Brevo (sendinblue.com), provozovanou v EU.
              Pro evidenci poptávek používáme Google Sheets (G Suite EU
              region). Žádné údaje nepředáváme do třetích zemí mimo EU.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              6. Vaše práva
            </h2>
            <p>
              Máte právo na přístup k údajům, opravu, výmaz, omezení
              zpracování, přenositelnost a námitku proti zpracování. Pro
              uplatnění práv pište na{" "}
              <a
                href="mailto:stepan@velyos.cz"
                className="text-cyan hover:underline"
              >
                stepan@velyos.cz
              </a>
              . Také máte právo podat stížnost u Úřadu pro ochranu osobních
              údajů (uoou.cz).
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              7. Pro klienty pilot fáze
            </h2>
            <p>
              Pokud vstupujete do pilotní spolupráce, samostatnou DPA smlouvou
              upravíme: jaká data zpracováváme, kde jsou hostovaná, kdo k nim
              má přístup, retention period a co se stane při ukončení.
              Detail vám předáme s implementační dokumentací.
            </p>
          </section>

          <section>
            <p className="text-text-muted text-sm border-t border-cyan/10 pt-6 mt-8">
              Toto prohlášení může být aktualizováno. Aktuální verze je vždy
              dostupná na této stránce. O zásadních změnách informujeme
              e-mailem registrované uživatele a klienty.
            </p>
          </section>
        </div>

        <div className="mt-16 text-center">
          <div className="glass-panel inline-block p-10 max-w-xl">
            <Shield size={28} className="text-cyan mx-auto mb-4" />
            <h3
              className="text-white text-xl font-semibold mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Otázky na compliance?
            </h3>
            <p className="text-text-secondary mb-6 text-sm leading-relaxed">
              Pro klienty z velkých firem máme připravený detailní security pack a DPA template.
            </p>
            <Link href="/zabezpeceni-dat" className="btn-primary">
              Zabezpečení dat
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
