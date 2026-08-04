import { NextSeo } from 'next-seo';
import Link from 'next/link';

import Container from '@/components/Container';
import Card from '@/components/vulgate/Card';
import Gate from '@/components/vulgate/Gate';
import {
  getAllEntries,
  getAllSlugs,
  getEntryBySlug,
  getEntryNumber
} from '@/lib/vulgate/entries';

// The literal translation on its own is a fragment — too short to serve as a
// description and identical in register to a hundred others. Pair it with the
// gloss, then trim to what a SERP will actually show.
function entryDescription(entry) {
  const full = `Turkish proverb, literally: ${entry.literal_en} ${entry.meaning_en}`
    .replace(/\s+/g, ' ')
    .trim();
  if (full.length <= 160) return full;
  const cut = full.slice(0, 159);
  const wordEnd = cut.lastIndexOf(' ');
  return `${(wordEnd > 0 ? cut.slice(0, wordEnd) : cut).replace(
    /[\s,;:—–-]+$/,
    ''
  )}…`;
}

// The specimen is the title, but specimens do not come in a convenient length:
// two words at one end, a full couplet at the other. Take the first framing
// that lands inside what a SERP shows, longest framing first.
function entryTitle(entry) {
  const candidates = [
    `${entry.tr} — The Vulgate`,
    `${entry.tr} — Turkish proverb, The Vulgate`,
    entry.tr
  ];
  return (
    candidates.find((c) => c.length >= 30 && c.length <= 60) || candidates[2]
  );
}

export default function VulgateEntry({ entry, number, related }) {
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
        title={entryTitle(entry)}
        description={entryDescription(entry)}
        canonical={url}
        openGraph={{
          type: 'article',
          url,
          title: entry.tr,
          description: entryDescription(entry),
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
        <Card entry={entry} number={number} defaultRevealed asHeading />

        {related.length > 0 && (
          <nav aria-label="Related entries" className="w-full mt-12">
            <h2 className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Same theme
            </h2>
            <ul className="space-y-1">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/swissknife/vulgate/${r.slug}`}
                    lang="tr"
                    className="text-sm text-gray-700 dark:text-gray-300 hover:underline hover:text-black dark:hover:text-white"
                  >
                    {r.tr}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <p className="mt-8 text-xs text-gray-500">
          <Link href="/swissknife/vulgate" className="hover:underline">
            ← Shuffle another
          </Link>
          {' · '}
          <Link href="/swissknife/vulgate#index" className="hover:underline">
            Full index
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

  // Entries that share a theme, so every permalink links onward into the
  // corpus instead of dead-ending at the shuffle page.
  const related = getAllEntries()
    .filter(
      (e) =>
        e.slug !== entry.slug &&
        e.themes.some((theme) => entry.themes.includes(theme))
    )
    .slice(0, 6)
    .map((e) => ({ slug: e.slug, tr: e.tr }));

  return {
    props: {
      entry: { ...entry },
      number: getEntryNumber(params.slug),
      related
    }
  };
}
