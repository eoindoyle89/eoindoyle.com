import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404",
};

// The 404 speaks in the machine layer: mono throughout, chrome strings
// only. The provenance band still renders below via the root layout.
export default function NotFound() {
  return (
    <main className={styles.main}>
      <p className={styles.status}>HTTP 404</p>
      <h1 className={styles.title}>path not found</h1>
      <p className={styles.hint}>Nothing resolves at this address.</p>
      <Link href="/" className={styles.home}>
        → /
      </Link>
    </main>
  );
}
