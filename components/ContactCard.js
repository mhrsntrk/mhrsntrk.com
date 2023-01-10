export default function Card({ title, description, href}) {
  return (
    <a
      className="mb-4 hover:shadow"
      href={href}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center h-40 p-4 border border-gray-200 rounded dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500">
          <div className="ml-4">
            <span className="sr-only">{title}</span>
          </div>
        <div>
          <h4 className="text-lg font-bold tracking-tight text-gray-800 dark:text-gray-200">
            {title}
          </h4>
          <p className="leading-5 text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}