import { useState } from 'react';
import { engageData } from '../../../data/learningCycleData';

/**
 * Tahap 1: ENGAGE (Menggugah Minat & Pengetahuan Awal)
 * Menyajikan:
 * - Pengantar kontekstual materi asam dan basa
 * - 4 fenomena kehidupan sehari-hari (lemon vs cuka, sabun licin, indikator alami kunyit, limbah cair asam)
 * - Interaksi pertanyaan prediksi sebelum siswa mempelajari konsep
 * - Umpan balik ilmiah instan untuk memantik kognisi
 * - Tombol penyelesaian tahap Engage
 * 
 * @param {{
 *   savedData?: object,
 *   onCompleteStage: (stageId: string, payload: object) => void,
 *   onNext: () => void,
 * }} props
 */
export default function EngageStage({
  savedData = {},
  onCompleteStage,
  onNext,
}) {
  const [predictions, setPredictions] = useState(savedData.predictions || {});
  const [submitted, setSubmitted] = useState(Boolean(savedData.completed));

  const handleSelectPrediction = (qId, optionKey) => {
    setPredictions((prev) => ({
      ...prev,
      [qId]: optionKey,
    }));
  };

  const handleSaveAndProceed = () => {
    setSubmitted(true);
    onCompleteStage('engage', {
      completed: true,
      predictions,
    });
    onNext();
  };

  const allAnswered = engageData.predictionQuestions.every((q) => predictions[q.id]);

  return (
    <div className="engage-stage-content">
      {/* 1. Header Pengantar Tahap 1 */}
      <div className="stage-intro-header">
        <div className="stage-pill-tag">
          <span>💡 SINTAKS 5E • TAHAP 1 DARI 5</span>
        </div>
        <h2 className="stage-intro-title">{engageData.title}</h2>
        <p className="stage-intro-desc">{engageData.intro}</p>
      </div>

      {/* 2. Empat Kartu Fenomena Kontekstual Sehari-hari */}
      <div className="phenomena-cards-grid" role="region" aria-label="Fenomena Kimia Kontekstual">
        {engageData.phenomena.map((p) => (
          <div key={p.id} className="phenomenon-item-card">
            <div className="phenom-header">
              <span className="phenom-icon" aria-hidden="true">{p.icon}</span>
              <span className="phenom-category">{p.category}</span>
            </div>
            <h3 className="phenom-title">{p.title}</h3>
            <p className="phenom-desc">{p.description}</p>
            <div className="phenom-question-box">
              <strong>Pertanyaan Pemantik:</strong> {p.questionPrompt}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Pertanyaan Prediksi Interaktif Sebelum Mempelajari Konsep */}
      <section className="prediction-section" aria-label="Pertanyaan Prediksi Siswa">
        <div className="section-title-wrap" style={{ marginBottom: '18px' }}>
          <h3 className="dash-section-title">Uji Pengetahuan Awal & Prediksi Ilmiah</h3>
          <p className="dash-section-desc">
            Pilihlah jawaban menurut prediksimu sebelum melakukan eksplorasi di laboratorium virtual.
          </p>
        </div>

        {engageData.predictionQuestions.map((q, idx) => {
          const selectedKey = predictions[q.id];
          const isChosen = Boolean(selectedKey);

          return (
            <div key={q.id} className="prediction-card">
              <p className="pred-q-text">
                <strong>0{idx + 1}. </strong> {q.question}
              </p>

              <div className="pred-options-group" role="radiogroup">
                {q.options.map((opt) => {
                  const isSelected = selectedKey === opt.key;
                  const isCorrect = opt.key === q.correctKey;
                  const showHighlight = (submitted || isChosen) && isCorrect;

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`pred-opt-btn ${isSelected ? 'selected' : ''} ${
                        showHighlight ? 'correct-highlight' : ''
                      }`}
                      onClick={() => handleSelectPrediction(q.id, opt.key)}
                    >
                      <strong style={{ minWidth: '22px' }}>{opt.key}.</strong>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Umpan balik ilmiah instan jika sudah dijawab */}
              {isChosen && (
                <div className="pred-feedback-box" role="status">
                  <strong>💡 Ulasan Konseptual:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button
            type="button"
            id="btn-complete-engage"
            className="btn-dash-primary"
            onClick={handleSaveAndProceed}
            disabled={!allAnswered}
            style={{ opacity: allAnswered ? 1 : 0.6 }}
          >
            <span>Simpan Prediksi & Lanjut ke Explore (Lab Virtual)</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </section>
    </div>
  );
}

