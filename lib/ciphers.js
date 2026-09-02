/**
 * Classical ciphers, as pure functions.
 *
 * Every alphabetic cipher here preserves case and passes punctuation, digits
 * and whitespace through untouched, so "Hello, world!" at shift 1 comes back
 * as "Ifmmp, xpsme!" rather than as a stripped block of capitals. That is the
 * behaviour anyone who did this on paper as a child expects to see.
 *
 * None of this is encryption. Every scheme in this file was broken centuries
 * ago and several of them fall to the frequency counter in the same module.
 * They are here to be understood, not to be relied on.
 */

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/** Relative letter frequency of English prose, in percent, indexed A to Z. */
export const ENGLISH_FREQ = [
  8.167,
  1.492,
  2.782,
  4.253,
  12.702,
  2.228,
  2.015,
  6.094,
  6.966,
  0.153,
  0.772,
  4.025,
  2.406,
  6.749,
  7.507,
  1.929,
  0.095,
  5.987,
  6.327,
  9.056,
  2.758,
  0.978,
  2.36,
  0.15,
  1.974,
  0.074
];

const mod = (n, m) => ((n % m) + m) % m;

/**
 * Walk the letters of `text`, handing each one's alphabet index and its
 * running position among letters only to `fn`. The letter position is what
 * Vigenere needs: the key must not advance on a space.
 */
function mapLetters(text, fn) {
  let position = 0;
  return text.replace(/[a-z]/gi, (ch) => {
    const isUpper = ch === ch.toUpperCase();
    const index = ALPHABET.indexOf(ch.toUpperCase());
    const letter = ALPHABET[mod(fn(index, position), 26)];
    position += 1;
    return isUpper ? letter : letter.toLowerCase();
  });
}

/* ------------------------------------------------------------------ Caesar */

export function caesar(text, shift, decode = false) {
  const k = decode ? -shift : shift;
  return mapLetters(text, (i) => i + k);
}

/* ------------------------------------------------------------------ Atbash */

/** A becomes Z, B becomes Y. Its own inverse, so decoding needs no branch. */
export function atbash(text) {
  return mapLetters(text, (i) => 25 - i);
}

/* ---------------------------------------------------------------- Vigenere */

function keyOffsets(key) {
  const letters = String(key || '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
  return letters ? [...letters].map((ch) => ALPHABET.indexOf(ch)) : [0];
}

export function vigenere(text, key, decode = false) {
  const offsets = keyOffsets(key);
  return mapLetters(text, (i, position) => {
    const k = offsets[position % offsets.length];
    return decode ? i - k : i + k;
  });
}

/* ------------------------------------------------- Keyword substitution */

/** "ZEBRA" gives ZEBRACDFGHIJKLMNOPQSTUVWXY: keyword first, then the rest. */
export function keywordAlphabet(keyword) {
  const seen = new Set();
  let out = '';
  for (const ch of String(keyword || '').toUpperCase()) {
    if (ALPHABET.includes(ch) && !seen.has(ch)) {
      seen.add(ch);
      out += ch;
    }
  }
  for (const ch of ALPHABET) if (!seen.has(ch)) out += ch;
  return out;
}

export function keywordCipher(text, keyword, decode = false) {
  const cipher = keywordAlphabet(keyword);
  // Encoding reads the scrambled alphabet at the plain letter's position.
  // Decoding asks the reverse question: where in the scrambled alphabet does
  // this ciphertext letter sit?
  return mapLetters(text, (i) =>
    decode ? cipher.indexOf(ALPHABET[i]) : ALPHABET.indexOf(cipher[i])
  );
}

/* --------------------------------------------------------------- Rail fence */

function railPattern(length, rails) {
  const pattern = [];
  let row = 0;
  let direction = 1;
  for (let i = 0; i < length; i += 1) {
    pattern.push(row);
    if (row === 0) direction = 1;
    else if (row === rails - 1) direction = -1;
    row += direction;
  }
  return pattern;
}

export function railFence(text, rails, decode = false) {
  const n = Number(rails) || 2;
  if (n < 2 || text.length < 2) return text;
  const pattern = railPattern(text.length, n);

  if (!decode) {
    const rows = Array.from({ length: n }, () => []);
    pattern.forEach((row, i) => rows[row].push(text[i]));
    return rows.map((row) => row.join('')).join('');
  }

  const counts = Array(n).fill(0);
  pattern.forEach((row) => (counts[row] += 1));
  const rows = [];
  let cursor = 0;
  for (let i = 0; i < n; i += 1) {
    rows.push([...text.slice(cursor, cursor + counts[i])]);
    cursor += counts[i];
  }
  return pattern.map((row) => rows[row].shift()).join('');
}

/* ------------------------------------------------------------------- A1Z26 */

export function a1z26(text, decode = false) {
  if (!decode) {
    return text
      .toUpperCase()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) =>
        [...word]
          .filter((ch) => ALPHABET.includes(ch))
          .map((ch) => ALPHABET.indexOf(ch) + 1)
          .join('-')
      )
      .filter(Boolean)
      .join(' ');
  }
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) =>
      word
        .split(/[-.,]/)
        .filter(Boolean)
        .map((n) => ALPHABET[Number(n) - 1] || '')
        .join('')
    )
    .join(' ');
}

/* ------------------------------------------------------------------- Morse */

export const MORSE = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  0: '-----',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.'
};

const MORSE_REVERSE = Object.fromEntries(
  Object.entries(MORSE).map(([k, v]) => [v, k])
);

export function morse(text, decode = false) {
  if (!decode) {
    return text
      .toUpperCase()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) =>
        [...word]
          .map((ch) => MORSE[ch])
          .filter(Boolean)
          .join(' ')
      )
      .filter(Boolean)
      .join(' / ');
  }
  return text
    .split('/')
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((code) => MORSE_REVERSE[code] || '')
        .join('')
    )
    .filter(Boolean)
    .join(' ');
}

/* ----------------------------------------------------------------- Reverse */

export function reverseText(text) {
  return [...text].reverse().join('');
}

/* ------------------------------------------------------------- The registry */

export const CIPHERS = [
  {
    id: 'caesar',
    name: 'Caesar',
    year: 'circa 50 BC',
    blurb:
      'Shift every letter the same number of places along the alphabet. At shift 1, hello becomes ifmmp. Julius Caesar used shift 3 for his private correspondence.',
    param: 'shift',
    monoalphabetic: true,
    apply: (text, p, decode) => caesar(text, p.shift, decode),
    alphabet: (p) => caesar(ALPHABET, p.shift)
  },
  {
    id: 'rot13',
    name: 'ROT13',
    year: '1980s',
    blurb:
      'Caesar locked at shift 13. Because 13 is half of 26, encoding and decoding are the same operation. Usenet used it to hide punchlines and spoilers.',
    monoalphabetic: true,
    apply: (text) => caesar(text, 13),
    alphabet: () => caesar(ALPHABET, 13)
  },
  {
    id: 'atbash',
    name: 'Atbash',
    year: 'circa 600 BC',
    blurb:
      'Flip the alphabet end for end. A becomes Z, B becomes Y. Hebrew scribes used it, and like ROT13 it is its own inverse.',
    monoalphabetic: true,
    apply: (text) => atbash(text),
    alphabet: () => atbash(ALPHABET)
  },
  {
    id: 'keyword',
    name: 'Keyword',
    year: '16th century',
    blurb:
      'Build a scrambled alphabet from a keyword, then fill in the letters it did not use. Far stronger than Caesar, and still undone by counting letters.',
    param: 'key',
    monoalphabetic: true,
    apply: (text, p, decode) => keywordCipher(text, p.key, decode),
    alphabet: (p) => keywordAlphabet(p.key)
  },
  {
    id: 'vigenere',
    name: 'Vigenere',
    year: '1553',
    blurb:
      'A different Caesar shift for every letter, cycling through a keyword. Called le chiffre indechiffrable for three centuries, until Kasiski broke it in 1863.',
    param: 'key',
    monoalphabetic: false,
    apply: (text, p, decode) => vigenere(text, p.key, decode)
  },
  {
    id: 'railfence',
    name: 'Rail fence',
    year: 'antiquity',
    blurb:
      'Write the message in a zigzag across several lines, then read the lines straight across. The letters are unchanged, only their order moves.',
    param: 'rails',
    monoalphabetic: false,
    apply: (text, p, decode) => railFence(text, p.rails, decode)
  },
  {
    id: 'a1z26',
    name: 'A1Z26',
    year: 'playground',
    blurb:
      'Every letter becomes its position in the alphabet. The first cipher most people invent on their own, usually around age eight.',
    monoalphabetic: false,
    apply: (text, p, decode) => a1z26(text, decode)
  },
  {
    id: 'morse',
    name: 'Morse',
    year: '1837',
    blurb:
      'Not a cipher at all, but a code: it hides nothing and was built to be read by anyone with a key and a wire. Included because it is the one everybody wants to try.',
    monoalphabetic: false,
    apply: (text, p, decode) => morse(text, decode)
  },
  {
    id: 'reverse',
    name: 'Reverse',
    year: 'always',
    blurb:
      'Read it backwards. Leonardo da Vinci wrote his notebooks this way, mirrored, which fooled nobody who held them up to a looking glass.',
    monoalphabetic: false,
    apply: (text) => reverseText(text)
  }
];

export const cipherById = (id) =>
  CIPHERS.find((c) => c.id === id) || CIPHERS[0];

/* -------------------------------------------------------------- Code breaking */

/** Count A to Z in `text`, returning percentages and the raw total. */
export function letterCounts(text) {
  const counts = Array(26).fill(0);
  let total = 0;
  for (const ch of text.toUpperCase()) {
    const i = ALPHABET.indexOf(ch);
    if (i >= 0) {
      counts[i] += 1;
      total += 1;
    }
  }
  return {
    total,
    counts,
    percent: counts.map((n) => (total ? (n / total) * 100 : 0))
  };
}

/**
 * Chi squared distance between a candidate's letter distribution and English.
 * Lower is more English-like. This is the whole of what breaks a Caesar.
 */
function chiSquared(text) {
  const { counts, total } = letterCounts(text);
  if (!total) return Infinity;
  let score = 0;
  for (let i = 0; i < 26; i += 1) {
    const expected = (ENGLISH_FREQ[i] / 100) * total;
    score += (counts[i] - expected) ** 2 / (expected || 1e-6);
  }
  return score;
}

/** Every one of the 26 Caesar shifts, ranked by how much it reads as English. */
export function crackCaesar(ciphertext) {
  return Array.from({ length: 26 }, (_, shift) => {
    const plain = caesar(ciphertext, shift, true);
    return { shift, plain, score: chiSquared(plain) };
  }).sort((a, b) => a.score - b.score);
}

/* ------------------------------------------------------------ Share links */

/**
 * State travels in the URL fragment, never the query string, so it is not sent
 * to the server and never reaches a log. Base64url keeps it link safe.
 */
export function encodeShare(state) {
  try {
    const bytes = new TextEncoder().encode(JSON.stringify(state));
    let binary = '';
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (e) {
    return '';
  }
}

export function decodeShare(fragment) {
  try {
    const padded = fragment.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(padded + '==='.slice((padded.length + 3) % 4));
    const bytes = Uint8Array.from([...binary].map((ch) => ch.charCodeAt(0)));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (e) {
    return null;
  }
}
