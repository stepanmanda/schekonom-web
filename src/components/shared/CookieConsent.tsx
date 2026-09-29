"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readConsent, saveConsent } from "@/lib/tracking";
import styles from "./CookieConsent.module.css";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [hasChoice, setHasChoice] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    queueMicrotask(() => {
      setHasChoice(Boolean(stored));
      setOpen(!stored);
    });
  }, []);

  const choose = (marketing: boolean) => {
    saveConsent(marketing);
    setHasChoice(true);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <section
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-settings-title"
        >
          <h2 id="privacy-settings-title" className={styles.title}>
            Nastavení soukromí
          </h2>
          <p className={styles.text}>
            Nutné úložiště používáme pro fungování webu a uložení vaší volby.
            Meta Pixel spustíme pouze s vaším souhlasem, abychom mohli měřit
            výkon reklam. Volbu můžete kdykoliv změnit. Podrobnosti jsou na
            stránce <Link href="/cookies">Cookies</Link>.
          </p>
          <div className={styles.actions}>
            <button className={styles.reject} type="button" onClick={() => choose(false)}>
              Odmítnout volitelné
            </button>
            <button className={styles.accept} type="button" onClick={() => choose(true)}>
              Povolit marketingové měření
            </button>
          </div>
        </section>
      )}
      {hasChoice && !open && (
        <button className={styles.settings} type="button" onClick={() => setOpen(true)}>
          Nastavení soukromí
        </button>
      )}
    </>
  );
}
