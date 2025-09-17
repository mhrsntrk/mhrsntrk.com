const title = 'Mahir Senturk - Senior Product Manager & Blockchain Expert';
const description =
  'Senior Product Manager at The Hashgraph Group specializing in self-sovereign identity (SSI) solutions, blockchain technology, and decentralized systems. Former Energy Web developer with expertise in web3 and digital identity.';

const SEO = {
  title,
  description,
  canonical: 'https://mhrsntrk.com',
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'Mahir Senturk, blockchain, self-sovereign identity, SSI, web3, product manager, Hashgraph, Energy Web, decentralized identity, digital identity, blockchain developer, cryptocurrency, DeFi'
    },
    {
      name: 'author',
      content: 'Mahir Senturk'
    },
    {
      name: 'robots',
      content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    },
    {
      name: 'googlebot',
      content: 'index, follow'
    },
    {
      name: 'bingbot',
      content: 'index, follow'
    }
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mhrsntrk.com',
    siteName: 'Mahir Senturk',
    title,
    description,
    images: [
      {
        url: 'https://mhrsntrk.com/static/images/banner.jpg',
        alt: 'Mahir Senturk - Senior Product Manager & Blockchain Expert',
        width: 1280,
        height: 720,
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    handle: '@mhrsntrk',
    site: '@mhrsntrk',
    cardType: 'summary_large_image'
  },
  additionalLinkTags: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'Mahir Senturk Blog RSS Feed',
      href: 'https://mhrsntrk.com/rss.xml'
    }
  ]
};

export default SEO;
