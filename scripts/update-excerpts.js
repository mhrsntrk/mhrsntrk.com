/* eslint-disable no-console */
/**
 * Update the `Excerpt` field of every blog post in Strapi.
 *
 * Reads new excerpts from scripts/excerpts.json (keyed by slug) and pushes
 * them to Strapi using the STRAPI_API_TOKEN_FULL token (write access).
 *
 * Usage:
 *   node scripts/update-excerpts.js            # dry run — shows changes, writes nothing
 *   node scripts/update-excerpts.js --commit   # actually writes to Strapi
 *
 * Safe to re-run: posts whose excerpt already matches are skipped.
 */

const fs = require('fs');
const path = require('path');

const COMMIT = process.argv.includes('--commit');

// --- Load env vars from .env.local (no dotenv dependency in this project) ---
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = val;
  }
}

loadEnv();

// Node 18+ exposes a global fetch; fall back to node-fetch (a project
// dependency) so this script also runs on Node 16/17.
const fetchFn =
  typeof fetch === 'function' ? fetch : require('node-fetch');

const STRAPI_URL = process.env.STRAPI_API_URL;
const TOKEN = process.env.STRAPI_API_TOKEN_FULL;

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

if (!STRAPI_URL) fail('STRAPI_API_URL is not set in .env.local');
if (!TOKEN) fail('STRAPI_API_TOKEN_FULL is not set in .env.local');

const excerpts = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'excerpts.json'), 'utf8')
);

function authHeaders(extra = {}) {
  return { Authorization: `Bearer ${TOKEN}`, ...extra };
}

async function fetchAllPosts() {
  const all = [];
  let page = 1;
  // pageSize 100 covers the whole blog comfortably; loop just in case.
  for (;;) {
    const url = `${STRAPI_URL}/api/posts?pagination[pageSize]=100&pagination[page]=${page}&fields[0]=Slug&fields[1]=Excerpt&fields[2]=Title&publicationState=preview`;
    const res = await fetchFn(url, { headers: authHeaders() });
    if (!res.ok) {
      const body = await res.text();
      fail(`GET /api/posts failed (${res.status}): ${body.slice(0, 300)}`);
    }
    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];
    for (const item of data) {
      // Strapi v5 returns flat objects with documentId; v4 nests under attributes.
      const attrs = item.attributes || item;
      all.push({
        id: item.id,
        documentId: item.documentId || attrs.documentId || null,
        slug: attrs.Slug,
        title: attrs.Title,
        excerpt: attrs.Excerpt || ''
      });
    }
    const pageCount = json?.meta?.pagination?.pageCount || 1;
    if (page >= pageCount) break;
    page += 1;
  }
  return all;
}

async function updatePost(post, newExcerpt) {
  // Strapi v5 keys updates by documentId; v4 by numeric id.
  const idForUrl = post.documentId || post.id;
  const url = `${STRAPI_URL}/api/posts/${idForUrl}`;
  const res = await fetchFn(url, {
    method: 'PUT',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ data: { Excerpt: newExcerpt } })
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`PUT ${url} failed (${res.status}): ${body.slice(0, 300)}`);
  }
  return res.json();
}

(async () => {
  console.log(
    `\n${COMMIT ? '🚀 COMMIT MODE — writing to Strapi' : '🔍 DRY RUN — no changes will be written'}`
  );
  console.log(`Strapi: ${STRAPI_URL}\n`);

  const posts = await fetchAllPosts();
  console.log(`Fetched ${posts.length} posts from Strapi.\n`);

  const bySlug = new Map(posts.map((p) => [p.slug, p]));

  let changed = 0;
  let unchanged = 0;
  let missing = 0;
  let failed = 0;

  // Posts in Strapi with no excerpt in our JSON file
  for (const p of posts) {
    if (!excerpts[p.slug]) {
      console.log(`⚠️  No excerpt drafted for Strapi post: ${p.slug}`);
      missing += 1;
    }
  }

  for (const [slug, newExcerpt] of Object.entries(excerpts)) {
    const post = bySlug.get(slug);
    if (!post) {
      console.log(`⚠️  Slug not found in Strapi: ${slug}`);
      missing += 1;
      continue;
    }
    if ((post.excerpt || '').trim() === newExcerpt.trim()) {
      unchanged += 1;
      continue;
    }

    console.log(`\n• ${slug}`);
    console.log(`  OLD: ${post.excerpt ? post.excerpt.slice(0, 120) : '(empty)'}`);
    console.log(`  NEW: ${newExcerpt.slice(0, 120)}`);

    if (COMMIT) {
      try {
        await updatePost(post, newExcerpt);
        console.log('  ✅ updated');
        changed += 1;
      } catch (err) {
        console.log(`  ❌ ${err.message}`);
        failed += 1;
      }
    } else {
      changed += 1;
    }
  }

  console.log('\n──────── summary ────────');
  console.log(`${COMMIT ? 'Updated' : 'Would update'}: ${changed}`);
  console.log(`Already up to date:    ${unchanged}`);
  if (missing) console.log(`Unmatched (review):    ${missing}`);
  if (failed) console.log(`Failed:                ${failed}`);
  if (!COMMIT) {
    console.log('\nRe-run with --commit to apply these changes.');
  }
  console.log('');

  if (failed) process.exit(1);
})();
