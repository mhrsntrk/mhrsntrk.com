import ErrorPage from 'next/error';
import { useRouter } from 'next/router';

import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/strapi';
import markdownToHtml from '@/lib/markdownToHtml';
import BlogPost from '@/components/BlogPost';
import Container from '@/components/Container';
import BlogLayout from '@/layouts/blog';

export default function Blog({ post, morePosts }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div>
      {router.isFallback ? (
        <h1>Loading...</h1>
      ) : (
        <Container>
          <div>
            <BlogLayout post={post} />
            <hr className="border-black dark:border-white mt-8 mb-4 mx-2 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-32" />
            <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
              <h2 className="font-bold text-2xl md:text-3xl tracking-tight mb-8 text-black dark:text-white">
                See More
              </h2>
              {morePosts.length > 0 &&
                morePosts.map((post) => (
                  <BlogPost
                    title={post.title}
                    excerpt={post.excerpt}
                    slug={post.slug}
                  />
                ))}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    fallback: true,
    paths: allPosts?.map((post) => `/blog/${post.slug}`) || []
  };
}

export async function getStaticProps({ params }) {
  const data = await getPostAndMorePosts(params.slug);
  const content = await markdownToHtml(data?.posts[0]?.content || '');
  return {
    props: {
      post: {
        ...data?.posts[0],
        content
      },
      morePosts: data?.morePosts
    }
  };
}
