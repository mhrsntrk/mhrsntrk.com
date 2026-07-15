import React from 'react';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import SwissKnifeCard from '@/components/SwissKnifeCard';

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
        title="Swiss Knife – mhrsntrk"
        canonical="https://mhrsntrk.com/swissknife"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife',
          title: 'Swiss Knife – mhrsntrk',
          description: `You can find the collection of my past projects below. I add what I
          learn in the building stage to this page to test them. I also write
          blog posts how to use and how to implement them on my blog.`
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
            <a href="/blog" className="hover:underline">
              blog
            </a>
            .
          </p>
        </div>
        <SwissKnifeCategory title="iOS Apps" />
        <div className="grid w-full grid-cols-1 gap-4 my-2 ">
          <SwissKnifeCard
            title="Bino — Kids Safe Image Search"
            description="A native iOS app for kids ages 4–9: a safe, Camera Roll-style image browser with SafeSearch permanently enforced. Tap to view on the App Store."
            href="https://apps.apple.com/us/app/bino-kids-safe-image-search/id6764813350"
            icon="bino"
            target="_blank"
            width="120"
            height="120"
          />
          <SwissKnifeCard
            title="Bino — Kids Read Along"
            description="An iPad app for young bilingual readers ages 6–8: photograph a page of your own book, tap any printed word to hear it, and sound out hard words syllable by syllable. On-device OCR and speech, nothing uploaded. Tap to view on the App Store."
            href="https://apps.apple.com/us/app/bino-kids-read-along/id6788398289"
            icon="bino-reader"
            target="_blank"
            width="120"
            height="120"
          />
          <SwissKnifeCard
            title="Light Wallet — SSI Developer Wallet"
            description="A free iOS wallet for SSI developers: OID4VCI 1.0 and OID4VP 1.0 with dc+sd-jwt, did:key, and a live protocol trace that hides nothing. Tap to view on the App Store."
            href="https://apps.apple.com/app/id6755690506"
            icon="lightwallet"
            target="_blank"
            width="120"
            height="120"
          />
        </div>

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
            title="Starmap Generator"
            description="A tool for creating customized starmaps. Login required."
            href="https://starmap.mhrsntrk.com"
            icon="starmap"
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
