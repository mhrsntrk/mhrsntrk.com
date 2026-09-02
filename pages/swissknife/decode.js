import { useState, useEffect, useMemo } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import Container from '@/components/Container';
import CaesarWheel from '@/components/CaesarWheel';
import AlphabetStrip from '@/components/AlphabetStrip';
import FrequencyChart from '@/components/FrequencyChart';
import { PANEL, BUTTON, FIELD, LABEL } from '@/lib/cipherStyles';
import {
  cipherById,
  crackCaesar,
  railFenceCandidates,
  bestGuess,
  decodeShare
} from '@/lib/ciphers';

const DESK = '/swissknife/cipher-desk';

export default function Decode() {
  const [mounted, setMounted] = useState(false);
  const [payload, setPayload] = useState(null);
  const [shift, setShift] = useState(1);
  const [key, setKey] = useState('');
  const [rails, setRails] = useState(3);
  const [breakOpen, setBreakOpen] = useState(false);

  // The message lives in the fragment, which only exists on the client. Both
  // renders start from the same empty state so hydration has nothing to argue
  // about.
  useEffect(() => {
    setMounted(true);
    const raw = window.location.hash.replace(/^#/, '');
    if (!raw) return;
    const state = decodeShare(raw);
    if (state && state.t) setPayload(state);
  }, []);

  const active = payload ? cipherById(payload.c) : null;
  const ciphertext = payload ? payload.t : '';
  const params = useMemo(() => ({ shift, key, rails }), [shift, key, rails]);
  const plain = active ? active.apply(ciphertext, params, true) : '';

  const guess = useMemo(
    () => (active ? bestGuess(active.id, ciphertext) : null),
    [active, ciphertext]
  );
  const onBestSetting =
    guess && guess.param === 'shift' && guess.value === shift;

  const needsKey = Boolean(active && active.param);

  return (
    <Container>
      {/* noindex, follow. The page is a target for links whose whole content
          lives in the fragment; with no fragment there is nothing to index, and
          an empty shell would only compete with the Cipher Desk itself. */}
      <NextSeo
        noindex
        nofollow={false}
        title="Decode a Cipher – mhrsntrk"
        description="Open a message someone enciphered with Cipher Desk. Turn the wheel, try a keyword, and read it."
        canonical="https://mhrsntrk.com/swissknife/decode"
      />
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Decode
        </h1>

        {!mounted && (
          <p className="text-gray-600 dark:text-gray-400">
            Opening the message.
          </p>
        )}

        {mounted && !payload && (
          <>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              There is no message in this link. This page opens ciphers made
              with the Cipher Desk: someone encodes something, sends you the
              link, and you work out the key.
            </p>
            <Link
              href={DESK}
              className="text-red-500 hover:underline underline-offset-2"
            >
              Go and write one
            </Link>
          </>
        )}

        {mounted && payload && active && (
          <>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Someone sent you a message enciphered with {active.name}.{' '}
              {needsKey
                ? 'The key did not travel with it, which is the whole point of a key. Work it out below, or ask them.'
                : 'This one needs no key, so it is already readable below.'}
            </p>

            <div className={PANEL}>
              <span className={LABEL}>What arrived</span>
              <p className="p-3 font-mono text-sm text-red-600 break-words bg-gray-50 border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-red-400">
                {ciphertext}
              </p>
            </div>

            {needsKey && (
              <div className={PANEL}>
                <div className="flex flex-wrap items-baseline justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {active.name}
                  </h2>
                  <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                    {active.year}
                  </span>
                </div>
                <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                  {active.blurb}
                </p>

                {active.param === 'shift' && (
                  <>
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
                    <div className="mx-auto mt-6 max-w-xs">
                      <CaesarWheel shift={shift} onShift={setShift} />
                    </div>
                    <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                      Drag the wheel until the message reads.
                    </p>
                  </>
                )}

                {active.param === 'key' && (
                  <>
                    <label htmlFor="key" className={LABEL}>
                      Their keyword
                    </label>
                    <input
                      id="key"
                      type="text"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      placeholder="Try the word they told you"
                      className={FIELD}
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Nothing here can guess this one. Counting letters does not
                      break a {active.name} cipher, which is why it held for
                      centuries.
                    </p>
                  </>
                )}

                {active.param === 'rails' && (
                  <>
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
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Seven settings, one of which reads. Try each.
                    </p>
                  </>
                )}

                {active.monoalphabetic && (
                  <div className="mt-6">
                    <span className={LABEL}>Alphabet map</span>
                    <AlphabetStrip cipherAlphabet={active.alphabet(params)} />
                  </div>
                )}
              </div>
            )}

            <div className={PANEL}>
              <span className={LABEL}>Reads as</span>
              <p className="p-3 text-base text-gray-900 break-words bg-gray-50 border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
                {plain || ' '}
              </p>
              {onBestSetting && (
                <p className="mt-3 text-sm text-red-500">
                  Of all 26 shifts, this one matches English letter frequencies
                  most closely. That is usually the answer.
                </p>
              )}
              {guess && !onBestSetting && (
                <button
                  type="button"
                  onClick={() => setShift(guess.value)}
                  className={`${BUTTON} mt-3`}
                >
                  Give up and solve it
                </button>
              )}
            </div>

            {needsKey && (
              <div className={PANEL}>
                <button
                  type="button"
                  onClick={() => setBreakOpen((v) => !v)}
                  aria-expanded={breakOpen}
                  className="flex items-start justify-between w-full text-left"
                >
                  <span className="pr-4">
                    <span className="block text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Stuck?
                    </span>
                    <span className="block mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Count the letters, or try every setting at once.
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
                    <span className={LABEL}>Letters in the cipher text</span>
                    <FrequencyChart
                      text={ciphertext}
                      caption={
                        active.id === 'railfence'
                          ? 'A rail fence only reorders letters, it never swaps one for another, so this chart is identical for every rail count. Counting cannot break a transposition. Read the seven candidates instead.'
                          : 'English peaks hard at E, T and A. A substitution cipher moves the labels but leaves that shape intact, which is what gives it away.'
                      }
                    />

                    {active.id === 'caesar' && (
                      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                        <span className={LABEL}>All 26 shifts</span>
                        <div className="mt-2 overflow-x-auto">
                          <table className="w-full text-sm">
                            <tbody>
                              {crackCaesar(ciphertext).map((row, rank) => (
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
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {active.id === 'railfence' && (
                      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                        <span className={LABEL}>Every rail count</span>
                        <div className="mt-2 overflow-x-auto">
                          <table className="w-full text-sm">
                            <tbody>
                              {railFenceCandidates(ciphertext).map((row) => (
                                <tr
                                  key={row.rails}
                                  className="border-t border-gray-200 dark:border-gray-700"
                                >
                                  <td className="py-2 pr-3 font-mono align-top text-gray-500 dark:text-gray-400">
                                    {row.rails}
                                  </td>
                                  <td className="py-2 pr-3 font-mono break-all text-gray-600 dark:text-gray-400">
                                    {row.plain.slice(0, 72) || ' '}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {active.param === 'key' && (
                      <p className="pt-6 mt-6 text-sm text-gray-600 border-t border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        There is no table to show. A {active.name} cipher
                        spreads each letter across a different shift, so the
                        frequency shape above is flattened and there is nothing
                        left to count. Kasiski broke it in 1863 by looking for
                        repeated sequences, which needs a longer message than
                        this one. Ask them for the word.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="w-full p-4 border border-gray-300 rounded-md dark:border-gray-900">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Want to send one back?{' '}
                <Link
                  href={DESK}
                  className="text-red-500 hover:underline underline-offset-2"
                >
                  Open the Cipher Desk
                </Link>
                , write your message, pick a cipher and copy the link. Nothing
                you type is ever sent to a server.
              </p>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
