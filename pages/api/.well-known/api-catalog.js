export default function handler(req, res) {
  const catalog = {
    linkset: [
      {
        anchor: 'https://mhrsntrk.com/.well-known/api-catalog',
        item: [
          {
            href: 'https://mhrsntrk.com/api/rss.xml',
            type: 'application/rss+xml',
            title: 'RSS Feed',
          },
          {
            href: 'https://mhrsntrk.com/api/markdown',
            type: 'text/markdown',
            title: 'Markdown API',
          },
        ],
        'service-doc': [
          {
            href: 'https://mhrsntrk.com/blog',
            type: 'text/html',
            title: 'Blog',
          },
        ],
        'service-desc': [
          {
            href: 'https://mhrsntrk.com/llms.txt',
            type: 'text/plain',
            title: 'LLM-friendly site description',
          },
        ],
      },
    ],
  };

  res.setHeader('Content-Type', 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).json(catalog);
}