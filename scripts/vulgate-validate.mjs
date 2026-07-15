#!/usr/bin/env node
/**
 * Validate the whole Vulgate corpus. Run in CI; fails the build on any error.
 *
 *   node scripts/vulgate-validate.mjs
 *
 * Checks, per entry: Zod schema, slug === filename, and that every `related`
 * slug resolves to a real entry.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { load as yamlLoad } from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ENTRIES_DIR = path.join(ROOT, 'content', 'entries');

// Load the schema from the same module the app uses.
const { EntrySchema } = await import(
  path.join(ROOT, 'lib', 'vulgate', 'schema.js')
);

const files = fs
  .readdirSync(ENTRIES_DIR)
  .filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'));

const errors = [];
const entries = [];

for (const file of files) {
  const raw = fs.readFileSync(path.join(ENTRIES_DIR, file), 'utf8');
  let data;
  try {
    data = yamlLoad(raw);
  } catch (e) {
    errors.push(`${file}: YAML parse error — ${e.message}`);
    continue;
  }
  const parsed = EntrySchema.safeParse(data);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      errors.push(`${file}: ${issue.path.join('.') || '(root)'} — ${issue.message}`);
    }
    continue;
  }
  const base = file.replace(/\.ya?ml$/, '');
  if (parsed.data.slug !== base) {
    errors.push(`${file}: slug "${parsed.data.slug}" != filename "${base}"`);
  }
  entries.push(parsed.data);
}

// Cross-reference integrity: related[] slugs must resolve.
const known = new Set(entries.map((e) => e.slug));
for (const e of entries) {
  for (const rel of e.related) {
    if (!known.has(rel)) {
      errors.push(`${e.slug}: related slug "${rel}" does not resolve`);
    }
  }
}

// Surface unreviewed drafts (not fatal, but visible).
const drafts = entries.filter(
  (e) => /DRAFT — REVIEW:/.test(e.meaning_en) || /DRAFT — REVIEW:/.test(e.meaning_tr)
);

if (errors.length) {
  console.error(`\n✗ Vulgate: ${errors.length} error(s) across ${files.length} file(s):\n`);
  for (const err of errors) console.error('  - ' + err);
  process.exit(1);
}

console.log(`✓ Vulgate: ${entries.length} entr${entries.length === 1 ? 'y' : 'ies'} valid.`);
if (drafts.length) {
  console.log(`  ⚠ ${drafts.length} entr${drafts.length === 1 ? 'y' : 'ies'} still flagged DRAFT — REVIEW (human gloss pending):`);
  for (const d of drafts) console.log('    - ' + d.slug);
}
