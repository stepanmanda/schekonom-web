import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Web ekonomos.velyos.cz nepoužívá trackovací cookies. Pouze technické cookies nezbytné pro fungování stránky.",
  alternates: { canonical: "/cookies" },
};

const noCookies = [
  "Žádné Google Analytics cookies",
  "Žádný Facebook Pixel ani jiné marketing tracking",
  "Žádný cross-site tracking",
  "Žádný fingerprinting",
  "Žádné A/B testing cookies",
];

export default function CookiesPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            PRÁVNÍ // COOKIES
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Cookies
          </h1>
          <p className="mt-4 text-text-muted text-sm">
            Krátká verze: <strong className="text-white">Web nepoužívá trackovací cookies.</strong>
          </p>
        </div>

        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Co je to cookie?
            </h2>
            <p>
              Malý textový soubor, který web uloží do vašeho prohlížeče.
              Slouží buď pro fungování stránky (technické cookies), nebo pro
              sledování chování (marketing/analytics cookies, ty obvykle
              vyžadují souhlas dle GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Co web nepoužívá
            </h2>
            <ul className="space-y-2">
              {noCookies.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-status-green mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Co web používá
            </h2>
            <p>
              <strong className="text-white">Plausible Analytics</strong> (pokud
              je aktivní) — služba poskytující anonymní statistiky návštěvnosti
              <strong className="text-white"> bez cookies</strong>, bez identifikace
              uživatele, bez crossite trackingu. Plausible je hostován v EU,
              GDPR-compliant by design.
            </p>
            <p className="mt-3">
              <strong className="text-white">Technické session cookies</strong> demo
              aplikace na <Link href="/prihlaseni" className="text-cyan hover:underline">/prihlaseni</Link> —
              pouze pro fungování přihlašovací relace, vyprší při zavření
              prohlížeče. Nesouvisejí s analytikou ani marketingem, nepotřebují
              souhlas.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Proč nemáme cookie banner?
            </h2>
            <p>
              Cookie banner musíte mít, pokud používáte tracking cookies (nebo
              jiné technologie sledování). My žádné nepoužíváme, takže banner
              by byl zbytečný — a podle nás otravný.
            </p>
            <p className="mt-3">
              Pokud někdy začneme tracking používat, banner přidáme a budeme
              se vás explicitně ptát na souhlas.
            </p>
          </section>

          <section>
            <p className="text-text-muted text-sm border-t border-cyan/10 pt-6 mt-8">
              Pokud máte další otázky, napište na{" "}
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
            <Cookie size={28} className="text-cyan mx-auto mb-4" />
            <h3
              className="text-white text-xl font-semibold mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Více o ochraně dat
            </h3>
            <p className="text-text-secondary mb-6 text-sm leading-relaxed">
              Pro klienty pilot fáze řešíme bezpečnost a data podrobněji.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/soukromi" className="btn-primary">
                Ochrana osobních údajů
                <ArrowRight size={16} />
              </Link>
              <Link href="/zabezpeceni-dat" className="btn-ghost">
                Zabezpečení dat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
