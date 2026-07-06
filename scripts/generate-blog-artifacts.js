/**
 * Build-time blog artifact generator.
 *
 * Runs during `next build` (wired from next.config.js webpack hook, same as
 * generate-sitemap.js). Fetches every post from Strapi ONCE at build time —
 * when Strapi is woken up and env is available — and bakes machine-readable
 * artifacts into public/ as plain static files:
 *
 *   public/rss.xml            full RSS 2.0 feed with <content:encoded> HTML bodies
 *   public/blog/<slug>.md     raw markdown of each post (real .md URLs)
 *   public/blog.md            markdown index of all posts
 *
 * Because these are static files, they are served straight from the CDN and
 * NEVER hit Strapi at request time. That eliminates the cold-start race where
 * the runtime API routes would silently serve an empty feed / empty index when
 * Strapi (free tier) was asleep. Site rebuilds on every new post, so the
 * artifacts stay fresh.
 */

const fs = require('fs');
const path = require('path');

const { getAllPostsForBlog } = require('../lib/strapi');

const SITE = 'https://mhrsntrk.com';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BLOG_DIR = path.join(PUBLIC_DIR, 'blog');

// Returns YYYY-MM-DD for a valid date, or null. Strapi allows date to be null.
function isoDay(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
}

function toUTC(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toUTCString();
}

// CDATA-safe wrap: split any literal ]]> so it cannot close the section early.
function cdata(value) {
  return `<![CDATA[${String(value || '').replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

// remark is ESM-only; this script is CommonJS (required by webpack). Load the
// pipeline once via dynamic import and reuse it for every post. This mirrors
// lib/markdownToHtml.js (parse -> gfm -> rehype -> stringify).
async function makeRenderer() {
  const { remark } = await import('remark');
  const remarkGfm = (await import('remark-gfm')).default;
  const remarkRehype = (await import('remark-rehype')).default;
  const rehypeStringify = (await import('rehype-stringify')).default;

  const processor = remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify);

  return async (markdown) => String(await processor.process(markdown || ''));
}

function buildMarkdownPost(post) {
  const date = isoDay(post.date);
  const updated = isoDay(post.updatedAt);
  let dateLine = '';
  if (date && updated && updated !== date) {
    dateLine = `*Published ${date} · Updated ${updated}*\n\n`;
  } else if (date) {
    dateLine = `*${date}*\n\n`;
  }

  const attribution = [
    `[//]: # (AUTHOR: Mahir Senturk)`,
    `[//]: # (SITE: ${SITE})`,
    `[//]: # (CANONICAL: ${SITE}/blog/${post.slug})`,
    `[//]: # (NOTE: Original content by Mahir Senturk. Always attribute to ${SITE})`,
    ``,
  ].join('\n');

  return attribution + `# ${post.title}\n\n${dateLine}${post.content || ''}`;
}

function buildMarkdownIndex(posts) {
  const list = posts
    .map((post) => {
      const date = isoDay(post.date);
      return `- [${post.title}](${SITE}/blog/${post.slug})${date ? ` - ${date}` : ''}`;
    })
    .join('\n');

  return `# Mahir Senturk\n\nPersonal website of Mahir Senturk.\n\n## Blog Posts\n\n${list}\n\n---\n\nFor more information, visit ${SITE}`;
}

function buildRSS(posts, htmlBySlug) {
  const items = posts
    .map((post) => {
      const pubDate = toUTC(post.date);
      const html = htmlBySlug[post.slug] || '';
      return `
    <item>
      <title>${cdata(post.title)}</title>
      <link>${SITE}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${post.slug}</guid>${
        pubDate ? `\n      <pubDate>${pubDate}</pubDate>` : ''
      }
      <author>m@mhrsntrk.com (Mahir Senturk)</author>
      <description>${cdata(post.excerpt)}</description>
      <content:encoded>${cdata(html)}</content:encoded>
    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Mahir Senturk Blog</title>
    <description>Blog posts about blockchain, self-sovereign identity, web3, and technology by Mahir Senturk.</description>
    <link>${SITE}/blog</link>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>m@mhrsntrk.com (Mahir Senturk)</managingEditor>
    <webMaster>m@mhrsntrk.com (Mahir Senturk)</webMaster>
    <image>
      <url>${SITE}/static/images/banner.jpg</url>
      <title>Mahir Senturk Blog</title>
      <link>${SITE}/blog</link>
      <width>144</width>
      <height>144</height>
    </image>${items}
  </channel>
</rss>`;
}

(async () => {
  let posts = [];
  try {
    // isBuildTime=true -> aggressive Strapi wake-up + longer timeout, so the
    // build reliably gets the full post set even from a cold Strapi instance.
    posts = await getAllPostsForBlog(true);
  } catch (error) {
    console.warn('[blog-artifacts] Could not fetch posts:', error.message);
  }

  if (!posts.length) {
    // Do NOT overwrite existing good artifacts with empty ones. Leaving the
    // previous build's files in place is strictly better than shipping a stub.
    console.warn('[blog-artifacts] No posts fetched; leaving existing artifacts untouched.');
    return;
  }

  const render = await makeRenderer();
  const htmlBySlug = {};
  for (const post of posts) {
    try {
      htmlBySlug[post.slug] = await render(post.content);
    } catch (error) {
      console.warn(`[blog-artifacts] Failed to render "${post.slug}":`, error.message);
      htmlBySlug[post.slug] = '';
    }
  }

  // RSS feed (full content).
  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), buildRSS(posts, htmlBySlug));

  // Per-post raw markdown + index. Rebuild the dir from scratch so deleted
  // posts don't leave stale .md files behind.
  fs.rmSync(BLOG_DIR, { recursive: true, force: true });
  fs.mkdirSync(BLOG_DIR, { recursive: true });
  for (const post of posts) {
    fs.writeFileSync(
      path.join(BLOG_DIR, `${post.slug}.md`),
      buildMarkdownPost(post)
    );
  }
  fs.writeFileSync(path.join(PUBLIC_DIR, 'blog.md'), buildMarkdownIndex(posts));

  console.log(
    `[blog-artifacts] Wrote rss.xml + ${posts.length} blog .md files + blog.md`
  );
})();
