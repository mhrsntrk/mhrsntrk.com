import { useState } from 'react';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import { getAllPostsForBlog } from '@/lib/strapi';

const url = 'https://mhrsntrk/blog';
const title = 'Blog – mhrsntrk';
const description =
  'Welcome to my personal blog. I try to collect my ideas, projects, code snippets in this website.';

export default function Blog({ allPosts }) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  return (
    <div>
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
        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-8">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
            Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {`I try to collect my ideas, projects, code snippets in this website.
            In total, I've written ${allPosts.length} posts on this website.
            You can use the search below to filter by title.`}
          </p>
          <div className="relative w-full mb-4">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search posts"
              className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-yellow-600 focus:border-yellow-600 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
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
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
            All Posts <p className="font-normal text-3xl inline">↴</p>
          </h3>
          {!filteredBlogPosts.length && 'No posts found.'}
          {filteredBlogPosts.map((post) => (
            <BlogPost
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPostsForBlog();
  return {
    props: { allPosts }
  };
}
