import { learningObjectives, apersepsiData } from './chemData';

/**
 * Data Statis Modul Utama Pembelajaran Kimia SMA
 * Sesuai panduan AGENTS.md:
 * - 100% Client-Side Data (tanpa remote backend)
 * - Format rumus kimia terstandarisasi subskrip/superskip
 */

export const modulesData = [
  {
    id: 'stoikiometri',
    order: '01',
    category: 'Kimia Dasar & Analitik',
    title: 'Stoikiometri',
    fullTitle: 'Stoikiometri & Perhitungan Reaksi Kimia',
    tagline: 'Fondasi kuantitatif kimia: dari konsep mol hingga pereaksi pembatas',
    accentColor: 'var(--um-blue)', // UM Blue
    accentLight: 'rgba(0, 82, 156, 0.12)',
    accentBorder: 'rgba(0, 82, 156, 0.3)',
    icon: 'scale',
    duration: '45 Menit',
    difficulty: 'Menengah',
    grade: 'Kelas X & XI SMA',
    summary:
      'Membahas relasi kuantitatif antara massa, partikel, volume gas, dan perbandingan mol zat-zat yang bereaksi berdasarkan hukum-hukum dasar kimia.',
    coreFormula: {
      label: 'Hubungan Mol Esensial',
      main: 'n = m / Mr',
      sub: 'V(STP) = n × 22,4 L',
    },
    subtopics: [
      { id: 'st-1', name: 'Hukum Dasar Kimia', desc: 'Lavoisier, Proust, Dalton, Gay-Lussac' },
      { id: 'st-2', name: 'Konsep Mol & Tetapan Avogadro', desc: 'L = 6,022 × 10²³ partikel/mol' },
      { id: 'st-3', name: 'Massa Molar (Mr) & Volume Gas', desc: 'Kondisi standar STP dan gas ideal PV = nRT' },
      { id: 'st-4', name: 'Pereaksi Pembatas & Hasil Reaksi', desc: 'Penentuan kuantitas zat sisa dan zat terbentuk' },
    ],
    sampleReaction: {
      equation: 'N₂(g) + 3H₂(g) → 2NH₃(g)',
      note: 'Perbandingan koefisien reaksi setara dengan perbandingan mol dan volume pada suhu & tekanan sama.',
    },
    objectives: [
      'Menghubungkan massa zat, jumlah mol, dan jumlah partikel dengan presisi.',
      'Menyetarakan persamaan reaksi kimia kompleks.',
      'Menghitung massa produk berdasarkan konsep pereaksi pembatas.',
    ],
  },
  {
    id: 'termokimia',
    order: '02',
    category: 'Energi & Termodinamika Kimia',
    title: 'Termokimia',
    fullTitle: 'Termokimia & Perubahan Entalpi Reaksi',
    tagline: 'Memahami aliran kalor, reaksi eksoterm, endoterm, dan Hukum Hess',
    accentColor: 'var(--um-gold-dark)', // UM Gold Dark
    accentLight: 'rgba(234, 179, 8, 0.12)',
    accentBorder: 'rgba(234, 179, 8, 0.3)',
    icon: 'flame',
    duration: '40 Menit',
    difficulty: 'Menengah',
    grade: 'Kelas XI SMA',
    summary:
      'Mempelajari perubahan energi kalor yang menyertai reaksi kimia, perbedaan sistem dan lingkungan, pengukuran via kalorimeter, serta kalkulasi entalpi via Hukum Hess.',
    coreFormula: {
      label: 'Prinsip Kalor & Entalpi',
      main: 'q = m · c · ΔT',
      sub: 'ΔH = ΣΔHf°(produk) - ΣΔHf°(reaktan)',
    },
    subtopics: [
      { id: 'th-1', name: 'Sistem & Lingkungan', desc: 'Sistem terbuka, tertutup, dan terisolasi' },
      { id: 'th-2', name: 'Eksoterm (ΔH < 0) & Endoterm (ΔH > 0)', desc: 'Pelepasan vs penyerapan kalor lingkungan' },
      { id: 'th-3', name: 'Persamaan Termokimia & Diagram Tingkat', desc: 'Penggambaran perubahan entalpi standar (ΔH°)' },
      { id: 'th-4', name: 'Hukum Hess & Energi Ikatan', desc: 'Perhitungan entalpi tanpa melalui eksperimen langsung' },
    ],
    sampleReaction: {
      equation: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)   ΔH = -890,4 kJ',
      note: 'Reaksi pembakaran metana merupakan reaksi eksotermik kuat yang melepas kalor ke lingkungan.',
    },
    objectives: [
      'Membedakan proses eksoterm dan endoterm melalui perubahan suhu lingkungan.',
      'Menentukan perubahan entalpi reaksi melalui data kalorimeter.',
      'Menerapkan Hukum Hess untuk menghitung ΔH reaksi bertahap.',
    ],
  },
  {
    id: 'asam-basa',
    order: '01',
    category: 'Kesetimbangan Ion & Larutan',
    title: 'Modul 1: Larutan Asam dan Basa',
    fullTitle: 'Modul 1: Larutan Asam dan Basa & Derajat Keasaman (pH)',
    tagline: 'Kupas tuntas teori ionik, skala logaritmik pH, indikator, dan titrasi',
    accentColor: 'var(--um-blue-dark)', // UM Blue Dark
    accentLight: 'rgba(0, 59, 115, 0.12)',
    accentBorder: 'rgba(0, 59, 115, 0.3)',
    icon: 'beaker',
    duration: '50 Menit',
    difficulty: 'Menengah',
    grade: 'Kelas XI SMA',
    summary:
      'Menjelaskan karakteristik asam dan basa berdasarkan teori modern, perhitungan konsentrasi ion hidrogen [H⁺], skala derajat keasaman pH, hingga penentuan konsentrasi melalui titrasi.',
    coreFormula: {
      label: 'Skala Derajat Keasaman',
      main: 'pH = -log [H⁺]',
      sub: 'pH + pOH = 14 (pada 25°C)',
    },
    subtopics: [
      { id: 'ab-1', name: 'Tiga Teori Asam-Basa', desc: 'Arrhenius, Brønsted-Lowry, dan Lewis' },
      { id: 'ab-2', name: 'Kesetimbangan Ionisasi Air & pH', desc: 'Hubungan [H⁺], [OH⁻], dan Kw = 10⁻¹⁴' },
      { id: 'ab-3', name: 'Kekuatan Asam & Basa', desc: 'Derajat ionisasi (α) serta tetapan Ka dan Kb' },
      { id: 'ab-4', name: 'Titrasi Netralisasi Asam-Basa', desc: 'Va · Ma · val_a = Vb · Mb · val_b' },
    ],
    sampleReaction: {
      equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
      note: 'Reaksi netralisasi antara asam kuat dan basa kuat menghasilkan garam netral dan molekul air.',
    },
    objectives: learningObjectives.map((item) => item.text),
    learningObjectivesList: learningObjectives,
    apersepsi: apersepsiData,
  },
];
