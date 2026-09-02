import { ALPHABET } from '@/lib/ciphers';

/** Plain alphabet over its substitution, one column per letter. */
export default function AlphabetStrip({ cipherAlphabet }) {
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
