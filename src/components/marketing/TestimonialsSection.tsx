"use client";

import { Quote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    quote:
      "Místo toho, abychom honili klienty po e-mailech a Excelu, vidíme všechno na jedné obrazovce. Termíny, chybějící podklady, rizikové platby — najednou.",
    role: "Majitel účetní kanceláře",
    region: "ČR · 12 zaměstnanců",
  },
  {
    quote:
      "Aplikace si všimla, že jeden z našich klientů přestal komunikovat 6 týdnů. Zavolali jsme včas, vyřešili problém, klient zůstal. Bez EkonomOS bychom o něm věděli, až by odešel.",
    role: "Daňová poradkyně",
    region: "ČR · samostatná praxe",
  },
  {
    quote:
      "Klienti se přihlásí, nahrají faktury, schválí mzdy kliknutím. Telefonáty kvůli papírování klesly o 70 %. Můžeme se konečně věnovat poradenství, ne administrativě.",
    role: "Controllingový konzultant",
    region: "ČR · B2B služby",
  },
];

export default function TestimonialsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="reference"
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
            POUŽÍVAJÍ NÁS
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Co říkají <span className="text-gold">účetní firmy</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
            Vybráno z anonymizovaných rozhovorů. Jména a firmy chráníme — bez
            výjimky.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <div
              key={t.role}
              className={`glass-panel p-8 flex flex-col relative group hover:border-gold/25 transition-all duration-300 ${
                inView ? `animate-float-up delay-${(i + 1) * 200}` : "opacity-0"
              }`}
            >
              {/* Quote icon */}
              <Quote size={28} className="text-gold/30 mb-4 flex-shrink-0" />

              {/* Quote text */}
              <p className="text-text-secondary text-sm leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 pt-4 border-t border-cyan/10">
                <div
                  className="text-white font-semibold text-sm"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t.role}
                </div>
                <div
                  className="text-text-muted mt-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  {t.region}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div
          className={`text-center ${inView ? "animate-float-up delay-800" : "opacity-0"}`}
        >
          <p className="text-text-secondary text-lg mb-6">
            Chcete to vidět na vlastní oči?
          </p>
          <Link href="/prihlaseni" className="btn-primary">
            Vyzkoušet demo
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
