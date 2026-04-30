import { ImageResponse } from "next/og";

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
          background:
            "radial-gradient(ellipse 60% 80% at 25% 30%, rgba(0,229,255,0.18) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(212,175,55,0.10) 0%, transparent 55%), #03080D",
          padding: "80px",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Top: logo + label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 70%)",
              border: "2px solid rgba(0,229,255,0.7)",
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
                letterSpacing: "0.5px",
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
              fontSize: "28px",
              color: "rgba(212,175,55,0.95)",
              letterSpacing: "4px",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            ◉ Pilot fáze — hledáme partnery
          </div>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#FFFFFF",
              maxWidth: "1000px",
            }}
          >
            Klient vidí svoje{" "}
            <span style={{ color: "#00E5FF" }}>papíry, úkoly, termíny</span>.
          </div>
          <div
            style={{
              fontSize: "44px",
              fontWeight: 700,
              color: "rgba(212,175,55,0.95)",
            }}
          >
            Vy ušetříte hodiny.
          </div>
        </div>

        {/* Bottom: tagline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "auto",
            paddingTop: "40px",
            borderTop: "1px solid rgba(0,229,255,0.15)",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              color: "rgba(184,193,200,0.85)",
              maxWidth: "800px",
            }}
          >
            Komplet pro účetní firmy: web, klientský portál a admin aplikace s AI hlídáním rizik.
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "rgba(0,229,255,0.6)",
              letterSpacing: "2px",
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
