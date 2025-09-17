import { getAllPostsForBlog } from '@/lib/strapi';

function generateRSSFeed(posts) {
  const rssItems = posts
    .map((post) => {
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>https://mhrsntrk.com/blog/${post.slug}</link>
      <guid isPermaLink="true">https://mhrsntrk.com/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>m@mhrsntrk.com (Mahir Senturk)</author>
    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mahir Senturk Blog</title>
    <description>Blog posts about blockchain, self-sovereign identity, web3, and technology by Mahir Senturk.</description>
    <link>https://mhrsntrk.com/blog</link>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://mhrsntrk.com/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>m@mhrsntrk.com (Mahir Senturk)</managingEditor>
    <webMaster>m@mhrsntrk.com (Mahir Senturk)</webMaster>
    <image>
      <url>https://mhrsntrk.com/static/images/banner.jpg</url>
      <title>Mahir Senturk Blog</title>
      <link>https://mhrsntrk.com/blog</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${rssItems}
  </channel>
</rss>`;
}

export default async function handler(req, res) {
  try {
    const posts = await getAllPostsForBlog();
    const rssFeed = generateRSSFeed(posts);

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.status(200).send(rssFeed);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).json({ error: 'Failed to generate RSS feed' });
  }
}
