/**
 * HeroSection.jsx - Halaman Hero Minimalis KimiLab
 * Sesuai Permintaan Redesign:
 * - Badge: INTERACTIVE CHEMISTRY LEARNING
 * - Judul: 'Jelajahi Dunia Kimia Melalui Pembelajaran Interaktif'
 * - Subjudul: 'Larutan Asam-Basa'
 * - Deskripsi tentang pendekatan Learning Cycle 5E
 * - Satu tombol utama 'Mulai Belajar Sekarang' mengarah ke tahap Engage
 * - Tiga informasi ringkas di bawahnya:
 *   1. Eksplorasi Konsep Kimia
 *   2. Eksperimen Laboratorium Virtual
 *   3. Evaluasi Pemahaman
 * - Dark theme navy, cyan, turquoise
 * - Dihapus: panel Skala Derajat pH, tombol Buka Kartu Modul, tombol Masuk/Akun di hero
 * 
 * @param {{
 *   onStartLearning?: () => void,
 *   onOpenStage?: (stageId: string) => void,
 * }} props
 */
export default function HeroSection({ onStartLearning, onOpenStage }) {
  const handleStart = () => {
    if (onStartLearning) {
      onStartLearning();
    } else if (onOpenStage) {
      onOpenStage('engage');
    }
  };

  const handleCardClick = (stageId) => {
    if (onOpenStage) {
      onOpenStage(stageId);
    } else if (onStartLearning) {
      onStartLearning();
    }
  };

  return (
    <section id="hero" className="hero-minimal-section" aria-labelledby="hero-main-title">
      {/* Latar Belakang Digital Glow */}
      <div className="hero-glow-cyan" aria-hidden="true"></div>
      <div className="hero-glow-turquoise" aria-hidden="true"></div>

      <div className="hero-minimal-container">
        {/* 1. Badge INTERACTIVE CHEMISTRY LEARNING */}
        <div className="hero-badge-pill">
          <span className="hero-badge-icon" aria-hidden="true">⚛️</span>
          <span>INTERACTIVE CHEMISTRY LEARNING</span>
        </div>

        {/* 2. Subjudul: Larutan Asam-Basa */}
        <div className="hero-subtitle-tag">
          <span>MATERI KIMIA KELAS XI SMA • LARUTAN ASAM-BASA</span>
        </div>

        {/* 3. Judul Utama: Jelajahi Dunia Kimia Melalui Pembelajaran Interaktif */}
        <h1 id="hero-main-title" className="hero-minimal-title">
          Jelajahi Dunia Kimia Melalui{' '}
          <span className="hero-title-gradient">Pembelajaran Interaktif</span>
        </h1>

        {/* 4. Deskripsi tentang Learning Cycle 5E */}
        <p className="hero-minimal-desc">
          Tingkatkan pemahaman kimia materi <strong>Larutan Asam-Basa</strong> melalui pendekatan sistematis{' '}
          <strong>Learning Cycle 5E</strong> (<em>Engage, Explore, Explain, Elaborate, Evaluate</em>). Dirancang khusus untuk
          membantu siswa SMA kelas XI menguasai teori asam-basa, perhitungan skala pH logaritmik, simulasi laboratorium virtual,
          hingga aplikasi kontekstual pemecahan masalah lingkungan.
        </p>

        {/* 5. Satu Tombol Utama: Mulai Belajar Sekarang (Mengarah ke Tahap Engage) */}
        <div className="hero-single-cta-wrap">
          <button
            id="hero-start-btn"
            type="button"
            className="btn-hero-primary-glow"
            onClick={handleStart}
            title="Mulai pembelajaran dari tahap Engage"
          >
            <span>Mulai Belajar Sekarang</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* 6. Tiga Informasi Ringkas di Bawah Hero */}
        <div className="hero-three-info-grid" role="region" aria-label="Tiga Pilar Pembelajaran KimiLab">
          {/* Info 1: Eksplorasi Konsep Kimia */}
          <div
            className="hero-info-card"
            onClick={() => handleCardClick('explain')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleCardClick('explain');
            }}
            title="Klik untuk membuka Penjelasan Konsep Kimia (Tahap Explain)"
          >
            <div className="info-icon-box icon-cyan">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                <path d="M6 6h10"></path>
                <path d="M6 10h10"></path>
              </svg>
            </div>
            <div className="info-card-text">
              <h3 className="info-card-title">Eksplorasi Konsep Kimia</h3>
              <p className="info-card-desc">
                Pahami teori Arrhenius, Brønsted-Lowry, Lewis, kesetimbangan ionisasi air ($\text{Kw}$), dan rumus perhitungan $\text{pH}$ secara terstruktur lewat representasi makroskopik, submikroskopik, dan simbolik.
              </p>
              <span className="info-card-link">Pelajari Teori Konsep &rarr;</span>
            </div>
          </div>

          {/* Info 2: Eksperimen Laboratorium Virtual */}
          <div
            className="hero-info-card"
            onClick={() => handleCardClick('explore')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleCardClick('explore');
            }}
            title="Klik untuk membuka Laboratorium Virtual (Tahap Explore)"
          >
            <div className="info-icon-box icon-turquoise">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.31L4.2 20.2a1 1 0 0 0 .8 1.8h14a1 1 0 0 0 .8-1.8L14 9.31V2"></path>
                <path d="M8.5 2h7"></path>
                <path d="M7 16h10"></path>
              </svg>
            </div>
            <div className="info-card-text">
              <h3 className="info-card-title">Eksperimen Laboratorium Virtual</h3>
              <p className="info-card-desc">
                Uji interaktif beragam larutan asam dan basa, ubah konsentrasi molaritas, amati spektrum perubahan warna indikator, serta uji daya hantar listrik elektrolit secara langsung.
              </p>
              <span className="info-card-link">Buka Lab Virtual &rarr;</span>
            </div>
          </div>

          {/* Info 3: Evaluasi Pemahaman */}
          <div
            className="hero-info-card"
            onClick={() => handleCardClick('evaluate')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleCardClick('evaluate');
            }}
            title="Klik untuk membuka Evaluasi Kuis (Tahap Evaluate)"
          >
            <div className="info-icon-box icon-blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <div className="info-card-text">
              <h3 className="info-card-title">Evaluasi Pemahaman</h3>
              <p className="info-card-desc">
                Ukur capaian penguasaan materi melalui kuis analitis tingkat tinggi (C4–C5) dengan pembekuan jawaban, skor otomatis, dan akses pembahasan ilmiah komprehensif.
              </p>
              <span className="info-card-link">Uji Pemahaman Kuis &rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
