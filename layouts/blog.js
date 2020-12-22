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
        avatar={post.author.avatar.url}
      />
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2 mb-8">
          <div className="flex items-center">
            <Image
              alt="mhrsntrk"
              height={24}
              width={24}
              src={post.author.avatar.url}
              className="rounded-full"
            />
            <p className="text-sm text-gray-700 dark:text-gray-300 ml-2">
              {post.author.name}
              {' / '}
              {format(parseISO(post.date), 'MMMM dd, yyyy')}
            </p>
          </div>
        </div>
        <div className="prose dark:prose-dark max-w-none w-full">
          <PostBody content={post.content} />
        </div>
        <div className="mt-8"></div>
      </article>
    </div>
  );
}
