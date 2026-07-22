import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preconnect to external domains for faster loading */}
          <link rel="preconnect" href="https://use.typekit.net" />
          <link rel="preconnect" href="https://umami.dev.mhrsntrk.com" />
          <link rel="preconnect" href="https://res.cloudinary.com" />
          <link rel="preconnect" href="https://api.qrserver.com" />

          {/* DNS prefetch for additional performance */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//fonts.gstatic.com" />

          <link rel="stylesheet" href="https://use.typekit.net/wjs2wtl.css" />

          {/* Reports are a separate content type with their own feed, so it is
              discoverable site-wide rather than only from /reports. The blog
              feed is declared in next-seo.config.js. */}
          <link
            rel="alternate"
            type="application/rss+xml"
            title="mhrsntrk Reports"
            href="https://mhrsntrk.com/reports/rss.xml"
          />

          <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
          <link href="/static/favicons/site.webmanifest" rel="manifest" />
          <link
            href="/static/favicons/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/static/favicons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/static/favicons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link
            color="#ff6900"
            href="/static/favicons/safari-pinned-tab.svg"
            rel="mask-icon"
          />
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta
            content="#ffffff"
            name="theme-color"
            media="(prefers-color-scheme: light)"
          />
          <meta
            content="#000000"
            name="theme-color"
            media="(prefers-color-scheme: dark)"
          />
          <meta content="#ffffff" name="msapplication-TileColor" />
          <meta
            content="/static/favicons/browserconfig.xml"
            name="msapplication-config"
          />
        </Head>
        <body className="text-white bg-white dark:bg-black dark:text-black tk-lores-9-plus-narrow">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Skip to main content
          </a>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
