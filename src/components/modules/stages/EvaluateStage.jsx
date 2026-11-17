import QuizSection from '../../quiz/QuizSection';

/**
 * Tahap 5: EVALUATE (Evaluasi Kognitif Komprehensif Asam-Basa C4–C5)
 * PENTING SESUAI ATURAN ARSITEKTUR & PRD:
 * - Format, desain, dan sistem kuis yang sudah ada TIDAK DIUBAH!
 * - Menampung komponen QuizSection.jsx yang 100% berfungsi (10 soal C4-C5, mode single & list, submit & lock, pembahasan ilmiah terbuka).
 * - Memicu callback saat kuis dikerjakan agar status tahap 5 (Evaluate) tersimpan.
 * 
 * @param {{
 *   onCompleteStage: (stageId: string, payload: object) => void,
 *   onBackToDashboard: () => void,
 * }} props
 */
export default function EvaluateStage({
  onCompleteStage,
  onBackToDashboard,
}) {
  const handleQuizProgress = (_moduleId, percent) => {
    if (percent >= 100) {
      onCompleteStage('evaluate', {
        completed: true,
      });
    }
  };

  return (
    <div className="evaluate-stage-content">
      {/* Header Pengantar Tahap 5 Evaluate */}
      <div className="stage-intro-header">
        <div className="stage-pill-tag">
          <span>📝 SINTAKS 5E • TAHAP 5 DARI 5 (PUNCAK EVALUASI)</span>
        </div>
        <h2 className="stage-intro-title">Tahap 5: Evaluate (Kuis Evaluasi Komprehensif)</h2>
        <p className="stage-intro-desc">
          Uji penguasaan konsep, analisis reaksi, dan kalkulasi stoikiometrimu melalui 10 butir soal tingkat tinggi (C4–C5).
          Jawaban kamu akan dibekukan saat pengiriman, dan pembahasan ilmiah mendalam akan terbuka otomatis.
        </p>
      </div>

      {/* Komponen Kuis Interaktif Bawaan yang 100% Dipertahankan */}
      <div className="quiz-embed-wrapper">
        <QuizSection onUpdateProgress={handleQuizProgress} />
      </div>

      {/* Tombol Kembali ke Dashboard */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
        <button
          type="button"
          id="btn-evaluate-to-dashboard"
          className="btn-dash-primary"
          onClick={onBackToDashboard}
          style={{ padding: '14px 28px' }}
        >
          <span>🏁 Kembali ke Dashboard & Lihat Hasil Akhir Pembelajaran</span>
        </button>
      </div>
    </div>
  );
}

