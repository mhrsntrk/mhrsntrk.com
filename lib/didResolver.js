import { Resolver } from 'did-resolver';
import * as ethr from 'ethr-did-resolver';
import * as web from 'web-did-resolver';

export async function didResolver(did) {
  const providerConfig = {
    networks: [
      {
        name: 'mainnet',
        rpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
      },
      {
        name: 'rinkeby',
        chainId: '0x4',
        rpcUrl: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
      },
      {
        name: 'ewc',
        chainId: '0xf6',
        rpcUrl: 'https://rpc.energyweb.org',
        registry: '0xE29672f34e92b56C9169f9D485fFc8b9A136BCE4'
      },
      {
        name: 'volta',
        chainId: '0x12047',
        rpcUrl: 'https://volta-rpc.energyweb.org',
        registry: '0xc15d5a57a8eb0e1dcbe5d88b8f9a82017e5cc4af'
      }
    ]
  };

  const ethrResolver = ethr.getResolver(providerConfig);
  const webResolver = web.getResolver();

  const didResolver = new Resolver(
    {
      ...webResolver,
      ...ethrResolver
    },
    {
      cache: true
    }
  );

  const didDocument = await didResolver.resolve(did);
  return JSON.stringify(didDocument);
}
