import { z } from "zod";

// Case studies in content/work/. The company and subtitle are separate fields
// so the rendered heading never needs a dash to join them.
export const workFrontmatterSchema = z.object({
  company: z.string().min(1),
  subtitle: z.string().min(1),
  role: z.string().min(1),
  period: z.string().regex(/^\d{4} to (\d{4}|present)$/),
  order: z.number().int().min(1),
});

// Build cards in content/builds/. Status is semantic; the ●/○ markers are
// presentation and get mapped in components.
export const buildFrontmatterSchema = z.object({
  title: z.string().min(1),
  number: z.number().int().min(1).max(99),
  status: z.enum(["in-progress", "shipped", "designing"]),
  builtInPublic: z.boolean().default(false),
  repo: z.url().startsWith("https://github.com/").optional(),
});

const basePageSchema = z.object({
  title: z.string().min(1),
  eyebrow: z.string().min(1),
  // Meta description, also reused for OpenGraph and llms.txt.
  description: z.string().min(1).max(200),
});

export const homeFrontmatterSchema = basePageSchema.extend({
  name: z.string().min(1),
  tagline: z.string().min(1),
  doors: z
    .array(
      z.object({
        label: z.string().min(1),
        href: z.string().regex(/^\/[a-z-]*$/),
      })
    )
    .length(3),
  footerNote: z.string().min(1),
  // Authored parts of the headshot metadata block. The file path and pixel
  // dimensions are real data from the static import, never typed here.
  headshot: z.object({
    alt: z.string().min(1),
    colorSpace: z.string().min(1),
    usage: z.string().min(1),
    caption: z.string().min(1),
  }),
});

export const nowFrontmatterSchema = basePageSchema.extend({
  updated: z.string().regex(/^[A-Z][a-z]+ \d{4}$/),
  note: z.string().min(1),
});

export const consultingFrontmatterSchema = basePageSchema.extend({
  email: z.email(),
});

export const colophonFrontmatterSchema = basePageSchema;

// The entry count next to the eyebrow is derived from the real entry count
// at render time; only the words are authored.
export const buildsFrontmatterSchema = basePageSchema.extend({
  entriesLabel: z.string().min(1),
});

export const workPageFrontmatterSchema = basePageSchema.extend({
  entriesLabel: z.string().min(1),
});

export const cvFrontmatterSchema = basePageSchema.extend({
  name: z.string().min(1),
  tagline: z.string().min(1),
});

// Which page files must exist in content/pages/, and the schema each one
// must satisfy. The loaders and the validation script both read this, so
// there is a single source of truth for the pairing.
export const pageSchemas = {
  home: homeFrontmatterSchema,
  now: nowFrontmatterSchema,
  work: workPageFrontmatterSchema,
  builds: buildsFrontmatterSchema,
  consulting: consultingFrontmatterSchema,
  colophon: colophonFrontmatterSchema,
  cv: cvFrontmatterSchema,
} as const;

export type PageSlug = keyof typeof pageSchemas;

export type WorkEntry = z.infer<typeof workFrontmatterSchema> & {
  slug: string;
  body: string;
};

export type BuildCard = z.infer<typeof buildFrontmatterSchema> & {
  slug: string;
  body: string;
};

export type HomePage = z.infer<typeof homeFrontmatterSchema> & { body: string };
export type BuildsPage = z.infer<typeof buildsFrontmatterSchema> & {
  body: string;
};
export type WorkPage = z.infer<typeof workPageFrontmatterSchema> & {
  body: string;
};
export type CvPage = z.infer<typeof cvFrontmatterSchema> & { body: string };
export type NowPage = z.infer<typeof nowFrontmatterSchema> & { body: string };
export type ConsultingPage = z.infer<typeof consultingFrontmatterSchema> & {
  body: string;
};
export type ColophonPage = z.infer<typeof colophonFrontmatterSchema> & {
  body: string;
};
