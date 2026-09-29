"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Send } from "lucide-react";
import { getMailtoLink, submitContactForm } from "@/lib/form-submit";
import { trackMetaEvent } from "@/lib/tracking";

const INQUIRY = "Nezávazný rozbor procesu účetní kanceláře";

export default function AuditLeadForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "",
  });
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "success" | "mailto" | "error"
  >("idle");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const payload = { ...formState, inquiry: INQUIRY };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitState("sending");
    const result = await submitContactForm(payload);
    if (result.ok && result.mode === "endpoint") {
      trackMetaEvent("Lead", { content_name: "accounting_process_audit" });
      setSubmitState("success");
      setFormState({ name: "", email: "", company: "", message: "", website: "" });
    } else if (result.mode === "mailto") {
      trackMetaEvent("Contact", { content_name: "accounting_process_audit_fallback" });
      setSubmitState("mailto");
    } else {
      setSubmitState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="hud-panel p-6 sm:p-8 space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="audit-website">Webová stránka</label>
        <input
          id="audit-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formState.website}
          onChange={handleChange}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="audit-name" className="block text-text-muted mb-2 text-sm">
            Jméno a příjmení *
          </label>
          <input
            id="audit-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            className="hud-input"
            value={formState.name}
            onChange={handleChange}
            placeholder="Vaše jméno"
          />
        </div>
        <div>
          <label htmlFor="audit-email" className="block text-text-muted mb-2 text-sm">
            Pracovní e-mail *
          </label>
          <input
            id="audit-email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className="hud-input"
            value={formState.email}
            onChange={handleChange}
            placeholder="vy@firma.cz"
          />
        </div>
      </div>

      <div>
        <label htmlFor="audit-company" className="block text-text-muted mb-2 text-sm">
          Účetní kancelář / firma
        </label>
        <input
          id="audit-company"
          name="company"
          type="text"
          maxLength={200}
          autoComplete="organization"
          className="hud-input"
          value={formState.company}
          onChange={handleChange}
          placeholder="Název firmy"
        />
      </div>

      <div>
        <label htmlFor="audit-message" className="block text-text-muted mb-2 text-sm">
          Který proces vám dnes bere nejvíc času? *
        </label>
        <textarea
          id="audit-message"
          name="message"
          required
          minLength={5}
          maxLength={5000}
          rows={6}
          className="hud-input resize-none"
          value={formState.message}
          onChange={handleChange}
          placeholder="Například shánění podkladů, hlídání termínů, schvalování nebo ruční přepisování mezi systémy."
        />
      </div>

      <button
        type="submit"
        disabled={submitState === "sending"}
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={16} />
        {submitState === "sending" ? "Odesílám…" : "Požádat o nezávazný rozbor"}
      </button>

      <div aria-live="polite">
        {submitState === "success" && (
          <p className="flex items-center gap-2 text-status-green text-sm">
            <CheckCircle2 size={16} />
            Děkujeme. Poptávku jsme bezpečně přijali a ozveme se s dalším krokem.
          </p>
        )}
        {submitState === "mailto" && (
          <p className="flex items-center gap-2 text-cyan text-sm">
            <CheckCircle2 size={16} />
            Otevřeli jsme e-mailovou aplikaci. Pokud se neotevřela, napište nám přes{" "}
            <a href={getMailtoLink(payload)} className="underline">
              předvyplněný e-mail
            </a>
            .
          </p>
        )}
        {submitState === "error" && (
          <p className="flex items-center gap-2 text-status-red text-sm">
            <AlertTriangle size={16} />
            Formulář se nepodařilo odeslat. Zkuste to prosím znovu.
          </p>
        )}
      </div>

      <p className="text-text-muted text-xs leading-relaxed text-center">
        Odesláním berete na vědomí zpracování údajů za účelem vyřízení poptávky.
        Podrobnosti najdete v dokumentu{" "}
        <Link href="/soukromi" className="text-cyan hover:underline">
          Ochrana osobních údajů
        </Link>
        .
      </p>
    </form>
  );
}
