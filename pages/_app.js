import '@/styles/global.css';

// import { Provider } from 'next-auth/client';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

import SEO from '../next-seo.config';

export default function App({ Component, pageProps }) {
  // const { session } = pageProps
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      {/* <Provider session={session}> */}
        <Component {...pageProps} />
      {/* </Provider> */}
    </ThemeProvider>
  );
}
