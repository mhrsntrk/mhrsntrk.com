import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import SwissKnifeCard from '@/components/SwissKnifeCard';
import NextLink from 'next/link';

import { getAllPostsForHome } from '@/lib/strapi';

export default function Home({ allPosts }) {
  return (
    <Container>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold text-black md:text-5xl dark:text-white">
          Hello world!
        </h1>
        <h2 className="mb-16 text-gray-600 dark:text-gray-400">
          I'm an electrical and electronics engineer, full-stack developer and entrepreneur. I
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
          . I try to collect my ideas, projects, code snippets in this website. Currently, I am working as a Product Owner at Energy Web Foundation.
        </h2>
        <NextLink href="/blog">
          <a className="mb-4 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            <h3>
              Recent Posts <p className="inline text-3xl font-normal">↴</p>
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
          <a className="mb-4 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            <h3>Swiss Knife</h3>
          </a>
        </NextLink>
        <SwissKnifeCard
            title="Starmap Generator"
            description="A tool for creating customized starmaps. Login required in order to use that tool."
            href="https://starmap.mhrsntrk.com"
            icon="starmap"
            width="60"
            height="60"
          />
          <SwissKnifeCard
            title="qroxy - Dynamic QR Code Tool"
            description="You can generate and update dynamic QR codes using the connected REST API and mongoDB"
            href="swissknife/qroxy"
            icon="qrcode"
            width="90"
            height="90"
          />
          <SwissKnifeCard
          title="Crypto Ticker"
          description="You can find the cryptocurrencies that
          I currently follow and hold on the page."
          href="swissknife/crypto"
          icon="crypto"
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
