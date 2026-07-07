import Link from "next/link";
import styles from "./TitleBar.module.css";

export default function TitleBar() {
  return (
    <div className={styles.titleSection}>
      <h1>TypoMemory</h1>
      <p>a font memory game</p>
      <div className={styles.creditsSection}>
        <Link href="/credits/thank-you">credits</Link>
      </div>
    </div>
  );
}
