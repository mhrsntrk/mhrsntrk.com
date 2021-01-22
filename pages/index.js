import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import SwissKnifeCard from '@/components/SwissKnifeCard';
import NextLink from 'next/link';

import { getAllPostsForHome } from '@/lib/strapi';

export default function Home({ allPosts }) {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl mb-4 text-black dark:text-white">
          Hello world!
        </h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          I'm an electronics engineer, full-stack developer and entrepreneur. I
          own several start-ups{' '}
          <a
            href="https://mapinsky.com"
            target="_blank"
            className="hover:underline"
          >
            mapinsky
          </a>
          ,{' '}
          <a
            href="https://efervesan.com"
            target="_blank"
            className="hover:underline"
          >
            efervesan
          </a>
          ,{' '}
          <a
            href="https://mormu.com"
            target="_blank"
            className="hover:underline"
          >
            mormu
          </a>{' '}
          and{' '}
          <a
            href="http://alist.com.tr"
            target="_blank"
            className="hover:underline"
          >
            alist
          </a>
          . I try to collect my ideas, projects, code snippets in this website.
        </h2>
        <NextLink href="/blog">
          <a className="font-bold text-3xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
            <h3>
              Recent Posts <p className="font-normal text-3xl inline">↴</p>
            </h3>
          </a>
        </NextLink>

        {allPosts.map((post) => (
          <BlogPost
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
          />
        ))}
        <NextLink href="/swissknife">
          <a className="font-bold text-3xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
            <h3>Swiss Knife</h3>
          </a>
        </NextLink>
        <SwissKnifeCard
          title="Crypto Ticker"
          description="You can find the cryptocurrencies that
          I currently follow and hold on the page."
          href="swissknife/crypto"
          icon="crypto"
          width="60"
          height="60"
        />
        <SwissKnifeCard
          title="Kutt.it Link Shortener"
          description="Kutt is a modern URL shortener. You can try the API under my domain on the page."
          href="swissknife/kutt"
          icon="kutt"
          width="60"
          height="60"
        />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPostsForHome();
  return {
    props: { allPosts }
  };
}
