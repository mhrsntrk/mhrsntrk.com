import React from 'react';

import Container from '@/components/ContactContainer';
import Card from '@/components/ContactCard';
import Info from '@/components/ContactInfo';

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mt-8 mb-8">
        <h1 className="mb-2 text-4xl font-bold text-black md:text-5xl dark:text-white">
          Mahir Şentürk
        </h1>
        <h2 className="mb-10 text-gray-800 dark:text-gray-200 text-md md:text-xl">
          Principal Product Manager at{' '}
          <a
            href="https://energyweb.org"
            className="hover:underline hover:text-red-500 dark:hover:text-red-500"
            aria-label="Energy Web"
            target="_blank"
            rel="noopener noreferrer"
          >
            Energy Web Foundation
          </a>
        </h2>
        <h2 className="mb-8 text-gray-600 dark:text-gray-400">
          As Principal Product Manager at Energy Web, I bring a dynamic blend of
          technical expertise and strategic business knowledge, backed by B.Sc.
          in Electrical and Electronics Engineering and MBA degrees. My journey
          in the tech and energy sectors has been marked by a passion for
          innovation and community engagement. Currently, I am managing{' '}
          <a
            href="https://energywebx.com"
            target="_blank"
            className="hover:underline"
          >
            EWX
          </a>{' '}
          ecosystem products, focusing on our "Marketplace" and "SaaS
          offerings", driving forward the integration of web3 technology in the
          energy sector. My prior experience includes co-founding and leading
          various startups in Turkey, where I developed and refined my skills in
          creating and running technology-driven businesses. At Energy Web, I
          continue to leverage these skills to foster growth and sustainability
          in the ever-evolving landscape of web3 solutions.
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
