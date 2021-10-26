import React from 'react';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import SwissKnifeCard from '@/components/SwissKnifeCard';

export default function SwissKnife() {
  return (
    <Container>
      <NextSeo
        title="Swiss Knife – mhrsntrk"
        canonical="https://mhrsntrk.com/swissknife"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife',
          title: 'Swiss Knife – mhrsntrk',
          description: ``
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Swiss Knife
        </h1>
        <div className="mb-16">
          <p className="text-gray-600 dark:text-gray-400">
            You can find my collection of implemented API's and features below.
            I try to add what I learn to this page to test them. I also write
            blog posts how to use and how to implement them on my{' '}
            <a href="/blog" className="hover:underline">
              blog
            </a>
            .
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <SwissKnifeCard
            title="qroxy"
            description="Create dynamic QR codes using the connected REST API and mongoDB"
            href="swissknife/qroxy"
            icon="qrcode"
            width="90"
            height="90"
          />
          <SwissKnifeCard
            title="Starmap Generator"
            description="A tool for creating customized starmaps. Login required."
            href="https://starmap.mhrsntrk.com"
            icon="starmap"
            width="100"
            height="100"
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <SwissKnifeCard
            title="Kutt.it Link Shortener"
            description="Kutt is a modern URL shortener. You can try the API under my domain on the page."
            href="swissknife/kutt"
            icon="kutt"
            width="150"
            height="150"
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
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2"></div>
      </div>
    </Container>
  );
}
