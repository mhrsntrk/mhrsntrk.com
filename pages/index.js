import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import SwissKnifeCard from '@/components/SwissKnifeCard';
import NextLink from 'next/link';

import { getAllPostsForHome } from '@/lib/strapi';

export default function Home({ allPosts }) {
  return (
    <Container>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-5xl font-bold text-black md:text-6xl dark:text-white">
          hello, world
        </h1>
        <h2 className="mb-10 text-gray-600 dark:text-gray-400">
          I currently work as a Senior Solution Owner at{' '}
          <a
            href="https://energyweb.org"
            target="_blank"
            className="hover:underline"
          >
            Energy Web Foundation
          </a>
          . I am currently focused on adding new decentralized products and
          services to EW-DOS (Decentralized Operating System) and managing grid
          flexibility projects worldwide. I hold a B.Sc. in Electrical and
          Electronics Engineering and Master of Business Administration degrees.
          Before joining the Energy Web Foundation team, I co-founded and
          managed several startups (i.e.{' '}
          <a
            href="https://mapinsky.com"
            target="_blank"
            className="hover:underline"
          >
            mapinsky
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
          ) in Turkey.
        </h2>
        <NextLink href="/blog">
          <a className="flex mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            <h3 className="hover:underline">Recent Posts </h3>
            <span className="inline ml-2 text-3xl font-normal no-underline">
              ↴
            </span>
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
        <a className="flex mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            <h3 className="hover:underline">Swiss Knife </h3>
            <span className="inline ml-2 text-3xl font-normal no-underline">
              ↴
            </span>
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
