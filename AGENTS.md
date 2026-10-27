# Panduan Pengembangan & Aturan Arsitektur Agen (AGENTS.md)

Dokumen ini berisi batasan teknis, aturan arsitektur, dan standar kode untuk proyek **Web Pembelajaran Kimia**. Setiap pengembangan fitur harus mematuhi aturan konkret dan teruji di bawah ini.

---

## 1. Batasan Arsitektur & Lingkungan (Testable Constraints)

* **Arsitektur**: 100% Client-Side Single Page Application (SPA) berbasis React 19 + Vite.
* **Backend Luar**: **TIDAK MENGGUNAKAN BACKEND LUAR** (No external backend, no remote database, no server API).
  * *Cara Uji*: Kode tidak boleh memiliki panggilan `fetch`/`axios` ke endpoint eksternal di luar aset lokal.
* **Penyimpanan Data**: Gunakan `localStorage` browser untuk menyimpan progres belajar, status modul yang telah diselesaikan, dan riwayat skor kuis secara anonim.
  * *Cara Uji*: Bersihkan data via `localStorage.clear()` untuk memastikan aplikasi kembali ke state awal dengan mulus tanpa error.
* **Konten Pembelajaran**: Seluruh materi modul kimia, kuis, opsi jawaban, dan penjelasan disimpan sebagai file data statis lokal di dalam `src/data/` (format `.js` atau `.json`).
* **Autentikasi**: Tidak ada sistem registrasi/login dengan password. Siswa langsung dapat belajar secara instan (opsional: input nama samaran lokal jika diperlukan untuk personalisasi salam).

---

## 2. Struktur Proyek & Organisasi Kode

Susunan direktori wajib mengikuti pola berikut:

```text
src/
├── assets/         # Ilustrasi, ikon, gambar kimia statis
├── components/     # Komponen UI modular dan reusable
│   ├── Navbar.jsx       # Identitas media, navigasi, dan indikator progres
│   ├── HeroSection.jsx  # Hero judul utama dan CTA Mulai Belajar
│   ├── TopicCards.jsx   # Kartu fokus materi kimia (Larutan Asam-Basa)
│   ├── common/          # Tombol, Card, Modal, Badge, ProgressBar
│   ├── modules/         # Tampilan materi modul & pembaca konten
│   └── quiz/            # Komponen kuis interaktif & umpan balik
├── data/           # Konten statis pembelajaran
│   ├── modulesData.js   # Modul utama kimia
│   └── quizData.js      # Soal kuis, opsi, kunci, dan pembahasan
├── utils/          # Fungsi utilitas (misal: storageHelper.js)
├── App.jsx         # Komponen induk navigasi & alur aplikasi
├── App.css         # Styling spesifik komponen utama
└── index.css       # Token desain global (warna, tipografi, reset)
```

---

## 3. Standar Kualitas Fitur (Sesuai PRD)

1. **Modul Pembelajaran Interaktif**:
   - Struktur materi harus jelas: Tujuan Pembelajaran, Penjelasan Konsep, Contoh/Reaksi, dan Rangkuman.
   - Dilengkapi navigasi antar bab/sub-bab yang responsif.
2. **Kuis Interaktif dengan Umpan Balik Langsung**:
   - Setiap selesai menjawab, tampilkan status benar/salah secara langsung beserta pembahasan ilmiahnya.
   - Kalkulasi skor akhir di akhir sesi kuis dengan rekomendasi review materi jika skor kurang.
3. **Penyimpanan Progres Anonim**:
   - Indikator persentase penyelesaian modul (misal: 25%, 50%, 100%).
   - Progres otomatis tersimpan ke `localStorage` setiap kali siswa menyelesaikan membaca sub-modul atau kuis.
4. **Pencarian Materi (Fitur Tambahan)**:
   - Pencarian berbasis filter teks instan di sisi klien (*client-side search*) mencocokkan judul dan isi modul.

---

## 4. Desain UI & Pengalaman Pengguna (Design Standards)

* **Konsistensi Desain**: Mengikuti prinsip *taste-skill* (desain bersih, tipografi proporsional, tanpa elemen generik/slop berlebihan).
* **Responsivitas**: Optimal diakses melalui smartphone (layar 360px+) karena target pengguna adalah siswa SMA.
* **Aksesibilitas Konten Kimia**:
  * Rumus kimia ditulis dengan format subskrip/superskip yang benar (contoh: $\text{H}_2\text{O}$, $\text{pH} = -\log[\text{H}^+]$, $\text{SO}_4^{2-}$).
  * Kontras warna teks dan latar belakang harus memenuhi standar keterbacaan (WCAG AA).
* **Styling**: Gunakan Vanilla CSS murni dengan variabel CSS global (`var(--color-...)`) untuk kemudahan kustomisasi tanpa dependensi CSS framework yang membengkak.

---

## 5. Kepatuhan & Validasi Kode

* **Linter**: Jalankan dan pastikan lolos `npm run lint` (`oxlint`) tanpa error atau peringatan yang tidak perlu.
* **Performa**: Bundle build `npm run build` harus tetap ringan dan mandiri, siap untuk di-deploy ke static hosting (seperti Vercel, Netlify, atau GitHub Pages).
