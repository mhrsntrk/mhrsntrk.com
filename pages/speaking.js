import React from 'react';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import PodcastCard from '@/components/PodcastCard';

export default function Speaking() {
  return (
    <Container>
      <NextSeo
        title="Speaking – mhrsntrk"
        canonical="https://mhrsntrk.com/speaking"
        openGraph={{
          url: 'https://mhrsntrk.com/speaking',
          title: 'Speaking – mhrsntrk',
          description: `Conferences, podcasts, and events where I've spoken about web3, self-sovereign identity, and energy markets.`
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Speaking
        </h1>
        <div className="mb-16">
          <p className="text-gray-600 dark:text-gray-400">
            Conferences, podcasts, and events where I've spoken about web3, self-sovereign identity, and energy markets.
          </p>
        </div>
        <div className="w-full mb-4">
          <PodcastCard
            title="Next-Gen Tech for Health Data Privacy 2025"
            description="Speaking on next-generation technologies shaping health data privacy, from decentralized identity to secure data sharing in healthcare."
            icon="health-privacy"
            width={80}
            height={80}
          />
        </div>
        <div className="w-full mb-4">
          <PodcastCard
            title="London Blockchain Conference 2025"
            description="The UK's biggest enterprise blockchain event. Shared insights on self-sovereign identity, digital trust, and how blockchain delivers real-world impact."
            icon="london-blockchain"
            width={120}
            height={120}
          />
        </div>
        <div className="w-full mb-4">
          <PodcastCard
            title="DID:UNCONF Africa 2026"
            description="Unconference in Stellenbosch bringing together innovators to advance digital identity in Africa. Participant-driven discussions on SSI and verifiable credentials."
            icon="did-unconf-africa"
            width={120}
            height={120}
          />
        </div>
        <div className="w-full mb-4">
          <PodcastCard
            title="Üretim Bandı Podcast"
            description="Blokzincir günden güne hayatımızda ve teknolojide daha farklı alanlarda yer buluyor. Üretim Bandı Podcast'in bu bölümünde Mahir Şentürk ile Energy Web'i keşfediyoruz."
            href="https://uretimbandi.com/podcast/mahir-senturk-energy-web-blockchainle-enerji-problemini-cozmek/"
            icon="uretimbandi"
            width={120}
            height={120}
          />
        </div>
        <div className="w-full mb-4">
          <PodcastCard
            title="Üretim Bandı Podcast"
            description="Mahir Şentürk ile birlikte eDevlet Blokzincirinde Olsaydı nasıl bir yapıda olurdu, Self Sovereign Identity (Öz Kimlik) nedir konuştuk."
            href="https://uretimbandi.com/podcast/mahir-senturk-edevlet-blokzincirinde-olsaydi/"
            icon="uretimbandi"
            width={120}
            height={120}
          />
        </div>
      </div>
    </Container>
  );
}
