import React from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import ROBOTS_PROPS from '@/lib/robots';

import Container from '@/components/Container';
import SwissKnifeCard from '@/components/SwissKnifeCard';
import { APPS, appUrl } from '@/lib/apps';

function SwissKnifeCategory({ title }) {
  return (
    <h2 className="w-full pb-2 mt-10 mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-200 dark:border-gray-800 dark:text-gray-500">
      {title}
    </h2>
  );
}

export default function SwissKnife() {
  return (
    <Container>
      <NextSeo
        robotsProps={ROBOTS_PROPS}
        title="Swiss Knife: Tools and Side Projects – mhrsntrk"
        description="The tools and side projects I have built: DID and ENS resolvers, a dynamic QR code generator, a verifiable credential issuer, and the iOS and Mac apps I ship."
        canonical="https://mhrsntrk.com/swissknife"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife',
          title: 'Swiss Knife: Tools and Side Projects – mhrsntrk',
          description:
            'The tools and side projects I have built: DID and ENS resolvers, a dynamic QR code generator, a verifiable credential issuer, and the iOS and Mac apps I ship.'
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Swiss Knife
        </h1>
        <div className="mb-16">
          <p className="text-gray-600 dark:text-gray-400">
            You can find the collection of my past personal projects below. I
            try to add what I learn while I am building to test them on live. I
            also write blog posts about how to use and how to implement them on
            my{' '}
            <Link href="/blog" className="hover:underline">
              blog
            </Link>
            .
          </p>
        </div>
        <SwissKnifeCategory title="iOS Apps" />
        <div className="grid w-full grid-cols-1 gap-4 my-2 ">
          {APPS.filter((a) => a.os !== 'macOS' && !a.os.startsWith('macOS')).map((app) => (
            <SwissKnifeCard
              key={app.slug}
              title={app.storeName}
              description={app.tagline}
              href={appUrl(app)}
              icon={app.cardIcon}
              width="120"
              height="120"
            />
          ))}
        </div>

        <SwissKnifeCategory title="Mac Apps" />
        <div className="grid w-full grid-cols-1 gap-4 my-2 ">
          {APPS.filter((a) => a.os === 'macOS' || a.os.startsWith('macOS')).map((app) => (
            <SwissKnifeCard
              key={app.slug}
              title={app.storeName}
              description={app.tagline}
              href={appUrl(app)}
              icon={app.cardIcon}
              width="120"
              height="120"
            />
          ))}
        </div>
        <p className="w-full mt-4 text-sm text-gray-600 dark:text-gray-400">
          How each app handles your data:{' '}
          <Link href="/apps/privacy" className="hover:underline">
            app privacy policy
          </Link>
          .
        </p>

        <SwissKnifeCategory title="Corpus" />
        <div className="grid w-full grid-cols-1 gap-4 my-2 ">
          <SwissKnifeCard
            title="The Vulgate"
            description="A corpus of vulgar Turkish folk proverbs, catalogued and annotated. Bilingual, unexpurgated, philologically serious. Reader discretion advised."
            href="swissknife/vulgate"
            icon="vulgate"
            width="120"
            height="120"
          />
        </div>

        <SwissKnifeCategory title="Web Tools" />
        <div className="grid w-full grid-cols-1 gap-4 my-2 ">
          <SwissKnifeCard
            title="qroxy"
            description="Create dynamic QR codes using the connected REST API and mongoDB"
            href="swissknife/qroxy"
            icon="qrcode"
            width="120"
            height="120"
          />
          <SwissKnifeCard
            title="Cipher Desk"
            description="Encode and decode Caesar, Vigenere, Atbash, keyword, rail fence, A1Z26 and Morse in the browser, then break them with frequency analysis. Turn the wheel, watch the alphabet map, share a puzzle by link."
            href="swissknife/cipher-desk"
            icon="cipher-desk"
            width="120"
            height="120"
          />
          <SwissKnifeCard
            title="Crypto Ticker"
            description="You can find the cryptocurrencies that
          I currently follow and hold on the page."
            href="swissknife/crypto"
            icon="crypto"
            width="120"
            height="120"
          />
        </div>

        <SwissKnifeCategory title="Identity & Web3" />
        <div className="grid w-full grid-cols-1 gap-4 my-2 ">
          <SwissKnifeCard
            title="Fortune Cookie VC"
            description="Get your fortune cookie Verifiable Credential! Scan the QR code with an OIDC4VCI-compatible wallet to receive a random fortune."
            href="swissknife/fortune-cookie"
            icon="fortune-cookie"
            width="120"
            height="106"
          />
          <SwissKnifeCard
            title="DID Resolver"
            description="You can use this tool to fetch the Decentralized Identifier (DID) document of the given DID."
            href="swissknife/did-resolver"
            icon="fingerprint"
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
        </div>
      </div>
    </Container>
  );
}
