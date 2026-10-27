import { useState } from 'react';

/**
 * Navbar component dengan identitas media KimiLab, indikator progres modul asam-basa, dan menu responsif.
 * @param {{ progress: Record<string, number>, onResetProgress: () => void }} props
 */
export default function Navbar({ progress = {}, onResetProgress }) {
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
        <a href="#hero" className="brand-logo" onClick={closeMobileMenu}>
          <div className="brand-icon-box" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2v7.31L4.2 20.2a1 1 0 0 0 .8 1.8h14a1 1 0 0 0 .8-1.8L14 9.31V2" />
              <path d="M8.5 2h7" />
              <path d="M7 16h10" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">
              Kimi<span className="brand-accent">Lab</span>
            </span>
            <span className="brand-tag">Kimia SMA Interaktif</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Navigasi Utama">
          <a href="#hero" className="nav-link active">
            Beranda
          </a>
          <a href="#modul-belajar" className="nav-link">
            Modul Asam-Basa
          </a>
          <a href="#metode-belajar" className="nav-link">
            Metode Belajar
          </a>
          <a href="#tentang-media" className="nav-link">
            Tentang Media
          </a>
        </nav>

        {/* Anonymous Progress Indicator & Action */}
        <div className="nav-actions">
          <div className="progress-badge" title="Progres belajar disimpan di browser Anda secara anonim">
            <div className="progress-badge-header">
              <span className="status-dot-pulse"></span>
              <span className="progress-badge-label">Progres Asam-Basa</span>
            </div>
            <div className="progress-badge-bar-wrapper">
              <div
                className="progress-badge-bar"
                style={{
                  width: `${asamBasaProgress}%`,
                  background: isCompleted
                    ? 'linear-gradient(90deg, #10b981, #34d399)'
                    : 'linear-gradient(90deg, #8b5cf6, #38bdf8)',
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
            <a href="#hero" className="mobile-nav-link" onClick={closeMobileMenu}>
              Beranda
            </a>
            <a href="#modul-belajar" className="mobile-nav-link" onClick={closeMobileMenu}>
              Modul Asam-Basa
            </a>
            <a href="#metode-belajar" className="mobile-nav-link" onClick={closeMobileMenu}>
              Metode Belajar
            </a>
            <a href="#tentang-media" className="mobile-nav-link" onClick={closeMobileMenu}>
              Tentang Media
            </a>
          </nav>
          <div className="mobile-drawer-footer">
            <div className="mobile-progress-info">
              <span>Progres Modul Asam-Basa: {asamBasaProgress}%</span>
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
