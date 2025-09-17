const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');

// Import the Strapi functions
const { getAllPostsForBlog } = require('../lib/strapi');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'pages/*.js',
    'data/**/*.mdx',
    '!pages/_*.js',
    '!pages/api',
    '!pages/404.js' // Exclude 404 page
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
                const route = path === '/index' ? '' : path;

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

                return `
                        <url>
                            <loc>${`https://mhrsntrk.com${route}`}</loc>
                            <lastmod>${new Date().toISOString()}</lastmod>
                            <changefreq>${changefreq}</changefreq>
                            <priority>${priority}</priority>
                        </url>
                    `;
              })
              .join('')}
            ${blogPosts
              .map((post) => {
                return `
                        <url>
                            <loc>${`https://mhrsntrk.com/blog/${post.slug}`}</loc>
                            <lastmod>${post.date ? new Date(post.date).toISOString() : new Date().toISOString()}</lastmod>
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
