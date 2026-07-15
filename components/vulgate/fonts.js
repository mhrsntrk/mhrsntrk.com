import localFont from 'next/font/local';

/**
 * IBM Plex Mono, self-hosted, subset to latin + latin-ext (ğ ş ı İ ö ü ç all
 * present). This is the CARD font only — the card is an island. Chrome outside
 * the card inherits Lo-Res 9 from the Typekit stylesheet on <body>.
 *
 * Same subset file (public/static/fonts/vulgate/*.ttf) also feeds the edge OG
 * route, so web and OG render identically.
 */
export const plexMono = localFont({
  src: [
    {
      path: '../../public/static/fonts/vulgate/PlexMono-Regular-subset.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/static/fonts/vulgate/PlexMono-Bold-subset.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-plex-mono',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
});
