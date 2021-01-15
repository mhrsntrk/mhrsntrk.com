import React, { useState } from 'react';

export default function CopyButton({ url }) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    const textField = document.createElement('textarea');
    textField.innerText = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setCopied(true);
  };
  return (
    <div className="">
      <button
        className="bg-black dark:bg-white duration-300 rounded-md text-gray-300 dark:text-gray-900 ml-4 p-2"
        onClick={copyToClipboard}
      >
        {copied ? (
          <p className={'text-white dark:text-black text-xs'}>Copied</p>
        ) : (
          <svg
            className="h-3 w-3 text-white dark:text-black"
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 460 460"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M425.934 0H171.662c-18.122 0-32.864 14.743-32.864 32.864v77.134h30V32.864A2.868 2.868 0 01171.662 30h254.272a2.868 2.868 0 012.864 2.864v254.272a2.868 2.868 0 01-2.864 2.865h-74.729v30h74.729c18.121 0 32.864-14.743 32.864-32.865V32.864C458.797 14.743 444.055 0 425.934 0z" />
            <path d="M288.339 139.998H34.068c-18.122 0-32.865 14.743-32.865 32.865v254.272C1.204 445.257 15.946 460 34.068 460H288.34c18.122 0 32.865-14.743 32.865-32.864V172.863c.001-18.122-14.744-32.865-32.866-32.865zM288.341 430H34.068a2.868 2.868 0 01-2.865-2.864V172.863a2.868 2.868 0 012.865-2.865H288.34a2.868 2.868 0 012.865 2.865v254.273h.001a2.868 2.868 0 01-2.865 2.864z" />
          </svg>
        )}
      </button>
    </div>
  );
}
