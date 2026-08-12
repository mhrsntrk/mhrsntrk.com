/**
 * Snippet directives for the robots meta tag.
 *
 * next-seo does not cascade DefaultSeo's robotsProps into a page that renders
 * its own <NextSeo>, and most pages here do. Without passing these explicitly
 * such a page ships a bare "index,follow" and silently gives up large image
 * previews and unlimited snippet length. Keeping the values in one place is the
 * only way they stay identical across every page that needs them.
 *
 * Not applied to the Vulgate: those pages are noindex, so snippet limits on
 * them describe a result that will never be shown.
 */
const ROBOTS_PROPS = {
  maxSnippet: -1,
  maxImagePreview: 'large',
  maxVideoPreview: -1
};

export default ROBOTS_PROPS;
