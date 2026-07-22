import ReportCover from '@/components/ReportCover';

/**
 * A report in a list. Used by both /reports and the homepage, so the two can
 * never drift apart.
 *
 * Always opens in a new tab: a report is a standalone document, not another
 * page of this site.
 *
 * `showMeta` adds the date and tag row. The homepage leaves it off — the cover
 * already carries the sector and horizon there, and the page is long enough.
 */
export default function ReportCard({ report, showMeta = false }) {
  return (
    <a
      href={report.page}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-black"
    >
      <div className="mb-4 overflow-hidden border border-gray-200 rounded dark:border-gray-800 group-hover:border-red-500">
        <ReportCover report={report} />
      </div>
      <h2 className="text-xl font-bold text-black md:text-2xl dark:text-white group-hover:text-red-500">
        {report.title}
      </h2>
      <p className="mt-1 text-gray-600 dark:text-gray-400">
        {report.description}
      </p>
      {showMeta && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <time
            dateTime={report.date}
            className="text-sm text-gray-500 dark:text-gray-500"
          >
            {new Date(report.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </time>
          {report.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded dark:bg-gray-800 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
