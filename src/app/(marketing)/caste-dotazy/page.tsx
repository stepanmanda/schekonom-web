"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

type FaqGroup = {
  category: string;
  items: { q: string; a: string }[];
};

const faqs: FaqGroup[] = [
  {
    category: "Nasazení a integrace",
    items: [
      {
        q: "Jak dlouho trvá nasazení?",
        a: "Standardně 8–12 týdnů od podpisu. První 2 týdny audit a baseline, 3.–6. týden integrace na vaše systémy a customizace, 7.–12. týden pilotní provoz. V pilot fázi máme čas na pečlivé nasazení — nechceme spěchat na úkor kvality.",
      },
      {
        q: "Co když naše účetní firma používá jiný účetní software, než s kým máte zkušenosti?",
        a: "Většina českých účetních systémů má export nebo API. Pokud ne, řešíme přes pravidelný export (CSV/XML), který nahráváme my. V krajním případě OCR z výstupních sestav. Konkrétní postup probereme při auditu.",
      },
      {
        q: "Potřebujeme IT oddělení nebo IT partnera?",
        a: "Ne. Veškerý onboarding zajišťuje VELYOS. Od vás potřebujeme přístupy a součinnost při nastavování — typicky stačí 2 hodiny týdně po dobu prvních 6 týdnů.",
      },
      {
        q: "Můžeme aplikaci hostovat na svých serverech?",
        a: "V pilot fázi ne. EkonomOS běží jako SaaS na infrastruktuře v EU. Pro velké klienty s vysokými security požadavky umíme zajistit dedicated tenant s vlastní DB instancí.",
      },
    ],
  },
  {
    category: "Cena a smluvní podmínky",
    items: [
      {
        q: "Kolik to stojí?",
        a: "Cena má tři složky: jednorázový setup fee (audit, integrace, customizace), měsíční platforma fee (hosting, údržba, support) a per-klient fee (skaluje s úspěchem). Konkrétní čísla závisí na rozsahu — probereme na konzultaci. V pilot fázi nabízíme zvýhodněné podmínky.",
      },
      {
        q: "Jaký je minimální závazek?",
        a: "Pilot je 6 měsíců. Po pilotu se rozhodnete, jestli pokračujete do plné komerční fáze. Žádný auto-renewal, žádné skryté podmínky.",
      },
      {
        q: "Co se stane, když ukončíme spolupráci?",
        a: "Vaše data jsou vaše. Před ukončením vám předáme kompletní export ve standardních formátech (CSV, JSON, PDF). Po skončení smluvních dat máme zákonem dané období pro archivaci, pak data nevratně mažeme.",
      },
    ],
  },
  {
    category: "Bezpečnost a data",
    items: [
      {
        q: "Kde jsou naše data uložená?",
        a: "Veškerá produkční data hostujeme v datacentru v EU. Žádné transfery do USA nebo Asie. Šifrování v klidu (AES-256) i při přenosu (TLS 1.3). Detail v sekci Zabezpečení dat.",
      },
      {
        q: "Splňujete GDPR?",
        a: "Ano, GDPR-compliant. DPA template předáme s implementační dokumentací. Pověřence pro ochranu osobních údajů zajistíme nebo s vaším spolupracujeme. Konkrétní právní základy zpracování probereme s každým klientem.",
      },
      {
        q: "Co AI Act 2026?",
        a: "Splňujeme požadavky evropského AI Act účinného od 2026 — transparentnost AI rozhodování, lidská kontrola u kritických akcí, dokumentace modelů, opt-in pro vysokorizikové funkce. Citlivé funkce (lingvistická a behaviorální analýza) jsou defaultně vypnuté.",
      },
      {
        q: "Můžete vidět naše konkrétní data?",
        a: "Vývojový tým má přístup k systémovým logům pro debugging, ale ne ke konkrétním klientským datům — ta jsou izolovaná na úrovni databáze. Pro pilot fázi máme limitovaný přístup pro účely testování, vždy s vaším souhlasem a pod NDA.",
      },
    ],
  },
  {
    category: "Produkt a fungování",
    items: [
      {
        q: "Klient se přihlašuje sám, nebo jen vy?",
        a: "Obojí. Klient účetní firmy se přihlásí na svůj portál, nahraje dokumenty, schvaluje. Vy v admin aplikaci vidíte všechny klienty na jedné obrazovce. Tři vrstvy: veřejný web, klientský portál, admin app.",
      },
      {
        q: "Co když klient odmítne digitální nahrávání?",
        a: "Můžete dál přijímat papír — naskenujete a aplikace ho zařadí. Ale pro plnou hodnotu EkonomOS je digitální vstup výhodnější. Pokud máte hodně klientů s tradiční papírovou agendou, EkonomOS pro vás možná zatím nemá smysl.",
      },
      {
        q: "Existuje SLA?",
        a: "V pilot fázi best-effort uptime se závazkem 99 % a reakční dobou na kritické incidenty do 2 hodin v pracovní době. Po pilotu se posune na enterprise SLA s 99,9 % uptime.",
      },
      {
        q: "Co když VELYOS skončí nebo bude prodaný?",
        a: "Smlouva obsahuje exit klauzuli — v případě ukončení provozu garantujeme migrační období minimálně 6 měsíců a kompletní data export. Plus máme escrow účet pro zdrojový kód, pokud by to bylo podmínkou.",
      },
    ],
  },
  {
    category: "Pilot fáze",
    items: [
      {
        q: "Proč pilot, proč ne klasický prodej?",
        a: "Protože nechceme slibovat čísla, která neumíme dokázat. Pilot nám dává možnost společně změřit dopad u reálné kanceláře, vám dává zvýhodněné podmínky a přístup k týmu. Win-win.",
      },
      {
        q: "Co se stane, když pilot nedopadne?",
        a: "Žádné penalty. Po 6 měsících společně vyhodnotíme, jestli má smysl pokračovat. Pokud ne, ukončíme férově, předáme data, rozejdeme se v dobrém. EkonomOS si nemůže dovolit nespokojené klienty — referencí je málo.",
      },
      {
        q: "Můžu pilot ukončit dříve?",
        a: "Ano, s 30denní výpovědí kdykoliv. V pilot fázi nechceme nikoho držet násilím — pokud něco nefunguje, je lepší to ukončit a poučit se.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="hud-panel">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-center justify-between gap-4 text-left hover:bg-cyan/[0.03] transition-colors"
      >
        <span
          className="text-white font-semibold"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {q}
        </span>
        <ChevronDown
          size={18}
          className="text-cyan flex-shrink-0 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0 text-text-secondary text-sm leading-relaxed border-t border-cyan/8">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

function FadeInSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${inView ? "animate-float-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-16 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            ČASTÉ DOTAZY
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Otázky, které <span className="text-cyan">slyšíme nejčastěji</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg leading-relaxed">
            Pokud tu vaši otázku nenajdete, ozvěte se. Odpovíme upřímně —
            i když je odpověď „ještě nevíme, vyřešíme to v pilotu".
          </p>
        </div>

        {/* FAQ groups */}
        {faqs.map((group, gi) => (
          <FadeInSection key={group.category} className="mb-12">
            <div
              className="text-gold mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              ◉ {group.category}
            </div>
            <div className="space-y-3">
              {group.items.map((item, i) => (
                <FaqItem key={`${gi}-${i}`} q={item.q} a={item.a} />
              ))}
            </div>
          </FadeInSection>
        ))}

        {/* Final CTA */}
        <FadeInSection className="mt-16">
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <HelpCircle size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Nenašli jste odpověď?
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Napište nám konkrétní dotaz. V pracovních dnech odpovídáme do 24 hodin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn-primary">
                  Položit dotaz
                  <ArrowRight size={16} />
                </Link>
                <Link href="/pilot" className="btn-ghost">
                  Mám zájem o pilot
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
