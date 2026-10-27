import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TopicCards from './components/TopicCards';
import {
  getStoredProgress,
  saveModuleProgress,
  clearStoredProgress,
} from './utils/storageHelper';
import './App.css';

export default function App() {
  const [progress, setProgress] = useState(getStoredProgress());
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const reloadProgress = useCallback(() => {
    const current = getStoredProgress();
    setProgress(current);
  }, []);

  useEffect(() => {
    // Sinkronisasi otomatis jika event update dipicu
    const handleProgressEvent = () => reloadProgress();
    window.addEventListener('kimilab_progress_updated', handleProgressEvent);
    window.addEventListener('storage', handleProgressEvent);

    return () => {
      window.removeEventListener('kimilab_progress_updated', handleProgressEvent);
      window.removeEventListener('storage', handleProgressEvent);
    };
  }, [reloadProgress]);

  const handleUpdateProgress = (moduleId, percent) => {
    const updated = saveModuleProgress(moduleId, percent);
    setProgress(updated);
    showToast(
      percent >= 100
        ? `🎉 Selamat! Modul ${moduleId} tuntas 100%!`
        : `💾 Progres modul ${moduleId} diperbarui ke ${percent}%`
    );
  };

  const handleResetProgress = () => {
    const reset = clearStoredProgress();
    setProgress(reset);
    showToast('🔄 Seluruh data progres di localStorage berhasil dibersihkan.');
  };

  return (
    <div className="app-layout">
      {/* 1. Navbar dengan Identitas Media */}
      <Navbar progress={progress} onResetProgress={handleResetProgress} />

      {/* Main Content Area */}
      <main id="main-content">
        {/* 2. Hero Section dengan Judul & Tombol "Mulai Belajar" */}
        <HeroSection />

        {/* 3. Tiga Kartu Modul: Stoikiometri, Termokimia, Larutan Asam-Basa */}
        <TopicCards progress={progress} onUpdateProgress={handleUpdateProgress} />

        {/* Fitur & Pendekatan Pedagogi Sains SMA */}
        <section id="metode-belajar" className="method-section" aria-labelledby="method-heading">
          <div className="method-container">
            <div className="section-pill-tag">
              <span>💡 Metode Belajar KimiLab</span>
            </div>
            <h2 id="method-heading" className="method-title">
              Mengapa Belajar Kimia di KimiLab Lebih Efektif?
            </h2>
            <p className="method-subtitle">
              Dirancang dengan pendekatan pembelajaran sains kognitif modern: visualisasi mikroskopis,
              perhitungan bertahap, dan bebas tekanan registrasi.
            </p>

            <div className="method-cards-grid">
              <div className="method-card">
                <div className="method-icon-box" style={{ color: '#10b981' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3>Konseptual & Kuantitatif</h3>
                <p>
                  Mengintegrasikan pemahaman teori reaksi dengan latihan perhitungan stoikiometris terstruktur
                  menggunakan notasi rumus baku (subskrip/superskip standar).
                </p>
              </div>

              <div className="method-card">
                <div className="method-icon-box" style={{ color: '#38bdf8' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3>100% Privasi & Tanpa Login</h3>
                <p>
                  Siswa langsung belajar seketika tanpa hambatan input email atau sandi. Seluruh riwayat dan
                  progres belajar tersimpan secara anonim langsung di browser lokal Anda.
                </p>
              </div>

              <div className="method-card">
                <div className="method-icon-box" style={{ color: '#a855f7' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3>Kesiapan PAS & UTBK</h3>
                <p>
                  Materi mencakup topik paling sering keluar di ujian sekolah maupun tes seleksi masuk perguruan tinggi:
                  stoikiometri gas, entalpi reaksi pembakaran, hingga titrasi asam basa.
                </p>
              </div>
            </div>

            {/* Status Progress Banner */}
            <div className="overall-progress-banner">
              <div className="banner-text">
                <h3>Status Belajar Mandiri: Larutan Asam-Basa</h3>
                <p>
                  {(progress['asam-basa'] || 0) >= 100
                    ? '🎉 Luar biasa! Modul Larutan Asam-Basa telah kamu tuntaskan 100%!'
                    : `Progres belajar modul Larutan Asam-Basa saat ini ${progress['asam-basa'] || 0}%. Eksplorasi seluruh konsep keasaman dan titrasi!`}
                </p>
              </div>
              <div className="banner-action">
                <a href="#modul-belajar" className="btn-banner-action">
                  {(progress['asam-basa'] || 0) >= 100 ? 'Ulas Kembali Modul' : 'Lanjutkan Belajar Asam-Basa'}
                </a>
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
              Media Pembelajaran Kimia SMA Interaktif & Mandiri berbasis kurikulum sains terpadu.
              100% Client-Side Single Page Application (SPA) tanpa backend eksternal.
            </p>
            <div className="footer-legal-tag">
              Standar Notasi: IUPAC & Kemendikbudristek RI
            </div>
          </div>

          <div className="footer-links-column">
            <h4>Modul Pembelajaran</h4>
            <ul>
              <li><a href="#card-topic-asam-basa">Larutan Asam-Basa & Derajat pH</a></li>
              <li><a href="#modul-belajar">Simulator pH & Indikator</a></li>
              <li><a href="#metode-belajar">Metode Kognitif Sains</a></li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h4>Penyimpanan & Privasi</h4>
            <ul>
              <li><span>Penyimpanan: <code>localStorage</code></span></li>
              <li><span>Autentikasi: Anonim (Tanpa Sandi)</span></li>
              <li>
                <button
                  type="button"
                  className="footer-reset-link"
                  onClick={handleResetProgress}
                >
                  Bersihkan Seluruh Progres
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© 2026 KimiLab - Media Pembelajaran Kimia SMA. Dibangun dengan React 19 + Vite.</p>
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
