/* 
export async function getBitcoin() {
  const btcres = await fetch(
    'https://api.coinpaprika.com/v1/tickers/btc-bitcoin'
  );

  const btc = await btcres.json();

  return btc;
}
*/

export async function getEthereum() {
  const ethres = await fetch(
    'https://api.coinpaprika.com/v1/tickers/eth-ethereum'
  );

  const eth = await ethres.json();

  return eth;
}

export async function getEnergyWeb() {
  const ewtres = await fetch(
    'https://api.coinpaprika.com/v1/tickers/ewt-energy-web-token'
  );

  const ewt = await ewtres.json();

  return ewt;
}

export async function getAvax() {
  const avaxres = await fetch(
    'https://api.coinpaprika.com/v1/tickers/avax-avalanche'
  );

  const avax = await avaxres.json();

  return avax;
}

export async function getMina() {
  const minares = await fetch(
    'https://api.coinpaprika.com/v1/tickers/mina-mina-protocol'
  );

  const mina = await minares.json();

  return mina;
}

export async function getPolkadot() {
  const dotres = await fetch(
    'https://api.coinpaprika.com/v1/tickers/dot-polkadot'
  );

  const polkadot = await dotres.json();

  return polkadot;
}
