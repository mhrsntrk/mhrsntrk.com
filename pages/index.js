import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import SwissKnifeCard from '@/components/SwissKnifeCard';
import PodcastCard from '@/components/PodcastCard';
import Link from 'next/link';

import { getAllPostsForHome } from '@/lib/strapi';

export default function Home({ allPosts }) {
  return (
    <Container>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-5xl font-bold text-black md:text-6xl dark:text-white">
          hello, world.
        </h1>
        <h2 className="mb-4 text-gray-600 dark:text-gray-400">
          As the Sr. Project Manager at{' '}
          <a
            href="https://hashgraph-association.com/"
            target="_blank"
            className="hover:underline"
          >
            The Hashgraph Association
          </a>
          , I bring a fusion of technical prowess and strategic insight,
          grounded in a B.Sc. in Electrical and Electronics Engineering and an
          MBA. My career in tech and energy is driven by a dedication to
          innovation and impactful leadership. Previously at{' '}
          <a
            href="https://energyweb.org"
            target="_blank"
            className="hover:underline"
          >
            Energy Web
          </a>
          , I led the development of key ecosystem products, integrating web3
          technologies into the energy sector. Now, at The Hashgraph
          Association, I'm excited to steer groundbreaking projects in
          distributed ledger technology, building on my experience as a tech
          entrepreneur to advance the blockchain industry.
        </h2>
        <h2 className="mb-10 text-gray-600 dark:text-gray-400">
          You can contact me via the{' '}
          <a href="/contact" target="_blank" className="hover:underline">
            contact page
          </a>
          .
        </h2>
        <Link
          href="/blog"
          className="flex mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white"
        >
          <h3 className="hover:underline">Recent Posts </h3>
        </Link>

        {allPosts.map((post) => (
          <BlogPost
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
          />
        ))}
        <Link
          href="/podcasts"
          className="flex mt-2 mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white"
        >
          <h3 className="hover:underline">Podcasts </h3>
        </Link>
        <PodcastCard
          title="Üretim Bandı Podcast"
          description="Bu bölümde, Mahir Senturk ile birlikte Energy Web'i keşfediyoruz."
          href="https://uretimbandi.com/podcast/mahir-senturk-energy-web-blockchainle-enerji-problemini-cozmek/"
          icon="uretimbandi"
          width="120"
          height="120"
        />
        <PodcastCard
          title="Üretim Bandı Podcast"
          description="Mahir Senturk ile birlikte Self Sovereign Identity (Öz Kimlik) konusunu konuştuk."
          href="https://uretimbandi.com/podcast/mahir-senturk-edevlet-blokzincirinde-olsaydi/"
          icon="uretimbandi"
          width="120"
          height="120"
        />
        <Link
          href="/swissknife"
          className="flex mt-8 mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white"
        >
          <h3 className="hover:underline">Swiss Knife </h3>
        </Link>
        <SwissKnifeCard
          title="Starmap Generator"
          description="A tool for creating customized starmap prints. Login required."
          href="https://starmap.mhrsntrk.com"
          icon="starmap"
          width="120"
          height="120"
        />
        <SwissKnifeCard
          title="DID Resolver"
          description="This tool will allow you to fetch the DID document of the given a DID."
          href="swissknife/did-resolver"
          icon="fingerprint"
          width="120"
          height="120"
        />
        <SwissKnifeCard
          title="qroxy - Dynamic QR Code Tool"
          description="Create dynamic QR codes using the connected REST API and mongoDB"
          href="swissknife/qroxy"
          icon="qrcode"
          width="120"
          height="120"
        />
        <SwissKnifeCard
          title="ENS Resolver"
          description="This tool will allow you to resolve an Ethereum Name Service (ENS) domain."
          href="swissknife/ens-resolver"
          icon="ens"
          width="120"
          height="120"
        />
        <SwissKnifeCard
          title="Crypto Ticker"
          description="View the cryptocurrencies that I currently track on this page."
          href="swissknife/crypto"
          icon="crypto"
          width="120"
          height="120"
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
