/**
 * Newsletter subscribe endpoint (server-side).
 *
 * Adds the address to Listmonk against LISTMONK_LIST_ID with
 * preconfirm_subscriptions=false, so — when the list is configured as
 * double opt-in — Listmonk sends the confirmation email and the subscription
 * stays "unconfirmed" until the user clicks it.
 *
 * The Listmonk API credentials live only in env vars and never reach the
 * client. The client posts { email, consent, company (honeypot), location }.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, consent, company } = req.body || {};

  // Honeypot: real users never fill "company". Silently accept so bots get no
  // signal, but do not subscribe.
  if (company) {
    return res.status(200).json({ ok: true, message: 'Thanks!' });
  }

  if (!consent) {
    return res
      .status(400)
      .json({ error: 'Please accept the privacy policy to subscribe.' });
  }

  const cleanEmail =
    typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!cleanEmail || !EMAIL_RE.test(cleanEmail) || cleanEmail.length > 254) {
    return res
      .status(400)
      .json({ error: 'Please enter a valid email address.' });
  }

  const {
    LISTMONK_URL,
    LISTMONK_API_USER,
    LISTMONK_API_TOKEN,
    LISTMONK_LIST_ID
  } = process.env;
  if (
    !LISTMONK_URL ||
    !LISTMONK_API_USER ||
    !LISTMONK_API_TOKEN ||
    !LISTMONK_LIST_ID
  ) {
    console.error('[subscribe] Listmonk env vars are not configured');
    return res
      .status(500)
      .json({ error: 'Subscriptions are temporarily unavailable.' });
  }

  const auth = Buffer.from(
    `${LISTMONK_API_USER}:${LISTMONK_API_TOKEN}`
  ).toString('base64');

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const resp = await fetch(
      `${LISTMONK_URL.replace(/\/$/, '')}/api/subscribers`,
      {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`
        },
        body: JSON.stringify({
          email: cleanEmail,
          name: '',
          status: 'enabled',
          lists: [Number(LISTMONK_LIST_ID)],
          // false -> Listmonk keeps the list subscription "unconfirmed" and sends
          // the double opt-in confirmation email.
          preconfirm_subscriptions: false
        })
      }
    ).finally(() => clearTimeout(timeout));

    if (resp.ok) {
      return res.status(200).json({
        ok: true,
        message: 'Almost there — check your inbox to confirm your subscription.'
      });
    }

    const data = await resp.json().catch(() => ({}));
    const detail = (data && data.message) || '';

    // Listmonk returns 409 (or a 4xx with an "already exists" message) when the
    // address is already a subscriber. Treat that as a soft success.
    if (
      resp.status === 409 ||
      /already exists|already a subscriber/i.test(detail)
    ) {
      return res.status(200).json({
        ok: true,
        message: "You're already on the list — thanks!"
      });
    }

    console.error(`[subscribe] Listmonk error ${resp.status}: ${detail}`);
    return res
      .status(502)
      .json({
        error: 'Could not subscribe right now. Please try again later.'
      });
  } catch (error) {
    console.error('[subscribe] Request failed:', error.message);
    return res
      .status(502)
      .json({
        error: 'Could not subscribe right now. Please try again later.'
      });
  }
}
