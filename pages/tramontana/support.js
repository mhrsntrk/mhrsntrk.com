import React from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import ROBOTS_PROPS from '@/lib/robots';
import Container from '@/components/Container';

export default function TramontanaSupport() {
  return (
    <Container>
      <NextSeo
        robotsProps={ROBOTS_PROPS}
        title="Tramontana Support – mhrsntrk"
        description="How Tramontana works, what it cannot do, and how to get help with it."
        canonical="https://mhrsntrk.com/tramontana/support"
        openGraph={{
          url: 'https://mhrsntrk.com/tramontana/support',
          title: 'Tramontana Support – mhrsntrk',
          description: 'How Tramontana works, what it cannot do, and how to get help.'
        }}
      />
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Tramontana Support
        </h1>
        <div className="w-full prose dark:prose-dark max-w-none">
          <p>
            Tramontana shows what a drive will be like when you get there:
            weather read at the hour you arrive at each point along the route,
            with active wildfires marked on the same line.
          </p>

          <h2>Reading the map</h2>
          <p>
            Conditions are drawn on the road itself. Severity runs from 1 to 5
            and is shown three ways at once, as a number, a colour and a
            pattern, so it still reads in glare or if colours are hard to tell
            apart. The pattern says what kind of hazard it is. A clear road is
            left unmarked, because colour is reserved for hazard.
          </p>
          <p>
            Drag the time ruler under the route to change when you leave. The
            whole route is read again for the new arrival times, which is the
            point of the app: leaving two hours later can trade fog for a storm.
          </p>

          <h2>What it cannot do</h2>
          <p>
            This matters more than the features, so it is worth being blunt
            about it.
          </p>
          <ul>
            <li>
              Fires are seen by satellites passing overhead a few times a day. A
              detection is commonly several hours old, and no amount of
              engineering changes that. Every fire in the app shows its own age.
            </li>
            <li>
              A fire that started since the last satellite pass will not appear,
              and neither will one hidden under cloud.
            </li>
            <li>
              It never tells you whether to drive. It shows what is there so you
              can decide.
            </li>
            <li>
              It is not an emergency service. If you are in danger, call 112.
            </li>
          </ul>

          <h2>Where the data comes from</h2>
          <p>
            Forecasts come from the Norwegian Meteorological Institute, fire
            detections from NASA FIRMS, fire danger context from Copernicus
            EFFIS, and routing and maps from Apple. All of it is credited in the
            app under the information button.
          </p>

          <h2>Common questions</h2>
          <p>
            <strong>The whole route is grey and nothing is marked.</strong> That
            is the app working. Grey means clear, and on a settled day most
            routes have nothing worth marking.
          </p>
          <p>
            <strong>The map is blank but the conditions still show.</strong> The
            map needs a connection and cannot be stored for offline use. The
            route, the hazards and the readout are yours once fetched, so they
            keep working when the signal drops.
          </p>
          <p>
            <strong>It will not use my location.</strong> Check Settings,
            Privacy and Security, Location Services. You can also just type a
            starting point instead.
          </p>

          <h2>Contact</h2>
          <p>
            Bugs, suggestions, or anything the app got wrong on a real drive:{' '}
            <a href="mailto:m@mhrsntrk.com">m@mhrsntrk.com</a>. Privacy is
            covered on the{' '}
            <Link href="/tramontana/privacy">privacy page</Link>, or go back to
            the <Link href="/">home page</Link>.
          </p>
        </div>
      </div>
    </Container>
  );
}
