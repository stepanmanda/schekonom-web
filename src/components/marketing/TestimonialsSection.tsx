"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Target, Users } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const reasons = [
  {
    icon: Sparkles,
    title: "Rutina ujídá čas, který není na klienty",
    body: "Účetní v ČR tráví desítky procent dne přepisováním, párováním a hledáním. Postavili jsme nástroj, který tyhle úkony převezme — abyste se mohli vrátit k tomu, za co vám klienti reálně platí.",
  },
  {
    icon: Target,
    title: "Klient odchází tiše, výpověď jen potvrdí",
    body: "Když klient přestane komunikovat, je to signál — ale v 50 e-mailech denně vám utopí. EkonomOS sleduje vzorce klientovy komunikace a upozorní vás dřív, než vám dojde notifikace o ukončení smlouvy.",
  },
  {
    icon: Users,
    title: "Klient chce vidět, co se děje s jeho daty",
    body: "Typický klient vás obtěžuje stejnými dotazy, protože nevidí stav. Klientský portál EkonomOS mu dá přehled bez vašeho zásahu — a vy získáte čas zpátky.",
  },
];

export default function TestimonialsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="proc"
      className="py-28 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`mb-16 text-center ${inView ? "animate-float-up" : "opacity-0"}`}
        >
          <div className="section-tag justify-center mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            PROČ TO STAVÍME
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Tři bolesti, které <span className="text-gold">slyšíme stále dokola</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            EkonomOS vznikl z rozhovorů s českými účetními firmami a vlastní
            zkušenosti při budování AI agentů pro B2B služby. Tohle nejsou
            citace zákazníků — produkt je v pilotní fázi. Jsou to tři problémy,
            které slyšíme v každém rozhovoru, a hypotézy, jak je řešit.
          </p>
        </div>

        {/* Reason cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`glass-panel p-8 flex flex-col relative group hover:border-gold/25 transition-all duration-300 ${
                inView ? `animate-float-up delay-${(i + 1) * 200}` : "opacity-0"
              }`}
            >
              <div className="inline-flex p-3 border border-gold/20 bg-gold/5 mb-5 w-fit">
                <r.icon size={22} className="text-gold" />
              </div>

              <h3
                className="text-white text-lg font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {r.title}
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed flex-1">
                {r.body}
              </p>
            </div>
          ))}
        </div>

        {/* Pilot CTA */}
        <div
          className={`text-center ${inView ? "animate-float-up delay-800" : "opacity-0"}`}
        >
          <p className="text-text-secondary text-lg mb-6">
            Pokud vám aspoň jedna z těch bolestí zní povědomě, ozvěte se. Hledáme první partnery, se kterými dopady společně změříme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary">
              Mám zájem o pilot
              <ArrowRight size={16} />
            </Link>
            <Link href="/prihlaseni" className="btn-ghost">
              Otevřít demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
