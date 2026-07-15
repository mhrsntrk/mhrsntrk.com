/**
 * The Vulgate — server-side corpus loader.
 *
 * Reads every content/entries/*.yml, validates each through the Zod schema, and
 * returns a sorted, frozen array. Import this ONLY from getStaticProps /
 * getStaticPaths (it uses fs) — never from client code.
 */
import fs from 'fs';
import path from 'path';
import { load as yamlLoad } from 'js-yaml';

import { EntrySchema } from './schema';

const ENTRIES_DIR = path.join(process.cwd(), 'content', 'entries');

let cache = null;

/** Parse + validate every entry. Throws on the first invalid file. */
export function getAllEntries() {
  if (cache) return cache;

  const files = fs
    .readdirSync(ENTRIES_DIR)
    .filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'));

  const entries = files.map((file) => {
    const raw = fs.readFileSync(path.join(ENTRIES_DIR, file), 'utf8');
    const data = yamlLoad(raw);
    const parsed = EntrySchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid entry ${file}: ${JSON.stringify(parsed.error.issues, null, 2)}`
      );
    }
    const base = file.replace(/\.ya?ml$/, '');
    if (parsed.data.slug !== base) {
      throw new Error(
        `Slug mismatch in ${file}: slug is "${parsed.data.slug}", filename is "${base}"`
      );
    }
    return parsed.data;
  });

  // Stable order for deterministic builds and the Postiz day-of-year pick.
  entries.sort((a, b) => a.slug.localeCompare(b.slug));

  cache = Object.freeze(entries);
  return cache;
}

export function getEntryBySlug(slug) {
  return getAllEntries().find((e) => e.slug === slug) || null;
}

export function getAllSlugs() {
  return getAllEntries().map((e) => e.slug);
}

/** Every theme that has at least one entry, with its entries. */
export function getThemeDecks() {
  const decks = {};
  for (const entry of getAllEntries()) {
    for (const theme of entry.themes) {
      (decks[theme] = decks[theme] || []).push(entry);
    }
  }
  return decks;
}

/** 1-indexed catalogue number ("Entry 001") from stable sort order. */
export function getEntryNumber(slug) {
  const idx = getAllSlugs().indexOf(slug);
  return idx < 0 ? null : idx + 1;
}
