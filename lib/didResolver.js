import { Resolver } from 'did-resolver';
import * as ethr from 'ethr-did-resolver';
import * as web from 'web-did-resolver';

// DID validation regex patterns
const DID_PATTERN = /^did:[a-z0-9]+:[a-zA-Z0-9._-]+$/;
const SUPPORTED_METHODS = ['web', 'ethr'];

// Cache for resolved DID documents (client-side)
const didCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Validate DID format
function validateDID(did) {
  if (!did || typeof did !== 'string') {
    return { valid: false, error: 'DID must be a non-empty string' };
  }

  const trimmedDid = did.trim();
  if (!DID_PATTERN.test(trimmedDid)) {
    return { valid: false, error: 'Invalid DID format. Expected format: did:method:identifier' };
  }

  const method = trimmedDid.split(':')[1];
  if (!SUPPORTED_METHODS.includes(method)) {
    return { 
      valid: false, 
      error: `Unsupported DID method: ${method}. Supported methods: ${SUPPORTED_METHODS.join(', ')}` 
    };
  }

  return { valid: true, did: trimmedDid };
}

// Check cache for existing resolution
function getCachedResult(did) {
  const cached = didCache.get(did);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.result;
  }
  return null;
}

// Store result in cache
function setCachedResult(did, result) {
  didCache.set(did, {
    result,
    timestamp: Date.now()
  });
}

// Analyze DID document and extract metadata
function analyzeDidDocument(didDocument) {
  const analysis = {
    hasAuthentication: false,
    hasAssertionMethod: false,
    hasCapabilityDelegation: false,
    hasCapabilityInvocation: false,
    hasKeyAgreement: false,
    hasService: false,
    hasVerificationMethod: false,
    keyCount: 0,
    serviceCount: 0,
    authenticationCount: 0,
    assertionMethodCount: 0,
    capabilityDelegationCount: 0,
    capabilityInvocationCount: 0,
    keyAgreementCount: 0,
    verificationMethodCount: 0
  };

  if (!didDocument || didDocument.error) {
    return analysis;
  }

  // Extract the actual DID document (it might be nested under didDocument property)
  const actualDidDocument = didDocument.didDocument || didDocument;

  // Count verification methods
  if (actualDidDocument.verificationMethod) {
    analysis.hasVerificationMethod = true;
    analysis.verificationMethodCount = Array.isArray(actualDidDocument.verificationMethod) 
      ? actualDidDocument.verificationMethod.length 
      : 1;
    analysis.keyCount += analysis.verificationMethodCount;
  }

  // Check authentication
  if (actualDidDocument.authentication) {
    analysis.hasAuthentication = true;
    analysis.authenticationCount = Array.isArray(actualDidDocument.authentication) 
      ? actualDidDocument.authentication.length 
      : 1;
  }

  // Check assertion method
  if (actualDidDocument.assertionMethod) {
    analysis.hasAssertionMethod = true;
    analysis.assertionMethodCount = Array.isArray(actualDidDocument.assertionMethod) 
      ? actualDidDocument.assertionMethod.length 
      : 1;
  }

  // Check capability delegation
  if (actualDidDocument.capabilityDelegation) {
    analysis.hasCapabilityDelegation = true;
    analysis.capabilityDelegationCount = Array.isArray(actualDidDocument.capabilityDelegation) 
      ? actualDidDocument.capabilityDelegation.length 
      : 1;
  }

  // Check capability invocation
  if (actualDidDocument.capabilityInvocation) {
    analysis.hasCapabilityInvocation = true;
    analysis.capabilityInvocationCount = Array.isArray(actualDidDocument.capabilityInvocation) 
      ? actualDidDocument.capabilityInvocation.length 
      : 1;
  }

  // Check key agreement
  if (actualDidDocument.keyAgreement) {
    analysis.hasKeyAgreement = true;
    analysis.keyAgreementCount = Array.isArray(actualDidDocument.keyAgreement) 
      ? actualDidDocument.keyAgreement.length 
      : 1;
  }

  // Check services
  if (actualDidDocument.service) {
    analysis.hasService = true;
    analysis.serviceCount = Array.isArray(actualDidDocument.service) 
      ? actualDidDocument.service.length 
      : 1;
  }

  return analysis;
}

// Enhanced error handling wrapper
async function resolveWithTimeout(resolver, did, timeoutMs = 10000) {
  return Promise.race([
    resolver.resolve(did),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Resolution timeout')), timeoutMs)
    )
  ]);
}

export async function didResolver(did) {
  try {
    // Validate input
    const validation = validateDID(did);
    if (!validation.valid) {
      return JSON.stringify({
        error: validation.error,
        did: did,
        timestamp: new Date().toISOString()
      });
    }

    const normalizedDid = validation.did;

    // Check cache first
    const cachedResult = getCachedResult(normalizedDid);
    if (cachedResult) {
      console.log(`Using cached result for ${normalizedDid}`);
      return JSON.stringify(cachedResult);
    }

    // Configure providers
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
        }
      ]
    };

    const ethrResolver = ethr.getResolver(providerConfig);
    const webResolver = web.getResolver();

    const resolver = new Resolver(
      {
        ...webResolver,
        ...ethrResolver
      },
      {
        cache: true
      }
    );

    // Resolve with timeout
    const didDocument = await resolveWithTimeout(resolver, normalizedDid);
    
    // Analyze the DID document
    const analysis = analyzeDidDocument(didDocument);
    
    // Add metadata and analysis
    const result = {
      ...didDocument,
      resolvedAt: new Date().toISOString(),
      method: normalizedDid.split(':')[1],
      resolver: 'mhrsntrk-did-resolver',
      analysis: analysis
    };

    // Cache the result
    setCachedResult(normalizedDid, result);
    
    return JSON.stringify(result);

  } catch (error) {
    console.error('DID Resolution error:', error);
    
    const errorResult = {
      error: error.message || 'Failed to resolve DID',
      did: did,
      timestamp: new Date().toISOString(),
      type: 'resolution_error'
    };

    // Cache error results for a shorter duration
    if (did) {
      setCachedResult(did.trim(), errorResult);
    }

    return JSON.stringify(errorResult);
  }
}
