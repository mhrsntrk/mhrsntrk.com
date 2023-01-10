export default function Card({ icon, title, href }) {
  return (
    <a
      className="mb-4 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 hover:underline"
      href={href}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center p-2">
        {icon == 'twitter' && (
          <div className="ml-2 mr-4 text-sm">
            <span className="sr-only">Twitter</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </g>
            </svg>
          </div>
        )}
        {icon == 'github' && (
          <div className="ml-2 mr-4 text-sm">
            <span className="sr-only">Github</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </g>
            </svg>
          </div>
        )}
        {icon == 'linkedin' && (
          <div className="mb-1 ml-2 mr-4 text-sm">
            <span className="sr-only">LinkedIn</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </g>
            </svg>
          </div>
        )}
        {icon == 'telegram' && (
          <div className="ml-2 mr-4 text-sm">
            <span className="sr-only">Telegram</span>
            <svg
              className="w-5 h-5"
              viewBox="0 0 15 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 1.5L0.5 6.5L4.5 8.5L10.5 4.5L6.5 9.5L12.5 13.5L14.5 1.5Z" />
            </svg>
          </div>
        )}
        <h4 className="text-lg font-semibold tracking-tight">{title}</h4>
      </div>
    </a>
  );
}
