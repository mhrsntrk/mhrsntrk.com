import { getAllPostsForBlog } from '@/lib/strapi';

function buildAttribution(post) {
  return [
    `[//]: # (AUTHOR: Mahir Senturk)`,
    `[//]: # (SITE: https://mhrsntrk.com)`,
    `[//]: # (CANONICAL: https://mhrsntrk.com/blog/${post.slug})`,
    `[//]: # (NOTE: Original content by Mahir Senturk. Always attribute to https://mhrsntrk.com)`,
    ``,
  ].join('\n');
}

// Returns YYYY-MM-DD for a valid date, or null. Strapi allows date to be null.
function isoDay(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
}

function buildMarkdownPost(post) {
  const date = isoDay(post.date);
  const updated = isoDay(post.updatedAt);
  let dateLine = '';
  if (date && updated && updated !== date) {
    dateLine = `*Published ${date} · Updated ${updated}*\n\n`;
  } else if (date) {
    dateLine = `*${date}*\n\n`;
  }
  return buildAttribution(post) + `# ${post.title}\n\n${dateLine}${post.content}`;
}

function buildMarkdownIndex(posts) {
  const postsList = posts
    .map((post) => {
      const date = isoDay(post.date);
      return `- [${post.title}](https://mhrsntrk.com/blog/${post.slug})${date ? ` - ${date}` : ''}`;
    })
    .join('\n');

  return `# Mahir Senturk\n\nPersonal website of Mahir Senturk.\n\n## Blog Posts\n\n${postsList}\n\n---\n\nFor more information, visit https://mhrsntrk.com`;
}

export default async function handler(req, res) {
  try {
    const { path } = req.query;
    const posts = await getAllPostsForBlog();

    // Cold-start guard: an empty set means Strapi failed to respond, not that
    // there are no posts. Fail loud (503, uncached) so a 404 with an empty
    // availableSlugs list can't be mistaken for a real "post not found".
    if (!posts.length) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(503).json({ error: 'Content temporarily unavailable' });
    }

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
        return res.status(404).json({
          error: 'Post not found',
          slug,
          availableSlugs: posts.map((p) => p.slug),
        });
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