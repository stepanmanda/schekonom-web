"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  FileCheck,
  Baby,
  UserCheck,
  Monitor,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Users,
  Award,
  MessageSquare,
  Flag,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const services = [
  {
    icon: FileCheck,
    code: "DE-001",
    title: "Steuererklaerung",
    titleDisplay: "Steuererklärung",
    desc: "Kompletní příprava a podání německého daňového přiznání pro české rezidenty pracující v Německu. Zajistíme maximální daňovou optimalizaci s využitím všech dostupných odpočtů.",
    features: [
      "Einkommensteuererklärung — kompletní příprava a podání",
      "Anlage N — příjmy ze zaměstnání v Německu",
      "Anlage Vorsorgeaufwand — odpočty pojištění",
      "Optimalizace Werbungskosten (náklady na dojíždění, pracovní pomůcky)",
      "Anlage Kind — odpočty na děti",
      "Komunikace s příslušným Finanzamt v němčině",
      "Sledování stavu zpracování a vrácení přeplatků",
    ],
  },
  {
    icon: ShieldCheck,
    code: "DE-002",
    title: "Freistellung",
    titleDisplay: "Freistellung",
    desc: "Žádosti o osvobození od srážkové daně pro české subjekty s příjmy z Německa dle smlouvy o zamezení dvojího zdanění (DBA CZ/DE). Úspěšnost našich žádostí přesahuje 98 %.",
    features: [
      "Freistellungsbescheinigung dle § 50d EStG",
      "Analýza aplikovatelnosti DBA CZ/DE na konkrétní případ",
      "Příprava kompletní dokumentace a podkladů",
      "Zastoupení před Bundeszentralamt für Steuern (BZSt)",
      "Monitoring platnosti a včasná obnova certifikátu",
      "Poradenství k optimalizaci struktury příjmů z DE",
    ],
  },
  {
    icon: UserCheck,
    code: "DE-003",
    title: "Pendler sluzby",
    titleDisplay: "Pendler služby",
    desc: "Komplexní servis pro přeshraniční zaměstnance — pendlery. Od daňového přiznání přes sociální pojištění až po koordinaci povinností v obou zemích.",
    features: [
      "Kompletní daňová přiznání pro pendlery (CZ i DE)",
      "Koordinace sociálního pojištění mezi CZ a DE",
      "Formulář A1 — vysílání pracovníků",
      "Grenzgänger status — posouzení a správa povinností",
      "Poradenství k dvojímu zdanění příjmů",
      "Optimalizace celkového daňového zatížení",
      "Zastoupení při kontrolách v obou zemích",
    ],
  },
  {
    icon: Baby,
    code: "DE-004",
    title: "Kindergeld",
    titleDisplay: "Kindergeld",
    desc: "Pomoc se žádostí o německé přídavky na děti pro české občany pracující v Německu nebo s vazbou na německý systém sociálního zabezpečení.",
    features: [
      "Posouzení nároku na Kindergeld dle aktuální legislativy",
      "Příprava a podání žádosti (Antrag auf Kindergeld)",
      "Komunikace s Familienkasse v němčině",
      "Řešení sporných případů a příprava odvolání",
      "Koordinace s českými sociálními dávkami",
      "Zpětné uplatnění nároku až 4 roky",
    ],
  },
  {
    icon: Monitor,
    code: "DE-005",
    title: "ELSTER",
    titleDisplay: "ELSTER registrace a komunikace",
    desc: "Registrace a elektronická komunikace s německým Finanzamt přes portál ELSTER — německý systém pro elektronická daňová podání.",
    features: [
      "Kompletní registrace v systému ELSTER",
      "Správa přístupových certifikátů",
      "Elektronické podání všech formulářů",
      "Technická podpora při problémech s portálem",
      "Nastavení plných mocí pro zastupování",
      "Monitoring příchozí komunikace od Finanzamt",
    ],
  },
];

const stats = [
  { val: "1 200+", label: "Zpracovaných DE přiznání" },
  { val: "98,5 %", label: "Úspěšnost Freistellung" },
  { val: "30+", label: "Let praxe v CZ/DE oblasti" },
  { val: "100 %", label: "Elektronická komunikace" },
];

const advantages = [
  "Znalost české i německé daňové legislativy",
  "Přímá komunikace s Finanzamt v němčině",
  "Kompletní servis v českém jazyce",
  "30+ let zkušeností v příhraničním regionu",
  "Specialistka přímo pro německé daně v týmu",
  "Zastoupení při kontrolách v obou zemích",
  "Spolupráce s německými daňovými poradci",
  "Elektronické podání přes ELSTER",
];

function ServiceDetail({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`service-card p-8 ${
        inView
          ? `animate-float-up delay-${((index % 3) + 1) * 100}`
          : "opacity-0"
      }`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 border border-cyan/20 bg-cyan/8">
          <service.icon size={24} className="text-cyan" />
        </div>
        <span
          className="text-text-muted"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
          }}
        >
          {service.code}
        </span>
      </div>

      <h3
        className="text-white text-xl font-semibold mb-3"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {service.titleDisplay}
      </h3>

      <p className="text-text-secondary text-sm leading-relaxed mb-6">
        {service.desc}
      </p>

      <ul className="space-y-2.5">
        {service.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-text-muted text-sm"
          >
            <CheckCircle2
              size={14}
              className="text-cyan/60 mt-0.5 flex-shrink-0"
            />
            {f}
          </li>
        ))}
      </ul>
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

export default function NemeckeDanePage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            NĚMECKÉ DANĚ // SPECIALIZACE CZ/DE
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-cyan">Německé daně</span>
            <br />
            bez starostí
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Pracujete v Německu? Máte firmu v Německu se zaměstnanci v ČR?
            Pomůžeme vám s kompletní správou německých daňových povinností. Vše
            z jednoho místa v Chebu — v češtině, s přímou komunikací s Finanzamt
            v němčině.
          </p>

          {/* Key stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-cyan/10 max-w-3xl">
            {stats.map((s) => (
              <div key={s.label} className="bg-void px-5 py-5 text-center">
                <div
                  className="text-cyan text-xl sm:text-2xl font-bold"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-text-muted mt-1"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why us panel */}
        <FadeInSection className="mb-20">
          <div className="hud-panel p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-6">
              <Globe size={20} className="text-cyan" />
              <span
                className="text-cyan"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Proc SCH-EKONOM pro nemecke dane
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {advantages.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-status-green mt-0.5 flex-shrink-0"
                  />
                  <span className="text-text-secondary text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Service cards */}
        <FadeInSection className="mb-4">
          <div className="section-tag mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            SLUŽBY // 5 SPECIALIZACÍ
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((s, i) => (
            <ServiceDetail key={s.code} service={s} index={i} />
          ))}
        </div>

        {/* Contact person */}
        <FadeInSection className="mb-24">
          <div className="section-tag mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            KONTAKT // VÁŠ ČLOVĚK PRO DE DANĚ
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Specialist card */}
            <div className="glass-panel p-8 group hover:border-gold/20 transition-all">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-full border border-gold/20 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-gold text-xl font-bold"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    KP
                  </span>
                </div>
                <div>
                  <h3
                    className="text-white text-xl font-semibold"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Klára Pechrová
                  </h3>
                  <p className="text-text-muted text-sm mt-0.5">
                    Specialistka na německé daně
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="hud-chip" data-tone="gold">
                      Steuererklärung
                    </span>
                    <span className="hud-chip" data-tone="gold">
                      Freistellung
                    </span>
                    <span className="hud-chip" data-tone="gold">
                      Kindergeld
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Klára se specializuje na kompletní správu německých daňových
                povinností pro české klienty. Komunikuje plynně v němčině přímo
                s Finanzamt a zajistí, že vaše přiznání bude optimálně
                zpracováno.
              </p>
            </div>

            {/* Contact details */}
            <div className="glass-panel p-8">
              <h3
                className="text-white text-lg font-semibold mb-6"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Kontaktní údaje — německé daně
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 border border-cyan/15 bg-cyan/5">
                    <Phone size={16} className="text-cyan" />
                  </div>
                  <div>
                    <div
                      className="text-text-muted mb-0.5"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Telefon CZ
                    </div>
                    <a
                      href="tel:+420351011820"
                      className="text-white text-sm hover:text-cyan transition-colors"
                    >
                      +420 351 011 820
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 border border-cyan/15 bg-cyan/5">
                    <Flag size={16} className="text-cyan" />
                  </div>
                  <div>
                    <div
                      className="text-text-muted mb-0.5"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Telefon DE
                    </div>
                    <a
                      href="tel:+499632923121​5"
                      className="text-white text-sm hover:text-cyan transition-colors"
                    >
                      +49 9632 92312 15
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 border border-cyan/15 bg-cyan/5">
                    <Mail size={16} className="text-cyan" />
                  </div>
                  <div>
                    <div
                      className="text-text-muted mb-0.5"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      E-mail
                    </div>
                    <a
                      href="mailto:nemecko@schekonom.cz"
                      className="text-white text-sm hover:text-cyan transition-colors"
                    >
                      nemecko@schekonom.cz
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 border border-cyan/15 bg-cyan/5">
                    <MapPin size={16} className="text-cyan" />
                  </div>
                  <div>
                    <div
                      className="text-text-muted mb-0.5"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Kancelar
                    </div>
                    <span className="text-white text-sm">
                      Chebana, Obrněné brigády 553/31, Cheb
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* FAQ section */}
        <FadeInSection className="mb-24">
          <div className="section-tag mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            FAQ // ČASTÉ DOTAZY
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Časté <span className="text-cyan">dotazy</span>
          </h2>

          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "Kdo si může nechat zpracovat německé daňové přiznání?",
                a: "Každý, kdo v daném roce pobíral příjmy z Německa — ať už jako zaměstnanec, pendler nebo OSVČ. Zpracováváme přiznání pro české rezidenty i pro osoby s daňovou povinností v obou zemích.",
              },
              {
                q: "Jak dlouho trvá zpracování Steuererklärung?",
                a: "Standardně 2-4 týdny od dodání kompletních podkladů. Urgentní zpracování je možné po dohodě. Vrácení přeplatku od Finanzamt pak trvá zpravidla další 4-8 týdnů.",
              },
              {
                q: "Kolik stojí zpracování německého daňového přiznání?",
                a: "Cena závisí na složitosti případu. Standardní přiznání pro zaměstnance začíná od 3 500 Kč. Přesnou cenu vám sdělíme po úvodní konzultaci zdarma.",
              },
              {
                q: "Co je Freistellung a potřebuji ji?",
                a: "Freistellung je osvobození od srážkové daně v Německu na základě smlouvy o zamezení dvojího zdanění. Potřebujete ji, pokud máte příjmy z Německa (dividendy, licence, služby) a chcete zabránit dvojímu zdanění.",
              },
              {
                q: "Mám nárok na Kindergeld?",
                a: "Nárok na německý Kindergeld (přídavky na děti) mají zpravidla osoby, které pracují v Německu a platí tam sociální pojištění, i když bydlí v ČR. Posoudíme váš konkrétní případ zdarma.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="glass-panel p-6 hover:border-cyan/20 transition-all"
              >
                <div className="flex items-start gap-3">
                  <MessageSquare
                    size={16}
                    className="text-cyan mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4
                      className="text-white font-semibold mb-2"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {item.q}
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Globe size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Pracujete v Německu?
              </h3>
              <p className="text-text-secondary mb-8 max-w-md leading-relaxed">
                Rádi vám pomůžeme s daňovým přiznáním, Freistellung nebo
                Kindergeld. Úvodní konzultace je zdarma a nezávazná.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn-primary">
                  Nezávazná konzultace
                  <ArrowRight size={16} />
                </Link>
                <a href="tel:+420351011820" className="btn-ghost">
                  <Phone size={16} />
                  +420 351 011 820
                </a>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
