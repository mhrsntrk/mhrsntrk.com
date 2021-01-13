export async function getBitcoin() {
  const btcres = await fetch(
    'https://api.coinpaprika.com/v1/tickers/btc-bitcoin'
  );

  const btc = await btcres.json();

  return btc;
}

export async function getEthereum() {
  const ethres = await fetch(
    'https://api.coinpaprika.com/v1/tickers/eth-ethereum'
  );

  const eth = await ethres.json();

  return eth;
}

export async function getVeChain() {
  const vetres = await fetch(
    'https://api.coinpaprika.com/v1/tickers/vet-vechain'
  );

  const vet = await vetres.json();

  return vet;
}

export async function getUniSwap() {
  const unires = await fetch(
    'https://api.coinpaprika.com/v1/tickers/uni-uniswap'
  );

  const uni = await unires.json();

  return uni;
}

export async function getSynthetix() {
  const snxres = await fetch(
    'https://api.coinpaprika.com/v1/tickers/snx-synthetix-network-token'
  );

  const snx = await snxres.json();

  return snx;
}

export async function getChainLink() {
  const linkres = await fetch(
    'https://api.coinpaprika.com/v1/tickers/link-chainlink'
  );

  const link = await linkres.json();

  return link;
}

