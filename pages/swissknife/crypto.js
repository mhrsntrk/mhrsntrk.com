import React from 'react';
import { NextSeo } from 'next-seo';
import {
  getEthereum,
  getEnergyWeb,
  getAvax,
  getMina,
  getPolkadot
} from '@/lib/coinpaprika';

import Container from '@/components/Container';
import CryptoCard from '@/components/CryptoCard';

export default function Crypto({ ethereum, energyWeb, avax, mina, polkadot }) {
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
            price={polkadot.quotes.USD.price.toFixed(2)}
            change={polkadot.quotes.USD.percent_change_24h}
            ath={polkadot.quotes.USD.ath_price.toFixed(2)}
          />
          <CryptoCard
            name={ethereum.name}
            symbol={ethereum.symbol}
            price={ethereum.quotes.USD.price.toFixed(2)}
            change={ethereum.quotes.USD.percent_change_24h}
            ath={ethereum.quotes.USD.ath_price.toFixed(2)}
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <CryptoCard
            name={energyWeb.name}
            symbol={energyWeb.symbol}
            price={energyWeb.quotes.USD.price.toFixed(2)}
            change={energyWeb.quotes.USD.percent_change_24h}
            ath={energyWeb.quotes.USD.ath_price.toFixed(2)}
          />
          <CryptoCard
            name={mina.name}
            symbol={mina.symbol}
            price={mina.quotes.USD.price.toFixed(2)}
            change={mina.quotes.USD.percent_change_24h}
            ath={mina.quotes.USD.ath_price.toFixed(2)}
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <CryptoCard
            name={avax.name}
            symbol={avax.symbol}
            price={avax.quotes.USD.price.toFixed(2)}
            change={avax.quotes.USD.percent_change_24h}
            ath={avax.quotes.USD.ath_price.toFixed(2)}
          />
        </div>
      </div>
    </Container>
  );
}

export async function getServerSideProps() {
  const ethereum = await getEthereum();
  const energyWeb = await getEnergyWeb();
  const avax = await getAvax();
  const mina = await getMina();
  const polkadot = await getPolkadot();

  return {
    props: { ethereum, energyWeb, avax, mina, polkadot }
  };
}
