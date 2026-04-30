import Link from "next/link";
import Logo from "@/components/shared/Logo";

const footerLinks = {
  funkce: [
    { label: "Účetní reporting", href: "/modul-ucetnictvi" },
    { label: "Mzdy + ČSSZ + ZP", href: "/modul-mzdy" },
    { label: "Daně + DPH", href: "/modul-dane" },
    { label: "CZ/DE + ELSTER", href: "/modul-cz-de" },
    { label: "Všechny funkce", href: "/funkce" },
  ],
  produkt: [
    { label: "Pilot fáze", href: "/pilot" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Časté dotazy", href: "/caste-dotazy" },
    { label: "O EkonomOS", href: "/o-nas" },
    { label: "Zabezpečení dat", href: "/zabezpeceni-dat" },
    { label: "Kontakt", href: "/kontakt" },
    { label: "Vyzkoušet demo", href: "/prihlaseni" },
  ],
  pravni: [
    { label: "Ochrana osobních údajů", href: "/soukromi" },
    { label: "Obchodní podmínky", href: "/podminky" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-cyan/10 bg-void-deep">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo size={36} showText />
            <p className="mt-4 text-text-muted text-sm leading-relaxed max-w-sm">
              Klientský portál pro účetní firmy a jejich klienty. Termíny,
              dokumenty, schválení a AI hlídání rizik na jednom místě.
            </p>
            <a
              href="https://velyos.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 border border-cyan/15 bg-cyan/[0.03] hover:border-cyan/40 hover:bg-cyan/[0.06] transition-all"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              <span className="text-text-muted">Vývoj:</span>
              <span className="text-cyan">Studio VELYOS</span>
            </a>
          </div>

          {/* Funkce */}
          <div>
            <h4
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Funkce
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.funkce.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="nav-link text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Produkt */}
          <div>
            <h4
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Produkt
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.produkt.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="nav-link text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Právní */}
          <div>
            <h4
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Právní
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.pravni.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="nav-link text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cyan/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-text-muted text-center sm:text-left"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
            }}
          >
            &copy; 2026 EkonomOS &middot; Produkt{" "}
            <a
              href="https://velyos.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              Studia VELYOS
            </a>
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse-dot" />
            <span
              className="text-text-muted"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
              }}
            >
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
