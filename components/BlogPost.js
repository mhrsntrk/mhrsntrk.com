import Link from 'next/link';

const BlogPost = ({ title, excerpt, slug }) => {
  return (
    <div>
      <Link href={`/blog/${slug}`} className="w-full">
          <div className="w-full mb-8">
            <div className="flex flex-col justify-between md:flex-row">
              <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100 hover:underline">
                {title}
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{excerpt}</p>
          </div>
      </Link>
    </div>
  );
};

export default BlogPost;
