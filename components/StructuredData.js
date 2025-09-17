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
  description: 'Senior Product Manager at The Hashgraph Group specializing in self-sovereign identity (SSI) solutions, blockchain technology, and decentralized systems.',
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
    description: 'Leading product development for self-sovereign identity solutions on Hedera blockchain',
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
  description: 'Personal website of Mahir Senturk, Senior Product Manager at The Hashgraph Group specializing in blockchain and self-sovereign identity solutions.',
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
  description: 'Blog posts about blockchain, self-sovereign identity, web3, and technology by Mahir Senturk.',
  author: {
    '@type': 'Person',
    name: 'Mahir Senturk'
  },
  blogPost: posts.map(post => ({
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

export default StructuredData;
