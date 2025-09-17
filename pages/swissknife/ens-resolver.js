import React, { useState } from 'react';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import { ensResolver, getProviderStatus } from '@/lib/ensResolver';

export default function ENSResolver() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [ensAddress, setENSAddress] = useState('');
  const [ensAvatar, setENSAvatar] = useState('');
  const [providerUsed, setProviderUsed] = useState('');
  const [providerStatus, setProviderStatus] = useState([]);

  const resolveENS = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }
    
    setLoading(true);
    setProviderUsed('');
    try {
      const result = await ensResolver(input.trim());
      setENSAddress(result.address);
      setENSAvatar(result.url);
      // Note: Provider info is logged to console, not returned in result
      // This is a limitation of the current implementation
    } catch (error) {
      console.error('ENS resolution failed:', error);
      setENSAddress('Error resolving ENS. Please try again.');
      setENSAvatar('');
    } finally {
      setLoading(false);
    }
  };

  // Load provider status on component mount
  React.useEffect(() => {
    setProviderStatus(getProviderStatus());
  }, []);

  const etherscanURL = `https://etherscan.io/address/${ensAddress}`;

  return (
    <Container>
      <NextSeo
        title="ENS Resolver – mhrsntrk"
        description={`You can use this tool to resolve an Ethereum Name Service (ENS)
        domain.`}
        canonical="https://mhrsntrk.com/swissknife/web-did-resolver"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife/web-did-resolver',
          title: 'ENS Resolver – mhrsntrk',
          description: `You can use this tool to resolve an Ethereum Name Service (ENS)
          domain.`
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Ethereum Name Service (ENS) Resolver
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          You can use this tool to resolve an Ethereum Name Service (ENS)
          domain. You can learn more about ENS domains via this{' '}
          <a
            href="https://ens.domains"
            target="_blank"
            className="hover:underline"
          >
            link
          </a>
          .
        </p>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          The tool returns the controller Ethereum address and the avatar (if
          any) of the given domain name. It uses{' '}
          <a
            href="https://github.com/ethers-io/ethers.js"
            target="_blank"
            className="hover:underline"
          >
            ethers
          </a>{' '}
          library to resolve the ENS domains with multiple provider fallbacks for reliability.
        </p>
        <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Provider Status:</h3>
          <div className="flex flex-wrap gap-2">
            {providerStatus.map((provider) => (
              <span
                key={provider.name}
                className={`px-2 py-1 text-xs rounded-full ${
                  provider.configured
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}
              >
                {provider.name} {provider.configured ? '✓' : '✗'}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full mb-4">
          <form className="flex">
            <input
              aria-label="text"
              id="did"
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter an ENS to Resolve"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-yellow-600 focus:border-yellow-600 dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              className="p-2 px-6 ml-2 duration-300 bg-black rounded-md dark:bg-white"
              type="submit"
              onClick={resolveENS}
            >
              <svg
                className="text-gray-300 h-7 w-7 dark:text-gray-900"
                stroke="currentColor"
                fill="currentColor"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.707 6.293a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.262.125l-3-2a1 1 0 0 1 1.11-1.664l2.318 1.545 2.42-2.42a1 1 0 0 1 1.414 0zm-10 6a1 1 0 0 1 0 1.414l-3 3A1 1 0 0 1 7 17H3a1 1 0 1 1 0-2h3.586l2.707-2.707a1 1 0 0 1 1.414 0z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.168 7.445A1 1 0 0 1 9 7h5a1 1 0 0 1 .78 1.625l-3.355 4.194L14.6 15.2a1 1 0 0 1 .4.8v5a1 1 0 1 1-2 0v-4.5l-3.6-2.7a1 1 0 0 1-.18-1.425L11.92 9H9.534l-1.703 2.555a1 1 0 0 1-1.664-1.11l2-3zM18 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0z"
                />
              </svg>
            </button>
          </form>
        </div>
        {loading ? (
          <p className="pt-4 mb-4 text-lg text-specialred">Resolving...</p>
        ) : (
          <>
            <div
              className={
                ensAddress == '' ? 'hidden' : 'text-black dark:text-white pt-4'
              }
            >
              <h2 className="mb-4 text-xl">Resolved ENS Address</h2>
            </div>
            <div
              className={
                ensAddress == ''
                  ? 'hidden'
                  : 'w-80 sm:w-full md:w-full lg:w-full xl:w-full flex justify-center border border-gray-300 dark:border-gray-900 rounded-md bg-white dark:bg-gray-800 p-4 mb-4'
              }
            >
              <p className="overflow-auto text-gray-600 text-md sm:text-md md:text-lg lg:text-lg xl:text-lg dark:text-gray-400">
                <a
                  href={etherscanURL}
                  target="_blank"
                  className="hover:underline"
                  rel="noopener noreferrer"
                >
                  {' '}
                  {ensAddress}
                </a>
              </p>
            </div>
            <div
              className={
                ensAvatar == '' ? 'hidden' : 'text-black dark:text-white pt-4'
              }
            >
              <h2 className="mb-4 text-xl">Resolved ENS Avatar</h2>
            </div>
            <div
              className={
                ensAvatar == ''
                  ? 'hidden'
                  : 'w-80 sm:w-full md:w-full lg:w-full xl:w-full flex justify-center border border-gray-300 dark:border-gray-900 rounded-md bg-white dark:bg-gray-800 p-4 mb-10'
              }
            >
              <img
                src={ensAvatar}
                alt="ENS Avatar"
                className="w-full h-full"
              ></img>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
