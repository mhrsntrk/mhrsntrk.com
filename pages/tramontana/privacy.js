import React from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import ROBOTS_PROPS from '@/lib/robots';
import Container from '@/components/Container';

export default function TramontanaPrivacy() {
  return (
    <Container>
      <NextSeo
        robotsProps={ROBOTS_PROPS}
        title="Tramontana Privacy Policy – mhrsntrk"
        description="What the Tramontana iOS app does with your location and your route. No accounts, no analytics, no servers of mine."
        canonical="https://mhrsntrk.com/tramontana/privacy"
        openGraph={{
          url: 'https://mhrsntrk.com/tramontana/privacy',
          title: 'Tramontana Privacy Policy – mhrsntrk',
          description:
            'What the Tramontana iOS app does with your location and your route.'
        }}
      />
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Tramontana Privacy
        </h1>
        <div className="w-full prose dark:prose-dark max-w-none">
          <p>
            Tramontana shows weather and wildfire conditions along a driving
            route. It has no accounts, no sign in, and no analytics. I run no
            servers for it, so there is nowhere for me to keep anything about
            you even if I wanted to.
          </p>

          <h2>What stays on your phone</h2>
          <p>
            Your location, the routes you plan, and the departure times you
            choose never leave your device except as described below. Nothing is
            stored anywhere I control. Deleting the app deletes everything.
          </p>

          <h2>What leaves your phone, and where it goes</h2>
          <p>
            To tell you what the weather will be at a point on your route, the
            app has to ask somebody what the weather will be at that point. It
            asks these services directly from your phone:
          </p>
          <ul>
            <li>
              <strong>Apple Maps</strong> receives your start and destination in
              order to calculate the driving route, and draws the map itself.
              This is handled by Apple under{' '}
              <a
                href="https://www.apple.com/legal/privacy/"
                rel="noopener noreferrer"
              >
                Apple&apos;s privacy policy
              </a>
              .
            </li>
            <li>
              <strong>The Norwegian Meteorological Institute</strong> (
              <a href="https://api.met.no" rel="noopener noreferrer">
                api.met.no
              </a>
              ) receives coordinates of points along your route in order to
              return forecasts for them. Coordinates are rounded to roughly one
              hundred metres before they are sent.
            </li>
            <li>
              <strong>NASA FIRMS</strong> receives no information about you at
              all. The app downloads the same public list of satellite fire
              detections that everyone else downloads, and compares it against
              your route on your own phone.
            </li>
          </ul>
          <p>
            None of these requests carry an account, a device identifier, or
            anything that identifies you. I do not receive any of it, because
            none of it passes through me.
          </p>

          <h2>Location permission</h2>
          <p>
            The app asks for location while in use, so it can show where you are
            along the route and time the conditions ahead to when you will reach
            them. You can refuse, and the app still works: type a starting point
            instead. There is no background location and no tracking.
          </p>

          <h2>Children</h2>
          <p>
            Tramontana is not aimed at children and collects nothing from
            anybody, including them.
          </p>

          <h2>Changes</h2>
          <p>
            If this ever changes, this page changes with it, and the change ships
            with an app update rather than quietly.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about any of this:{' '}
            <a href="mailto:m@mhrsntrk.com">m@mhrsntrk.com</a>. Support and known
            limitations are on the{' '}
            <Link href="/tramontana/support">support page</Link>, or go back to
            the <Link href="/">home page</Link>.
          </p>
        </div>
      </div>
    </Container>
  );
}
