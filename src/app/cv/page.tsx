import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Markdown } from "@/components/Markdown";
import { getCvPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export function generateMetadata(): Metadata {
  return pageMetadata(getCvPage(), "/cv");
}

export default function Cv() {
  const page = getCvPage();
  return (
    <main className={styles.main}>
      <Eyebrow className={styles.eyebrow}>{page.eyebrow}</Eyebrow>
      <h1 className={styles.name}>{page.name}</h1>
      <p className={styles.tagline}>{page.tagline}</p>
      <div className={styles.body}>
        <Markdown text={page.body} />
      </div>
    </main>
  );
}
