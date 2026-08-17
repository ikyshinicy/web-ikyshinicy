// api/screenshot.js
// Vercel Serverless Function — Proxy screenshot dari URL eksternal
// Dipanggil dari admin panel (same-origin, jadi tidak kena CORS),
// lalu hasil gambarnya di-upload ke Cloudflare R2 lewat pipeline yang sama
// seperti upload manual — supaya SEMUA thumbnail konsisten pakai link R2.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.query;
  if (!url || !/^https?:\/\/.+/i.test(url)) {
    return res.status(400).json({ error: 'Parameter url tidak valid.' });
  }

  const shotUrl = 'https://image.thum.io/get/width/1200/crop/900/noanimate/' + url;

  try {
    const shotRes = await fetch(shotUrl);
    if (!shotRes.ok) {
      return res.status(502).json({ error: 'Gagal mengambil screenshot dari layanan pihak ketiga.' });
    }

    const contentType = shotRes.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await shotRes.arrayBuffer());

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(buffer);
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Gagal mengambil screenshot.' });
  }
}
