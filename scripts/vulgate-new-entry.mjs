#!/usr/bin/env node
/**
 * Scaffold a new Vulgate entry stub with every field present and empty.
 *
 *   node scripts/vulgate-new-entry.mjs <slug>
 *
 * Then fill the fields, `npm run validate:vulgate`, commit — Vercel rebuilds.
 * Remember content/CLAUDE.md: agents may draft, but a human finalizes meanings.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENTRIES_DIR = path.join(__dirname, '..', 'content', 'entries');

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/vulgate-new-entry.mjs <slug>');
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(`Invalid slug "${slug}": use [a-z0-9-] only.`);
  process.exit(1);
}

const file = path.join(ENTRIES_DIR, `${slug}.yml`);
if (fs.existsSync(file)) {
  console.error(`Entry already exists: content/entries/${slug}.yml`);
  process.exit(1);
}

const stub = `slug: ${slug}
tr: ""
variants: []
literal_en: ""        # preserve Turkish word order; must read badly in English
meaning_en: ""        # flat encyclopedia register; human-finalized only
meaning_tr: ""        # flat encyclopedia register; human-finalized only
register: obscene      # mild | crude | obscene
usage: ""
equivalents: []        # real proverbs/idioms only
cross_refs: []         # real, verifiable works only — never fabricate
origin: unattested     # attested | unattested
themes: []             # ego money hypocrisy futility labour self-perception fate kinship
related: []
`;

fs.mkdirSync(ENTRIES_DIR, { recursive: true });
fs.writeFileSync(file, stub, 'utf8');
console.log(`Created content/entries/${slug}.yml`);
