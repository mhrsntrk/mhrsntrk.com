// IndexNow submission helper.
// Pings the IndexNow API so Bing/Yandex/Seznam recrawl changed URLs fast.
// Key file must be live at https://<HOST>/<KEY>.txt (see public/<key>.txt).

const HOST = 'mhrsntrk.com';
const KEY = 'c517710dda7b49848c0022f1d987a4f4';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// Submit one or more absolute URLs to IndexNow.
// Returns { ok, status, body }. Never throws — submission is best-effort.
async function submitToIndexNow(urls) {
  const urlList = (Array.isArray(urls) ? urls : [urls]).filter(Boolean);
  if (urlList.length === 0) return { ok: false, status: 0, body: 'no urls' };

  // Reject URLs off-host: IndexNow drops the whole batch if any host mismatches.
  const bad = urlList.filter((u) => {
    try {
      return new URL(u).host !== HOST;
    } catch {
      return true;
    }
  });
  if (bad.length) {
    return {
      ok: false,
      status: 0,
      body: `off-host or invalid URLs: ${bad.join(', ')}`
    };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList
      })
    });
    const body = await res.text();
    // 200 = accepted, 202 = accepted (validation pending). Both fine.
    return { ok: res.ok, status: res.status, body };
  } catch (e) {
    return { ok: false, status: 0, body: e.message };
  }
}

module.exports = { submitToIndexNow, HOST, KEY, KEY_LOCATION, ENDPOINT };
