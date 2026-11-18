import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
// HeroSection dinonaktifkan sementara (lihat blok komentar JSX) — aktifkan kembali import jika dipakai
import QuizSection from './components/quiz/QuizSection';
import AuthPages from './components/auth/AuthPages';
import StudentDashboard from './components/dashboard/StudentDashboard';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import LearningCycle5E from './components/modules/LearningCycle5E';
import {
  getStoredProgress,
  saveModuleProgress,
  clearStoredProgress,
} from './utils/storageHelper';
import {
  getCurrentAuthUser,
  logoutUser,
} from './utils/authHelper';
import {
  get5EProgress,
  reset5EAllProgress,
} from './utils/learningHelper';
import './App.css';

export default function App() {
  const [progress, setProgress] = useState(getStoredProgress());
  const [progress5E, setProgress5E] = useState(() => get5EProgress());
  const [toastMessage, setToastMessage] = useState('');
  const [authUser, setAuthUser] = useState(() => getCurrentAuthUser());

  // Halaman pertama: Jika belum login, WAJIB menampilkan 'auth' terlebih dahulu!
  const [currentView, setCurrentView] = useState(() => {
    const active = getCurrentAuthUser();
    if (!active) {
      return 'auth';
    }
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (['#login', '#register', '#registrasi', '#forgot', '#forgot-password', '#lupa-sandi'].includes(hash)) {
        return 'auth';
      }
      if (hash.startsWith('#modul-5e') || hash.startsWith('#5e')) {
        return 'module-5e';
      }
    }
    return 'home';
  });

  // Mode spesifik dalam halaman auth: 'login' | 'register' | 'forgot'
  const [authMode, setAuthMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#register' || hash === '#registrasi') return 'register';
      if (hash === '#forgot' || hash === '#forgot-password' || hash === '#lupa-sandi') return 'forgot';
    }
    return 'login';
  });

  // Tahap awal saat membuka Modul 5E ('engage' | 'explore' | 'explain' | 'elaborate' | 'evaluate')
  const [target5EStage, setTarget5EStage] = useState('engage');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const reloadProgress = useCallback(() => {
    setProgress(getStoredProgress());
    setProgress5E(get5EProgress());
  }, []);

  useEffect(() => {
    const handleProgressEvent = () => reloadProgress();
    window.addEventListener('kimilab_progress_updated', handleProgressEvent);
    window.addEventListener('kimilab_5e_updated', handleProgressEvent);
    window.addEventListener('storage', handleProgressEvent);

    const handleAuthEvent = (e) => {
      const user = e.detail !== undefined ? e.detail : getCurrentAuthUser();
      setAuthUser(user);
      if (!user) {
        setCurrentView('auth');
      }
    };
    window.addEventListener('kimilab_auth_changed', handleAuthEvent);

    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#login') {
        setCurrentView('auth');
        setAuthMode('login');
      } else if (hash === '#register' || hash === '#registrasi') {
        setCurrentView('auth');
        setAuthMode('register');
      } else if (hash === '#forgot' || hash === '#forgot-password' || hash === '#lupa-sandi') {
        setCurrentView('auth');
        setAuthMode('forgot');
      } else if (hash.startsWith('#modul-5e')) {
        setCurrentView('module-5e');
      } else if (!hash || hash === '#hero' || hash === '#beranda') {
        setCurrentView(getCurrentAuthUser() ? 'home' : 'auth');
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('kimilab_progress_updated', handleProgressEvent);
      window.removeEventListener('kimilab_5e_updated', handleProgressEvent);
      window.removeEventListener('storage', handleProgressEvent);
      window.removeEventListener('kimilab_auth_changed', handleAuthEvent);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [reloadProgress]);

  const handleUpdateProgress = (moduleId, percent) => {
    const updated = saveModuleProgress(moduleId, percent);
    setProgress(updated);
    showToast(
      percent >= 100
        ? `🎉 Selamat! Modul ${moduleId} tuntas 100%!`
        : `💾 Progres modul ${moduleId} tersimpan: ${percent}%`
    );
  };

  const handleResetProgress = () => {
    const reset = clearStoredProgress();
    reset5EAllProgress();
    setProgress(reset);
    setProgress5E(get5EProgress());
    showToast('🔄 Seluruh data progres pembelajaran 5E di localStorage telah dibersihkan.');
  };

  // Navigasi ke Halaman Autentikasi
  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setCurrentView('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigasi Kembali ke Dashboard Utama
  const handleBackToHome = () => {
    setCurrentView('home');
    window.history.pushState('', document.title, window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Callback saat Login / Registrasi Berhasil
  const handleAuthSuccess = (user, msg) => {
    setAuthUser(user);
    showToast(msg || `Selamat datang di KimiLab, ${user.name}!`);
    setTimeout(() => {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  // Logout Akun -> Kembali ke Halaman Login Utama
  const handleLogout = () => {
    // Keluarkan sesi Firebase juga (jika ada) tanpa menahan logout lokal
    import('./lib/firebaseService')
      .then(({ firebaseSignOut }) => firebaseSignOut())
      .catch(() => {});
    logoutUser();
    setAuthUser(null);
    setCurrentView('auth');
    setAuthMode('login');
    showToast('👋 Anda telah keluar. Silakan masuk kembali untuk melanjutkan.');
  };

  // Membuka Modul Pembelajaran 5E pada Tahap Tertentu
  const handleOpen5EStage = (stageId = 'engage') => {
    setTarget5EStage(stageId);
    setCurrentView('module-5e');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===========================================================================
  // 1. JIKA PENGGUNA BELUM LOGIN ATAU MEMBUKA AUTH: TAMPILKAN HALAMAN PERTAMA (AUTH)
  // ===========================================================================
  if (currentView === 'auth' || !authUser) {
    return (
      <div className="app-layout">
        <AuthPages
          initialMode={authMode}
          onBackToHome={authUser ? handleBackToHome : undefined}
          onAuthSuccess={handleAuthSuccess}
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="toast-notification" role="status" aria-live="polite">
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // ===========================================================================
  // 2. JIKA MEMBUKA MODUL PEMBELAJARAN LEARNING CYCLE 5E
  // ===========================================================================
  if (currentView === 'module-5e') {
    return (
      <div className="app-layout">
        <LearningCycle5E
          initialStage={target5EStage}
          onBackToDashboard={handleBackToHome}
          onNotify={showToast}
        />

        {toastMessage && (
          <div className="toast-notification" role="status" aria-live="polite">
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // ===========================================================================
  // 3. TAMPILAN BERANDA (DASHBOARD SISWA / DASHBOARD GURU SETELAH LOGIN)
  // ===========================================================================
  return (
    <div className="app-layout">
      {/* 1. Navbar dengan Identitas Media, Status Akun Role, dan Progres 5E */}
      <Navbar
        progress={progress}
        onResetProgress={handleResetProgress}
        authUser={authUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        currentView={currentView}
        onNavigateHome={handleBackToHome}
        onOpen5EStage={handleOpen5EStage}
        onNotify={showToast}
      />

      {/* Main Content Area */}
      <main id="main-content">
        {/* Sesuai Permintaan Role-Based Dashboard */}
        {authUser?.role === 'guru' ? (
          // DASHBOARD KHUSUS GURU
          <TeacherDashboard
            authUser={authUser}
            onPreview5EModule={handleOpen5EStage}
          />
        ) : (
          // DASHBOARD KHUSUS SISWA
          <StudentDashboard
            authUser={authUser}
            progress5E={progress5E}
            onOpen5EStage={handleOpen5EStage}
            onStartLearning={() => handleOpen5EStage('engage')}
          />
        )}

        {/* Hero Section Minimalis KimiLab */}
        {/* <HeroSection
          onStartLearning={() => handleOpen5EStage('engage')}
          onOpenStage={handleOpen5EStage}
        /> */}

        {/* Kuis Interaktif Evaluasi Asam-Basa C4–C5 (Format & Sistem 100% Dipertahankan) */}
        <QuizSection onUpdateProgress={handleUpdateProgress} />

        {/* Metode Pedagogi Sains 5E KimiLab */}
        <section id="metode-belajar" className="method-section" aria-labelledby="method-heading">
          <div className="method-container">
            <div className="section-pill-tag">
              <span>💡 Pedagogi Sains KimiLab</span>
            </div>
            <h2 id="method-heading" className="method-title">
              Sintaks Learning Cycle 5E dalam Pembelajaran Asam-Basa
            </h2>
            <p className="method-subtitle">
              Pembelajaran terstruktur melalui 5 tahapan aktif: mengaitkan fenomena nyata, bereksperimen di laboratorium virtual,
              mengonstruksi konsep ilmiah, menerapkan pada kasus lingkungan, dan evaluasi penalaran kognitif C4–C5.
            </p>

            <div className="method-cards-grid">
              <div className="method-card">
                <div className="method-icon-box" style={{ color: '#eab308' }}>
                  <span>💡</span>
                </div>
                <h3>1. Engage (Minat & Apersepsi)</h3>
                <p>
                  Mengaktifkan pengetahuan awal melalui fenomena lemon, cuka dapur, sabun licin,
                  dan pertanyaan prediksi ilmiah sebelum mempelajari konsep.
                </p>
              </div>

              <div className="method-card">
                <div className="method-icon-box" style={{ color: '#06b6d4' }}>
                  <span>🔬</span>
                </div>
                <h3>2. Explore (Laboratorium Virtual)</h3>
                <p>
                  Menemukan pola melalui simulasi larutan asam-basa, pengujian indikator,
                  derajat ionisasi (α), dan uji daya hantar listrik secara mandiri.
                </p>
              </div>

              <div className="method-card">
                <div className="method-icon-box" style={{ color: '#3b82f6' }}>
                  <span>📚</span>
                </div>
                <h3>3. Explain (Penjelasan Konsep)</h3>
                <p>
                  12 materi komprehensif mengintegrasikan representasi makroskopik,
                  submikroskopik partikel, simbolik IUPAC, dan contoh soal terstruktur.
                </p>
              </div>

              <div className="method-card">
                <div className="method-icon-box" style={{ color: '#10b981' }}>
                  <span>🧪</span>
                </div>
                <h3>4. Elaborate (Aplikasi HOTS)</h3>
                <p>
                  Studi kasus nyata penanganan limbah cair asam industri tahu,
                  kalkulasi penetralan $Ca(OH)_2$, dan perancangan konsep IPAL mini.
                </p>
              </div>

              <div className="method-card">
                <div className="method-icon-box" style={{ color: '#a855f7' }}>
                  <span>📝</span>
                </div>
                <h3>5. Evaluate (Evaluasi Kognitif)</h3>
                <p>
                  10 butir soal pilihan ganda analitis C4–C5 untuk mengukur daya serap
                  siswa dengan umpan balik ilmiah dan pembahasan mendalam.
                </p>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="overall-progress-banner">
              <div className="banner-text">
                <h3>Mulai Eksplorasi Sintaks 5E Sekarang</h3>
                <p>
                  Masuki ruang belajar digital dan tuntaskan setiap tahap pembelajaran asam-basa secara berurutan.
                </p>
              </div>
              <div className="banner-action">
                <button
                  type="button"
                  className="btn-banner-action"
                  onClick={() => handleOpen5EStage('engage')}
                >
                  Buka Modul 5E Lengkap &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Identitas Media */}
      <footer id="tentang-media" className="site-footer">
        <div className="footer-container">
          <div className="footer-brand-column">
            <div className="footer-brand">
              <div className="brand-icon-box" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 2v7.31L4.2 20.2a1 1 0 0 0 .8 1.8h14a1 1 0 0 0 .8-1.8L14 9.31V2" />
                  <path d="M8.5 2h7" />
                  <path d="M7 16h10" />
                </svg>
              </div>
              <span className="footer-brand-name">
                Kimi<span className="brand-accent">Lab</span>
              </span>
            </div>
            <p className="footer-desc">
              Media Pembelajaran Kimia SMA Interaktif & Mandiri berbasis sintaks Learning Cycle 5E
              (Engage, Explore, Explain, Elaborate, Evaluate). 100% Client-Side Single Page Application (SPA).
            </p>
            <div className="footer-legal-tag">
              Standar Notasi: IUPAC & Kemendikbudristek RI
            </div>
          </div>

          <div className="footer-links-column">
            <h4>Sintaks Pembelajaran 5E</h4>
            <ul>
              <li>
                <button type="button" className="footer-reset-link" onClick={() => handleOpen5EStage('engage')}>
                  1. Engage (Fenomena & Prediksi)
                </button>
              </li>
              <li>
                <button type="button" className="footer-reset-link" onClick={() => handleOpen5EStage('explore')}>
                  2. Explore (Simulator Lab Virtual)
                </button>
              </li>
              <li>
                <button type="button" className="footer-reset-link" onClick={() => handleOpen5EStage('explain')}>
                  3. Explain (12 Konsep Kimia)
                </button>
              </li>
              <li>
                <button type="button" className="footer-reset-link" onClick={() => handleOpen5EStage('elaborate')}>
                  4. Elaborate (Kasus Limbah Tahu)
                </button>
              </li>
              <li>
                <button type="button" className="footer-reset-link" onClick={() => handleOpen5EStage('evaluate')}>
                  5. Evaluate (Kuis C4–C5)
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h4>Autentikasi & Akun</h4>
            <ul>
              {authUser ? (
                <>
                  <li>
                    <span style={{ fontSize: '13px', color: '#cbd5e1' }}>
                      Akun: <strong>{authUser.name}</strong> ({authUser.role === 'guru' ? 'Guru' : authUser.kelas || 'Siswa'})
                    </span>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="footer-reset-link"
                      onClick={handleLogout}
                      style={{ color: '#f87171' }}
                    >
                      🚪 Keluar dari Akun (Logout)
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      type="button"
                      className="footer-reset-link"
                      onClick={() => handleOpenAuth('login')}
                      style={{ color: '#38bdf8' }}
                    >
                      🔐 Masuk ke Akun
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="footer-reset-link"
                      onClick={() => handleOpenAuth('register')}
                      style={{ color: '#38bdf8' }}
                    >
                      📝 Registrasi Akun Baru
                    </button>
                  </li>
                </>
              )}
              <li>
                <button
                  type="button"
                  className="footer-reset-link"
                  onClick={handleResetProgress}
                >
                  🔄 Bersihkan Progres di Browser
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© 2026 KimiLab - Media Pembelajaran Kimia SMA Kelas XI. Dibangun dengan React 19 + Vite.</p>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
