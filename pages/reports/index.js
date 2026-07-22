import { useMemo, useState } from 'react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

import Container from '@/components/Container';
import ReportCard from '@/components/ReportCard';
import StructuredData, {
  BreadcrumbSchema,
  ReportsCollectionSchema
} from '@/components/StructuredData';
import { getAllReports, SITE_URL } from '@/lib/reports';

const url = `${SITE_URL}/reports`;
const title = 'Reports – mhrsntrk';
const description =
  'Long-form sector research notes: where the money moves, what regulation forces, and what a B2B buyer will actually sign. Every figure source-tagged.';

export default function Reports({ reports }) {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState([]);

  // Tags in first-seen order across the (already newest-first) list, so the
  // filter row stays stable as reports are added.
  const allTags = useMemo(() => {
    const seen = [];
    reports.forEach((report) =>
      report.tags.forEach((tag) => {
        if (!seen.includes(tag)) seen.push(tag);
      })
    );
    return seen;
  }, [reports]);

  const toggleTag = (tag) =>
    setActiveTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag]
    );

  const clearFilters = () => {
    setQuery('');
    setActiveTags([]);
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter((report) => {
      // Any selected tag matches, rather than all of them: with a handful of
      // reports an AND filter empties the list on the second click.
      const tagged =
        activeTags.length === 0 ||
        activeTags.some((tag) => report.tags.includes(tag));
      if (!tagged) return false;
      if (!q) return true;
      return [report.title, report.description, report.sector, ...report.tags]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q));
    });
  }, [reports, query, activeTags]);

  const filtering = query.trim() !== '' || activeTags.length > 0;

  return (
    <div>
      <StructuredData data={ReportsCollectionSchema(reports)} />
      <StructuredData
        data={BreadcrumbSchema([
          { name: 'Home', path: '' },
          { name: 'Reports', path: '/reports' }
        ])}
      />
      <Container>
        <Head>
          <link
            rel="alternate"
            type="application/rss+xml"
            title="mhrsntrk Reports"
            href={`${SITE_URL}/reports/rss.xml`}
          />
          {/* Machine-readable surfaces for AI answer engines and agents. */}
          <link
            rel="alternate"
            type="text/markdown"
            title="Reports index (markdown)"
            href={`${SITE_URL}/reports.md`}
          />
        </Head>
        <NextSeo
          title={title}
          description={description}
          canonical={url}
          openGraph={{
            url,
            title,
            description,
            images: [
              {
                url: `${SITE_URL}/api/og?title=${encodeURIComponent(
                  'Reports'
                )}`,
                alt: 'Reports – mhrsntrk',
                width: 1200,
                height: 630
              }
            ]
          }}
        />
        <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            Reports
          </h1>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Long-form sector research notes. Where the money moves, which
            deadlines force a purchase, and what a buyer will actually sign —
            with the provenance of every figure attached.
          </p>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Each report is a standalone document and opens in a new tab. All of
            them ship as markdown and PDF too, under{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 underline dark:text-gray-100 hover:text-red-500"
            >
              CC BY 4.0
            </a>
            .
          </p>

          <div className="relative w-full mb-4">
            <input
              aria-label="Search reports"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reports"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {allTags.length > 0 && (
            <div
              className="flex flex-wrap items-center gap-2 mb-4"
              role="group"
              aria-label="Filter reports by tag"
            >
              {allTags.map((tag) => {
                const active = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    aria-pressed={active}
                    className={`px-2 py-1 text-xs border rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      active
                        ? 'border-red-500 text-red-600 dark:text-red-500'
                        : 'text-gray-700 border-gray-300 dark:border-gray-700 dark:text-gray-300 hover:border-gray-500 dark:hover:border-gray-500'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between w-full mb-8 text-sm text-gray-500 dark:text-gray-500">
            <span aria-live="polite">
              {filtering
                ? `${visible.length} of ${reports.length} report${
                    reports.length === 1 ? '' : 's'
                  }`
                : `${reports.length} report${reports.length === 1 ? '' : 's'}`}
            </span>
            {filtering && (
              <button
                type="button"
                onClick={clearFilters}
                className="underline hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Clear
              </button>
            )}
          </div>

          {visible.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              {reports.length === 0
                ? 'No reports published yet.'
                : 'No reports match that search.'}
            </p>
          ) : (
            <ul className="w-full space-y-12">
              {visible.map((report) => (
                <li key={report.slug} className="w-full">
                  <ReportCard report={report} showMeta />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  return { props: { reports: getAllReports() } };
}
