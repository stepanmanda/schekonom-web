"use client";

import { Quote, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    quote:
      "SCH-EKONOM nám ušetřil stovky hodin ročně automatizací účetních procesů. Přeshraniční operace s Bavorskem zvládají jako jediní v regionu bezchybně.",
    author: "Tomáš Nový",
    role: "Jednatel, TN Holz s.r.o.",
    region: "Cheb — Bavorsko",
  },
  {
    quote:
      "Profesionalita na úrovni velkých pražských kanceláří, ale s osobním přístupem malé rodinné firmy. Vždy dostupní, vždy připravení pomoct.",
    author: "Eva Marková",
    role: "OSVČ, Architektonické studio",
    region: "Cheb, CZ",
  },
  {
    quote:
      "S SCH-EKONOM spolupracujeme přes 10 let. Díky jejich zkušenostem s německými daněmi se naši zaměstnanci nemusí o nic starat.",
    author: "Martin Dvořák",
    role: "CFO, Strojírny Cheb a.s.",
    region: "Cheb, CZ",
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
            REFERENCE // KLIENTI
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Co říkají naši <span className="text-gold">klienti</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
            Stovky firem a živnostníků nám svěřují své finance. Jejich
            spokojenost je naší nejlepší vizitkou.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
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
                  {t.author}
                </div>
                <div className="text-text-muted text-xs mt-0.5">{t.role}</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <MapPin size={10} className="text-cyan/60" />
                  <span
                    className="text-text-muted"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {t.region}
                  </span>
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
            S čím vám můžeme pomoci?
          </p>
          <Link href="#kontakt" className="btn-primary">
            Nezávazná konzultace
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
