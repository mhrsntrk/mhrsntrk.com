import { getAllPostsWithSlug } from '@/lib/strapi';

function buildMarkdownPost(post) {
  const date = new Date(post.date).toISOString().split('T')[0];
  return `# ${post.title}\n\n*${date}*\n\n${post.content}`;
}

function buildMarkdownIndex(posts) {
  const postsList = posts
    .map((post) => {
      const date = new Date(post.date).toISOString().split('T')[0];
      return `- [${post.title}](https://mhrsntrk.com/blog/${post.slug}) - ${date}`;
    })
    .join('\n');

  return `# Mahir Senturk\n\nPersonal website of Mahir Senturk.\n\n## Blog Posts\n\n${postsList}\n\n---\n\nFor more information, visit https://mhrsntrk.com`;
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
    const { path } = req.query;
    const posts = await getAllPostsWithSlug();

    if (!path || path.length === 0) {
      const markdown = buildMarkdownIndex(posts);
      const tokenCount = markdown.split(/\s+/).length;

      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      res.setHeader('x-markdown-tokens', String(tokenCount));
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      return res.status(200).send(markdown);
    }

    if (path[0] === 'blog' && path.length === 2) {
      const slug = path[1];
      const post = posts.find((p) => p.slug === slug);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const markdown = buildMarkdownPost(post);
      const tokenCount = markdown.split(/\s+/).length;

      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      res.setHeader('x-markdown-tokens', String(tokenCount));
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      return res.status(200).send(markdown);
    }

    return res.status(404).json({ error: 'Not found' });
  } catch (error) {
    console.error('Markdown API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}