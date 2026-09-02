import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { NextSeo } from 'next-seo';

import ROBOTS_PROPS from '@/lib/robots';
import Container from '@/components/Container';
import StructuredData from '@/components/StructuredData';
import {
  ALPHABET,
  CIPHERS,
  cipherById,
  crackCaesar,
  letterCounts,
  encodeShare,
  decodeShare
} from '@/lib/ciphers';

const STEP = 360 / 26;
const mod = (n, m) => ((n % m) + m) % m;
const polar = (cx, cy, r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
};

/* ------------------------------------------------------------ Caesar wheel */

function CaesarWheel({ shift, onShift }) {
  const svgRef = useRef(null);
  const drag = useRef(null);

  const angleAt = (event) => {
    const box = svgRef.current.getBoundingClientRect();
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    return (Math.atan2(event.clientY - cy, event.clientX - cx) * 180) / Math.PI;
  };

  const onPointerDown = (event) => {
    drag.current = { from: angleAt(event), shift };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event) => {
    if (!drag.current) return;
    const delta = angleAt(event) - drag.current.from;
    onShift(mod(Math.round(drag.current.shift - delta / STEP), 26));
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 240 240"
      role="img"
      aria-label={`Caesar wheel set to shift ${shift}`}
      className="w-full h-auto select-none cursor-move"
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <circle
        cx="120"
        cy="120"
        r="114"
        className="fill-current text-gray-100 dark:text-gray-900"
      />
      <circle
        cx="120"
        cy="120"
        r="88"
        className="fill-current text-white dark:text-black"
      />
      <circle
        cx="120"
        cy="120"
        r="46"
        className="fill-current text-gray-100 dark:text-gray-900"
      />

      {ALPHABET.split('').map((letter, i) => {
        const [x, y] = polar(120, 120, 101, i * STEP);
        const active = i === 0;
        return (
          <text
            key={`outer-${letter}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="11"
            className={`font-mono fill-current ${
              active ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {letter}
          </text>
        );
      })}

      <g transform={`rotate(${-shift * STEP} 120 120)`}>
        {ALPHABET.split('').map((letter, i) => {
          const [x, y] = polar(120, 120, 67, i * STEP);
          const active = i === shift;
          return (
            <text
              key={`inner-${letter}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="12"
              transform={`rotate(${shift * STEP} ${x} ${y})`}
              className={`font-mono fill-current ${
                active ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {letter}
            </text>
          );
        })}
      </g>

      <text
        x="120"
        y="114"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="26"
        className="font-mono fill-current text-gray-900 dark:text-gray-100"
      >
        {shift}
      </text>
      <text
        x="120"
        y="136"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="8"
        className="font-mono fill-current text-gray-500 dark:text-gray-400"
      >
        SHIFT
      </text>
    </svg>
  );
}

/* --------------------------------------------------------- Alphabet strip */

function AlphabetStrip({ cipherAlphabet }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full font-mono text-xs table-fixed sm:text-sm">
        <tbody>
          <tr>
            {ALPHABET.split('').map((letter) => (
              <td
                key={`p-${letter}`}
                className="py-1 text-center text-gray-500 dark:text-gray-400"
              >
                {letter}
              </td>
            ))}
          </tr>
          <tr>
            {ALPHABET.split('').map((letter, i) => (
              <td
                key={`c-${letter}`}
                className="py-1 text-center text-red-500 border-t border-gray-200 dark:border-gray-800"
              >
                {cipherAlphabet[i]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------- Frequency chart */

function FrequencyChart({ text }) {
  const { counts, percent, total } = letterCounts(text);
  const peak = Math.max(...percent, 1);

  return (
    <div>
      <div className="flex items-end w-full h-24 gap-px">
        {percent.map((pct, i) => (
          <div
            key={ALPHABET[i]}
            className="flex-1 bg-gray-300 dark:bg-gray-700"
            style={{ height: `${Math.max((pct / peak) * 100, 1.5)}%` }}
            title={`${ALPHABET[i]}: ${counts[i]} (${pct.toFixed(1)}%)`}
          />
        ))}
      </div>
      <div className="flex w-full gap-px mt-1">
        {ALPHABET.split('').map((letter) => (
          <div
            key={letter}
            className="flex-1 font-mono text-center text-gray-400 dark:text-gray-500"
            style={{ fontSize: '9px' }}
          >
            {letter}
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        {total
          ? `${total} letters counted. English prose peaks hard at E, T and A. When a ciphertext keeps that shape, the cipher only moved the labels around and the letters underneath are still countable.`
          : 'Type something to see its letter distribution.'}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------- Page */

/**
 * The tool itself, and the trail back to the Swiss Knife index. Search engines
 * use the breadcrumb for the result path and the WebApplication entry to tell
 * a usable tool apart from a page that merely writes about one.
 */
const CIPHER_DESK_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cipher Desk',
  url: 'https://mhrsntrk.com/swissknife/cipher-desk',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  inLanguage: 'en',
  description:
    'Encode and decode Caesar, Vigenere, Atbash, keyword, rail fence, A1Z26 and Morse ciphers in the browser, then break them with letter frequency analysis and a brute force of all 26 Caesar shifts. Free, offline, no signup.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Caesar cipher with an interactive shift wheel',
    'ROT13, Atbash, keyword substitution and Vigenere',
    'Rail fence transposition, A1Z26 and Morse code',
    'Live alphabet substitution map',
    'Letter frequency analysis',
    'Brute force of all 26 Caesar shifts, ranked against English',
    'Share a cipher by link, encoded in the URL fragment'
  ],
  author: {
    '@type': 'Person',
    name: 'Mahir Senturk',
    url: 'https://mhrsntrk.com'
  }
};

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://mhrsntrk.com'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Swiss Knife',
      item: 'https://mhrsntrk.com/swissknife'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Cipher Desk',
      item: 'https://mhrsntrk.com/swissknife/cipher-desk'
    }
  ]
};

const PANEL =
  'w-full p-4 mb-4 bg-white border border-gray-300 rounded-md sm:p-6 dark:border-gray-900 dark:bg-gray-800';
const BUTTON =
  'px-3 py-2 text-sm text-gray-700 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600';
const FIELD =
  'w-full p-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:border-red-500 dark:focus:border-red-500';
const LABEL =
  'block mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500';

export default function CipherDesk() {
  const [cipherId, setCipherId] = useState('caesar');
  const [shift, setShift] = useState(1);
  const [key, setKey] = useState('ZEBRA');
  const [rails, setRails] = useState(3);
  const [plain, setPlain] = useState('hello world');
  const [cipher, setCipher] = useState('ifmmp xpsme');
  const [source, setSource] = useState('plain');
  const [copied, setCopied] = useState('');
  const [showBreak, setShowBreak] = useState(false);

  const active = cipherById(cipherId);
  const params = useMemo(() => ({ shift, key, rails }), [shift, key, rails]);

  // Whichever pane was typed into last is the truth. Everything else, the
  // other pane and every parameter change, is derived from it.
  useEffect(() => {
    if (source === 'plain') setCipher(active.apply(plain, params, false));
    else setPlain(active.apply(cipher, params, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cipherId, params, source, plain, cipher]);

  // Read a shared message out of the fragment on first paint.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.location.hash.replace(/^#/, '');
    if (!raw) return;
    const state = decodeShare(raw);
    if (!state || !state.t) return;
    if (state.c) setCipherId(state.c);
    if (typeof state.s === 'number') setShift(state.s);
    if (state.k) setKey(state.k);
    if (typeof state.r === 'number') setRails(state.r);
    setSource('cipher');
    setCipher(state.t);
  }, []);

  const copy = useCallback(async (value, tag) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(tag);
      setTimeout(() => setCopied(''), 1600);
    } catch (e) {
      setCopied('');
    }
  }, []);

  const copyShareLink = useCallback(() => {
    if (typeof window === 'undefined' || !cipher) return;
    const fragment = encodeShare({
      c: cipherId,
      s: shift,
      k: key,
      r: rails,
      t: cipher
    });
    const url = `${window.location.origin}${window.location.pathname}#${fragment}`;
    copy(url, 'link');
  }, [copy, cipherId, shift, key, rails, cipher]);

  const candidates = useMemo(
    () => (showBreak && cipher ? crackCaesar(cipher).slice(0, 26) : []),
    [showBreak, cipher]
  );

  return (
    <>
      <StructuredData data={CIPHER_DESK_SCHEMA} />
      <StructuredData data={BREADCRUMB_SCHEMA} />
      <Container>
        <NextSeo
          robotsProps={ROBOTS_PROPS}
          title="Cipher Desk: Classical Ciphers You Can Take Apart – mhrsntrk"
          description="Encode and decode Caesar, Vigenere, Atbash, keyword, rail fence, A1Z26 and Morse in the browser. Turn the Caesar wheel, watch the alphabet map, count the letters and break a shift cipher in one click. Nothing leaves your device."
          canonical="https://mhrsntrk.com/swissknife/cipher-desk"
          openGraph={{
            url: 'https://mhrsntrk.com/swissknife/cipher-desk',
            title:
              'Cipher Desk: Classical Ciphers You Can Take Apart – mhrsntrk',
            description:
              'Encode and decode Caesar, Vigenere, Atbash, keyword, rail fence, A1Z26 and Morse in the browser, then break them with frequency analysis. Nothing leaves your device.',
            images: [
              {
                url: 'https://mhrsntrk.com/api/og?title=Cipher%20Desk',
                width: 1200,
                height: 630,
                alt: 'Cipher Desk',
                type: 'image/png'
              }
            ]
          }}
        />
        <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            Cipher Desk
          </h1>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            The first cipher most of us invent is the same one: push every
            letter one place along, so hello becomes ifmmp, and pass the note
            across the classroom. This is that, plus the eight schemes that came
            before and after it, and the tools that take them apart again.
          </p>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Everything runs in your browser. No request is made, nothing is
            stored, and shared links carry the message in the URL fragment,
            which browsers never send to a server.
          </p>

          {/* Cipher picker */}
          <div className="w-full mb-4">
            <span className={LABEL}>Cipher</span>
            <div className="flex flex-wrap gap-2">
              {CIPHERS.map((c) => {
                const on = c.id === cipherId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCipherId(c.id)}
                    aria-pressed={on}
                    className={`px-3 py-2 text-sm border rounded-md transition-colors duration-200 ${
                      on
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={PANEL}>
            <div className="flex flex-wrap items-baseline justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {active.name}
              </h2>
              <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                {active.year}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {active.blurb}
            </p>

            {/* Parameters */}
            {active.param === 'shift' && (
              <div className="mt-6">
                <label htmlFor="shift" className={LABEL}>
                  Shift: {shift}
                </label>
                <input
                  id="shift"
                  type="range"
                  min="0"
                  max="25"
                  value={shift}
                  onChange={(e) => setShift(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
            {active.param === 'key' && (
              <div className="mt-6">
                <label htmlFor="key" className={LABEL}>
                  Keyword
                </label>
                <input
                  id="key"
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="ZEBRA"
                  className={FIELD}
                />
              </div>
            )}
            {active.param === 'rails' && (
              <div className="mt-6">
                <label htmlFor="rails" className={LABEL}>
                  Rails: {rails}
                </label>
                <input
                  id="rails"
                  type="range"
                  min="2"
                  max="8"
                  value={rails}
                  onChange={(e) => setRails(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            {cipherId === 'caesar' && (
              <div className="mt-6">
                <div className="mx-auto max-w-xs">
                  <CaesarWheel shift={shift} onShift={setShift} />
                </div>
                <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                  Drag the wheel, or use the slider. The outer ring is your
                  message, the inner ring is what gets written down.
                </p>
              </div>
            )}

            {active.monoalphabetic && (
              <div className="mt-6">
                <span className={LABEL}>Alphabet map</span>
                <AlphabetStrip cipherAlphabet={active.alphabet(params)} />
              </div>
            )}
          </div>

          {/* The two panes */}
          <div className={PANEL}>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="plain" className={LABEL}>
                  Plain text
                </label>
                <button
                  type="button"
                  onClick={() => copy(plain, 'plain')}
                  className={BUTTON}
                >
                  {copied === 'plain' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <textarea
                id="plain"
                rows="4"
                value={plain}
                spellCheck="false"
                onChange={(e) => {
                  setSource('plain');
                  setPlain(e.target.value);
                }}
                className={FIELD}
              />
            </div>

            <div className="flex items-center justify-center mb-4">
              <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                type in either box
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="cipher" className={LABEL}>
                  Cipher text
                </label>
                <button
                  type="button"
                  onClick={() => copy(cipher, 'cipher')}
                  className={BUTTON}
                >
                  {copied === 'cipher' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <textarea
                id="cipher"
                rows="4"
                value={cipher}
                spellCheck="false"
                onChange={(e) => {
                  setSource('cipher');
                  setCipher(e.target.value);
                }}
                className={`${FIELD} text-red-600 dark:text-red-400`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <button type="button" onClick={copyShareLink} className={BUTTON}>
                {copied === 'link' ? 'Link copied' : 'Copy secret link'}
              </button>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Sends the puzzle, not the answer. They will still have to turn
                the wheel.
              </span>
            </div>
          </div>

          {/* Breaking it */}
          <div className={PANEL}>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Break it
            </h2>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Every cipher on this page was broken long ago, most of them by
              counting. Here is the counting.
            </p>

            <span className={LABEL}>Letter frequency of the cipher text</span>
            <FrequencyChart text={cipher} />

            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              <span className={LABEL}>Brute force the shift</span>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                A Caesar cipher has 25 useful keys, which a person can try by
                hand in a minute. Ranking each one by how closely it matches
                English letter frequencies picks the answer out on its own.
              </p>
              <button
                type="button"
                onClick={() => setShowBreak((v) => !v)}
                className={BUTTON}
              >
                {showBreak ? 'Hide the 26 shifts' : 'Try all 26 shifts'}
              </button>

              {showBreak && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs tracking-widest text-gray-400 uppercase dark:text-gray-500">
                        <th className="py-2 pr-3 font-bold text-left">Shift</th>
                        <th className="py-2 pr-3 font-bold text-left">
                          Reads as
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates.map((row, rank) => (
                        <tr
                          key={row.shift}
                          className="border-t border-gray-200 dark:border-gray-700"
                        >
                          <td
                            className={`py-2 pr-3 font-mono align-top ${
                              rank === 0
                                ? 'text-red-500'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {row.shift}
                          </td>
                          <td
                            className={`py-2 pr-3 font-mono break-all ${
                              rank === 0
                                ? 'text-red-500'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {row.plain.slice(0, 72) || ' '}
                            {rank === 0 && (
                              <span className="ml-2 text-xs tracking-widest uppercase">
                                best guess
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="w-full p-4 mb-4 border border-yellow-300 rounded-md bg-yellow-100 dark:bg-yellow-900 dark:border-yellow-700">
            <h3 className="mb-2 text-sm font-medium text-yellow-900 dark:text-yellow-100">
              This is not encryption
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-100">
              Every scheme here is a historical curiosity. The strongest of
              them, Vigenere, held for three hundred years and then fell to a
              Prussian infantry officer with a notebook in 1863. Modern
              cryptography works on a different principle entirely: the method
              is published, only the key is secret, and the security rests on
              arithmetic nobody knows how to reverse. Use these to write notes
              to your children, not to protect anything.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
