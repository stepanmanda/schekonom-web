import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const footerLinks = {
  sluzby: [
    { label: "Daňové poradenství", href: "/danove-poradenstvi" },
    { label: "Účetnictví", href: "/ucetnictvi" },
    { label: "Mzdové účetnictví", href: "/mzdove-ucetnictvi" },
    { label: "Německé daně", href: "/nemecke-dane" },
    { label: "Přeshraniční CZ/DE", href: "/preshranicni-poradenstvi" },
    { label: "Certifikační autorita", href: "/certifikacni-autorita" },
  ],
  informace: [
    { label: "O společnosti", href: "/o-nas" },
    { label: "Reference", href: "/reference" },
    { label: "Aktuality", href: "/aktuality" },
    { label: "Volná místa", href: "/volna-mista" },
    { label: "Kontakt", href: "/kontakt" },
    {
      label: "Rezervace termínu",
      href: "https://schekonom.reenio.cz/cs/#/terms",
      external: true,
    },
  ] as { label: string; href: string; external?: boolean }[],
  dokumenty: [
    { label: "Ochrana osobních údajů", href: "#" },
    { label: "Obchodní podmínky", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "Datové úložiště SCH-EKONOM", href: "#", external: true },
    { label: "DocuWare", href: "#", external: true },
    { label: "TeamViewer", href: "#", external: true },
  ] as { label: string; href: string; external?: boolean }[],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/schekonom",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sch.ekonom/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sch-ekonom-s-r-o-/about/",
  },
];

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
              Důvěryhodný partner pro daňové poradenství, účetnictví a mzdovou
              agendu. Více než 30 let zkušeností v regionu Cheb a přeshraničním
              prostoru CZ/DE.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-start gap-3 text-text-secondary text-sm">
                <MapPin size={14} className="text-cyan flex-shrink-0 mt-0.5" />
                <span>
                  Chebana, Obrněné brigády 553/31
                  <br />
                  350 02 Cheb
                </span>
              </div>
              <div className="flex items-start gap-3 text-text-secondary text-sm">
                <MapPin size={14} className="text-cyan flex-shrink-0 mt-0.5" />
                <span>
                  Kolektiv Hub, Kopeckého sady 329/8
                  <br />
                  301 00 Plzeň
                </span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <Phone size={14} className="text-cyan flex-shrink-0" />
                <a
                  href="tel:+420354433005"
                  className="hover:text-white transition-colors"
                >
                  +420 354 433 005
                </a>
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <Mail size={14} className="text-cyan flex-shrink-0" />
                <a
                  href="mailto:mail@schekonom.cz"
                  className="hover:text-white transition-colors"
                >
                  mail@schekonom.cz
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-cyan/10 hover:border-cyan/25 bg-cyan/[0.03] hover:bg-cyan/[0.06] transition-all text-text-muted hover:text-text-secondary"
                >
                  <ExternalLink size={10} />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
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

          {/* Služby */}
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
              Služby
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.sluzby.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="nav-link text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informace */}
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
              Informace
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.informace.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link text-xs inline-flex items-center gap-1"
                    >
                      {link.label} <ExternalLink size={9} />
                    </a>
                  ) : (
                    <Link href={link.href} className="nav-link text-xs">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Dokumenty */}
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
              Dokumenty
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.dokumenty.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link text-xs inline-flex items-center gap-1"
                    >
                      {link.label} <ExternalLink size={9} />
                    </a>
                  ) : (
                    <Link href={link.href} className="nav-link text-xs">
                      {link.label}
                    </Link>
                  )}
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
            &copy; 2026 SCH-EKONOM s.r.o. | IČO: 64832694 | DIČ: CZ64832694 |
            Zapsáno v OR vedeném KS v Plzni, sp. zn. C 7431
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
