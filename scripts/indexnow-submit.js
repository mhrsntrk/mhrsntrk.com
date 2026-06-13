#!/usr/bin/env node
// Submit URLs to IndexNow (Bing, Yandex, Seznam, etc.).
//
// Usage:
//   node scripts/indexnow-submit.js                       # submit ALL urls from public/sitemap.xml
//   node scripts/indexnow-submit.js https://mhrsntrk.com/blog/foo   # submit one or more URLs
//   node scripts/indexnow-submit.js --dry-run [urls...]   # show what would be sent
//
// Endpoint accepts up to 10,000 URLs per request. The key file must be live at
// https://mhrsntrk.com/c517710dda7b49848c0022f1d987a4f4.txt before submitting.

const fs = require('fs');
const path = require('path');

const { submitToIndexNow, HOST, KEY_LOCATION } = require('../lib/indexnow');

function urlsFromSitemap() {
  const file = path.join(__dirname, '..', 'public', 'sitemap.xml');
  if (!fs.existsSync(file)) {
    throw new Error('public/sitemap.xml not found — run the build (or generate-sitemap) first');
  }
  const xml = fs.readFileSync(file, 'utf8');
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  return [...new Set(locs)];
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const args = process.argv.slice(2).filter((a) => a !== '--dry-run');

  const urls = args.length > 0 ? args : urlsFromSitemap();

  console.log(`Host        : ${HOST}`);
  console.log(`Key location: ${KEY_LOCATION}`);
  console.log(`URLs        : ${urls.length}`);
  urls.slice(0, 20).forEach((u) => console.log(`  ${u}`));
  if (urls.length > 20) console.log(`  ... and ${urls.length - 20} more`);

  if (dryRun) {
    console.log('\n[dry-run] No request sent.');
    return;
  }

  const result = await submitToIndexNow(urls);
  if (result.ok) {
    console.log(`\nSubmitted. HTTP ${result.status}`);
  } else {
    console.error(`\nFailed. HTTP ${result.status}: ${result.body}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
