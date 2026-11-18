import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import PanelGuruModal from './components/PanelGuruModal';
import AuthPages from './components/auth/AuthPages';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import LearningCycle5E from './components/modules/LearningCycle5E';
import IntroductionPage from './components/intro/IntroductionPage';
import DeveloperFooter from './components/intro/DeveloperFooter';
import {
  getCurrentAuthUser,
  logoutUser,
} from './utils/authHelper';
import './App.css';

export default function App() {
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

  // Akses Panel Guru: diingat selama sesi tab browser (sessionStorage)
  const [guruAccess, setGuruAccess] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.sessionStorage.getItem('kimilab_guru_panel_unlocked') === '1';
    } catch {
      return false;
    }
  });
  const [panelGuruModalOpen, setPanelGuruModalOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  useEffect(() => {
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
      window.removeEventListener('kimilab_auth_changed', handleAuthEvent);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Membuka Modal Kode Panel Guru (atau langsung ke panel bila sudah unlock)
  const handleOpenPanelGuru = useCallback(() => {
    if (guruAccess) {
      setCurrentView('panel-guru');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPanelGuruModalOpen(true);
    }
  }, [guruAccess]);

  // Kode Panel Guru benar: unlock untuk sesi tab ini & buka panel
  const handlePanelGuruSuccess = useCallback(() => {
    try {
      window.sessionStorage.setItem('kimilab_guru_panel_unlocked', '1');
    } catch {
      /* abaikan — akses tetap terbuka untuk sesi state ini */
    }
    setGuruAccess(true);
    setPanelGuruModalOpen(false);
    setCurrentView('panel-guru');
    showToast('✅ Akses Panel Guru terbuka.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
      <div className="app-layout app-layout-with-sidebar">
        <Sidebar
          authUser={authUser}
          onOpenAuth={handleOpenAuth}
          onLogout={handleLogout}
          currentView="module-5e"
          onNavigateHome={handleBackToHome}
          onOpen5EStage={handleOpen5EStage}
          onOpenPanelGuru={handleOpenPanelGuru}
          onNotify={showToast}
        />

        <div className="app-content">
          <LearningCycle5E
            key={target5EStage}
            initialStage={target5EStage}
            onBackToDashboard={handleBackToHome}
            onNotify={showToast}
          />
        </div>

        <PanelGuruModal
          isOpen={panelGuruModalOpen}
          onClose={() => setPanelGuruModalOpen(false)}
          onSuccess={handlePanelGuruSuccess}
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
  // 3. PANEL GURU (dilindungi kode akses, dibuka lewat sidebar)
  // ===========================================================================
  if (currentView === 'panel-guru' && guruAccess) {
    return (
      <div className="app-layout app-layout-with-sidebar">
        <Sidebar
          authUser={authUser}
          onOpenAuth={handleOpenAuth}
          onLogout={handleLogout}
          currentView="panel-guru"
          onNavigateHome={handleBackToHome}
          onOpen5EStage={handleOpen5EStage}
          onOpenPanelGuru={handleOpenPanelGuru}
          onNotify={showToast}
        />

        <div className="app-content">
          <div className="panel-guru-topbar">
            <button
              type="button"
              className="btn-back-dashboard"
              onClick={handleBackToHome}
              title="Kembali ke Beranda"
            >
              <span aria-hidden="true">&larr;</span>
              <span>Beranda</span>
            </button>
            <h1 className="panel-guru-topbar-title">Panel Guru</h1>
          </div>

          <TeacherDashboard
            authUser={authUser}
            onPreview5EModule={handleOpen5EStage}
          />
        </div>

        <PanelGuruModal
          isOpen={panelGuruModalOpen}
          onClose={() => setPanelGuruModalOpen(false)}
          onSuccess={handlePanelGuruSuccess}
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
  // 4. TAMPILAN BERANDA (INTRODUCTION PAGE — tanpa materi & kuis)
  // ===========================================================================
  return (
    <div className="app-layout app-layout-with-sidebar">
      {/* 1. Sidebar: Navigasi Utama + Status Akun Role KimiLab */}
      <Sidebar
        authUser={authUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        currentView="home"
        onNavigateHome={handleBackToHome}
        onOpen5EStage={handleOpen5EStage}
        onOpenPanelGuru={handleOpenPanelGuru}
        onNotify={showToast}
      />

      <div className="app-content">
      {/* Main Content Area — Introduction Page (tanpa materi & kuis) */}
      <main id="main-content">
        <IntroductionPage
          authUser={authUser}
          onStartLearning={() => handleOpen5EStage('engage')}
          onOpenPanelGuru={handleOpenPanelGuru}
        />
      </main>

      {/* Footer Identitas Pengembang */}
      <DeveloperFooter />
      </div>
      {/* /.app-content */}

      <PanelGuruModal
        isOpen={panelGuruModalOpen}
        onClose={() => setPanelGuruModalOpen(false)}
        onSuccess={handlePanelGuruSuccess}
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
