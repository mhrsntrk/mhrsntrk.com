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
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
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
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <SwissKnifeCard
            title="Crypto Ticker"
            description="You can find the cryptocurrencies that
          I currently follow and hold on the page."
            href="swissknife/crypto"
            icon="crypto"
            width="120"
            height="120"
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
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
        <SwissKnifeCard
            title="Kutt.it Link Shortener"
            description="Kutt is a modern URL shortener. You can try the API under my domain on the page."
            href="swissknife/kutt"
            icon="kutt"
            width="150"
            height="150"
          />
          <SwissKnifeCard
            title="QR Code Generator"
            description="You can create QR code graphics easily with goqr.me's API."
            href="swissknife/qrcode"
            icon="qrcode"
            width="90"
            height="90"
          />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <SwissKnifeCard
            title="Authentication"
            description="Magic link authentication example with next-auth library."
            href="swissknife/auth"
            icon="auth"
            width="100"
            height="100"
          />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full"></div>
      </div>
    </Container>
  );
}
