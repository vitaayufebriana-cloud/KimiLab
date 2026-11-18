# KimiLab Login Design Pattern

Dokumen ini merangkum pola desain halaman masuk KimiLab: palet warna khas Universitas Negeri Malang (UM), tipografi, komponen, state interaksi, dan aturan aksesibilitas.

Berlaku untuk:

- `src/index.css` sebagai sumber token warna global.
- `src/components/auth/AuthPages.css` sebagai implementasi gaya halaman login.
- `src/components/auth/AuthPages.jsx` sebagai struktur tampilan login, registrasi, dan lupa sandi.

## 1. Prinsip visual

- **Biru** menjadi warna identitas, tombol utama, tautan, dan fokus input.
- **Kuning** hanya sebagai aksen kecil: orbit logo, garis bawah hover tautan, dan watermark.
- **Putih** menjadi kanvas utama supaya formulir terasa bersih dan fokus pada input.
- Gunakan satu nada biru yang sama untuk aksi penting agar hierarki tetap jelas.
- Jangan memakai kuning sebagai warna teks tubuh karena kontrasnya rendah di atas putih.

## 2. Palet warna dan token CSS

Semua token didefinisikan sekali di `:root` pada `src/index.css`. Komponen hanya memanggil token yang tersedia, misalnya `var(--um-blue)`.

### Identitas merek

| Token CSS | Hex | Peran | Contoh penggunaan |
| --- | --- | --- | --- |
| `--um-blue` | `#00529C` | Biru UM utama | Tombol **Masuk**, tautan, border fokus, ikon lab |
| `--um-blue-dark` | `#003B73` | Biru UM gelap | Hover tombol utama |
| `--um-gold` | `#FACC15` | Kuning UM terang | Orbit logo, highlight dekoratif |
| `--um-gold-dark` | `#EAB308` | Kuning UM teks/ikon | Teks “Kimi”, garis bawah hover tautan, watermark |

### Permukaan dan latar

| Token CSS | Hex / nilai | Peran |
| --- | --- | --- |
| `--um-white` | `#FFFFFF` | Latar kartu, latar input, teks pada tombol biru |
| `--um-bg` | `#F8FAFC` | Latar antara gradien dan permukaan hover |
| `--um-bg-tint` | `#EFF6FF` | Latar bawah gradien, hover ikon, latar alert info |
| `--um-surface-muted` | `#F1F5F9` | Latar wadah pilihan peran pada registrasi |

### Teks

| Token CSS | Hex | Peran |
| --- | --- | --- |
| `--um-ink` | `#0F172A` | Judul utama dan teks primer |
| `--um-ink-soft` | `#1E293B` | Label input dan teks tombol Google |
| `--um-text-muted-strong` | `#475569` | Teks pendukung yang lebih gelap |
| `--um-muted` | `#64748B` | Subtitle, divider, footer, keterangan |
| `--um-placeholder` | `#94A3B8` | Placeholder dan ikon input non-aktif |

### Border dan garis

| Token CSS | Hex / nilai | Peran |
| --- | --- | --- |
| `--um-border` | `#CBD5E1` | Border input dan tombol Google |
| `--um-border-soft` | `#E2E8F0` | Divider dan border kartu pendukung |
| `--um-card-border` | `rgba(226, 232, 240, 0.9)` | Border kartu login |

### Status

| Token CSS | Hex | Peran |
| --- | --- | --- |
| `--um-error` | `#B91C1C` | Teks pesan error |
| `--um-error-bg` | `#FEF2F2` | Latar pesan error |
| `--um-error-border` | `#FECACA` | Border pesan error |
| `--um-info` | `#1D4ED8` | Teks pesan sukses/informasi |
| `--um-info-bg` | `#EFF6FF` | Latar pesan sukses/informasi |
| `--um-info-border` | `#BFDBFE` | Border pesan sukses/informasi |

### Bayangan, fokus, dan dekorasi

| Token CSS | Nilai | Peran |
| --- | --- | --- |
| `--um-logo-shadow` | `rgba(0, 82, 156, 0.14)` | Bayangan ikon logo |
| `--um-shadow` | `rgba(0, 82, 156, 0.08)` | Bayangan kartu utama |
| `--um-shadow-soft` | `rgba(15, 23, 42, 0.06)` | Bayangan kartu sekunder |
| `--um-shadow-strong` | `rgba(0, 82, 156, 0.5)` | Bayangan hover tombol utama |
| `--um-shadow-tiny` | `rgba(15, 23, 42, 0.1)` | Bayangan segmented control |
| `--um-focus-ring` | `rgba(0, 82, 156, 0.12)` | Ring fokus input |
| `--um-watermark-opacity` | `0.07` | Opacity watermark desktop |
| `--um-watermark-opacity-sm` | `0.05` | Opacity watermark layar kecil |

## 3. Peta komponen

| Elemen | Token dominan | Aturan penggunaan |
| --- | --- | --- |
| Latar halaman | `--um-white`, `--um-bg`, `--um-bg-tint` | Gradien vertikal putih ke biru muda |
| Watermark kimia | `--um-blue`, `--um-gold-dark` | Ilustrasi lab, benzene, atom; low opacity; tidak boleh mengganggu teks |
| Logo KimiLab | `--um-gold-dark`, `--um-blue`, `--um-white` | “Kimi” kuning, “Lab” biru, struktur atom biru dengan orbit kuning |
| Judul halaman | `--um-ink` | 22px, bold |
| Subtitle | `--um-muted` | 13px, regular |
| Kartu form | `--um-white`, `--um-card-border`, `--um-shadow` | Radius 16px, padding 28px 32px, lebar maksimal 400px |
| Label input | `--um-ink-soft` | 12px, semi-bold |
| Input teks | `--um-white`, `--um-border`, `--um-placeholder` | Radius 8px, tinggi 42px, border 1px |
| Input fokus | `--um-blue`, `--um-focus-ring` | Border biru + ring 3px |
| Tombol utama | `--um-blue`, `--um-white` | Teks putih, hover `--um-blue-dark` |
| Tombol Google | `--um-white`, `--um-border`, `--um-ink-soft` | Border tipis, hover `--um-bg` |
| Tautan | `--um-blue`, `--um-gold-dark` | Biru; garis bawah kuning muncul saat hover |
| Divider “atau” | `--um-border-soft`, `--um-muted` | Garis tipis dengan teks di tengah |
| Alert error | `--um-error*` | Pesan validasi dan kegagalan login |
| Alert sukses | `--um-info*` | Pesan berhasil dan informasi reset sandi |
| Footer | `--um-muted` | 11px, terang, tidak menonjol |

## 4. Tipografi dan metrik

Font utama: `var(--font-sans)` (`Plus Jakarta Sans`).

| Elemen | Ukuran | Berat | Warna |
| --- | --- | --- | --- |
| Logo “KimiLab” | 24px | 700 | Gold + blue |
| Judul halaman | 22px | 700 | `--um-ink` |
| Subtitle | 13px | 400 | `--um-muted` |
| Label input | 12px | 600 | `--um-ink-soft` |
| Teks input | 13px | 400 | `--um-ink` |
| Tombol utama | 14px | 600 | `--um-white` |
| Tombol Google | 13px | 500 | `--um-ink-soft` |
| Tautan | 12px | 500–700 | `--um-blue` |
| Footer | 11px | 400 | `--um-muted` |

Metrik utama:

- Kartu: `max-width: 400px`, `padding: 28px 32px`, `border-radius: 16px`.
- Input dan tombol: `height: 42px`, `border-radius: 8px`.
- Jarak antar field: `16px`.
- Mobile `<= 540px`: kartu `24px 20px`; `<= 360px`: kartu `20px 16px`.

## 5. State interaksi

| Elemen | Default | Hover | Fokus | Aktif / lain |
| --- | --- | --- | --- | --- |
| Tombol utama | Biru UM | Biru gelap | Outline biru | Turun 1px saat ditekan |
| Input | Border abu | Border abu | Border biru + ring | Placeholder abu muda |
| Tombol Google | Putih, border abu | Latar `--um-bg` | Outline biru | `disabled` dengan opacity 0.65 saat memuat |
| Tautan | Biru, underline transparan | Underline gold | Outline biru | Tetap biru |
| Eye toggle | Ikon abu | Ikon biru + latar biru muda | Outline biru | `aria-pressed` mengikuti kondisi password |
| Pilihan peran registrasi | Latar abu muda | Teks gelap | Outline biru | Aktif: putih + bayangan kecil |

Transisi view login/registrasi/lupa sandi memakai animasi `fade + translateY` 320ms dan dinonaktifkan pada `prefers-reduced-motion`.

## 6. Aksesibilitas

- Biru UM di atas putih memiliki kontras kuat untuk teks dan tombol.
- Kuning dipakai sebagai aksen/dekorasi, bukan teks kecil di atas putih.
- `--um-muted` hanya untuk teks sekunder; `--um-placeholder` untuk petunjuk yang tidak menggantikan label.
- Setiap input memiliki `label` dengan `htmlFor`.
- Toggle password memiliki `aria-label` dan `aria-pressed`.
- Pesan error memakai `role="alert"`; pesan sukses memakai `role="status"`.
- Fokus keyboard memakai outline biru 2px dengan offset 2px.
- Target sentuh minimum 42px dan tata letak tetap nyaman pada layar 360px.

## 7. Cara pakai

Tambahkan warna baru terlebih dahulu sebagai token di `src/index.css`, lalu dokumentasikan di file ini. Hindari menulis hex langsung di komponen.

```css
.auth-primary-btn {
  background: var(--um-blue);
  color: var(--um-white);
}

.auth-primary-btn:hover {
  background: var(--um-blue-dark);
}

.auth-field input:focus {
  border-color: var(--um-blue);
  box-shadow: 0 0 0 3px var(--um-focus-ring);
}
```

## 8. Aturan penggunaan

**Lakukan**

- Pakai `--um-blue` untuk satu aksi utama per layar.
- Pakai `--um-gold-dark` untuk aksen kecil dan hover underline.
- Pakai token status untuk alert agar makna warna konsisten.
- Pertahankan watermark antara 5%–7% opacity.

**Jangan**

- Jangan memakai kuning sebagai teks body atau label.
- Jangan mencampur token tema gelap bawaan (`--bg-primary`, `--text-primary`) ke halaman login.
- Jangan mendefinisikan ulang `--um-*` di dalam komponen.
- Jangan menambah warna biru/kuning baru tanpa memperbarui token dan dokumentasi ini.

## 9. Referensi

- `src/index.css` — definisi token global.
- `src/components/auth/AuthPages.css` — implementasi visual halaman login.
- `src/components/auth/AuthPages.jsx` — struktur form login, registrasi, dan lupa sandi.
- `AGENTS.md` — batasan arsitektur dan standar desain proyek.
