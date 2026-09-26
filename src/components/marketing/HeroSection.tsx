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
            Doklady projdou.<br />
            <span>Vy rozhodnete.</span>
          </h1>
          <p className={styles.lede}>
            EkonomOS propojí dokumenty, platby a termíny do jednoho toku.
            <strong> Rutinu připraví systém. Kritické kroky schvaluje člověk.</strong>
          </p>

          <div className={styles.actions}>
            <Link href="/prihlaseni" className={styles.primary}>
              <PlayCircle size={17} aria-hidden="true" />
              Prohlédnout živé demo
            </Link>
            <Link href="/pilot" className={styles.secondary}>
              Jak probíhá pilot <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.assurances} aria-label="Důležité vlastnosti">
            <span><Check aria-hidden="true" /> Bez změny účetního systému</span>
            <span><Check aria-hidden="true" /> Data hostovaná v EU</span>
            <span><Check aria-hidden="true" /> Člověk vždy schvaluje</span>
          </div>

          <Link href="/pilot" className={styles.availability}>
            <span className={styles.dots} aria-hidden="true">
              <i /><i /><i className={styles.open} /><i className={styles.open} /><i className={styles.open} />
            </span>
            Pilotní fáze · 3 z 5 míst volných
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.visual}>
          <ProcessJourney />
        </div>
      </div>
    </section>
  );
}
