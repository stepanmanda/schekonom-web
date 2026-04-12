"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Globe,
  ExternalLink,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const contactInfo = [
  {
    icon: MapPin,
    label: "Hlavní sídlo — Cheb",
    value: "Chebana, Obrněné brigády 553/31\n350 02 Cheb",
    href: "https://maps.google.com/?q=Obrněné+brigády+553/31,+Cheb",
  },
  {
    icon: MapPin,
    label: "Pobočka — Plzeň",
    value: "Kolektiv Hub, Kopeckého sady 329/8\n301 00 Plzeň",
    href: "https://maps.google.com/?q=Kopeckého+sady+329/8,+Plzeň",
  },
  {
    icon: Phone,
    label: "Recepce",
    value: "+420 354 433 005",
    href: "tel:+420354433005",
  },
  {
    icon: Phone,
    label: "Německé daně",
    value: "+420 351 011 820",
    href: "tel:+420351011820",
  },
  {
    icon: Globe,
    label: "Německo",
    value: "+49 9632 92312 15",
    href: "tel:+4996329231215",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "mail@schekonom.cz",
    href: "mailto:mail@schekonom.cz",
  },
  {
    icon: Mail,
    label: "Německé daně e-mail",
    value: "nemecko@schekonom.cz",
    href: "mailto:nemecko@schekonom.cz",
  },
  {
    icon: Clock,
    label: "Úřední hodiny — Hlavní",
    value: "Po\u2013Čt 7:00\u201315:30, Pá 7:00\u201314:00",
    href: null,
  },
  {
    icon: Clock,
    label: "Úřední hodiny — Něm. daně",
    value:
      "Po,Út,Čt 8:00\u201312:00\nSt 8:00\u201312:00 a 13:00\u201317:00\nPá 8:00\u201312:00",
    href: null,
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/schekonom",
    icon: "fb",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sch.ekonom/",
    icon: "ig",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sch-ekonom-s-r-o-/about/",
    icon: "li",
  },
];

const serviceOptions = [
  "Daňové poradenství",
  "Účetnictví",
  "Mzdová agenda",
  "Přeshraniční CZ/DE",
  "Německé daně",
  "Certifikační autorita",
  "AI Finanční analýza",
  "AI Reporting",
  "Jiné",
];

export default function ContactSection() {
  const { ref, inView } = useInView(0.1);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
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
    alert("Děkujeme za zprávu! Ozveme se vám do 24 hodin.");
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
            Pojďme se <span className="text-cyan">spojit</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-xl">
            Nezávazná konzultace zdarma. Odpovídáme do 24 hodin v pracovních
            dnech.
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
                    <div className="min-w-0">
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
                      <div className="text-white text-sm whitespace-pre-line leading-relaxed">
                        {item.value}
                      </div>
                    </div>
                  </Wrapper>
                );
              })}

              {/* Social links */}
              <div className="mt-4">
                <div
                  className="text-text-muted mb-3"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Sledujte nás
                </div>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-panel px-4 py-2.5 flex items-center gap-2 group hover:border-cyan/30 transition-all"
                    >
                      <ExternalLink
                        size={12}
                        className="text-cyan/60 group-hover:text-cyan transition-colors"
                      />
                      <span
                        className="text-text-secondary group-hover:text-white transition-colors"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
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
                    placeholder="Jan Novák"
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
                    placeholder="jan@firma.cz"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-text-muted mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="hud-input"
                    placeholder="+420 ..."
                  />
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="block text-text-muted mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Služba
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="hud-input"
                  >
                    <option value="">Vyberte službu...</option>
                    {serviceOptions.map((opt) => (
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
                  placeholder="Popište váš požadavek..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center"
              >
                <Send size={16} />
                Odeslat zprávu
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
