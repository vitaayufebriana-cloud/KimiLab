import { useState, useMemo } from 'react';
import { getTeacherStudentList } from '../../utils/authHelper';
import './Dashboard.css';

/**
 * Dashboard Khusus Guru / Pendidik Kimia (Teacher Dashboard)
 * Menyajikan:
 * - Sapaan berdasarkan nama guru & identitas sekolah
 * - Informasi metrik agregat: jumlah siswa terdaftar, rata-rata skor kuis kelas, tingkat kelulusan KKM
 * - Progress pembelajaran siswa dalam funnel 5E (Engage -> Explore -> Explain -> Elaborate -> Evaluate)
 * - Tabel data siswa terdaftar lengkap dengan status tahapan 5E dan hasil nilai kuis
 * - Filter pencarian siswa instan
 * - Tombol pratinjau modul pembelajaran 5E
 * 
 * @param {{
 *   authUser: object,
 *   onPreview5EModule: (stageId?: string) => void,
 * }} props
 */
export default function TeacherDashboard({
  authUser,
  onPreview5EModule,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');

  // Ambil data siswa (kohort kelas + siswa baru yang mendaftar lokal)
  const students = useMemo(() => getTeacherStudentList(), []);

  // Filter siswa berdasarkan input pencarian dan kelas
  const filteredStudents = useMemo(() => {
    return students.filter((std) => {
      const matchSearch =
        std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        std.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        std.username.toLowerCase().includes(searchQuery.toLowerCase());
      const matchClass =
        selectedClassFilter === 'ALL' || std.kelas === selectedClassFilter;
      return matchSearch && matchClass;
    });
  }, [students, searchQuery, selectedClassFilter]);

  // Statistik Agregat Kelas
  const totalStudents = students.length;
  const funnelTotal = Math.max(totalStudents, 1); // hindari pembagian nol saat belum ada siswa
  const evaluatedStudents = students.filter((s) => s.quizScore !== null);
  const avgQuizScore = evaluatedStudents.length > 0
    ? Math.round(evaluatedStudents.reduce((sum, s) => sum + s.quizScore, 0) / evaluatedStudents.length)
    : 0;
  const passedStudentsCount = evaluatedStudents.filter((s) => s.quizScore >= 70).length;
  const passPercentage = evaluatedStudents.length > 0
    ? Math.round((passedStudentsCount / evaluatedStudents.length) * 100)
    : 0;

  // Funnel Distribusi 5E
  const funnelCounts = useMemo(() => {
    return {
      engage: students.filter((s) => s.stages?.engage).length,
      explore: students.filter((s) => s.stages?.explore).length,
      explain: students.filter((s) => s.stages?.explain).length,
      elaborate: students.filter((s) => s.stages?.elaborate).length,
      evaluate: students.filter((s) => s.stages?.evaluate).length,
    };
  }, [students]);

  return (
    <div className="dashboard-container">
      {/* 1. Greeting Banner Guru */}
      <section className="dash-greeting-banner" aria-label="Sapaan Guru">
        <div className="greeting-glow" aria-hidden="true"></div>

        <div className="greeting-text-area">
          <div className="user-role-badge teacher">
            <span>👨‍🏫 Guru Pengampu Kimia</span>
            <span>•</span>
            <span>{authUser?.sekolah || 'SMAN 1 Kimia Digital'}</span>
          </div>

          <h1 className="dash-main-title">
            Panel Pemantauan Pembelajaran,{' '}
            <span className="highlight-name">{authUser?.name || 'Ibu Guru'}</span>! 📋
          </h1>

          <p className="dash-subtitle">
            Pantau aktivitas belajar siswa pada modul <strong>Larutan Asam-Basa (5E Learning Cycle)</strong>,
            analisis penguasaan konsep, dan pantau hasil evaluasi kuis secara real-time.
          </p>
        </div>

        <div className="greeting-actions">
          <button
            type="button"
            id="btn-teacher-preview-5e"
            className="btn-dash-primary"
            onClick={() => onPreview5EModule('engage')}
          >
            <span>🔬 Pratinjau Modul 5E</span>
            <span aria-hidden="true">&rarr;</span>
          </button>

          <button
            type="button"
            className="btn-dash-secondary"
            onClick={() => onPreview5EModule('explore')}
          >
            <span>🧪 Simulator Lab Virtual</span>
          </button>
        </div>
      </section>

      {/* 2. Kartu Metrik Kelas */}
      <section className="dash-stats-grid" aria-label="Statistik Kelas">
        <div className="dash-stat-card">
          <div className="stat-icon-box stat-icon-cyan">
            <span>👥</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalStudents}</span>
            <span className="stat-label">Total Siswa Terdaftar</span>
            <span className="stat-subtext">Aktif di kelas XI</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-icon-box stat-icon-emerald">
            <span>📈</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">{avgQuizScore} / 100</span>
            <span className="stat-label">Rata-Rata Nilai Kuis</span>
            <span className="stat-subtext">{evaluatedStudents.length} siswa telah mengerjakan</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-icon-box stat-icon-purple">
            <span>🎓</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">{passPercentage}%</span>
            <span className="stat-label">Tingkat Kelulusan KKM</span>
            <span className="stat-subtext">{passedStudentsCount} siswa mencapai KKM 70</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-icon-box stat-icon-amber">
            <span>⚡</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">{funnelCounts.evaluate} / {totalStudents}</span>
            <span className="stat-label">Siswa Tuntas 5E</span>
            <span className="stat-subtext">Menyelesaikan 5 tahapan</span>
          </div>
        </div>
      </section>

      {/* 3. Funnel Penyelesaian Sintaks 5E Siswa */}
      <section className="teacher-funnel-card" aria-label="Funnel Tahapan 5E">
        <div className="section-title-wrap">
          <h2 className="dash-section-title">Distribusi Kemajuan Belajar Siswa Berdasarkan Sintaks 5E</h2>
          <p className="dash-section-desc">
            Persentase siswa yang telah berhasil menyelesaikan setiap tahapan pembelajaran kimia.
          </p>
        </div>

        <div className="funnel-bars-container">
          {totalStudents === 0 && (
            <p style={{ fontSize: '13px', color: 'var(--um-muted)', padding: '8px 2px' }}>
              Belum ada siswa nyata yang terdaftar di browser ini — distribusi 5E akan terisi setelah siswa registrasi (akun demo dikecualikan).
            </p>
          )}
          <div className="funnel-row">
            <div className="funnel-label-row">
              <span>💡 Tahap 1: Engage (Apersepsi & Prediksi Fenomena)</span>
              <span><strong>{funnelCounts.engage}</strong> dari {totalStudents} siswa ({Math.round((funnelCounts.engage / funnelTotal) * 100)}%)</span>
            </div>
            <div className="funnel-track">
              <div
                className="funnel-fill"
                style={{
                  width: `${(funnelCounts.engage / funnelTotal) * 100}%`,
                  background: 'linear-gradient(90deg, var(--um-gold-dark), var(--um-gold))',
                }}
              ></div>
            </div>
          </div>

          <div className="funnel-row">
            <div className="funnel-label-row">
              <span>🔬 Tahap 2: Explore (Laboratorium Virtual Asam-Basa)</span>
              <span><strong>{funnelCounts.explore}</strong> dari {totalStudents} siswa ({Math.round((funnelCounts.explore / funnelTotal) * 100)}%)</span>
            </div>
            <div className="funnel-track">
              <div
                className="funnel-fill"
                style={{
                  width: `${(funnelCounts.explore / funnelTotal) * 100}%`,
                  background: 'linear-gradient(90deg, var(--um-blue), var(--um-blue-dark))',
                }}
              ></div>
            </div>
          </div>

          <div className="funnel-row">
            <div className="funnel-label-row">
              <span>📚 Tahap 3: Explain (12 Konsep Kimia Terpadu)</span>
              <span><strong>{funnelCounts.explain}</strong> dari {totalStudents} siswa ({Math.round((funnelCounts.explain / funnelTotal) * 100)}%)</span>
            </div>
            <div className="funnel-track">
              <div
                className="funnel-fill"
                style={{
                  width: `${(funnelCounts.explain / funnelTotal) * 100}%`,
                  background: 'linear-gradient(90deg, var(--um-blue-dark), var(--um-blue))',
                }}
              ></div>
            </div>
          </div>

          <div className="funnel-row">
            <div className="funnel-label-row">
              <span>🧪 Tahap 4: Elaborate (Studi Kasus Limbah Cair Tahu)</span>
              <span><strong>{funnelCounts.elaborate}</strong> dari {totalStudents} siswa ({Math.round((funnelCounts.elaborate / funnelTotal) * 100)}%)</span>
            </div>
            <div className="funnel-track">
              <div
                className="funnel-fill"
                style={{
                  width: `${(funnelCounts.elaborate / funnelTotal) * 100}%`,
                  background: 'linear-gradient(90deg, var(--um-info), var(--um-blue))',
                }}
              ></div>
            </div>
          </div>

          <div className="funnel-row">
            <div className="funnel-label-row">
              <span>📝 Tahap 5: Evaluate (Kuis Evaluasi Komprehensif)</span>
              <span><strong>{funnelCounts.evaluate}</strong> dari {totalStudents} siswa ({Math.round((funnelCounts.evaluate / funnelTotal) * 100)}%)</span>
            </div>
            <div className="funnel-track">
              <div
                className="funnel-fill"
                style={{
                  width: `${(funnelCounts.evaluate / funnelTotal) * 100}%`,
                  background: 'linear-gradient(90deg, var(--um-blue-dark), var(--um-blue))',
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tabel Daftar Siswa Terdaftar & Hasil Kuis */}
      <section className="teacher-table-card" aria-label="Daftar Siswa">
        <div className="table-toolbar">
          <div className="section-title-wrap">
            <h2 className="dash-section-title">Daftar Siswa & Rekap Capaian Evaluasi</h2>
            <p className="dash-section-desc">
              Menampilkan {filteredStudents.length} siswa terdaftar di portal kelas KimiLab.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              className="table-search-input"
              placeholder="🔍 Cari nama siswa / email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              className="table-search-input"
              style={{ minWidth: '140px' }}
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
            >
              <option value="ALL">Semua Kelas</option>
              <option value="XI MIPA 1">XI MIPA 1</option>
              <option value="XI MIPA 2">XI MIPA 2</option>
            </select>
          </div>
        </div>

        <div className="students-table-responsive">
          <table className="students-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Siswa & Identitas</th>
                <th>Kelas</th>
                <th>Tahap 5E</th>
                <th>Progres</th>
                <th>Nilai Kuis</th>
                <th>Status Pembelajaran</th>
                <th>Aktivitas Terakhir</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((std, idx) => {
                  const score = std.quizScore;
                  let scoreClass = 'score-none';
                  if (score !== null) {
                    if (score >= 80) scoreClass = 'score-high';
                    else if (score >= 70) scoreClass = 'score-mid';
                    else scoreClass = 'score-low';
                  }

                  return (
                    <tr key={std.id || idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <div className="student-name-cell">
                          <strong>{std.name}</strong>
                          <span>{std.email}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: '600', color: 'var(--um-ink-soft)' }}>{std.kelas}</span>
                      </td>
                      <td>
                        <div className="stage-pills-row" title="Engage, Explore, Explain, Elaborate, Evaluate">
                          <span className={`stage-tiny-pill ${std.stages?.engage ? 'done' : ''}`} title="Engage">1</span>
                          <span className={`stage-tiny-pill ${std.stages?.explore ? 'done' : ''}`} title="Explore">2</span>
                          <span className={`stage-tiny-pill ${std.stages?.explain ? 'done' : ''}`} title="Explain">3</span>
                          <span className={`stage-tiny-pill ${std.stages?.elaborate ? 'done' : ''}`} title="Elaborate">4</span>
                          <span className={`stage-tiny-pill ${std.stages?.evaluate ? 'done' : ''}`} title="Evaluate">5</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '700', color: 'var(--um-blue)' }}>
                            {std.progressPercent !== null ? `${std.progressPercent}%` : '–'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`score-badge ${scoreClass}`}>
                          {score !== null ? `${score} / 100` : '–'}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '12.5px', color: 'var(--um-muted)' }}>{std.status}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', color: 'var(--um-placeholder)' }}>{std.lastActive}</span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '36px', color: 'var(--um-muted)' }}>
                    {students.length === 0
                      ? 'Belum ada siswa yang registrasi di browser ini (selain akun demo).'
                      : 'Tidak ada siswa yang cocok dengan filter pencarian.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

