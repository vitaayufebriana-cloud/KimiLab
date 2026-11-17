/**
 * chemData.js - Data Pembelajaran Kimia SMA
 * Modul 1: Larutan Asam dan Basa
 * 
 * Sesuai aturan arsitektur AGENTS.md:
 * - 100% Client-side static data
 * - Terpisah dan modular
 * - Format rumus kimia terstandarisasi subskrip/superskip
 */

export const module1Info = {
  id: 'asam-basa',
  order: '01',
  code: 'MODUL 01',
  category: 'Kesetimbangan Ion & Larutan',
  title: 'Modul 1: Larutan Asam dan Basa',
  fullTitle: 'Modul 1: Larutan Asam dan Basa & Derajat Keasaman (pH)',
  tagline: 'Kupas tuntas teori ionik, skala logaritmik pH, kesetimbangan air, dan titrasi netralisasi',
  accentColor: '#8b5cf6',
  accentLight: 'rgba(139, 92, 246, 0.12)',
  accentBorder: 'rgba(139, 92, 246, 0.3)',
  duration: '50 Menit',
  difficulty: 'Menengah',
  grade: 'Kelas XI SMA/MA',
};

/**
 * 1. TUJUAN PEMBELAJARAN
 * Capaian kompetensi pembelajaran Modul 1: Larutan Asam dan Basa
 */
export const learningObjectives = [
  {
    id: 'obj-1',
    text: 'Menjelaskan konsep asam dan basa berdasarkan teori Arrhenius, Brønsted-Lowry, dan Lewis.',
    topic: 'Teori Asam Basa',
    badge: 'Konseptual',
  },
  {
    id: 'obj-2',
    text: 'Menganalisis kesetimbangan ionisasi air melalui persamaan reaksi, konsentrasi ion H⁺ dan OH⁻, serta hubungan keduanya dengan Kw.',
    topic: 'Ionisasi Air',
    badge: 'Analisis Reaksi',
  },
  {
    id: 'obj-3',
    text: 'Menjelaskan konsep pH dan pOH serta hubungan konsentrasi ion hidrogen dan hidroksida.',
    topic: 'Skala pH/pOH',
    badge: 'Kuantitatif',
  },
  {
    id: 'obj-4',
    text: 'Membedakan asam kuat, asam lemah, basa kuat, dan basa lemah berdasarkan derajat ionisasi serta nilai Ka dan Kb.',
    topic: 'Kekuatan Elektrolit',
    badge: 'Komparasi',
  },
  {
    id: 'obj-5',
    text: 'Menghitung pH dan pOH larutan asam dan basa berdasarkan konsentrasi serta kekuatan elektrolit.',
    topic: 'Kalkulasi Stoikiometri',
    badge: 'Perhitungan',
  },
  {
    id: 'obj-6',
    text: 'Menganalisis fenomena asam-basa dalam kehidupan sehari-hari berdasarkan konsep kimia.',
    topic: 'Aplikasi Kontekstual',
    badge: 'Aplikasi Nyata',
  },
];

/**
 * 2. ENGAGE (APERSEPSI)
 * Pengantar fenomena kontekstual, visual lemon & sabun, pertanyaan pemantik accordion,
 * dan jembatan materi.
 */
export const apersepsiData = {
  sectionTag: 'ENGAGE • APERSEPSI KONTEKSTUAL',
  title: 'Mengapa Ada yang Terasa Asam, Ada yang Licin?',
  subtitle: 'Mengamati Fenomena Sifat Asam & Basa Zat di Sekitar Kita',

  paragraphs: [
    'Pernahkah kamu memeras jeruk lemon dan merasakan sensasi asam pada lidah? Atau ketika mencuci tangan menggunakan sabun, kamu merasakan permukaan tangan menjadi licin?',
    'Kedua fenomena tersebut berkaitan dengan sifat asam dan basa suatu zat. Lemon mengandung asam sitrat yang memberikan rasa asam, sedangkan sabun umumnya memiliki sifat basa.',
    'Secara kimia, sifat asam dan basa berkaitan dengan keberadaan ion-ion tertentu di dalam larutan. Konsentrasi ion tersebut memengaruhi tingkat keasaman atau kebasaan yang dinyatakan melalui nilai pH.',
  ],

  visuals: [
    {
      id: 'lemon',
      name: 'Jeruk Lemon',
      chemicalName: 'Asam Sitrat (C₆H₈O₇)',
      nature: 'Bersifat Asam',
      natureType: 'acid',
      phValue: 'pH ≈ 2,2',
      sensoryTrait: 'Rasa Masam Menyengat',
      phenomenon: 'Memberikan sensasi kecut/masam khas pada lidah akibat keberadaan ion H⁺ bebas.',
      lakmusReaction: 'Mengubah warna kertas lakmus biru menjadi merah.',
      accentColor: '#eab308',
      bgGradient: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)',
      borderColor: 'rgba(234, 179, 8, 0.3)',
    },
    {
      id: 'soap',
      name: 'Sabun Pembersih',
      chemicalName: 'Garam Asam Lemak (R-COONa / R-COOK)',
      nature: 'Bersifat Basa',
      natureType: 'base',
      phValue: 'pH ≈ 9,0 – 10,0',
      sensoryTrait: 'Terasa Licin di Kulit',
      phenomenon: 'Menghasilkan ion OH⁻ yang melarutkan serta menyabunkan lapisan minyak di kulit tangan.',
      lakmusReaction: 'Mengubah warna kertas lakmus merah menjadi biru.',
      accentColor: '#38bdf8',
      bgGradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%)',
      borderColor: 'rgba(56, 189, 248, 0.3)',
    },
  ],

  triggerQuestions: [
    {
      id: 'pertanyaan-1',
      number: 1,
      question: 'Mengapa air lemon dan larutan sabun memiliki sifat yang berbeda?',
      answer:
        'Air lemon dan larutan sabun memiliki sifat berbeda karena jenis ion dominan yang terlarut di dalamnya. Lemon mengandung asam organik (asam sitrat) yang melepaskan ion hidronium (H⁺ / H₃O⁺) dalam air, menghasilkan rasa masam dan mengubah lakmus biru menjadi merah. Sebaliknya, sabun terbentuk dari reaksi saponifikasi antara lemak dengan basa alkali (seperti NaOH atau KOH), menghasilkan ion hidroksida (OH⁻) yang menimbulkan rasa pahit, sifat licin (karena reaksi dengan minyak kulit), serta mengubah lakmus merah menjadi biru.',
      highlight: 'Perbedaan ion dominan: Asam menghasilkan ion H⁺, sedangkan Basa melepaskan ion OH⁻.',
    },
    {
      id: 'pertanyaan-2',
      number: 2,
      question: 'Apakah dua larutan asam selalu memiliki tingkat keasaman yang sama?',
      answer:
        'Tidak selalu sama. Tingkat keasaman tidak ditentukan hanya dari nama asamnya, melainkan oleh konsentrasi ion H⁺ bebas di dalam larutan. Dua larutan asam dengan konsentrasi molaritas yang sama dapat memiliki nilai pH yang berbeda jauh apabila satu zat merupakan asam kuat yang terdisosiasi sempurna (derajat ionisasi α ≈ 1), sedangkan zat lainnya adalah asam lemah yang hanya terionisasi sebagian kecil (α ≪ 1).',
      highlight: 'Keasaman ditentukan oleh konsentrasi molar ion H⁺ bebas, bukan sekadar fakta bahwa zat tersebut tergolong asam.',
    },
    {
      id: 'pertanyaan-3',
      number: 3,
      question: 'Bagaimana cara mengetahui tingkat keasaman suatu larutan secara kuantitatif?',
      answer:
        'Secara kuantitatif, tingkat keasaman dinyatakan dengan derajat keasaman (pH) menggunakan skala logaritmik Sørensen: pH = -log [H⁺]. Pengukuran kuantitatif di laboratorium dapat dilakukan secara presisi menggunakan pH meter digital (dengan ketelitian 0,01) atau indikator universal yang memiliki trayek perubahan warna pada rentang skala 0 hingga 14.',
      highlight: 'Dihitung secara matematis lewat rumus pH = -log [H⁺] atau diukur dengan pH meter digital terkalibrasi.',
    },
    {
      id: 'pertanyaan-4',
      number: 4,
      question: 'Mengapa asam kuat dan asam lemah dapat memiliki nilai pH berbeda?',
      answer:
        'Perbedaan nilai pH timbul karena perbedaan derajat ionisasi (α) dan tetapan kesetimbangan asam (Ka). Pada konsentrasi mula-mula yang sama (misal 0,1 M), asam kuat seperti HCl terionisasi 100% sehingga [H⁺] = 0,1 M (pH = 1). Sedangkan asam lemah seperti CH₃COOH (asam cuka) dengan Ka ≈ 1,8 × 10⁻⁵ hanya terionisasi sebagian kecil, menghasilkan [H⁺] = √(Ka · M) ≈ 0,00134 M, yang memberikan nilai pH sekitar 2,87 (jauh lebih tinggi / kurang asam dibanding HCl).',
      highlight: 'Asam kuat terurai 100% (α = 1), sedangkan asam lemah berada dalam kesetimbangan ionik (Ka dan α < 1).',
    },
  ],

  // 3. JEMBATAN MATERI (Teks Penutup)
  closingBridge:
    'Untuk menjawab pertanyaan tersebut, kita perlu memahami bagaimana air mengalami ionisasi, bagaimana ion H+ dan OH- berada dalam kesetimbangan, serta bagaimana konsentrasi ion memengaruhi nilai pH dan kekuatan asam-basa.',
};

/**
 * 3. KUIS EVALUASI TINGKAT TINGGI (C4–C5)
 * 10 Soal Pilihan Ganda Asam Basa
 * Versi soal: "v1"
 */
export const quizAsamBasa = {
  version: 'v1',
  moduleId: 'asam-basa',
  title: 'Kuis Evaluasi Tingkat Tinggi (C4–C5): Larutan Asam dan Basa',
  description:
    '10 butir soal pilihan ganda analisis konseptual dan evaluasi kuantitatif. Suhu 25 °C kecuali disebutkan lain, dan Kw = 1,0 × 10⁻¹⁴.',
  totalQuestions: 10,
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      number: 1,
      level: 'C4',
      topic: 'Teori Asam-Basa',
      question:
        'Perhatikan tiga reaksi berikut:\n(1) HCl(aq) → H⁺(aq) + Cl⁻(aq)\n(2) NH₃(g) + HCl(g) → NH₄Cl(s)\n(3) BF₃(g) + NH₃(g) → F₃B–NH₃(s)\n\nAnalisis yang tepat mengenai teori yang dapat menjelaskan ketiga reaksi tersebut adalah ….',
      options: [
        { key: 'A', text: '(1) hanya Arrhenius; (2) Arrhenius dan Brønsted-Lowry; (3) Lewis' },
        { key: 'B', text: '(1) Arrhenius dan Brønsted-Lowry; (2) hanya Lewis; (3) hanya Lewis' },
        { key: 'C', text: '(1) Arrhenius, Brønsted-Lowry, dan Lewis; (2) Brønsted-Lowry dan Lewis, tetapi bukan Arrhenius; (3) hanya Lewis' },
        { key: 'D', text: '(1) hanya Brønsted-Lowry; (2) hanya Arrhenius; (3) Brønsted-Lowry dan Lewis' },
        { key: 'E', text: '(1) Arrhenius; (2) Arrhenius dan Lewis; (3) Brønsted-Lowry' },
      ],
      correctAnswer: 'C',
      explanation:
        'Reaksi (2) tidak menghasilkan H⁺/OH⁻ dalam air, jadi tidak bisa dijelaskan Arrhenius, tetapi NH₃ menerima proton (Brønsted-Lowry) dan mendonorkan pasangan elektron (Lewis). Reaksi (3) tidak melibatkan transfer proton, jadi hanya Lewis (BF₃ akseptor, NH₃ donor pasangan elektron). Reaksi (1) dalam air menghasilkan H⁺ (Arrhenius), mentransfer proton ke pelarut air (Brønsted-Lowry), dan melibatkan koordinasi elektron (Lewis).',
    },
    {
      id: 'q2',
      number: 2,
      level: 'C4',
      topic: 'Brønsted-Lowry & Amfiprotik',
      question:
        'Ion bikarbonat dalam air dapat mengalami dua reaksi:\n(1) HCO₃⁻(aq) + H₂O(l) ⇌ H₂CO₃(aq) + OH⁻(aq)\n(2) HCO₃⁻(aq) + H₂O(l) ⇌ CO₃²⁻(aq) + H₃O⁺(aq)\n\nKesimpulan yang tepat adalah ….',
      options: [
        { key: 'A', text: 'HCO₃⁻ hanya berperan sebagai basa karena menghasilkan OH⁻ pada reaksi (1)' },
        { key: 'B', text: 'H₂O pada reaksi (1) bersifat basa karena menerima proton' },
        { key: 'C', text: 'CO₃²⁻ adalah asam konjugasi dari HCO₃⁻' },
        { key: 'D', text: 'H₂CO₃ adalah basa konjugasi dari HCO₃⁻' },
        { key: 'E', text: 'HCO₃⁻ berperan sebagai basa pada reaksi (1) dan asam pada reaksi (2), sehingga bersifat amfiprotik; pasangan asam-basa konjugasi pada reaksi (2) adalah HCO₃⁻/CO₃²⁻ dan H₃O⁺/H₂O' },
      ],
      correctAnswer: 'E',
      explanation:
        'Pada (1) HCO₃⁻ menerima proton dari H₂O menghasilkan H₂CO₃ sehingga bertindak sebagai basa, sedangkan pada (2) HCO₃⁻ melepas proton ke H₂O sehingga bertindak sebagai asam. Spesi yang bisa bertindak sebagai asam dan basa disebut amfiprotik. Pasangan asam-basa konjugasi pada reaksi (2) adalah HCO₃⁻/CO₃²⁻ dan H₃O⁺/H₂O.',
    },
    {
      id: 'q3',
      number: 3,
      level: 'C4',
      topic: 'Kesetimbangan Ionisasi Air & Kw',
      question:
        'Ionisasi air berlangsung menurut persamaan:\nH₂O(l) ⇌ H⁺(aq) + OH⁻(aq)  ΔH > 0\n\nPada suhu 50 °C, nilai Kw air adalah 5,5 × 10⁻¹⁴. Analisis yang tepat mengenai air murni pada suhu tersebut adalah ….',
      options: [
        { key: 'A', text: 'pH = 7,00 dan netral, karena Kw selalu bernilai 1,0 × 10⁻¹⁴ pada semua suhu' },
        { key: 'B', text: 'pH = 6,63 dan netral, karena [H⁺] = [OH⁻] ≈ 2,3 × 10⁻⁷ M; kenaikan suhu menggeser kesetimbangan ke kanan sehingga Kw naik' },
        { key: 'C', text: 'pH = 6,63 dan bersifat asam, karena pH < 7' },
        { key: 'D', text: 'pH = 7,37 dan bersifat basa, karena [OH⁻] > [H⁺]' },
        { key: 'E', text: 'pH = 6,63 dan netral, karena ionisasi air eksotermik sehingga Kw turun saat suhu naik' },
      ],
      correctAnswer: 'B',
      explanation:
        '√(5,5 × 10⁻¹⁴) = 2,34 × 10⁻⁷ M, sehingga pH = -log(2,34 × 10⁻⁷) ≈ 6,63. Air murni tetap netral selama [H⁺] = [OH⁻]. Karena reaksi ionisasi air endotermik (ΔH > 0), kenaikan suhu menggeser kesetimbangan ke kanan dan Kw naik.',
    },
    {
      id: 'q4',
      number: 4,
      level: 'C4',
      topic: 'pH, pOH, dan Konsentrasi Ion',
      question:
        'Air hujan normal memiliki pH ≈ 5,6, sedangkan suatu sampel hujan asam memiliki pH 3,6. Perbandingan konsentrasi ion pada kedua sampel yang tepat adalah ….',
      options: [
        { key: 'A', text: '[H⁺] sampel hujan asam 2 kali lebih besar dan [OH⁻] 2 kali lebih besar' },
        { key: 'B', text: '[H⁺] sampel hujan asam 100 kali lebih besar dan [OH⁻] 100 kali lebih besar' },
        { key: 'C', text: '[H⁺] sampel hujan asam 100 kali lebih besar dan [OH⁻] tidak berubah' },
        { key: 'D', text: '[H⁺] sampel hujan asam 100 kali lebih besar dan [OH⁻] 100 kali lebih kecil, sedangkan hasil kali [H⁺][OH⁻] tetap 1,0 × 10⁻¹⁴' },
        { key: 'E', text: '[H⁺] sampel hujan asam 2 kali lebih besar dan [OH⁻] 2 kali lebih kecil, sehingga nilai Kw naik' },
      ],
      correctAnswer: 'D',
      explanation:
        'Selisih pH 2 satuan berarti [H⁺] berbeda 10² = 100 kali (pH 3,6 memiliki konsentrasi ion hidrogen 100 kali lipat dibanding pH 5,6). Karena Kw = [H⁺][OH⁻] tetap 1,0 × 10⁻¹⁴ pada 25 °C, maka [OH⁻] = Kw/[H⁺] sehingga 100 kali lebih kecil.',
    },
    {
      id: 'q5',
      number: 5,
      level: 'C4',
      topic: 'Ka & Kekuatan Asam',
      question:
        'Tiga larutan asam dengan konsentrasi sama, 0,1 M:\n- HF (Ka = 6,8 × 10⁻⁴)\n- CH₃COOH (Ka = 1,8 × 10⁻⁵)\n- HCN (Ka = 4,9 × 10⁻¹⁰)\n\nPernyataan yang tepat adalah ….',
      options: [
        { key: 'A', text: 'Urutan pH: HF < CH₃COOH < HCN; basa konjugasi terkuat adalah CN⁻' },
        { key: 'B', text: 'Urutan pH: HF < CH₃COOH < HCN; basa konjugasi terkuat adalah F⁻' },
        { key: 'C', text: 'HF adalah asam paling lemah karena Ka-nya paling besar, sehingga pH-nya paling tinggi' },
        { key: 'D', text: 'Urutan pH: HCN < CH₃COOH < HF, karena Ka kecil menunjukkan asam yang lebih kuat' },
        { key: 'E', text: 'Ketiganya memiliki pH sama karena konsentrasinya sama' },
      ],
      correctAnswer: 'A',
      explanation:
        'Ka terbesar (HF) berarti asam paling kuat sehingga menghasilkan [H⁺] terbesar dan pH paling rendah (urutan pH: HF < CH₃COOH < HCN). Semakin lemah asam, semakin kuat basa konjugasinya. Karena HCN adalah asam paling lemah (Ka terkecil), maka ion sianida (CN⁻) adalah basa konjugasi terkuat.',
    },
    {
      id: 'q6',
      number: 6,
      level: 'C4',
      topic: 'Asam Kuat vs Lemah, Derajat Ionisasi',
      question:
        'Dua larutan asam monoprotik, HX dan HY, masing-masing 0,01 M. Hasil pengukuran: pH larutan HX = 2,0 dan pH larutan HY = 3,5. Kesimpulan yang tepat adalah ….',
      options: [
        { key: 'A', text: 'HX asam lemah dengan α = 100%; HY asam kuat' },
        { key: 'B', text: 'HX dan HY sama-sama asam kuat karena pH keduanya < 7' },
        { key: 'C', text: 'HX asam kuat dengan α = 100%; HY asam lemah dengan α ≈ 3,2% dan Ka ≈ 1 × 10⁻⁵' },
        { key: 'D', text: 'HX asam lemah dengan α = 1%; HY asam kuat dengan α = 3,2%' },
        { key: 'E', text: 'HX asam kuat; HY asam lemah dengan α ≈ 0,32% dan Ka ≈ 1 × 10⁻⁷' },
      ],
      correctAnswer: 'C',
      explanation:
        'HX: [H⁺] = 10⁻² = 0,01 M = konsentrasi awal, sehingga α = 100% (asam kuat). HY: [H⁺] = 10⁻³,⁵ = 3,16 × 10⁻⁴ M, sehingga derajat ionisasi α = (3,16 × 10⁻⁴) / 0,01 ≈ 3,2% dan Ka ≈ (3,16 × 10⁻⁴)² / 0,01 ≈ 1 × 10⁻⁵ (asam lemah).',
    },
    {
      id: 'q7',
      number: 7,
      level: 'C4',
      topic: 'pH Basa Kuat vs Basa Lemah',
      question:
        'Larutan NaOH 0,1 M dan larutan NH₃ 0,1 M (Kb = 1,8 × 10⁻⁵) mengalami ionisasi:\nNaOH(aq) → Na⁺(aq) + OH⁻(aq)\nNH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq)\n\nNilai pH kedua larutan berturut-turut dan alasannya adalah ….',
      options: [
        { key: 'A', text: '13,00 dan 13,00, karena konsentrasi keduanya sama' },
        { key: 'B', text: '13,00 dan 2,87, karena NH₃ adalah asam lemah' },
        { key: 'C', text: '11,13 dan 13,00, karena NaOH hanya terionisasi sebagian' },
        { key: 'D', text: '1,00 dan 11,13, karena NaOH adalah asam kuat' },
        { key: 'E', text: '13,00 dan 11,13, karena NaOH terionisasi sempurna, sedangkan NH₃ hanya terionisasi sebagian (±1,3%)' },
      ],
      correctAnswer: 'E',
      explanation:
        'NaOH basa kuat: [OH⁻] = 0,1 M, pOH = 1, pH = 13,00. NH₃ basa lemah: [OH⁻] = √(1,8 × 10⁻⁵ × 0,1) = 1,34 × 10⁻³ M, pOH = 2,87, pH = 11,13, dan derajat ionisasi α = (1,34 × 10⁻³) / 0,1 ≈ 1,3%.',
    },
    {
      id: 'q8',
      number: 8,
      level: 'C5',
      topic: 'Evaluasi Perhitungan pH Basa Valensi 2',
      question:
        'Seorang siswa menghitung pH larutan Ba(OH)₂ 0,005 M dengan langkah: [OH⁻] = 0,005 M → pOH = 2,30 → pH = 11,70.\n\nBa(OH)₂(aq) → Ba²⁺(aq) + 2OH⁻(aq)\n\nEvaluasi yang tepat terhadap perhitungan siswa adalah ….',
      options: [
        { key: 'A', text: 'Tidak ada kesalahan, karena Ba(OH)₂ adalah basa lemah sehingga [OH⁻] = 0,005 M' },
        { key: 'B', text: 'Salah, karena Ba(OH)₂ menghasilkan 2 ion OH⁻ sehingga [OH⁻] = 0,010 M dan pH = 12,00' },
        { key: 'C', text: 'Salah, karena seharusnya menggunakan Kb sehingga pH = 10,00' },
        { key: 'D', text: 'Salah, karena [OH⁻] = 0,020 M sehingga pH = 12,30' },
        { key: 'E', text: 'Salah, karena Ba(OH)₂ hanya terionisasi setengah sehingga [OH⁻] = 0,0025 M dan pH = 11,40' },
      ],
      correctAnswer: 'B',
      explanation:
        'Satu mol Ba(OH)₂ melepas 2 mol ion OH⁻ (basa kuat valensi 2), sehingga [OH⁻] = 2 × 0,005 = 0,010 M, pOH = -log(0,010) = 2,00, dan pH = 14 - 2,00 = 12,00. Siswa keliru karena tidak mengalikan konsentrasi dengan valensi basa.',
    },
    {
      id: 'q9',
      number: 9,
      level: 'C4',
      topic: 'Pengenceran Asam Kuat vs Lemah',
      question:
        'Larutan HCl 0,1 M dan larutan CH₃COOH 0,1 M (Ka = 1,8 × 10⁻⁵) masing-masing diencerkan 10 kali. Gunakan pendekatan [H⁺] = √(Ka × Ma) untuk asam lemah. Analisis perubahan pH yang tepat adalah ….',
      options: [
        { key: 'A', text: 'Keduanya naik 1,00 satuan pH' },
        { key: 'B', text: 'pH HCl naik 0,50 dan pH CH₃COOH naik 1,00' },
        { key: 'C', text: 'pH HCl naik 1,00 dan pH CH₃COOH tidak berubah' },
        { key: 'D', text: 'pH HCl naik 1,00 (1,00 → 2,00); pH CH₃COOH naik 0,50 (2,87 → 3,37), karena pengenceran menggeser kesetimbangan ionisasi ke kanan sehingga derajat ionisasinya bertambah' },
        { key: 'E', text: 'pH HCl naik 1,00; pH CH₃COOH naik 0,50, karena nilai Ka CH₃COOH bertambah saat diencerkan' },
      ],
      correctAnswer: 'D',
      explanation:
        'HCl: konsentrasi turun 10 kali dari 0,1 M ke 0,01 M, pH naik dari 1,00 menjadi 2,00 (naik 1,00). CH₃COOH 0,1 M: [H⁺] = √(1,8 × 10⁻⁶) = 1,34 × 10⁻³, pH 2,87. Setelah diencerkan 10 kali (Ma = 0,01 M): [H⁺] = √(1,8 × 10⁻⁷) = 4,24 × 10⁻⁴, pH 3,37 (naik 0,50). Kenaikannya hanya 0,50 karena α bertambah (Asas Le Chatelier). Ka konstan pada suhu tetap.',
    },
    {
      id: 'q10',
      number: 10,
      level: 'C5',
      topic: 'Fenomena Sehari-hari: Pengasaman Laut',
      question:
        'Sejak era pra-industri, pH rata-rata permukaan laut turun sekitar 0,1 satuan (±8,2 menjadi ±8,1) akibat CO₂ atmosfer yang larut:\nCO₂(g) + H₂O(l) ⇌ H₂CO₃(aq)\nH₂CO₃(aq) ⇌ H⁺(aq) + HCO₃⁻(aq)\nCO₃²⁻(aq) + H⁺(aq) → HCO₃⁻(aq)\n\nAnalisis yang tepat mengenai penyebab dan dampaknya adalah ….',
      options: [
        { key: 'A', text: '[H⁺] naik ±1,26 kali; H⁺ tambahan bereaksi dengan CO₃²⁻ sehingga ketersediaan karbonat untuk membentuk cangkang CaCO₃ pada organisme laut berkurang' },
        { key: 'B', text: '[H⁺] naik 10 kali; H⁺ tambahan meningkatkan ketersediaan CO₃²⁻ untuk cangkang' },
        { key: 'C', text: '[H⁺] turun ±1,26 kali karena pH turun, sehingga laut menjadi lebih basa' },
        { key: 'D', text: '[OH⁻] naik karena CO₂ bersifat basa, sehingga cangkang CaCO₃ lebih mudah terbentuk' },
        { key: 'E', text: '[H⁺] naik 0,1 M, sehingga laut menjadi asam kuat' },
      ],
      correctAnswer: 'A',
      explanation:
        'ΔpH = 0,1 berarti [H⁺] naik 10⁰·¹ ≈ 1,26 kali (sekitar 26%). Ion H⁺ yang bertambah bereaksi dengan ion CO₃²⁻ membentuk HCO₃⁻, sehingga ketersediaan ion karbonat untuk membentuk cangkang CaCO₃ bagi biota laut menjadi berkurang.',
    },
  ],
};

/**
 * Gabungan modul lengkap: Modul 1 Larutan Asam dan Basa
 */
export const modulAsamBasa = {
  ...module1Info,
  learningObjectives,
  apersepsi: apersepsiData,
  quiz: quizAsamBasa,
};

export default {
  module1Info,
  learningObjectives,
  apersepsiData,
  quizAsamBasa,
  modulAsamBasa,
};
