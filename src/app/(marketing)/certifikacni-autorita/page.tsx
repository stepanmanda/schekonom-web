import {
  Shield,
  Key,
  FileCheck,
  RefreshCw,
  Lock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifikační autorita — SCH-EKONOM",
  description:
    "Vydávání a správa kvalifikovaných certifikátů pro elektronické podpisy. eIDAS, SSL/TLS.",
};

const services = [
  {
    icon: Key,
    title: "Kvalifikované certifikáty",
    desc: "Vydávání kvalifikovaných certifikátů pro elektronické podpisy v souladu s nařízením eIDAS.",
  },
  {
    icon: FileCheck,
    title: "Elektronické podpisy",
    desc: "Zaručené a kvalifikované elektronické podpisy pro komunikaci s úřady a obchodními partnery.",
  },
  {
    icon: Lock,
    title: "SSL/TLS certifikáty",
    desc: "Certifikáty pro zabezpečení webových stránek a šifrovanou komunikaci.",
  },
  {
    icon: RefreshCw,
    title: "Správa a obnova",
    desc: "Kompletní správa životního cyklu certifikátů — vydání, obnova, revokace.",
  },
];

const faq = [
  {
    q: "Na základě čeho mohu získat digitální certifikát?",
    a: "Digitální certifikát získáte na základě ověření vaší totožnosti. Pro fyzické osoby stačí platný občanský průkaz nebo pas, pro právnické osoby je navíc potřeba výpis z obchodního rejstříku.",
  },
  {
    q: "K čemu kvalifikovaný certifikát slouží?",
    a: "Kvalifikovaný certifikát slouží k vytváření zaručených elektronických podpisů — pro komunikaci s finančním úřadem, ČSSZ, soudy, datovými schránkami a dalšími institucemi.",
  },
  {
    q: "Jak dlouho trvá vydání certifikátu?",
    a: "Vydání certifikátu je možné obvykle do 1–2 pracovních dnů od ověření totožnosti a předložení potřebných dokumentů.",
  },
  {
    q: "Jaká je platnost certifikátu?",
    a: "Kvalifikované certifikáty mají platnost obvykle 1 rok. Před vypršením vás upozorníme a zajistíme bezproblémovou obnovu.",
  },
];

export default function CertifikacniAutoritaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(0,229,255,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            CERTIFIKAČNÍ AUTORITA
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Digitální <span className="text-cyan">certifikáty</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl leading-relaxed">
            SCH-EKONOM jako certifikační autorita vydává kvalifikované
            certifikáty pro elektronické podpisy v souladu s evropským nařízením
            eIDAS. Zabezpečte svou digitální komunikaci.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="glass-panel p-6 group hover:border-cyan/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center border border-cyan/20 bg-cyan/5 flex-shrink-0">
                    <s.icon size={24} className="text-cyan" />
                  </div>
                  <div>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* eIDAS info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hud-panel p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={24} className="text-cyan" />
              <h2
                className="text-xl font-bold text-white"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Nařízení eIDAS
              </h2>
            </div>
            <p className="text-text-secondary leading-relaxed max-w-3xl">
              Nařízení Evropského parlamentu a Rady (EU) č. 910/2014 (eIDAS)
              stanovuje právní rámec pro elektronické podpisy, elektronické
              pečetě, časová razítka a další služby vytvářející důvěru v
              elektronické transakce na vnitřním trhu EU. Kvalifikované
              certifikáty vydané v souladu s eIDAS mají právní účinky rovnocenné
              vlastnoručnímu podpisu ve všech členských státech EU.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2
            className="text-2xl font-bold text-white mb-8 text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Časté dotazy
          </h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <div
                key={item.q}
                className="border border-cyan/10 bg-white/2 p-6"
              >
                <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="glass-panel p-10">
            <h2
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Potřebujete certifikát?
            </h2>
            <p className="text-text-secondary mb-6">
              Kontaktujte nás a domluvíme termín vydání certifikátu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+420354433005" className="btn-primary">
                <ArrowRight size={14} /> +420 354 433 005
              </a>
              <a href="mailto:mail@schekonom.cz" className="btn-ghost">
                mail@schekonom.cz
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
