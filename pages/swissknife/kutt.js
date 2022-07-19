import { useState } from 'react';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import ExternalLink from '@/components/ExternalLink';
import CopyButton from '@/components/CopyButton';

export default function Kutt() {
  const proxyurl = 'https://mhrsntrk-cors.herokuapp.com/';
  const [input, setInput] = useState('');
  const [link, setLink] = useState('');

  const shorten = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(proxyurl + 'https://kutt.it/api/v2/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'AreDU8VUW9mB1HmPv1kZtkOPZMJpf5AIX9Gib4u3'
        },
        body: JSON.stringify({
          target: input,
          expire_in: '365 days',
          domain: 'a.mhrsntrk.com'
        })
      });
      if (res.status === 200 || res.status === 201) {
        // alert('Created a link');
        const json = await res.json();
        setLink(json.link);
      } else {
        alert('Houston, we have a problem!');
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container>
      <NextSeo
        title="Kutt.it – mhrsntrk"
        description={`Kutt is a modern URL shortener. They have a fantastic API and custom
        domain support. You can use the input below to shorten your URL under
        my custom domain.`}
        canonical="https://mhrsntrk.com/swissknife/kutt"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife/kutt',
          title: 'Kutt.it – mhrsntrk',
          description: `Kutt is a modern URL shortener. They have a fantastic API and custom
          domain support. You can use the input below to shorten your URL under
          my custom domain.`
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Kutt.it
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Kutt is a modern URL shortener. They have a fantastic API and custom
          domain support. You can use the input below to shorten your URL under
          my custom domain.
        </p>
        <div className="w-full mb-4">
          <form className="flex">
            <input
              aria-label="url"
              id="url"
              type="url"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste a long URL here"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-yellow-600 focus:border-yellow-600 dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              className="p-2 px-6 ml-2 duration-300 bg-black rounded-md dark:bg-white"
              type="submit"
              onClick={shorten}
            >
              <svg
                className="text-gray-300 h-7 w-7 dark:text-gray-900"
                stroke="currentColor"
                fill="currentColor"
                viewBox="0 0 342.946 342.946"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M342.946 21.213L321.733 0 207.526 114.208 207.526 51.425 177.526 51.425 177.526 165.42 291.521 165.42 291.521 135.42 228.739 135.42z"></path>
                <path d="M51.424 207.846L113.888 207.846 0 321.733 21.213 342.946 135.419 228.74 135.419 291.841 165.419 291.841 165.419 177.846 51.424 177.846z"></path>
              </svg>
            </button>
          </form>
        </div>
        <div
          className={link == '' ? 'hidden' : 'text-black dark:text-white pt-4'}
        >
          <h2 className="mb-4 text-xl">Shortened Link</h2>
        </div>
        <div
          className={
            link == ''
              ? 'hidden'
              : 'w-full flex justify-center border border-gray-300 dark:border-gray-900 rounded-md bg-white dark:bg-gray-800 p-4 mr-2 mb-10'
          }
        >
          <ExternalLink href={link}>
            <p className="text-lg text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500">
              {link}
            </p>
          </ExternalLink>
          <CopyButton url={link} />
        </div>
      </div>
    </Container>
  );
}
