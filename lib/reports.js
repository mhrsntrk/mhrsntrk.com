/**
 * Report registry — the single source of truth for /reports.
 *
 * Adding a report is two steps and NO code changes:
 *
 *   1. Drop three files into public/, named from the slug:
 *        public/reports/<slug>/document.html   the finished, self-contained report
 *        public/reports/<slug>/og.png          its 1200x630 social card
 *        public/reports/<slug>.md              the same report as markdown
 *   2. Add one entry to REPORTS below.
 *
 * Everything else (the page route, the index, the sitemap, the reports feed,
 * llms.txt) reads from here. `scripts/generate-report-artifacts.js` fails the
 * build if a registry entry is missing any of its three files, so a typo in a
 * slug surfaces at build time rather than as a 404 in production.
 *
 * The report HTML is served byte-for-byte as authored: it is a finished
 * document with its own <head>, fonts, tokens and dark-only design, and
 * nothing in this codebase parses, rewrites or re-renders it.
 */

export const SITE_URL = 'https://mhrsntrk.com';

export const REPORTS = [
  {
    slug: 'cybersecurity-2027',
    title: 'Cybersecurity 2027: Where the Budget Goes and What Sells',
    description:
      'Where the $244B information security budget actually goes in 2026-27, which EU deadlines force a purchase, and what a B2B buyer will sign.',
    // Both dates mirror the document's own <meta> and JSON-LD. Keep them in
    // sync with the file — they drive the sitemap <lastmod> and the feed.
    date: '2026-07-17',
    updated: '2026-07-17',
    tags: ['cybersecurity', 'AI security', 'EU regulation', 'venture funding'],
    // Drives the generated list cover (components/ReportCover.js). All three
    // are optional — a report that omits them still gets a cover, just a
    // quieter one built from the sector and date alone. Keep `stats` to four
    // or fewer; the strip is designed for two to four.
    sector: 'Cybersecurity',
    period: 'FY2027',
    stats: [
      { value: '$244B', label: '2026 spend' },
      { value: '$722M', label: 'formation-stage' },
      { value: '12', label: 'rounds tracked' },
      { value: '2 Dec 2027', label: 'AI Act, high-risk' }
    ]
  }
];

/**
 * Every URL a report owns, derived from its slug. Nothing else may hardcode
 * these paths.
 *
 * `page` serves the report itself — the authored document, with a small
 * controls block appended at build time, so the full text is indexable at the
 * canonical URL. `source` serves the authored file byte-for-byte, for anyone
 * who wants to diff what was published against what was written.
 */
export function reportPaths(slug) {
  return {
    page: `/reports/${slug}`,
    source: `/reports/${slug}/source.html`,
    markdown: `/reports/${slug}.md`,
    og: `/reports/${slug}/og.png`
  };
}

/** Files on disk a report must ship, relative to the repo root. */
export function reportFiles(slug) {
  return {
    source: `public/reports/${slug}/source.html`,
    og: `public/reports/${slug}/og.png`,
    markdown: `public/reports/${slug}.md`
  };
}

/** The page built from the source at build time. Never authored by hand. */
export function reportBuiltFile(slug) {
  return `public/reports/${slug}/index.html`;
}

function decorate(report) {
  return { ...report, ...reportPaths(report.slug) };
}

/** All reports, newest first, each with its resolved URLs. */
export function getAllReports() {
  return REPORTS.map(decorate).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}

export function getReportBySlug(slug) {
  const report = REPORTS.find((r) => r.slug === slug);
  return report ? decorate(report) : null;
}
