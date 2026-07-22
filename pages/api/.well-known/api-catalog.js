export default function handler(req, res) {
  const catalog = {
    linkset: [
      {
        anchor: 'https://mhrsntrk.com/.well-known/api-catalog',
        item: [
          {
            href: 'https://mhrsntrk.com/api/rss.xml',
            type: 'application/rss+xml',
            title: 'RSS Feed'
          },
          {
            href: 'https://mhrsntrk.com/api/markdown',
            type: 'text/markdown',
            title: 'Markdown API'
          },
          {
            href: 'https://mhrsntrk.com/reports/rss.xml',
            type: 'application/rss+xml',
            title: 'Reports Feed'
          },
          {
            href: 'https://mhrsntrk.com/reports.md',
            type: 'text/markdown',
            title: 'Reports Index (markdown)'
          }
        ],
        'service-doc': [
          {
            href: 'https://mhrsntrk.com/blog',
            type: 'text/html',
            title: 'Blog'
          },
          {
            href: 'https://mhrsntrk.com/reports',
            type: 'text/html',
            title: 'Reports'
          }
        ],
        'service-desc': [
          {
            href: 'https://mhrsntrk.com/llms.txt',
            type: 'text/plain',
            title: 'LLM-friendly site description'
          },
          {
            href: 'https://mhrsntrk.com/reports-full.txt',
            type: 'text/plain',
            title: 'Full text of every report'
          }
        ]
      }
    ]
  };

  res.setHeader(
    'Content-Type',
    'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"'
  );
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  // res.json() would reset Content-Type to application/json
  res.status(200).send(JSON.stringify(catalog));
}
