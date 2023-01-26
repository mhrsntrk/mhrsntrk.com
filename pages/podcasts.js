import React from 'react';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import PodcastCard from '@/components/PodcastCard';

export default function Podcast() {
  return (
    <Container>
      <NextSeo
        title="Podcast – mhrsntrk"
        canonical="https://mhrsntrk.com/swissknife"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife',
          title: 'Podcast – mhrsntrk',
          description: `You can find the collection of the podcasts and streams that I joined as a guest. I mostly talk about web3, self-sovereign identity and energy markets.`
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Podcasts
        </h1>
        <div className="mb-16">
          <p className="text-gray-600 dark:text-gray-400">
            You can find the collection of the podcasts and streams that I joined as a guest. I mostly talk about web3, self-sovereign identity and energy markets.
          </p>
        </div>
        <div className="w-full">
          <PodcastCard
            title="Üretim Bandı Podcast"
            description="Blokzincir günden güne hayatımızda ve teknolojide daha farklı alanlarda yer buluyor. Üretim Bandı Podcast'in bu bölümünde Mahir Şentürk ile Energy Web'i keşfediyoruz."
            href="https://uretimbandi.com/podcast/mahir-senturk-energy-web-blockchainle-enerji-problemini-cozmek/"
            icon="uretimbandi"
            width="120"
            height="120"
          />
          <PodcastCard
            title="Üretim Bandı Podcast"
            description="Mahir Şentürk ile birlikte eDevlet Blokzincirinde Olsaydı nasıl bir yapıda olurdu, Self Sovereign Identity (Öz Kimlik) nedir konuştuk."
            href="https://uretimbandi.com/podcast/mahir-senturk-edevlet-blokzincirinde-olsaydi/"
            icon="uretimbandi"
            width="120"
            height="120"
          />
        </div>
      </div>
    </Container>
  );
}