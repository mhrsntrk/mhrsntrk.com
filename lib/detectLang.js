/**
 * Language detection for post text.
 *
 * Kept in its own module with no imports so the build script
 * (scripts/generate-sitemap-data.js, plain node, no path aliases) and the app
 * (lib/postLanguage.js, aliased imports) share one detector instead of two
 * copies that drift.
 */
export const DEFAULT_LANG = 'en';

// Turkish-specific letters that no English word carries. A long English post
// quoting a Turkish name would trip a lower threshold, so require a count that
// only sustained Turkish prose reaches.
const TURKISH_LETTER_THRESHOLD = 15;

export function detectPostLang(text = '') {
  const turkishChars = (String(text).match(/[ığş]/gi) || []).length;
  return turkishChars > TURKISH_LETTER_THRESHOLD ? 'tr' : DEFAULT_LANG;
}
