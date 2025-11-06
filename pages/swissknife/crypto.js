import React from 'react';
import { NextSeo } from 'next-seo';
import {
  getEthereum,
  getEnergyWeb,
  getAvax,
  getMina,
  getPolkadot,
  getHbar
} from '@/lib/coinpaprika';

import Container from '@/components/Container';
import CryptoCard from '@/components/CryptoCard';

export default function Crypto({ ethereum, energyWeb, avax, mina, polkadot, hbar }) {
  return (
    <Container>
      <NextSeo
        title="Crypto – mhrsntrk"
        description={`You can find the cryptocurrencies that
        I currently follow and hold below. I have used coinpaprika's API to
        get current prices, 24 hour change and ATH data.`}
        canonical="https://mhrsntrk.com/swissknife/crypto"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife/crypto',
          title: 'Crypto – mhrsntrk',
          description: `You can find the cryptocurrencies that
          I currently follow and hold below. I have used coinpaprika's API to
          get current prices, 24 hour change and ATH data.`
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Crypto Ticker
        </h1>
        <div className="mb-16">
          <p className="text-gray-600 dark:text-gray-400">
            New world, new currencies! I am deeply interested in
            cryptocurrencies and blockchain since 2017. You can find the
            cryptocurrencies that I currently follow and invest below. I have
            used coinpaprika's API to get current prices, 24 hour change and ATH
            data.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <CryptoCard
            name={polkadot.name}
            symbol={polkadot.symbol}
            price={Number(polkadot.quotes?.USD?.price || 0).toFixed(2)}
            change={Number(polkadot.quotes?.USD?.percent_change_24h || 0)}
            ath={Number(polkadot.quotes?.USD?.ath_price || 0).toFixed(2)}
          />
          <CryptoCard
            name={ethereum.name}
            symbol={ethereum.symbol}
            price={Number(ethereum.quotes?.USD?.price || 0).toFixed(2)}
            change={Number(ethereum.quotes?.USD?.percent_change_24h || 0)}
            ath={Number(ethereum.quotes?.USD?.ath_price || 0).toFixed(2)}
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <CryptoCard
            name={energyWeb.name}
            symbol={energyWeb.symbol}
            price={Number(energyWeb.quotes?.USD?.price || 0).toFixed(2)}
            change={Number(energyWeb.quotes?.USD?.percent_change_24h || 0)}
            ath={Number(energyWeb.quotes?.USD?.ath_price || 0).toFixed(2)}
          />
          <CryptoCard
            name={mina.name}
            symbol={mina.symbol}
            price={Number(mina.quotes?.USD?.price || 0).toFixed(2)}
            change={Number(mina.quotes?.USD?.percent_change_24h || 0)}
            ath={Number(mina.quotes?.USD?.ath_price || 0).toFixed(2)}
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <CryptoCard
            name={avax.name}
            symbol={avax.symbol}
            price={Number(avax.quotes?.USD?.price || 0).toFixed(2)}
            change={Number(avax.quotes?.USD?.percent_change_24h || 0)}
            ath={Number(avax.quotes?.USD?.ath_price || 0).toFixed(2)}
          />
          <CryptoCard
            name={hbar.name}
            symbol={hbar.symbol}
            price={Number(hbar.quotes?.USD?.price || 0).toFixed(2)}
            change={Number(hbar.quotes?.USD?.percent_change_24h || 0)}
            ath={Number(hbar.quotes?.USD?.ath_price || 0).toFixed(2)}
          />
        </div>
      </div>
    </Container>
  );
}

export async function getServerSideProps() {
  // Default fallback data structure
  const defaultCrypto = {
    name: 'N/A',
    symbol: 'N/A',
    quotes: {
      USD: {
        price: 0,
        percent_change_24h: 0,
        ath_price: 0
      }
    }
  };

  try {
    // Fetch all crypto data in parallel
    const [ethereum, energyWeb, avax, mina, polkadot, hbar] = await Promise.allSettled([
      getEthereum(),
      getEnergyWeb(),
      getAvax(),
      getMina(),
      getPolkadot(),
      getHbar()
    ]);

    // Use the value if successful, otherwise use default
    return {
      props: {
        ethereum: ethereum.status === 'fulfilled' ? ethereum.value : defaultCrypto,
        energyWeb: energyWeb.status === 'fulfilled' ? energyWeb.value : defaultCrypto,
        avax: avax.status === 'fulfilled' ? avax.value : defaultCrypto,
        mina: mina.status === 'fulfilled' ? mina.value : defaultCrypto,
        polkadot: polkadot.status === 'fulfilled' ? polkadot.value : defaultCrypto,
        hbar: hbar.status === 'fulfilled' ? hbar.value : defaultCrypto
      }
    };
  } catch (error) {
    console.error('Failed to fetch crypto data:', error.message);
    // Return default values if all requests fail
    return {
      props: {
        ethereum: defaultCrypto,
        energyWeb: defaultCrypto,
        avax: defaultCrypto,
        mina: defaultCrypto,
        polkadot: defaultCrypto,
        hbar: defaultCrypto
      }
    };
  }
}
