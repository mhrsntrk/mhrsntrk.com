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
          Senior Product Manager at{' '}
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
        <h2 className="mb-4 text-gray-600 dark:text-gray-400">
          As a Senior Product Manager at The Hashgraph Association, I blend technical expertise with strategic vision, leveraging my B.Sc. in Electrical and Electronics Engineering and MBA. My career in technology is driven by a passion for innovation and impactful leadership, with a particular focus on self-sovereign identity (SSI) solutions.
        </h2>
        <h2 className="mb-4 text-gray-600 dark:text-gray-400">
          Having worked extensively in the SSI field, I've developed deep knowledge and practical experience implementing decentralized identity systems. During my time at Energy Web, I led the development of Switchboard, one of the pioneering SSI systems in the industry, while also spearheading ecosystem products that integrated web3 technologies into the energy sector.
        </h2>
        <h2 className="mb-4 text-gray-600 dark:text-gray-400">
          Now at The Hashgraph Association, I'm at the forefront of building a comprehensive self-sovereign identity system on Hedera. This role allows me to apply my knowledge of distributed ledger technology and my entrepreneurial background to push the boundaries of blockchain applications.
        </h2>
        <h2 className="mb-4 text-gray-600 dark:text-gray-400">
          My work spans the intersection of blockchain, digital identity, and enterprise solutions, positioning me to contribute meaningfully to the advancement of decentralized technologies and their real-world implementations.
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
