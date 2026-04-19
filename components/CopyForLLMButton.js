import React, { useState } from 'react';

export default function CopyForLLMButton({ content }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="mt-2 px-3 py-1 text-sm text-gray-700 dark:text-gray-300 border border-gray-400 dark:border-gray-600 rounded hover:border-red-500 hover:text-red-600 dark:hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      {copied ? '✓ Copied' : 'Copy for LLM'}
    </button>
  );
}