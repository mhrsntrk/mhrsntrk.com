import Link from 'next/link';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';

export default function NotFound() {
  return (
    <Container>
      <NextSeo
        title="404 - Page Not Found | Mahir Senturk"
        description="The page you're looking for doesn't exist. Return to the homepage to explore my work in blockchain and self-sovereign identity."
        noindex={true}
        nofollow={true}
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
        <div className="flex flex-col space-y-4">
          <Link href="/" className="w-64 p-1 mx-auto font-bold text-center text-black bg-gray-100 rounded-md sm:p-4 dark:bg-gray-900 dark:text-white">
            Return Home
          </Link>
          <Link href="/blog" className="w-64 p-1 mx-auto font-bold text-center text-black bg-gray-100 rounded-md sm:p-4 dark:bg-gray-900 dark:text-white">
            📝 Read my blog
          </Link>
          <Link href="/swissknife" className="w-64 p-1 mx-auto font-bold text-center text-black bg-gray-100 rounded-md sm:p-4 dark:bg-gray-900 dark:text-white">
            🔧 Check out my tools
          </Link>
        </div>
      </div>
    </Container>
  );
}
