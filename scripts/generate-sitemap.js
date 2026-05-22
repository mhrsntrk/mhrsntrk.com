const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');

// Import the Strapi functions
const { getAllPostsForBlog } = require('../lib/strapi');

// Returns a valid ISO string for a parseable date, or null.
function safeISO(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'pages/*.js',
    'pages/swissknife/*.js',
    'data/**/*.mdx',
    '!pages/_*.js',
    '!pages/api',
    '!pages/404.js', // Exclude 404 page
    '!pages/**/[[]*[]].js' // Exclude dynamic routes like [slug].js
  ]);

  // Get blog posts
  let blogPosts = [];
  try {
    blogPosts = await getAllPostsForBlog();
  } catch (error) {
    console.warn('Could not fetch blog posts for sitemap:', error.message);
  }

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('pages', '')
                  .replace('data', '')
                  .replace('.js', '')
                  .replace('.mdx', '');
                const route =
                  path === '/index' ? '' : path.replace(/\/index$/, '');

                // Set priority and changefreq based on page type
                let priority = '0.8';
                let changefreq = 'monthly';
                
                if (route === '' || route === '/') {
                  priority = '1.0';
                  changefreq = 'weekly';
                } else if (route === '/blog') {
                  priority = '0.9';
                  changefreq = 'weekly';
                } else if (route.includes('/swissknife')) {
                  priority = '0.7';
                  changefreq = 'monthly';
                }

                // No <lastmod> for static pages: it has no real change date,
                // and emitting build time churns the value on every deploy,
                // which trains crawlers to ignore lastmod site-wide.
                return `
                        <url>
                            <loc>${`https://mhrsntrk.com${route}`}</loc>
                            <changefreq>${changefreq}</changefreq>
                            <priority>${priority}</priority>
                        </url>
                    `;
              })
              .join('')}
            ${blogPosts
              .map((post) => {
                const lastmod =
                  safeISO(post.updatedAt) || safeISO(post.date);
                return `
                        <url>
                            <loc>${`https://mhrsntrk.com/blog/${post.slug}`}</loc>
                            ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
                            <changefreq>monthly</changefreq>
                            <priority>0.8</priority>
                        </url>
                    `;
              })
              .join('')}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted);
  console.log('Sitemap generated successfully with', blogPosts.length, 'blog posts');
})();
