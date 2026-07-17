# mhrsntrk.com

My personal website. A Next.js frontend backed by a headless Strapi CMS, styled with Tailwind CSS, and deployed on Vercel.

Live at **[mhrsntrk.com](https://mhrsntrk.com)**.

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](./LICENSE)

## What's inside

- **Blog** driven by a headless Strapi (v5) backend, rendered as static pages with markdown, code highlighting, and Mermaid diagrams.
- **Photos** a masonry gallery with a custom lightbox.
- **Swiss Knife** a set of small self-built tools: crypto prices, ENS resolver, DID resolver, QR proxy (qroxy), fortune cookie, and The Vulgate corpus browser.
- **Newsletter** double opt-in signup wired to a self-hosted Listmonk instance.
- **LLM-friendly** every page is available as clean markdown (`/api/markdown/...`), plus `llms.txt` / `llms-full.txt` and a "copy for LLM" button.
- **Dynamic OG images** generated at the edge with `@vercel/og`.
- **Analytics** privacy-first, self-hosted Umami.

The frontend started from [leerob.io](https://leerob.io) as a base and was rewired to use Strapi as the data provider instead of local MDX.

## Tech stack

- [Next.js 13](https://nextjs.org/) (Pages Router) + [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) with the typography plugin
- [Strapi](https://strapi.io/) v5 (headless CMS, external)
- [Listmonk](https://listmonk.app/) (newsletter, external)
- [Umami](https://umami.is/) (analytics, external)
- [Vercel](https://vercel.com) (hosting)

## Getting started

```bash
git clone https://github.com/mhrsntrk/mhrsntrk.com.git
cd mhrsntrk.com
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000). It expects a reachable Strapi backend for blog, photo, and gear content; the tools under `/swissknife` work standalone with the relevant API keys.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values. Never commit `.env.local`.

| Variable                                                 | Purpose                                             |
| -------------------------------------------------------- | --------------------------------------------------- |
| `STRAPI_API_URL`                                         | Base URL of the Strapi instance (no trailing slash) |
| `STRAPI_API_TOKEN` / `STRAPI_API_TOKEN_FULL`             | Strapi read tokens (server-side only)               |
| `LISTMONK_URL`                                           | Base URL of the Listmonk instance                   |
| `LISTMONK_API_USER` / `LISTMONK_API_TOKEN`               | Listmonk API credentials (server-side only)         |
| `LISTMONK_LIST_ID`                                       | Numeric ID of the double opt-in newsletter list     |
| `NEXT_PUBLIC_UMAMI_URL` / `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Analytics endpoint and site ID                      |
| `NEXT_PUBLIC_ETHERSCAN_API_KEY`                          | ENS / on-chain lookups                              |
| `NEXT_PUBLIC_INFURA_API_KEY`                             | Ethereum RPC provider                               |
| `NEXT_PUBLIC_QROXY_API`                                  | Backend for the qroxy QR tool                       |

## Scripts

| Command                    | What it does                                           |
| -------------------------- | ------------------------------------------------------ |
| `npm run dev`              | Start the dev server                                   |
| `npm run build`            | Validate the Vulgate corpus, then build for production |
| `npm run start`            | Serve the production build                             |
| `npm run lint`             | Run ESLint (`next/core-web-vitals`)                    |
| `npm run format`           | Format source with Prettier                            |
| `npm run format:check`     | Check formatting without writing                       |
| `npm run validate:vulgate` | Validate the Vulgate corpus data (runs on build)       |
| `npm run vulgate:new`      | Scaffold a new Vulgate entry                           |

## Project structure

```
components/   Reusable UI (Container, BlogPost, PixelAnimation, ...)
pages/        Routes, including pages/api/* endpoints
  swissknife/ Self-built tools
lib/          Data layer (Strapi client, ENS/DID resolvers, helpers)
layouts/      Page layout wrappers
styles/       Global CSS and Tailwind layers
scripts/      Build-time generators (sitemap, blog artifacts, Vulgate)
content/      Local markdown/data
public/       Static assets
```

## License

[MIT](./LICENSE) © Mahir Şentürk. The code is open; the written content, photos, and brand assets are not.
