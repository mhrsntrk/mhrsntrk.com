import { useState } from 'react';

import { plexMono } from './fonts';

/**
 * The catalogued specimen. Two beats, matching the joke's two beats.
 *
 *  Setup    — "Entry NNN / Register: X" header, the Turkish specimen, the
 *             clumsy literal. Reader sits in confusion.
 *  Punchline— the flat annotation, revealed by expanding DOWNWARD. The source
 *             text stays pinned; both halves share one viewport. That
 *             simultaneity IS the product, so the annotation is always in the
 *             DOM (crawlers and permalinks get it) and only visually gated.
 *
 * The card is IBM Plex Mono; everything is on the 9px grid.
 */

// 9-grid tokens (px).
const S = { specimen: 27, body: 18, label: 12, lead: (n) => n };

function Label({ children }) {
  return (
    <span
      lang="en"
      style={{
        fontSize: S.label,
        lineHeight: '18px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        opacity: 0.55
      }}
    >
      {children}
    </span>
  );
}

function pad(n) {
  return String(n).padStart(3, '0');
}

export default function Card({ entry, number, defaultRevealed = false }) {
  const [revealed, setRevealed] = useState(defaultRevealed);

  return (
    <article
      className={plexMono.className}
      style={{
        border: '1px solid var(--vg-line)',
        background: 'var(--vg-paper)',
        color: 'var(--vg-ink)',
        padding: 27,
        maxWidth: 640,
        width: '100%'
      }}
    >
      {/* Setup: framed as a specimen before a word is read */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 27,
          paddingBottom: 9,
          borderBottom: '1px solid var(--vg-line)'
        }}
      >
        <Label>Entry {number != null ? pad(number) : '—'}</Label>
        <Label>Register: {entry.register}</Label>
      </header>

      {/* Specimen */}
      <p
        lang="tr"
        style={{ fontSize: S.specimen, lineHeight: '36px', fontWeight: 700, margin: 0 }}
      >
        {entry.tr}
      </p>

      {entry.variants && entry.variants.length > 0 && (
        <div style={{ marginTop: 9 }}>
          <Label>Variant</Label>
          {entry.variants.map((v, i) => (
            <p
              key={i}
              lang="tr"
              style={{ fontSize: S.body, lineHeight: '27px', margin: 0, opacity: 0.7 }}
            >
              {v}
            </p>
          ))}
        </div>
      )}

      {/* Clumsy literal */}
      <p
        lang="en"
        style={{ fontSize: S.body, lineHeight: '27px', marginTop: 18, marginBottom: 0, opacity: 0.85 }}
      >
        {entry.literal_en}
      </p>

      {/* Punchline gate */}
      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className={plexMono.className}
          style={{
            marginTop: 27,
            fontSize: S.label,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '9px 18px',
            border: '1px solid var(--vg-line)',
            background: 'transparent',
            color: 'var(--vg-ink)',
            cursor: 'pointer'
          }}
        >
          Annotate ↓
        </button>
      ) : (
        <div style={{ marginTop: 27, borderTop: '1px solid var(--vg-line)', paddingTop: 27 }}>
          {/* Meaning */}
          <div style={{ marginBottom: 27 }}>
            <Label>Meaning</Label>
            <p lang="en" style={{ fontSize: S.body, lineHeight: '27px', margin: '9px 0 0' }}>
              {entry.meaning_en}
            </p>
          </div>

          {/* Anlam */}
          <div style={{ marginBottom: 27 }}>
            <Label>Anlam</Label>
            <p lang="tr" style={{ fontSize: S.body, lineHeight: '27px', margin: '9px 0 0' }}>
              {entry.meaning_tr}
            </p>
          </div>

          {/* Usage */}
          {entry.usage && (
            <div style={{ marginBottom: 27 }}>
              <Label>Usage</Label>
              <p lang="en" style={{ fontSize: S.body, lineHeight: '27px', margin: '9px 0 0', opacity: 0.85 }}>
                {entry.usage}
              </p>
            </div>
          )}

          {/* Equivalents + Cross-references, two columns */}
          {(entry.equivalents?.length > 0 || entry.cross_refs?.length > 0) && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 27,
                marginBottom: 27
              }}
            >
              {entry.equivalents?.length > 0 && (
                <div>
                  <Label>Equivalents</Label>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '9px 0 0' }}>
                    {entry.equivalents.map((eq, i) => (
                      <li key={i} style={{ fontSize: S.body, lineHeight: '27px' }}>
                        {eq}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {entry.cross_refs?.length > 0 && (
                <div>
                  <Label>Cross-references</Label>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '9px 0 0' }}>
                    {entry.cross_refs.map((c, i) => (
                      <li key={i} style={{ fontSize: S.body, lineHeight: '27px' }}>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Footer: origin + themes */}
          <footer
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 18,
              flexWrap: 'wrap',
              borderTop: '1px solid var(--vg-line)',
              paddingTop: 9,
              fontSize: S.label,
              lineHeight: '18px',
              opacity: 0.55
            }}
          >
            <span lang="en" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Origin: {entry.origin}
            </span>
            <span lang="en" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {entry.themes.join(' · ')}
            </span>
          </footer>
        </div>
      )}
    </article>
  );
}
