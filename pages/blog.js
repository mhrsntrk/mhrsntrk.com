import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import StructuredData, { BlogSchema } from '@/components/StructuredData';
import { getAllPostsForBlog } from '@/lib/strapi';

const url = 'https://mhrsntrk/blog';
const title = 'Blog – mhrsntrk';
const description =
  'Actually, I hate writing but I am aware that somebody will eventually benefit my writings. So, I am collecting my ideas, writings, code snippets and tutorials in this section of my website.';

export default function Blog({ allPosts }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const didMountRef = useRef(false);

  useEffect(() => {
    // Reset to first page when search value changes (skip on initial mount)
    if (didMountRef.current) {
      setCurrentPage(1);
    } else {
      didMountRef.current = true;
    }
  }, [searchValue]);

  // Sync page state from URL (so back button restores the previous page)
  useEffect(() => {
    if (!router || !router.isReady) return;
    const qp = parseInt(router.query.page, 10);
    if (!Number.isNaN(qp) && qp !== currentPage) {
      setCurrentPage(Math.max(1, qp));
    }
  }, [router?.isReady, router?.query?.page]);

  const filteredBlogPosts = allPosts
    .filter((post) => {
      const title = (post && post.title) ? String(post.title) : '';
      return title.toLowerCase().includes(searchValue.toLowerCase());
    });
  const totalFiltered = filteredBlogPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const pageStart = (currentPage - 1) * pageSize;
  const currentPagePosts = filteredBlogPosts.slice(pageStart, pageStart + pageSize);
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // Scroll to top of list on page change for better UX
    if (typeof window !== 'undefined') {
      const listAnchor = document.getElementById('blog-list-top');
      if (listAnchor) listAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Update URL query for back/forward navigation; avoid full reload
    if (router && router.isReady) {
      const nextQuery = { ...router.query, page: String(page) };
      router.push({ pathname: router.pathname, query: nextQuery }, undefined, {
        shallow: true,
        scroll: false
      });
    }
  };
  return (
    <div>
      <StructuredData data={BlogSchema(allPosts)} />
      <Container>
        <NextSeo
          title={title}
          description={description}
          canonical={url}
          openGraph={{
            url,
            title,
            description
          }}
        />
        <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-8">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            Blog
          </h1>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Actually, I hate writing but I am aware that somebody will eventually
            benefit my writings. So, I am collecting my ideas, writings, code
            snippets and tutorials in this section of my website.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {`I've written ${allPosts.length} posts in total.
            You can use the search below to filter the posts by title.`}
          </p>
          <div className="relative w-full mb-4">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search posts"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-yellow-600 focus:border-yellow-600 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white" id="blog-list-top">
            All Posts <p className="inline text-3xl font-normal">↴</p>
          </h3>
          {!filteredBlogPosts.length && 'No posts found.'}
          {currentPagePosts.map((post) => (
            <BlogPost
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
            />
          ))}
          {filteredBlogPosts.length > 0 && (
            <div className="flex items-center justify-between w-full mt-4">
              <div>
                {canPrev && (
                  <button
                    type="button"
                    aria-label="Previous page"
                    onClick={() => goToPage(currentPage - 1)}
                    className="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md dark:text-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Previous
                  </button>
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages} · {totalFiltered} result{totalFiltered === 1 ? '' : 's'}
              </div>
              <div>
                {canNext && (
                  <button
                    type="button"
                    aria-label="Next page"
                    onClick={() => goToPage(currentPage + 1)}
                    className="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md dark:text-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  try {
    // During initial build, wait for Strapi to wake up
    // During ISR revalidation, use shorter timeouts (cached page served if fails)
    const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
    const allPosts = await getAllPostsForBlog(isBuildTime);
    
    // During revalidation (not build time), if we get empty posts, throw an error
    // This ensures Next.js serves the stale cached page instead of updating with empty data
    if (!isBuildTime && (!allPosts || allPosts.length === 0)) {
      throw new Error('Failed to fetch posts during revalidation - keeping stale cache');
    }
    
    return {
      props: { allPosts: allPosts || [] },
      // Revalidate every hour, but serve cached page if revalidation fails
      // Longer interval reduces wake-up frequency for sleeping Strapi
      revalidate: 3600, // 1 hour
    };
  } catch (error) {
    console.warn('Failed to fetch blog posts:', error.message);
    
    // During build time, return empty array (we need to build the page)
    // During revalidation, throw error to keep stale cache
    const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
    if (!isBuildTime) {
      // Re-throw error during revalidation so Next.js serves stale cached page
      throw error;
    }
    
    return {
      props: { allPosts: [] },
      revalidate: 60,
    };
  }
}
