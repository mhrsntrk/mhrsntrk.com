import React from 'react';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import EmailCapture from '@/components/EmailCapture';
import StructuredData from '@/components/StructuredData';
import { AGENT_IDENTITY } from '@/lib/clusters';

const URL = 'https://mhrsntrk.com/agent-identity';

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: `${AGENT_IDENTITY.title} — mhrsntrk`,
  description: AGENT_IDENTITY.tagline,
  url: URL,
  isPartOf: { '@type': 'WebSite', url: 'https://mhrsntrk.com' },
  about: {
    '@type': 'DefinedTerm',
    name: 'Agent identity',
    description: AGENT_IDENTITY.definition
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: AGENT_IDENTITY.posts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://mhrsntrk.com/blog/${p.slug}`,
      name: p.title
    }))
  }
};

export default function AgentIdentity() {
  return (
    <Container>
      <NextSeo
        title="Agent Identity – mhrsntrk"
        description={AGENT_IDENTITY.tagline}
        canonical={URL}
        openGraph={{
          url: URL,
          title: 'Agent Identity – mhrsntrk',
          description: AGENT_IDENTITY.tagline,
          images: [
            {
              url: 'https://mhrsntrk.com/api/og?title=Agent%20Identity',
              width: 1200,
              height: 630,
              type: 'image/png'
            }
          ]
        }}
      />
      <StructuredData data={collectionSchema} />

      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Agent Identity
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          {AGENT_IDENTITY.tagline}
        </p>

        <h2 className="mb-3 text-2xl font-bold tracking-tight text-black dark:text-white">
          What is agent identity?
        </h2>
        <blockquote className="pl-4 mb-8 text-lg leading-relaxed text-gray-800 border-l-2 border-red-500 dark:text-gray-200">
          {AGENT_IDENTITY.definition}
        </blockquote>

        <EmailCapture location="pillar" />

        <h2 className="mt-4 mb-6 text-2xl font-bold tracking-tight text-black dark:text-white">
          The series
        </h2>
        <div className="w-full">
          {AGENT_IDENTITY.posts.map((post) => (
            <BlogPost
              key={post.slug}
              title={post.title}
              excerpt={post.blurb}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
