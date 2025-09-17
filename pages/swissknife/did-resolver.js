import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import { didResolver } from '@/lib/didResolver';

import JSONPretty from 'react-json-pretty';

export default function DIDResolver() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [didDocument, setDidDocument] = useState('');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [lastResolved, setLastResolved] = useState('');

  // Validate input in real-time
  useEffect(() => {
    if (input.trim()) {
      const didPattern = /^did:[a-z0-9]+:[a-zA-Z0-9._-]+$/;
      if (!didPattern.test(input.trim())) {
        setValidationError('Invalid DID format. Expected: did:method:identifier');
      } else {
        setValidationError('');
      }
    } else {
      setValidationError('');
    }
  }, [input]);

  const resolveDidDocument = async (e) => {
    e.preventDefault();
    if (!input.trim() || validationError) return;
    
    setLoading(true);
    setError('');
    setDidDocument('');
    
    try {
      const result = await didResolver(input);
      const parsedResult = JSON.parse(result);
      
      if (parsedResult.error) {
        setError(parsedResult.error);
        setDidDocument('');
      } else {
        setDidDocument(result);
        setLastResolved(parsedResult.resolvedAt || new Date().toISOString());
      }
    } catch (err) {
      setError('Failed to resolve DID. Please try again.');
      setDidDocument('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <NextSeo
        title="DID Resolver – mhrsntrk"
        description={`You can use this tool to fetch the Decentralized Identifier (DID) document of the given DID. Currently supported methods are did:web and did:ethr. Includes comprehensive analysis and caching.`}
        canonical="https://mhrsntrk.com/swissknife/did-resolver"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife/did-resolver',
          title: 'DID Resolver – mhrsntrk',
          description: `You can use this tool to fetch the Decentralized Identifier (DID) document of the given DID. Currently supported methods are did:web and did:ethr. Includes comprehensive analysis and caching.`
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Decentralized Identifier (DID) Resolver
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          You can use this tool to fetch the Decentralized Identifier (DID)
          document of the given DID. Currently supported methods are did:web and 
          did:ethr. The tool includes comprehensive analysis of DID documents 
          with caching and error handling.{' '}
        </p>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          You can read more about Decentralized Identifier (DID) specs through
          this{' '}
          <a
            href="https://www.w3.org/TR/did-core/"
            target="_blank"
            className="hover:underline"
          >
            link.
          </a>{' '}
          This tool uses{' '}
          <a
            href="https://github.com/decentralized-identity/web-did-resolver"
            target="_blank"
            className="hover:underline"
          >
            web-did-resolver
          </a>{' '}
          and{' '}
          <a
            href="https://github.com/decentralized-identity/ethr-did-resolver"
            target="_blank"
            className="hover:underline"
          >
            ethr-did-resolver
          </a>{' '}
          libraries from Decentralized Identity Foundation.
        </p>
        <div className="w-full mb-4">
          <form className="flex flex-col">
            <div className="flex">
              <input
                aria-label="DID to resolve"
                id="did"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a DID to Resolve (e.g., did:web:example.com)"
                className={`block w-full px-4 py-2 text-gray-900 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-100 ${
                  validationError 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 dark:border-gray-900 focus:ring-yellow-600 focus:border-yellow-600'
                }`}
                disabled={loading}
              />
              <button
                className="p-2 px-6 ml-2 duration-300 bg-black rounded-md dark:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                onClick={resolveDidDocument}
                disabled={loading || !input.trim() || !!validationError}
              >
                {loading ? (
                  <svg className="text-gray-300 animate-spin h-7 w-7 dark:text-gray-900" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg
                    className="text-gray-300 h-7 w-7 dark:text-gray-900"
                    stroke="currentColor"
                    fill="currentColor"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.707 6.293a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.262.125l-3-2a1 1 0 0 1 1.11-1.664l2.318 1.545 2.42-2.42a1 1 0 0 1 1.414 0zm-10 6a1 1 0 0 1 0 1.414l-3 3A1 1 0 0 1 7 17H3a1 1 0 1 1 0-2h3.586l2.707-2.707a1 1 0 0 1 1.414 0z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.168 7.445A1 1 0 0 1 9 7h5a1 1 0 0 1 .78 1.625l-3.355 4.194L14.6 15.2a1 1 0 0 1 .4.8v5a1 1 0 1 1-2 0v-4.5l-3.6-2.7a1 1 0 0 1-.18-1.425L11.92 9H9.534l-1.703 2.555a1 1 0 0 1-1.664-1.11l2-3zM18 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {validationError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationError}</p>
            )}
          </form>
        </div>
        {loading ? (
          <div className="flex items-center pt-4 mb-4">
            <svg className="w-5 h-5 mr-2 text-yellow-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg text-yellow-600 dark:text-yellow-400">Resolving DID...</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="p-4 pt-4 mb-4 border border-red-200 rounded-md bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                <div className="flex">
                  <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Resolution Error</h3>
                    <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {didDocument && !error && (
              <>
                <div className="pt-4 text-black dark:text-white">
                  <h2 className="mb-2 text-xl font-semibold">DID Document</h2>
                  {lastResolved && (
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      Resolved: {new Date(lastResolved).toLocaleString()}
                    </p>
                  )}
                </div>
                
                {/* DID Analysis Summary */}
                {(() => {
                  try {
                    const parsedDoc = JSON.parse(didDocument);
                    const analysis = parsedDoc.analysis;
                    if (analysis) {
                      return (
                        <div className="p-4 mb-6 bg-white border border-gray-300 rounded-md dark:border-gray-900 dark:bg-gray-800">
                          <h3 className="mb-3 text-lg font-medium text-gray-800 dark:text-gray-200">DID Analysis</h3>
                          <div className="grid grid-cols-2 gap-4 mb-3 text-sm md:grid-cols-3">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${analysis.hasVerificationMethod ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className="text-gray-600 dark:text-gray-400">
                                Verification Methods ({analysis.verificationMethodCount})
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${analysis.hasAuthentication ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className="text-gray-600 dark:text-gray-400">
                                Authentication ({analysis.authenticationCount})
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${analysis.hasAssertionMethod ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className="text-gray-600 dark:text-gray-400">
                                Assertion Method ({analysis.assertionMethodCount})
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${analysis.hasService ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className="text-gray-600 dark:text-gray-400">
                                Services ({analysis.serviceCount})
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${analysis.hasKeyAgreement ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className="text-gray-600 dark:text-gray-400">
                                Key Agreement ({analysis.keyAgreementCount})
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${analysis.hasCapabilityDelegation ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className="text-gray-600 dark:text-gray-400">
                                Capability Delegation ({analysis.capabilityDelegationCount})
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${analysis.hasCapabilityInvocation ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className="text-gray-600 dark:text-gray-400">
                                Capability Invocation ({analysis.capabilityInvocationCount})
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="mt-4 font-medium text-gray-600 dark:text-gray-400">
                              Total Keys: {analysis.keyCount}
                            </span>
                          </div>
                        </div>
                      );
                    }
                  } catch (e) {
                    // Ignore parsing errors
                  }
                  return null;
                })()}
                
                <div className="p-4 mb-6 bg-white border border-gray-300 rounded-md w-80 sm:w-full md:w-full lg:w-full xl:w-full dark:border-gray-900 dark:bg-gray-800">
                  <h3 className="mb-3 text-lg font-medium text-gray-800 dark:text-gray-200">JSON Output</h3>
                  <div className="flex justify-center">
                    <code className="overflow-auto text-sm text-gray-600 sm:text-sm md:text-md lg:text-md xl:text-md dark:text-gray-400">
                      <JSONPretty id="json-pretty" data={didDocument}></JSONPretty>
                    </code>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Container>
  );
}
