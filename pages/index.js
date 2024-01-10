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
        As Principal Product Manager at{' '}
          <a
            href="https://energyweb.org"
            target="_blank"
            className="hover:underline"
          >
            Energy Web
          </a>
          , I bring a dynamic blend of technical expertise and strategic business knowledge, backed by B.Sc. in Electrical and Electronics Engineering and MBA degrees. My journey in the tech and energy sectors has been marked by a passion for innovation and community engagement. Currently, I am managing {' '}
          <a
            href="https://energywebx.com"
            target="_blank"
            className="hover:underline"
          >
            EWX
          </a> ecosystem products, focusing on our "Marketplace" and "SaaS offerings", driving forward the integration of web3 technology in the energy sector. My prior experience includes co-founding and leading various startups in Turkey, where I developed and refined my skills in creating and running technology-driven businesses. At Energy Web, I continue to leverage these skills to foster growth and sustainability in the ever-evolving landscape of web3 solutions.
        </h2>
        <h2 className="mb-10 text-gray-600 dark:text-gray-400">
          You can contact me via the{' '}
          <a href="/contact" target="_blank" className="hover:underline">
            contact page
          </a>
          .
        </h2>
        <Link href="/blog" className="flex mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            <h3 className="hover:underline">Recent Posts </h3>
        </Link>

        {allPosts.map((post) => (
          <BlogPost
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
          />
        ))}
        <Link href="/podcasts" className="flex mt-2 mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            <h3 className="hover:underline">Podcasts </h3>
        </Link>
        <PodcastCard
          title="Üretim Bandı Podcast"
          description="Blokzinciri günden güne hayatımızda ve teknolojide daha farklı alanlarda yer buluyor. Üretim Bandı Podcast'in bu bölümünde, Mahir Şentürk ile Energy Web'i keşfediyoruz."
          href="https://uretimbandi.com/podcast/mahir-senturk-energy-web-blockchainle-enerji-problemini-cozmek/"
          icon="uretimbandi"
          width="120"
          height="120"
        />
        <PodcastCard
          title="Üretim Bandı Podcast"
          description="Mahir Şentürk ile birlikte eDevlet blokzincirinde olsaydı nasıl bir yapıda olurdu ve Self Sovereign Identity (Öz Kimlik) nedir konularını konuştuk."
          href="https://uretimbandi.com/podcast/mahir-senturk-edevlet-blokzincirinde-olsaydi/"
          icon="uretimbandi"
          width="120"
          height="120"
        />
        <Link href="/swissknife" className="flex mt-8 mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            <h3 className="hover:underline">Swiss Knife </h3>
        </Link>
        <SwissKnifeCard
          title="Starmap Generator"
          description="A tool for creating customized starmap prints. Login required in order to use the tool, you can contact me for the inquiries."
          href="https://starmap.mhrsntrk.com"
          icon="starmap"
          width="120"
          height="120"
        />
        <SwissKnifeCard
          title="DID Resolver"
          description="You can use this tool to fetch the Decentralized Identifier (DID) document of the given DID. Currently supported methods are did:web and did:ethr (including Energy Web Chain)."
          href="swissknife/did-resolver"
          icon="fingerprint"
          width="120"
          height="120"
        />
        <SwissKnifeCard
          title="qroxy - Dynamic QR Code Tool"
          description="You can generate and update dynamic QR codes using the connected REST API and mongoDB. I collect personal information in order to use the tool, to prevent spamming."
          href="swissknife/qroxy"
          icon="qrcode"
          width="120"
          height="120"
        />
        <SwissKnifeCard
          title="ENS Resolver"
          description="You can use this tool to resolve an Ethereum Name Service (ENS)
            domain."
          href="swissknife/ens-resolver"
          icon="ens"
          width="120"
          height="120"
        />
        <SwissKnifeCard
          title="Crypto Ticker"
          description="You can find the cryptocurrencies that I currently follow and hold on the page."
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
