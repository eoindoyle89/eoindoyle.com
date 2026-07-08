import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Markdown } from "@/components/Markdown";
import { getWorkEntries, getWorkPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export function generateMetadata(): Metadata {
  return pageMetadata(getWorkPage(), "/work");
}

export default function Work() {
  const page = getWorkPage();
  const entries = getWorkEntries();
  return (
    <main>
      <Eyebrow>
        {page.eyebrow} · {entries.length} {page.entriesLabel}
      </Eyebrow>
      <h1 className={styles.title}>{page.title}</h1>
      <div className={styles.intro}>
        <Markdown text={page.body} />
      </div>
      <div className={styles.entries}>
        {entries.map((entry) => (
          <article key={entry.slug} className={styles.entry}>
            <p className={styles.meta}>
              {entry.role} · {entry.period}
            </p>
            <h2 className={styles.company}>{entry.company}</h2>
            <p className={styles.subtitle}>{entry.subtitle}</p>
            <div className={styles.body}>
              <Markdown text={entry.body} />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
