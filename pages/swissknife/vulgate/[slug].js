import { NextSeo } from 'next-seo';
import Link from 'next/link';

import Container from '@/components/Container';
import Card from '@/components/vulgate/Card';
import Gate from '@/components/vulgate/Gate';
import {
  getAllSlugs,
  getEntryBySlug,
  getEntryNumber
} from '@/lib/vulgate/entries';

export default function VulgateEntry({ entry, number }) {
  const url = `https://mhrsntrk.com/swissknife/vulgate/${entry.slug}`;
  const ogParams = new URLSearchParams({
    slug: entry.slug,
    tr: entry.tr,
    literal: entry.literal_en,
    meaning: entry.meaning_en,
    register: entry.register,
    n: String(number)
  });
  const og = `https://mhrsntrk.com/api/vulgate-og?${ogParams.toString()}`;

  return (
    <Container>
      <NextSeo
        title={`${entry.tr} — The Vulgate`}
        description={entry.literal_en}
        canonical={url}
        openGraph={{
          type: 'article',
          url,
          title: entry.tr,
          description: entry.literal_en,
          images: [{ url: og, width: 1200, height: 630, alt: entry.tr }]
        }}
        twitter={{ cardType: 'summary_large_image' }}
      />

      <div className="flex flex-col items-start w-full max-w-2xl mx-auto mb-16">
        <p className="mb-8 text-xs tracking-widest text-gray-500 uppercase">
          <Link href="/swissknife/vulgate" className="hover:underline">
            The Vulgate
          </Link>
        </p>

        {/* Banner, never a wall — people land here straight from Twitter. */}
        <Gate mode="banner" />

        {/* defaultRevealed: permalink shows the full annotation for SEO and for
            the reader who arrived at this specific entry. */}
        <Card entry={entry} number={number} defaultRevealed />

        <p className="mt-8 text-xs text-gray-500">
          <Link href="/swissknife/vulgate" className="hover:underline">
            ← Shuffle another
          </Link>
        </p>
      </div>
    </Container>
  );
}

export async function getStaticPaths() {
  return {
    paths: getAllSlugs().map((slug) => ({ params: { slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const entry = getEntryBySlug(params.slug);
  if (!entry) return { notFound: true };
  return {
    props: { entry: { ...entry }, number: getEntryNumber(params.slug) }
  };
}
