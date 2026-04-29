"use client";

import { useState } from "react";
import { Mail, MessageSquare, PlayCircle, Send } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const contactInfo = [
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
  "Partnerství / integrace",
  "Něco jiného",
];

export default function ContactSection() {
  const { ref, inView } = useInView(0.1);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    inquiry: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Děkujeme. Ozveme se vám do 24 hodin v pracovních dnech.");
  };

  return (
    <section
      id="kontakt"
      className="py-28 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-16 ${inView ? "animate-float-up" : "opacity-0"}`}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            KONTAKT // SPOJENÍ
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Pojďme to <span className="text-cyan">rozjet</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-xl">
            Vyzkoušejte demo bez registrace, nebo nám napište. Odpovídáme do 24
            hodin v pracovních dnech.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info — left side */}
          <div
            className={`lg:col-span-2 ${inView ? "animate-float-up delay-100" : "opacity-0"}`}
          >
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => {
                const Wrapper = item.href ? "a" : "div";
                const wrapperProps = item.href
                  ? {
                      href: item.href,
                      target: item.href.startsWith("http")
                        ? ("_blank" as const)
                        : undefined,
                      rel: item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined,
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

          {/* Contact form — right side */}
          <div
            className={`lg:col-span-3 ${inView ? "animate-float-up delay-300" : "opacity-0"}`}
          >
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
      </div>
    </section>
  );
}
