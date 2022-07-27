import { ethers } from 'ethers';

export async function ensResolver(ens) {
  var avatar,
    address,
    url,
    result = '';

  const network = 'homestead';
  const provider = ethers.getDefaultProvider(network, {
    etherscan: `${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`,
    infura: `${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
  });
  const resolver = await provider.getResolver(ens);

  if (resolver !== null) {
    address = await resolver.getAddress();
    avatar = await resolver.getAvatar();
    if (avatar !== null) {
      url = avatar.url;
    } else {
      url = '';
    }
    return (result = { address, url });
  } else {
    return (result = { address: 'Given ENS not registered.', url: '' });
  }
}
