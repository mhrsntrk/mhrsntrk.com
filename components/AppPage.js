import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import ROBOTS_PROPS from '@/lib/robots';
import Container from '@/components/Container';
import StructuredData from '@/components/StructuredData';
import { appUrl } from '@/lib/apps';

/**
 * One page per app, all from the data in lib/apps.js: what it is, a few
 * screenshots, the questions people ask, and where to get help. Search engines
 * get a SoftwareApplication entry and the breadcrumb back to the Swiss Knife.
 */
function Shot({ src, alt, portrait }) {
  return (
    <div
      className={`my-6 overflow-hidden border border-gray-200 rounded dark:border-gray-800 ${
        portrait ? 'max-w-xs mx-auto' : ''
      }`}
    >
      <Image
        src={src}
        alt={alt}
        width={portrait ? 1290 : 1440}
        height={portrait ? 2796 : 900}
        sizes="(max-width: 768px) 100vw, 672px"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}

function Section({ section, app }) {
  return (
    <>
      <h2>{section.title}</h2>
      {section.body && <p>{section.body}</p>}
      {section.bullets && (
        <ul>
          {section.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {section.steps && (
        <ol>
          {section.steps.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ol>
      )}
      {!app.portraitShots && section.shot !== undefined && <Shot {...app.shots[section.shot]} />}
    </>
  );
}

export default function AppPage({ app }) {
  const url = `https://mhrsntrk.com${appUrl(app)}`;
  const title = `${app.seoTitle} – mhrsntrk`;
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    alternateName: app.storeName,
    operatingSystem: app.os,
    applicationCategory: app.category,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: app.tagline,
    url,
    ...(app.appStoreUrl ? { downloadUrl: app.appStoreUrl } : {}),
    author: { '@type': 'Person', name: 'Mahir Senturk', url: 'https://mhrsntrk.com' }
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Swiss Knife', item: 'https://mhrsntrk.com/swissknife' },
      { '@type': 'ListItem', position: 2, name: app.name, item: url }
    ]
  };
  const privacyHref = app.privacyHref || `/apps/privacy#${app.slug}`;

  return (
    <>
      <StructuredData data={appSchema} />
      <StructuredData data={breadcrumb} />
      <Container>
        <NextSeo
          robotsProps={ROBOTS_PROPS}
          title={title}
          description={app.seoDescription}
          canonical={url}
          openGraph={{
            url,
            title,
            description: app.seoDescription,
            images: [
              {
                url: `https://mhrsntrk.com/api/og?title=${encodeURIComponent(app.name)}`,
                width: 1200,
                height: 630,
                alt: app.name
              }
            ]
          }}
        />
        <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
          <div className="flex items-center mb-4">
            <Image src={app.icon} alt={`${app.name} app icon`} width={72} height={72} className="rounded-2xl" />
            <h1 className="ml-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
              {app.name}
            </h1>
          </div>
          <p className="mb-2 text-gray-600 dark:text-gray-400">{app.tagline}</p>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-500">{app.meta}</p>
          <div className="flex flex-wrap gap-3 mb-8 text-sm">
            {app.appStoreUrl ? (
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 font-bold text-white bg-black rounded dark:bg-white dark:text-black"
              >
                {app.storeLabel || 'View on the App Store'}
              </a>
            ) : (
              <span className="px-3 py-2 text-gray-600 border border-gray-300 rounded dark:text-gray-400 dark:border-gray-700">
                Coming soon to the App Store
              </span>
            )}
            {app.site?.home && (
              <a
                href={app.site.home}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-black border border-gray-300 rounded dark:text-white dark:border-gray-700 hover:underline"
              >
                {app.site.label || 'App website'}
              </a>
            )}
          </div>

          <div className="w-full prose dark:prose-dark max-w-none">
            {app.portraitShots && app.shots?.length > 0 && (
              <div className="grid grid-cols-3 gap-3 my-6">
                {app.shots.map((shot) => (
                  <div key={shot.src} className="overflow-hidden border border-gray-200 rounded dark:border-gray-800">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={640}
                      height={1391}
                      sizes="(max-width: 768px) 33vw, 224px"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                ))}
              </div>
            )}
            {!app.portraitShots && app.heroShot !== undefined && <Shot {...app.shots[app.heroShot]} />}
            {app.sections.map((s) => (
              <Section key={s.title} section={s} app={app} />
            ))}

            {app.faq?.length > 0 && (
              <>
                <h2>Questions</h2>
                {app.faq.map(({ q, a }) => (
                  <React.Fragment key={q}>
                    <h3>{q}</h3>
                    <p>{a}</p>
                  </React.Fragment>
                ))}
              </>
            )}

            <h2>Support and privacy</h2>
            <p>
              Found a problem or have an idea? Email{' '}
              <a href={`mailto:${app.email}`}>{app.email}</a>
              {app.site?.support && (
                <>
                  {' '}or see the <a href={app.site.support}>support page</a>
                </>
              )}
              . Read how {app.name} handles your data in the{' '}
              <Link href={privacyHref}>privacy policy</Link>, or go back to the{' '}
              <Link href="/swissknife">Swiss Knife</Link>.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
