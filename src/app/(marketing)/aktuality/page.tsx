"use client";

import Link from "next/link";
import {
  Newspaper,
  Calendar,
  ArrowRight,
  TrendingUp,
  Gift,
  Heart,
  Scale,
  Sparkles,
  MapPin,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const articles = [
  {
    date: "15. ledna 2026",
    dateShort: "01/2026",
    icon: TrendingUp,
    title: "Novinky v personalistice a mzdovem ucetnictvi od 1. 1. 2026",
    titleDisplay: "Novinky v personalistice a mzdovém účetnictví od 1. 1. 2026",
    excerpt:
      "Přehled klíčových legislativních změn platných od nového roku — zvýšení minimální mzdy, nové sazby pojistného, změny v nemocenském pojištění a úpravy v oblasti zaměstnaneckých benefitů.",
    tags: ["Mzdy", "Legislativa", "2026"],
  },
  {
    date: "12. prosince 2025",
    dateShort: "12/2025",
    icon: Gift,
    title: "Vanocni firemni darky: Co je v roce 2025 danove uznatelne?",
    titleDisplay: "Vánoční firemní dárky: Co je v roce 2025 daňově uznatelné?",
    excerpt:
      "Blíží se Vánoce a s nimi i otázka, jaké dárky pro zaměstnance a obchodní partnery si můžete uplatnit jako daňový náklad. Přinášíme přehled aktuálních limitů a podmínek pro rok 2025.",
    tags: ["Daně", "Benefity", "Vánoce"],
  },
  {
    date: "20. listopadu 2025",
    dateShort: "11/2025",
    icon: Heart,
    title: 'SCH-EKONOM jako soucast projektu "Socialni auto"',
    titleDisplay: 'SCH-EKONOM jako součást projektu „Sociální auto"',
    excerpt:
      'S hrdostí oznamujeme naši účast v charitativním projektu „Sociální auto", který pomáhá zajistit mobilitu pro sociálně potřebné. Společenská odpovědnost je nedílnou součástí naší firemní kultury.',
    tags: ["CSR", "Charita", "Region"],
  },
  {
    date: "1. června 2025",
    dateShort: "06/2025",
    icon: Scale,
    title: "Zakonik prace 2025: Prehled klicovych zmen od 1. cervna",
    titleDisplay: "Zákoník práce 2025: Přehled klíčových změn od 1. června",
    excerpt:
      "Novela zákoníku práce přináší důležité změny v oblasti práce na dálku, dohod o pracích konaných mimo pracovní poměr a informační povinnosti zaměstnavatelů. Shrnujeme, co potřebujete vědět.",
    tags: ["Zákoník práce", "Novela", "HR"],
  },
  {
    date: "8. ledna 2025",
    dateShort: "01/2025",
    icon: Sparkles,
    title: "Zmeny a novinky pro rok 2025",
    titleDisplay: "Změny a novinky pro rok 2025",
    excerpt:
      "Komplexní přehled všech legislativních změn ovlivňujících podnikatele, zaměstnavatele i zaměstnance v roce 2025. Od daňových sazeb přes pojistné až po nové povinnosti v oblasti elektronizace.",
    tags: ["Legislativa", "Přehled", "2025"],
  },
  {
    date: "říjen 2024",
    dateShort: "10/2024",
    icon: MapPin,
    title: "Nova pobocka v Plzni otevrena",
    titleDisplay: "Nová pobočka v Plzni otevřena",
    excerpt:
      "Otevřeli jsme novou pobočku v Plzni v prostorách Kolektiv Hubu na Kopeckého sadech. Rozšiřujeme tak naše služby pro klienty v Plzeňském kraji a nabízíme osobní konzultace i mimo Cheb.",
    tags: ["Pobočka", "Plzeň", "Expanze"],
  },
];

function FadeInSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${inView ? "animate-float-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

function NewsCard({
  article,
  index,
}: {
  article: (typeof articles)[0];
  index: number;
}) {
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`service-card p-0 overflow-hidden group ${
        inView
          ? `animate-float-up delay-${((index % 3) + 1) * 100}`
          : "opacity-0"
      }`}
    >
      {/* Date header strip */}
      <div className="px-8 pt-6 pb-4 border-b border-cyan/8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-cyan/15 bg-cyan/5">
            <article.icon size={16} className="text-cyan/70" />
          </div>
          <div className="section-tag !text-[0.6rem]">
            <Calendar size={10} />
            {article.dateShort}
          </div>
        </div>
        <span
          className="text-text-muted"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
          }}
        >
          {article.date}
        </span>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3
          className="text-white text-lg font-semibold mb-3 group-hover:text-cyan transition-colors leading-snug"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {article.titleDisplay}
        </h3>

        <p className="text-text-muted text-sm leading-relaxed mb-6">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {article.tags.map((tag) => (
            <span key={tag} className="hud-chip" data-tone="slate">
              {tag}
            </span>
          ))}
        </div>

        {/* Read more */}
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-cyan text-sm font-medium hover:gap-3 transition-all"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Číst dále
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default function AktualityPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page header */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            AKTUALITY // NOVINKY A LEGISLATIVA
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-cyan">Aktuality</span> a novinky
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Sledujeme legislativní změny, novinky v daňovém a účetním prostředí
            a sdílíme praktické informace pro podnikatele, zaměstnavatele i
            zaměstnance.
          </p>
        </div>

        {/* Newsletter CTA */}
        <FadeInSection className="mb-16">
          <div className="hud-panel p-8 rounded-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 border border-cyan/20 bg-cyan/8">
                  <Newspaper size={22} className="text-cyan" />
                </div>
                <div>
                  <h3
                    className="text-white font-semibold"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Chcete mít přehled o změnách?
                  </h3>
                  <p className="text-text-muted text-sm mt-0.5">
                    Kontaktujte nás a zařadíme vás do našeho informačního
                    newsletteru.
                  </p>
                </div>
              </div>
              <Link href="/kontakt" className="btn-primary flex-shrink-0">
                Kontaktovat nás
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </FadeInSection>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {articles.map((article, i) => (
            <NewsCard key={article.title} article={article} index={i} />
          ))}
        </div>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Newspaper size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Potřebujete poradit?
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Máte dotaz k aktuálním legislativním změnám nebo potřebujete
                poradit s jejich dopadem na vaše podnikání? Ozvěte se nám.
              </p>
              <Link href="/kontakt" className="btn-primary">
                Domluvit konzultaci
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
