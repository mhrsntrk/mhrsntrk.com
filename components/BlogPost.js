import Link from 'next/link';

const BlogPost = ({ title, excerpt, slug }) => {
  return (
    <div>
      <Link href={`/blog/${slug}`}>
        <a className="w-full">
          <div className="mb-8 w-full">
            <div className="flex flex-col md:flex-row justify-between">
              <h4 className="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
                {title}
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{excerpt}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default BlogPost;
