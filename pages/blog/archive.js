import { useMemo } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import ROBOTS_PROPS from '@/lib/robots';

import Container from '@/components/Container';
import StructuredData, { BreadcrumbSchema } from '@/components/StructuredData';
import { getAllPostsForBlog } from '@/lib/strapi';

const url = 'https://mhrsntrk.com/blog/archive';
const title = 'Blog Archive – mhrsntrk';
const description =
  'Every post on mhrsntrk.com, grouped by year: digital identity, eIDAS, self-sovereign identity, and notes from things I build.';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

// Formatted from the UTC parts on purpose. toLocaleDateString would render one
// month on the server and another in a browser west of UTC, which React then
// reports as a hydration mismatch.
function shortDate(value) {
  const d = value ? new Date(value) : null;
  if (!d || Number.isNaN(d.getTime())) return '';
  return `${MONTHS[d.getUTCMonth()]} ${String(d.getUTCDate()).padStart(2, '0')}`;
}

export default function BlogArchive({ allPosts }) {
  // This page exists so every post has one static incoming link. The pager on
  // /blog moves through the list in JavaScript, so a crawler that stops there
  // only ever sees the first five posts.
  const postsByYear = useMemo(() => {
    const years = new Map();
    allPosts.forEach((post) => {
      const parsed = post.date ? new Date(post.date) : null;
      const year =
        parsed && !Number.isNaN(parsed.getTime())
          ? String(parsed.getFullYear())
          : 'Undated';
      if (!years.has(year)) years.set(year, []);
      years.get(year).push(post);
    });
    return [...years.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [allPosts]);

  return (
    <div>
      <StructuredData
        data={BreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: 'Archive', path: '/blog/archive' }
        ])}
      />
      <Container>
        <NextSeo
          robotsProps={ROBOTS_PROPS}
          title={title}
          description={description}
          canonical={url}
          openGraph={{
            url,
            title,
            description
          }}
        />
        <div className="flex flex-col items-start justify-center w-full max-w-4xl mx-auto mb-16">
          <Link
            href="/blog"
            className="mb-6 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            ← Blog
          </Link>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            Archive
          </h1>
          <p className="mb-12 text-gray-600 dark:text-gray-400">
            {`Every post, newest first. ${allPosts.length} in total.`}
          </p>

          {postsByYear.map(([year, posts]) => (
            <section key={year} className="w-full mb-12">
              <div className="flex items-baseline w-full gap-4 mb-4">
                <h2 className="text-sm font-bold tracking-widest text-gray-900 dark:text-gray-100">
                  {year}
                </h2>
                <span className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
                <span className="text-xs text-gray-400 dark:text-gray-600">
                  {posts.length}
                </span>
              </div>
              <ul className="grid w-full grid-cols-1 gap-x-10 gap-y-1 md:grid-cols-2">
                {posts.map((post) => (
                  <li key={post.slug} className="flex items-baseline gap-3">
                    <span
                      className="flex-shrink-0 w-12 text-xs text-gray-400 dark:text-gray-600"
                      aria-hidden="true"
                    >
                      {shortDate(post.date)}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
    const posts = await getAllPostsForBlog(isBuildTime);

    const allPosts = posts.map(({ title, slug, date }) => ({
      title,
      slug,
      date
    }));

    // Same contract as /blog: an empty list during revalidation means Strapi is
    // down, and a stale archive beats an empty one.
    if (!isBuildTime && (!allPosts || allPosts.length === 0)) {
      throw new Error(
        'Failed to fetch posts during revalidation - keeping stale cache'
      );
    }

    return {
      props: { allPosts: allPosts || [] },
      revalidate: 3600
    };
  } catch (error) {
    console.warn('Failed to fetch blog posts for archive:', error.message);

    const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
    if (!isBuildTime) {
      throw error;
    }

    return {
      props: { allPosts: [] },
      revalidate: 3600
    };
  }
}
