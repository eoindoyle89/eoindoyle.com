import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Markdown } from "@/components/Markdown";
import { getColophonPage } from "@/lib/content";
import styles from "./page.module.css";

export function generateMetadata(): Metadata {
  return { title: getColophonPage().title };
}

export default function Colophon() {
  const page = getColophonPage();
  return (
    <main>
      <Eyebrow>{page.eyebrow}</Eyebrow>
      <h1 className={styles.title}>{page.title}</h1>
      <div className={styles.body}>
        <Markdown text={page.body} />
      </div>
    </main>
  );
}
