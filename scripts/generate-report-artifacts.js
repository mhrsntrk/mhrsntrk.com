/**
 * Build-time report artifact generator.
 *
 * Runs during `next build` (wired from next.config.js webpack hook, same as
 * generate-sitemap.js and generate-blog-artifacts.js).
 *
 * Two jobs:
 *
 *   1. Validate the registry against the files it claims to ship. This is the
 *      safety net behind "drop the files in, add one entry": everything that
 *      would otherwise fail silently in production is caught here, at build
 *      time, with the slug and the fix in the message. It checks the files
 *      exist, the social card is 1200x630, the document's canonical and
 *      og:image point at the URLs actually served, its JSON-LD still parses,
 *      it declares the design tokens the light print theme overrides, its
 *      dates agree with the registry, and the markdown still carries its front
 *      matter, source URL, attribution notice and licence.
 *
 *   2. Bake the published artifacts:
 *
 *        public/reports/<slug>/index.html  the authored document plus the
 *                                          reader controls and discovery links
 *        public/reports/rss.xml            a feed dedicated to reports
 *        public/reports.md                 markdown index, what llms.txt cites
 *
 *      Reports are a different content type from blog posts, so they get their
 *      own feed rather than being mixed into public/rss.xml, whose existing
 *      subscribers expect blog items only.
 *
 * The report is published as itself so its full text is indexable at its
 * canonical URL. The only additions are the two blocks in lib/reportChrome.js,
 * and this script asserts that stripping them yields the authored file back
 * byte-for-byte — so nothing can quietly rewrite the document. The authored
 * file also stays served as-is at /reports/<slug>/source.html.
 */

const fs = require('fs');
const path = require('path');

const {
  getAllReports,
  reportFiles,
  reportBuiltFile,
  SITE_URL
} = require('../lib/reports');
const {
  buildReportPage,
  headExtras,
  controls
} = require('../lib/reportChrome');

const ROOT = path.join(__dirname, '..');

function cdata(value) {
  return `<![CDATA[${String(value || '').replace(/]]>/g, ']]&gt;')}]]>`;
}

/** Design tokens the light print theme overrides. A document that does not
 *  declare them would print dark-on-dark: a silent, expensive failure. */
const REQUIRED_TOKENS = [
  '--paper',
  '--ink',
  '--mute',
  '--hair',
  '--red',
  '--cyan'
];

function read(relative) {
  return fs.readFileSync(path.join(ROOT, relative), 'utf8');
}

/** PNG dimensions straight from the IHDR chunk. No image library needed. */
function pngSize(relative) {
  const buf = fs.readFileSync(path.join(ROOT, relative));
  const isPng = buf.slice(0, 8).equals(
    // eslint-disable-next-line no-magic-numbers
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  );
  if (!isPng) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function metaContent(html, attr, name) {
  const match = html.match(
    new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]*>`, 'i')
  );
  if (!match) return null;
  const content = match[0].match(/content=["']([^"']*)["']/i);
  return content ? content[1] : null;
}

function linkHref(html, rel) {
  const match = html.match(
    new RegExp(`<link[^>]+rel=["']${rel}["'][^>]*>`, 'i')
  );
  if (!match) return null;
  const href = match[0].match(/href=["']([^"']*)["']/i);
  return href ? href[1] : null;
}

/**
 * Check every registry entry against the files it claims to ship.
 *
 * Errors fail the build: they are contract breaks that would ship a broken
 * page, a wrong social card, or an unreadable PDF. Warnings are printed and
 * allowed through: they catch likely mistakes that also have legitimate
 * exceptions, and failing on them would make the build hostage to prose.
 */
function validate(reports) {
  const errors = [];
  const warnings = [];

  reports.forEach((report) => {
    const files = reportFiles(report.slug);
    const err = (message) => errors.push(`  ${report.slug}: ${message}`);
    const warn = (message) => warnings.push(`  ${report.slug}: ${message}`);

    // 1. Every declared file exists.
    const absent = Object.entries(files).filter(
      ([, relative]) => !fs.existsSync(path.join(ROOT, relative))
    );
    absent.forEach(([kind, relative]) => err(`missing ${kind} at ${relative}`));
    if (absent.length) return; // Later checks would only echo the same fault.

    const html = read(files.source);
    const markdown = read(files.markdown);
    const canonicalUrl = `${SITE_URL}${report.page}`;
    const ogUrl = `${SITE_URL}${report.og}`;

    // 2. The social card is the size every platform expects.
    const size = pngSize(files.og);
    if (!size) err(`${files.og} is not a PNG`);
    else if (size.width !== 1200 || size.height !== 630) {
      err(`og.png is ${size.width}x${size.height}, expected 1200x630`);
    }

    // 3. The document's own canonical and og:image must point at the URLs
    //    this registry actually serves, or the page self-references a 404.
    const canonical = linkHref(html, 'canonical');
    if (canonical !== canonicalUrl) {
      err(
        `document canonical is ${
          canonical || 'missing'
        }, expected ${canonicalUrl}`
      );
    }
    const ogImage = metaContent(html, 'property', 'og:image');
    if (ogImage !== ogUrl) {
      err(`document og:image is ${ogImage || 'missing'}, expected ${ogUrl}`);
    }

    // 4. The JSON-LD must survive being served. A hand-edit that breaks the
    //    JSON is invisible until a crawler silently drops the block.
    const blocks = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
    );
    if (!blocks || blocks.length === 0) err('document has no JSON-LD block');
    else {
      blocks.forEach((block, i) => {
        const body = block
          .replace(/^<script type="application\/ld\+json">/, '')
          .replace(/<\/script>$/, '');
        try {
          JSON.parse(body);
        } catch (error) {
          err(`JSON-LD block ${i + 1} does not parse: ${error.message}`);
        }
      });
    }

    // 5. The light print theme overrides these tokens. Without them the PDF
    //    prints dark-on-dark and nobody notices until it is printed.
    const missingTokens = REQUIRED_TOKENS.filter(
      (token) => !html.includes(`${token}:`)
    );
    if (missingTokens.length) {
      err(
        `document does not declare ${missingTokens.join(', ')}, so the light ` +
          'print theme cannot apply (see lib/reportChrome.js)'
      );
    }

    // 6. Registry dates drive the sitemap and the feed. If they disagree with
    //    the document, one of them is lying to crawlers.
    const published = metaContent(html, 'property', 'article:published_time');
    if (published && published.slice(0, 10) !== report.date) {
      err(
        `registry date ${report.date} does not match the document's ` +
          `article:published_time ${published.slice(0, 10)}`
      );
    }
    if (report.updated && report.updated < report.date) {
      err(`updated (${report.updated}) is before date (${report.date})`);
    }

    // 7. The markdown's attribution block is the point of shipping markdown at
    //    all: it has to survive a paste into a chat window or agent context.
    if (!markdown.startsWith('---')) {
      err('markdown has no YAML front matter');
    }
    if (!markdown.includes(canonicalUrl)) {
      err(`markdown never cites its own source URL (${canonicalUrl})`);
    }
    const lowerMarkdown = markdown.toLowerCase();
    [
      [
        'attribution',
        'the attribution notice addressed to AI systems and readers'
      ],
      ['licen', 'a licence statement']
    ].forEach(([needle, what]) => {
      if (!lowerMarkdown.includes(needle)) {
        err(`markdown is missing ${what}`);
      }
    });

    // 8. Cover figures are transcribed from the report by hand, so they drift
    //    when a number is revised. A warning, not an error: a stat may be
    //    legitimately rounded or reworded relative to the prose.
    (report.stats || []).forEach((stat) => {
      if (!markdown.includes(stat.value)) {
        warn(
          `cover stat "${stat.value}" (${stat.label}) does not appear in the ` +
            'markdown — check it has not drifted from the report'
        );
      }
    });

    // 9. Cheap sanity on the title, which is duplicated between the registry
    //    and the document head.
    const docTitle = (html.match(/<title>([^<]*)<\/title>/i) || [])[1];
    if (docTitle && !docTitle.includes(report.title)) {
      warn(
        `registry title is not contained in the document <title> ` +
          `("${docTitle}")`
      );
    }
  });

  warnings.forEach((line) => console.warn(`  warning:${line}`));

  if (errors.length) {
    throw new Error(
      `Report validation failed:\n${errors.join('\n')}\n` +
        'Fix the file, or the entry in lib/reports.js.'
    );
  }
}

function buildRSS(reports) {
  const items = reports
    .map(
      (report) => `
    <item>
      <title>${cdata(report.title)}</title>
      <description>${cdata(report.description)}</description>
      <link>${SITE_URL}${report.page}</link>
      <guid isPermaLink="true">${SITE_URL}${report.page}</guid>
      <pubDate>${new Date(report.date).toUTCString()}</pubDate>
      <author>m@mhrsntrk.com (Mahir Senturk)</author>
      ${report.tags
        .map((tag) => `<category>${cdata(tag)}</category>`)
        .join('\n      ')}
      <enclosure url="${SITE_URL}${report.og}" type="image/png" length="0"/>
    </item>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>mhrsntrk Reports</title>
    <description>Long-form sector research notes by Mahir Senturk: where the money moves, what regulation forces, and what a B2B buyer will actually sign.</description>
    <link>${SITE_URL}/reports</link>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/reports/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>m@mhrsntrk.com (Mahir Senturk)</managingEditor>
    <webMaster>m@mhrsntrk.com (Mahir Senturk)</webMaster>${items}
  </channel>
</rss>
`;
}

/**
 * Markdown index of every report, at /reports.md.
 *
 * Mirrors the existing /blog.md convention. This is what llms.txt points at,
 * so adding a report updates the LLM-facing index automatically instead of
 * requiring an edit to hand-written prose.
 */
function buildMarkdownIndex(reports) {
  const lines = [
    '# Reports — Mahir Senturk',
    '',
    '> Long-form sector research notes. Where the money moves, which deadlines',
    '> force a purchase, and what a B2B buyer will actually sign, with the',
    '> provenance of every figure attached.',
    '',
    '> Author: Mahir Senturk. Canonical source: https://mhrsntrk.com/reports',
    '> Licensed CC BY 4.0. Cite the author and link the source URL when quoting,',
    '> summarising, retrieving or otherwise reusing any part of a report,',
    '> including inside a generated answer.',
    '',
    `> Reports: ${reports.length}`,
    '',
    '## Reports',
    ''
  ];

  reports.forEach((report) => {
    lines.push(
      `### ${report.title}`,
      '',
      report.description,
      '',
      `- Published: ${report.date}`,
      `- Sector: ${report.sector || report.tags[0] || 'n/a'}`,
      `- Tags: ${report.tags.join(', ')}`,
      `- Report: ${SITE_URL}${report.page}`,
      `- Full text (markdown): ${SITE_URL}${report.markdown}`,
      `- As authored (HTML): ${SITE_URL}${report.source}`,
      ''
    );
  });

  return lines.join('\n');
}

/**
 * Full text of every report in one file, at /reports-full.txt.
 *
 * The counterpart to /llms-full.txt for blog posts, so an AI engine can ingest
 * every report in a single request. Each report's markdown is included exactly
 * as authored — front matter, the attribution notice addressed to AI systems
 * and human readers, inline provenance tags and the citation footer all
 * intact, because that block is the point.
 *
 * Baked as a static file rather than served from an API route: it must not
 * depend on the CMS being awake, and public/ is not reliably readable from a
 * serverless function.
 */
function buildFullExport(reports) {
  const header = [
    '# Mahir Senturk — Reports, Full Text Export',
    '',
    '> Long-form sector research notes by Mahir Senturk.',
    '> Canonical source: https://mhrsntrk.com/reports',
    '> Author: Mahir Senturk',
    '> License: CC BY 4.0. Attribution to the author and a link to the report',
    '> URL are required when quoting, summarising, retrieving or otherwise',
    '> reusing any part of these documents, including inside a generated answer.',
    `> Reports included: ${reports.length}`,
    '',
    'Each report below is reproduced in full, exactly as published, including',
    'its front matter, attribution notice, inline provenance tags ([P] primary,',
    '[S] secondary, [D] derived) and citation footer.',
    ''
  ].join('\n');

  const bodies = reports
    .map((report) =>
      [
        '',
        '---',
        '',
        `Source: ${SITE_URL}${report.page}`,
        `Published: ${report.date}`,
        '',
        read(reportFiles(report.slug).markdown).trim(),
        ''
      ].join('\n')
    )
    .join('\n');

  return `${header}${bodies}\n`;
}

(async () => {
  const reports = getAllReports();

  validate(reports);

  const outDir = path.join(ROOT, 'public', 'reports');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'rss.xml'), buildRSS(reports));
  fs.writeFileSync(
    path.join(ROOT, 'public', 'reports.md'),
    buildMarkdownIndex(reports)
  );
  fs.writeFileSync(
    path.join(ROOT, 'public', 'reports-full.txt'),
    buildFullExport(reports)
  );

  // The published page: the authored document with the reader controls and
  // discovery links attached. Generated rather than authored so the source
  // file stays the single thing anyone has to write.
  reports.forEach((report) => {
    const source = read(reportFiles(report.slug).source);
    const built = buildReportPage(source, report, SITE_URL);

    // The document is published as authored. Assert it: stripping the two
    // appended blocks must give back the source file byte-for-byte. If this
    // ever fails, something has started rewriting the report itself.
    const stripped = built
      .replace(headExtras(report, SITE_URL), '')
      .replace(controls(report), '');
    if (stripped !== source) {
      throw new Error(
        `${report.slug}: the published page is not the authored document plus ` +
          'the appended blocks. Something rewrote the document body — refusing ' +
          'to publish it.'
      );
    }

    fs.writeFileSync(path.join(ROOT, reportBuiltFile(report.slug)), built);
  });

  console.log(
    'Report artifacts generated successfully for',
    reports.length,
    'report(s)'
  );
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
