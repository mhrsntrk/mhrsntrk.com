module.exports = {
  async redirects() {
    return [
      {
        source: '/podcasts',
        destination: '/speaking',
        permanent: true
      },
      // Consolidated posts. Each source duplicated its destination's topic and
      // split the ranking signal with it: the KYA explainer was a strict
      // subset of the canonical definition (same section structure, no FAQ),
      // and the old Raspberry Pi post covered what the 2026 tunnel guide
      // covers in a quarter of the depth. Both are unpublished in Strapi; the
      // redirects keep every inbound link and cross-reference working.
      {
        source: '/blog/what-is-know-your-agent-kya',
        destination: '/blog/know-your-agent-kya',
        permanent: true
      },
      {
        source: '/blog/raspberry-pi-cloudflare',
        destination:
          '/blog/secure-remote-access-to-your-raspberry-pi-in-2025-updated-cloudflare-tunnel-guide',
        permanent: true
      },
      // Their machine-readable markdown twins follow the same consolidation.
      {
        source: '/blog/what-is-know-your-agent-kya.md',
        destination: '/blog/know-your-agent-kya.md',
        permanent: true
      },
      {
        source: '/blog/raspberry-pi-cloudflare.md',
        destination:
          '/blog/secure-remote-access-to-your-raspberry-pi-in-2025-updated-cloudflare-tunnel-guide.md',
        permanent: true
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/api-catalog',
        destination: '/api/.well-known/api-catalog'
      },
      {
        source: '/llms-full.txt',
        destination: '/api/llms-full'
      },
      {
        source: '/rss.xml',
        destination: '/api/rss.xml'
      },
      // Raw .md URLs. Static files (public/blog/<slug>.md, public/blog.md) are
      // baked at build and served directly; these afterFiles rewrites are the
      // runtime fallback (e.g. a post published between rebuilds).
      {
        source: '/blog/:slug.md',
        destination: '/api/markdown/blog/:slug'
      },
      {
        source: '/blog.md',
        destination: '/api/markdown'
      },
      // Reports are published as static HTML: the authored document with the
      // reader controls appended at build time (scripts/generate-report-
      // artifacts.js). Serving the file itself, rather than rendering it
      // through a React page, is what makes the full text indexable at the
      // canonical URL. This runs afterFiles, so /reports (the index page),
      // /reports/rss.xml and /reports/<slug>.md all still win.
      {
        source: '/reports/:slug',
        destination: '/reports/:slug/index.html'
      }
    ];
  },
  images: {
    domains: ['api.qrserver.com', 'mhrsntrk.com', 'images.mhrsntrk.com'], // QR Code and own domain
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**'
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/uploads/**'
      }
    ],
    formats: ['image/avif', 'image/webp'], // AVIF first for better compression
    minimumCacheTTL: 31536000, // 1 year cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 500, 750, 1000], // Added more sizes for gallery
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    unoptimized: false
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  swcMinify: true,
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      // The sitemap is served from pages/sitemap.xml.js; its build-time data
      // is written by scripts/generate-sitemap-data.js, before next build.
      require('./scripts/generate-blog-artifacts');
      require('./scripts/generate-report-artifacts');
    }

    // Simple bundle optimization
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      };
    }

    return config;
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</.well-known/api-catalog>; rel="api-catalog"'
          },
          {
            key: 'Link',
            value: '</llms.txt>; rel="service-doc"'
          },
          {
            key: 'Link',
            value: '</llms-full.txt>; rel="service-doc"; type="text/plain"'
          },
          {
            key: 'Link',
            value: '</api/markdown>; rel="service-desc"; type="text/markdown"'
          },
          {
            key: 'Link',
            value: '</rss.xml>; rel="alternate"'
          },
          {
            key: 'Link',
            value: '</.well-known/did.json>; rel="describedby"'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ]
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        // The as-authored copy of a report, kept for anyone who wants to diff
        // what was published against what was written. It is the same content
        // as /reports/<slug>, so keep it out of the index and let the
        // canonical URL carry the report on its own.
        //
        // Both paths are listed because Vercel's clean URLs 308 the .html away
        // (/source.html -> /source) and headers matched on the pre-redirect
        // path do not carry over to the destination. Matching only the .html
        // form left the served copy indexable in production while looking
        // correct locally, where no such redirect happens.
        source: '/reports/:slug/source.html',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, follow'
          }
        ]
      },
      {
        source: '/reports/:slug/source',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, follow'
          }
        ]
      },
      // Machine-readable mirrors of pages that already exist in HTML: the
      // markdown copies of posts and reports, the llms.txt surfaces and the
      // plain-text report bundle. They are for agents and answer engines, not
      // for the index — left indexable a crawler treats each one as a page in
      // its own right, and reports it as a page with no title, no description
      // and no outgoing links, because that is exactly what a .md file is.
      // noindex, follow: keep them fetchable, keep the links live, keep them
      // out of the SERP where the HTML page is the canonical surface.
      {
        source: '/:path*\\.md',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }]
      },
      {
        source: '/llms.txt',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }]
      },
      {
        source: '/llms-full.txt',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }]
      },
      {
        source: '/reports-full.txt',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }]
      },
      {
        source: '/api/markdown/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }]
      },
      {
        source: '/api/llms-full',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600'
          }
        ]
      },
      {
        source:
          '/:path*\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/uploads/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      }
    ];
  }
};
