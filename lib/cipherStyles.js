/**
 * Shared Tailwind class strings for the Cipher Desk pages.
 *
 * FIELD names its own text colour on purpose: the site's <body> is
 * `text-white` in LIGHT mode (and `dark:text-black`), so anything that inherits
 * renders white on white. Every control has to state its colour.
 *
 * No `font-mono` here either. styles/global.css forces the brand face with
 * !important on input, textarea and button, so the class would be dead.
 */
export const PANEL =
  'w-full p-4 mb-4 bg-white border border-gray-300 rounded-md sm:p-6 dark:border-gray-900 dark:bg-gray-800';

export const BUTTON =
  'px-3 py-2 text-sm text-gray-700 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600';

export const FIELD =
  'w-full p-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:border-red-500 dark:focus:border-red-500';

export const LABEL =
  'block mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500';
