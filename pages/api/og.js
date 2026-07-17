import { ImageResponse } from '@vercel/og';

/**
 * Dynamic OpenGraph image for blog posts (1200x630).
 *
 * Consistent brand template matching mhrsntrk.com: black canvas, red accent,
 * monospace wordmark, post title, and the @mhrsntrk handle. Edge runtime so it
 * renders fast and caches at the CDN.
 *
 * Usage: /api/og?title=<post title>
 * The homepage uses a static fallback image (see next-seo.config.js), not this.
 */
export const config = { runtime: 'edge' };

const ACCENT = '#ef4444';
const FG = '#fafafa';
const MUTED = '#a3a3a3';
const BG = '#000000';

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const raw = (searchParams.get('title') || 'mhrsntrk').trim();
  const title = raw.length > 110 ? `${raw.slice(0, 110)}…` : raw;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: BG,
          padding: '70px'
        }}
      >
        {/* top: wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 2,
            color: FG
          }}
        >
          <div style={{ display: 'flex' }}>mhrsntrk</div>
          <div style={{ display: 'flex', color: ACCENT }}>.</div>
        </div>

        {/* middle: title with an accent rule */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              width: 90,
              height: 8,
              backgroundColor: ACCENT,
              marginBottom: 34
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 60 ? 66 : 80,
              fontWeight: 800,
              lineHeight: 1.1,
              color: FG,
              maxWidth: 1040
            }}
          >
            {title}
          </div>
        </div>

        {/* bottom: handle + domain */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 30,
            color: MUTED
          }}
        >
          <div style={{ display: 'flex' }}>@mhrsntrk</div>
          <div style={{ display: 'flex' }}>mhrsntrk.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
