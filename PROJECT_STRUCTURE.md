# Project Structure Guide

Panduan ini merangkum struktur project portfolio React milik Andika agar lebih mudah dipahami saat troubleshooting, update konten, atau refactor.

## Ringkasan Teknologi

- Build tool: Vite
- UI library: React 19
- Routing: React Router DOM
- Animation: Framer Motion
- Styling: kombinasi Tailwind CSS v4 + inline style + CSS global
- Deployment config: Vercel

## Struktur Folder

```text
portofolio-andika-react/
├── public/
│   ├── fonts/        # Font statis yang dipanggil dari browser
│   ├── images/       # Gambar project dan dokumentasi pribadi
│   ├── video/        # Video background homepage
│   └── *.png/*.svg   # Logo, favicon, aset umum
├── src/
│   ├── assets/       # Aset yang di-import dari source code
│   ├── components/   # Komponen reusable lintas halaman
│   ├── pages/        # Halaman utama per route
│   ├── App.jsx       # Konfigurasi route dan transisi page
│   ├── main.jsx      # Entry point React
│   ├── index.css     # CSS global utama
│   └── App.css       # Sisa CSS bawaan template Vite
├── CATATAN.md        # Catatan belajar personal
├── PROJECT_STRUCTURE.md
├── eslint.config.js
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

## Fungsi Tiap Area

### `src/main.jsx`

Titik mount React. File ini hanya memanggil `App` dan mengimpor `index.css`.

### `src/App.jsx`

Pusat navigasi aplikasi.

- Menggunakan `BrowserRouter`
- Menentukan route `/`, `/works`, `/info`, `/contact`
- Mengatur transisi antar halaman lewat `PageTransition`
- Mengubah `document.title` berdasarkan pathname

Jika ada halaman baru, hampir pasti file ini perlu diubah.

### `src/components/`

- `Navbar.jsx`
  Navigasi utama desktop dan mobile, plus jam realtime WIB.
- `PageTransition.jsx`
  Wrapper animasi masuk/keluar halaman.

### `src/pages/`

- `Index.jsx`
  Landing page utama. Memuat video hero, bio, selected works, skills, galeri dokumentasi, dan CTA kontak.
- `Works.jsx`
  Daftar karya/proyek. Saat ini datanya masih hardcoded di file.
- `Info.jsx`
  Halaman profil singkat, background pendidikan, deskripsi diri, dan daftar skill.
- `Contact.jsx`
  Halaman kontak, detail profil, social links, serta form kirim pesan via Web3Forms.

### `public/`

Semua file di sini diakses langsung lewat URL browser, misalnya:

- `/images/andika.jpeg`
- `/video/Yuta Okkotsu vs Kurourushi cut.mp4`
- `/fonts/Jujutsu Kaisen.ttf`

Folder ini cocok untuk aset statis besar yang tidak perlu di-bundle via import.

### `src/assets/`

Berisi aset yang biasanya di-import langsung dari file React. Saat ini ada beberapa aset bawaan template dan satu `hero.png`.

## Alur Render Aplikasi

1. Browser memuat `index.html`
2. Vite menjalankan `src/main.jsx`
3. `main.jsx` me-render `App.jsx`
4. `App.jsx` memilih halaman aktif berdasarkan route
5. Setiap halaman memanggil `Navbar` dan layout masing-masing
6. Aset visual diambil dari `public/` atau `src/assets/`

## Data dan Konfigurasi Penting

### Environment variable

`Contact.jsx` membutuhkan:

```env
VITE_WEB3FORMS_ACCESS_KEY=isi_access_key_disini
```

Tanpa env ini, form contact memang tidak akan aktif.

### Routing

Semua route saat ini client-side:

- `/`
- `/works`
- `/info`
- `/contact`

Karena memakai `BrowserRouter`, deploy harus mendukung fallback ke `index.html`. File `vercel.json` biasanya berperan di sini dan penting saat route langsung dibuka dari browser.

## Temuan Arsitektur Saat Ini

### Yang sudah bagus

- Struktur folder kecil dan mudah diikuti
- Pemisahan `pages` dan `components` sudah jelas
- Routing sederhana dan rapi
- Aset sudah dipisah antara `public` dan `src/assets`
- Ada animasi konsisten dengan Framer Motion

### Yang perlu diwaspadai

- Styling sangat banyak memakai inline style, jadi update desain akan lebih lambat dan rawan duplikasi
- Komponen `WordReveal` ditulis ulang di beberapa halaman, sehingga logic animasi tersebar
- `App.css` masih berisi sisa template Vite dan kemungkinan sudah tidak dipakai
- `README.md` masih bawaan Vite, belum menjelaskan project portfolio ini
- `Info.jsx` memakai background image dari URL eksternal, jadi halaman bergantung pada host luar
- Data project, skill, dan kontak masih hardcoded di masing-masing file, sehingga update konten harus edit manual
- Banyak font dipanggil dengan nama seperti `Geist Mono`, `Plus Jakarta Sans`, `Onest`, `Bricolage Grotesque`, tetapi tidak terlihat ada setup import font-nya di project ini; hasil render bisa berbeda antar device

## Checklist Troubleshooting

### Jika project tidak bisa dijalankan

1. Pastikan dependency sudah di-install dengan `npm install`
2. Jalankan `npm run dev`
3. Jika `vite: command not found`, biasanya `node_modules` belum ada

### Jika route error saat refresh

1. Cek `vercel.json`
2. Pastikan hosting support SPA rewrite ke `index.html`

### Jika font tampil tidak sesuai desain

1. Cek apakah font di-load dari file lokal atau CDN
2. Pastikan nama `fontFamily` sama persis dengan resource font yang benar-benar tersedia

### Jika gambar/video tidak muncul

1. Cek nama file di `public/`
2. Pastikan path dimulai dari `/`, misalnya `/images/file.jpeg`
3. Perhatikan spasi pada nama file, karena kadang menyulitkan maintenance

### Jika form contact gagal submit

1. Pastikan `VITE_WEB3FORMS_ACCESS_KEY` tersedia
2. Cek browser console untuk error network
3. Cek adblocker atau pembatas request pihak ketiga

### Jika animasi terasa berat

1. Cek video hero karena ukurannya bisa besar
2. Cek animasi kata-per-kata yang muncul berkali-kali
3. Cek banyaknya inline style dan render ulang komponen

## Prioritas Update yang Disarankan

### Prioritas tinggi

- Install dependency lalu jalankan `build` dan `lint`
- Ganti `README.md` agar sesuai isi project
- Konsolidasikan `WordReveal` ke `src/components/WordReveal.jsx`
- Audit font agar konsisten dan benar-benar ter-load

### Prioritas menengah

- Pindahkan data project, skills, dan contact ke file data terpisah
- Kurangi inline style yang berulang menjadi class atau utility yang reusable
- Pindahkan image eksternal di `Info.jsx` ke aset lokal

### Prioritas rendah

- Hapus aset dan CSS bawaan template yang tidak dipakai
- Rapikan nama file aset agar konsisten
- Tambahkan dokumentasi update konten per halaman

## Kondisi Workspace Saat Analisis

- Tidak ada perubahan git lokal yang tertunda saat analisis dilakukan
- `node_modules` belum ada
- `npm run build` dan `npm run lint` belum bisa divalidasi karena dependency belum terpasang

## Saran Pola Kerja Selanjutnya

Kalau ingin troubleshooting lebih cepat ke depan, paling efektif kita lanjut dengan urutan ini:

1. Rapikan dokumentasi project
2. Pastikan dependency dan script jalan
3. Refactor komponen yang berulang
4. Pisahkan data konten dari file UI
5. Baru lanjut ke polishing tampilan atau penambahan fitur
