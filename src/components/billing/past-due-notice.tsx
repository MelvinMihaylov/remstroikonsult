import { siteConfig } from "../../app/site-config";
import styles from "./past-due-notice.module.css";

/**
 * Past-due notice, shown only to a visitor holding the billing cookie (see
 * src/proxy.ts) — never to the public. Once the balance is settled, remove it
 * by deleting this folder and src/proxy.ts, the .past-due-lock rule in
 * src/app/globals.css and the render in src/app/layout.tsx.
 */
export function PastDueNotice() {
  return (
    <div className={styles.overlay}>
      {/* Opened on the server rather than via showModal(), so there is no
          Escape-to-close and no client JavaScript. */}
      <dialog open className={styles.dialog} aria-labelledby="past-due-title">
        <div className={styles.accent} />
        <div className={styles.body}>
          <p className={styles.eyebrow}>Неплатено задължение</p>

          <h2 className={styles.title} id="past-due-title">
            Този сайт има неплатени задължения
          </h2>

          <p className={styles.lead}>
            Изработката и поддръжката на сайта не са платени в договорения срок.
          </p>

          <div className={styles.party}>
            <p className={styles.partyLabel}>Задължено лице</p>
            <p className={styles.partyName}>Петър Вълков</p>
            <p className={styles.partyLine}>{siteConfig.name}</p>
            <p className={styles.partyLine}>{siteConfig.phoneDisplay}</p>
            <p className={styles.partyLine}>{siteConfig.email}</p>
          </div>
        </div>
      </dialog>
    </div>
  );
}
