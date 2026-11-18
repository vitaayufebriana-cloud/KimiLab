import { useState, useEffect } from 'react';
import {
  exploreSolutions,
  calculateSolutionProperties,
  exploreAnalysisQuestions,
} from '../../../data/learningCycleData';
import {
  getExploreObservations,
  addExploreObservation,
  deleteExploreObservation,
  clearExploreObservations,
} from '../../../utils/learningHelper';
import ResetStageButton from './ResetStageButton';

/**
 * Tahap 2: EXPLORE (Laboratorium Virtual Kimia Asam-Basa)
 * Siswa dapat:
 * 1. Memilih jenis larutan (asam kuat/lemah, basa kuat/lemah, netral, limbah tahu)
 * 2. Mengubah konsentrasi molar (0.001 M - 1.0 M)
 * 3. Mengamati nilai pH, pOH, [H+], [OH-], derajat ionisasi
 * 4. Mengamati perubahan warna indikator (Lakmus, PP, Metil Merah, BTB, Universal)
 * 5. Mengamati alat uji daya hantar listrik (lampu menyala terang, redup, atau mati)
 * 6. Menyimpan hasil uji ke Tabel Pengamatan Siswa
 * 7. Menjawab 3 pertanyaan analisis eksplorasi
 * 
 * @param {{
 *   savedData?: object,
 *   onCompleteStage: (stageId: string, payload: object) => void,
 *   onNext: () => void,
 *   onNotify?: (message: string) => void,
 * }} props
 */
export default function ExploreStage({
  savedData = {},
  onCompleteStage,
  onNext,
  onNotify = () => {},
}) {
  const [selectedSolutionId, setSelectedSolutionId] = useState('hcl');
  const [concentration, setConcentration] = useState(0.1);
  const [observations, setObservations] = useState(() => getExploreObservations());
  const [analysisAnswers, setAnalysisAnswers] = useState(savedData.analysisAnswers || {});
  const [showAnalysisKey, setShowAnalysisKey] = useState(Boolean(savedData.completed));

  // Ambil larutan aktif
  const currentSolution = exploreSolutions.find((s) => s.id === selectedSolutionId) || exploreSolutions[0];
  const props = calculateSolutionProperties(currentSolution, concentration);

  useEffect(() => {
    const handleObsUpdate = (e) => {
      setObservations(e.detail || getExploreObservations());
    };
    window.addEventListener('kimilab_observations_updated', handleObsUpdate);
    return () => window.removeEventListener('kimilab_observations_updated', handleObsUpdate);
  }, []);

  // Catat ke Tabel Pengamatan
  const handleSaveToTable = () => {
    addExploreObservation({
      solutionName: currentSolution.name,
      formula: currentSolution.formula,
      type: currentSolution.type,
      concentration: `${concentration} M`,
      ph: props.ph,
      poh: props.poh,
      lakmus: `M:${props.indicators.lakmusMerah} / B:${props.indicators.lakmusBiru}`,
      pp: props.indicators.pp,
      conductivity:
        currentSolution.lightIntensity === 'high'
          ? 'Terang (Kuat)'
          : currentSolution.lightIntensity === 'low'
          ? 'Redup (Lemah)'
          : 'Mati (Netral/Non)',
    });
  };

  const handleAnalysisChange = (qId, text) => {
    setAnalysisAnswers((prev) => ({
      ...prev,
      [qId]: text,
    }));
  };

  const handleCompleteExplore = () => {
    setShowAnalysisKey(true);
    onCompleteStage('explore', {
      completed: true,
      analysisAnswers,
    });
    onNext();
  };

  return (
    <div className="explore-stage-content">
      {/* 1. Header Pengantar Explore */}
      <div className="stage-intro-header">
        <div className="stage-pill-tag">
          <span>🔬 SINTAKS 5E • TAHAP 2 DARI 5</span>
        </div>
        <h2 className="stage-intro-title">Tahap 2: Explore (Laboratorium Virtual Asam-Basa)</h2>
        <p className="stage-intro-desc">
          Eksplorasi secara bebas perilaku larutan asam dan basa. Ubah konsentrasi, amati trayek indikator,
          uji daya hantar listrik, dan catat hasil analisismu ke dalam tabel pengamatan.
        </p>
      </div>

      {/* 2. Grid Laboratorium Virtual (Panel Kontrol vs Panel Tabung Reaksi) */}
      <div className="virtual-lab-grid">
        {/* Panel Kiri: Pengaturan Larutan & Konsentrasi */}
        <div className="lab-control-panel">
          <div className="section-title-wrap">
            <h3 className="dash-section-title" style={{ fontSize: '18px' }}>
              ⚙️ Pengaturan Sampel Larutan
            </h3>
            <span className="dash-section-desc">Pilih larutan kimia untuk diuji dalam bejana</span>
          </div>

          {/* Pemilih Larutan */}
          <div className="auth-input-group">
            <label htmlFor="solution-select" className="auth-input-label">
              Jenis Larutan Uji:
            </label>
            <select
              id="solution-select"
              className="auth-input-field auth-select"
              value={selectedSolutionId}
              onChange={(e) => setSelectedSolutionId(e.target.value)}
            >
              <optgroup label="Asam Kuat">
                <option value="hcl">HCl - Asam Klorida (Valensi 1)</option>
                <option value="h2so4">H₂SO₄ - Asam Sulfat (Valensi 2)</option>
              </optgroup>
              <optgroup label="Asam Lemah">
                <option value="ch3cooh">CH₃COOH - Asam Asetat / Cuka</option>
                <option value="lemon">C₆H₈O₇ - Jus Lemon (Asam Sitrat)</option>
                <option value="tofu-waste">Sampel Limbah Cair Pabrik Tahu (pH ≈ 4,2)</option>
              </optgroup>
              <optgroup label="Netral">
                <option value="h2o">H₂O - Air Murni Netral</option>
              </optgroup>
              <optgroup label="Basa Lemah">
                <option value="nh3">NH₃ - Larutan Amonia</option>
                <option value="soap-water">R-COONa - Air Sabun Pembersih</option>
              </optgroup>
              <optgroup label="Basa Kuat">
                <option value="naoh">NaOH - Natrium Hidroksida (Valensi 1)</option>
                <option value="baoh2">Ba(OH)₂ - Barium Hidroksida (Valensi 2)</option>
              </optgroup>
            </select>
          </div>

          {/* Slider Konsentrasi */}
          <div className="auth-input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label htmlFor="conc-slider" className="auth-input-label">
                Konsentrasi Molaritas (M):
              </label>
              <strong style={{ color: '#38bdf8', fontFamily: 'var(--font-mono, monospace)' }}>
                {concentration} M
              </strong>
            </div>
            <input
              id="conc-slider"
              type="range"
              min="0.001"
              max="1.0"
              step="0.005"
              value={concentration}
              onChange={(e) => setConcentration(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#0284c7', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
              <span>0,001 M (Sangat Encer)</span>
              <span>0,1 M (Standar)</span>
              <span>1,0 M (Pekat)</span>
            </div>
          </div>

          {/* Persamaan Reaksi Disosiasi */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>
              Persamaan Ionisasi:
            </span>
            <code style={{ display: 'block', color: '#38bdf8', marginTop: '4px', fontSize: '13px' }}>
              {currentSolution.reaction}
            </code>
            <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '6px' }}>
              {currentSolution.description}
            </p>
          </div>

          {/* Tombol Catat ke Tabel */}
          <button
            type="button"
            id="btn-add-observation"
            className="btn-dash-primary"
            onClick={handleSaveToTable}
          >
            <span>📥 Catat Hasil ke Tabel Pengamatan</span>
          </button>
        </div>

        {/* Panel Kanan: Alat Uji Laboratorium (Beaker + Konduktivitas + pH Meter) */}
        <div className="lab-apparatus-panel">
          {/* Aparatus Konduktivitas (Bola Lampu & Elektroda) */}
          <div className="conductivity-apparatus">
            <div
              className={`lightbulb-graphic ${
                currentSolution.lightIntensity === 'high'
                  ? 'bulb-bright'
                  : currentSolution.lightIntensity === 'low'
                  ? 'bulb-dim'
                  : 'bulb-off'
              }`}
              title={`Daya hantar listrik: ${currentSolution.lightIntensity}`}
            >
              💡
            </div>
            <div className="electrodes-pair">
              <div className="electrode-rod"></div>
              <div className="electrode-rod"></div>
            </div>
          </div>

          {/* Beaker Kaca Kimia dengan Animasi Cairan */}
          <div className="beaker-simulation-box">
            <div className="beaker-glass">
              <div
                className="beaker-liquid"
                style={{
                  backgroundColor: props.indicators.universalColor,
                  opacity: 0.85,
                }}
              >
                {/* Gelembung Ionik */}
                {currentSolution.bubbleDensity !== 'none' && (
                  <div className="liquid-bubbles"></div>
                )}
                <div className="liquid-ph-badge">
                  <span>pH {props.ph}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Indikator Strip Mini Real-Time */}
          <div className="indicators-strip-box">
            <div className="indicator-mini-card">
              <span className="ind-name">Lakmus Merah:</span>
              <span className="ind-val" style={{ color: props.indicators.lakmusMerah === 'Biru' ? '#38bdf8' : '#f87171' }}>
                {props.indicators.lakmusMerah}
              </span>
            </div>

            <div className="indicator-mini-card">
              <span className="ind-name">Lakmus Biru:</span>
              <span className="ind-val" style={{ color: props.indicators.lakmusBiru === 'Merah' ? '#f87171' : '#38bdf8' }}>
                {props.indicators.lakmusBiru}
              </span>
            </div>

            <div className="indicator-mini-card">
              <span className="ind-name">Fenolftalein (PP):</span>
              <span className="ind-val">{props.indicators.pp}</span>
            </div>

            <div className="indicator-mini-card">
              <span className="ind-name">Bromtimol Biru:</span>
              <span className="ind-val">{props.indicators.btb}</span>
            </div>

            <div className="indicator-mini-card">
              <span className="ind-name">Metil Merah:</span>
              <span className="ind-val">{props.indicators.metilMerah}</span>
            </div>

            <div className="indicator-mini-card">
              <span className="ind-name">Derajat Ionisasi (α):</span>
              <span className="ind-val">{props.alphaPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tabel Pengamatan Eksperimen Siswa */}
      <section className="observation-table-card" aria-label="Tabel Pengamatan Siswa">
        <div className="obs-table-header">
          <div>
            <h3 className="dash-section-title" style={{ fontSize: '18px' }}>
              📋 Tabel Hasil Pengamatan Laboratorium
            </h3>
            <span className="dash-section-desc">
              Data yang dicatat otomatis tersimpan di penyimpanan lokal browser. ({observations.length} data tersimpan)
            </span>
          </div>

          {observations.length > 0 && (
            <button
              type="button"
              className="btn-dash-secondary"
              onClick={() => {
                if (window.confirm('Kosongkan semua data pengamatan di tabel?')) {
                  clearExploreObservations();
                }
              }}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              <span>🗑️ Kosongkan Tabel</span>
            </button>
          )}
        </div>

        <div className="students-table-responsive">
          <table className="students-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Waktu</th>
                <th>Nama Larutan</th>
                <th>Konsentrasi</th>
                <th>Nilai pH</th>
                <th>Lakmus (M/B)</th>
                <th>Indikator PP</th>
                <th>Daya Hantar Listrik</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {observations.length > 0 ? (
                observations.map((row, idx) => (
                  <tr key={row.id}>
                    <td>{idx + 1}</td>
                    <td><span style={{ fontSize: '11.5px', color: '#64748b' }}>{row.savedAt}</span></td>
                    <td>
                      <strong>{row.solutionName}</strong>
                      <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8' }}>{row.type}</span>
                    </td>
                    <td><code>{row.concentration}</code></td>
                    <td><strong style={{ color: '#38bdf8' }}>{row.ph}</strong></td>
                    <td>{row.lakmus}</td>
                    <td>{row.pp}</td>
                    <td>{row.conductivity}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => deleteExploreObservation(row.id)}
                        title="Hapus baris ini"
                        style={{ color: '#f87171', fontSize: '14px', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '28px', color: '#94a3b8' }}>
                    Belum ada data pengamatan. Klik tombol <strong>&ldquo;Catat Hasil ke Tabel Pengamatan&rdquo;</strong> di atas untuk menyimpan eksperimen.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Pertanyaan Analisis Berdasarkan Hasil Eksplorasi */}
      <section className="prediction-section" aria-label="Pertanyaan Analisis Eksplorasi">
        <div className="section-title-wrap" style={{ marginBottom: '18px' }}>
          <h3 className="dash-section-title">Pertanyaan Analisis Data Hasil Eksplorasi</h3>
          <p className="dash-section-desc">
            Jawablah pertanyaan analisis berikut berdasarkan temuan data eksperimen di atas.
          </p>
        </div>

        {exploreAnalysisQuestions.map((q, idx) => (
          <div key={q.id} className="prediction-card">
            <p className="pred-q-text">
              <strong>0{idx + 1}. </strong> {q.question}
            </p>

            <textarea
              className="hots-textarea"
              placeholder="Tuliskan analisis ilmiahmu di sini..."
              value={analysisAnswers[q.id] || ''}
              onChange={(e) => handleAnalysisChange(q.id, e.target.value)}
            />

            {showAnalysisKey && (
              <div className="pred-feedback-box" style={{ marginTop: '12px' }}>
                <strong>🔍 Kunci Panduan Analisis:</strong> {q.guidance}
              </div>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button
            type="button"
            id="btn-complete-explore"
            className="btn-dash-primary"
            onClick={handleCompleteExplore}
          >
            <span>Simpan Analisis & Lanjut ke Explain (Penjelasan Konsep)</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        <div className="stage-reset-row">
          <ResetStageButton
            stageId="explore"
            onReset={() => {
              setAnalysisAnswers({});
              setShowAnalysisKey(false);
            }}
            onNotify={onNotify}
          />
        </div>
      </section>
    </div>
  );
}

