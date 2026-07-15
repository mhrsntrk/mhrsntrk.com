import { useEffect, useState } from 'react';

import { plexMono } from './fonts';

/**
 * Content advisory. Tone-setting, not legal — the front door of the bit, in the
 * register of a university-press advisory.
 *
 * - localStorage, fires once.
 * - Client-only overlay: it mounts after hydration, so the statically generated
 *   HTML always ships the corpus to crawlers. The gate never blocks a bot.
 * - mode="wall"   → full interstitial (index / browse entry point).
 * - mode="banner" → dismissible banner, never a wall (entry permalinks; people
 *   land there straight from Twitter).
 */

const KEY = 'vulgate-consent';

export default function Gate({ mode = 'wall' }) {
  const [ready, setReady] = useState(false);
  const [consented, setConsented] = useState(true);

  useEffect(() => {
    setConsented(window.localStorage.getItem(KEY) === '1');
    setReady(true);
  }, []);

  function accept() {
    window.localStorage.setItem(KEY, '1');
    setConsented(true);
  }

  if (!ready || consented) return null;

  const body = (
    <>
      <p lang="en" style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.55, margin: 0 }}>
        Content advisory
      </p>
      <p lang="en" style={{ fontSize: 18, lineHeight: '27px', margin: '18px 0 0' }}>
        This collection documents vulgar Turkish folk speech. Entries are
        reproduced unexpurgated in their original register for philological
        accuracy. No euphemism has been applied.
      </p>
      <p lang="en" style={{ fontSize: 18, lineHeight: '27px', margin: '9px 0 0' }}>
        Proceed only if you are over 16.
      </p>
      <button
        type="button"
        onClick={accept}
        className={plexMono.className}
        style={{
          marginTop: 27,
          fontSize: 12,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '9px 18px',
          border: '1px solid var(--vg-line)',
          background: 'transparent',
          color: 'var(--vg-ink)',
          cursor: 'pointer'
        }}
      >
        I am over 16, continue
      </button>
    </>
  );

  if (mode === 'banner') {
    return (
      <div
        className={plexMono.className}
        style={{
          border: '1px solid var(--vg-line)',
          background: 'var(--vg-paper)',
          color: 'var(--vg-ink)',
          padding: 27,
          marginBottom: 36,
          maxWidth: 640
        }}
      >
        {body}
      </div>
    );
  }

  return (
    <div
      className={plexMono.className}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 27,
        background: 'var(--vg-paper)',
        color: 'var(--vg-ink)'
      }}
    >
      <div style={{ maxWidth: 480, width: '100%' }}>{body}</div>
    </div>
  );
}
