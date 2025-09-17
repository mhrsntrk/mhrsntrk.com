import { ethers } from 'ethers';

// Simple in-memory cache for ENS resolutions
const resolutionCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Cache management
function getCachedResult(ensName) {
  const cached = resolutionCache.get(ensName);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.result;
  }
  return null;
}

function setCachedResult(ensName, result) {
  resolutionCache.set(ensName, {
    result,
    timestamp: Date.now()
  });
}

// Utility function to clear cache
export function clearENSCache() {
  resolutionCache.clear();
  console.log('ENS resolution cache cleared');
}

// Utility function to get cache stats
export function getENSCacheStats() {
  return {
    size: resolutionCache.size,
    entries: Array.from(resolutionCache.keys())
  };
}

// Utility function to get provider status
export function getProviderStatus() {
  return providers.map(p => ({
    name: p.name,
    configured: p.name === 'Infura' ? !!process.env.NEXT_PUBLIC_INFURA_API_KEY :
              p.name === 'Etherscan' ? !!process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY :
              p.name === 'Alchemy' ? !!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY : false,
    priority: p.priority
  }));
}

// Provider configuration with fallbacks
const providers = [
  {
    name: 'Infura',
    provider: () => new ethers.providers.InfuraProvider('homestead', process.env.NEXT_PUBLIC_INFURA_API_KEY),
    priority: 1
  },
  {
    name: 'Etherscan',
    provider: () => new ethers.providers.EtherscanProvider('homestead', process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY),
    priority: 2
  },
  {
    name: 'Alchemy',
    provider: () => new ethers.providers.AlchemyProvider('homestead', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY),
    priority: 3
  }
].filter(p => {
  // Only include providers that have API keys configured
  if (p.name === 'Infura') return process.env.NEXT_PUBLIC_INFURA_API_KEY;
  if (p.name === 'Etherscan') return process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  if (p.name === 'Alchemy') return process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
  return false;
}).sort((a, b) => a.priority - b.priority);

// Utility function to validate ENS name
function isValidENSName(name) {
  if (!name || typeof name !== 'string') return false;
  const ensRegex = /^[a-z0-9]+(\.[a-z0-9]+)*\.eth$/;
  return ensRegex.test(name.toLowerCase());
}

// Utility function to create timeout promise
function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    )
  ]);
}

// Utility function to add retry logic
async function withRetry(fn, maxRetries = 2, delayMs = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.warn(`Attempt ${i + 1} failed, retrying in ${delayMs}ms...`, error.message);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

// Function to resolve ENS using a specific provider
async function resolveWithProvider(providerConfig, ensName, timeoutMs = 10000) {
  const provider = providerConfig.provider();
  
  try {
    // Use retry logic for resolver lookup
    const resolver = await withRetry(async () => {
      return await withTimeout(provider.getResolver(ensName), timeoutMs);
    });
    
    if (resolver === null) {
      return { success: false, error: 'No resolver found' };
    }

    // Use retry logic for address lookup
    const address = await withRetry(async () => {
      return await withTimeout(resolver.getAddress(), timeoutMs);
    });
    
    if (!address) {
      return { success: false, error: 'No address found' };
    }

    let avatarUrl = '';
    try {
      // Avatar lookup with retry but don't fail if it doesn't work
      const avatar = await withRetry(async () => {
        return await withTimeout(resolver.getAvatar(), timeoutMs);
      });
      if (avatar && avatar.url) {
        avatarUrl = avatar.url;
      }
    } catch (avatarError) {
      // Avatar lookup can fail even if ENS exists, so just continue without it
      console.warn(`Avatar lookup failed with ${providerConfig.name}:`, avatarError.message);
    }

    return {
      success: true,
      address,
      url: avatarUrl,
      provider: providerConfig.name
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      provider: providerConfig.name
    };
  }
}

// Enhanced ENS resolver with multiple fallbacks
export async function ensResolver(ens) {
  try {
    // Normalize ENS name
    const normalizedEns = ens.toLowerCase().trim();
    
    // Check cache first
    const cachedResult = getCachedResult(normalizedEns);
    if (cachedResult) {
      console.log(`Using cached result for ${normalizedEns}`);
      return cachedResult;
    }

    // Validate input
    if (!isValidENSName(normalizedEns)) {
      const errorResult = { 
        address: 'Invalid ENS name format. Please use format: name.eth', 
        url: '' 
      };
      setCachedResult(normalizedEns, errorResult);
      return errorResult;
    }

    // Try each provider in order of priority
    for (const providerConfig of providers) {
      try {
        console.log(`Attempting resolution with ${providerConfig.name}...`);
        const result = await resolveWithProvider(providerConfig, normalizedEns);
        
        if (result.success) {
          console.log(`Successfully resolved with ${result.provider}`);
          const successResult = {
            address: result.address,
            url: result.url
          };
          setCachedResult(normalizedEns, successResult);
          return successResult;
        } else {
          console.warn(`${providerConfig.name} failed:`, result.error);
        }
      } catch (error) {
        console.warn(`${providerConfig.name} error:`, error.message);
      }
    }

    // If all providers failed, try a direct HTTP fallback to Etherscan V2 API
    if (process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY) {
      try {
        console.log('Attempting Etherscan V2 API fallback...');
        const fallbackResult = await resolveWithEtherscanV2(normalizedEns);
        if (fallbackResult.success) {
          const successResult = {
            address: fallbackResult.address,
            url: fallbackResult.url
          };
          setCachedResult(normalizedEns, successResult);
          return successResult;
        }
      } catch (error) {
        console.warn('Etherscan V2 API fallback failed:', error.message);
      }
    }

    const errorResult = { 
      address: 'Given ENS not registered or all providers failed.', 
      url: '' 
    };
    setCachedResult(normalizedEns, errorResult);
    return errorResult;

  } catch (error) {
    console.error('ENS Resolution error:', error);
    const errorResult = { 
      address: 'Error resolving ENS. Please try again.', 
      url: '' 
    };
    setCachedResult(ens.toLowerCase().trim(), errorResult);
    return errorResult;
  }
}

// Fallback function using Etherscan V2 API with direct contract calls
async function resolveWithEtherscanV2(ensName) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
    const baseUrl = 'https://api.etherscan.io/v2/api';
    
    // ENS Registry contract address on mainnet
    const ensRegistryAddress = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
    
    // Function selector for resolver(bytes32)
    const resolverFunctionSelector = '0x0178b8bf';
    
    // Function selector for addr(bytes32)
    const addrFunctionSelector = '0x3b3b57de';
    
    // Function selector for text(bytes32,string)
    const textFunctionSelector = '0x59d1d415';
    
    // Hash the ENS name
    const nameHash = ethers.utils.namehash(ensName);
    
    // Step 1: Get the resolver address
    const resolverData = resolverFunctionSelector + nameHash.slice(2);
    const resolverUrl = `${baseUrl}?chainid=1&module=proxy&action=eth_call&to=${ensRegistryAddress}&data=${resolverData}&tag=latest&apikey=${apiKey}`;
    
    const resolverResponse = await fetch(resolverUrl);
    const resolverResult = await resolverResponse.json();
    
    if (resolverResult.error || !resolverResult.result || resolverResult.result === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      return { success: false, error: 'No resolver found for ENS name' };
    }
    
    const resolverAddress = resolverResult.result;
    
    // Step 2: Get the address from the resolver
    const addressData = addrFunctionSelector + nameHash.slice(2);
    const addressUrl = `${baseUrl}?chainid=1&module=proxy&action=eth_call&to=${resolverAddress}&data=${addressData}&tag=latest&apikey=${apiKey}`;
    
    const addressResponse = await fetch(addressUrl);
    const addressResult = await addressResponse.json();
    
    if (addressResult.error || !addressResult.result || addressResult.result === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      return { success: false, error: 'No address found for ENS name' };
    }
    
    // Convert the result to a proper address
    const address = ethers.utils.getAddress('0x' + addressResult.result.slice(26));
    
    // Step 3: Try to get avatar (text record for 'avatar')
    let avatarUrl = '';
    try {
      // Encode the text record key 'avatar'
      const avatarKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('avatar'));
      const avatarData = textFunctionSelector + nameHash.slice(2) + avatarKey.slice(2);
      const avatarUrlRequest = `${baseUrl}?chainid=1&module=proxy&action=eth_call&to=${resolverAddress}&data=${avatarData}&tag=latest&apikey=${apiKey}`;
      
      const avatarResponse = await fetch(avatarUrlRequest);
      const avatarResult = await avatarResponse.json();
      
      if (avatarResult.result && avatarResult.result !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
        // Decode the string result
        const avatarBytes = avatarResult.result.slice(2);
        if (avatarBytes.length > 128) { // Has content
          const avatarString = ethers.utils.toUtf8String('0x' + avatarBytes);
          if (avatarString && avatarString.startsWith('http')) {
            avatarUrl = avatarString;
          }
        }
      }
    } catch (avatarError) {
      console.warn('Avatar lookup via Etherscan V2 failed:', avatarError.message);
    }
    
    return {
      success: true,
      address,
      url: avatarUrl,
      provider: 'Etherscan V2 API'
    };
    
  } catch (error) {
    return { success: false, error: error.message };
  }
}
