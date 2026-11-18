# Panduan Pengembangan & Aturan Arsitektur Agen (AGENTS.md)

Dokumen ini berisi batasan teknis, aturan arsitektur, dan standar kode untuk proyek **Web Pembelajaran Kimia**. Setiap pengembangan fitur harus mematuhi aturan konkret dan teruji di bawah ini.

---

## 1. Batasan Arsitektur & Lingkungan (Testable Constraints)

* **Arsitektur**: 100% Client-Side Single Page Application (SPA) berbasis React 19 + Vite.
* **Arsitektur Data (Local-First + Cloud Sync Opsional)**: `localStorage` tetap menjadi sumber kebenaran utama (progres 5E, sesi kuis, draf jawaban). Backend eksternal yang diizinkan **hanya Firebase** (Authentication Google + Cloud Firestore), dan **hanya** untuk: (1) masuk dengan Google (opsional), (2) sinkronisasi hasil kuis yang sudah dibekukan ke koleksi `attempts`. Selain itu **TIDAK ADA backend luar lain** (no server API, no database lain).
  * *Cara Uji*: Kode tidak boleh memiliki panggilan `fetch`/`axios` ke endpoint eksternal selain SDK Firebase. Bersihkan data via `localStorage.clear()` → aplikasi kembali ke state awal tanpa error. Hapus/kosongkan `.env.local` → seluruh fitur lokal tetap berjalan normal (tombol sync hanya menampilkan notifikasi gagal, tidak crash).
* **Penyimpanan Data**: Gunakan `localStorage` browser untuk menyimpan progres belajar, status modul yang telah diselesaikan, dan riwayat skor kuis secara anonim.
  * *Cara Uji*: Bersihkan data via `localStorage.clear()` untuk memastikan aplikasi kembali ke state awal dengan mulus tanpa error.
* **Sinkronisasi Cloud (Opsional)**: Setiap submit kuis masuk ke antrean lokal `kimilab_pending_attempts`. Antrean dikirim ke Firestore (`attempts`, document ID = UUID `attemptId`) saat pengguna login Google (auto-sync) atau menekan tombol **"Coba Kirim Lagi"** / **"Simpan ke Akun"** di Navbar. Keamanan diatur oleh `firestore.rules`: pengguna hanya boleh menulis & membaca dokumennya sendiri (`userId == request.auth.uid`).
* **Konten Pembelajaran**: Seluruh materi modul kimia, kuis, opsi jawaban, dan penjelasan disimpan sebagai file data statis lokal di dalam `src/data/` (format `.js` atau `.json`).
* **Autentikasi**: Login lokal (password) untuk akun demo/terdaftar atau opsional **Masuk dengan Google**. Tidak ada tab/pilihan peran di halaman login; peran diambil otomatis dari akun tersimpan dan pengguna dialihkan ke `#/dashboard/siswa` atau `#/dashboard/guru`. Akun Google baru didaftarkan sebagai siswa kecuali kode verifikasi guru valid; email Google dianggap terverifikasi. Login Tamu dan tombol autofill demo tidak ditampilkan. Untuk sinkronisasi cloud, sesi harus masuk via Google.

---

## 2. Struktur Proyek & Organisasi Kode

Susunan direktori wajib mengikuti pola berikut:

```text
src/
├── assets/         # Ilustrasi, ikon, gambar kimia statis
├── components/     # Komponen UI modular dan reusable
│   ├── Sidebar.jsx      # Sidebar navigasi utama (expand/collapse), status akun, sinkronisasi kuis
│   ├── PanelGuruModal.jsx  # Modal kode akses Panel Guru
│   ├── HeroSection.jsx  # Hero judul utama dan CTA Mulai Belajar
│   ├── TopicCards.jsx   # Kartu fokus materi kimia (Larutan Asam-Basa)
│   ├── common/          # Tombol, Card, Modal, Badge, ProgressBar
│   ├── modules/         # Tampilan materi modul & pembaca konten
│   │   └── stages/      # Tahap-tahap Learning Cycle 5E (+ ResetStageButton)
│   └── quiz/            # Komponen kuis interaktif & umpan balik
├── data/           # Konten statis pembelajaran
│   ├── modulesData.js   # Modul utama kimia
│   └── quizData.js      # Soal kuis, opsi, kunci, dan pembahasan
├── lib/            # Penyimpanan & sinkronisasi hasil kuis
│   ├── localStore.js        # Sesi kuis local-first (localStorage)
│   ├── attemptContract.js   # Kontrak payload attempt (payloadOf, sameAttempt)
│   ├── firebaseService.js   # Init Firebase (lazy), googleLogin(), firebaseSignOut()
│   ├── cloudService.js      # saveAttempt() → Firestore koleksi `attempts`
│   └── syncService.js       # Antrean `kimilab_pending_attempts` + syncPending()
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
