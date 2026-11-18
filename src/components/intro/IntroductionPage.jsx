import './IntroductionPage.css';

/**
 * IntroductionPage.jsx - Halaman perkenalan (introduction) KimiLab.
 * Menjadi konten utama Beranda: tanpa materi & kuis interaktif.
 * - Hero besar: identitas KimiLab + CTA "Mulai Belajar Sekarang" (→ tahap Engage)
 * - Section "Tentang KimiLab": apa itu KimiLab, untuk siapa, dan cara kerjanya
 * - CTA sekunder: "Buka Panel Guru" (khusus role guru) / "Kenali KimiLab" (siswa)
 *
 * @param {{
 *   authUser?: object | null,
 *   onStartLearning?: () => void,
 *   onOpenPanelGuru?: () => void,
 * }} props
 */
export default function IntroductionPage({ authUser = null, onStartLearning, onOpenPanelGuru }) {
  const isGuru = authUser?.role === 'guru';

  const fiveEStages = [
    { tag: '1', name: 'Engage', desc: 'Menggugah minat lewat fenomena sehari-hari' },
    { tag: '2', name: 'Explore', desc: 'Bereksperimen di laboratorium virtual' },
    { tag: '3', name: 'Explain', desc: 'Mengonstruksi konsep ilmiah yang runtut' },
    { tag: '4', name: 'Elaborate', desc: 'Menerapkan pada kasus & masalah HOTS' },
    { tag: '5', name: 'Evaluate', desc: 'Mengukur pemahaman lewat evaluasi analitis' },
  ];

  return (
    <>
      {/* ===================== HERO INTRO ===================== */}
      <section className="intro-hero" aria-labelledby="intro-hero-title">
        <div className="intro-hero-glow intro-hero-glow-indigo" aria-hidden="true"></div>
        <div className="intro-hero-glow intro-hero-glow-cyan" aria-hidden="true"></div>

        <div className="intro-hero-container">
          <div className="intro-badge-pill">
            <span aria-hidden="true">🧪</span>
            <span>MEDIA PEMBELAJARAN KIMIA SMA</span>
          </div>

          <p className="intro-hero-eyebrow">
            Materi Kimia Kelas XI • Larutan Asam-Basa
          </p>

          <h1 id="intro-hero-title" className="intro-hero-title">
            Kimi<span className="intro-hero-accent">Lab</span> — Belajar Kimia Jadi{' '}
            <span className="intro-hero-gradient">Lebih Hidup</span>
          </h1>

          <p className="intro-hero-desc">
            Media pembelajaran interaktif untuk siswa SMA kelas XI yang mempelajari{' '}
            <strong>Larutan Asam-Basa</strong> melalui sintaks{' '}
            <strong>Learning Cycle 5E</strong> — dari mengaitkan fenomena nyata, bereksperimen di
            laboratorium virtual, mengonstruksi konsep ilmiah, hingga memecahkan masalah lingkungan.
          </p>

          <div className="intro-cta-row">
            <button
              type="button"
              className="btn-intro-primary"
              onClick={onStartLearning}
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

            {isGuru ? (
              <button
                type="button"
                className="btn-intro-secondary"
                onClick={onOpenPanelGuru}
                title="Buka Panel Pemantauan Guru"
              >
                <span>Buka Panel Guru</span>
              </button>
            ) : (
              <a className="btn-intro-secondary" href="#tentang-kimilab">
                <span>Kenali KimiLab</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </a>
            )}
          </div>

          <ul className="intro-trust-row" aria-label="Ciri utama KimiLab">
            <li><span aria-hidden="true">🔄</span> Learning Cycle 5E</li>
            <li><span aria-hidden="true">🎯</span> Evaluasi Analitis C4–C5</li>
            <li><span aria-hidden="true">💾</span> Local-First, Tanpa Wajib Daftar</li>
          </ul>
        </div>
      </section>

      {/* ===================== TENTANG KIMILAB ===================== */}
      <section id="tentang-kimilab" className="intro-about" aria-labelledby="intro-about-title">
        <div className="intro-about-container">
          <div className="intro-section-pill">
            <span>💡 Tentang KimiLab</span>
          </div>
          <h2 id="intro-about-title" className="intro-about-title">
            Apa itu KimiLab?
          </h2>
          <p className="intro-about-subtitle">
            KimiLab adalah media pembelajaran kimia SMA yang dirancang untuk membantu siswa
            memahami materi <strong>Larutan Asam-Basa</strong> secara mandiri, interaktif, dan
            bermakna — langsung dari browser, tanpa instalasi.
          </p>

          <div className="intro-about-grid">
            <div className="intro-about-card">
              <div className="intro-about-icon icon-cyan" aria-hidden="true">🎯</div>
              <h3>Untuk Siapa?</h3>
              <p>
                Siswa SMA kelas XI yang mempelajari kimia semester genap, khususnya materi
                larutan asam-basa dan derajat pH. Ikut membantu guru memantau perkembangan
                belajar siswa melalui Panel Guru.
              </p>
            </div>

            <div className="intro-about-card">
              <div className="intro-about-icon icon-indigo" aria-hidden="true">🔬</div>
              <h3>Laboratorium Virtual</h3>
              <p>
                Uji larutan, amati perubahan warna indikator, dan pahami daya hantar
                elektrolit lewat simulasi interaktif — belajar layaknya di lab sungguhan,
                langsung dari perangkat Anda.
              </p>
            </div>

            <div className="intro-about-card">
              <div className="intro-about-icon icon-emerald" aria-hidden="true">💾</div>
              <h3>Local-First &amp; Privat</h3>
              <p>
                Progres belajar tersimpan otomatis di browser Anda. Tidak wajib daftar untuk
                mulai belajar; sinkronisasi hasil ke akun hanya opsional lewat masuk dengan
                Google.
              </p>
            </div>

            <div className="intro-about-card">
              <div className="intro-about-icon icon-amber" aria-hidden="true">🏫</div>
              <h3>Dikembangkan oleh</h3>
              <p>
                Tim pengembang Departemen Kimia, Universitas Negeri Malang — menggabungkan
                pedagogi sains dan teknologi web modern (React) untuk pembelajaran kimia yang
                lebih baik.
              </p>
            </div>
          </div>

          {/* Learning Cycle 5E — ringkasan alur (teks, bukan konten materi) */}
          <div className="intro-5e-block" aria-label="Alur Learning Cycle 5E">
            <h3 className="intro-5e-title">Satu Alur, Lima Tahap: Learning Cycle 5E</h3>
            <ol className="intro-5e-steps">
              {fiveEStages.map((stage) => (
                <li key={stage.tag} className="intro-5e-step">
                  <span className="intro-5e-num">{stage.tag}</span>
                  <span className="intro-5e-name">{stage.name}</span>
                  <span className="intro-5e-desc">{stage.desc}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
