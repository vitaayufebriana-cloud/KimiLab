import { useState } from 'react';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);

  const previewConcepts = [
    {
      title: 'Skala Derajat pH',
      accentColor: '#8b5cf6',
      formula: 'pH = -log [H⁺]',
      equation: '[H⁺][OH⁻] = Kw = 10⁻¹⁴ (25°C)',
      description: 'Skala logaritmik derajat keasaman larutan dari konsentrasi ion hidrogen terlarut.',
    },
    {
      title: 'Reaksi Netralisasi',
      accentColor: '#06b6d4',
      formula: 'Asam + Basa → Garam + H₂O',
      equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
      description: 'Pertukaran ion membentuk garam netral dan molekul air stabil dengan pH netral 7.',
    },
    {
      title: 'Stoikiometri Titrasi',
      accentColor: '#10b981',
      formula: 'Va · Ma · val_a = Vb · Mb · val_b',
      equation: 'n(H⁺ ekivalen) = n(OH⁻ ekivalen)',
      description: 'Penentuan konsentrasi analit tidak diketahui melalui volume titran tepat bereaksi.',
    },
  ];

  const current = previewConcepts[activeTab];

  const handleScrollToModules = () => {
    const section = document.getElementById('modul-belajar');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-container" aria-labelledby="hero-main-heading">
      <div className="hero-content">
        {/* Identity Badge */}
        <div className="hero-badge-pill">
          <span className="hero-badge-sparkle" aria-hidden="true">🧪</span>
          <span>Media Pembelajaran Kimia SMA Interaktif</span>
        </div>

        {/* H1 Main Heading */}
        <h1 id="hero-main-heading" className="hero-title">
          Kuasai Konsep <span className="hero-gradient-text">Larutan Asam-Basa</span> Secara Visual & Terstruktur
        </h1>

        {/* Subtitle */}
        <p className="hero-description">
          Pahami teori Arrhenius & Brønsted-Lowry, perhitungan logaritmik derajat keasaman <strong>pH = -log [H⁺]</strong>,
          perubahan warna indikator lakmus, hingga stoikiometri titrasi netralisasi tanpa hafalan buta.
        </p>

        {/* Call to Actions */}
        <div className="hero-cta-group">
          <button
            id="hero-start-btn"
            type="button"
            className="btn-primary-glow"
            onClick={handleScrollToModules}
          >
            <span>Mulai Belajar Sekarang</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>

          <a
            id="hero-explore-btn"
            href="#modul-belajar"
            className="btn-secondary-glass"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
              <path d="M6 6h10"></path>
              <path d="M6 10h10"></path>
            </svg>
            <span>Buka Kartu Modul</span>
          </a>
        </div>

        {/* Value Prop Highlights */}
        <div className="hero-stats-row">
          <div className="stat-item">
            <span className="stat-number">Kelas XI</span>
            <span className="stat-label">Kurikulum Sains SMA/MA</span>
          </div>
          <div className="stat-divider" aria-hidden="true"></div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Akses Instan Tanpa Login</span>
          </div>
          <div className="stat-divider" aria-hidden="true"></div>
          <div className="stat-item">
            <span className="stat-number">Lokal</span>
            <span className="stat-label">Progres Anonim di Browser</span>
          </div>
        </div>
      </div>

      {/* Interactive Chemistry Visual Card */}
      <aside className="hero-visual-card" aria-label="Pratinjau Rumus dan Reaksi Larutan Asam-Basa">
        <div className="visual-card-glow" style={{ background: current.accentColor }}></div>
        <div className="visual-card-inner">
          <div className="visual-card-header">
            <div className="visual-card-title-group">
              <span className="visual-card-tag">Laboratorium Interaktif</span>
              <h3 className="visual-card-topic">{current.title}</h3>
            </div>
            <div className="visual-card-dots" aria-hidden="true">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
          </div>

          {/* Formula Display Area */}
          <div className="visual-formula-display">
            <span className="formula-type-label">RUMUS MATEMATIS KIMIA:</span>
            <div className="formula-equation-code">
              <code>{current.formula}</code>
            </div>
          </div>

          {/* Reaction Equation Box */}
          <div className="visual-reaction-box">
            <div className="reaction-badge">Persamaan Reaksi & Notasi Baku:</div>
            <p className="reaction-equation-text">
              <code>{current.equation}</code>
            </p>
            <p className="reaction-meaning-text">{current.description}</p>
          </div>

          {/* Interactive Topic Selector Tabs */}
          <div className="visual-tabs-selector" role="tablist" aria-label="Pilih pratinjau konsep">
            {previewConcepts.map((item, idx) => (
              <button
                key={item.title}
                id={`hero-preview-tab-${idx}`}
                type="button"
                role="tab"
                aria-selected={activeTab === idx}
                className={`tab-item-btn ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
                style={{
                  borderColor: activeTab === idx ? item.accentColor : 'transparent',
                }}
              >
                <span
                  className="tab-color-indicator"
                  style={{ backgroundColor: item.accentColor }}
                  aria-hidden="true"
                ></span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
