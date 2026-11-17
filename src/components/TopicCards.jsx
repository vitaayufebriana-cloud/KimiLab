import { useState } from 'react';
import { modulesData } from '../data/modulesData';
import ModuleReaderModal from './modules/ModuleReaderModal';

/**
 * Komponen TopicCards menampilkan SATU kartu modul fokus:
 * Modul 1: Larutan Asam dan Basa
 * @param {{ progress: Record<string, number>, onUpdateProgress: (moduleId: string, percent: number) => void }} props
 */
export default function TopicCards({ progress = {}, onUpdateProgress, onOpen5EStage }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('apersepsi');

  // Ambil data modul 'asam-basa'
  const asamBasaModul = modulesData.find((m) => m.id === 'asam-basa') || modulesData[0] || modulesData[2];
  const modProgress = progress['asam-basa'] || 0;
  const isDone = modProgress >= 100;

  // State untuk Simulator pH Interaktif di dalam kartu
  const [selectedPhIndex, setSelectedPhIndex] = useState(3); // Default: Air Murni pH 7

  const phExamples = [
    { ph: 1, name: 'HCl 0,1 M (Asam Lambung)', type: 'Asam Kuat', color: '#ef4444', hConc: '10⁻¹ M', lakmus: 'Merah / Merah', pp: 'Tak Berwarna' },
    { ph: 3, name: 'Asam Cuka (CH₃COOH)', type: 'Asam Lemah', color: '#f97316', hConc: '10⁻³ M', lakmus: 'Merah / Merah', pp: 'Tak Berwarna' },
    { ph: 5, name: 'Kopi Hitam / Air Hujan', type: 'Asam Lemah', color: '#eab308', hConc: '10⁻⁵ M', lakmus: 'Merah / Merah', pp: 'Tak Berwarna' },
    { ph: 7, name: 'Air Murni (H₂O Netral)', type: 'Netral', color: '#10b981', hConc: '10⁻⁷ M', lakmus: 'Merah / Biru', pp: 'Tak Berwarna' },
    { ph: 9, name: 'Baking Soda (NaHCO₃)', type: 'Basa Lemah', color: '#06b6d4', hConc: '10⁻⁹ M', lakmus: 'Biru / Biru', pp: 'Merah Muda Pudar' },
    { ph: 11, name: 'Air Sabun Pembersih', type: 'Basa Lemah', color: '#3b82f6', hConc: '10⁻¹¹ M', lakmus: 'Biru / Biru', pp: 'Merah Muda' },
    { ph: 13, name: 'NaOH 0,1 M (Pemutih)', type: 'Basa Kuat', color: '#8b5cf6', hConc: '10⁻¹³ M', lakmus: 'Biru / Biru', pp: 'Merah Pekat / Magenta' },
  ];

  const currentPh = phExamples[selectedPhIndex];

  const handleToggleDone = () => {
    if (isDone) {
      onUpdateProgress('asam-basa', 0);
    } else {
      onUpdateProgress('asam-basa', 100);
    }
  };

  const handleOpenModule = (tab = 'apersepsi') => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const handleSubtopicToggle = (index, total) => {
    const stepWeight = 100 / total;
    const threshold = Math.round((index + 1) * stepWeight);
    const newProgress = modProgress >= threshold
      ? Math.max(0, Math.round(index * stepWeight))
      : threshold;
    onUpdateProgress('asam-basa', newProgress);
  };

  return (
    <section id="modul-belajar" className="topics-section" aria-labelledby="topics-heading">
      <div className="section-header-centered">
        <div className="section-pill-tag">
          <span>🧪 Modul Pembelajaran Sains Kimia SMA</span>
        </div>
        <h2 id="topics-heading" className="section-title">
          Kartu Modul: Larutan Asam-Basa
        </h2>
        <p className="section-subtitle">
          Eksplorasi konsep teori asam-basa, kalkulasi derajat keasaman pH logaritmik, simulasi indikator warna,
          dan stoikiometri titrasi netralisasi secara interaktif.
        </p>
      </div>

      {/* Tampilan SATU KARTU Fokus: Larutan Asam-Basa */}
      <div className="single-card-wrapper">
        <article
          id="card-topic-asam-basa"
          className={`topic-card topic-card-featured ${isDone ? 'card-completed' : ''}`}
          style={{
            '--card-accent': asamBasaModul.accentColor,
            '--card-accent-bg': asamBasaModul.accentLight,
            '--card-accent-border': asamBasaModul.accentBorder,
          }}
        >
          {/* Card Top Meta */}
          <div className="card-top-bar">
            <span className="card-order-badge">MODUL 01 • FOKUS BELAJAR</span>
            <span className="card-category-text">{asamBasaModul.category}</span>
            <span className="card-grade-tag">{asamBasaModul.grade}</span>
          </div>

          {/* Card Header */}
          <div className="card-header-main">
            <h3 className="card-title">{asamBasaModul.fullTitle}</h3>
            <p className="card-tagline">{asamBasaModul.tagline}</p>
          </div>

          {/* Formula Highlight Box */}
          <div className="card-formula-box">
            <span className="formula-box-label">{asamBasaModul.coreFormula.label}</span>
            <div className="formula-box-main">
              <code>{asamBasaModul.coreFormula.main}</code>
            </div>
            <div className="formula-box-sub">
              <code>{asamBasaModul.coreFormula.sub}</code>
            </div>
          </div>

          {/* SIMULATOR pH & INDIKATOR INTERAKTIF */}
          <div className="ph-simulator-container">
            <div className="ph-simulator-header">
              <span className="ph-sim-tag">🔬 SIMULATOR pH & INDIKATOR WARNA</span>
              <span className="ph-sim-current" style={{ color: currentPh.color }}>
                pH: <strong>{currentPh.ph}</strong> ({currentPh.type})
              </span>
            </div>

            <div className="ph-sample-name">
              <span>Sampel Zat: <strong>{currentPh.name}</strong></span>
            </div>

            {/* pH Meter Buttons Spectrum */}
            <div className="ph-spectrum-bar" role="group" aria-label="Pilih derajat pH sampel">
              {phExamples.map((item, idx) => (
                <button
                  key={item.ph}
                  id={`ph-btn-${item.ph}`}
                  type="button"
                  className={`ph-meter-step ${selectedPhIndex === idx ? 'active' : ''}`}
                  style={{
                    backgroundColor: item.color,
                    boxShadow: selectedPhIndex === idx ? `0 0 12px ${item.color}` : 'none',
                  }}
                  onClick={() => setSelectedPhIndex(idx)}
                  title={`${item.name} (pH ${item.ph})`}
                  aria-pressed={selectedPhIndex === idx}
                >
                  <span className="ph-step-number">{item.ph}</span>
                </button>
              ))}
            </div>

            {/* Live Indicator Details Box */}
            <div className="ph-indicator-readout">
              <div className="readout-col">
                <span className="readout-label">Konsentrasi [H⁺]:</span>
                <code className="readout-val" style={{ color: currentPh.color }}>{currentPh.hConc}</code>
              </div>
              <div className="readout-col">
                <span className="readout-label">Lakmus (Merah/Biru):</span>
                <span className="readout-val-text">{currentPh.lakmus}</span>
              </div>
              <div className="readout-col">
                <span className="readout-label">Fenolftalein (PP):</span>
                <span className="readout-val-text">{currentPh.pp}</span>
              </div>
            </div>
          </div>

          {/* Subtopics Checklist Preview */}
          <div className="card-subtopics-list">
            <div className="subtopics-list-title">4 Sub-Topik Pembelajaran Inti:</div>
            <ul>
              {asamBasaModul.subtopics.map((sub, idx) => {
                const isSubDone = modProgress >= Math.round(((idx + 1) / asamBasaModul.subtopics.length) * 100);
                return (
                  <li key={sub.id} className={`subtopic-item ${isSubDone ? 'completed' : ''}`}>
                    <span className="subtopic-bullet" aria-hidden="true">
                      {isSubDone ? '✓' : idx + 1}
                    </span>
                    <div className="subtopic-text">
                      <strong>{sub.name}</strong>
                      <span className="subtopic-desc">{sub.desc}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Chemical Reaction Strip */}
          <div className="card-reaction-strip">
            <span className="reaction-strip-label">Persamaan Kimia Netralisasi:</span>
            <code className="reaction-strip-code">{asamBasaModul.sampleReaction.equation}</code>
            <p className="reaction-strip-note">{asamBasaModul.sampleReaction.note}</p>
          </div>

          {/* Card Footer: Metadata & Actions */}
          <div className="card-footer">
            <div className="card-progress-section">
              <div className="progress-info-row">
                <span className="progress-status-label">
                  {isDone ? '🎉 Selesai Tuntas' : modProgress > 0 ? 'Sedang Dipelajari' : 'Belum Dimulai'}
                </span>
                <span className="progress-percent-value">{modProgress}%</span>
              </div>
              <div className="progress-track" role="progressbar" aria-valuenow={modProgress} aria-valuemin="0" aria-valuemax="100">
                <div
                  className="progress-fill"
                  style={{
                    width: `${modProgress}%`,
                    backgroundColor: asamBasaModul.accentColor,
                  }}
                ></div>
              </div>
            </div>

            <div className="card-meta-chips">
              <span className="meta-chip">⏱️ Estimasi: {asamBasaModul.duration}</span>
              <span className="meta-chip">📊 Tingkat: {asamBasaModul.difficulty}</span>
              <span className="meta-chip">💾 Tersimpan di Browser</span>
            </div>

            {/* Quick Apersepsi & Objectives Callout Banner */}
            <div className="card-engage-preview-strip">
              <div className="engage-preview-left">
                <span className="engage-preview-icon" aria-hidden="true">💡</span>
                <div className="engage-preview-text">
                  <strong>Apersepsi Kontekstual:</strong> Mengapa ada zat yang terasa asam (lemon) dan ada yang licin (sabun)?
                </div>
              </div>
              <button
                type="button"
                className="btn-card-engage-preview"
                onClick={() => handleOpenModule('apersepsi')}
              >
                Lihat Apersepsi &rarr;
              </button>
            </div>

            <div className="card-buttons-group">
              {onOpen5EStage && (
                <button
                  type="button"
                  id="btn-open-5e-from-card"
                  className="btn-card-primary"
                  onClick={() => onOpen5EStage('engage')}
                  style={{ background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)', boxShadow: '0 4px 18px rgba(6, 182, 212, 0.4)' }}
                >
                  <span>🚀 Mulai Belajar Sintaks 5E</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              )}

              <button
                id="btn-open-module-asam-basa"
                type="button"
                className="btn-card-primary"
                onClick={() => handleOpenModule('apersepsi')}
              >
                <span>Buka Materi Modul Lengkap</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>

              <button
                id="btn-quick-tujuan-asam-basa"
                type="button"
                className="btn-card-secondary-engage"
                onClick={() => handleOpenModule('tujuan')}
                title="Buka 6 Capaian Tujuan Pembelajaran"
              >
                <span>🎯 Tujuan Pembelajaran (6)</span>
              </button>

              <a
                href="#kuis-asam-basa"
                id="btn-card-goto-quiz"
                className="btn-card-quiz-link"
                title="Buka Evaluasi Kuis Asam-Basa (10 Soal)"
              >
                <span>📝 Kuis (10 Soal)</span>
              </a>

              <button
                id="btn-toggle-done-asam-basa"
                type="button"
                className={`btn-card-toggle ${isDone ? 'btn-active-done' : ''}`}
                onClick={handleToggleDone}
                title={isDone ? 'Batalkan status tuntas' : 'Tandai modul sudah dipelajari 100%'}
              >
                {isDone ? 'Batalkan Tuntas' : 'Tandai Selesai'}
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Interactive Detail Modal Reader */}
      <ModuleReaderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        activeTab={modalTab}
        onTabChange={setModalTab}
        modProgress={modProgress}
        onSubtopicToggle={handleSubtopicToggle}
        subtopics={asamBasaModul.subtopics}
        sampleReaction={asamBasaModul.sampleReaction}
        accentColor={asamBasaModul.accentColor}
      />
    </section>
  );
}
