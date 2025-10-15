import { NextSeo, ArticleJsonLd } from 'next-seo';

const BlogSeo = ({ title, summary, publishedAt, url, image, avatar }) => {
  const date = new Date(publishedAt).toISOString();

  return (
    <>
      <NextSeo
        title={`${title} – mhrsntrk`}
        description={summary}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: date
          },
          url,
          title,
          description: summary,
        }}
      />
      <ArticleJsonLd
        authorName="mhrsntrk"
        dateModified={date}
        datePublished={date}
        description={summary}
        publisherLogo={avatar}
        publisherName="mhrsntrk"
        title={title}
        url={url}
      />
    </>
  );
};

export default BlogSeo;
