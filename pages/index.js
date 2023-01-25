import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import SwissKnifeCard from '@/components/SwissKnifeCard';
import PodcastCard from '@/components/PodcastCard';
import CourseCard from '@/components/CourseCard';
import NextLink from 'next/link';

import { getAllPostsForHome } from '@/lib/strapi';

export default function Home({ allPosts }) {
  return (
    <Container>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-5xl font-bold text-black md:text-6xl dark:text-white">
          hello, world.
        </h1>
        <h2 className="mb-4 text-gray-600 dark:text-gray-400">
          I work as Senior Product Manager at{' '}
          <a
            href="https://energyweb.org"
            target="_blank"
            className="hover:underline"
          >
            Energy Web Foundation
          </a>
          . I have B.Sc. in Electrical and Electronics Engineering and Master of
          Business Administration degrees. Currently, I am managing Self
          Sovereign Identity (SSI) product on Energy Web Chain. Before joining
          the Energy Web Foundation team, I co-founded and managed several
          startups in Turkey.
        </h2>
        <h2 className="mb-10 text-gray-600 dark:text-gray-400">
          You can contact me via my{' '}
          <a href="/contact" target="_blank" className="hover:underline">
            contact page
          </a>
          .
        </h2>
        <NextLink href="/blog">
          <a className="flex mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            <h3 className="hover:underline">Recent Posts </h3>
          </a>
        </NextLink>

        {allPosts.map((post) => (
          <BlogPost
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
          />
        ))}
        <NextLink href="/podcasts">
          <a className="flex mt-2 mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            <h3 className="hover:underline">Podcasts </h3>
          </a>
        </NextLink>
        <PodcastCard
          title="Üretim Bandı Podcast"
          description="Blokzincir günden güne hayatımızda ve teknolojide daha farklı alanlarda yer buluyor. Üretim Bandı Podcast'in bu bölümünde Mahir Şentürk ile Energy Web'i keşfediyoruz."
          href="https://uretimbandi.com/podcast/mahir-senturk-energy-web-blockchainle-enerji-problemini-cozmek/"
          icon="uretimbandi"
          width="120"
          height="120"
        />
        <NextLink href="/">
          <a className="flex mt-2 mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            <h3 className="hover:underline">Courses </h3>
          </a>
        </NextLink>
        <CourseCard
        title="PM'ler için web3'e Giriş"
        description="Bu eğitimle Web3'e geçiş yapmak isteyen ürün yöneticisi, pazarlama, iş geliştirme ve benzeri pozisyonlarda çalışanları bu yeni dünyaya hazırlıyoruz."
        href="https://www.brick.institute/product/pmler-icin-web3e-giris"
        icon="brickinstitute"
        width="250"
        height="250"
        />
        <NextLink href="/swissknife">
          <a className="flex mt-8 mb-6 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            <h3 className="hover:underline">Swiss Knife </h3>
          </a>
        </NextLink>
        <SwissKnifeCard
          title="Starmap Generator"
          description="A tool for creating customized starmap prints. Login required in order to use the tool, you can contact me for the inquiries."
          href="https://starmap.mhrsntrk.com"
          icon="starmap"
          width="100"
          height="100"
        />
        <SwissKnifeCard
          title="DID Resolver"
          description="You can use this tool to fetch the Decentralized Identifier (DID) document of the given DID. Currently supported methods are did:web and did:ethr (including Energy Web Chain)."
          href="swissknife/did-resolver"
          icon="fingerprint"
          width="160"
          height="160"
        />
        <SwissKnifeCard
          title="qroxy - Dynamic QR Code Tool"
          description="You can generate and update dynamic QR codes using the connected REST API and mongoDB. I collect personal information in order to use the tool."
          href="swissknife/qroxy"
          icon="qrcode"
          width="110"
          height="110"
        />
        <SwissKnifeCard
          title="ENS Resolver"
          description="You can use this tool to resolve an Ethereum Name Service (ENS)
            domain."
          href="swissknife/ens-resolver"
          icon="ens"
          width="70"
          height="70"
        />
        <SwissKnifeCard
          title="Crypto Ticker"
          description="You can find the cryptocurrencies that I currently follow and hold on the page."
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
