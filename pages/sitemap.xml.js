/**
 * /sitemap.xml
 *
 * Served per request rather than baked at build. Posts publish from Strapi
 * through ISR, so a file written at deploy time drifts the moment anything is
 * published — which is how the sitemap ended up listing 44 of 69 posts.
 *
 * The fixed URLs and a snapshot of the posts come from data/sitemap-static.json
 * (written by scripts/generate-sitemap-data.js before the build). The live post
 * list comes from Strapi. The response is the union of the two, so a Strapi
 * timeout costs freshness, never coverage.
 */
import sitemapData from '@/data/sitemap-static.json';
import { getAllPostsForBlog } from '@/lib/strapi';

const SITE_URL = 'https://mhrsntrk.com';

const safeISO = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

const escapeXml = (value) =>
  String(value).replace(
    /[<>&'"]/g,
    (c) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        "'": '&apos;',
        '"': '&quot;'
      })[c]
  );

function toXml(urls) {
  const body = urls
    .map(
      ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export async function getServerSideProps({ res }) {
  let livePosts = [];
  try {
    livePosts = await getAllPostsForBlog();
  } catch (error) {
    console.warn('Sitemap: live post fetch failed:', error.message);
  }

  const blogUrls = livePosts.map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: safeISO(post.updatedAt) || safeISO(post.date),
    changefreq: 'monthly',
    priority: '0.8'
  }));

  // Union, live entry wins: the snapshot only fills gaps left by a failed or
  // partial fetch, and never resurrects a URL the live list has dropped
  // unless that fetch returned nothing at all.
  const byLoc = new Map();
  const seed = blogUrls.length
    ? [...sitemapData.static, ...blogUrls]
    : [...sitemapData.static, ...sitemapData.blogSnapshot];
  seed.forEach((url) => byLoc.set(url.loc, url));

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
  );
  res.write(toXml([...byLoc.values()]));
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
