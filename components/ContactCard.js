export default function Card({ title, description, href}) {
  return (
    <a
      className="mb-4 hover:shadow"
      href={href}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center p-4 border border-gray-200 rounded md:h-40 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500">
        <div className="min-w-0">
          <span className="sr-only">{title}</span>
          <h4 className="text-base font-bold tracking-tight text-gray-800 sm:text-lg dark:text-gray-200">
            {title}
          </h4>
          <p className="text-sm leading-5 text-gray-600 sm:text-base dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}