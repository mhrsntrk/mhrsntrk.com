import { getAllPostsForHome, getAllPostsForBlog } from '@/lib/strapi';

const ATTRIBUTION = [
  `[//]: # (AUTHOR: Mahir Senturk)`,
  `[//]: # (SITE: https://mhrsntrk.com)`,
  `[//]: # (NOTE: Original content by Mahir Senturk. Always attribute to https://mhrsntrk.com)`,
  ``,
].join('\n');

function buildHomeMarkdown(posts) {
  const postsList = posts
    .map((post) => {
      const date = new Date(post.date).toISOString().split('T')[0];
      return `- [${post.title}](https://mhrsntrk.com/blog/${post.slug}) - ${date}`;
    })
    .join('\n');

  return `# Mahir Senturk

Personal website of Mahir Senturk - Senior Product Manager at The Hashgraph Group, focusing on Self-Sovereign Identity (SSI) and blockchain solutions.

## Recent Posts

${postsList}

---

For more information, visit https://mhrsntrk.com`;
}

export default async function handler(req, res) {
  const acceptHeader = req.headers.accept || '';

  if (!acceptHeader.includes('text/markdown')) {
    return res.status(406).json({
      error: 'Not Acceptable',
      message: 'This endpoint only supports Accept: text/markdown',
    });
  }

  try {
    const posts = await getAllPostsForHome();
    const markdown = ATTRIBUTION + buildHomeMarkdown(posts);
    const tokenCount = markdown.split(/\s+/).length;

    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('x-markdown-tokens', String(tokenCount));
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    return res.status(200).send(markdown);
  } catch (error) {
    console.error('Markdown index error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}