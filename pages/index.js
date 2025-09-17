import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import SwissKnifeCard from '@/components/SwissKnifeCard';
import PodcastCard from '@/components/PodcastCard';
import ContactCard from '@/components/ContactCard';
import ContactInfo from '@/components/ContactInfo';
import Link from 'next/link';

import { getAllPostsForHome } from '@/lib/strapi';

export default function Home({ allPosts }) {
  return (
    <Container>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-4xl font-bold text-black md:text-6xl dark:text-white">
          hello, world.
        </h1>
        <h2 className="mb-4 text-gray-600 dark:text-gray-400">
          As a Senior Product Manager at The Hashgraph Group, I blend technical expertise with strategic vision, leveraging my B.Sc. in Electrical and Electronics Engineering and MBA. My career in technology is driven by a passion for innovation and impactful leadership, with a particular focus on self-sovereign identity (SSI) solutions.
        </h2>
        <h2 className="mb-4 text-gray-600 dark:text-gray-400">
          Having worked extensively in the SSI field, I've developed deep knowledge and practical experience implementing decentralized identity systems. During my time at Energy Web, I led the development of Switchboard, one of the pioneering SSI systems in the industry, while also spearheading ecosystem products that integrated web3 technologies into the energy sector.
        </h2>
        <h2 className="mb-4 text-gray-600 dark:text-gray-400">
          Now at The Hashgraph Group, I'm at the forefront of building a comprehensive self-sovereign identity system on Hedera. This role allows me to apply my knowledge of distributed ledger technology and my entrepreneurial background to push the boundaries of blockchain applications.
        </h2>
        <h2 className="mb-8 text-gray-600 dark:text-gray-400">
          My work spans the intersection of blockchain, digital identity, and enterprise solutions, positioning me to contribute meaningfully to the advancement of decentralized technologies and their real-world implementations.
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
        <div id="contact">
          <Link
            href="#contact"
            className="flex mt-8 mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white"
          >
            <h3 className="hover:underline">Contact me</h3>
          </Link>
          <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
            <ContactInfo
              icon="linkedin"
              title="Linkedin"
              href="https://www.linkedin.com/in/mahirsenturk"
            />
            <ContactInfo
              icon="github"
              title="Github"
              href="https://github.com/mhrsntrk"
            />
          </div>
          <div className="grid w-full grid-cols-1 gap-4 my-2 mb-4 sm:grid-cols-2">
            <ContactInfo
              icon="twitter"
              title="Twitter"
              href="https://twitter.com/mhrsntrk"
            />
            <ContactInfo icon="telegram" title="Telegram" href="https://t.me/mhrsntrk" />
          </div>
          <div className="grid w-full grid-cols-1 gap-0 mb-6 sm:gap-4 sm:grid-cols-2">
            <ContactCard
              title="Meet me!"
              description="You can use this link to book a meeting with me at the time you choose."
              href="https://cal.com/mhrsntrk"
            />
            <ContactCard
              title="Drop me an email!"
              description="m@mhrsntrk.com"
              href="mailto:m@mhrsntrk.com?subject=Website Contact"
            />
          </div>
        </div>
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
