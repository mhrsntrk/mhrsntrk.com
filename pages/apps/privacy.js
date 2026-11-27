import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import ROBOTS_PROPS from '@/lib/robots';
import Container from '@/components/Container';
import { APPS, appUrl } from '@/lib/apps';

const URL = 'https://mhrsntrk.com/apps/privacy';
const TITLE = 'App Privacy Policy: What Each of My Apps Does with Data – mhrsntrk';
const DESCRIPTION =
  'One privacy policy for the iOS and Mac apps I build: what stays on your device, what leaves it, where it goes and why, app by app.';

/**
 * Umbrella policy. Each app section comes from lib/apps.js, and each app page
 * links to its anchor here. Where an app also has its own published policy,
 * the two must say the same thing.
 */
export default function AppsPrivacy() {
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
          App privacy policy
        </h1>
        <div className="w-full prose dark:prose-dark max-w-none">
          <p>Last updated: 27 November 2026</p>
          <p>
            This policy covers the apps I build and publish under my own name. It
            says, app by app, what stays on your device, what leaves it, where it
            goes and why.
          </p>

          <h2>What is true for all of them</h2>
          <ul>
            <li>None of them needs an account or asks for your name or email.</li>
            <li>None of them shows ads or includes third-party analytics or tracking SDKs.</li>
            <li>I do not sell or share data with data brokers or advertisers.</li>
            <li>Purchases go through Apple. I receive no payment details, only Apple&apos;s standard sales reports.</li>
            <li>Data an app keeps on your device is removed when you delete the app, apart from copies in your own iCloud or device backups.</li>
          </ul>

          <h2>The apps</h2>
          <ul>
            {APPS.map((app) => (
              <li key={app.slug}>
                <a href={`#${app.slug}`}>{app.name}</a>
              </li>
            ))}
          </ul>

          {APPS.map((app) => (
            <section key={app.slug} id={app.slug}>
              <h2 className="flex items-center">
                <Image src={app.icon} alt="" width={32} height={32} className="m-0 mr-3 rounded-lg" />
                {app.name}
              </h2>
              <p>
                <strong>{app.privacy.summary}</strong>
              </p>
              <ul>
                {app.privacy.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p>
                Questions: <a href={`mailto:${app.email}`}>{app.email}</a>.{' '}
                <Link href={appUrl(app)}>About {app.name}</Link>.
              </p>
            </section>
          ))}

          <h2>Changes and contact</h2>
          <p>
            When an app starts handling data differently, this page changes
            with it and the date above moves. For anything not answered here,
            write to <a href="mailto:m@mhrsntrk.com">m@mhrsntrk.com</a>. You can
            ask what I hold about you and have it deleted. Back to the{' '}
            <Link href="/swissknife">Swiss Knife</Link>.
          </p>
        </div>
      </div>
    </Container>
  );
}
