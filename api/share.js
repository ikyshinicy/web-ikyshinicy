// api/share.js — Dynamic OG share page for Vercel
// Otomatis baca dari data.js — tidak perlu update manual

const SITE_DATA = require('../data.js');
const GALLERY = SITE_DATA.galleryprompt;

export default function handler(req, res) {
  const { id } = req.query;
  const item = GALLERY.find(g => g.id === id);

  const title = item ? `${item.title} — Prompt Gallery by Iky Shinicy` : 'Prompt Gallery — Iky Shinicy';
  const image = item ? item.image : 'https://ikyshinicy.xyz/og-gallery.jpg';
  const desc = 'Koleksi visual AI lengkap dengan prompt aslinya oleh Iky Shinicy.';

  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>${title}</title>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:image" content="${image}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:url" content="https://ikyshinicy.xyz/api/share?id=${id}"/>
  <meta property="og:type" content="website"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${title}"/>
  <meta name="twitter:image" content="${image}"/>
</head>
<body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#F7F1E8;">
  <div style="text-align:center;">
    <p style="margin-bottom:16px;color:#666;">Mengalihkan ke Gallery...</p>
    <a href="/galleryprompt.html" style="background:#090909;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:500;">Kembali ke Gallery</a>
    <script>setTimeout(()=>window.location.href='/galleryprompt.html',1500);</script>
  </div>
</body>
</html>`);
}
