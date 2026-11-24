import styles from "./past-due-notice.module.css";

/**
 * Suspension notice covering the site while the work on it is unpaid. Opened
 * on the server rather than via showModal(), so there is no Escape-to-close
 * and no client JavaScript, and the root layout freezes the page behind it.
 * Reverting the commit that added this restores the site.
 */
export function PastDueNotice() {
  return (
    <div className={styles.overlay}>
      <dialog open className={styles.dialog} aria-labelledby="past-due-title">
        <div className={styles.accent} />
        <div className={styles.body}>
          <p className={styles.eyebrow}>Временно спрян</p>

          <h2 className={styles.title} id="past-due-title">
            Сайтът е временно спрян
          </h2>

          <p className={styles.lead}>
            Услугата е преустановена поради неплатени задължения. Сайтът ще бъде възстановен веднага
            след уреждане на плащането.
          </p>
        </div>
      </dialog>
    </div>
  );
}
