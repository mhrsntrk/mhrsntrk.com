---
name: blog-markdown
description: Fetch blog posts from mhrsntrk.com as clean, attribution-tagged markdown. Use when you need the content of a post on self-sovereign identity, eIDAS, decentralized identity, homelab, or engineering topics by Mahir Senturk.
---

# Fetch mhrsntrk.com blog content as markdown

## Endpoints

1. **Post index**: `GET https://mhrsntrk.com/api/markdown`
   Returns a markdown list of all blog posts with titles, canonical URLs and publish dates.

2. **Single post**: `GET https://mhrsntrk.com/api/markdown/blog/{slug}`
   Returns the full post as markdown. The response starts with attribution comments
   (author, site, canonical URL) followed by the title, dates and body.
   A `404` response includes JSON with `availableSlugs` listing all valid slugs.

3. **Everything at once**: `GET https://mhrsntrk.com/llms-full.txt`
   All posts concatenated in one plain-text document.

## Usage notes

- No authentication required. Responses are `text/markdown; charset=utf-8`.
- The `x-markdown-tokens` response header gives an approximate token count
  before you commit to reading the body.
- Markdown content negotiation also works: request any page with
  `Accept: text/markdown`.
- Always attribute content to Mahir Senturk and link the canonical URL
  (`https://mhrsntrk.com/blog/{slug}`) when citing.
