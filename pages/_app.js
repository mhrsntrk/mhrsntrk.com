import '@/styles/global.css';

import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

import SEO from '../next-seo.config';

function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const asciiArt = `
 __   __  __   __  ______    _______  __    _  _______  ______    ___   _ 
|  |_|  ||  | |  ||    _ |  |       ||  |  | ||       ||    _ |  |   | | |
|       ||  |_|  ||   | ||  |  _____||   |_| ||_     _||   | ||  |   |_| |
|       ||       ||   |_||_ | |_____ |       |  |   |  |   |_||_ |      _|
|       ||       ||    __  ||_____  ||  _    |  |   |  |    __  ||     |_ 
| ||_|| ||   _   ||   |  | | _____| || | |   |  |   |  |   |  | ||    _  |
|_|   |_||__| |__||___|  |_||_______||_|  |__|  |___|  |___|  |_||___| |_|
      `.trim();

      console.log(asciiArt);
      console.log(
        '%cHey there 👋🏻 Let\'s connect:',
        'color: #ef4444; font-size: 14px; font-weight: bold;'
      );
      console.log(
        '   LinkedIn: https://linkedin.com/in/mahirsenturk'
      );
      console.log(
        '   Twitter: https://x.com/mhrsntrk'
      )
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableColorScheme={true}
    >
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
