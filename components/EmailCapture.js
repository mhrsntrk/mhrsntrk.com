import { useState } from 'react';
import Link from 'next/link';

/**
 * Newsletter email capture with GDPR double opt-in.
 *
 * Posts to the server-side /api/subscribe route, which adds the address to
 * Listmonk as "unconfirmed" so Listmonk sends the confirmation email. The
 * Listmonk token never touches the client.
 *
 * Includes a hidden honeypot field ("company"): real users never see or fill
 * it, so a filled value marks the submission as a bot and it is dropped.
 *
 * @param {string} [location] - label sent with the Umami event so signups can
 *   be attributed to where the form lives (footer, post-end, pillar, ...).
 */
export default function EmailCapture({ location = 'unknown' }) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, company: honeypot, location })
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setMessage(
          data.message ||
            'Almost there — check your inbox to confirm your subscription.'
        );
        setEmail('');
        setConsent(false);
        // Fire the conversion event only on a real success.
        if (typeof window !== 'undefined' && window.umami) {
          window.umami.track('newsletter_signup', { location });
        }
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="w-full max-w-2xl p-4 mx-auto my-8 border border-gray-300 rounded-md dark:border-gray-700">
        <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl p-4 mx-auto my-8 border border-gray-300 rounded-md dark:border-gray-700">
      <h3 className="mb-1 text-lg font-bold tracking-tight text-black dark:text-white">
        Agent identity, in your inbox
      </h3>
      <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
        I write about how AI agents get verifiable identity — KYA, mandates,
        DIDs, and the standards forming around them. New posts and working
        notes, a few times a month. No spam, unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor={`email-${location}`} className="sr-only">
            Email address
          </label>
          <input
            id={`email-${location}`}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            placeholder="you@example.com"
            className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
          <button
            type="submit"
            disabled={status === 'loading' || !consent}
            className="flex items-center justify-center px-6 py-3 text-gray-900 border border-gray-300 rounded-md bg-gray-50 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-red-500 hover:bg-red-500"
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </div>

        {/* Honeypot: hidden from real users; bots that autofill it are dropped. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: 1,
            height: 1,
            overflow: 'hidden'
          }}
        >
          <label htmlFor={`company-${location}`}>Company</label>
          <input
            id={`company-${location}`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <label className="flex items-start mt-3 text-xs text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 mr-2"
          />
          <span>
            I agree to receive emails and accept the{' '}
            <Link href="/privacy" className="underline hover:text-red-500">
              privacy policy
            </Link>
            .
          </span>
        </label>

        {status === 'error' && (
          <p className="mt-2 text-xs text-red-500" role="alert">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
