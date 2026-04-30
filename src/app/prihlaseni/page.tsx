"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  Building2,
  Cpu,
  KeyRound,
  Lock,
  Phone,
  Shield,
  Sparkles,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { useAuth } from "@/lib/auth/context";
import { demoProfiles, DEMO_MODE } from "@/lib/demo/data";
import { requestDemoCode, verifyDemoCode } from "@/lib/demo/api";
import type { RequestCodeResponse, VerifyCodeResponse } from "@/lib/demo/api";
import type { DemoProfile } from "@/lib/demo/types";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

function InfoTile({
  title,
  value,
  sub,
  icon: Icon,
}: {
  title: string;
  value: string;
  sub: string;
  icon: LucideIcon;
}) {
  return (
    <div className="hud-mini-metric" data-tone="slate">
      <div className="mb-3 flex items-center gap-2">
        <Icon size={14} color="rgba(0,229,255,0.72)" />
        <span style={labelStyle}>{title}</span>
      </div>
      <div style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: 6 }}>
        {value}
      </div>
      <div style={{ color: "#7A8A9E", lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const defaultProfile = demoProfiles[0];
  const [activeProfileId, setActiveProfileId] = useState(defaultProfile.id);
  const [surname, setSurname] = useState(defaultProfile.surname);
  const [phone, setPhone] = useState(defaultProfile.phone);
  const [code, setCode] = useState("");
  const [challenge, setChallenge] = useState<RequestCodeResponse | null>(null);
  const [loadingStage, setLoadingStage] = useState<"request" | "verify" | null>(
    null,
  );
  const [error, setError] = useState("");

  const activeProfile =
    demoProfiles.find((p) => p.id === activeProfileId) ?? defaultProfile;

  const pickProfile = (profile: DemoProfile) => {
    setActiveProfileId(profile.id);
    setSurname(profile.surname);
    setPhone(profile.phone);
    setCode("");
    setChallenge(null);
    setError("");
  };

  const handleRequestCode = async (event: FormEvent) => {
    event.preventDefault();
    setLoadingStage("request");
    setError("");

    try {
      const response = await requestDemoCode(surname, phone);
      setChallenge(response);
      setCode(response.relayCode ?? "");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Nepodařilo se vytvořit ověřovací výzvu.",
      );
    } finally {
      setLoadingStage(null);
    }
  };

  const handleVerifyCode = async (event: FormEvent) => {
    event.preventDefault();
    if (!challenge) return;
    setLoadingStage("verify");
    setError("");

    try {
      const session: VerifyCodeResponse = await verifyDemoCode(
        challenge.challengeId,
        code,
      );
      login(session);
      router.push("/portal");
    } catch (verifyError) {
      setError(
        verifyError instanceof Error
          ? verifyError.message
          : "Nepodařilo se otevřít pracovní plochu.",
      );
    } finally {
      setLoadingStage(null);
    }
  };

  // Express login — jeden klik bez OTP. Pro pilot demo není OTP potřeba.
  const handleExpressLogin = async (profile: DemoProfile) => {
    setActiveProfileId(profile.id);
    setSurname(profile.surname);
    setPhone(profile.phone);
    setError("");
    setLoadingStage("request");
    try {
      const challengeResponse = await requestDemoCode(
        profile.surname,
        profile.phone,
      );
      const session: VerifyCodeResponse = await verifyDemoCode(
        challengeResponse.challengeId,
        challengeResponse.relayCode ?? profile.demoCode,
      );
      login(session);
      router.push("/portal");
    } catch (expressError) {
      setError(
        expressError instanceof Error
          ? expressError.message
          : "Nepodařilo se otevřít demo. Zkuste to znovu.",
      );
      setLoadingStage(null);
    }
  };

  const demoFlow = [
    "Vyberte demo profil podle role.",
    "Po odeslání jde OTP na telefon majitele, ne na číslo uživatele.",
    "Po ověření se otevře pracovní plocha přesně podle role.",
    "Každý profil vidí jen své klienty, termíny a výjimky.",
  ];

  const apiHandshake = [
    "POST /api/demo/auth/request-code",
    "POST /api/demo/auth/verify-code",
    "GET /api/dashboard",
    "GET /api/clients/:id",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(0,229,255,0.08), transparent 32%), linear-gradient(180deg, #02060A 0%, #03080D 45%, #091724 100%)",
      }}
    >
      <div className="mx-auto w-full px-6 py-8" style={{ maxWidth: 1480 }}>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="hud-chip" data-tone="cyan">
                DEMO REŽIM
              </span>
              <span className="hud-chip" data-tone="gold">
                OTP přes telefon
              </span>
              <span className="hud-chip" data-tone="green">
                Pilot fáze
              </span>
            </div>
            <Link
              href="/"
              aria-label="Zpět na hlavní stránku"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <Logo size={52} showText={true} />
            </Link>
          </div>

          <div className="hud-panel flex max-w-xl flex-wrap items-center gap-3 px-4 py-4">
            <div
              className="flex h-10 w-10 items-center justify-center"
              style={{
                border: "1px solid rgba(0,229,255,0.2)",
                background: "rgba(0,229,255,0.06)",
              }}
            >
              <Shield size={18} color="#00E5FF" />
            </div>
            <div>
              <div style={labelStyle}>EKONOMOS CONTROL CENTER</div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              >
                Jeden klient, tři role, jedna inteligentní operační vrstva.
              </div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-6 xl:grid-cols-12">
          {/* Left column */}
          <div className="xl:col-span-7">
            {/* Profile selector panel */}
            <div className="hud-panel mb-6 p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="hud-chip" data-tone="cyan">
                  CONTROLLED ACCESS
                </span>
                <span className="hud-chip" data-tone="slate">
                  3 demo profily
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "clamp(2.4rem, 4vw, 4.6rem)",
                  lineHeight: 1.02,
                  color: "#FFFFFF",
                  marginBottom: 16,
                }}
              >
                Vstup do
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #00E5FF 0%, rgba(212,175,55,0.92) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  EkonomOS Control Center
                </span>
              </h1>

              <p
                style={{
                  color: "#B8C1C8",
                  maxWidth: 760,
                  lineHeight: 1.78,
                  marginBottom: 28,
                }}
              >
                Demo přístup do EkonomOS bez registrace. Klikněte na profil podle
                role a otevře se pracovní plocha přesně podle toho, co daná role
                vidí — klienti, workflow, rizika a akce. Žádné heslo, žádné OTP.
              </p>

              {/* Profile cards */}
              <div className="grid gap-4 md:grid-cols-3">
                {demoProfiles.map((profile) => {
                  const isActive = profile.id === activeProfile.id;
                  const roleLabel =
                    profile.role === "client"
                      ? "Pohled klienta"
                      : profile.role === "german-tax"
                        ? "Pohled účetní firmy"
                        : "Pohled účetní firmy";
                  const cardTitle =
                    profile.role === "client"
                      ? "Klient účetní firmy"
                      : profile.role === "german-tax"
                        ? "Specialista CZ/DE daní"
                        : "Mzdová účetní";
                  const cardSubtitle =
                    profile.role === "client"
                      ? "Co vidí firma, kterou účetní spravuje"
                      : profile.role === "german-tax"
                        ? "Pendleři, ELSTER, Kindergeld, A1"
                        : "Mzdy, docházka, ČSSZ, exekuce";
                  const cardBenefit =
                    profile.role === "client"
                      ? "Dashboard 'co mě čeká', nahrávání faktur, schvalování kliknutím."
                      : profile.role === "german-tax"
                        ? "Fronta CZ/DE případů, podání přes ELSTER, hlídání termínů."
                        : "Měsíční uzávěrka, hlášení pojišťovnám, ELDP, exekuce na jedné obrazovce.";
                  return (
                    <button
                      key={profile.id}
                      type="button"
                      className={`hud-card-selectable ${isActive ? "hud-card-selectable-active" : ""}`}
                      onClick={() => pickProfile(profile)}
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span
                          className="hud-chip"
                          data-tone={isActive ? "cyan" : "slate"}
                        >
                          Demo
                        </span>
                        <span
                          style={{
                            ...labelStyle,
                            color: "rgba(255,255,255,0.55)",
                          }}
                        >
                          {roleLabel}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "1.35rem",
                          color: "#FFFFFF",
                          fontWeight: 700,
                          lineHeight: 1.15,
                          marginBottom: 8,
                        }}
                      >
                        {cardTitle}
                      </div>
                      <div
                        style={{
                          color: "rgba(0,229,255,0.85)",
                          fontSize: "0.85rem",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.06em",
                          marginBottom: 14,
                        }}
                      >
                        {cardSubtitle}
                      </div>
                      <div
                        style={{
                          color: "#B8C1C8",
                          lineHeight: 1.65,
                          fontSize: "0.85rem",
                        }}
                      >
                        {cardBenefit}
                      </div>
                      <div
                        className="mt-5 pt-4 flex items-center gap-2"
                        style={{
                          color: "#7A8A9E",
                          borderTop: "1px solid rgba(0,229,255,0.08)",
                        }}
                      >
                        <Building2 size={13} />
                        <span
                          style={{
                            fontSize: "0.72rem",
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          Vstoupit do dema
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Auth forms row */}
            <div className="grid gap-6 xl:grid-cols-12">
              {/* Step 1: Request code */}
              <div className="xl:col-span-7">
                <form className="hud-panel p-6" onSubmit={handleRequestCode}>
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center"
                      style={{
                        border: "1px solid rgba(0,229,255,0.22)",
                        background: "rgba(0,229,255,0.06)",
                      }}
                    >
                      <KeyRound size={18} color="#00E5FF" />
                    </div>
                    <div>
                      <div style={labelStyle}>STEP 01 // REQUEST OTP</div>
                      <div style={{ color: "#FFFFFF", fontSize: "0.92rem" }}>
                        Přihlášení přes příjmení a telefon
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label>
                      <span style={labelStyle}>Příjmení</span>
                      <input
                        className="hud-input"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="svanda"
                      />
                    </label>
                    <label>
                      <span style={labelStyle}>Telefon</span>
                      <input
                        className="hud-input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+491759096965"
                      />
                    </label>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      className="hud-button"
                      type="submit"
                      disabled={loadingStage === "request"}
                    >
                      {loadingStage === "request"
                        ? "Posílám..."
                        : "Poslat ověřovací kód"}
                      <ArrowRight size={15} />
                    </button>
                    <div
                      className="flex items-center gap-2"
                      style={{ color: "#7A8A9E" }}
                    >
                      <Phone size={14} />
                      <span style={{ fontSize: "0.82rem" }}>
                        SMS jde na telefon majitele, ne na číslo v poli.
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="hud-inline-alert mt-5">
                      <AlertTriangle size={16} />
                      <span>{error}</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Step 2: Verify code */}
              <div className="xl:col-span-5">
                <form
                  className="hud-panel h-full p-6"
                  onSubmit={handleVerifyCode}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center"
                      style={{
                        border: "1px solid rgba(212,175,55,0.22)",
                        background: "rgba(212,175,55,0.06)",
                      }}
                    >
                      <Lock size={18} color="rgba(212,175,55,0.92)" />
                    </div>
                    <div>
                      <div style={labelStyle}>STEP 02 // VERIFY & OPEN</div>
                      <div style={{ color: "#FFFFFF", fontSize: "0.92rem" }}>
                        Otevřít pracovní plochu podle role
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 rounded-sm border border-cyan-500/10 bg-cyan-500/5 p-4">
                    <div style={labelStyle}>Status</div>
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontSize: "0.92rem",
                        marginBottom: 8,
                      }}
                    >
                      {challenge
                        ? `SMS relay aktivní. Kód byl poslán na ${challenge.ownerPhone}.`
                        : "Nejdřív vygenerujte OTP v levém panelu."}
                    </div>
                    <div
                      style={{
                        color: "#7A8A9E",
                        lineHeight: 1.65,
                        fontSize: "0.82rem",
                      }}
                    >
                      V produkci by šel kód jen přes backend a SMS provider.
                      V demu vidíte vygenerovaný kód přímo na obrazovce, ať
                      můžete pokračovat bez čekání na SMS.
                    </div>
                  </div>

                  <label>
                    <span style={labelStyle}>6místný kód</span>
                    <input
                      className="hud-input"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="428611"
                    />
                  </label>

                  {challenge?.relayCode && DEMO_MODE ? (
                    <div className="mt-4 rounded-sm border border-amber-400/15 bg-amber-300/5 p-4">
                      <div
                        className="mb-2 flex items-center gap-2"
                        style={labelStyle}
                      >
                        <Sparkles size={13} color="rgba(212,175,55,0.92)" />
                        DEMO RELAY // simulace SMS pro majitele
                      </div>
                      <div
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "1.8rem",
                          color: "#FFFFFF",
                          letterSpacing: "0.16em",
                        }}
                      >
                        {challenge.relayCode}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      className="hud-button"
                      type="submit"
                      disabled={!challenge || loadingStage === "verify"}
                    >
                      {loadingStage === "verify"
                        ? "Ověřuji..."
                        : "Otevřít pracovní plochu"}
                      <ArrowRight size={15} />
                    </button>
                    <span className="hud-chip" data-tone="slate">
                      OTP expire 5 min
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6 xl:col-span-5">
            {/* Demo flow panel */}
            <div className="hud-panel p-6">
              <div className="mb-4 flex items-center gap-3">
                <Bot size={18} color="#00E5FF" />
                <div>
                  <div style={labelStyle}>JAK PŘIHLÁŠENÍ FUNGUJE</div>
                  <div style={{ color: "#FFFFFF", fontSize: "0.92rem" }}>
                    Čtyři kroky od kliknutí k pracovní ploše
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {demoFlow.map((step, index) => (
                  <div key={step} className="hud-list-row">
                    <span className="hud-step-index">{index + 1}</span>
                    <span style={{ color: "#B8C1C8", lineHeight: 1.6 }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* API handshake panel */}
            <div className="hud-panel p-6">
              <div className="mb-4 flex items-center gap-3">
                <Cpu size={18} color="#00E5FF" />
                <div>
                  <div style={labelStyle}>POD KAPOTOU</div>
                  <div style={{ color: "#FFFFFF", fontSize: "0.92rem" }}>
                    Demo komunikuje s backendem stejně jako produkce.
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {apiHandshake.map((endpoint) => (
                  <div key={endpoint} className="hud-list-row">
                    <span className="hud-chip" data-tone="cyan">
                      200
                    </span>
                    <span
                      style={{
                        fontFamily: "SF Mono, Monaco, Consolas, monospace",
                        color: "#B8C1C8",
                        fontSize: "0.75rem",
                      }}
                    >
                      {endpoint}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected profile panel */}
            <div className="hud-panel p-6">
              <div className="mb-4 flex items-center gap-3">
                <Activity size={18} color="#00E5FF" />
                <div>
                  <div style={labelStyle}>SELECTED PROFILE</div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    {activeProfile.surname} // {activeProfile.title}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <InfoTile
                  title="Role"
                  value={activeProfile.title}
                  sub={activeProfile.domain}
                  icon={User}
                />
                <InfoTile
                  title="Viditelní klienti"
                  value={String(activeProfile.visibleClientIds.length)}
                  sub="Role-based přístup"
                  icon={Users}
                />
                <InfoTile
                  title="Telefon"
                  value={activeProfile.phone}
                  sub="Showcase identifikátor"
                  icon={Phone}
                />
                <InfoTile
                  title="Workflow"
                  value="OTP -> Workspace"
                  sub="Bez klasického hesla"
                  icon={Shield}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
