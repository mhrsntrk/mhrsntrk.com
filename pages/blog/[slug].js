import ErrorPage from 'next/error';
import { useRouter } from 'next/router';

import { getAllPostsWithSlug, getPostAndMorePosts, wakeUpStrapi } from '@/lib/strapi';
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
            <hr className="mx-2 mt-8 mb-4 border-black dark:border-white sm:mx-8 md:mx-16 lg:mx-32 xl:mx-32" />
            <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-black md:text-3xl dark:text-white">
                See More
              </h2>
              {morePosts.length > 0 &&
                morePosts.map((post) => (
                  <BlogPost
                    key={post.slug}
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
  try {
    // Explicitly wake up Strapi before fetching all posts
    // This ensures Strapi is ready before we start the build process
    console.log('[getStaticPaths] Waking up Strapi before fetching post slugs...');
    try {
      await wakeUpStrapi(true);
    } catch (wakeError) {
      console.warn('[getStaticPaths] Wake-up failed, but continuing with fetch:', wakeError.message);
      // Continue anyway - the fetch will also try to wake up Strapi
    }
    
    // Pass isBuildTime=true to enable wake-up retry logic and longer timeouts
    const allPosts = await getAllPostsWithSlug(true);
    const paths = allPosts?.map((post) => `/blog/${post.slug}`) || [];
    
    console.log(`[getStaticPaths] Generated ${paths.length} blog post paths`);
    
    // Use fallback: false to ensure all posts are generated at build time
    // Any post not in this list will return 404
    return {
      fallback: false,
      paths
    };
  } catch (error) {
    console.error('[getStaticPaths] Failed to fetch post slugs during build:', error.message);
    console.error('[getStaticPaths] Stack:', error.stack);
    // Fail the build if we can't fetch posts - this ensures we don't deploy with missing posts
    throw new Error(`Failed to fetch blog posts during build: ${error.message}`);
  }
}

export async function getStaticProps({ params }) {
  try {
    // All pages are generated at build time only
    // We detect build time by checking if we're in a build context
    const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
    const data = await getPostAndMorePosts(params.slug, isBuildTime);
    
    // At this point, if we get here, the post exists (function throws if not found)
    const content = await markdownToHtml(data.posts[0].content || '');
    
    return {
      props: {
        post: {
          ...data.posts[0],
          content
        },
        morePosts: data?.morePosts || []
      },
      // No revalidate - pages are fully static and never regenerate after build
    };
  } catch (error) {
    console.error(`[getStaticProps] Failed to fetch blog post "${params.slug}":`, error.message);
    
    // Check if it's a "not found" error (post doesn't exist)
    if (error.message?.includes('not found') || error.message?.includes('404')) {
      console.log(`[getStaticProps] Post "${params.slug}" does not exist, returning 404`);
      return {
        notFound: true,
      };
    }
    
    // For other errors (network, timeout, API down), log but still return 404
    // The retry logic in secureFetch should have already retried
    // Since we're using static generation, build will fail if posts can't be fetched
    console.error(`[getStaticProps] API error for "${params.slug}" during build`);
    return {
      notFound: true,
    };
  }
}
