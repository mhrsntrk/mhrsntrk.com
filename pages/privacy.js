import React from 'react';
import { NextSeo } from 'next-seo';

import ROBOTS_PROPS from '@/lib/robots';
import Link from 'next/link';

import Container from '@/components/Container';

export default function Privacy() {
  return (
    <Container>
      <NextSeo
        robotsProps={ROBOTS_PROPS}
        title="Privacy Policy: What This Site Collects – mhrsntrk"
        description="How mhrsntrk.com handles your data: which privacy-preserving analytics run, how long anything is kept, and how to have it deleted."
        canonical="https://mhrsntrk.com/privacy"
        openGraph={{
          url: 'https://mhrsntrk.com/privacy',
          title: 'Privacy Policy: What This Site Collects – mhrsntrk',
          description:
            'How mhrsntrk.com handles your data: analytics and your rights.'
        }}
      />
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Privacy
        </h1>
        <div className="w-full prose dark:prose-dark max-w-none">
          <p>
            This is a personal website. I try to collect as little as possible.
          </p>

          <h2>Analytics</h2>
          <p>
            I use self-hosted{' '}
            <a href="https://umami.is" rel="noopener noreferrer">
              Umami
            </a>{' '}
            for aggregate, privacy-friendly analytics. It does not use cookies
            and does not collect personally identifiable information. Data is
            not shared with or sold to third parties.
          </p>

          <h2>Your rights</h2>
          <p>
            You can request access to, correction of, or deletion of any data I
            hold about you. To exercise any of these rights, email{' '}
            <a href="mailto:m@mhrsntrk.com">m@mhrsntrk.com</a>.
          </p>

          <p>
            Questions? Reach me at{' '}
            <a href="mailto:m@mhrsntrk.com">m@mhrsntrk.com</a> or back to the{' '}
            <Link href="/">home page</Link>.
          </p>
        </div>
      </div>
    </Container>
  );
}
