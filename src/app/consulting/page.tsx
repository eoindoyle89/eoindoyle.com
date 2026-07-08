import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Markdown } from "@/components/Markdown";
import { getConsultingPage } from "@/lib/content";
import styles from "./page.module.css";

export function generateMetadata(): Metadata {
  return { title: getConsultingPage().title };
}

export default function Consulting() {
  const page = getConsultingPage();
  return (
    <main>
      <Eyebrow>{page.eyebrow}</Eyebrow>
      <h1 className={styles.title}>{page.title}</h1>
      <div className={styles.body}>
        <Markdown text={page.body} />
      </div>
      <a className={styles.email} href={`mailto:${page.email}`}>
        {page.email} →
      </a>
    </main>
  );
}
