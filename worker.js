/**
 * WeLive – Download-Worker (Cloudflare Workers + Static Assets)
 * Route /api/download-request  : Formular entgegennehmen, Lead weiterleiten, signierten Link ausgeben
 * Route /api/download-file     : Datei aus dem privaten R2-Bucket ausliefern (Token nötig)
 * Alles andere                 : statische Seite (env.ASSETS)
 *
 * Bindings / Secrets (siehe MARKENNUTZUNG-README.md):
 *   DOWNLOADS (R2), DOWNLOAD_SECRET (Secret), LEAD_WEBHOOK (Secret, z. B. Formspree-URL),
 *   DOWNLOAD_KEY (Var, Dateiname im Bucket)
 */
const TTL_SECONDS = 24 * 60 * 60;
const enc = new TextEncoder();

const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function sign(secret, payload) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(payload)));
}

async function makeToken(secret) {
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  return `${exp}.${await sign(secret, String(exp))}`;
}

async function verifyToken(secret, token) {
  const [exp, sig] = (token || '').split('.');
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  const expected = await sign(secret, exp);
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

const redirect = (url, path) => Response.redirect(new URL(path, url).toString(), 303);

async function handleRequest(request, env) {
  const url = new URL(request.url);
  if (!env.DOWNLOAD_SECRET) return redirect(url, '/download/?error=1');
  const form = await request.formData();

  if (form.get('website')) return redirect(url, '/download/danke/?t=x'); // Honeypot: Bots ins Leere laufen lassen
  const email = String(form.get('email') || '').trim();
  const name = String(form.get('name') || '').trim().slice(0, 120);
  const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 200;
  if (!okMail || form.get('datenschutz') !== 'yes') return redirect(url, '/download/?error=1');

  const lead = {
    email, name,
    newsletter_opt_in: form.get('newsletter') === 'yes' ? 'ja' : 'nein',
    quelle: 'welive-festival.com/download',
    zeitpunkt: new Date().toISOString(),
  };
  if (env.LEAD_WEBHOOK) {
    const r = await fetch(env.LEAD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(lead),
    });
    if (!r.ok) return redirect(url, '/download/?error=1'); // kein Download ohne gespeicherten Lead
  }
  const token = await makeToken(env.DOWNLOAD_SECRET);
  return redirect(url, `/download/danke/?t=${encodeURIComponent(token)}`);
}

async function handleFile(request, env) {
  const token = new URL(request.url).searchParams.get('t');
  if (!(await verifyToken(env.DOWNLOAD_SECRET, token))) return new Response('Link abgelaufen oder ungültig.', { status: 403 });
  if (!env.DOWNLOADS || !env.DOWNLOAD_SECRET) return new Response('Download ist noch nicht freigeschaltet.', { status: 503 });
  const key = env.DOWNLOAD_KEY || 'welive-booklet.pdf';
  const obj = await env.DOWNLOADS.get(key);
  if (!obj) return new Response('Datei nicht gefunden.', { status: 404 });
  return new Response(obj.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${key}"`,
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex',
    },
  });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/download-request' && request.method === 'POST') return handleRequest(request, env);
    if (pathname === '/api/download-file' && request.method === 'GET') return handleFile(request, env);
    if (pathname.startsWith('/api/')) return new Response('Not found', { status: 404 });
    return env.ASSETS.fetch(request);
  },
};
