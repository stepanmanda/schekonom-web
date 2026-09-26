import Link from "next/link";
import { ArrowRight, Check, PlayCircle } from "lucide-react";
import ProcessJourney from "./ProcessJourney";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.grid}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>
            <span /> Klid v každém termínu
          </div>
          <h1 id="hero-title">
            Klid v každém termínu.
          </h1>
          <p className={styles.lede}>
            EkonomOS propojí doklady, termíny, platby, klienty a schvalování do
            jednoho přehledného toku. <strong>Systém připraví rutinu. Člověk rozhoduje tam, kde na tom záleží.</strong>
          </p>

          <div className={styles.actions}>
            <Link href="/kontakt" className={styles.primary}>
              <PlayCircle size={17} aria-hidden="true" />
              Domluvit ukázku
            </Link>
            <Link href="/funkce" className={styles.secondary}>
              Prohlédnout funkce <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.assurances} aria-label="Důležité vlastnosti">
            <span><Check aria-hidden="true" /> Bez změny účetního systému</span>
            <span><Check aria-hidden="true" /> Data hostovaná v EU</span>
            <span><Check aria-hidden="true" /> Člověk vždy schvaluje</span>
          </div>

          <div className={styles.availability}>
            <span className={styles.dots} aria-hidden="true"><i /></span>
            Systém pracuje. Vy rozhodujete.
          </div>
        </div>

        <div className={styles.visual}>
          <ProcessJourney />
        </div>
      </div>
    </section>
  );
}
