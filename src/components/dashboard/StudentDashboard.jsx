import { getQuizSession } from '../../lib/localStore';
import { learningObjectives } from '../../data/chemData';
import { calculate5EPercentage } from '../../utils/learningHelper';
import './Dashboard.css';

/**
 * Dashboard Khusus Siswa (Student Dashboard)
 * Menyajikan:
 * - Sapaan personal berdasarkan nama siswa & informasi kelas/sekolah
 * - Progres pembelajaran modul asam-basa pribadi (0-100%)
 * - Status penyelesaian setiap tahap sintaks 5E (Engage, Explore, Explain, Elaborate, Evaluate)
 * - Riwayat pengerjaan kuis dan perolehan nilai
 * - Materi yang belum diselesaikan dan tombol "Lanjutkan Pembelajaran" / "Mulai Belajar"
 * - Ringkasan materi & tujuan pembelajaran
 * 
 * @param {{
 *   authUser: object,
 *   progress5E: object,
 *   onOpen5EStage: (stageId: string) => void,
 *   onStartLearning: () => void,
 * }} props
 */
export default function StudentDashboard({
  authUser,
  progress5E,
  onOpen5EStage,
  onStartLearning,
}) {
  const percent5E = calculate5EPercentage(progress5E);
  const quizSession = getQuizSession('asam-basa', 'v1');
  const isQuizSubmitted = quizSession.status === 'submitted';

  // Daftar kartu 5E dengan status dinamis
  const stagesList = [
    {
      id: 'engage',
      order: 'Tahap 1',
      name: 'Engage (Menggugah Minat)',
      icon: '💡',
      desc: 'Membahas fenomena sehari-hari (lemon, cuka, sabun) dan menjawab pertanyaan prediksi awal.',
      completed: progress5E?.engage?.completed,
    },
    {
      id: 'explore',
      order: 'Tahap 2',
      name: 'Explore (Eksplorasi Lab)',
      icon: '🔬',
      desc: 'Simulasi laboratorium virtual pH, pengujian indikator warna, dan daya hantar listrik.',
      completed: progress5E?.explore?.completed,
    },
    {
      id: 'explain',
      order: 'Tahap 3',
      name: 'Explain (Penjelasan Konsep)',
      icon: '📚',
      desc: '12 materi komprehensif Arrhenius, Brønsted-Lowry, Lewis, Kw, pH logaritmik, dan titrasi.',
      completed: progress5E?.explain?.completed,
    },
    {
      id: 'elaborate',
      order: 'Tahap 4',
      name: 'Elaborate (Aplikasi HOTS)',
      icon: '🧪',
      desc: 'Studi kasus pemecahan masalah limbah cair asam industri tahu dan argumentasi ilmiah.',
      completed: progress5E?.elaborate?.completed,
    },
    {
      id: 'evaluate',
      order: 'Tahap 5',
      name: 'Evaluate (Kuis Evaluasi)',
      icon: '📝',
      desc: '10 butir soal pilihan ganda evaluasi kognitif C4–C5 dengan pembahasan ilmiah terbuka.',
      completed: progress5E?.evaluate?.completed || isQuizSubmitted,
    },
  ];

  // Cari tahap berikutnya yang belum selesai
  const nextIncompleteStage = stagesList.find((s) => !s.completed) || stagesList[0];

  return (
    <div className="dashboard-container">
      {/* 1. Greeting Banner Personal */}
      <section className="dash-greeting-banner" aria-label="Sapaan Siswa">
        <div className="greeting-glow" aria-hidden="true"></div>

        <div className="greeting-text-area">
          <div className="user-role-badge">
            <span>🎓 Siswa SMA</span>
            <span>•</span>
            <span>{authUser?.kelas || 'Kelas XI MIPA'}</span>
            <span>•</span>
            <span>{authUser?.sekolah || 'SMAN 1 Kimia Digital'}</span>
          </div>

          <h1 className="dash-main-title">
            Selamat Datang di Laboratorium Digital,{' '}
            <span className="highlight-name">{authUser?.name || 'Siswa KimiLab'}</span>! 👋
          </h1>

          <p className="dash-subtitle">
            {percent5E === 100
              ? '🎉 Luar biasa! Seluruh 5 tahapan pembelajaran modul Larutan Asam-Basa telah kamu tuntaskan dengan sukses.'
              : percent5E > 0
              ? `Kamu telah menyelesaikan ${percent5E}% rangkaian modul sintaks 5E. Lanjutkan pembelajaran ke tahap ${nextIncompleteStage.name}!`
              : 'Siap menjelajahi kimia asam-basa? Mulai dari fenomena sehari-hari, eksplorasi simulasi virtual, hingga pemecahan masalah lingkungan.'}
          </p>
        </div>

        <div className="greeting-actions">
          <button
            type="button"
            id="btn-resume-learning"
            className="btn-dash-primary"
            onClick={onStartLearning}
          >
            <span>{percent5E === 0 ? '🚀 Mulai Belajar 5E' : '▶️ Lanjutkan Pembelajaran'}</span>
          </button>

          <button
            type="button"
            className="btn-dash-secondary"
            onClick={() => onOpen5EStage('explore')}
          >
            <span>🔬 Buka Lab Virtual (Explore)</span>
          </button>
        </div>
      </section>

      {/* 2. Kartu Metrik Ringkasan Progres & Nilai Kuis */}
      <section className="dash-stats-grid" aria-label="Statistik Belajar Siswa">
        <div className="dash-stat-card">
          <div className="stat-icon-box stat-icon-cyan">
            <span>📊</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">{percent5E}%</span>
            <span className="stat-label">Total Progres Modul 5E</span>
            <span className="stat-subtext">
              {stagesList.filter((s) => s.completed).length} dari 5 Tahap Selesai
            </span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-icon-box stat-icon-emerald">
            <span>📝</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">
              {isQuizSubmitted ? `${quizSession.score} / 100` : 'Belum Kuis'}
            </span>
            <span className="stat-label">Hasil Nilai Kuis Evaluasi</span>
            <span className="stat-subtext">
              {isQuizSubmitted
                ? quizSession.score >= 70
                  ? '✓ Memenuhi KKM (Tuntas)'
                  : '💡 Rekomendasi Reviu'
                : '10 Soal Analitis C4–C5'}
            </span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-icon-box stat-icon-purple">
            <span>🎯</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">
              {percent5E === 100 ? 'Semua Tuntas' : nextIncompleteStage.name.split(' ')[0]}
            </span>
            <span className="stat-label">Fokus Belajar Berikutnya</span>
            <span className="stat-subtext">Sintaks Learning Cycle 5E</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-icon-box stat-icon-amber">
            <span>💾</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">Local-First</span>
            <span className="stat-label">Status Penyimpanan Data</span>
            <span className="stat-subtext">Otomatis tersimpan di browser</span>
          </div>
        </div>
      </section>

      {/* 3. Status Penyelesaian Setiap Tahap 5E */}
      <section className="dash-stages-section" aria-label="Status Tahapan 5E">
        <div className="section-heading-row">
          <div className="section-title-wrap">
            <h2 className="dash-section-title">Alur Sintaks Pembelajaran: Learning Cycle 5E</h2>
            <p className="dash-section-desc">
              Setiap tahap memiliki aktivitas ilmiah yang dirancang berurutan. Klik kartu untuk langsung menuju tahapan tersebut.
            </p>
          </div>
        </div>

        <div className="tracker-grid-5e">
          {stagesList.map((stage) => {
            const isCompleted = stage.completed;
            const isCurrent = !isCompleted && stage.id === nextIncompleteStage.id;

            return (
              <button
                key={stage.id}
                type="button"
                id={`card-stage-${stage.id}`}
                className={`stage-card-item ${isCompleted ? 'completed' : isCurrent ? 'in-progress' : ''}`}
                onClick={() => onOpen5EStage(stage.id)}
              >
                <div className="stage-card-header">
                  <span className="stage-num-badge">{stage.order}</span>
                  <span
                    className={`stage-status-chip ${
                      isCompleted ? 'chip-done' : isCurrent ? 'chip-active' : 'chip-pending'
                    }`}
                  >
                    {isCompleted ? '✓ Tuntas' : isCurrent ? '▶ Sedang Aktif' : 'Belum Selesai'}
                  </span>
                </div>

                <div className="stage-icon" aria-hidden="true">{stage.icon}</div>
                <h3 className="stage-card-title">{stage.name}</h3>
                <p className="stage-card-desc">{stage.desc}</p>

                <div className="stage-card-footer">
                  <span>{isCompleted ? 'Buka Kembali Materi' : isCurrent ? 'Lanjutkan Tahap Ini' : 'Mulai Tahap'}</span>
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Ringkasan Modul & Capaian Pembelajaran Asam-Basa */}
      <section className="dash-module-overview-card" aria-label="Ringkasan Materi Asam Basa">
        <div className="section-heading-row">
          <div className="section-title-wrap">
            <h2 className="dash-section-title">Modul 1: Larutan Asam dan Basa & Derajat pH</h2>
            <p className="dash-section-desc">
              Materi pokok kimia kelas XI SMA semester genap berdasarkan kurikulum sains terpadu.
            </p>
          </div>
          <button
            type="button"
            className="btn-dash-primary"
            onClick={() => onOpen5EStage('explain')}
          >
            <span>📚 Baca 12 Submateri Ilmiah</span>
          </button>
        </div>

        <div className="module-intro-grid">
          <div>
            <h3 style={{ fontSize: '15px', color: '#f8fafc', fontWeight: '700', marginBottom: '8px' }}>
              🎯 Capaian & Tujuan Pembelajaran:
            </h3>
            <div className="objectives-list">
              {learningObjectives.map((obj) => (
                <div key={obj.id} className="objective-item">
                  <span className="obj-badge">{obj.badge}</span>
                  <span>{obj.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="formula-side-panel">
            <div className="formula-card-highlight">
              <span className="formula-card-title">Skala Derajat Keasaman Sørensen</span>
              <code className="formula-code">pH = -log [H⁺]</code>
              <code className="formula-code">pOH = -log [OH⁻]</code>
              <p className="formula-desc">pH + pOH = 14,0 pada kondisi standar 25 °C.</p>
            </div>

            <div className="formula-card-highlight">
              <span className="formula-card-title">Kesetimbangan Ionisasi Air (Kw)</span>
              <code className="formula-code">Kw = [H⁺][OH⁻] = 1,0 × 10⁻¹⁴</code>
              <p className="formula-desc">Air murni netral selalu memiliki [H⁺] = [OH⁻].</p>
            </div>

            <div className="formula-card-highlight">
              <span className="formula-card-title">Stoikiometri Titrasi Netralisasi</span>
              <code className="formula-code">Va · Ma · a = Vb · Mb · b</code>
              <p className="formula-desc">Titik ekuivalen: mol ekivalen asam tepat sama dengan basa.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

