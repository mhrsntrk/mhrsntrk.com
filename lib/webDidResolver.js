import { Resolver } from 'did-resolver';
import { getResolver } from 'web-did-resolver';

export async function webDidResolver(did) {
  const webResolver = getResolver();

  const didResolver = new Resolver({
    ...webResolver
  });

  //didResolver.resolve(did).then((doc) => {return(doc)});

  const didDocument = await didResolver.resolve(did);
  return JSON.stringify(didDocument);
}
