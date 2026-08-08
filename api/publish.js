// api/publish.js
// Vercel Serverless Function — Push data.js ke GitHub
// Token aman di server, tidak terekspos ke browser

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const GITHUB_TOKEN  = process.env.GITHUB_TOKEN;
  const GITHUB_USER   = process.env.GITHUB_USER   || 'ikyshinicy';
  const GITHUB_REPO   = process.env.GITHUB_REPO   || 'rizkyreranza';
  const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
  const GITHUB_PATH   = process.env.GITHUB_PATH   || 'data.js';

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'GITHUB_TOKEN belum diset di Vercel Environment Variables.' });
  }

  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Content kosong.' });

    const encoded = Buffer.from(content, 'utf-8').toString('base64');

    // Ambil SHA file yang ada di repo
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${GITHUB_PATH}?ref=${GITHUB_BRANCH}`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'iky-admin' } }
    );

    let sha = null;
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    // Push ke GitHub
    const pushRes = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'User-Agent': 'iky-admin'
        },
        body: JSON.stringify({
          message: `Update konten — ${new Date().toLocaleString('id-ID')}`,
          content: encoded,
          branch: GITHUB_BRANCH,
          ...(sha && { sha })
        })
      }
    );

    if (pushRes.ok) {
      return res.status(200).json({ success: true, message: 'Berhasil publish ke GitHub!' });
    } else {
      const err = await pushRes.json();
      return res.status(500).json({ error: err.message || 'Gagal push ke GitHub.' });
    }

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
