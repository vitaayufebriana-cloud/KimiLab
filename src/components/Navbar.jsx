import { useState } from 'react';

/**
 * Navbar KimiLab dengan Identitas Media, Status Akun Role-Based,
 * Progres Belajar Asam-Basa, dan Navigasi Sintaks 5E.
 * 
 * @param {{
 *   progress: Record<string, number>,
 *   onResetProgress: () => void,
 *   authUser?: object | null,
 *   onOpenAuth?: (mode?: 'login' | 'register' | 'forgot') => void,
 *   onLogout?: () => void,
 *   currentView?: 'home' | 'auth' | 'module-5e',
 *   onNavigateHome?: () => void,
 *   onOpen5EStage?: (stageId: string) => void,
 * }} props
 */
export default function Navbar({
  progress = {},
  onResetProgress,
  authUser = null,
  onOpenAuth = () => {},
  onLogout = () => {},
  currentView = 'home',
  onNavigateHome = () => {},
  onOpen5EStage = () => {},
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Progres spesifik modul Larutan Asam-Basa
  const asamBasaProgress = progress['asam-basa'] || 0;
  const isCompleted = asamBasaProgress >= 100;

  const handleResetClick = () => {
    if (showResetConfirm) {
      onResetProgress();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 4000);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand & Media Identity */}
        <button
          type="button"
          className="brand-logo"
          onClick={() => {
            onNavigateHome();
            closeMobileMenu();
          }}
          style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
        >
          <div className="brand-icon-box" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2v7.31L4.2 20.2a1 1 0 0 0 .8 1.8h14a1 1 0 0 0 .8-1.8L14 9.31V2" />
              <path d="M8.5 2h7" />
              <path d="M7 16h10" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">
              Kimi<span className="brand-accent">Lab</span>
            </span>
            <span className="brand-tag">Kimia SMA Interaktif • 5E</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Navigasi Utama">
          <button
            type="button"
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => {
              onNavigateHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Beranda
          </button>

          <button
            type="button"
            className={`nav-link ${currentView === 'module-5e' ? 'active' : ''}`}
            onClick={() => onOpen5EStage('engage')}
          >
            Modul 5E Asam-Basa
          </button>

          <button
            type="button"
            className="nav-link"
            onClick={() => onOpen5EStage('explore')}
          >
            🔬 Lab Virtual
          </button>

          <button
            type="button"
            className="nav-link"
            onClick={() => onOpen5EStage('evaluate')}
          >
            📝 Kuis Evaluasi
          </button>

          <a href="#metode-belajar" className="nav-link">
            Metode Belajar
          </a>
        </nav>

        {/* Anonymous Progress Indicator & User Status Action */}
        <div className="nav-actions">
          <div className="progress-badge" title="Progres belajar tersimpan di browser secara lokal">
            <div className="progress-badge-header">
              <span className="status-dot-pulse"></span>
              <span className="progress-badge-label">Progres 5E</span>
            </div>
            <div className="progress-badge-bar-wrapper">
              <div
                className="progress-badge-bar"
                style={{
                  width: `${asamBasaProgress}%`,
                  background: isCompleted
                    ? 'linear-gradient(90deg, #10b981, #34d399)'
                    : 'linear-gradient(90deg, #0284c7, #38bdf8)',
                }}
              ></div>
            </div>
            <span className="progress-badge-text">
              {isCompleted ? '✓ Tuntas (100%)' : `${asamBasaProgress}% Selesai`}
            </span>
          </div>

          <button
            id="nav-reset-progress-btn"
            type="button"
            className={`btn-reset-ghost ${showResetConfirm ? 'confirming' : ''}`}
            onClick={handleResetClick}
            title="Reset data progres di localStorage"
          >
            {showResetConfirm ? 'Yakin Reset?' : 'Reset'}
          </button>

          {/* Status Akun Pengguna / Tombol Keluar */}
          {authUser ? (
            <div className="nav-user-badge">
              <div className="nav-user-avatar" title={`Masuk sebagai ${authUser.name}`}>
                {authUser.name ? authUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="nav-user-info">
                <span className="nav-user-name">{authUser.name}</span>
                <span className="nav-user-role">
                  {authUser.role === 'guru' ? '👨‍🏫 Guru' : `🎓 ${authUser.kelas || 'Siswa'}`}
                </span>
              </div>
              <button
                type="button"
                id="btn-nav-logout"
                className="btn-nav-logout"
                onClick={onLogout}
                title="Keluar dari akun dan kembali ke halaman login"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              id="nav-auth-btn"
              type="button"
              className="btn-nav-login"
              onClick={() => onOpenAuth('login')}
              title="Masuk ke Akun KimiLab"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Masuk / Akun</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle"
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-label="Menu Mobile">
          <nav className="mobile-nav-links">
            <button
              type="button"
              className="mobile-nav-link"
              onClick={() => {
                onNavigateHome();
                closeMobileMenu();
              }}
            >
              Beranda
            </button>
            <button
              type="button"
              className="mobile-nav-link"
              onClick={() => {
                onOpen5EStage('engage');
                closeMobileMenu();
              }}
            >
              Modul 5E Asam-Basa
            </button>
            <button
              type="button"
              className="mobile-nav-link"
              onClick={() => {
                onOpen5EStage('explore');
                closeMobileMenu();
              }}
            >
              🔬 Lab Virtual (Explore)
            </button>
            <button
              type="button"
              className="mobile-nav-link"
              onClick={() => {
                onOpen5EStage('evaluate');
                closeMobileMenu();
              }}
            >
              📝 Kuis Evaluasi (Evaluate)
            </button>
            <a href="#metode-belajar" className="mobile-nav-link" onClick={closeMobileMenu}>
              Metode Belajar
            </a>
          </nav>

          <div className="mobile-drawer-footer">
            {authUser ? (
              <div className="mobile-user-status">
                <span>
                  Masuk: <strong>{authUser.name}</strong> ({authUser.role === 'guru' ? 'Guru' : authUser.kelas || 'Siswa'})
                </span>
                <button
                  type="button"
                  className="btn-danger-sm"
                  onClick={() => {
                    onLogout();
                    closeMobileMenu();
                  }}
                  style={{ marginTop: '8px' }}
                >
                  Keluar Akun
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn-dash-primary"
                onClick={() => {
                  onOpenAuth('login');
                  closeMobileMenu();
                }}
                style={{ width: '100%', marginBottom: '10px' }}
              >
                🔐 Masuk / Registrasi Akun
              </button>
            )}

            <div className="mobile-progress-info">
              <span>Progres Modul 5E: {asamBasaProgress}%</span>
            </div>

            <button
              id="mobile-reset-btn"
              type="button"
              className="btn-danger-sm"
              onClick={() => {
                onResetProgress();
                closeMobileMenu();
              }}
            >
              Reset Progres Belajar (localStorage)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
