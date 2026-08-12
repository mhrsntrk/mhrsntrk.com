import ROBOTS_PROPS from './lib/robots';

// Doubles as the homepage <title>, so it carries what the page is about, not
// only who it belongs to. "Mahir Senturk" alone is 13 characters of a 60
// character slot and matches nothing anyone searches for.
const title = 'Mahir Senturk — Digital Identity, SSI and eIDAS';
// Employer deliberately absent, here and everywhere else on the site. The
// credibility has to come from the work, so the specifics carry it instead.
const description =
  'Notes on agent identity, self-sovereign identity (SSI) and verifiable credentials, from a decade of building decentralized identity systems in production.';

const SEO = {
  title,
  description,
  canonical: 'https://mhrsntrk.com',
  // next-seo emits the robots meta itself, so the snippet directives belong
  // here rather than in additionalMetaTags. Declaring them by hand there
  // produced a SECOND <meta name="robots"> on every page, which meant any page
  // opting out via noindex shipped "index, follow" and "noindex, follow"
  // together. Google resolves a conflict like that by taking the most
  // restrictive value, so nothing was mis-indexed, but the page was arguing
  // with itself and other crawlers are not obliged to break the tie the same
  // way. The per-engine googlebot/bingbot copies went with it: they only
  // repeated the generic directive.
  robotsProps: ROBOTS_PROPS,
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'Mahir Senturk, digital identity, self-sovereign identity, SSI, eIDAS, EUDI wallet, verifiable credentials, decentralized identity, identity policy, product manager'
    },
    {
      name: 'author',
      content: 'Mahir Senturk'
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
        alt: 'Mahir Senturk',
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
