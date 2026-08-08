# Rizky Reranza — Creative Content Creator

Website portfolio **statis** (HTML + CSS + JavaScript murni, tanpa framework / tanpa build step) dengan gaya **Playful Editorial Creative Portfolio**: tipografi besar, aksen brush (handwritten), kartu lembut, ilustrasi kartun, dan pembatas gelombang (wave) organik antar-section.

---

## 📁 Struktur Folder

```
rizkyreranza/
├── index.html                 # Home (hero, stats, gallery, projects, services, CTA, footer)
│
├── projects.html              # Semua project        (tema light-blue / blue)
├── galleryprompt.html         # Prompt gallery + lightbox (tema lavender / purple)
├── service.html               # Layanan               (tema cream / orange)
├── about.html                 # About + kontak        (tema cream editorial)
├── jasa-website.html          # Detail layanan
├── jasa-sewa.html
├── harga-company.html         # Halaman harga
├── harga-landing-page.html
├── harga-umkm.html
├── project-category.html      # Daftar project per kategori
├── admin.html                 # Panel pengelolaan konten
│
├── css/                       # Semua stylesheet
│   ├── theme.css              #   Design system HALAMAN HOME
│   ├── site.css               #   Header + footer + aksen bersama (semua halaman)
│   ├── pages.css              #   Adaptasi tema per halaman (scoped via [data-page])
│   └── style.css              #   Style halaman jasa/harga
│
├── js/                        # Semua script
│   ├── data.js                #   Sumber data (projects, gallery, services, profil)
│   ├── home.js                #   Logika Home (render data, lightbox, doodle scroll, musik)
│   ├── chrome.js              #   Inject header/footer + wave divider di halaman dalam
│   └── colorizer.js           #   Sinkronisasi warna dari panel admin
│
├── partials/
│   └── support-section.html   # Potongan HTML tombol donasi (di-fetch footer)
│
├── assets/
│   ├── img/                   # Gambar & logo
│   │   └── generated/         #   Ilustrasi kartun AI (hero/services/cta -final.png)
│   └── audio/                 # Musik latar
│
├── api/                       # Endpoint bantu untuk panel admin
├── vercel.json                # Konfigurasi deploy Vercel
├── sitemap.xml
├── .gitignore
└── README.md
```

> Semua halaman `.html` sengaja diletakkan di root (konvensi standar situs statis multi-halaman) agar seluruh link antar-halaman tetap sederhana & tidak mudah rusak. File pendukung (CSS, JS, partial, aset) dikelompokkan rapi ke dalam foldernya masing-masing.

---

## 🎨 Sistem Desain

| Bagian        | Warna atmosfer | Aksen  |
|---------------|----------------|--------|
| Home / About  | cream          | lime   |
| Gallery Prompt| lavender       | purple |
| Projects      | light blue     | blue   |
| Service       | cream          | orange |
| Footer        | hitam          | lime   |

- Tipografi: **Syne** (display), **DM Sans** (body), **Caveat** (aksen brush).
- Header & footer konsisten di semua halaman (di-inject oleh `js/chrome.js`).
- Pembatas section berupa **SVG wave** organik.

---

## ▶️ Menjalankan Secara Lokal

Situs 100% statis — cukup jalankan server statis apa pun dari folder ini:

```bash
# Python
python3 -m http.server 8080
# atau Node
npx serve .
```

Buka `http://localhost:8080`.

---

## ⬆️ Upload ke GitHub

```bash
git init
git add .
git commit -m "Redesign: playful editorial portfolio (struktur folder rapi)"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## 🚀 Deploy

- **GitHub Pages** — Settings → Pages → Source: branch `main`, folder `/root`.
- **Vercel / Netlify** — import repo, framework preset **Other / Static**, output dir = root (`vercel.json` sudah disertakan).

---

## 📝 Catatan

- Ilustrasi hero/services/CTA ada di `assets/img/generated/*-final.png` (background transparan).
- Beberapa thumbnail gallery memakai URL Cloudinary dari data lama; jika ada yang gagal dimuat, itu kondisi data, bukan masalah styling.
- Musik latar di-load dari sumber eksternal (GitHub raw); putar via tombol logo bulat di header. File lokal cadangan ada di `assets/audio/`.
