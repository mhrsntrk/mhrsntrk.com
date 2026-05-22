import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

/**
 * Inline rehype plugin:
 *  - adds stable `id` anchors to headings (deep-linkable sections,
 *    better for AI section-level citation and UX)
 *  - adds `loading="lazy"` / `decoding="async"` to images
 *
 * Runs AFTER rehypeSanitize so the added attributes are not stripped.
 */
function rehypeEnhance() {
  return (tree) => {
    const usedSlugs = new Set();

    const textOf = (node) => {
      if (node.type === 'text') return node.value || '';
      if (node.children) return node.children.map(textOf).join('');
      return '';
    };

    const slugify = (text) => {
      let base = text
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      if (!base) base = 'section';
      let slug = base;
      let i = 1;
      while (usedSlugs.has(slug)) slug = `${base}-${i++}`;
      usedSlugs.add(slug);
      return slug;
    };

    const walk = (node) => {
      if (node.type === 'element') {
        node.properties = node.properties || {};
        if (/^h[1-6]$/.test(node.tagName) && !node.properties.id) {
          node.properties.id = slugify(textOf(node));
        }
        if (node.tagName === 'img') {
          if (!node.properties.loading) node.properties.loading = 'lazy';
          if (!node.properties.decoding) node.properties.decoding = 'async';
        }
      }
      if (node.children) node.children.forEach(walk);
    };

    walk(tree);
  };
}

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkGfm) // Parse GFM: tables, strikethrough, autolinks, task lists
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeEnhance) // Heading anchors + image loading hints
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(markdown);
  return result.toString();
}
