"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { Menu, X, LogIn, ChevronDown } from "lucide-react";

const serviceLinks = [
  { label: "Účetnictví", href: "/ucetnictvi" },
  { label: "Daňové poradenství", href: "/danove-poradenstvi" },
  { label: "Mzdové účetnictví", href: "/mzdove-ucetnictvi" },
  { label: "Německé daně", href: "/nemecke-dane" },
  { label: "Přeshraniční CZ/DE", href: "/preshranicni-poradenstvi" },
  { label: "Certifikační autorita", href: "/certifikacni-autorita" },
];

const navItems = [
  { label: "Služby", href: "/sluzby", children: serviceLinks },
  { label: "Kdo jsme", href: "/o-nas" },
  { label: "Reference", href: "/reference" },
  { label: "Aktuality", href: "/aktuality" },
  { label: "Volná místa", href: "/volna-mista" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-panel-dark shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo size={40} showText />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="nav-link flex items-center gap-1"
                >
                  {item.label}
                  <ChevronDown
                    size={12}
                    className="opacity-50 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
                <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="glass-panel-dark p-2 min-w-[220px] border border-cyan/15 shadow-xl shadow-black/40">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-text-secondary hover:text-white hover:bg-cyan/5 transition-colors"
                        style={{
                          fontFamily: "var(--font-space-grotesk)",
                          fontSize: "0.78rem",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Right side — Portal link + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Portal link */}
          <Link
            href="/prihlaseni"
            className="flex items-center gap-2 px-3 py-1.5 border border-cyan/15 bg-cyan/[0.03] hover:border-cyan/30 hover:bg-cyan/[0.06] transition-all rounded-sm"
          >
            <LogIn size={13} className="text-cyan/60" />
            <span
              className="text-text-muted hover:text-text-secondary transition-colors"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Portál
            </span>
          </Link>

          <Link href="/#kontakt" className="btn-primary">
            Kontaktovat
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-text-secondary hover:text-white transition-colors p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden glass-panel-dark border-t border-cyan/10">
          <nav className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-lg"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-cyan/10 flex flex-col gap-4">
              <Link
                href="/prihlaseni"
                className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <LogIn size={14} className="text-cyan/60" />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Klientský portál
                </span>
              </Link>
              <Link
                href="/#kontakt"
                className="btn-primary text-center justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Kontaktovat
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
