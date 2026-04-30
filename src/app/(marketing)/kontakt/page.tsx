"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  PlayCircle,
  MessageSquare,
  Send,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { submitContactForm, getMailtoLink } from "@/lib/form-submit";

const contactBlocks = [
  {
    icon: PlayCircle,
    label: "Demo přístup",
    value: "3 demo profily, žádná registrace",
    actionLabel: "Otevřít demo",
    href: "/prihlaseni",
  },
  {
    icon: Mail,
    label: "Obchodní kontakt",
    value: "info@ekonomos.cz",
    actionLabel: "Napsat",
    href: "mailto:info@ekonomos.cz",
  },
  {
    icon: MessageSquare,
    label: "Studio za produktem",
    value: "VELYOS · B2B AI agenti",
    actionLabel: null,
    href: null,
  },
];

const inquiryOptions = [
  "Chci si vyzkoušet demo",
  "Mám zájem o cenovou nabídku",
  "Chci nasadit EkonomOS u nás v kanceláři",
  "Komplet servis (web + portál + aplikace)",
  "Partnerství / integrace",
  "Něco jiného",
];

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

export default function KontaktPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    inquiry: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("sending");
    const result = await submitContactForm(formState);
    if (result.ok && result.mode === "endpoint") {
      setSubmitState("success");
      setFormState({ name: "", email: "", company: "", inquiry: "", message: "" });
    } else if (result.mode === "mailto") {
      setSubmitState("idle");
    } else {
      setSubmitState("error");
    }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-16 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            KONTAKT // SPOJENÍ
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Pojďme to <span className="text-cyan">rozjet</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Vyzkoušejte si demo bez registrace, nebo nám napište. Odpovídáme do
            24 hodin v pracovních dnech. Nasazení EkonomOS u vás v kanceláři
            zvládneme za 4–6 týdnů.
          </p>
        </div>

        {/* Komplet servis info */}
        <FadeInSection className="mb-16">
          <div className="hud-panel p-8 flex items-start gap-5">
            <div className="p-3 border border-gold/30 bg-gold/5 flex-shrink-0">
              <Layers size={22} className="text-gold" />
            </div>
            <div>
              <h2
                className="text-white text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Co dostanete v rámci nasazení
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                Veřejný web na vaší doméně s vaším brandem, klientský portál
                pod ním a administrátorskou aplikaci EkonomOS pro vaše
                zaměstnance. Postavíme, nasadíme, hostujeme, aktualizujeme.
                Vás zatěžovat nebudeme — vyžádáme si jen logo, barvy a obsah.
              </p>
            </div>
          </div>
        </FadeInSection>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              {contactBlocks.map((item) => {
                const Wrapper = item.href ? "a" : "div";
                const wrapperProps = item.href
                  ? {
                      href: item.href,
                    }
                  : {};

                return (
                  <Wrapper
                    key={item.label}
                    {...wrapperProps}
                    className="glass-panel p-4 flex items-start gap-4 group hover:border-cyan/25 transition-all"
                  >
                    <div className="p-2 border border-cyan/15 bg-cyan/5 flex-shrink-0">
                      <item.icon
                        size={16}
                        className="text-cyan group-hover:text-white transition-colors"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-text-muted mb-1"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.58rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </div>
                      <div className="text-white text-sm leading-relaxed">
                        {item.value}
                      </div>
                      {item.actionLabel && (
                        <div
                          className="text-cyan mt-2"
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.actionLabel} →
                        </div>
                      )}
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="hud-panel p-8 rounded-sm space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-text-muted mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Jméno *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="hud-input"
                    placeholder="Vaše jméno"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-text-muted mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="hud-input"
                    placeholder="vy@firma.cz"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-text-muted mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Firma
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="hud-input"
                    placeholder="Název kanceláře"
                  />
                </div>
                <div>
                  <label
                    htmlFor="inquiry"
                    className="block text-text-muted mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Co potřebujete
                  </label>
                  <select
                    id="inquiry"
                    name="inquiry"
                    value={formState.inquiry}
                    onChange={handleChange}
                    className="hud-input"
                  >
                    <option value="">Vyberte...</option>
                    {inquiryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-text-muted mb-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Zpráva *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="hud-input resize-none"
                  placeholder="Krátce, co byste chtěli zjistit..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center"
              >
                <Send size={16} />
                Odeslat
              </button>

              <p
                className="text-text-muted text-center"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                }}
              >
                Odesláním souhlasíte se zpracováním osobních údajů dle GDPR.
              </p>
            </form>
          </div>
        </div>

        {/* Demo CTA */}
        <FadeInSection className="mt-20">
          <div className="text-center">
            <p className="text-text-secondary text-lg mb-6">
              Nebo si nejdřív prohlédněte demo:
            </p>
            <Link href="/prihlaseni" className="btn-ghost">
              <PlayCircle size={16} />
              Otevřít demo bez registrace
            </Link>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
