import Image from 'next/image';
import { parseISO, format, isValid } from 'date-fns';

import BlogSeo from '@/components/BlogSeo';
import PostBody from '@/components/PostBody';
import CopyForLLMButton from '@/components/CopyForLLMButton';
import EmailCapture from '@/components/EmailCapture';
import StructuredData, { BlogPostingSchema } from '@/components/StructuredData';

// Some posts are written in Turkish. The site <html lang> is "en", so flag
// the article's language explicitly for screen readers and search engines.
// Detected via Turkish-specific letters (ı, ğ, ş) which are absent in English.
function detectLang(text = '') {
  const turkishChars = (text.match(/[ığş]/gi) || []).length;
  return turkishChars > 15 ? 'tr' : 'en';
}

// Parses a date string to a Date, or null if missing/invalid.
function safeDate(value) {
  if (!value) return null;
  const d = parseISO(value);
  return isValid(d) ? d : null;
}

export default function BlogLayout({ post }) {
  const publishedDate = safeDate(post.date);
  const updatedDate = safeDate(post.updatedAt);
  const showUpdated =
    publishedDate &&
    updatedDate &&
    format(updatedDate, 'yyyy-MM-dd') !== format(publishedDate, 'yyyy-MM-dd');

  const lang = detectLang(`${post.title} ${post.rawContent || ''}`);

  return (
    <div>
      <StructuredData data={BlogPostingSchema({ ...post, lang })} />
      <BlogSeo
        title={post.title}
        summary={post.excerpt}
        publishedAt={post.date}
        modifiedAt={post.updatedAt}
        slug={post.slug}
        url={`https://mhrsntrk.com/blog/${post.slug}`}
      />
      <article lang={lang} className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
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
              {publishedDate && ` / ${format(publishedDate, 'MMMM dd, yyyy')}`}
            </p>
          </div>
          {showUpdated && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 md:mt-0">
              Updated {format(updatedDate, 'MMMM dd, yyyy')}
            </p>
          )}
        </div>
        <div className="mb-4">
          <CopyForLLMButton content={post.rawContent} />
        </div>
        {post.excerpt && (
          <details
            open
            aria-label="Summary"
            className="w-full p-4 mb-4 border-l-4 border-black rounded-r bg-gray-100 dark:bg-gray-800 dark:border-white"
          >
            <summary className="text-xs font-bold tracking-widest text-gray-500 uppercase cursor-pointer select-none dark:text-gray-400">
              TL;DR
            </summary>
            <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
              {post.excerpt}
            </p>
          </details>
        )}
        <div className="w-full prose dark:prose-dark max-w-none">
          <PostBody content={post.content} />
        </div>
        <div className="w-full mt-8">
          <EmailCapture location="post-end" />
        </div>
      </article>
    </div>
  );
}
