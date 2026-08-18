import { NextSeo } from 'next-seo';

import ROBOTS_PROPS from '@/lib/robots';

import { DEFAULT_LANG, ogLocaleFor } from '@/lib/postLanguage';

import SEO_TITLES from '@/lib/seoTitles';

// Article JSON-LD is emitted by BlogPostingSchema (components/StructuredData.js),
// which is richer (wordCount, sameAs, markdown encoding, dateModified). Keeping a
// second ArticleJsonLd here would duplicate the Article node on the page.
// Returns a valid ISO string for a parseable date, or null.
const toISO = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

// A SERP title is cut around 60 characters. Brand the title when it fits and
// drop the suffix rather than let it push the title past the cut — the post
// title carries the ranking terms, " – mhrsntrk" does not. Posts whose own
// title is longer than 60 get a short form from lib/seoTitles.js.
const TITLE_LIMIT = 60;
const SUFFIX = ' – mhrsntrk';

const pageTitle = (title, slug) => {
  const base = (slug && SEO_TITLES[slug]) || title;
  return base.length + SUFFIX.length <= TITLE_LIMIT ? `${base}${SUFFIX}` : base;
};

// Google shows roughly 155-160 characters of a description and Ahrefs flags
// anything past 160. Post summaries are written for the blog index, where they
// run longer, so clamp a copy for the meta tag: prefer ending on a sentence,
// fall back to a word boundary. Anything already short enough is left alone.
const DESC_LIMIT = 160;
const DESC_MIN = 110;

const clampDescription = (text) => {
  const summary = String(text || '')
    .replace(/\s+/g, ' ')
    .trim();
  if (summary.length <= DESC_LIMIT) return summary;

  const cut = summary.slice(0, DESC_LIMIT - 1);
  const sentenceEnd = Math.max(
    cut.lastIndexOf('. '),
    cut.lastIndexOf('? '),
    cut.lastIndexOf('! ')
  );
  if (sentenceEnd >= DESC_MIN) return cut.slice(0, sentenceEnd + 1);

  const wordEnd = cut.lastIndexOf(' ');
  const trimmed = (wordEnd > 0 ? cut.slice(0, wordEnd) : cut).replace(
    /[\s,;:—–-]+$/,
    ''
  );
  return `${trimmed}…`;
};

const BlogSeo = ({
  title,
  summary,
  publishedAt,
  modifiedAt,
  url,
  slug,
  lang = DEFAULT_LANG
}) => {
  const date = toISO(publishedAt);
  const modified = toISO(modifiedAt) || date;
  const markdownUrl = slug
    ? `https://mhrsntrk.com/api/markdown/blog/${slug}`
    : null;

  // Per-post OG image rendered on the fly (title + handle, brand template).
  const ogImage = `https://mhrsntrk.com/api/og?title=${encodeURIComponent(
    title
  )}`;

  const article = {
    authors: ['https://mhrsntrk.com'],
    ...(date ? { publishedTime: date } : {}),
    ...(modified ? { modifiedTime: modified } : {})
  };

  const description = clampDescription(summary);

  return (
    <NextSeo
      robotsProps={ROBOTS_PROPS}
      title={pageTitle(title, slug)}
      description={description}
      canonical={url}
      openGraph={{
        type: 'article',
        article,
        url,
        // Default is en_US (next-seo.config.js). A Turkish post shipped under
        // that locale tells every consumer the wrong thing about its language.
        locale: ogLocaleFor(lang),
        title,
        description,
        images: [
          {
            url: ogImage,
            alt: title,
            width: 1200,
            height: 630,
            type: 'image/png'
          }
        ]
      }}
      additionalLinkTags={
        markdownUrl
          ? [
              {
                rel: 'alternate',
                type: 'text/markdown',
                href: markdownUrl
              }
            ]
          : []
      }
    />
  );
};

export default BlogSeo;
