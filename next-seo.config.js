const title = 'mhrsntrk';
const description =
  '.';

const SEO = {
  title,
  description,
  canonical: 'https://mhrsntrk.com',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://mhrsntrk.com',
    title,
    description,
    images: [
      {
        url: 'https://mhrsntrk.com/static/images/banner.jpg',
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  },
  twitter: {
    handle: '@mhrsntrk',
    site: '@mhrsntrk',
    cardType: 'summary_large_image'
  }
};

export default SEO;
