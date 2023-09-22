import Link from 'next/link';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';

export default function NotFound() {
  return (
    <Container>
      <NextSeo
        title="404 – mhrsntrk"
        canonical="https://mhrsntrk.com/404"
        openGraph={{
          url: 'https://mhrsntrk.com/404',
          title: '404 – mhrsntrk'
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          404 – Not Found Not or Available Anymore
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          It seems you've found something that used to exist, or you spelled
          something wrong. I'm guessing you spelled something wrong. Can you
          double check that URL?
        </p>
        <Link href="/" className="w-64 p-1 mx-auto font-bold text-center text-black bg-gray-100 rounded-md sm:p-4 dark:bg-gray-900 dark:text-white">
            Return Home
        </Link>
      </div>
    </Container>
  );
}
