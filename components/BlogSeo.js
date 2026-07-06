import { NextSeo } from 'next-seo';

// Article JSON-LD is emitted by BlogPostingSchema (components/StructuredData.js),
// which is richer (wordCount, sameAs, markdown encoding, dateModified). Keeping a
// second ArticleJsonLd here would duplicate the Article node on the page.
// Returns a valid ISO string for a parseable date, or null.
const toISO = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

const BlogSeo = ({ title, summary, publishedAt, modifiedAt, url, slug }) => {
  const date = toISO(publishedAt);
  const modified = toISO(modifiedAt) || date;
  const markdownUrl = slug
    ? `https://mhrsntrk.com/api/markdown/blog/${slug}`
    : null;

  // Per-post OG image rendered on the fly (title + handle, brand template).
  const ogImage = `https://mhrsntrk.com/api/og?title=${encodeURIComponent(title)}`;

  const article = {
    authors: ['https://mhrsntrk.com'],
    ...(date ? { publishedTime: date } : {}),
    ...(modified ? { modifiedTime: modified } : {})
  };

  return (
    <NextSeo
      title={`${title} – mhrsntrk`}
      description={summary}
      canonical={url}
      openGraph={{
        type: 'article',
        article,
        url,
        title,
        description: summary,
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
