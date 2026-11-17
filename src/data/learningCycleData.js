/**
 * learningCycleData.js - Data Pembelajaran Kimia SMA Sintaks Learning Cycle 5E
 * Topik: Larutan Asam-Basa & Derajat Keasaman (pH) Kelas XI SMA
 * 
 * Sintaks 5E:
 * 1. Engage: Fenomena kontekstual sehari-hari, apersepsi, pertanyaan prediksi awal.
 * 2. Explore: Data larutan virtual lab, indikator, skala pH, daya hantar listrik, pertanyaan analisis.
 * 3. Explain: 12 submateri komprehensif dengan representasi Makroskopik, Submikroskopik, & Simbolik.
 * 4. Elaborate: Studi kasus kontekstual "Pengelolaan Limbah Cair Industri Tahu", perhitungan pH netralisasi, HOTS.
 * 5. Evaluate: Integrasi kuis evaluasi komprehensif C4–C5.
 */

// =============================================================================
// TAHAP 1: ENGAGE (MENGGUGAH MINAT & IDENTIFIKASI PENGETAHUAN AWAL)
// =============================================================================
export const engageData = {
  stageId: 'engage',
  title: 'Tahap 1: Engage (Menggugah Minat & Apersepsi)',
  subtitle: 'Mengamati Fenomena Asam-Basa di Sekitar Kita dan Menguji Prediksi Awal',
  intro:
    'Dalam kehidupan sehari-hari, kita bersentuhan langsung dengan beragam senyawa asam dan basa tanpa menyadarinya. Mulai dari rasa kecut jeruk lemon, kebiasaan mencuci dengan sabun yang licin, hingga isu pencemaran air oleh limbah cair pabrik. Mengapa senyawa-senyawa ini memiliki sifat yang begitu kontras?',
  
  phenomena: [
    {
      id: 'lemon-vinegar',
      title: 'Perbedaan Rasa Asam Lemon & Cuka Dapur',
      category: 'Sensori & Senyawa Organik',
      icon: '🍋',
      description:
        'Lemon mengandung asam sitrat (C₆H₈O₇) yang menghasilkan rasa masam segar, sedangkan cuka mengandung asam asetat (CH₃COOH) dengan aroma tajam menusuk. Keduanya sama-sama asam, namun memiliki derajat keasaman dan kekuatan disosiasi yang berbeda.',
      questionPrompt: 'Mengapa sama-sama berasa asam, tingkat keasaman (pH) keduanya berbeda pada konsentrasi yang sama?',
      hint: 'Tergantung pada seberapa banyak ion H⁺ yang mampu dilepaskan ke dalam pelarut air (derajat ionisasi α).',
    },
    {
      id: 'soap-cleaning',
      title: 'Penggunaan Sabun yang Terasa Licin di Kulit',
      category: 'Reaksi Saponifikasi & Basa',
      icon: '🧼',
      description:
        'Ketika tangan terkena air sabun, timbul sensasi licin yang khas. Sabun dihasilkan dari reaksi basa alkali (NaOH/KOH) dengan trigliserida asam lemak. Ion hidroksida (OH⁻) yang dihasilkan bereaksi dengan lapisan minyak alami pada kulit.',
      questionPrompt: 'Mengapa zat basa terasa licin di tangan tetapi menimbulkan sensasi pedih menyengat jika mengenai mata?',
      hint: 'Ion OH⁻ menyabunkan lapisan lipid dan mengiritasi selaput mukosa mata yang sensitif.',
    },
    {
      id: 'natural-indicators',
      title: 'Perubahan Warna Indikator Alami (Kunyit & Kol Ungu)',
      category: 'Pigmen Antosianin & Kurkumin',
      icon: '🌺',
      description:
        'Parutan kunyit berwarna kuning cerah di lingkungan asam atau netral, namun seketika berubah menjadi merah kecokelatan saat ditetesi air sabun deterjen. Pigmen tumbuhan peka terhadap perubahan konsentrasi ion H⁺.',
      questionPrompt: 'Bagaimana struktur pigmen alami dapat mengubah warnanya hanya karena perubahan konsentrasi H⁺?',
      hint: 'Perubahan protonasi pada ikatan rangkap terkonjugasi molekul pigmen mengubah panjang gelombang cahaya yang diserap.',
    },
    {
      id: 'acidic-waste',
      title: 'Permasalahan pH Limbah Cair Lingkungan',
      category: 'Dampak Lingkungan & Ekologi',
      icon: '🏭',
      description:
        'Limbah cair dari industri pangan (misal pabrik tahu) kerap memiliki pH asam (sekitar 4,0–4,5) akibat fermentasi bakteri. Pembuangan langsung ke sungai dapat memusnahkan biota perairan dan merusak ekosistem akuatik.',
      questionPrompt: 'Apa yang terjadi pada rantai makanan air jika pH sungai turun di bawah batas baku mutu lingkungan (pH < 6)?',
      hint: 'Sebagian besar organisme perairan hanya dapat bertahan hidup pada rentang toleransi sempit (pH 6,5–8,5).',
    },
  ],

  // Pertanyaan Prediksi Awal yang Dijawab Siswa Sebelum Mempelajari Konsep
  predictionQuestions: [
    {
      id: 'pred-1',
      question:
        'Prediksi: Jika larutan HCl 0,1 M dan CH₃COOH 0,1 M (konsentrasi sama) diuji menggunakan alat uji daya hantar listrik, apa yang akan terjadi pada nyala lampu?',
      options: [
        { key: 'A', text: 'Kedua larutan menghasilkan nyala lampu yang sama terangnya karena molaritasnya sama (0,1 M).' },
        { key: 'B', text: 'HCl menyala terang karena terionisasi sempurna (asam kuat), sedangkan CH₃COOH menyala redup/hanya timbul gelembung karena terionisasi sebagian (asam lemah).' },
        { key: 'C', text: 'CH₃COOH menyala lebih terang karena molekul organiknya lebih besar.' },
        { key: 'D', text: 'Keduanya tidak menyalakan lampu karena asam bukan senyawa ionik.' },
      ],
      correctKey: 'B',
      explanation:
        'Tepat! Meskipun konsentrasi molaritas keduanya sama (0,1 M), HCl merupakan asam kuat dengan derajat ionisasi α ≈ 1 sehingga melepaskan banyak ion H⁺ dan Cl⁻ pembawa muatan listrik. Sedangkan CH₃COOH adalah asam lemah dengan α ≪ 1 (hanya sekitar 1,3% molekul yang terionisasi).',
    },
    {
      id: 'pred-2',
      question:
        'Prediksi: Ekstrak kunyit yang berwarna kuning jingga ditetesi sedikit air abu atau sabun deterjen. Warna apa yang akan teramati?',
      options: [
        { key: 'A', text: 'Berubah menjadi merah kecokelatan / jingga gelap karena deterjen bersifat basa.' },
        { key: 'B', text: 'Warna kuning memudar menjadi bening tak berwarna seperti air murni.' },
        { key: 'C', text: 'Berubah menjadi biru tua kehitaman.' },
        { key: 'D', text: 'Tetap berwarna kuning cerah tanpa ada perubahan sama sekali.' },
      ],
      correctKey: 'A',
      explanation:
        'Tepat! Kurkumin dalam kunyit bertindak sebagai indikator asam-basa alami. Pada kondisi asam atau netral berwarna kuning jingga, sedangkan pada suasana basa (pH > 8,5) berubah menjadi merah kecokelatan.',
    },
    {
      id: 'pred-3',
      question:
        'Prediksi: Jika suatu larutan asam dengan pH = 2 diencerkan dengan air murni hingga volumenya menjadi 10 kali lipat, berapa perkiraan pH barunya?',
      options: [
        { key: 'A', text: 'pH turun menjadi 1 karena larutan menjadi lebih encer.' },
        { key: 'B', text: 'pH naik menjadi 3 karena konsentrasi ion H⁺ berkurang 10 kali lipat (skala logaritmik).' },
        { key: 'C', text: 'pH langsung melonjak menjadi 7 (netral) karena air murni bersifat netral.' },
        { key: 'D', text: 'pH tetap 2 karena jenis zat asamnya tidak berubah.' },
      ],
      correctKey: 'B',
      explanation:
        'Tepat! Skala pH adalah skala logaritmik berbasis 10 (pH = -log [H⁺]). Pengenceran 10 kali lipat menurunkan konsentrasi ion H⁺ dari 10⁻² M menjadi 10⁻³ M, sehingga pH naik 1 satuan dari 2 menjadi 3.',
    },
  ],
};

// =============================================================================
// TAHAP 2: EXPLORE (EKSPLORASI LABORATORIUM VIRTUAL ASAM-BASA)
// =============================================================================
export const exploreSolutions = [
  {
    id: 'hcl',
    name: 'Asam Klorida (HCl)',
    formula: 'HCl',
    type: 'Asam Kuat',
    category: 'acid-strong',
    valence: 1,
    isStrong: true,
    ka: null,
    baseColor: '#ef4444',
    lightIntensity: 'high', // Nyala lampu: terang
    bubbleDensity: 'many', // Gelembung: banyak
    description: 'Asam kuat monoprotik pembentuk asam lambung, terionisasi 100% dalam air.',
    reaction: 'HCl(aq) → H⁺(aq) + Cl⁻(aq)',
  },
  {
    id: 'h2so4',
    name: 'Asam Sulfat (H₂SO₄)',
    formula: 'H₂SO₄',
    type: 'Asam Kuat (Valensi 2)',
    category: 'acid-strong',
    valence: 2,
    isStrong: true,
    ka: null,
    baseColor: '#dc2626',
    lightIntensity: 'high',
    bubbleDensity: 'many',
    description: 'Asam kuat diprotik yang melepaskan 2 ion H⁺ per molekul pada ionisasi tahap pertama.',
    reaction: 'H₂SO₄(aq) → 2H⁺(aq) + SO₄²⁻(aq)',
  },
  {
    id: 'ch3cooh',
    name: 'Asam Asetat / Cuka (CH₃COOH)',
    formula: 'CH₃COOH',
    type: 'Asam Lemah',
    category: 'acid-weak',
    valence: 1,
    isStrong: false,
    ka: 1.8e-5,
    baseColor: '#f97316',
    lightIntensity: 'low', // Nyala lampu: redup
    bubbleDensity: 'few', // Gelembung: sedikit
    description: 'Asam lemah organik yang terionisasi sebagian kecil (α ≈ 1,3% pada 0,1 M).',
    reaction: 'CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq)',
  },
  {
    id: 'lemon',
    name: 'Jus Lemon (Asam Sitrat)',
    formula: 'C₆H₈O₇',
    type: 'Asam Lemah Alami',
    category: 'acid-weak',
    valence: 1,
    isStrong: false,
    ka: 7.4e-4,
    baseColor: '#eab308',
    lightIntensity: 'low',
    bubbleDensity: 'few',
    description: 'Kandungan asam sitrat dalam air jeruk, berasa masam menyengat dengan pH alami 2,0–2,5.',
    reaction: 'C₆H₈O₇(aq) ⇌ H⁺(aq) + C₆H₇O₇⁻(aq)',
  },
  {
    id: 'h2o',
    name: 'Air Murni (H₂O Netral)',
    formula: 'H₂O',
    type: 'Netral',
    category: 'neutral',
    valence: 1,
    isStrong: false,
    ka: 1.0e-14,
    baseColor: '#10b981',
    lightIntensity: 'off', // Nyala lampu: mati
    bubbleDensity: 'none',
    description: 'Pelarut murni dengan [H⁺] = [OH⁻] = 1,0 × 10⁻⁷ M pada 25 °C (pH = 7,0).',
    reaction: 'H₂O(l) ⇌ H⁺(aq) + OH⁻(aq)  (Kw = 1,0 × 10⁻¹⁴)',
  },
  {
    id: 'tofu-waste',
    name: 'Sampel Limbah Cair Pabrik Tahu',
    formula: 'Limbah Organik Asam',
    type: 'Limbah Asam (pH ≈ 4,2)',
    category: 'acid-weak',
    valence: 1,
    isStrong: false,
    ka: 6.3e-5,
    baseColor: '#f59e0b',
    lightIntensity: 'low',
    bubbleDensity: 'few',
    description: 'Limbah cair industri tahu sebelum diolah, berkarakter asam akibat fermentasi anaerob.',
    reaction: 'Asam Organik(aq) ⇌ H⁺(aq) + Anion⁻(aq)',
  },
  {
    id: 'nh3',
    name: 'Amonia (NH₃)',
    formula: 'NH₃',
    type: 'Basa Lemah',
    category: 'base-weak',
    valence: 1,
    isStrong: false,
    kb: 1.8e-5,
    baseColor: '#06b6d4',
    lightIntensity: 'low',
    bubbleDensity: 'few',
    description: 'Basa nitrogen lemah yang mengikat proton dari molekul air membentuk ion amonium (NH₄⁺).',
    reaction: 'NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq)',
  },
  {
    id: 'soap-water',
    name: 'Air Sabun Pembersih',
    formula: 'R-COONa',
    type: 'Basa Lemah (Garam Basa)',
    category: 'base-weak',
    valence: 1,
    isStrong: false,
    kb: 1.0e-4,
    baseColor: '#3b82f6',
    lightIntensity: 'low',
    bubbleDensity: 'few',
    description: 'Larutan garam asam lemak yang terhidrolisis parsial menghasilkan ion OH⁻ bebas.',
    reaction: 'R-COO⁻(aq) + H₂O(l) ⇌ R-COOH(aq) + OH⁻(aq)',
  },
  {
    id: 'naoh',
    name: 'Natrium Hidroksida (NaOH)',
    formula: 'NaOH',
    type: 'Basa Kuat',
    category: 'base-strong',
    valence: 1,
    isStrong: true,
    kb: null,
    baseColor: '#6366f1',
    lightIntensity: 'high',
    bubbleDensity: 'many',
    description: 'Soda kaustik yang terdisosiasi sempurna melepaskan ion hidroksida pembawa sifat basa kuat.',
    reaction: 'NaOH(aq) → Na⁺(aq) + OH⁻(aq)',
  },
  {
    id: 'baoh2',
    name: 'Barium Hidroksida [Ba(OH)₂]',
    formula: 'Ba(OH)₂',
    type: 'Basa Kuat (Valensi 2)',
    category: 'base-strong',
    valence: 2,
    isStrong: true,
    kb: null,
    baseColor: '#8b5cf6',
    lightIntensity: 'high',
    bubbleDensity: 'many',
    description: 'Basa kuat bervalensi dua yang menghasilkan 2 mol ion OH⁻ per mol senyawa terdisosiasi.',
    reaction: 'Ba(OH)₂(aq) → Ba²⁺(aq) + 2OH⁻(aq)',
  },
];

/**
 * Kalkulasi Nilai pH, pOH, [H+], [OH-] secara ilmiah
 */
export function calculateSolutionProperties(solution, concentration) {
  const c = Math.max(0.0001, Math.min(1.0, concentration));
  let hConc = 1e-7;
  let ohConc = 1e-7;
  let ph = 7.0;
  let poh = 7.0;
  let alpha = 1.0;

  if (solution.category === 'acid-strong') {
    hConc = c * solution.valence;
    ohConc = 1e-14 / hConc;
    ph = -Math.log10(hConc);
    poh = 14.0 - ph;
    alpha = 1.0;
  } else if (solution.category === 'acid-weak') {
    const ka = solution.ka || 1.8e-5;
    hConc = Math.sqrt(ka * c);
    ohConc = 1e-14 / hConc;
    ph = -Math.log10(hConc);
    poh = 14.0 - ph;
    alpha = Math.min(1.0, hConc / c);
  } else if (solution.category === 'base-strong') {
    ohConc = c * solution.valence;
    hConc = 1e-14 / ohConc;
    poh = -Math.log10(ohConc);
    ph = 14.0 - poh;
    alpha = 1.0;
  } else if (solution.category === 'base-weak') {
    const kb = solution.kb || 1.8e-5;
    ohConc = Math.sqrt(kb * c);
    hConc = 1e-14 / ohConc;
    poh = -Math.log10(ohConc);
    ph = 14.0 - poh;
    alpha = Math.min(1.0, ohConc / c);
  } else {
    // Netral
    hConc = 1e-7;
    ohConc = 1e-7;
    ph = 7.0;
    poh = 7.0;
    alpha = 0.0001;
  }

  // Clamping visual
  ph = Math.max(0.0, Math.min(14.0, ph));
  poh = Math.max(0.0, Math.min(14.0, poh));

  // Penentuan Indikator
  const lakmusMerah = ph >= 8.0 ? 'Biru' : 'Merah';
  const lakmusBiru = ph <= 6.0 ? 'Merah' : 'Biru';
  const pp = ph >= 8.3 ? (ph > 10.0 ? 'Merah Pekat / Magenta' : 'Merah Muda (Pink)') : 'Tak Berwarna';
  const metilMerah = ph < 4.4 ? 'Merah' : ph > 6.2 ? 'Kuning' : 'Jingga / Oranye';
  const btb = ph < 6.0 ? 'Kuning' : ph > 7.6 ? 'Biru' : 'Hijau';

  // Indikator Universal Hex Color
  let universalColor = '#10b981';
  if (ph < 2) universalColor = '#dc2626'; // Merah tua
  else if (ph < 4) universalColor = '#ea580c'; // Jingga
  else if (ph < 6) universalColor = '#eab308'; // Kuning
  else if (ph < 8) universalColor = '#10b981'; // Hijau netral
  else if (ph < 10) universalColor = '#06b6d4'; // Cyan
  else if (ph < 12) universalColor = '#2563eb'; // Biru
  else universalColor = '#7c3aed'; // Ungu tua

  return {
    concentration: c,
    hConc: hConc < 0.001 ? hConc.toExponential(2) : hConc.toFixed(4),
    ohConc: ohConc < 0.001 ? ohConc.toExponential(2) : ohConc.toFixed(4),
    ph: Number(ph.toFixed(2)),
    poh: Number(poh.toFixed(2)),
    alphaPercent: (alpha * 100).toFixed(2),
    indicators: {
      lakmusMerah,
      lakmusBiru,
      pp,
      metilMerah,
      btb,
      universalColor,
    },
  };
}

// Pertanyaan Analisis untuk Tahap Explore
export const exploreAnalysisQuestions = [
  {
    id: 'exp-q1',
    question: 'Berdasarkan simulasi, bandingkan nilai pH antara HCl 0,1 M dan CH₃COOH 0,1 M. Mengapa keduanya berbeda meskipun konsentrasinya sama?',
    guidance: 'Hubungkan dengan perbedaan asam kuat (terdisosiasi 100%) dan asam lemah (terionisasi sebagian dengan Ka = 1,8 × 10⁻⁵).',
  },
  {
    id: 'exp-q2',
    question: 'Bagaimana pengaruh perubahan konsentrasi (pengenceran) terhadap nilai pH larutan asam dan basa?',
    guidance: 'Pengenceran asam menaikkan nilai pH mendekati 7, sedangkan pengenceran basa menurunkan nilai pH mendekati 7.',
  },
  {
    id: 'exp-q3',
    question: 'Perhatikan nyala lampu pada alat uji daya hantar listrik. Apa korelasi antara kekuatan asam/basa dengan daya hantar listriknya?',
    guidance: 'Asam/basa kuat menghasilkan kerapatan ion bebas yang tinggi sehingga lampu menyala terang, sedangkan elektrolit lemah hanya menghasilkan sedikit ion pembawa arus.',
  },
];

// =============================================================================
// TAHAP 3: EXPLAIN (12 MATERI LENGKAP & REPRESENTASI TRIPLET)
// =============================================================================
export const explainTopics = [
  {
    id: 'konsep-dasar',
    order: 1,
    title: '1. Konsep Dasar Asam dan Basa',
    summary: 'Mengenal sifat khas makroskopik, sejarah klasifikasi zat, serta karakteristik organoleptik asam dan basa.',
    triplet: {
      macroscopic: 'Asam berasa masam, korosif terhadap logam aktif, dan mengubah lakmus biru menjadi merah. Basa berasa pahit, licin di kulit (bersifat kaustik), dan mengubah lakmus merah menjadi biru.',
      submicroscopic: 'Dalam larutan air, asam melepaskan ion hidronium (H₃O⁺) sedangkan basa melepaskan ion hidroksida (OH⁻). Interaksi elektrostatik ion-ion ini menentukan reaktivitas zat.',
      symbolic: 'Asam: [H⁺] > 10⁻⁷ M, pH < 7. Basa: [OH⁻] > 10⁻⁷ M, pH > 7. Netral: [H⁺] = [OH⁻] = 10⁻⁷ M, pH = 7 (pada 25 °C).',
    },
    equations: [
      'HCl(aq) + H₂O(l) → H₃O⁺(aq) + Cl⁻(aq)',
      'NaOH(s) + H₂O(l) → Na⁺(aq) + OH⁻(aq)',
    ],
    formulas: [
      { label: 'Definisi Keasaman', text: 'pH = -log [H⁺]' },
      { label: 'Definisi Kebasaan', text: 'pOH = -log [OH⁻]' },
    ],
    explanation:
      'Secara makroskopis, asam dan basa dibedakan melalui rasa, sensasi sentuhan, dan reaksi terhadap indikator warna. Namun, mencicipi bahan kimia sangat berbahaya. Kimiawan modern mendefinisikan asam-basa berdasarkan partikel mikroskopis (ion hidronium dan hidroksida). Pada suhu kamar (25 °C), air murni memiliki konsentrasi ion H⁺ dan OH⁻ yang sama persis yaitu 1,0 × 10⁻⁷ M.',
    example: {
      problem: 'Sebuah larutan pembersih dapur memiliki konsentrasi ion OH⁻ sebesar 1,0 × 10⁻³ M. Tentukan apakah larutan tersebut bersifat asam, basa, atau netral, serta tentukan nilai pH-nya!',
      solution:
        'Langkah 1: Hitung pOH = -log [OH⁻] = -log (1,0 × 10⁻³) = 3,0.\nLangkah 2: Hitung pH = 14 - pOH = 14 - 3,0 = 11,0.\nKarena pH > 7 (dan [OH⁻] > 10⁻⁷ M), maka larutan bersifat Basa Kuat/Sedang.',
    },
    checkpoint: {
      question: 'Larutan dengan nilai pH = 4 memiliki konsentrasi ion hidrogen [H⁺] sebesar ….',
      options: ['1,0 × 10⁻⁴ M', '4,0 × 10⁻¹ M', '1,0 × 10⁻¹⁰ M', '4,0 × 10⁻¹⁴ M'],
      correct: 0,
      feedback: 'Tepat! Karena pH = -log [H⁺], maka [H⁺] = 10^(-pH) = 10⁻⁴ M.',
    },
  },
  {
    id: 'teori-arrhenius',
    order: 2,
    title: '2. Teori Asam-Basa Arrhenius',
    summary: 'Teori disosiasi elektrolit dalam pelarut air yang diajukan oleh Svante Arrhenius pada tahun 1884.',
    triplet: {
      macroscopic: 'Kristal padat asam (seperti asam sitrat) tidak dapat menghantarkan listrik, namun saat dilarutkan dalam air, larutan seketika menjadi konduktor dan mengubah warna lakmus.',
      submicroscopic: 'Molekul asam mengalami disosiasi elektrolitik melepaskan ion H⁺ yang segera berikatan dengan molekul air membentuk ion hidronium (H₃O⁺). Molekul basa terurai melepaskan kation logam dan anion OH⁻.',
      symbolic: 'Asam: HA(aq) → H⁺(aq) + A⁻(aq)\nBasa: BOH(aq) → B⁺(aq) + OH⁻(aq)',
    },
    equations: [
      'HCl(aq) → H⁺(aq) + Cl⁻(aq)',
      'Ca(OH)₂(aq) → Ca²⁺(aq) + 2OH⁻(aq)',
    ],
    formulas: [
      { label: 'Ion Hidronium', text: 'H⁺(aq) + H₂O(l) ⇌ H₃O⁺(aq)' },
      { label: 'Kelemahan Teori', text: 'Terbatas hanya untuk pelarut air (H₂O) dan zat yang mengandung H atau OH.' },
    ],
    explanation:
      'Arrhenius mendefinisikan asam sebagai zat yang apabila dilarutkan ke dalam air menghasilkan ion hidrogen (H⁺), sedangkan basa adalah zat yang dalam air menghasilkan ion hidroksida (OH⁻). Teori ini berhasil menjelaskan sifat elektrolit dan reaksi netralisasi, tetapi memiliki keterbatasan: tidak dapat menjelaskan sifat asam-basa pada pelarut bukan air (misal cairan benzena) serta senyawa basa seperti NH₃ yang tidak memiliki gugus hidroksida dalam rumus molekulnya.',
    example: {
      problem: 'Tuliskan reaksi ionisasi barium hidroksida Ba(OH)₂ dalam air menurut teori Arrhenius dan tentukan valensi basanya!',
      solution:
        'Reaksi ionisasi: Ba(OH)₂(aq) → Ba²⁺(aq) + 2OH⁻(aq)\nKarena menghasilkan 2 ion OH⁻ per satuan rumus, maka valensi basa b = 2.',
    },
    checkpoint: {
      question: 'Kelemahan utama dari teori asam-basa Arrhenius adalah ….',
      options: [
        'Tidak dapat menjelaskan reaksi dalam pelarut selain air dan basa tanpa gugus OH⁻ seperti amonia',
        'Tidak mengakui keberadaan ion H⁺',
        'Hanya berlaku untuk gas mulia',
        'Menyatakan bahwa semua zat bersifat asam',
      ],
      correct: 0,
      feedback: 'Benar! Arrhenius hanya membatasi asam-basa pada pelarut air dan memerlukan gugus OH⁻ eksplisit.',
    },
  },
  {
    id: 'teori-bronsted-lowry',
    order: 3,
    title: '3. Teori Asam-Basa Brønsted-Lowry',
    summary: 'Konsep transfer proton (H⁺), pasangan asam-basa konjugasi, dan zat amfiprotik.',
    triplet: {
      macroscopic: 'Gas amonia (NH₃) yang tidak mengandung gugus OH⁻ dapat bereaksi langsung dengan uap gas HCl membentuk asap putih padatan amonium klorida (NH₄Cl) tanpa keterlibatan air.',
      submicroscopic: 'Proton (H⁺) berpindah langsung dari molekul donor (HCl) ke pasangan elektron bebas pada atom nitrogen molekul akseptor (NH₃), membentuk ikatan kovalen baru.',
      symbolic: 'Asam = Donor Proton (H⁺)\nBasa = Akseptor Proton (H⁺)\nPasangan Konjugasi: HA / A⁻ dan HB⁺ / B',
    },
    equations: [
      'NH₃(g) + HCl(g) ⇌ NH₄⁺(s) + Cl⁻(s)',
      'HCO₃⁻(aq) + H₂O(l) ⇌ CO₃²⁻(aq) + H₃O⁺(aq)  (HCO₃⁻ sebagai Asam)',
      'HCO₃⁻(aq) + H₂O(l) ⇌ H₂CO₃(aq) + OH⁻(aq)  (HCO₃⁻ sebagai Basa)',
    ],
    formulas: [
      { label: 'Pasangan Konjugasi', text: 'Asam Konjugasi = Basa + H⁺' },
      { label: 'Basa Konjugasi', text: 'Basa Konjugasi = Asam - H⁺' },
      { label: 'Amfiprotik', text: 'Zat yang dapat bertindak sebagai asam sekaligus basa (misal: H₂O, HCO₃⁻, HSO₄⁻)' },
    ],
    explanation:
      'Johannes Brønsted dan Thomas Lowry mendefinisikan asam sebagai donor proton (memberikan H⁺) dan basa sebagai akseptor proton (menerima H⁺). Ketika asam mendonorkan H⁺, sisanya menjadi basa konjugasi. Sebaliknya, saat basa menerima H⁺, ia berubah menjadi asam konjugasi. Spesi amfiprotik (seperti H₂O dan ion bikarbonat HCO₃⁻) dapat bertindak sebagai asam atau basa tergantung pasangannya.',
    example: {
      problem: 'Tentukan pasangan asam-basa konjugasi pada reaksi: HF(aq) + H₂O(l) ⇌ F⁻(aq) + H₃O⁺(aq)!',
      solution:
        '- HF mendonorkan H⁺ menjadi F⁻, maka HF adalah Asam 1 dan F⁻ adalah Basa Konjugasi 1.\n- H₂O menerima H⁺ menjadi H₃O⁺, maka H₂O adalah Basa 2 dan H₃O⁺ adalah Asam Konjugasi 2.\nPasangan konjugasinya adalah HF/F⁻ dan H₃O⁺/H₂O.',
    },
    checkpoint: {
      question: 'Basa konjugasi dari ion hidrogen sulfat (HSO₄⁻) adalah ….',
      options: ['SO₄²⁻', 'H₂SO₄', 'H₃SO₄⁺', 'HSO₃⁻'],
      correct: 0,
      feedback: 'Tepat! Basa konjugasi terbentuk jika asam melepas satu proton H⁺: HSO₄⁻ - H⁺ → SO₄²⁻.',
    },
  },
  {
    id: 'teori-lewis',
    order: 4,
    title: '4. Teori Asam-Basa Lewis',
    summary: 'Perluasan konsep asam-basa berbasis transfer pasangan elektron bebas (PEB) dan ikatan kovalen koordinasi.',
    triplet: {
      macroscopic: 'Gas boron trifluorida (BF₃) bereaksi sangat cepat dengan gas amonia (NH₃) menghasilkan garam kompleks padat F₃B–NH₃ tanpa melibatkan proton sama sekali.',
      submicroscopic: 'Atom boron pada BF₃ memiliki orbital p kosong (hanya dikelilingi 6 elektron valensi, oktet tak lengkap). Atom nitrogen pada NH₃ memiliki satu pasangan elektron bebas (PEB) yang disumbangkan ke orbital kosong boron membentuk ikatan kovalen koordinasi.',
      symbolic: 'Asam Lewis = Akseptor Pasangan Elektron Bebas (PEB)\nBasa Lewis = Donor Pasangan Elektron Bebas (PEB)\nBF₃ + :NH₃ → F₃B–NH₃',
    },
    equations: [
      'BF₃(g) + :NH₃(g) → F₃B←NH₃(s)',
      'Cu²⁺(aq) + 4:NH₃(aq) → [Cu(NH₃)₄]²⁺(aq)  (Kompleks Tetraaminatembaga)',
    ],
    formulas: [
      { label: 'Syarat Asam Lewis', text: 'Memiliki orbital kosong / molekul dengan oktet tak lengkap (BF₃, AlCl₃, Fe³⁺, H⁺)' },
      { label: 'Syarat Basa Lewis', text: 'Memiliki pasangan elektron bebas yang siap didonorkan (:NH₃, H₂O:, Cl⁻)' },
    ],
    explanation:
      'Gilbert N. Lewis memperluas cakupan asam-basa melampaui transfer ion H⁺. Menurut Lewis, asam adalah akseptor pasangan elektron bebas (PEB), sedangkan basa adalah donor PEB. Teori ini sangat penting dalam kimia organik dan pembentukan ion kompleks anorganik, karena mampu menjelaskan sifat asam pada zat tanpa hidrogen seperti BF₃, AlCl₃, dan ion logam transisi.',
    example: {
      problem: 'Jelaskan peran AlCl₃ dan Cl⁻ dalam reaksi AlCl₃ + Cl⁻ → AlCl₄⁻ berdasarkan teori Lewis!',
      solution:
        '- Al pada AlCl₃ kekurangan elektron valensi (oktet tak lengkap) dan bertindak sebagai Asam Lewis (akseptor PEB).\n- Ion Cl⁻ membawa pasangan elektron bebas dan bertindak sebagai Basa Lewis (donor PEB).\n- Keduanya membentuk ikatan kovalen koordinasi membentuk ion AlCl₄⁻.',
    },
    checkpoint: {
      question: 'Senyawa berikut yang dapat bertindak sebagai asam Lewis tetapi TIDAK dapat bertindak sebagai asam Brønsted-Lowry adalah ….',
      options: ['BF₃', 'HCl', 'H₂SO₄', 'CH₃COOH'],
      correct: 0,
      feedback: 'Tepat! BF₃ tidak memiliki proton H⁺ (bukan asam Brønsted), tetapi memiliki orbital kosong penerima pasangan elektron (asam Lewis).',
    },
  },
  {
    id: 'kesetimbangan-air',
    order: 5,
    title: '5. Kesetimbangan Ionisasi Air (Kw)',
    summary: 'Autoionisasi air murni, tetapan kesetimbangan Kw, serta pengaruh suhu terhadap netralitas larutan.',
    triplet: {
      macroscopic: 'Air murni yang sangat bersih tetap memiliki konduktivitas listrik residual yang sangat kecil namun terukur presisi menggunakan konduktometer analitik.',
      submicroscopic: 'Dua molekul air saling bertabrakan; satu molekul mendonorkan proton ke molekul lain membentuk pasangan ion hidronium (H₃O⁺) dan hidroksida (OH⁻) dalam kesetimbangan dinamis.',
      symbolic: 'H₂O(l) + H₂O(l) ⇌ H₃O⁺(aq) + OH⁻(aq)  ΔH > 0 (Endotermik)\nKw = [H⁺][OH⁻] = 1,0 × 10⁻¹⁴ (pada 25 °C)',
    },
    equations: [
      '2H₂O(l) ⇌ H₃O⁺(aq) + OH⁻(aq)',
      'Kw = [H⁺][OH⁻] = 1,0 × 10⁻¹⁴ (T = 25 °C)',
      'Kw = 5,5 × 10⁻¹⁴ (T = 50 °C, endotermik menggeser ke kanan)',
    ],
    formulas: [
      { label: 'Air Netral', text: '[H⁺] = [OH⁻] = √(Kw)' },
      { label: 'Pada 25 °C', text: '[H⁺] = √(1,0 × 10⁻¹⁴) = 1,0 × 10⁻⁷ M  (pH = 7,0)' },
      { label: 'Hubungan Logaritmik', text: 'pH + pOH = pKw = 14,0 (pada 25 °C)' },
    ],
    explanation:
      'Air merupakan elektrolit yang sangat lemah dan mengalami autoionisasi (swadisosiasi). Karena reaksi ionisasi air bersifat endotermik (ΔH > 0), peningkatan suhu akan menggeser kesetimbangan ke arah kanan menurut asas Le Chatelier, sehingga nilai Kw membesar. Pada 50 °C, Kw = 5,5 × 10⁻¹⁴, sehingga air murni netral memiliki pH = 6,63 (bukan 7,00). Air tetap netral karena [H⁺] selalu sama dengan [OH⁻].',
    example: {
      problem: 'Pada suhu 60 °C nilai Kw air adalah 1,0 × 10⁻¹³. Tentukan nilai pH air murni netral pada suhu tersebut!',
      solution:
        'Langkah 1: Karena netral, [H⁺] = √(Kw) = √(1,0 × 10⁻¹³) ≈ 3,16 × 10⁻⁷ M.\nLangkah 2: pH = -log (3,16 × 10⁻⁷) = 7 - log 3,16 ≈ 6,50.\nKesimpulan: Pada 60 °C, air murni bersifat netral pada pH 6,50.',
    },
    checkpoint: {
      question: 'Jika suhu air murni dinaikkan dari 25 °C menjadi 60 °C, apa yang terjadi pada nilai Kw dan sifat netralitas air?',
      options: [
        'Kw bertambah besar, pH turun, namun air tetap netral karena [H⁺] = [OH⁻]',
        'Kw mengecil dan air berubah menjadi asam',
        'Kw tetap konstan 1,0 × 10⁻¹⁴ pada semua suhu',
        'pH naik di atas 7 sehingga air menjadi basa',
      ],
      correct: 0,
      feedback: 'Tepat! Kenaikan suhu menggeser reaksi endotermik ke kanan sehingga Kw naik, pH turun, tetapi tetap netral.',
    },
  },
  {
    id: 'konsep-ph-poh',
    order: 6,
    title: '6. Konsep Derajat Keasaman (pH dan pOH)',
    summary: 'Skala logaritmik Sørensen untuk menyatakan konsentrasi ion hidrogen dan hidroksida secara praktis.',
    triplet: {
      macroscopic: 'Kertas indikator universal dicelupkan ke dalam larutan dan dicocokkan dengan pita warna skala 0 sampai 14 untuk membaca nilai pH secara langsung.',
      submicroscopic: 'Setiap penurunan 1 satuan skala pH mencerminkan peningkatan konsentrasi ion H⁺ bebas terlarut sebesar 10 kali lipat (skala logaritmik eksponensial).',
      symbolic: 'pH = -log [H⁺]\npOH = -log [OH⁻]\npH + pOH = 14 (pada 25 °C)',
    },
    equations: [
      'pH = -log₁₀ [H⁺]',
      '[H⁺] = 10^(-pH)',
      'pOH = -log₁₀ [OH⁻]',
      '[OH⁻] = 10^(-pOH)',
    ],
    formulas: [
      { label: 'Skala Asam', text: 'pH < 7  ([H⁺] > 10⁻⁷ M)' },
      { label: 'Skala Netral', text: 'pH = 7  ([H⁺] = [OH⁻] = 10⁻⁷ M)' },
      { label: 'Skala Basa', text: 'pH > 7  ([H⁺] < 10⁻⁷ M)' },
    ],
    explanation:
      'Karena konsentrasi ion hidrogen dalam larutan berorde sangat kecil (misal 10⁻¹ hingga 10⁻¹⁴ M), kimiawan Denmark Søren Sørensen pada tahun 1909 mengusulkan skala logaritmik "potenz" (p). Nilai pH 3 memiliki konsentrasi ion H⁺ seratus (10²) kali lebih pekat dibanding larutan dengan pH 5.',
    example: {
      problem: 'Suatu sampel air minum memiliki konsentrasi ion H⁺ sebesar 2,0 × 10⁻⁸ M. Tentukan nilai pH dan pOH sampel tersebut! (Gunakan log 2 = 0,30)',
      solution:
        'Langkah 1: pH = -log [H⁺] = -log (2,0 × 10⁻⁸) = 8 - log 2 = 8 - 0,30 = 7,70.\nLangkah 2: pOH = 14 - pH = 14 - 7,70 = 6,30.\nLarutan sedikit bersifat basa lemah.',
    },
    checkpoint: {
      question: 'Jika larutan A memiliki pH = 2 dan larutan B memiliki pH = 5, perbandingan konsentrasi [H⁺] larutan A terhadap larutan B adalah ….',
      options: ['1000 kali lebih besar', '3 kali lebih besar', '100 kali lebih kecil', '10 kali lebih besar'],
      correct: 0,
      feedback: 'Benar! Selisih pH = 5 - 2 = 3 satuan. Karena logaritmik, perbandingannya adalah 10³ = 1000 kali lipat.',
    },
  },
  {
    id: 'perhitungan-asam-basa-kuat',
    order: 7,
    title: '7. Perhitungan pH Asam Kuat dan Basa Kuat',
    summary: 'Menghitung pH elektrolit kuat berdasarkan konsentrasi molar dan valensi asam (a) atau basa (b).',
    triplet: {
      macroscopic: 'Larutan HCl 0,1 M dan Ba(OH)₂ 0,05 M merupakan elektrolit kuat yang menyebabkan bola lampu penguji menyala sangat terang dan melepaskan panas hidrasi saat dilarutkan.',
      submicroscopic: 'Senyawa terdisosiasi 100% tanpa menyisakan molekul netral tak terurai; seluruh partikel solut berada dalam bentuk kation dan anion bebas.',
      symbolic: 'Asam Kuat: [H⁺] = a × Ma\nBasa Kuat: [OH⁻] = b × Mb\n(a = valensi asam, b = valensi basa)',
    },
    equations: [
      'HCl(aq) → H⁺(aq) + Cl⁻(aq)  (a = 1)',
      'H₂SO₄(aq) → 2H⁺(aq) + SO₄²⁻(aq)  (a = 2)',
      'NaOH(aq) → Na⁺(aq) + OH⁻(aq)  (b = 1)',
      'Ba(OH)₂(aq) → Ba²⁺(aq) + 2OH⁻(aq)  (b = 2)',
    ],
    formulas: [
      { label: 'pH Asam Kuat', text: '[H⁺] = a · Ma  →  pH = -log [H⁺]' },
      { label: 'pH Basa Kuat', text: '[OH⁻] = b · Mb  →  pOH = -log [OH⁻]  →  pH = 14 - pOH' },
    ],
    explanation:
      'Asam kuat (seperti HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄) dan basa kuat (hidroksida alkali golongan IA dan IIA seperti NaOH, KOH, Ca(OH)₂, Ba(OH)₂) mengalami disosiasi sempurna (derajat ionisasi α = 1). Oleh karena itu, konsentrasi ion H⁺ atau OH⁻ langsung sebanding dengan molaritas senyawa dikalikan valensinya.',
    example: {
      problem: 'Hitunglah nilai pH dari larutan asam sulfat H₂SO₄ 0,005 M dan larutan kalsium hidroksida Ca(OH)₂ 0,02 M!',
      solution:
        '1. H₂SO₄ (valensi a = 2):\n   [H⁺] = a × Ma = 2 × 0,005 M = 0,01 M = 10⁻² M.\n   pH = -log (10⁻²) = 2,00.\n\n2. Ca(OH)₂ (valensi b = 2):\n   [OH⁻] = b × Mb = 2 × 0,02 M = 0,04 M = 4 × 10⁻² M.\n   pOH = -log (4 × 10⁻²) = 2 - log 4 = 2 - 0,60 = 1,40.\n   pH = 14 - 1,40 = 12,60.',
    },
    checkpoint: {
      question: 'Larutan Ba(OH)₂ memiliki konsentrasi 0,005 M. Nilai pH larutan tersebut adalah ….',
      options: ['12,00', '11,70', '2,00', '14,00'],
      correct: 0,
      feedback: 'Tepat! Ba(OH)₂ memiliki valensi b = 2, sehingga [OH⁻] = 2 × 0,005 = 0,01 M, pOH = 2, dan pH = 14 - 2 = 12.',
    },
  },
  {
    id: 'perhitungan-asam-basa-lemah',
    order: 8,
    title: '8. Perhitungan pH Asam Lemah dan Basa Lemah',
    summary: 'Kesetimbangan ionik elektrolit lemah menggunakan tetapan ionisasi Ka dan Kb.',
    triplet: {
      macroscopic: 'Asam cuka 0,1 M dan amonia 0,1 M memiliki aroma menyengat khas molekul gas volatil yang tidak terionisasi, dan hanya membuat lampu penguji menyala redup.',
      submicroscopic: 'Hanya sebagian kecil molekul yang terurai menjadi ion; mayoritas zat tetap bertahan sebagai molekul netral dalam kesetimbangan dinamis bolak-balik.',
      symbolic: 'HA(aq) ⇌ H⁺(aq) + A⁻(aq)  Ka = ([H⁺][A⁻]) / [HA]\nB(aq) + H₂O(l) ⇌ BH⁺(aq) + OH⁻(aq)  Kb = ([BH⁺][OH⁻]) / [B]',
    },
    equations: [
      'CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq)  (Ka = 1,8 × 10⁻⁵)',
      'NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq)  (Kb = 1,8 × 10⁻⁵)',
    ],
    formulas: [
      { label: '[H⁺] Asam Lemah', text: '[H⁺] = √(Ka · Ma)' },
      { label: '[OH⁻] Basa Lemah', text: '[OH⁻] = √(Kb · Mb)' },
      { label: 'Kekuatan Relatif', text: 'Semakin besar Ka/Kb, semakin kuat asam/basa tersebut.' },
    ],
    explanation:
      'Asam lemah dan basa lemah hanya terionisasi sebagian kecil di dalam air. Untuk asam monoprotik lemah dengan asumsi derajat ionisasi α < 5%, konsentrasi ion hidrogen dihitung menggunakan pendekatan kesetimbangan: [H⁺] = √(Ka × Ma). Semakin besar nilai Ka, semakin banyak ion H⁺ yang terbentuk sehingga tingkat keasamannya semakin tinggi dan nilai pH-nya semakin rendah.',
    example: {
      problem: 'Hitunglah nilai pH larutan asam asetat CH₃COOH 0,1 M jika diketahui Ka = 1,8 × 10⁻⁵! (Gunakan √1,8 ≈ 1,34)',
      solution:
        'Langkah 1: [H⁺] = √(Ka × Ma) = √(1,8 × 10⁻⁵ × 0,1) = √(1,8 × 10⁻⁶) = 1,34 × 10⁻³ M.\nLangkah 2: pH = -log [H⁺] = -log (1,34 × 10⁻³) = 3 - log 1,34 = 3 - 0,13 = 2,87.\nBandingkan dengan HCl 0,1 M yang memiliki pH = 1,00.',
    },
    checkpoint: {
      question: 'Dua larutan asam lemah HX (Ka = 1 × 10⁻⁴) dan HY (Ka = 1 × 10⁻⁶) masing-masing berkonsentrasi 0,01 M. Pernyataan yang benar adalah ….',
      options: [
        'HX lebih kuat daripada HY, sehingga pH larutan HX lebih rendah daripada HY',
        'HY lebih kuat karena pangkat Ka lebih negatif',
        'Keduanya memiliki pH yang sama karena konsentrasinya sama 0,01 M',
        'HX memiliki konsentrasi ion OH⁻ lebih banyak dibanding HY',
      ],
      correct: 0,
      feedback: 'Tepat! Ka HX lebih besar (10⁻⁴ > 10⁻⁶), sehingga menghasilkan [H⁺] lebih besar dan pH lebih rendah.',
    },
  },
  {
    id: 'derajat-ionisasi',
    order: 9,
    title: '9. Derajat Ionisasi (α)',
    summary: 'Rasio fraksi molekul yang terdisosiasi dan hubungannya dengan hukum pengenceran Ostwald.',
    triplet: {
      macroscopic: 'Ketika larutan asam cuka pekat diencerkan secara bertahap dengan air, persentase disosiasi ioniknya justru meningkat secara terukur.',
      submicroscopic: 'Pengenceran menambah volume pelarut dan menurunkan probabilitas ion-ion untuk bertumbukan kembali membentuk molekul netral (Asas Le Chatelier).',
      symbolic: 'α = (mol terionisasi) / (mol mula-mula)\nα = √(Ka / Ma)\n[H⁺] = α × Ma',
    },
    equations: [
      'α = √(Ka / Ma)  (Hukum Pengenceran Ostwald)',
      '[H⁺] = α · Ma',
      'Persentase Ionisasi = α × 100%',
    ],
    formulas: [
      { label: 'Elektrolit Kuat', text: 'α = 1 (atau 100%)' },
      { label: 'Elektrolit Lemah', text: '0 < α < 1 (umumnya < 5%)' },
      { label: 'Pengaruh Pengenceran', text: 'Jika Ma turun (diencerkan), maka nilai α bertambah besar.' },
    ],
    explanation:
      'Derajat ionisasi (α) menyatakan perbandingan antara jumlah zat yang mengion dengan jumlah zat mula-mula. Nilai α berkisar antara 0 hingga 1. Menurut Hukum Pengenceran Ostwald, pengenceran larutan asam lemah akan memperbesar nilai derajat ionisasinya, meskipun konsentrasi ion H⁺ per satuan volume larutan tetap menurun secara keseluruhan.',
    example: {
      problem: 'Hitung derajat ionisasi (α) dari larutan asam format HCOOH 0,04 M jika diketahui Ka = 1,6 × 10⁻⁴!',
      solution:
        'Langkah 1: α = √(Ka / Ma) = √(1,6 × 10⁻⁴ / 0,04) = √(4,0 × 10⁻³) = √(40 × 10⁻⁴) = 6,32 × 10⁻² = 0,0632.\nLangkah 2: Dalam persentase, α = 6,32% (artinya sekitar 6 dari 100 molekul terionisasi).',
    },
    checkpoint: {
      question: 'Jika suatu asam lemah diencerkan dengan menambahkan air murni, apa yang terjadi pada derajat ionisasi (α) dan nilai Ka?',
      options: [
        'Nilai α bertambah besar, sedangkan Ka tetap konstan (karena suhu tetap)',
        'Nilai α dan Ka sama-sama bertambah besar',
        'Nilai α mengecil karena molekul asam berkurang',
        'Nilai Ka berkurang secara linier',
      ],
      correct: 0,
      feedback: 'Tepat! Derajat ionisasi bertambah saat pengenceran (Hukum Ostwald), sedangkan Ka adalah tetapan yang hanya berubah jika suhu berubah.',
    },
  },
  {
    id: 'indikator-asam-basa',
    order: 10,
    title: '10. Indikator Asam-Basa & Trayek Perubahan Warna',
    summary: 'Mekanisme kerja asam lemah organik berwarna (HIn), trayek pH indikator, dan indikator universal.',
    triplet: {
      macroscopic: 'Beberapa tetes fenolftalein ditambahkan ke larutan asam tetap tak berwarna, namun ketika ditetesi NaOH hingga titik ekuivalen seketika timbul warna merah muda persisten.',
      submicroscopic: 'Indikator (HIn) berada dalam kesetimbangan disosiasi: bentuk tak terionisasi (HIn) memiliki warna berbeda dari bentuk anion terkonjugasinya (In⁻) akibat perubahan struktur cincin benzena.',
      symbolic: 'HIn(aq) ⇌ H⁺(aq) + In⁻(aq)\n(Warna 1)           (Warna 2)\nTrayek pH = pKa ± 1',
    },
    equations: [
      'HIn(aq) ⇌ H⁺(aq) + In⁻(aq)',
      'Lakmus: Trayek pH 4,5 – 8,3 (Merah → Biru)',
      'Metil Merah: Trayek pH 4,4 – 6,2 (Merah → Kuning)',
      'Bromtimol Biru (BTB): Trayek pH 6,0 – 7,6 (Kuning → Biru)',
      'Fenolftalein (PP): Trayek pH 8,3 – 10,0 (Tak Berwarna → Merah Muda)',
    ],
    formulas: [
      { label: 'Pemilihan Indikator', text: 'Indikator harus memiliki trayek pH yang memotong kurva titrasi pada titik infleksi / ekuivalen.' },
    ],
    explanation:
      'Indikator asam-basa adalah asam atau basa organik lemah yang memiliki warna berbeda antara bentuk molekul asam (HIn) dan bentuk anion basanya (In⁻). Perubahan warna terjadi secara bertahap pada rentang sekitar 2 satuan pH yang disebut trayek pH indikator. Dengan mengombinasikan beberapa indikator pada rentang berbeda, kita dapat memperkirakan nilai pH suatu larutan secara akurat.',
    example: {
      problem: 'Suatu larutan diuji dengan indikator: Metil Merah menghasilkan warna kuning (pH > 6,2), Bromtimol Biru menghasilkan warna biru (pH > 7,6), dan Fenolftalein tak berwarna (pH < 8,3). Perkirakan rentang pH larutan tersebut!',
      solution:
        '- Metil Merah kuning: pH ≥ 6,2\n- BTB biru: pH ≥ 7,6\n- PP tak berwarna: pH ≤ 8,3\nIrisan rentang ketiganya adalah: 7,6 ≤ pH ≤ 8,3 (larutan bersifat basa lemah).',
    },
    checkpoint: {
      question: 'Indikator fenolftalein (PP) memiliki trayek pH 8,3 – 10,0. Jika diteteskan ke dalam larutan CH₃COOH 0,1 M (pH ≈ 2,9), warna larutan akan menjadi ….',
      options: ['Tak berwarna', 'Merah muda pekat', 'Kuning emas', 'Biru tua'],
      correct: 0,
      feedback: 'Tepat! Pada pH 2,9 (berada di bawah 8,3), indikator fenolftalein berada dalam bentuk asamnya yang tak berwarna.',
    },
  },
  {
    id: 'reaksi-netralisasi',
    order: 11,
    title: '11. Reaksi Netralisasi Asam-Basa',
    summary: 'Penggabungan ion H⁺ dan OH⁻ membentuk molekul air serta pembentukan garam dan efek termal reaksi.',
    triplet: {
      macroscopic: 'Ketika larutan HCl dan NaOH dicampurkan, terjadi pelepasan kalor (tabung reaksi terasa hangat) dan campuran berubah sifat menjadi tidak lagi merusak kertas lakmus.',
      submicroscopic: 'Ion H⁺ (atau H₃O⁺) bereaksi secara stoikiometris dengan ion OH⁻ membentuk molekul kovalen H₂O yang sangat stabil, sementara ion Na⁺ dan Cl⁻ tetap bebas sebagai ion penonton (spectator ions).',
      symbolic: 'Persamaan Molekuler: HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)\nPersamaan Ion Bersih: H⁺(aq) + OH⁻(aq) → H₂O(l)   ΔH° = -57,3 kJ/mol',
    },
    equations: [
      'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
      'H⁺(aq) + OH⁻(aq) → H₂O(l)  (Persamaan ion bersih)',
      '2HNO₃(aq) + Ca(OH)₂(aq) → Ca(NO₃)₂(aq) + 2H₂O(l)',
    ],
    formulas: [
      { label: 'Mol H⁺ Ekivalen', text: 'n(H⁺) = Va × Ma × a' },
      { label: 'Mol OH⁻ Ekivalen', text: 'n(OH⁻) = Vb × Mb × b' },
      { label: 'Kondisi Netral', text: 'n(H⁺) = n(OH⁻)' },
    ],
    explanation:
      'Reaksi netralisasi adalah reaksi antara asam dan basa yang menghasilkan garam dan air. Reaksi ion bersih untuk semua reaksi asam kuat dan basa kuat adalah identik: H⁺(aq) + OH⁻(aq) → H₂O(l). Reaksi ini bersifat eksotermik dengan entalpi netralisasi standar sekitar -57,3 kJ/mol air yang terbentuk. Jika jumlah mol ion H⁺ dan OH⁻ seimbang, larutan akan mencapai titik netral.',
    example: {
      problem: 'Sebanyak 50 mL larutan HCl 0,2 M dicampurkan dengan 50 mL larutan NaOH 0,1 M. Tentukan apakah campuran tersebut bersifat asam, basa, atau netral, serta hitung pH campurannya!',
      solution:
        'Langkah 1: Hitung mol:\n- mol H⁺ = 50 mL × 0,2 M = 10 mmol\n- mol OH⁻ = 50 mL × 0,1 M = 5 mmol\nLangkah 2: Reaksi netralisasi:\nH⁺ bereaksi dengan OH⁻ menyisakan sisa H⁺ = 10 - 5 = 5 mmol.\nLangkah 3: Volume total = 50 + 50 = 100 mL.\nKonsentrasi sisa [H⁺] = 5 mmol / 100 mL = 0,05 M = 5 × 10⁻² M.\npH = -log (5 × 10⁻²) = 2 - log 5 = 2 - 0,70 = 1,30 (Campuran bersifat Asam).',
    },
    checkpoint: {
      question: 'Persamaan ion bersih untuk reaksi antara larutan asam klorida (HCl) dan kalium hidroksida (KOH) adalah ….',
      options: [
        'H⁺(aq) + OH⁻(aq) → H₂O(l)',
        'K⁺(aq) + Cl⁻(aq) → KCl(s)',
        'HCl(aq) + KOH(aq) → KCl(aq) + H₂O(l)',
        'H⁺(aq) + Cl⁻(aq) → HCl(g)',
      ],
      correct: 0,
      feedback: 'Tepat! Ion K⁺ dan Cl⁻ adalah ion penonton, sehingga persamaan ion bersihnya adalah H⁺(aq) + OH⁻(aq) → H₂O(l).',
    },
  },
  {
    id: 'stoikiometri-titrasi',
    order: 12,
    title: '12. Stoikiometri Titrasi Asam-Basa',
    summary: 'Metode analisis volumetris kuantitatif, kurva titrasi, penentuan titik ekuivalen dan titik akhir.',
    triplet: {
      macroscopic: 'Buret berisi larutan penitrasi (titran) diteteskan perlahan ke labu Erlenmeyer berisi analit dengan bantuan pengadukan magnetik hingga terjadi perubahan warna permanen pertama.',
      submicroscopic: 'Pada titik ekuivalen, seluruh ion H⁺ dari analit telah habis bereaksi tepat dengan ion OH⁻ dari titran dalam perbandingan mol stoikiometris 1:1.',
      symbolic: 'Va × Ma × a = Vb × Mb × b\n(Titik Ekuivalen: mol ekivalen asam = mol ekivalen basa)',
    },
    equations: [
      'Va · Ma · a = Vb · Mb · b',
      'Ma = (Vb · Mb · b) / (Va · a)',
    ],
    formulas: [
      { label: 'Titik Ekuivalen', text: 'Titik saat asam dan basa tepat habis bereaksi secara stoikiometris.' },
      { label: 'Titik Akhir Titrasi', text: 'Titik saat indikator berubah warna dan penambahan titran dihentikan.' },
      { label: 'Syarat Akurasi', text: 'Selisih antara titik ekuivalen dan titik akhir harus sekecil mungkin.' },
    ],
    explanation:
      'Titrasi asam-basa adalah teknik analitik untuk menentukan konsentrasi larutan asam atau basa yang belum diketahui dengan mereaksikannya secara bertahap dengan larutan standar (larutan yang telah diketahui konsentrasinya secara pasti). Kurva titrasi menggambarkan perubahan nilai pH larutan terhadap volume titran yang ditambahkan. Pada titrasi asam kuat dengan basa kuat, titik ekuivalen terjadi tepat pada pH 7,0.',
    example: {
      problem: 'Sebanyak 25 mL larutan cuka CH₃COOH dititrasi dengan larutan baku NaOH 0,1 M menggunakan indikator fenolftalein. Titik akhir titrasi tercapai saat volume NaOH terpakai rata-rata 20 mL. Hitung molaritas larutan cuka tersebut!',
      solution:
        'Gunakan rumus ekivalen:\nVa × Ma × a = Vb × Mb × b\n25 mL × Ma × 1 = 20 mL × 0,1 M × 1\n25 × Ma = 2,0\nMa = 2,0 / 25 = 0,08 M.\nKonsentrasi asam asetat dalam cuka adalah 0,08 M.',
    },
    checkpoint: {
      question: 'Perbedaan mendasar antara titik ekuivalen dan titik akhir titrasi adalah ….',
      options: [
        'Titik ekuivalen tercapai saat mol asam dan basa tepat habis bereaksi, sedangkan titik akhir adalah saat indikator berubah warna',
        'Titik ekuivalen selalu terjadi pada pH 0',
        'Titik akhir titrasi terjadi sebelum titrasi dimulai',
        'Keduanya merupakan istilah yang persis sama tanpa perbedaan teknis',
      ],
      correct: 0,
      feedback: 'Benar! Titik ekuivalen adalah kondisi teoretis kesetaraan mol, sedangkan titik akhir adalah pengamatan visual perubahan warna indikator.',
    },
  },
];

// =============================================================================
// TAHAP 4: ELABORATE (STUDI KASUS LIMBAH CAIR INDUSTRI TAHU & HOTS)
// =============================================================================
export const elaborateData = {
  stageId: 'elaborate',
  title: 'Tahap 4: Elaborate (Aplikasi Masalah Kontekstual & HOTS)',
  subtitle: 'Studi Kasus Lingkungan: Pengelolaan & Netralisasi Limbah Cair Industri Tahu',
  
  caseStudy: {
    title: 'Dilema Limbah Cair Industri Tahu Tradisional Desa Sukamaju',
    overview:
      'Industri tahu rumahan di Desa Sukamaju memproduksi rata-rata 5.000 liter limbah cair (whey tahu) setiap harinya. Limbah cair ini dihasilkan dari proses penggumpalan protein sari kedelai menggunakan bibit asam (asam asetat). Karena tidak memiliki instalasi pengolahan air limbah (IPAL), cairan sisa langsung dibuang ke Sungai Melati.',
    characteristics: [
      { param: 'Debit Limbah Harian', value: '5.000 Liter / hari' },
      { param: 'Derajat Keasaman (pH)', value: 'pH = 4,00 (Asam Kuat/Sedang)' },
      { param: 'Konsentrasi Ion H⁺ Terlarut', value: '[H⁺] = 1,0 × 10⁻⁴ M' },
      { param: 'Suhu Limbah', value: '38 °C – 42 °C (Hangat)' },
      { param: 'BOD / COD', value: 'Sangat Tinggi (Organik Terfermentasi)' },
      { param: 'Baku Mutu Lingkungan (Permen LHK)', value: 'Wajib berada pada pH 6,0 – 9,0 sebelum dibuang' },
    ],
    ecologicalImpact:
      'pH 4,00 menyebabkan air Sungai Melati mengalami penurunan drastis kualitas air. Ikan mati lemas, cangkang moluska melarut, dan aktivitas bakteri anaerob menimbulkan bau busuk menyengat yang dikeluhkan warga sekitar.',
    neutralizingReagent: {
      name: 'Kalsium Hidroksida / Kapur Tohor [Ca(OH)₂]',
      formula: 'Ca(OH)₂',
      valence: 2,
      mr: 74,
      purity: '80% Teknis',
      advantage: 'Harga ekonomis, mudah didapat warga, dan ion Ca²⁺ membantu proses koagulasi flok protein sisa.',
      reaction: '2H⁺(aq) + Ca(OH)₂(s) → Ca²⁺(aq) + 2H₂O(l)',
    },
  },

  // Pertanyaan Analisis & Evaluasi Solusi (HOTS)
  analyticalQuestions: [
    {
      id: 'hots-q1',
      number: 1,
      title: 'Analisis Dampak Kimia-Ekologis',
      prompt:
        'Berdasarkan data studi kasus, pH limbah tahu terukur 4,00. Analisis mengapa pH tersebut mematikan bagi kehidupan ikan dan mikroorganisme sungai jika batas toleransi ekosistem air tawar adalah pH 6,5–8,5. Hubungkan dengan ion H⁺ dan membran sel organisme!',
      modelAnswer:
        'Pada pH 4,00, konsentrasi ion H⁺ adalah 10⁻⁴ M, yaitu 100 hingga 1000 kali lebih pekat dibanding kondisi air sungai normal (pH 6–7). Kelebihan ion H⁺ merusak mukosa insang ikan, mengganggu transportasi ion Na⁺ dan Cl⁻ pada membran seluler (osmoregulasi gagal), serta mendenaturasi enzim pernapasan biota air.',
    },
    {
      id: 'hots-q2',
      number: 2,
      title: 'Kalkulasi Stoikiometri Netralisasi Kimia',
      prompt:
        'Hitunglah massa kapur tohor Ca(OH)₂ murni (Mr = 74 g/mol, valensi b = 2) yang secara teoretis dibutuhkan untuk menetralkan 5.000 liter limbah cair tahu (pH = 4,00) hingga mencapai pH netral 7,00 (asumsikan seluruh keasaman disebabkan ion H⁺ bebas)!',
      stepGuide:
        'Langkah perhitungan:\n1. Hitung mol H⁺ dalam 5.000 L: n(H⁺) = V × [H⁺] = 5.000 L × 10⁻⁴ mol/L = 0,5 mol H⁺.\n2. Reaksi: 2H⁺ + Ca(OH)₂ → Ca²⁺ + 2H₂O. Maka mol Ca(OH)₂ = 0,5 / 2 = 0,25 mol.\n3. Massa Ca(OH)₂ = mol × Mr = 0,25 mol × 74 g/mol = 18,5 gram.\n(Catatan: Pada kondisi riil dengan kapasitas penyangga asam organik, dibutuhkan dosis berlebih sekitar 0,5–1 kg kapur per m³ limbah).',
    },
    {
      id: 'hots-q3',
      number: 3,
      title: 'Perancangan Konsep Solusi Terpadu (IPAL Sederhana)',
      prompt:
        'Rancanglah alur pengolahan limbah sederhana (3 tahapan sistematis) yang realistis diterapkan oleh pengrajin tahu desa tanpa biaya mahal agar air buangan memenuhi standar baku mutu lingkungan!',
      modelAnswer:
        '1. Bak Ekualisasi & Pendinginan: Menampung limbah agar suhu turun ke suhu kamar dan debit stabil.\n2. Bak Netralisasi & Koagulasi: Penambahan suspensi air kapur Ca(OH)₂ terukur dengan pengadukan hingga pH mencapai 7,0–7,5 serta pengendapan lumpur protein.\n3. Kolam Aerasi & Biofiltrasi: Mengalirkan air bersih netral melalui tanaman eceng gondok atau aerator sebelum dilepas ke sungai.',
    },
  ],
};

