import { useState } from 'react';
import { elaborateData } from '../../../data/learningCycleData';
import ResetStageButton from './ResetStageButton';

/**
 * Tahap 4: ELABORATE (Aplikasi Permasalahan Kontekstual & HOTS)
 * Studi Kasus Nyata: "Pengelolaan & Netralisasi Limbah Cair Industri Tahu"
 * 
 * Aktivitas Siswa:
 * 1. Membaca studi kasus kontekstual & parameter kimia limbah tahu
 * 2. Menganalisis dampak ekologis kelebihan ion H⁺ terhadap biota sungai
 * 3. Menghitung kebutuhan stoikiometri zat penetral basa Ca(OH)₂ (kapur tohor)
 * 4. Merancang konsep sistem IPAL mini sederhana 3 tahap
 * 5. Menuliskan argumentasi ilmiah pada kolom jawaban siswa yang tersimpan di localStorage
 * 
 * @param {{
 *   savedData?: object,
 *   onCompleteStage: (stageId: string, payload: object) => void,
 *   onNext: () => void,
 *   onNotify?: (message: string) => void,
 * }} props
 */
export default function ElaborateStage({
  savedData = {},
  onCompleteStage,
  onNext,
  onNotify = () => {},
}) {
  const [answers, setAnswers] = useState(savedData.studentAnswers || {});
  const [solutionNotes, setSolutionNotes] = useState(savedData.solutionNotes || '');
  const [isSaved, setIsSaved] = useState(Boolean(savedData.completed));

  const { caseStudy, analyticalQuestions } = elaborateData;

  const handleAnswerChange = (qId, text) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: text,
    }));
  };

  const handleSaveAndProceed = () => {
    setIsSaved(true);
    onCompleteStage('elaborate', {
      completed: true,
      studentAnswers: answers,
      solutionNotes,
    });
    onNext();
  };

  return (
    <div className="elaborate-stage-content">
      {/* 1. Header Pengantar Elaborate */}
      <div className="stage-intro-header">
        <div className="stage-pill-tag">
          <span>🧪 SINTAKS 5E • TAHAP 4 DARI 5</span>
        </div>
        <h2 className="stage-intro-title">{elaborateData.title}</h2>
        <p className="stage-intro-desc">{elaborateData.subtitle}</p>
      </div>

      {/* 2. Kartu Studi Kasus Lingkungan: Limbah Cair Pabrik Tahu */}
      <section className="case-study-hero" aria-label="Bahan Bacaan Kasus">
        <div className="section-title-wrap">
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            📖 ARTIKEL STUDI KASUS KIMIA LINGKUNGAN
          </span>
          <h3 className="dash-main-title" style={{ fontSize: '24px', marginTop: '6px' }}>
            {caseStudy.title}
          </h3>
          <p className="dash-subtitle" style={{ color: '#cbd5e1', marginTop: '8px' }}>
            {caseStudy.overview}
          </p>
        </div>

        {/* Tabel Parameter Karakteristik Limbah */}
        <div className="case-params-grid">
          {caseStudy.characteristics.map((c, i) => (
            <div key={i} className="case-param-chip">
              <span className="case-param-name">{c.param}</span>
              <span className="case-param-val">{c.value}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderLeft: '3px solid #ef4444', borderRadius: '0 10px 10px 0', padding: '14px 16px', marginTop: '16px' }}>
          <strong style={{ color: '#f87171', fontSize: '13px', display: 'block', marginBottom: '4px' }}>
            ⚠️ Dampak Ekologis Pembuangan Tanpa Pengolahan:
          </strong>
          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.55' }}>
            {caseStudy.ecologicalImpact}
          </p>
        </div>

        {/* Informasi Zat Penetral Reaktif */}
        <div style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '12px', padding: '16px', marginTop: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase' }}>
            Reagen Penetral Terpilih: {caseStudy.neutralizingReagent.name}
          </span>
          <code style={{ display: 'block', color: '#f8fafc', fontSize: '14px', margin: '6px 0', fontWeight: '700' }}>
            {caseStudy.neutralizingReagent.reaction}
          </code>
          <p style={{ fontSize: '12.5px', color: '#94a3b8' }}>
            Karakteristik: Valensi basa b = {caseStudy.neutralizingReagent.valence}, Mr = {caseStudy.neutralizingReagent.mr} g/mol. {caseStudy.neutralizingReagent.advantage}
          </p>
        </div>
      </section>

      {/* 3. Lembar Kerja HOTS Analisis Siswa */}
      <section className="prediction-section" aria-label="Pertanyaan Analisis HOTS">
        <div className="section-title-wrap" style={{ marginBottom: '20px' }}>
          <h3 className="dash-section-title">Lembar Kerja Analisis Kritis (HOTS)</h3>
          <p className="dash-section-desc">
            Selesaikan tantangan analitis berikut dan tuliskan hasil pemikiran ilmiahmu pada kolom yang disediakan.
          </p>
        </div>

        {analyticalQuestions.map((q) => (
          <div key={q.id} className="hots-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
                HOTS LEVEL {q.number}
              </span>
              <h4 style={{ fontSize: '15px', color: '#f8fafc', fontWeight: '700' }}>
                {q.title}
              </h4>
            </div>

            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.55', marginBottom: '8px' }}>
              {q.prompt}
            </p>

            {q.stepGuide && (
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', color: '#94a3b8', whiteSpace: 'pre-line', marginBottom: '8px' }}>
                {q.stepGuide}
              </div>
            )}

            <textarea
              id={`hots-input-${q.id}`}
              className="hots-textarea"
              placeholder="Ketikkan analisis ilmiah dan perhitunganmu di sini..."
              value={answers[q.id] || ''}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            />

            {isSaved && q.modelAnswer && (
              <div className="pred-feedback-box" style={{ marginTop: '12px' }}>
                <strong>🎯 Rekomendasi Solusi Ilmiah:</strong> {q.modelAnswer}
              </div>
            )}
          </div>
        ))}

        {/* Refleksi Desain IPAL Sederhana */}
        <div className="hots-card">
          <h4 style={{ fontSize: '15px', color: '#38bdf8', fontWeight: '700', marginBottom: '8px' }}>
            💡 Rangkuman Rekomendasi Solusi untuk Pengrajin Tahu
          </h4>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '10px' }}>
            Tuliskan pesan atau saran teknis sederhana yang dapat dipahami masyarakat pengrajin tahu agar sungai tetap lestari:
          </p>
          <textarea
            className="hots-textarea"
            style={{ minHeight: '80px' }}
            placeholder="Contoh: Pembuatan bak pengendapan bertingkat dan penambahan air kapur setiap sore hari..."
            value={solutionNotes}
            onChange={(e) => setSolutionNotes(e.target.value)}
          />
        </div>

        {/* Tombol Simpan & Selesai */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button
            type="button"
            id="btn-complete-elaborate"
            className="btn-dash-primary"
            onClick={handleSaveAndProceed}
          >
            <span>Simpan Argumentasi & Masuk ke Evaluate (Kuis C4–C5)</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        <div className="stage-reset-row">
          <ResetStageButton
            stageId="elaborate"
            onReset={() => {
              setAnswers({});
              setSolutionNotes('');
              setIsSaved(false);
            }}
            onNotify={onNotify}
          />
        </div>
      </section>
    </div>
  );
}

