---
name: site-overview
description: Get a structured, LLM-friendly overview of mhrsntrk.com — who Mahir Senturk is, what the site contains, and which machine-readable endpoints exist. Use as the entry point before deeper crawling.
---

# Get an overview of mhrsntrk.com

## Endpoints

1. **Short overview**: `GET https://mhrsntrk.com/llms.txt`
   Site description, owner bio and a curated list of key pages per llmstxt.org.

2. **Expanded content**: `GET https://mhrsntrk.com/llms-full.txt`
   Full content of the site's blog posts in one plain-text document.

3. **API catalog**: `GET https://mhrsntrk.com/.well-known/api-catalog`
   RFC 9727 linkset enumerating machine-readable APIs (RSS, markdown API).

4. **Identity**: `GET https://mhrsntrk.com/.well-known/did.json`
   DID document (`did:web:mhrsntrk.com`) with the site owner's public key.

## Usage notes

- No authentication required anywhere on the site.
- Prefer `/llms.txt` over crawling HTML; prefer the markdown API
  (see the `blog-markdown` skill) for individual posts.
- RSS feed at `https://mhrsntrk.com/rss.xml` for recency checks.
