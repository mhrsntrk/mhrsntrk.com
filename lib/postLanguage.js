/**
 * Language of a blog post.
 *
 * Most posts are English, a handful are Turkish. Two places need to know which
 * is which and they see different things:
 *
 * - layouts/blog.js has the post body, so it detects the language from the text.
 * - pages/_document.js renders the page shell and sees only the route, so it
 *   looks the slug up in data/post-languages.json, generated at build time by
 *   scripts/generate-sitemap-data.js with the same detector.
 *
 * Anything absent from the map is English. The map holds only the non-English
 * posts, so a normal post costs nothing.
 */
import POST_LANGUAGES from '@/data/post-languages.json';

import { DEFAULT_LANG, detectPostLang } from '@/lib/detectLang';

export { DEFAULT_LANG, detectPostLang };

export function langForSlug(slug) {
  if (!slug) return DEFAULT_LANG;
  return POST_LANGUAGES[slug] || DEFAULT_LANG;
}

// OpenGraph wants a locale, not a bare language tag.
const OG_LOCALES = {
  en: 'en_US',
  tr: 'tr_TR'
};

export function ogLocaleFor(lang) {
  return OG_LOCALES[lang] || OG_LOCALES[DEFAULT_LANG];
}

/**
 * Language for a rendered route.
 *
 * `path` is the request path in development and the route pattern during a
 * static build, where the parameters arrive separately in `query` — accept
 * both so `<html lang>` is right in either case.
 */
export function langForPath(path = '', query = {}) {
  const slugFromQuery =
    typeof query?.slug === 'string' ? query.slug : undefined;

  const match = String(path).match(/^\/blog\/([^/?#]+)/);
  const slugFromPath = match && match[1] !== '[slug]' ? match[1] : undefined;

  const isBlogPost =
    String(path).startsWith('/blog/') || String(path) === '/blog/[slug]';
  if (!isBlogPost) return DEFAULT_LANG;

  return langForSlug(slugFromPath || slugFromQuery);
}
