import styles from './PracticalValueSection.module.css';
import { ScanLine, ShieldCheck, Cable } from "lucide-react";

export default function PracticalValueSection() {
  return (
    <section
      id="practical-value"
      className={styles.section}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.tag}>
            <span className={styles.dot} />
            CO VÁS ČEKÁ NA POZÁDÍ
          </div>
          <h2 className={styles.title}>
            Systém pracuje. <span className={styles.highlight}>Vy rozhodujete.</span>
          </h2>
          <p className={styles.description}>
            EkonomOS nepřepisuje vaše systémy, je to nadstavba, která se připojí ke stávajícím nástrojům a datům. OCR čte dokumenty, připraví párování plateb, upomínky a termíny. Kritické kroky vždy schvaluje člověk. Data jsou hostována v EU.
          </p>
        </div>

        {/* Three pillars */}
        <div className={styles.grid}>
          {/* OCR & automation */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <ScanLine size={22} />
            </div>
            <h3 className={styles.cardTitle}>
              OCR, párování, upomínky
            </h3>
            <p className={styles.cardText}>
              Systém připraví OCR příjem faktur, párování plateb, třístupňové upomínky a termíny. Vy zkontrolujete a schválíte.
            </p>
          </div>

          {/* Human in the loop */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <ShieldCheck size={22} />
            </div>
            <h3 className={styles.cardTitle}>
              Schvalovací brána člověka
            </h3>
            <p className={styles.cardText}>
              Kritické kroky, upomínky, podání hlášení, schvalování dokumentů, vždy schvaluje člověk. Automatizace nepřeskočí vaši kontrolu.
            </p>
          </div>

          {/* Integration & EU hosting */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Cable size={22} />
            </div>
            <h3 className={styles.cardTitle}>
              Nadstavba nad vaším systémem
            </h3>
            <p className={styles.cardText}>
              EkonomOS se připojuje ke stávajícím nástrojům (Money S3, Pohoda, DocuWare, banky, ARES, ČSSZ, ELSTER). Data jsou hostována v EU.
            </p>
          </div>
        </div>

        {/* Summary box */}
        <div className={styles.summary}>
          <p className={styles.summaryText}>
            Klasická účetní firma má software pro účetnictví.
          </p>
          <p className={styles.summaryTextSecondary}>
            My jsme nadstavba, která propojí vaše systémy, automatizuje rutinu a hlídá rizika. Účetní práci dál děláte vy, jen máte víc času a klienta, který vidí, co se děje.
          </p>
        </div>
      </div>
    </section>
  );
}
