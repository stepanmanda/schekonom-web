import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "EkonomOS — Klientský portál nové generace";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#03080D",
          backgroundImage:
            "radial-gradient(ellipse 60% 80% at 25% 30%, rgba(0,229,255,0.18) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(212,175,55,0.10) 0%, transparent 55%)",
          padding: "80px",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          justifyContent: "space-between",
        }}
      >
        {/* Top: logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              border: "2px solid #00E5FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00E5FF",
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "2px",
            }}
          >
            OS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              EkonomOS
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "rgba(0,229,255,0.7)",
                letterSpacing: "3px",
                marginTop: "2px",
                display: "flex",
              }}
            >
              KLIENTSKÝ PORTÁL
            </div>
          </div>
        </div>

        {/* Middle: claim */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              color: "rgba(212,175,55,0.95)",
              letterSpacing: "4px",
              fontWeight: 600,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            PILOT FAZE — HLEDAME PARTNERY
          </div>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#FFFFFF",
              maxWidth: "1000px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Klient vidi svoje papiry, ukoly, terminy. Vy usetrite hodiny.
          </div>
        </div>

        {/* Bottom: tagline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: "30px",
            borderTop: "1px solid rgba(0,229,255,0.15)",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              color: "rgba(184,193,200,0.85)",
              maxWidth: "800px",
              display: "flex",
            }}
          >
            Komplet pro ucetni firmy: web, klientsky portal a admin aplikace s AI hlidanim rizik.
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "rgba(0,229,255,0.6)",
              letterSpacing: "2px",
              display: "flex",
            }}
          >
            EKONOMOS.VELYOS.CZ
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
