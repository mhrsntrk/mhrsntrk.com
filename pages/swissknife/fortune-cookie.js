import { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';

const ISSUER_BASE_URL = 'https://issuer.mhrsntrk.com';

export default function FortuneCookie() {
  const [loading, setLoading] = useState(true);
  const [qrData, setQrData] = useState(null);
  const [error, setError] = useState('');

  const createCredentialOffer = useCallback(async () => {
    setLoading(true);
    setError('');
    setQrData(null);

    try {
      const response = await fetch(`${ISSUER_BASE_URL}/api/offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error_description || err.error || `Failed to create offer: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setQrData(data);
    } catch (e) {
      console.error('Error creating offer:', e);
      if (e instanceof TypeError && e.message.includes('fetch')) {
        setError('Failed to connect to the issuer service. Please check your internet connection and try again.');
      } else {
        setError(e instanceof Error ? e.message : 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-load QR code on mount
  useEffect(() => {
    createCredentialOffer();
  }, [createCredentialOffer]);

  const copyOfferUri = async () => {
    if (qrData?.offer_uri) {
      try {
        await navigator.clipboard.writeText(qrData.offer_uri);
        // You could add a toast notification here if desired
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <Container>
      <NextSeo
        title="Fortune Cookie VC – mhrsntrk"
        description="Get your fortune cookie Verifiable Credential! Scan the QR code with an OIDC4VCI version 1.0 compatible wallet to receive a random fortune as a verifiable credential."
        canonical="https://mhrsntrk.com/swissknife/fortune-cookie"
        openGraph={{
          url: 'https://mhrsntrk.com/swissknife/fortune-cookie',
          title: 'Fortune Cookie VC – mhrsntrk',
          description: 'Get your fortune cookie Verifiable Credential! Scan the QR code with an OIDC4VCI-compatible wallet to receive a random fortune as a verifiable credential.'
        }}
      />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Fortune Cookie VC
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
        Get your fortune cookie Verifiable Credential! Scan the QR code with an OIDC4VCI version 1.0 compatible wallet to receive a random fortune as a verifiable credential.
        </p>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          This demonstrates the OIDC4VCI (OpenID for Verifiable Credential Issuance) version 1.0 protocol, 
          allowing you to receive verifiable credentials directly into your digital wallet. This is a proof of concept and is not intended for production use.
        </p>

        {loading && !qrData && (
          <div className="flex items-center justify-center w-full py-8 mb-4">
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 mb-4 text-gray-600 dark:text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600 dark:text-gray-400">Generating QR code...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="w-full p-4 mb-4 border border-red-200 rounded-md bg-red-50 dark:bg-red-900/20 dark:border-red-800">
            <div className="flex">
              <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
                <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!error && (
          <div className="w-full">
            <div className="p-6 mb-4 bg-white border border-gray-300 rounded-md dark:border-gray-900 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                Scan QR Code with Your Wallet
              </h2>
              {loading && !qrData ? (
                <div className="flex flex-col items-center py-8">
                  <svg className="w-8 h-8 mb-4 text-gray-600 dark:text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400">Generating QR code...</p>
                </div>
              ) : qrData ? (
                <>
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={`data:image/png;base64,${qrData.qr_code}`}
                      alt="Scan to get fortune cookie credential"
                      className="max-w-full border border-gray-200 rounded-md w-80 h-80 dark:border-gray-700"
                      style={{ imageRendering: 'crisp-edges' }}
                    />
                  </div>
                  {qrData.expires_at && (
                    <p className="mb-4 text-sm text-center text-gray-600 dark:text-gray-400">
                      Offer expires: {new Date(qrData.expires_at * 1000).toLocaleString()}
                    </p>
                  )}
                  {qrData.offer_uri && (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={copyOfferUri}
                        className="px-4 py-2 text-sm text-gray-700 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        Copy Offer URI
                      </button>
                      <button
                        onClick={createCredentialOffer}
                        disabled={loading}
                        className="px-4 py-2 text-sm text-gray-700 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Generating...' : 'Generate New QR Code'}
                      </button>
                    </div>
                  )}
                </>
              ) : null}
            </div>

            <div className="p-4 mb-4 bg-yellow-100 border border-yellow-300 rounded-md dark:bg-yellow-900/30 dark:border-yellow-700">
              <h3 className="mb-2 text-sm font-medium text-yellow-900">
                Compatible Wallets
              </h3>
              <p className="text-sm text-yellow-800">
                This credential works with any OIDC4VCI 1.0 compatible wallet. Tested with{' '}
                <a href="https://apps.apple.com/tr/app/light-ssi-wallet/id6755690506" target="_blank" rel="noopener noreferrer" className="font-semibold text-yellow-900 hover:underline underline-offset-2">Light SSI Wallet</a>, available on the App Store.
              </p>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
