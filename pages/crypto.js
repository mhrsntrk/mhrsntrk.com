import React from 'react';
import { NextSeo } from 'next-seo';
import {
  getBitcoin,
  getEthereum,
  getVeChain,
  getUniSwap,
  getSynthetix,
  getChainLink
} from '@/lib/coinpaprika';

import Container from '@/components/Container';
import CryptoCard from '@/components/CryptoCard';

export default function Crypto({
  bitcoin,
  ethereum,
  vechain,
  uniswap,
  synthetix,
  link
}) {
  return (
    <Container>
      <NextSeo
        title="Crypto – mhrsntrk"
        canonical="https://mhrsntrk.com/crypto"
        openGraph={{
          url: 'https://mhrsntrk.com/crypto',
          title: 'Crypto – mhrsntrk',
          description: `I am deeply interested in
          cryptocurrencies since 2018. You can find the cryptocurrencies that
          I currently follow and hold below.`
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Crypto Ticker
        </h1>
        <div className="mb-16">
          <p className="text-gray-600 dark:text-gray-400">
            New world, new currencies! I am deeply interested in
            cryptocurrencies since 2018. You can find the cryptocurrencies that
            I currently follow and hold below. I have used coinpaprika's API to
            get current prices, 24 hour change and all time high data.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
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
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <CryptoCard
            name={vechain.name}
            symbol={vechain.symbol}
            price={vechain.quotes.USD.price.toFixed(6)}
            change={vechain.quotes.USD.percent_change_24h}
            ath={vechain.quotes.USD.ath_price.toFixed(6)}
          />
          <CryptoCard
            name={link.name}
            symbol={link.symbol}
            price={link.quotes.USD.price.toFixed(5)}
            change={link.quotes.USD.percent_change_24h}
            ath={link.quotes.USD.ath_price.toFixed(5)}
          />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <CryptoCard
            name={synthetix.name}
            symbol={synthetix.symbol}
            price={synthetix.quotes.USD.price.toFixed(5)}
            change={synthetix.quotes.USD.percent_change_24h}
            ath={synthetix.quotes.USD.ath_price.toFixed(5)}
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

export async function getStaticProps() {
  const bitcoin = await getBitcoin();
  const ethereum = await getEthereum();
  const vechain = await getVeChain();
  const uniswap = await getUniSwap();
  const synthetix = await getSynthetix();
  const link = await getChainLink();

  return {
    props: { bitcoin, ethereum, vechain, uniswap, synthetix, link }
  };
}
