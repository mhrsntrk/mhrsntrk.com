import { useState, useEffect, useMemo, useCallback } from 'react';
import { NextSeo } from 'next-seo';

import ROBOTS_PROPS from '@/lib/robots';
import Container from '@/components/Container';
import StructuredData from '@/components/StructuredData';
import CaesarWheel from '@/components/CaesarWheel';
import AlphabetStrip from '@/components/AlphabetStrip';
import FrequencyChart from '@/components/FrequencyChart';
import { PANEL, BUTTON, FIELD, LABEL } from '@/lib/cipherStyles';
import { CIPHERS, cipherById, crackCaesar, encodeShare } from '@/lib/ciphers';

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

const SOLVE_PATH = '/swissknife/decode';

export default function CipherDesk() {
  const [cipherId, setCipherId] = useState('caesar');
  const [shift, setShift] = useState(1);
  const [key, setKey] = useState('ZEBRA');
  const [rails, setRails] = useState(3);
  const [plain, setPlain] = useState('hello world');
  const [cipher, setCipher] = useState('ifmmp xpsme');
  const [source, setSource] = useState('plain');
  const [copied, setCopied] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [breakOpen, setBreakOpen] = useState(false);
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

  // Solving belongs on its own page now. Links minted before that split still
  // point here, so hand them over rather than dropping them on the floor.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.location.hash.replace(/^#/, '');
    if (raw) window.location.replace(`${SOLVE_PATH}#${raw}`);
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

  const makeShareLink = useCallback(() => {
    if (typeof window === 'undefined' || !cipher) return;
    const fragment = encodeShare({ c: cipherId, t: cipher });
    const url = `${window.location.origin}${SOLVE_PATH}#${fragment}`;
    setShareUrl(url);
    copy(url, 'link');
  }, [copy, cipherId, cipher]);

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

            <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
              <span className={LABEL}>Send it to someone</span>
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                The link carries the cipher text and which cipher you picked. It
                does not carry your shift or your keyword, so whoever opens it
                sees the scrambled message and has to work it out. Tell them the
                key some other way, or let them break it. That separation is the
                whole idea behind a key. The link opens on a page built for
                exactly one job: turning the wheel until the message reads.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={makeShareLink}
                  className={`${BUTTON} sm:flex-shrink-0`}
                >
                  {copied === 'link' ? 'Copied' : 'Make link and copy'}
                </button>
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  onFocus={(e) => e.target.select()}
                  placeholder="Your link will appear here"
                  aria-label="Shareable cipher link"
                  className={`${FIELD} text-xs`}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Everything after the # stays in the browser. It is never sent to
                the server, so the message is not in any log.
              </p>
            </div>
          </div>

          {/* Breaking it */}
          <div className={PANEL}>
            <button
              type="button"
              onClick={() => setBreakOpen((v) => !v)}
              aria-expanded={breakOpen}
              className="flex items-start justify-between w-full text-left"
            >
              <span className="pr-4">
                <span className="block text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Break it
                </span>
                <span className="block mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Every cipher on this page was broken long ago, most of them by
                  counting. Here is the counting.
                </span>
              </span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className={`flex-shrink-0 w-5 h-5 mt-1 text-gray-400 transition-transform duration-200 dark:text-gray-500 ${
                  breakOpen ? 'transform rotate-180' : ''
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {breakOpen && (
              <div className="mt-6">
                <span className={LABEL}>
                  Letter frequency of the cipher text
                </span>
                <FrequencyChart text={cipher} />

                <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                  <span className={LABEL}>Brute force the shift</span>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    A Caesar cipher has 25 useful keys, which a person can try
                    by hand in a minute. Ranking each one by how closely it
                    matches English letter frequencies picks the answer out on
                    its own.
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
                            <th className="py-2 pr-3 font-bold text-left">
                              Shift
                            </th>
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
            )}
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
