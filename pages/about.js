import { NextSeo } from 'next-seo';

import Container from '@/components/Container';

export default function About() {
  return (
    <Container>
      <NextSeo
        title="About Me – mhrsntrk"
        canonical="https://mhrsntrk.com/about"
        openGraph={{
          url: 'https://mhrsntrk.com/about',
          title: 'About Me – mhrsntrk'
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-8">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-8 prose leading-6 text-gray-600 dark:text-gray-400">
          <p>
            I'm an electronics engineer, full-stack developer and entrepreneur.
            I own several start-ups{' '}
            <a
              href="https://mapinsky.com"
              target="_blank"
              className="hover:underline text-gray-600 dark:text-gray-400"
            >
              mapinsky
            </a>
            ,{' '}
            <a
              href="https://efervesan.com"
              target="_blank"
              className="hover:underline text-gray-600 dark:text-gray-400"
            >
              efervesan
            </a>
            ,{' '}
            <a
              href="https://mormu.com"
              target="_blank"
              className="hover:underline text-gray-600 dark:text-gray-400"
            >
              mormu
            </a>{' '}
            and{' '}
            <a
              href="http://alist.com.tr"
              target="_blank"
              className="hover:underline text-gray-600 dark:text-gray-400"
            >
              alist
            </a>
            .
          </p>
          <p>
            I grew up in Istanbul, Turkey. I lived and studied 1-year in Oppdal,
            Norway as an exchange student with AFS. I studied Electronics
            Enginnering in Işık University. After school I worked as sales
            engineer in various companies and finally I established my first
            company.
          </p>
          <p>
            I started building websites with WordPress and after that I switched
            to better by meeting with React and Node.js. Right now, I am trying
            to develop websites by using Next.js and Tailwind CSS and Strapi.
          </p>
        </div>
      </div>
    </Container>
  );
}
