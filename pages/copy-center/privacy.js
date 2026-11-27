import React from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import ROBOTS_PROPS from '@/lib/robots';
import Container from '@/components/Container';

const URL = 'https://mhrsntrk.com/copy-center/privacy';
const TITLE = 'Copy Center Privacy Policy: No Data Collected – mhrsntrk';
const DESCRIPTION =
  'Copy Center does not collect, store or send personal data. Documents are analysed on your Mac and printer details stay on your Mac.';
const EMAIL = 'copycenter@mhrsntrk.com';

export default function CopyCenterPrivacy() {
  return (
    <Container>
      <NextSeo
        robotsProps={ROBOTS_PROPS}
        title={TITLE}
        description={DESCRIPTION}
        canonical={URL}
        openGraph={{ url: URL, title: TITLE, description: DESCRIPTION }}
      />
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Copy Center privacy policy
        </h1>
        <div className="w-full prose dark:prose-dark max-w-none">
          <p>Last updated: 27 November 2026</p>
          <p>Copy Center does not collect, store or send any personal data.</p>

          <h2>Your documents</h2>
          <p>
            Your PDFs stay on your Mac. Copy Center reads them to count pages,
            check for color, scans and blank pages, and to suggest print
            settings. Text recognition and document recognition run on your Mac
            using Apple&apos;s on-device frameworks. Nothing is uploaded to me or
            to anyone else.
          </p>
          <p>
            When you print, Copy Center hands the file to the macOS printing
            system, which sends it to the printer you chose.
          </p>

          <h2>Your printer</h2>
          <p>
            Copy Center asks your printer on your local network for its ink
            levels, alerts and loaded paper. That information is shown in the app
            and is not sent anywhere.
          </p>

          <h2>What is saved on your Mac</h2>
          <p>
            Your print profiles, default settings, print history and the folder
            you choose to watch are saved on your Mac, inside the app&apos;s own
            storage. You can clear the history in the app at any time. Deleting
            the app removes all of it.
          </p>

          <h2>Analytics and tracking</h2>
          <p>Copy Center has no analytics, no advertising and no tracking of any kind.</p>

          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            Back to <Link href="/copy-center">Copy Center</Link>.
          </p>
        </div>
      </div>
    </Container>
  );
}
