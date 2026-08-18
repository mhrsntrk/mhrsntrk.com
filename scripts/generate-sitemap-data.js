/**
 * Build-time half of the sitemap.
 *
 * Writes data/sitemap-static.json: every URL that can only change with a
 * deploy (static pages, reports, Vulgate entries) plus a snapshot of the blog
 * posts as they stood at build. pages/sitemap.xml.js reads that file, asks
 * Strapi for the current post list, and serves the union — so a post published
 * between deploys appears immediately, and a Strapi outage cannot empty the
 * sitemap.
 *
 * Also writes data/post-languages.json, the slug-to-language map that
 * pages/_document.js needs to put the right `lang` on <html>. See
 * lib/postLanguage.js.
 *
 * Runs before `next build` (see package.json), not from the webpack hook, so
 * the JSON exists before anything imports it.
 */
const fs = require('fs');
const path = require('path');

const globby = require('globby');

// Runs as a plain node script, so nothing has loaded .env.local yet. On Vercel
// the variables are already in the environment and this is a no-op.
const ENV_FILE = path.join(process.cwd(), '.env.local');
if (fs.existsSync(ENV_FILE)) {
  for (const line of fs.readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].trim();
  }
}

const { getAllPostsForBlog } = require('../lib/strapi');
const { getAllReports } = require('../lib/reports');
const { DEFAULT_LANG, detectPostLang } = require('../lib/detectLang');

const SITE_URL = 'https://mhrsntrk.com';
const OUT_FILE = path.join(process.cwd(), 'data', 'sitemap-static.json');
const LANG_FILE = path.join(process.cwd(), 'data', 'post-languages.json');

// Returns a valid ISO string for a parseable date, or null.
function safeISO(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function priorityFor(route) {
  if (route === '') return { priority: '1.0', changefreq: 'weekly' };
  if (route === '/blog') return { priority: '0.9', changefreq: 'weekly' };
  if (route === '/reports') return { priority: '0.9', changefreq: 'monthly' };
  if (route.startsWith('/swissknife'))
    return { priority: '0.7', changefreq: 'monthly' };
  return { priority: '0.8', changefreq: 'monthly' };
}

(async () => {
  // Every non-dynamic page route, including nested index pages such as
  // /reports and /swissknife/vulgate that a `pages/*.js` glob would miss.
  const pageFiles = await globby([
    'pages/**/*.js',
    '!pages/_*.js',
    '!pages/api/**',
    '!pages/404.js',
    '!pages/sitemap.xml.js',
    '!pages/**/[[]*[]].js',
    // The Vulgate is noindex (see pages/swissknife/vulgate/index.js). Listing a
    // noindex URL in the sitemap asks a crawler to index what the page then
    // refuses, which is how "Excluded by noindex" reports fill up with URLs you
    // put there yourself.
    '!pages/swissknife/vulgate/**'
  ]);

  const staticUrls = pageFiles
    .map((page) => {
      const route = page
        .replace(/^pages/, '')
        .replace(/\.js$/, '')
        .replace(/\/index$/, '')
        .replace(/^\/index$/, '');
      return route === '/index' ? '' : route;
    })
    .filter((route, i, all) => all.indexOf(route) === i)
    .map((route) => ({ loc: `${SITE_URL}${route}`, ...priorityFor(route) }));

  // Vulgate entry permalinks are deliberately absent: the corpus is noindex, so
  // the sitemap must not advertise it. The entries remain live and linkable.

  const reportUrls = getAllReports().map((report) => ({
    loc: `${SITE_URL}${report.page}`,
    lastmod: safeISO(report.updated) || safeISO(report.date),
    changefreq: 'yearly',
    priority: '0.8'
  }));

  // Snapshot of the posts, used only when Strapi cannot be reached at request
  // time. An empty list here is survivable; an empty sitemap is not.
  let blogUrls = [];
  let postLanguages = null;
  try {
    const posts = await getAllPostsForBlog(true);
    blogUrls = posts.map((post) => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: safeISO(post.updatedAt) || safeISO(post.date),
      changefreq: 'monthly',
      priority: '0.8'
    }));

    // Only the posts that are not in the default language. Every other slug
    // falls through to English in lib/postLanguage.js.
    postLanguages = {};
    for (const post of posts) {
      const lang = detectPostLang(
        `${post.title} ${post.excerpt} ${post.content}`
      );
      if (lang !== DEFAULT_LANG) postLanguages[post.slug] = lang;
    }
  } catch (error) {
    console.warn('Sitemap snapshot: could not fetch posts:', error.message);
  }

  // A failed fetch must not blank the map: an empty file would silently label
  // every Turkish post English, which is the bug this file exists to prevent.
  if (postLanguages) {
    fs.mkdirSync(path.dirname(LANG_FILE), { recursive: true });
    fs.writeFileSync(LANG_FILE, `${JSON.stringify(postLanguages, null, 2)}\n`);
    console.log(
      `Post languages written: ${
        Object.keys(postLanguages).length
      } non-${DEFAULT_LANG} posts`
    );
  } else {
    console.warn(
      `Post languages: keeping existing ${path.basename(LANG_FILE)}`
    );
  }

  const payload = {
    static: [...staticUrls, ...reportUrls],
    blogSnapshot: blogUrls
  };

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(
    `Sitemap data written: ${payload.static.length} fixed URLs, ${blogUrls.length} posts in snapshot`
  );
})();
