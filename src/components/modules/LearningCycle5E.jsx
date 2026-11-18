import { useState, useEffect, useCallback } from 'react';
import EngageStage from './stages/EngageStage';
import ExploreStage from './stages/ExploreStage';
import ExplainStage from './stages/ExplainStage';
import ElaborateStage from './stages/ElaborateStage';
import EvaluateStage from './stages/EvaluateStage';
import {
  get5EProgress,
  save5EStageProgress,
  calculate5EPercentage,
} from '../../utils/learningHelper';
import './LearningCycle5E.css';

const STAGE_KEYS = ['engage', 'explore', 'explain', 'elaborate', 'evaluate'];

const STAGE_METAS = {
  engage: { name: 'Engage', title: '1. Menggugah Minat', icon: '💡' },
  explore: { name: 'Explore', title: '2. Eksplorasi Lab', icon: '🔬' },
  explain: { name: 'Explain', title: '3. Penjelasan Konsep', icon: '📚' },
  elaborate: { name: 'Elaborate', title: '4. Aplikasi Kasus', icon: '🧪' },
  evaluate: { name: 'Evaluate', title: '5. Kuis Evaluasi', icon: '📝' },
};

/**
 * Controller Utama Modul Pembelajaran Learning Cycle 5E
 * Mengatur alur: ENGAGE -> EXPLORE -> EXPLAIN -> ELABORATE -> EVALUATE
 * 
 * @param {{
 *   initialStage?: 'engage' | 'explore' | 'explain' | 'elaborate' | 'evaluate',
 *   onBackToDashboard: () => void,
 *   onNotify: (msg: string) => void,
 * }} props
 */
export default function LearningCycle5E({
  initialStage = 'engage',
  onBackToDashboard,
  onNotify = () => {},
}) {
  const [currentStage, setCurrentStage] = useState(initialStage);
  const [progress5E, setProgress5E] = useState(() => get5EProgress());

  // Sinkronisasi data progres
  const reload5E = useCallback(() => {
    setProgress5E(get5EProgress());
  }, []);

  useEffect(() => {
    window.addEventListener('kimilab_5e_updated', reload5E);
    return () => window.removeEventListener('kimilab_5e_updated', reload5E);
  }, [reload5E]);

  const currentIndex = STAGE_KEYS.indexOf(currentStage);
  const totalPercent = calculate5EPercentage(progress5E);

  // Navigasi ke tahap berikutnya
  const handleNextStage = () => {
    if (currentIndex < STAGE_KEYS.length - 1) {
      const nextKey = STAGE_KEYS[currentIndex + 1];
      setCurrentStage(nextKey);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBackToDashboard();
    }
  };

  // Navigasi ke tahap sebelumnya
  const handlePrevStage = () => {
    if (currentIndex > 0) {
      const prevKey = STAGE_KEYS[currentIndex - 1];
      setCurrentStage(prevKey);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Callback saat suatu tahap diselesaikan
  const handleCompleteStage = (stageId, payload) => {
    const updated = save5EStageProgress(stageId, payload);
    setProgress5E(updated);
    const stageTitle = STAGE_METAS[stageId]?.name || stageId;
    onNotify(`🎉 Berhasil menyelesaikan tahap ${stageTitle}! Progres diperbarui ke ${calculate5EPercentage(updated)}%`);
  };

  // Tombol Simpan Progres Manual
  const handleManualSaveProgress = () => {
    save5EStageProgress(currentStage, { completed: true });
    onNotify(`💾 Progres belajar tahap ${STAGE_METAS[currentStage]?.name} berhasil disimpan di localStorage.`);
  };

  return (
    <div className="learning-5e-wrapper">
      {/* 1. Sticky Header Navigasi 5E */}
      <header className="stage-nav-header">
        <div className="stage-nav-container">
          <div className="stage-nav-left">
            <button
              type="button"
              id="btn-nav-back-to-dash"
              className="btn-back-dashboard"
              onClick={onBackToDashboard}
              title="Kembali ke Dashboard Utama"
            >
              <span aria-hidden="true">&larr;</span>
              <span>Beranda</span>
            </button>

            <div className="stage-title-info">
              <h2>Modul 1: Larutan Asam-Basa (Learning Cycle 5E)</h2>
              <span>
                Tahap {currentIndex + 1} dari 5: {STAGE_METAS[currentStage]?.name} • Progres: {totalPercent}%
              </span>
            </div>
          </div>

          {/* Stepper Buttons 5E */}
          <nav className="stage-stepper-bar" aria-label="Alur Sintaks 5E">
            {STAGE_KEYS.map((key) => {
              const meta = STAGE_METAS[key];
              const isActive = key === currentStage;
              const isCompleted = progress5E?.[key]?.completed;

              return (
                <button
                  key={key}
                  type="button"
                  id={`btn-step-${key}`}
                  className={`stepper-btn ${isActive ? 'active' : ''} ${
                    isCompleted ? 'completed' : ''
                  }`}
                  onClick={() => {
                    setCurrentStage(key);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span aria-hidden="true">{meta.icon}</span>
                  <span>{meta.name}</span>
                  {isCompleted && (
                    <span className="stepper-check-icon" aria-label="Selesai">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Baris Progress Track */}
        <div className="stage-progress-track" role="progressbar" aria-valuenow={totalPercent} aria-valuemin="0" aria-valuemax="100">
          <div className="stage-progress-fill" style={{ width: `${totalPercent}%` }}></div>
        </div>
      </header>

      {/* 2. Badan Konten Tahap Aktif */}
      <main className="stage-body-container" id="main-stage-content">
        {currentStage === 'engage' && (
          <EngageStage
            savedData={progress5E.engage}
            onCompleteStage={handleCompleteStage}
            onNext={handleNextStage}
            onNotify={onNotify}
          />
        )}

        {currentStage === 'explore' && (
          <ExploreStage
            savedData={progress5E.explore}
            onCompleteStage={handleCompleteStage}
            onNext={handleNextStage}
            onNotify={onNotify}
          />
        )}

        {currentStage === 'explain' && (
          <ExplainStage
            savedData={progress5E.explain}
            onCompleteStage={handleCompleteStage}
            onNext={handleNextStage}
            onNotify={onNotify}
          />
        )}

        {currentStage === 'elaborate' && (
          <ElaborateStage
            savedData={progress5E.elaborate}
            onCompleteStage={handleCompleteStage}
            onNext={handleNextStage}
            onNotify={onNotify}
          />
        )}

        {currentStage === 'evaluate' && (
          <EvaluateStage
            onCompleteStage={handleCompleteStage}
            onBackToDashboard={onBackToDashboard}
            onNotify={onNotify}
          />
        )}
      </main>

      {/* 3. Floating Bottom Toolbar Navigasi */}
      <footer className="stage-footer-toolbar" aria-label="Navigasi Tahap Pembelajaran">
        <div className="stage-footer-container">
          <div className="stage-footer-left">
            <button
              type="button"
              id="btn-footer-prev-stage"
              className="btn-nav-stage btn-nav-prev"
              onClick={handlePrevStage}
              disabled={currentIndex === 0}
            >
              <span aria-hidden="true">&larr;</span>
              <span>Tahap Sebelumnya</span>
            </button>

            <button
              type="button"
              id="btn-footer-save-progress"
              className="btn-save-progress"
              onClick={handleManualSaveProgress}
            >
              <span>💾 Simpan Progres</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn-nav-stage btn-nav-prev"
              onClick={onBackToDashboard}
            >
              <span>Kembali ke Beranda</span>
            </button>

            {currentIndex < STAGE_KEYS.length - 1 ? (
              <button
                type="button"
                id="btn-footer-next-stage"
                className="btn-nav-stage btn-nav-next"
                onClick={handleNextStage}
              >
                <span>Tahap Selanjutnya ({STAGE_METAS[STAGE_KEYS[currentIndex + 1]]?.name})</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <button
                type="button"
                id="btn-footer-finish"
                className="btn-nav-stage btn-nav-next"
                onClick={onBackToDashboard}
              >
                <span>Tuntaskan & Ke Beranda</span>
                <span aria-hidden="true">🏁</span>
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

