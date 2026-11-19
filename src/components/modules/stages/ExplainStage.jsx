import { useState } from 'react';
import { explainTopics } from '../../../data/learningCycleData';
import ResetStageButton from './ResetStageButton';

/**
 * Tahap 3: EXPLAIN (Penjelasan Konsep Ilmiah Komprehensif)
 * Menyajikan 12 topik asam-basa sistematis:
 * - Representasi Triplet Kimia (Makroskopik, Submikroskopik, Simbolik)
 * - Persamaan reaksi kimia dengan notasi IUPAC baku (subskrip/superskip)
 * - Rumus matematis terstruktur
 * - Contoh soal kontekstual dan pembahasan bertahap
 * - Latihan pemahaman singkat (Checkpoint) interaktif dengan feedback langsung
 * - Sidebar navigasi 12 topik yang mudah ditelusuri
 * 
 * @param {{
 *   savedData?: object,
 *   onCompleteStage: (stageId: string, payload: object) => void,
 *   onNext: () => void,
 *   onNotify?: (message: string) => void,
 * }} props
 */
export default function ExplainStage({
  savedData = {},
  onCompleteStage,
  onNext,
  onNotify = () => {},
}) {
  const [activeTopicId, setActiveTopicId] = useState(savedData.activeTopic || 'konsep-dasar');
  const [completedTopicIds, setCompletedTopicIds] = useState(savedData.completedTopics || []);
  const [checkpointAnswers, setCheckpointAnswers] = useState({});

  const currentTopic = explainTopics.find((t) => t.id === activeTopicId) || explainTopics[0];

  const handleSelectTopic = (topicId) => {
    setActiveTopicId(topicId);
    // Tandai topik ini dipelajari
    if (!completedTopicIds.includes(topicId)) {
      setCompletedTopicIds((prev) => [...prev, topicId]);
    }
  };

  const handleCheckpointSelect = (topicId, optionIdx) => {
    setCheckpointAnswers((prev) => ({
      ...prev,
      [topicId]: optionIdx,
    }));
  };

  const handleFinishExplain = () => {
    onCompleteStage('explain', {
      completed: true,
      completedTopics: completedTopicIds.length > 0 ? completedTopicIds : explainTopics.map((t) => t.id),
      activeTopic: activeTopicId,
    });
    onNext();
  };

  return (
    <div className="explain-stage-content">
      {/* 1. Header Pengantar Explain */}
      <div className="stage-intro-header">
        <div className="stage-pill-tag">
          <span>📚 SINTAKS 5E • TAHAP 3 DARI 5</span>
        </div>
        <h2 className="stage-intro-title">Tahap 3: Explain (Penjelasan Konsep Ilmiah)</h2>
        <p className="stage-intro-desc">
          Pelajari 12 submateri pokok kimia asam-basa secara sistematis melalui integrasi representasi
          makroskopik, submikroskopik partikulat, dan persamaan simbolik standar IUPAC.
        </p>
      </div>

      {/* 2. Grid Layout: Sidebar 12 Submateri vs Konten Ilmiah Detail */}
      <div className="explain-layout-grid">
        {/* Sidebar Navigasi 12 Topik */}
        <aside className="topics-sidebar-nav" aria-label="Daftar 12 Topik Asam Basa">
          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--um-muted)', textTransform: 'uppercase', marginBottom: '6px', paddingLeft: '8px' }}>
            Daftar 12 Submateri Pokok:
          </span>

          {explainTopics.map((top) => {
            const isActive = top.id === activeTopicId;
            const isRead = completedTopicIds.includes(top.id);

            return (
              <button
                key={top.id}
                type="button"
                className={`sidebar-topic-item ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectTopic(top.id)}
              >
                <span>{top.title}</span>
                {isRead && <span style={{ color: 'var(--um-info)', fontSize: '12px' }}>✓</span>}
              </button>
            );
          })}
        </aside>

        {/* Panel Konten Materi Ilmiah yang Dipilih */}
        <article className="explain-content-card" aria-labelledby="topic-main-heading">
          {/* Header Topik Aktif */}
          <div className="section-title-wrap" style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--um-blue)', textTransform: 'uppercase' }}>
              Submateri {currentTopic.order} dari 12
            </span>
            <h3 id="topic-main-heading" className="dash-section-title" style={{ fontSize: '24px', marginTop: '4px' }}>
              {currentTopic.title}
            </h3>
            <p className="dash-section-desc">{currentTopic.summary}</p>
          </div>

          {/* Penjelasan Konsep Inti */}
          <div style={{ fontSize: '14.5px', lineHeight: '1.7', color: 'var(--um-text-muted-strong)', marginBottom: '20px' }}>
            <p>{currentTopic.explanation}</p>
          </div>

          {/* 3. Tiga Tingkat Representasi Kimia (Triplet Representation) */}
          <div className="triplet-grid" role="region" aria-label="Representasi Triplet Kimia">
            <div className="triplet-box macro">
              <span className="triplet-tag">👁️ Tingkat Makroskopik</span>
              <p className="triplet-text">{currentTopic.triplet.macroscopic}</p>
            </div>

            <div className="triplet-box submicro">
              <span className="triplet-tag">🔬 Tingkat Submikroskopik</span>
              <p className="triplet-text">{currentTopic.triplet.submicroscopic}</p>
            </div>

            <div className="triplet-box symbolic">
              <span className="triplet-tag">🔣 Tingkat Simbolik</span>
              <p className="triplet-text">{currentTopic.triplet.symbolic}</p>
            </div>
          </div>

          {/* Persamaan Reaksi Kimia IUPAC */}
          {currentTopic.equations && currentTopic.equations.length > 0 && (
            <div className="equations-strip">
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--um-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Persamaan Reaksi Kimia Terkait:
              </span>
              {currentTopic.equations.map((eq, i) => (
                <code key={i} className="equation-line">
                  {eq}
                </code>
              ))}
            </div>
          )}

          {/* Rumus Matematis / Kaidah */}
          {currentTopic.formulas && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', margin: '18px 0' }}>
              {currentTopic.formulas.map((f, i) => (
                <div key={i} style={{ background: 'var(--um-bg-tint)', border: '1px solid var(--um-border-soft)', borderRadius: '10px', padding: '12px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--um-blue)', fontWeight: '700', textTransform: 'uppercase' }}>
                    {f.label}
                  </span>
                  <code style={{ display: 'block', color: 'var(--um-ink)', fontSize: '13px', marginTop: '4px', fontWeight: '600' }}>
                    {f.text}
                  </code>
                </div>
              ))}
            </div>
          )}

          {/* Contoh Soal dan Pembahasan Bertahap */}
          {currentTopic.example && (
            <div className="example-box">
              <h4 className="example-title">💡 Contoh Soal & Langkah Perhitungan</h4>
              <p className="example-problem">{currentTopic.example.problem}</p>
              <div className="example-solution">{currentTopic.example.solution}</div>
            </div>
          )}

          {/* Checkpoint Pemahaman Singkat */}
          {currentTopic.checkpoint && (
            <div className="prediction-card" style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ background: 'var(--um-bg-tint)', color: 'var(--um-blue)', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
                  CHECKPOINT KOGNITIF
                </span>
                <span style={{ fontSize: '13px', color: 'var(--um-muted)' }}>Uji Pemahaman Cepat</span>
              </div>

              <p className="pred-q-text">{currentTopic.checkpoint.question}</p>

              <div className="pred-options-group">
                {currentTopic.checkpoint.options.map((optText, optIdx) => {
                  const selectedIdx = checkpointAnswers[currentTopic.id];
                  const isSelected = selectedIdx === optIdx;
                  const isCorrect = optIdx === currentTopic.checkpoint.correct;
                  const showFeedback = selectedIdx !== undefined;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      className={`pred-opt-btn ${isSelected ? 'selected' : ''} ${
                        showFeedback && isCorrect ? 'correct-highlight' : ''
                      }`}
                      onClick={() => handleCheckpointSelect(currentTopic.id, optIdx)}
                    >
                      <strong style={{ minWidth: '20px' }}>
                        {String.fromCharCode(65 + optIdx)}.
                      </strong>
                      <span>{optText}</span>
                    </button>
                  );
                })}
              </div>

              {checkpointAnswers[currentTopic.id] !== undefined && (
                <div className="pred-feedback-box">
                  <strong>Ulasan:</strong> {currentTopic.checkpoint.feedback}
                </div>
              )}
            </div>
          )}

          {/* Navigasi Antar Topik (Sebelumnya / Selanjutnya) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', paddingTop: '18px', borderTop: '1px solid var(--um-border-soft)' }}>
            <button
              type="button"
              className="btn-dash-secondary"
              disabled={currentTopic.order === 1}
              onClick={() => {
                const prev = explainTopics[currentTopic.order - 2];
                if (prev) handleSelectTopic(prev.id);
              }}
              style={{ opacity: currentTopic.order === 1 ? 0.4 : 1 }}
            >
              <span>&larr; Topik Sebelumnya</span>
            </button>

            {currentTopic.order < 12 ? (
              <button
                type="button"
                className="btn-dash-primary"
                onClick={() => {
                  const nextTop = explainTopics[currentTopic.order];
                  if (nextTop) handleSelectTopic(nextTop.id);
                }}
              >
                <span>Lanjut: Topik 0{currentTopic.order + 1} &rarr;</span>
              </button>
            ) : (
              <button
                type="button"
                id="btn-complete-explain"
                className="btn-dash-primary"
                onClick={handleFinishExplain}
              >
                <span>Tuntaskan Explain & Lanjut ke Elaborate (Studi Kasus) &rarr;</span>
              </button>
            )}
          </div>
        </article>

        <div className="stage-reset-row">
          <ResetStageButton
            stageId="explain"
            onReset={() => {
              setActiveTopicId('konsep-dasar');
              setCompletedTopicIds([]);
              setCheckpointAnswers({});
            }}
            onNotify={onNotify}
          />
        </div>
      </div>
    </div>
  );
}

