import '@/styles/global.css';

import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import localFont from '@next/font/local';

import SEO from '../next-seo.config';

const sofia = localFont({
  src: '../public/fonts/MostardesignSofiaProRegular.woff2',
  variable: '--font-sofia',
});

function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <main className={`${sofia.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
