import Image from 'next/image';

export default function PodcastCard({ title, description, href, icon, width, height }) {
  const content = (
      <div className="flex items-center h-40 p-4 border border-gray-200 rounded dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500">
        {icon && (
          <div className="ml-2 mr-4 min-w-xxs max-w-xxs flex-shrink-0">
            <span className="sr-only">{title}</span>
            <Image
              alt={`${title} icon`}
              height={height || 120}
              width={width || 120}
              src={`/static/icons/${icon}.png?v=5`}
              className=""
              priority={false}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
        )}
        <div>
          <h4 className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h4>
          {description && (
            <p className="leading-5 text-gray-700 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
      </div>
  );

  if (href) {
    return (
      <a
        className="mb-4 hover:shadow block"
        href={href}
        aria-label={title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return <div className="mb-4">{content}</div>;
}