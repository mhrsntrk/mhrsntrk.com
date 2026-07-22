/**
 * The two blocks appended to a report at build time.
 *
 * A report is an authored, self-contained, dark-only HTML document. It is
 * published as itself — same head, same fonts, same tokens, same markup — so
 * that its full text, headings and JSON-LD are indexable at its canonical URL.
 * The only additions are made here, and they are deliberately small:
 *
 *   headExtras()   discovery links plus a BreadcrumbList, before </head>
 *   controls()     the three reader actions and the print theme, before </body>
 *
 * Nothing rewrites, reflows or restyles the document itself. The authored file
 * stays available byte-for-byte at /reports/<slug>/source.html, and the build
 * validator diffs the two so any accidental change to the body shows up.
 *
 * Everything below is plain HTML, CSS and DOM JavaScript on purpose: the page
 * is served as a static file, with no framework and no hydration.
 */

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Light theme for paper. Reports are dark-only, which on paper means a dark
 * slab inside white margins and a toner bill. Redeclaring the document's own
 * design tokens flips it, so this stays generic: any report built on the same
 * tokens inherits it. Only the treatments that cannot survive a white
 * background are handled individually.
 */
const PRINT_THEME = `
@media print {
  :root {
    --paper: #ffffff;
    --paper-2: #f6f6f6;
    --ink: #111111;
    --ink-2: #333333;
    --mute: #5f5f5f;
    --hair: #cccccc;
    --mast: #f0f0f0;
    --grid: transparent;
    --cyan: #0b6e6e;
    --split-red: transparent;
  }
  html, body { background: #fff !important; background-image: none !important; color: var(--ink); }
  body::before { display: none !important; }
  h1 { text-shadow: none !important; animation: none !important; color: var(--ink); }
  .logo { filter: invert(1); }
  .mast { background: var(--mast); }
  .ftab { overflow: visible !important; }
  .lede em, ::selection { color: #fff; }
  a { color: var(--ink); }
  #report-actions { display: none !important; }
}`;

/*
 * No layout overrides live here, on purpose.
 *
 * An earlier version capped `.mast` and `.wrap` at 1200px to stop the
 * masthead going full-bleed on a wide monitor. That was wrong twice over:
 * `.wrap` is already capped at 940px by the document, so raising it to 1200
 * widened the content column and pushed it off centre, and `.mast` is
 * full-bleed by design. The report is published with its authored layout.
 *
 * If the full-bleed masthead needs constraining, it belongs in the document
 * itself, not in a stylesheet bolted on at build time.
 */

const ACTIONS_CSS = `
#report-actions {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 9999;
  display: flex;
  gap: 8px;
  font-family: var(--body, ui-monospace, monospace);
}
#report-actions a, #report-actions button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 9px 12px;
  border: 1px solid var(--hair, #383838);
  border-radius: 2px;
  background: var(--mast, #0d0d0d);
  color: var(--ink, #ededed);
  font: inherit;
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0.02em;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 2px 12px rgb(0 0 0 / 45%);
  transition: border-color 0.12s ease, color 0.12s ease;
}
#report-actions a:hover, #report-actions button:hover,
#report-actions a:focus-visible, #report-actions button:focus-visible {
  border-color: var(--red, #ef4444);
  color: var(--red, #ef4444);
}
#report-actions .back { color: var(--mute, #a6a6a6); }

/* Label swapping is done in CSS across three states, so the click handler
   never rewrites button text — that would destroy the responsive labels. */
#report-actions .rl-short,
#report-actions .rl-done,
#report-actions .rl-error { display: none; }
#report-actions .is-done, #report-actions .is-error {
  border-color: var(--red, #ef4444);
  color: var(--red, #ef4444);
}
#report-actions .is-done .rl-full,
#report-actions .is-done .rl-short,
#report-actions .is-error .rl-full,
#report-actions .is-error .rl-short { display: none; }
#report-actions .is-done .rl-done,
#report-actions .is-error .rl-error { display: inline; }

#report-status {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Mobile: a real bottom bar rather than a floating cluster that wrapped onto
   two rows. Four equal segments, short labels, 44px tap targets, and the
   home-indicator inset respected. The document reserves 96px at the end of
   .wrap, so a bar this tall never covers the last lines. */
@media (max-width: 620px) {
  #report-actions {
    right: 0;
    bottom: 0;
    left: 0;
    gap: 0;
    padding-bottom: env(safe-area-inset-bottom, 0px);
    background: var(--mast, #0d0d0d);
    border-top: 1px solid var(--hair, #383838);
    box-shadow: 0 -2px 16px rgb(0 0 0 / 55%);
  }
  #report-actions a, #report-actions button {
    flex: 1 1 0;
    min-width: 0;
    min-height: 44px;
    padding: 8px 4px;
    border: 0;
    border-left: 1px solid var(--hair, #383838);
    border-radius: 0;
    background: none;
    box-shadow: none;
    font-size: 11px;
  }
  #report-actions a:first-child { border-left: 0; }
  #report-actions .rl-full { display: none; }
  #report-actions .rl-short { display: inline; }
  #report-actions .is-done .rl-short,
  #report-actions .is-error .rl-short { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  #report-actions a, #report-actions button { transition: none; }
}`;

/**
 * Discovery links and breadcrumbs, injected before </head>.
 *
 * The BreadcrumbList is added as a second JSON-LD block rather than merged
 * into the document's own: the authored Report block is left exactly as
 * written, and a crawler reads both.
 */
export function headExtras(report, siteUrl) {
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Reports',
        item: `${siteUrl}/reports`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: report.title,
        item: `${siteUrl}${report.page}`
      }
    ]
  };

  return `
<!-- Appended at build time: discovery links and breadcrumbs. -->
<link rel="alternate" type="text/markdown" href="${siteUrl}${
    report.markdown
  }" title="${escapeHtml(report.title)} (markdown)">
<link rel="alternate" type="application/rss+xml" title="mhrsntrk Reports" href="${siteUrl}/reports/rss.xml">
<link rel="license" href="https://creativecommons.org/licenses/by/4.0/">
<script type="application/ld+json">
${JSON.stringify(breadcrumbs, null, 2)}
</script>
`;
}

/**
 * The three reader actions, injected before </body>.
 *
 * Download PDF is just print: the browser's own print path, so a reader who
 * hits Cmd+P gets the identical file. The document title is swapped for the
 * slug during printing so the PDF lands as <slug>.pdf, and restored after.
 *
 * Copy as markdown fetches the .md rather than reconstructing anything: it
 * carries YAML front matter, an attribution notice addressed to AI systems and
 * human readers, inline provenance tags and a citation footer, and all of that
 * has to survive a paste into a chat window.
 */
export function controls(report) {
  const slug = escapeHtml(report.slug);
  const markdown = escapeHtml(report.markdown);

  return `
<!-- Appended at build time: reader actions. The document above is as authored. -->
<style>${PRINT_THEME}${ACTIONS_CSS}</style>
<div id="report-actions">
  <a class="back" href="/reports" aria-label="All reports"
    ><span class="rl-full">&#8592; Reports</span><span class="rl-short">&#8592; All</span></a
  ><button type="button" data-report-print aria-label="Download this report as PDF"
    ><span class="rl-full">Download PDF</span><span class="rl-short">PDF</span></button
  ><button type="button" data-report-copy aria-label="Copy this report as markdown"
    ><span class="rl-full">Copy as markdown</span><span class="rl-short">Copy</span
    ><span class="rl-done">&#10003; Copied</span><span class="rl-error">&#10007; Failed</span></button
  ><a href="${markdown}" download="${slug}.md" aria-label="Download this report as a markdown file"
    ><span class="rl-full">Download markdown</span><span class="rl-short">.md</span></a
  >
</div>
<p id="report-status" role="status" aria-live="polite"></p>
<script>
(function () {
  var slug = ${JSON.stringify(report.slug)};
  var markdownUrl = ${JSON.stringify(report.markdown)};
  var status = document.getElementById('report-status');
  var copyButton = document.querySelector('[data-report-copy]');

  document
    .querySelector('[data-report-print]')
    .addEventListener('click', function () {
      window.print();
    });

  // Browsers name a printed PDF after the document title. Bound to
  // beforeprint rather than to the button so Cmd+P produces the same file.
  var restore = null;
  window.addEventListener('beforeprint', function () {
    if (restore === null) restore = document.title;
    document.title = slug;
  });
  window.addEventListener('afterprint', function () {
    if (restore !== null) document.title = restore;
    restore = null;
  });

  // State is a class, never text: the button holds one label per breakpoint
  // and rewriting textContent would wipe them.
  var resetTimer = null;
  function setState(state, message) {
    copyButton.classList.remove('is-done', 'is-error');
    if (state) copyButton.classList.add(state);
    status.textContent = message || '';
    window.clearTimeout(resetTimer);
    if (state) {
      resetTimer = window.setTimeout(function () {
        setState(null, '');
      }, state === 'is-done' ? 2000 : 3000);
    }
  }

  copyButton.addEventListener('click', function () {
    fetch(markdownUrl, { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.text();
      })
      .then(function (text) {
        return navigator.clipboard.writeText(text);
      })
      .then(function () {
        setState('is-done', 'Report markdown copied to clipboard');
      })
      .catch(function (error) {
        console.error('Failed to copy report markdown:', error);
        setState('is-error', 'Could not copy the report markdown');
      });
  });
})();
</script>
`;
}

/**
 * Guard against the appended CSS reaching into the document.
 *
 * On screen, the report must render exactly as authored — the only thing the
 * build may style is the controls it added. Print is exempt: the light paper
 * theme has to restyle the document, that is its whole job.
 *
 * This exists because an earlier version added `.mast, .wrap { max-width }`
 * here and silently broke the report's layout. A selector that is not scoped
 * to #report- now fails the build instead.
 */
export function assertScreenCssIsScoped() {
  const offenders = ACTIONS_CSS.replace(/\/\*[\s\S]*?\*\//g, '')
    .split('}')
    .map((chunk) => chunk.split('{')[0].trim())
    .filter(Boolean)
    .filter((selector) => !selector.startsWith('@'))
    .flatMap((selector) => selector.split(','))
    .map((selector) => selector.trim())
    .filter(Boolean)
    .filter((selector) => !selector.startsWith('#report-'));

  if (offenders.length) {
    throw new Error(
      'Report chrome must not restyle the document on screen. These ' +
        `selectors are not scoped to #report-: ${offenders.join(', ')}. ` +
        'Put document-level styling inside the @media print theme, or in the ' +
        'document itself.'
    );
  }
}

/** Build the published page from the authored source. */
export function buildReportPage(source, report, siteUrl) {
  assertScreenCssIsScoped();

  if (!source.includes('</head>') || !source.includes('</body>')) {
    throw new Error(
      `${report.slug}: source.html has no </head> or </body>, so the reader ` +
        'controls cannot be attached'
    );
  }

  return source
    .replace('</head>', `${headExtras(report, siteUrl)}</head>`)
    .replace('</body>', `${controls(report)}</body>`);
}
