import Image from "next/image";

interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({ size = 48, showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/brand/logo.png"
        alt="ekonomOS"
        width={size}
        height={size}
        className="flex-shrink-0 object-contain"
        priority={size >= 40}
      />
      {showText && (
        <div className="flex flex-col">
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--ink)",
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            ekonomOS
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.55rem",
              letterSpacing: "0.12em",
              color: "var(--accent-strong)",
              marginTop: 2,
            }}
          >
            OPERAČNÍ SYSTÉM
          </span>
        </div>
      )}
    </div>
  );
}
