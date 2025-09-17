import { useState } from 'react';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import StructuredData, { BlogSchema } from '@/components/StructuredData';
import { getAllPostsForBlog } from '@/lib/strapi';

const url = 'https://mhrsntrk/blog';
const title = 'Blog – mhrsntrk';
const description =
  'Actually, I hate writing but I am aware that somebody will eventually benefit my writings. So, I am collecting my ideas, writings, code snippets and tutorials in this website that I own.';

export default function Blog({ allPosts }) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    );
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
            snippets and tutorials in this website that I own.
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
          <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            All Posts <p className="inline text-3xl font-normal">↴</p>
          </h3>
          {!filteredBlogPosts.length && 'No posts found.'}
          {filteredBlogPosts.map((post) => (
            <BlogPost
              key={post.slug}
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
