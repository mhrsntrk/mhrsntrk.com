import '@/styles/global.css';
import Analytics from '@/lib/analytics';

import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

import SEO from '../next-seo.config';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableColorScheme={true}
    >
      <Analytics />
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
