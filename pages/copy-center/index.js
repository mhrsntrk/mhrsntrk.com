import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import ROBOTS_PROPS from '@/lib/robots';
import Container from '@/components/Container';
import StructuredData from '@/components/StructuredData';

const URL = 'https://mhrsntrk.com/copy-center';
const TITLE = 'Copy Center: Batch Print PDFs on Your Mac – mhrsntrk';
const DESCRIPTION =
  'Copy Center prints a whole stack of PDFs in one go and follows every job to paper. Auto reads each page on your Mac and picks the right settings per file. Support and FAQ.';
const EMAIL = 'copycenter@mhrsntrk.com';

/** Tells search engines this is a Mac app page, and where it sits on the site. */
const APP_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Copy Center',
  alternateName: 'Copy Center: Batch PDF Print',
  operatingSystem: 'macOS 15 or later',
  applicationCategory: 'UtilitiesApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Batch print PDFs on your Mac with per-file settings, an on-device Auto profile, ink-aware printing and live job tracking.',
  url: URL,
  author: { '@type': 'Person', name: 'Mahir Senturk', url: 'https://mhrsntrk.com' }
};

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Swiss Knife', item: 'https://mhrsntrk.com/swissknife' },
    { '@type': 'ListItem', position: 2, name: 'Copy Center', item: URL }
  ]
};

function Shot({ src, alt }) {
  return (
    <div className="my-6 overflow-hidden border border-gray-200 rounded dark:border-gray-800">
      <Image src={src} alt={alt} width={1440} height={900} sizes="(max-width: 768px) 100vw, 672px" style={{ width: "100%", height: "auto" }} />
    </div>
  );
}

export default function CopyCenter() {
  return (
    <>
      <StructuredData data={APP_SCHEMA} />
      <StructuredData data={BREADCRUMB_SCHEMA} />
      <Container>
        <NextSeo
          robotsProps={ROBOTS_PROPS}
          title={TITLE}
          description={DESCRIPTION}
          canonical={URL}
          openGraph={{
            url: URL,
            title: TITLE,
            description: DESCRIPTION,
            images: [
              {
                url: 'https://mhrsntrk.com/api/og?title=Copy%20Center',
                width: 1200,
                height: 630,
                alt: 'Copy Center'
              }
            ]
          }}
        />
        <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
          <div className="flex items-center mb-4">
            <Image src="/static/icons/copy-center.png" alt="Copy Center app icon" width={72} height={72} />
            <h1 className="ml-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
              Copy Center
            </h1>
          </div>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            Batch print PDFs on your Mac. Drop in a whole folder, press Print,
            and Copy Center follows every job until it is on paper.
          </p>
          <p className="mb-8 text-sm text-gray-500 dark:text-gray-500">
            Free. macOS 15 or later. Coming soon to the Mac App Store.
          </p>

          <div className="w-full prose dark:prose-dark max-w-none">
            <Shot src="/static/images/copy-center/printing.jpg" alt="Copy Center printing a list of PDFs, with a job in progress and a progress bar" />

            <h2>What it does</h2>
            <ul>
              <li>Prints PDFs and whole folders of PDFs in list order, one job per file.</li>
              <li>One set of default settings for everything, with exceptions for single files and saved print profiles.</li>
              <li>Shows every job live: sending, waiting, printing, printed, canceled, with sheet counts and printer messages.</li>
              <li>Keeps a print history, watches a folder for new PDFs, and works from Finder and Shortcuts.</li>
            </ul>

            <h2>Auto profile</h2>
            <p>
              Copy Center looks at every page before it prints: color, scans,
              blank pages, landscape pages and paper size. It reads scanned
              pages with on-device text recognition and uses Apple Intelligence
              on your Mac to tell a contract from a receipt or a boarding pass.
              Then it picks settings for each file and says why, in plain words.
              Nothing leaves your Mac.
            </p>
            <Shot src="/static/images/copy-center/auto.jpg" alt="Copy Center explaining the settings Auto picked for a lease agreement" />

            <h2>Knows your printer</h2>
            <p>
              Copy Center reads ink levels and alerts straight from the printer.
              When color ink runs low, Auto prints in black and white on its own.
            </p>
            <Shot src="/static/images/copy-center/printer.jpg" alt="Copy Center printer tab showing color ink low and black ink at 76 percent" />

            <h2>Getting started</h2>
            <ol>
              <li>Drop PDFs or folders into the window, or press Add Files.</li>
              <li>
                Check the list. A star in the Settings column means Auto picked
                the settings for that file. Select a file to see why.
              </li>
              <li>Press Print.</li>
            </ol>

            <h2>Questions</h2>
            <h3>A form prints without the answers I typed in.</h3>
            <p>
              Copy Center fills form answers into the page before printing. If
              a form still prints empty, it may use an old Adobe form format that
              macOS cannot draw. Open it in Preview, choose File, Export as PDF,
              and print the exported file.
            </p>
            <h3>Everything prints in black and white.</h3>
            <p>
              Your printer reports that color ink is low or empty, and Auto
              switches to black and white to save the print. Open the Printer
              tab to see the ink levels. You can still set a file to color by
              hand.
            </p>
            <h3>The Printer tab says the printer did not answer.</h3>
            <p>
              Ink levels come from the printer over your network. A printer that
              is off, asleep or connected by USB cannot report them. Printing
              still works.
            </p>
            <h3>Auto does not name the document type.</h3>
            <p>
              Document recognition uses Apple Intelligence where it is
              available. Without it, Copy Center uses built-in rules and still
              picks settings from what it measures on the pages.
            </p>
            <h3>How do I add files from Finder?</h3>
            <p>
              Right-click PDFs or a folder in Finder and choose Services, then
              Add to Copy Center. Or use Open With, Copy Center.
            </p>

            <h2>Contact</h2>
            <p>
              Found a problem or have an idea? Email{' '}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Read the{' '}
              <Link href="/copy-center/privacy">privacy policy</Link>, or go back
              to the <Link href="/swissknife">Swiss Knife</Link>.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
