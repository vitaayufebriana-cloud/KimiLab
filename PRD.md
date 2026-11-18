# PRD - Web Pembelajaran Kimia (KimiLab)

## 1. Identitas Media
- **Nama Media**: KimiLab (Laboratorium Digital Pembelajaran Kimia SMA)
- **Tagline**: Media Pembelajaran Kimia SMA Interaktif, Mandiri, & Bebas Hambatan
- **Target Pengguna**: Siswa SMA/MA (khususnya Kelas XI untuk materi Larutan Asam-Basa, serta persiapan Penilaian Akhir Semester dan UTBK-SNBT).
- **Masalah Belajar**:
  1. Konsep derajat keasaman (pH) dan konsentrasi ion $[\text{H}^+]$ bersifat logaritmik dan abstrak sehingga sulit divisualisasikan oleh siswa.
  2. Sulitnya memahami perubahan warna trayek indikator asam-basa (lakmus merah/biru, fenolftalein) tanpa praktikum laboratorium langsung.
  3. Siswa memerlukan platform belajar mandiri yang cepat, tanpa hambatan login/registrasi akun, dengan progres yang otomatis tersimpan.

---

## 2. Fitur Inti (Current Scope)
1. **Modul Utama: Larutan Asam-Basa**:
   - **Teori Asam-Basa**: Konsep Arrhenius, Brønsted-Lowry, dan Lewis.
   - **Kekuatan Asam & Basa**: Derajat ionisasi ($\alpha$), tetapan kesetimbangan $K_{\text{a}}$ dan $K_{\text{b}}$.
   - **Skala pH & Derajat Keasaman**: Rumus matematis $\text{pH} = -\log[\text{H}^+]$, $\text{pOH} = -\log[\text{OH}^-]$, serta hubungan kesetimbangan air $\text{pH} + \text{pOH} = 14$ ($25^\circ\text{C}$).
   - **Simulator Interaktif Spektrum pH & Indikator**: Eksplorasi langsung pH 1–13 dengan sampel zat nyata ($\text{HCl}$, asam cuka, kopi, air murni, baking soda, sabun, $\text{NaOH}$), konsentrasi $[\text{H}^+]$, serta respon indikator lakmus dan PP.
   - **Stoikiometri Titrasi Netralisasi**: Persamaan reaksi netralisasi $\text{HCl(aq)} + \text{NaOH(aq)} \rightarrow \text{NaCl(aq)} + \text{H}_2\text{O(l)}$ dan rumus ekuivalen $V_{\text{a}} \cdot M_{\text{a}} \cdot val_{\text{a}} = V_{\text{b}} \cdot M_{\text{b}} \cdot val_{\text{b}}$.

2. **Arsitektur Beranda (Home Page)**:
   - **Navbar.jsx**: Identitas media KimiLab, indikator progres modul asam-basa, dan tombol reset `localStorage`.
   - **HeroSection.jsx**: Judul utama, pengantar visual, tombol aksi "Mulai Belajar", dan pratinjau formula matematis.
   - **TopicCards.jsx**: Menampilkan **Satu Kartu Fokus: Larutan Asam-Basa** lengkap dengan simulator pH, checklist langkah belajar, dan dialog modul.

3. **Penyimpanan Progres Anonim**:
   - Local-first menggunakan `localStorage` browser sebagai sumber kebenaran utama.
   - Menyimpan progres penyelesaian subtopik dan status tuntas modul meskipun tanpa registrasi akun.

4. **Kuis Interaktif dengan Umpan Balik Langsung**:
   - Evaluasi pemahaman mandiri dengan pembahasan ilmiah langsung untuk setiap butir soal.

5. **Sinkronisasi Hasil Kuis ke Akun (Cloud, Opsional)**:
   - Hasil kuis yang sudah dibekukan (score, jawaban, waktu pengerjaan) dapat dikirim ke **Cloud Firestore** (koleksi `attempts`) melalui **Firebase Authentication (Google)**.
   - Tombol **"Masuk dengan Google"** tersedia di panel Login (role mengikuti tab Siswa/Guru yang dipilih).
   - Setiap submit kuis masuk ke antrean lokal (`kimilab_pending_attempts`); antrean terkirim otomatis saat login Google, atau manual lewat tombol **"Coba Kirim Lagi"** (dengan badge jumlah antrean) dan **"Simpan ke Akun"** di Navbar.
   - Pengiriman bersifat idempotent (Document ID = UUID `attemptId`) sehingga aman diulang tanpa data ganda.
   - Jika Firebase belum dikonfigurasi / pengguna belum login Google / offline, seluruh fitur lokal tetap berjalan normal; tombol sync hanya menampilkan notifikasi gagal.
   - Keamanan data diatur oleh `firestore.rules`: siswa hanya boleh menulis & membaca dokumennya sendiri (`userId == auth.uid`).

---

## 3. Fitur Tambahan (Jika Waktu Cukup)
1. **Ekspansi Modul Kimia Tambahan**: Modul Stoikiometri & Modul Termokimia.
2. **Pencarian Materi Cepat**: Filter teks pencarian istilah kimia di sisi klien (*client-side search*).
3. **Kalkulator pH Instan**: Alat hitung cepat konsentrasi ion hidrogen dan pH larutan.

---

## 4. Arsitektur Data & Sinkronisasi Cloud (v1.1)

- **Local-first**: progres 5E, sesi kuis, dan draf jawaban hidup di `localStorage` (modul `src/lib/localStore.js`). Aplikasi 100% berfungsi tanpa jaringan.
- **Cloud sync opsional**: satu-satunya backend eksternal yang diizinkan adalah **Firebase** (Authentication Google + Cloud Firestore), dipakai khusus untuk menyimpan hasil kuis yang sudah dibekukan.
- **Firestore `attempts`**: satu dokumen per percobaan kuis; `documentId = attemptId` (UUID); field: `userId`, `moduleId`, `stage` (`evaluate`), `answers`, `startedAt`, `endedAt`, `score`, `version`, `createdAt` (server timestamp).
- **Prasyarat operasional**: provider Google aktif di Firebase Console, database Firestore dibuat, `firestore.rules` dipublish, dan domain (localhost + domain deploy) terdaftar di Authorized domains.
