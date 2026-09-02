import { ALPHABET, letterCounts } from '@/lib/ciphers';

/** Letter distribution of a text, the thing that undoes a substitution. */
export default function FrequencyChart({ text, caption }) {
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
          ? caption || `${total} letters counted.`
          : 'Nothing to count yet.'}
      </p>
    </div>
  );
}
