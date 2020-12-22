import { NextSeo, ArticleJsonLd } from 'next-seo';

const BlogSeo = ({ title, summary, publishedAt, url, image, avatar }) => {
  const date = new Date(publishedAt).toISOString();
  /* const featuredImage = {
    url: `https://leerob.io${image}`,
    alt: title
  }; */

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
          /* images: [featuredImage] */
        }}
      />
      <ArticleJsonLd
        authorName="mhrsntrk"
        dateModified={date}
        datePublished={date}
        description={summary}
        /* images={[featuredImage]} */
        publisherLogo={avatar}
        publisherName="mhrsntrk"
        title={title}
        url={url}
      />
    </>
  );
};

export default BlogSeo;
