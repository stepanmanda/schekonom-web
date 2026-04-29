"use client";

interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({ size = 48, showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="animate-glow-logo flex-shrink-0">
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="logoGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,229,255,0.15)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="logoCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#0088CC" />
            </linearGradient>
            <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(212,175,55,0.9)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.5)" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="23" fill="url(#logoGlow)" />
          <circle
            cx="24"
            cy="24"
            r="22"
            stroke="url(#logoCyan)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
          <circle
            cx="24"
            cy="24"
            r="18"
            stroke="url(#logoGold)"
            strokeWidth="0.75"
            fill="none"
            opacity="0.3"
          />
          <text
            x="24"
            y="30"
            textAnchor="middle"
            fill="#00E5FF"
            fontSize="16"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
            letterSpacing="1"
          >
            OS
          </text>
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              lineHeight: 1,
            }}
          >
            SCH-EKONOM
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              color: "rgba(0,229,255,0.6)",
              marginTop: 2,
            }}
          >
            FINANČNÍ SYSTÉM
          </span>
        </div>
      )}
    </div>
  );
}
