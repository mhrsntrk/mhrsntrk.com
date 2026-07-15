import { z } from 'zod';

/**
 * The Vulgate — schema for one corpus entry.
 *
 * A curated corpus of vulgar Turkish folk proverbs. See content/CLAUDE.md for
 * the editorial line. Zod exists to catch the failure that actually happens at
 * this size: an entry shipping with no meaning, or `register: obsene`. You will
 * not catch that by eye across 100 files.
 *
 * Kept in JS (not TS) to match the rest of this repo. Types via JSDoc below.
 */

export const RegisterEnum = z.enum(['mild', 'crude', 'obscene']);
export const OriginEnum = z.enum(['attested', 'unattested']);

export const THEMES = [
  'ego',
  'money',
  'hypocrisy',
  'futility',
  'labour',
  'self-perception',
  'fate',
  'kinship'
];

export const ThemeEnum = z.enum(THEMES);

export const EntrySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  tr: z.string().min(1),
  variants: z.array(z.string()).default([]),
  literal_en: z.string().min(1),
  meaning_en: z.string().min(1),
  meaning_tr: z.string().min(1),
  register: RegisterEnum,
  usage: z.string().min(1),
  equivalents: z.array(z.string()).default([]),
  cross_refs: z.array(z.string()).default([]),
  origin: OriginEnum,
  themes: z.array(ThemeEnum).min(1),
  related: z.array(z.string()).default([])
});

/** @typedef {z.infer<typeof EntrySchema>} Entry */
