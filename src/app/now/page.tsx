import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { InlineMarkdown, Markdown } from "@/components/Markdown";
import { getNowPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export function generateMetadata(): Metadata {
  return pageMetadata(getNowPage(), "/now");
}

export default function Now() {
  const page = getNowPage();
  return (
    <main>
      <Eyebrow>
        {page.eyebrow} · updated {page.updated}
      </Eyebrow>
      <h1 className={styles.title}>{page.title}</h1>
      <p className={styles.note}>
        <InlineMarkdown text={page.note} />
      </p>
      <div className={styles.body}>
        <Markdown text={page.body} />
      </div>
    </main>
  );
}
