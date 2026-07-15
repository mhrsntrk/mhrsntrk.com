import { ImageResponse } from '@vercel/og';

/**
 * OG card for a Vulgate entry (1200x630). The distribution engine: every entry
 * is a ready-made screenshot for English-language Twitter.
 *
 * Satori does not inherit page CSS, so the self-hosted Plex Mono subset (latin
 * + latin-ext, ğ ş ı İ present) is fetched raw from the origin and handed in.
 * This is the same file the web card uses, so the two stay identical. Text is
 * passed via query params — the edge runtime cannot read the content dir.
 *
 * Usage: /api/vulgate-og?slug=...&tr=...&literal=...&meaning=...&register=...&n=1
 */
export const config = { runtime: 'edge' };

const BG = '#0a0a0a';
const PAPER = '#fafafa';
const INK = '#111111';
const MUTED = '#8a8a8a';
const ACCENT = '#ef4444';

function clamp(s, n) {
  s = (s || '').trim();
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

export default async function handler(req) {
  const { searchParams, origin } = new URL(req.url);
  const tr = clamp(searchParams.get('tr'), 140) || 'The Vulgate';
  const literal = clamp(searchParams.get('literal'), 160);
  const meaning = clamp(searchParams.get('meaning'), 180);
  const register = clamp(searchParams.get('register'), 12) || 'obscene';
  const n = searchParams.get('n');
  const label = n ? `Entry ${String(n).padStart(3, '0')}` : 'The Vulgate';

  const [regular, bold] = await Promise.all([
    fetch(new URL('/static/fonts/vulgate/PlexMono-Regular-subset.ttf', origin)).then((r) =>
      r.arrayBuffer()
    ),
    fetch(new URL('/static/fonts/vulgate/PlexMono-Bold-subset.ttf', origin)).then((r) =>
      r.arrayBuffer()
    )
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: BG,
          padding: 54,
          fontFamily: 'Plex Mono'
        }}
      >
        {/* The card as an island on the canvas */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            backgroundColor: PAPER,
            color: INK,
            border: `1px solid #d4d4d4`,
            padding: 54
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 22,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: MUTED,
              borderBottom: '1px solid #d4d4d4',
              paddingBottom: 18
            }}
          >
            <div style={{ display: 'flex' }}>{label}</div>
            <div style={{ display: 'flex' }}>Register: {register}</div>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: tr.length > 70 ? 40 : 52,
              fontWeight: 700,
              lineHeight: 1.25,
              marginTop: 36
            }}
          >
            {tr}
          </div>

          {literal ? (
            <div
              style={{
                display: 'flex',
                fontSize: 28,
                lineHeight: 1.4,
                color: '#333333',
                marginTop: 27
              }}
            >
              {literal}
            </div>
          ) : null}

          <div style={{ display: 'flex', flex: 1 }} />

          {meaning ? (
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                lineHeight: 1.4,
                color: MUTED,
                borderTop: '1px solid #d4d4d4',
                paddingTop: 18
              }}
            >
              {meaning}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 27,
            fontSize: 22,
            color: MUTED
          }}
        >
          <div style={{ display: 'flex', color: ACCENT }}>The Vulgate</div>
          <div style={{ display: 'flex' }}>mhrsntrk.com/swissknife/vulgate</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Plex Mono', data: regular, weight: 400, style: 'normal' },
        { name: 'Plex Mono', data: bold, weight: 700, style: 'normal' }
      ]
    }
  );
}
