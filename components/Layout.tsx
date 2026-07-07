import styles from "./layout.module.css";
import type { LayoutProps } from "../types/components";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <main>{children}</main>
    </div>
  );
}
