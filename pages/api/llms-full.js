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
    '',
  ].join('\n');
}

function buildPost(post) {
  const url = `https://mhrsntrk.com/blog/${post.slug}`;
  const date = post.date
    ? new Date(post.date).toISOString().split('T')[0]
    : 'unknown';
  const updated = post.updatedAt
    ? new Date(post.updatedAt).toISOString().split('T')[0]
    : null;
  const dateLine =
    updated && updated !== date
      ? `Published ${date} · Updated ${updated}`
      : `Published ${date}`;

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
    '',
  ].join('\n');
}

export default async function handler(req, res) {
  try {
    const posts = await getAllPostsForBlog();

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
    return res.status(500).send('# Error\n\nCould not generate full content export.');
  }
}
