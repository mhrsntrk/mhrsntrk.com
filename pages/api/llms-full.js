import { getAllPostsForBlog } from '@/lib/strapi';

/**
 * /llms-full.txt — full-content export for LLM/RAG fetchers.
 *
 * Unlike /llms.txt (an index of links), this serves every blog post's
 * complete markdown body inline, so an AI agent can ingest the whole site
 * in a single request. See https://llmstxt.org/
 */

function buildHeader(posts) {
  return [
    '# Mahir Senturk — Full Content Export',
    '',
    '> Personal website of Mahir Senturk, Senior Product Manager at The Hashgraph Group,',
    '> focusing on Self-Sovereign Identity (SSI), blockchain, and decentralized systems.',
    '> Canonical source: https://mhrsntrk.com',
    '> Author: Mahir Senturk',
    '> License: original content. Attribution to https://mhrsntrk.com required when citing.',
    `> Posts included: ${posts.length}`,
    `> Generated: ${new Date().toISOString()}`,
    '',
    'This file contains the full text of every blog post. Each post is delimited by',
    'a horizontal rule and carries its own canonical URL, publish date, and update date.',
    ''
  ].join('\n');
}

// Returns YYYY-MM-DD for a valid date, or null. Strapi allows date to be null.
function isoDay(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
}

function buildPost(post) {
  const url = `https://mhrsntrk.com/blog/${post.slug}`;
  const date = isoDay(post.date);
  const updated = isoDay(post.updatedAt);
  const dateLine =
    date && updated && updated !== date
      ? `Published ${date} · Updated ${updated}`
      : `Published ${date || 'unknown'}`;

  return [
    '---',
    '',
    `# ${post.title}`,
    '',
    `Source: ${url}`,
    dateLine,
    post.excerpt ? `\nSummary: ${post.excerpt}` : '',
    '',
    (post.content || '').trim(),
    ''
  ].join('\n');
}

export default async function handler(req, res) {
  try {
    const posts = await getAllPostsForBlog();

    // Cold-start guard: don't ship an empty export if Strapi failed to respond.
    if (!posts.length) {
      res.setHeader('Cache-Control', 'no-store');
      return res
        .status(503)
        .send('# Temporarily unavailable\n\nRetry shortly.');
    }

    const body =
      buildHeader(posts) +
      '\n' +
      posts.map(buildPost).join('\n') +
      '\n---\n\nFor more information, visit https://mhrsntrk.com\n';

    const tokenCount = body.split(/\s+/).filter(Boolean).length;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('x-markdown-tokens', String(tokenCount));
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    return res.status(200).send(body);
  } catch (error) {
    console.error('llms-full.txt error:', error);
    return res
      .status(500)
      .send('# Error\n\nCould not generate full content export.');
  }
}
