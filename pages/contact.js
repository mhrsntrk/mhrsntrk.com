import React from 'react';

import Container from '@/components/ContactContainer';
import Card from '@/components/ContactCard';
import Info from '@/components/ContactInfo';

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mt-8 mb-8">
        <h1 className="mb-2 text-4xl font-bold text-black md:text-5xl dark:text-white">
          Mahir Sentürk
        </h1>
        <h2 className="mb-10 text-gray-800 dark:text-gray-200 text-md md:text-xl">
          Senior Project Manager at{' '}
          <a
            href="https://hashgraph-association.com/"
            className="hover:underline hover:text-red-500 dark:hover:text-red-500"
            aria-label="Energy Web"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Hashgraph Association
          </a>
        </h2>
        <h2 className="mb-8 text-gray-600 dark:text-gray-400">
          As the Sr. Project Manager at The Hashgraph Association , I bring a
          fusion of technical prowess and strategic insight, grounded in a B.Sc.
          in Electrical and Electronics Engineering and an MBA. My career in
          tech and energy is driven by a dedication to innovation and impactful
          leadership. Previously at{' '}
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
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <Info
            icon="linkedin"
            title="Linkedin"
            href="https://www.linkedin.com/in/mahirsenturk"
          />
          <Info
            icon="github"
            title="Github"
            href="https://github.com/mhrsntrk"
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 mb-4 sm:grid-cols-2">
          <Info
            icon="twitter"
            title="Twitter"
            href="https://twitter.com/mhrsntrk"
          />
          <Info icon="telegram" title="Telegram" href="https://t.me/mhrsntrk" />
        </div>
        <div className="grid w-full grid-cols-1 gap-0 mb-8 sm:gap-4 sm:grid-cols-2">
          <Card
            title="Meet me!"
            description="You can use this link to book a meeting with me at the time you choose."
            href="https://cal.com/mhrsntrk"
          />
          <Card
            title="Drop me an email!"
            description="m@mhrsntrk.com"
            href="mailto:m@mhrsntrk.com?subject=Website Contact"
          />
        </div>
      </div>
    </Container>
  );
}
