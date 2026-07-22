import Head from 'next/head';

const StructuredData = ({ data }) => {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
};

export const PersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mahir Senturk',
  alternateName: 'mhrsntrk',
  jobTitle: 'Senior Product Manager',
  worksFor: {
    '@type': 'Organization',
    name: 'The Hashgraph Group',
    url: 'https://hashgraph.com'
  },
  alumniOf: [
    {
      '@type': 'Organization',
      name: 'Energy Web'
    }
  ],
  description:
    'Senior Product Manager at The Hashgraph Group specializing in self-sovereign identity (SSI) solutions, blockchain technology, and decentralized systems.',
  url: 'https://mhrsntrk.com',
  sameAs: [
    'https://twitter.com/mhrsntrk',
    'https://github.com/mhrsntrk',
    'https://www.linkedin.com/in/mahirsenturk',
    'https://t.me/mhrsntrk'
  ],
  knowsAbout: [
    'Self-Sovereign Identity',
    'Blockchain Technology',
    'Web3',
    'Decentralized Identity',
    'Product Management',
    'Digital Identity',
    'Cryptocurrency',
    'DeFi'
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Senior Product Manager',
    description:
      'Leading product development for self-sovereign identity solutions on Hedera blockchain',
    skills: [
      'Product Management',
      'Blockchain Development',
      'Self-Sovereign Identity',
      'Web3 Technologies',
      'Strategic Planning'
    ]
  }
};

export const WebsiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mahir Senturk - Personal Website',
  url: 'https://mhrsntrk.com',
  description:
    'Personal website of Mahir Senturk, Senior Product Manager at The Hashgraph Group specializing in blockchain and self-sovereign identity solutions.',
  author: {
    '@type': 'Person',
    name: 'Mahir Senturk'
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://mhrsntrk.com/blog?search={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

export const BlogSchema = (posts) => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Mahir Senturk Blog',
  url: 'https://mhrsntrk.com/blog',
  description:
    'Blog posts about blockchain, self-sovereign identity, web3, and technology by Mahir Senturk.',
  author: {
    '@type': 'Person',
    name: 'Mahir Senturk'
  },
  blogPost: posts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `https://mhrsntrk.com/blog/${post.slug}`,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Mahir Senturk'
    }
  }))
});

// Reports are long-form sector research notes, not blog posts. Each published
// document already carries its own JSON-LD Report block; this mirrors it at the
// canonical URL, which is what crawlers actually fetch.
export const ReportSchema = (report) => {
  const url = `https://mhrsntrk.com${report.page}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Report',
    headline: report.title,
    description: report.description,
    url,
    image: `https://mhrsntrk.com${report.og}`,
    datePublished: report.date,
    dateModified: report.updated || report.date,
    inLanguage: 'en',
    isAccessibleForFree: true,
    keywords: report.tags,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    author: {
      '@type': 'Person',
      name: 'Mahir Senturk',
      url: 'https://mhrsntrk.com'
    },
    publisher: {
      '@type': 'Person',
      name: 'Mahir Senturk',
      url: 'https://mhrsntrk.com'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  };
};

export const BreadcrumbSchema = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: `https://mhrsntrk.com${crumb.path}`
  }))
});

export const ReportsCollectionSchema = (reports) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Reports',
  url: 'https://mhrsntrk.com/reports',
  description:
    'Long-form sector research notes: where the money moves, what regulation forces, and what a buyer will actually sign.',
  author: {
    '@type': 'Person',
    name: 'Mahir Senturk'
  },
  hasPart: reports.map((report) => ({
    '@type': 'Report',
    headline: report.title,
    description: report.description,
    url: `https://mhrsntrk.com${report.page}`,
    datePublished: report.date,
    author: {
      '@type': 'Person',
      name: 'Mahir Senturk'
    }
  }))
});

export const BlogPostingSchema = (post) => {
  const url = `https://mhrsntrk.com/blog/${post.slug}`;
  const wordCount = post.rawContent
    ? post.rawContent.trim().split(/\s+/).filter(Boolean).length
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || '',
    url,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    inLanguage: post.lang === 'tr' ? 'tr-TR' : 'en-US',
    isAccessibleForFree: true,
    image: 'https://mhrsntrk.com/static/images/banner.jpg',
    ...(wordCount ? { wordCount } : {}),
    author: {
      '@type': 'Person',
      name: 'Mahir Senturk',
      url: 'https://mhrsntrk.com',
      sameAs: [
        'https://twitter.com/mhrsntrk',
        'https://github.com/mhrsntrk',
        'https://www.linkedin.com/in/mahirsenturk'
      ]
    },
    publisher: {
      '@type': 'Person',
      name: 'Mahir Senturk',
      url: 'https://mhrsntrk.com'
    },
    // Clean machine-readable copy of this post for LLM fetchers
    encoding: {
      '@type': 'MediaObject',
      encodingFormat: 'text/markdown',
      contentUrl: `https://mhrsntrk.com/api/markdown/blog/${post.slug}`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  };
};

// FAQPage schema, built from a post's markdown when it contains an FAQ section.
// Convention (matches how posts are authored): an "## FAQ" / "## Frequently
// asked questions" heading, then each question as a bold-only line
// (**Question?**) followed by its answer paragraph(s). Returns null when the
// post has no FAQ section, so callers can conditionally render it.
export const FAQPageSchema = (post) => {
  const md = (post && post.rawContent) || '';
  const lines = md.split('\n');

  let start = -1;
  let level = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].trim().match(/^(#{2,3})\s+(faq|frequently asked)/i);
    if (m) {
      start = i + 1;
      level = m[1].length;
      break;
    }
  }
  if (start === -1) return null;

  const clean = (s) =>
    s
      .replace(/\*\*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();

  const qa = [];
  let q = null;
  let ans = [];
  const flush = () => {
    if (q && ans.length) qa.push({ q, a: clean(ans.join(' ')) });
  };
  const headingBreak = new RegExp(`^#{1,${level}}\\s`);

  for (let i = start; i < lines.length; i++) {
    const s = lines[i].trim();
    if (headingBreak.test(s)) break; // next same-or-higher heading ends the FAQ
    const qm = s.match(/^\*\*([^*]+)\*\*$/);
    if (qm) {
      flush();
      q = qm[1].trim().replace(/:$/, '');
      ans = [];
    } else if (s && q) {
      ans.push(s);
    }
  }
  flush();

  if (!qa.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };
};

export default StructuredData;
