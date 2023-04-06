import Document, { Html, Head, Main, NextScript } from 'next/document';
//import GoogleFonts from 'next-google-fonts';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
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
          <meta content="#ffffff" name="theme-color" />
          <meta content="#ffffff" name="msapplication-TileColor" />
          <meta
            content="/static/favicons/browserconfig.xml"
            name="msapplication-config"
          />
          <script
            async
            src="https://ackee.dev.mhrsntrk.com/tracker.js"
            data-ackee-server="https://ackee.dev.mhrsntrk.com"
            data-ackee-domain-id="d96a1f11-3fc7-4e41-96fa-52fea4b8c6df"
          ></script>
        </Head>
        <body className="text-white bg-white dark:bg-black dark:text-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
