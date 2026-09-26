"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { Menu, X, LogIn, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";

const moduleLinks = [
  { label: "Účetní reporting", href: "/modul-ucetnictvi" },
  { label: "Mzdy + ČSSZ + ZP", href: "/modul-mzdy" },
  { label: "Daně + DPH", href: "/modul-dane" },
  { label: "CZ/DE + ELSTER", href: "/modul-cz-de" },
];

const navItems = [
  { label: "Funkce", href: "/funkce", children: moduleLinks },
  { label: "Pilot", href: "/pilot" },
  { label: "Časté dotazy", href: "/caste-dotazy" },
  { label: "O EkonomOS", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
        <nav className="hidden xl:flex items-center gap-7">
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

        {/* Right side, Portal link + CTA */}
        <div className="hidden xl:flex items-center gap-4">
          <ThemeToggle compact />
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

          <Link href="/kontakt" className="btn-primary">
            Domluvit demo
          </Link>
        </div>

        {/* Hamburger button */}
        <button
          className="xl:hidden text-text-secondary hover:text-white transition-colors p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden z-50 absolute left-0 right-0 top-full glass-panel-dark border-t border-cyan/10 max-h-[calc(100dvh-5rem)] overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-6 py-2 flex flex-col gap-3" aria-label="Mobile menu">
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
            <div className="py-2 border-t border-cyan/10 flex flex-col gap-3">
              <ThemeToggle />
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
                href="/kontakt"
                className="btn-primary text-center justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Domluvit demo
              </Link>
            </div>
          </nav>
        </div>
      )}

    </header>
  );
}
