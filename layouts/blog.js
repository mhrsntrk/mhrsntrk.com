import Image from 'next/image';
import { parseISO, format } from 'date-fns';

import BlogSeo from '@/components/BlogSeo';
import PostBody from '@/components/PostBody';

export default function BlogLayout({ post }) {
  return (
    <div>
      <BlogSeo
        title={post.title}
        summary={post.excerpt}
        publishedAt={post.date}
        url={`https://mhrsntrk.com/blog/${post.slug}`}
        avatar="https://mhrsntrk.com/mhrsntrk-PP.jpg"
      />
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 mb-8 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt={post.author?.name || "mhrsntrk"}
              height={24}
              width={24}
              src={post.author?.avatar?.url || "/mhrsntrk-PP.jpg"}
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {post.author?.name || "mhrsntrk"}
              {' / '}
              {format(parseISO(post.date), 'MMMM dd, yyyy')}
            </p>
          </div>
        </div>
        <div className="w-full prose dark:prose-dark max-w-none">
          <PostBody content={post.content} />
        </div>
        <div className="mt-8"></div>
      </article>
    </div>
  );
}
