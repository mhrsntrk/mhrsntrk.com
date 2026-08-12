import { useCallback, useEffect, useMemo, useState } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import Container from '@/components/Container';
import Card from '@/components/vulgate/Card';
import Gate from '@/components/vulgate/Gate';
import { plexMono } from '@/components/vulgate/fonts';
import { getAllEntries, getThemeDecks } from '@/lib/vulgate/entries';

const SEEN_KEY = 'vulgate-seen';

export default function VulgateIndex({ entries, themes }) {
  const [activeTheme, setActiveTheme] = useState(null);
  const [index, setIndex] = useState(0);
  const [seenCount, setSeenCount] = useState(0);

  const pool = useMemo(
    () =>
      activeTheme
        ? entries.filter((e) => e.themes.includes(activeTheme))
        : entries,
    [entries, activeTheme]
  );

  const current = pool[Math.min(index, pool.length - 1)] || entries[0];

  const markSeen = useCallback((slug) => {
    try {
      const raw = window.localStorage.getItem(SEEN_KEY);
      const set = new Set(raw ? JSON.parse(raw) : []);
      set.add(slug);
      window.localStorage.setItem(SEEN_KEY, JSON.stringify([...set]));
      setSeenCount(set.size);
    } catch (e) {
      /* localStorage unavailable — completion sense is a nicety, not load-bearing */
    }
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SEEN_KEY);
      setSeenCount(raw ? JSON.parse(raw).length : 0);
    } catch (e) {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (current) markSeen(current.slug);
  }, [current, markSeen]);

  const shuffle = useCallback(() => {
    if (pool.length <= 1) return;
    let next = index;
    while (next === index) next = Math.floor(Math.random() * pool.length);
    setIndex(next);
  }, [index, pool.length]);

  const step = useCallback(
    (delta) => {
      if (pool.length === 0) return;
      setIndex((i) => {
        const cur = Math.min(i, pool.length - 1);
        return (cur + delta + pool.length) % pool.length;
      });
    },
    [pool.length]
  );

  function pickTheme(theme) {
    setActiveTheme((t) => (t === theme ? null : theme));
    setIndex(0);
  }

  const number = current
    ? entries.findIndex((e) => e.slug === current.slug) + 1
    : null;

  return (
    <Container>
      {/* noindex, follow. The corpus earned 86 impressions and one click in a
          quarter while the rest of the site earned 22,095, so there is nothing
          to lose in search — but vulgar source text on the apex domain carries
          a real tail risk of an adult classification that would suppress every
          other page for SafeSearch users. The pages stay live, linkable and
          shareable; only the index entry goes. Crawling is deliberately left
          open in robots.txt, because a blocked page can never be read and a
          noindex that is never read is never obeyed. */}
      <NextSeo
        noindex
        nofollow={false}
        title="The Vulgate — a corpus of vulgar Turkish folk proverbs"
        description="A curated corpus of vulgar Turkish folk proverbs, presented bilingually with a deliberately literal English translation and a flat scholarly annotation."
        canonical="https://mhrsntrk.com/swissknife/vulgate"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife/vulgate',
          title: 'The Vulgate — a corpus of vulgar Turkish folk proverbs',
          description:
            'Filthy source text, treated with total institutional rigor. Fielded, indexed, catalogued, annotated, straight-faced.'
        }}
      />
      <Gate mode="wall" />

      <div className="flex flex-col items-start w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          The Vulgate
        </h1>
        <p className="mb-2 text-gray-600 dark:text-gray-400">
          A corpus of vulgar Turkish folk proverbs. Every entry carries a
          proverbial payload; the crudeness is the delivery mechanism, not the
          content. Presented bilingually with a deliberately literal English
          translation and a flat scholarly annotation.
        </p>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-500">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}{' '}
          catalogued{seenCount > 0 ? ` · ${seenCount} seen` : ''}
        </p>

        {/* Controls: step through sequentially, shuffle at random, share. */}
        <div className="flex flex-wrap items-center w-full gap-3 mb-8">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={pool.length <= 1}
            aria-label="Previous entry"
            className={`${plexMono.className} px-4 py-3 text-sm tracking-widest text-gray-900 uppercase border border-gray-400 dark:border-gray-700 dark:text-gray-100 disabled:opacity-40`}
          >
            ‹ Prev
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={pool.length <= 1}
            aria-label="Next entry"
            className={`${plexMono.className} px-4 py-3 text-sm tracking-widest text-gray-900 uppercase border border-gray-400 dark:border-gray-700 dark:text-gray-100 disabled:opacity-40`}
          >
            Next ›
          </button>
          <button
            type="button"
            onClick={shuffle}
            disabled={pool.length <= 1}
            className={`${plexMono.className} px-6 py-3 text-sm tracking-widest text-gray-900 uppercase border border-gray-400 dark:border-gray-700 dark:text-gray-100 disabled:opacity-40`}
          >
            Shuffle
          </button>
          <ShareButton slug={current?.slug} />
        </div>

        {/* Theme decks */}
        <div className="flex flex-wrap gap-2 mb-8">
          {themes.map((t) => (
            <button
              key={t.name}
              type="button"
              onClick={() => pickTheme(t.name)}
              className={`${
                plexMono.className
              } px-3 py-1 text-xs tracking-wider uppercase border ${
                activeTheme === t.name
                  ? 'border-red-500 text-red-500'
                  : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {t.name} ({t.count})
            </button>
          ))}
        </div>

        {/* Card */}
        {current && (
          <div className="w-full">
            <Card entry={current} number={number} />
            <p className="mt-4 text-xs text-gray-500">
              <Link
                href={`/swissknife/vulgate/${current.slug}`}
                className="hover:underline"
              >
                Permalink →
              </Link>
            </p>
          </div>
        )}

        {/* The corpus, listed. The shuffle above reaches one entry at a time
            in JavaScript, which leaves every other permalink unreachable to a
            crawler — and a catalogue that cannot be read as a catalogue is
            not one. */}
        <section id="index" className="w-full mt-16">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-black md:text-3xl dark:text-white">
            Index
          </h2>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Every entry in the corpus, in catalogue order.
          </p>
          <ol className="w-full space-y-1">
            {entries.map((entry, i) => (
              <li key={entry.slug} className="flex gap-3 text-sm">
                <span
                  className={`${plexMono.className} tabular-nums text-gray-400 dark:text-gray-600`}
                >
                  {String(i + 1).padStart(3, '0')}
                </span>
                <Link
                  href={`/swissknife/vulgate/${entry.slug}`}
                  lang="tr"
                  className="text-gray-700 dark:text-gray-300 hover:underline hover:text-black dark:hover:text-white"
                >
                  {entry.tr}
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </Container>
  );
}

function ShareButton({ slug }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    if (!slug) return;
    const url = `https://mhrsntrk.com/swissknife/vulgate/${slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'The Vulgate', url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch (e) {
      /* user dismissed share sheet */
    }
  }
  return (
    <button
      type="button"
      onClick={share}
      disabled={!slug}
      className={`${plexMono.className} px-6 py-3 text-sm tracking-widest text-gray-900 uppercase border border-gray-400 dark:border-gray-700 dark:text-gray-100 disabled:opacity-40`}
    >
      {copied ? 'Copied' : 'Share card'}
    </button>
  );
}

export async function getStaticProps() {
  const entries = getAllEntries();
  const decks = getThemeDecks();
  const themes = Object.keys(decks)
    .sort()
    .map((name) => ({ name, count: decks[name].length }));

  return {
    props: {
      entries: entries.map((e) => ({ ...e })),
      themes
    }
  };
}
