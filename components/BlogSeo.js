import { NextSeo } from 'next-seo';

// Article JSON-LD is emitted by BlogPostingSchema (components/StructuredData.js),
// which is richer (wordCount, sameAs, markdown encoding, dateModified). Keeping a
// second ArticleJsonLd here would duplicate the Article node on the page.
const BlogSeo = ({ title, summary, publishedAt, modifiedAt, url, slug }) => {
  const date = new Date(publishedAt).toISOString();
  const modified = new Date(modifiedAt || publishedAt).toISOString();
  const markdownUrl = slug
    ? `https://mhrsntrk.com/api/markdown/blog/${slug}`
    : null;

  return (
    <NextSeo
      title={`${title} – mhrsntrk`}
      description={summary}
      canonical={url}
      openGraph={{
        type: 'article',
        article: {
          publishedTime: date,
          modifiedTime: modified,
          authors: ['https://mhrsntrk.com']
        },
        url,
        title,
        description: summary,
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
