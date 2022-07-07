import React from 'react';
import { NextSeo } from 'next-seo';
import {
  getBitcoin,
  getEthereum,
  getEnergyWeb,
  getUniSwap,
  getMina,
  getPolkadot
} from '@/lib/coinpaprika';

import Container from '@/components/Container';
import CryptoCard from '@/components/CryptoCard';

export default function Crypto({
  bitcoin,
  ethereum,
  energyWeb,
  uniswap,
  mina,
  polkadot
}) {
  return (
    <Container>
      <NextSeo
        title="Crypto – mhrsntrk"
        description={`You can find the cryptocurrencies that
        I currently follow and hold below. I have used coinpaprika's API to
        get current prices, 24 hour change and all time high data.`}
        canonical="https://mhrsntrk.com/swissknife/crypto"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife/crypto',
          title: 'Crypto – mhrsntrk',
          description: `You can find the cryptocurrencies that
          I currently follow and hold below. I have used coinpaprika's API to
          get current prices, 24 hour change and all time high data.`
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Crypto Ticker
        </h1>
        <div className="mb-16">
          <p className="text-gray-600 dark:text-gray-400">
            New world, new currencies! I am deeply interested in
            cryptocurrencies and blockchain since 2017. You can find the cryptocurrencies that
            I currently follow and invest below. I have used coinpaprika's API to
            get current prices, 24 hour change and all time high data.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <CryptoCard
            name={bitcoin.name}
            symbol={bitcoin.symbol}
            price={bitcoin.quotes.USD.price.toFixed(2)}
            change={bitcoin.quotes.USD.percent_change_24h}
            ath={bitcoin.quotes.USD.ath_price.toFixed(2)}
          />
          <CryptoCard
            name={ethereum.name}
            symbol={ethereum.symbol}
            price={ethereum.quotes.USD.price.toFixed(3)}
            change={ethereum.quotes.USD.percent_change_24h}
            ath={ethereum.quotes.USD.ath_price.toFixed(3)}
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <CryptoCard
            name={energyWeb.name}
            symbol={energyWeb.symbol}
            price={energyWeb.quotes.USD.price.toFixed(6)}
            change={energyWeb.quotes.USD.percent_change_24h}
            ath={energyWeb.quotes.USD.ath_price.toFixed(6)}
          />
          <CryptoCard
            name={polkadot.name}
            symbol={polkadot.symbol}
            price={polkadot.quotes.USD.price.toFixed(5)}
            change={polkadot.quotes.USD.percent_change_24h}
            ath={polkadot.quotes.USD.ath_price.toFixed(5)}
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <CryptoCard
            name={mina.name}
            symbol={mina.symbol}
            price={mina.quotes.USD.price.toFixed(5)}
            change={mina.quotes.USD.percent_change_24h}
            ath={mina.quotes.USD.ath_price.toFixed(5)}
          />
          <CryptoCard
            name={uniswap.name}
            symbol={uniswap.symbol}
            price={uniswap.quotes.USD.price.toFixed(6)}
            change={uniswap.quotes.USD.percent_change_24h}
            ath={uniswap.quotes.USD.ath_price.toFixed(6)}
          />
        </div>
      </div>
    </Container>
  );
}

export async function getServerSideProps() {
  const bitcoin = await getBitcoin();
  const ethereum = await getEthereum();
  const energyWeb = await getEnergyWeb();
  const uniswap = await getUniSwap();
  const mina = await getMina();
  const polkadot = await getPolkadot();

  return {
    props: { bitcoin, ethereum, energyWeb, uniswap, mina, polkadot }
  };
}
