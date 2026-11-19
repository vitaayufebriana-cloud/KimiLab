import { useState, useEffect } from 'react';
import ApersepsiSection from './ApersepsiSection';
import LearningObjectives from './LearningObjectives';
import { apersepsiData, learningObjectives, module1Info } from '../../data/chemData';

/**
 * Komponen Modal Pembaca Materi Lengkap Modul 1
 * Menyajikan Apersepsi (Engage), Tujuan Pembelajaran, dan Langkah Materi Terstruktur
 * 
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   initialTab?: 'all' | 'apersepsi' | 'tujuan' | 'materi',
 *   modProgress: number,
 *   onSubtopicToggle: (index: number, total: number) => void,
 *   subtopics: Array<{ id: string, name: string, desc: string }>,
 *   sampleReaction: { equation: string, note: string },
 *   accentColor?: string
 * }} props
 */
export default function ModuleReaderModal({
  isOpen,
  onClose,
  activeTab: controlledTab,
  onTabChange,
  initialTab = 'apersepsi',
  modProgress = 0,
  onSubtopicToggle,
  subtopics = [],
  sampleReaction = {
    equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
    note: 'Reaksi netralisasi antara asam kuat dan basa kuat menghasilkan garam netral dan molekul air.',
  },
  accentColor = 'var(--um-blue)',
}) {
  const [internalTab, setInternalTab] = useState(initialTab);
  const activeTab = controlledTab !== undefined ? controlledTab : internalTab;
  const setActiveTab = onTabChange || setInternalTab;

  // Tutup dengan Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-module-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-content-box modal-content-expanded"
        style={{ '--modal-accent': accentColor }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-badges-row">
              <span className="modal-subtitle">
                {module1Info.code} • {module1Info.category}
              </span>
              <span className="modal-badge-progres">Progres: {modProgress}%</span>
            </div>
            <h3 id="modal-module-title" className="modal-title">
              {module1Info.fullTitle}
            </h3>
          </div>

          <button
            id="btn-close-modal"
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup jendela materi"
          >
            ✕
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="modal-nav-tabs" role="tablist" aria-label="Navigasi bagian materi modul">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'apersepsi'}
            className={`modal-nav-tab ${activeTab === 'apersepsi' ? 'active' : ''}`}
            onClick={() => setActiveTab('apersepsi')}
          >
            <span className="tab-icon" aria-hidden="true">💡</span>
            <span>Apersepsi (Engage)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'tujuan'}
            className={`modal-nav-tab ${activeTab === 'tujuan' ? 'active' : ''}`}
            onClick={() => setActiveTab('tujuan')}
          >
            <span className="tab-icon" aria-hidden="true">🎯</span>
            <span>Tujuan Pembelajaran</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'materi'}
            className={`modal-nav-tab ${activeTab === 'materi' ? 'active' : ''}`}
            onClick={() => setActiveTab('materi')}
          >
            <span className="tab-icon" aria-hidden="true">📚</span>
            <span>Langkah & Reaksi</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'all'}
            className={`modal-nav-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <span className="tab-icon" aria-hidden="true">📖</span>
            <span>Semua Materi</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body modal-body-rich">
          {/* 1. BAGIAN APERSEPSI (ENGAGE) */}
          {(activeTab === 'apersepsi' || activeTab === 'all') && (
            <div className="modal-tab-panel">
              <ApersepsiSection
                data={apersepsiData}
                onProceedToObjectives={() => setActiveTab('tujuan')}
              />
            </div>
          )}

          {/* 2. BAGIAN TUJUAN PEMBELAJARAN */}
          {(activeTab === 'tujuan' || activeTab === 'all') && (
            <div className="modal-tab-panel">
              <LearningObjectives objectives={learningObjectives} />
            </div>
          )}

          {/* 3. BAGIAN LANGKAH MATERI & REAKSI KIMIA */}
          {(activeTab === 'materi' || activeTab === 'all') && (
            <div className="modal-tab-panel">
              <section className="modal-section">
                <div className="modal-section-header-flex">
                  <div>
                    <div className="section-pill-tag">
                      <span>📚 Alur Pembelajaran Terstruktur</span>
                    </div>
                    <h4 className="modal-section-heading">
                      Langkah Pembelajaran Inti (Klik untuk Simpan Progres)
                    </h4>
                    <p className="modal-section-subtext">
                      Tandai setiap topik yang telah dipelajari. Progres tersimpan otomatis di browser secara lokal.
                    </p>
                  </div>
                  <span className="modal-progress-counter">
                    Progres: {modProgress}%
                  </span>
                </div>

                <div className="interactive-subtopics-group">
                  {subtopics.map((sub, idx) => {
                    const total = subtopics.length || 4;
                    const threshold = Math.round(((idx + 1) / total) * 100);
                    const isChecked = modProgress >= threshold;

                    return (
                      <button
                        key={sub.id}
                        type="button"
                        className={`interactive-subtopic-btn ${isChecked ? 'checked' : ''}`}
                        onClick={() => onSubtopicToggle(idx, total)}
                      >
                        <span className="checkbox-visual" aria-hidden="true">
                          {isChecked ? '✓' : ''}
                        </span>
                        <div className="interactive-subtopic-info">
                          <span className="step-number">Langkah 0{idx + 1}</span>
                          <strong>{sub.name}</strong>
                          <span className="step-desc">{sub.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Reaksi Kimia & Penjelasan */}
              <section className="modal-section reaction-section-modal">
                <div className="section-pill-tag">
                  <span>🧪 Persamaan Kimia & Netralisasi</span>
                </div>
                <h4 className="modal-section-heading">Contoh Reaksi & Penjelasan Ilmiah</h4>
                <div className="modal-reaction-card">
                  <code>{sampleReaction.equation}</code>
                  <p>{sampleReaction.note}</p>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="modal-footer-storage-note">
            <span>💾 Tersimpan anonim di <code>localStorage</code></span>
          </div>

          <div className="modal-footer-actions">
            {activeTab === 'apersepsi' && (
              <button
                type="button"
                className="btn-tab-nav-next"
                onClick={() => setActiveTab('tujuan')}
              >
                <span>Lanjut: Tujuan Pembelajaran</span>
                <span aria-hidden="true">→</span>
              </button>
            )}

            {activeTab === 'tujuan' && (
              <button
                type="button"
                className="btn-tab-nav-next"
                onClick={() => setActiveTab('materi')}
              >
                <span>Lanjut: Langkah Materi</span>
                <span aria-hidden="true">→</span>
              </button>
            )}

            <a
              href="#kuis-asam-basa"
              className="btn-modal-to-quiz"
              onClick={onClose}
              title="Buka Kuis Asam Basa 10 Soal"
            >
              <span>📝 Uji Kuis (10 Soal)</span>
            </a>

            <button
              id="btn-modal-done"
              type="button"
              className="btn-primary-modal"
              onClick={onClose}
            >
              Tutup Materi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
