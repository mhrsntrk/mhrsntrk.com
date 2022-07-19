import { useState } from 'react';
import { NextSeo } from 'next-seo';

import { generateIdentity } from '@/lib/generateIdentity';
import Container from '@/components/Container';
import CopyButton from '@/components/CopyButton';

export default function IdentityToken() {
  const [input, setInput] = useState('');
  const [identity, setIdentity] = useState('');

  const getIdentity = async (e) => {
    e.preventDefault();
    generateIdentity(input).then((identityToken) => {
      setIdentity(identityToken);
    });
  };

  return (
    <Container>
      <NextSeo
        title="Identity Token Signer – mhrsntrk"
        description={`Kutt is a modern URL shortener. They have a fantastic API and custom
        domain support. You can use the input below to shorten your URL under
        my custom domain.`}
        canonical="https://mhrsntrk.com/swissknife/kutt"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife/kutt',
          title: 'Identity Token Signer – mhrsntrk',
          description: ``
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
        Identity Token Signer
        </h1>
        <p className="mb-10 text-gray-600 dark:text-gray-400">
          You can use this simple tool to create and sign a JWT identity token using Ethereum signatures for authentication/authorization purposes. 
        </p>
        <div className="w-full mb-4">
          <form className="flex">
            <input
              aria-label="private-key"
              id="private-key"
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste the test private key here"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-yellow-600 focus:border-yellow-600 dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              className="p-2 px-6 ml-2 duration-300 bg-black rounded-md dark:bg-white"
              type="submit"
              onClick={getIdentity}
            >
              GET
            </button>
          </form>
        </div>
        <div
          className={
            identity == '' ? 'hidden m' : 'text-black dark:text-white pt-4'
          }
        >
          <h2 className="mb-4 text-xl">Identity Token</h2>
        </div>
        <div
          className={
            identity == ''
              ? 'hidden'
              : 'w-full flex justify-center border border-gray-300 dark:border-gray-900 rounded-md bg-white dark:bg-gray-800 p-4 mr-2 mb-10'
          }
        >
          <p className="overflow-auto text-lg text-gray-600 break-all dark:text-gray-400">
            {identity}
          </p>
          <CopyButton url={identity} />
        </div>
      </div>
    </Container>
  );
}
