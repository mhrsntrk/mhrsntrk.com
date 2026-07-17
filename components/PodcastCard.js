import Image from 'next/image';

const blurDataURL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

export default function PodcastCard({
  title,
  description,
  href,
  icon,
  width,
  height
}) {
  const content = (
    <div className="flex items-center p-4 border border-gray-200 rounded md:h-40 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500">
      {icon && (
        <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 mr-4 sm:w-20 sm:h-20">
          <span className="sr-only">{title}</span>
          <Image
            alt={`${title} icon`}
            height={height || 120}
            width={width || 120}
            src={`/static/icons/${icon}.png?v=5`}
            className="object-contain w-full h-full"
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      )}
      <div className="min-w-0">
        <h4 className="text-base font-bold tracking-tight text-gray-900 sm:text-lg dark:text-gray-100">
          {title}
        </h4>
        {description && (
          <p className="text-sm leading-5 text-gray-700 sm:text-base dark:text-gray-300">
            {description}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        className="block mb-4 hover:shadow"
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
