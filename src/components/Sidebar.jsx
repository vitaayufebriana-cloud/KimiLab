import { useState, useEffect, useRef } from 'react';
import { getPendingCount, syncPending } from '../lib/syncService';
import { getQuizSession } from '../lib/localStore';

const COLLAPSE_KEY = 'kimilab_sidebar_collapsed';

const IconHome = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9" />
  </svg>
);

const IconGraduationCap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 9.5 12 4l10 5.5-10 5.5L2 9.5Z" />
    <path d="M6 11.7V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.3" />
    <path d="M22 9.5V15" />
  </svg>
);

const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
    <path d="M15.2 4.9a3.2 3.2 0 0 1 0 6.2" />
    <path d="M17.7 15.4c1.6.7 2.5 2.3 2.8 4.6" />
  </svg>
);

const IconChevron = ({ collapsed }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform var(--transition-normal)' }}
  >
    <path d="m14 6-6 6 6 6" />
  </svg>
);

const IconHamburger = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

const IconClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);

const IconCloudSync = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.5 19a4.5 4.5 0 0 0 .4-8.98 6 6 0 0 0-11.7 1.62A4 4 0 0 0 7 19h10.5Z" />
    <path d="M12 12v6" />
    <path d="m9.5 15.5 2.5 2.5 2.5-2.5" />
  </svg>
);

const IconSave = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
    <path d="M17 21v-8H7v8" />
    <path d="M7 3v5h8" />
  </svg>
);

const IconFlask = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 2v7.31L4.2 20.2a1 1 0 0 0 .8 1.8h14a1 1 0 0 0 .8-1.8L14 9.31V2" />
    <path d="M8.5 2h7" />
    <path d="M7 16h10" />
  </svg>
);

/**
 * Sidebar KimiLab: navigasi utama expand/collaps di sisi kiri layar.
 * - Desktop: bisa dilebarkan (~264px) atau dipersempit jadi rail ikon (~76px),
 *   preferensi tersimpan di localStorage (kimilab_sidebar_collapsed).
 * - Mobile (<768px): off-canvas, dibuka lewat tombol ☰ pada mobile bar,
 *   ditutup lewat backdrop / tombol ✕ / tombol Escape.
 *
 * @param {{
 *   authUser?: object | null,
 *   onOpenAuth?: (mode?: 'login' | 'register' | 'forgot') => void,
 *   onLogout?: () => void,
 *   currentView?: 'home' | 'auth' | 'module-5e' | 'panel-guru',
 *   onNavigateHome?: () => void,
 *   onOpen5EStage?: (stageId: string) => void,
 *   onOpenPanelGuru?: () => void,
 *   onNotify?: (message: string) => void,
 * }} props
 */
export default function Sidebar({
  authUser = null,
  onOpenAuth = () => {},
  onLogout = () => {},
  currentView = 'home',
  onNavigateHome = () => {},
  onOpen5EStage = () => {},
  onOpenPanelGuru = () => {},
  onNotify = () => {},
}) {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = window.localStorage.getItem(COLLAPSE_KEY);
    if (saved !== null) return saved === '1';
    return window.innerWidth <= 1024;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(() => getPendingCount());
  const [syncing, setSyncing] = useState(false);
  const [saving, setSaving] = useState(false);
  const closeButtonRef = useRef(null);

  // Simpan preferensi lebar sidebar
  useEffect(() => {
    try {
      window.localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0');
    } catch {
      /* abaikan kegagalan penyimpanan preferensi */
    }
  }, [collapsed]);

  // Pantau perubahan antrean pending (enqueue / sync) dari mana pun
  useEffect(() => {
    const refresh = () => setPendingCount(getPendingCount());
    window.addEventListener('kimilab_pending_changed', refresh);
    window.addEventListener('kimilab_sync_completed', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('kimilab_pending_changed', refresh);
      window.removeEventListener('kimilab_sync_completed', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  // Auto-sync diam-diam saat pengguna sudah login (mengirim sisa antrean)
  useEffect(() => {
    if (!authUser) return undefined;
    let cancelled = false;
    syncPending()
      .then((result) => {
        if (!cancelled && result) setPendingCount(result.pending ?? 0);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [authUser]);

  // Kunci scroll body & tutup dengan Escape saat menu mobile terbuka
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);
  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const handleSyncClick = async () => {
    if (syncing) return;
    setSyncing(true);
    try {
      const result = await syncPending();
      setPendingCount(result.pending ?? 0);

      if (result.reason === 'not-signed-in') {
        onNotify('Hasil kuis belum terkirim. Masuk dengan Google (tab Siswa/Guru) di halaman login.');
      } else if (result.reason === 'empty') {
        onNotify('✅ Semua hasil kuis sudah tersinkron ke akun.');
      } else if (result.failed === 0) {
        onNotify(`✅ ${result.synced} hasil kuis terkirim ke akun.`);
      } else {
        onNotify(`Terkirim ${result.synced}, gagal ${result.failed}. Periksa koneksi lalu coba lagi.`);
      }
    } catch (err) {
      console.error('[Sidebar] Sinkronisasi gagal:', err);
      onNotify('Gagal mengirim hasil kuis. Silakan coba lagi.');
    } finally {
      setSyncing(false);
    }
  };

  const handleSaveClick = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const session = getQuizSession('asam-basa', 'v1');

      if (!session || session.status !== 'submitted') {
        onNotify('Belum ada hasil kuis yang dibekukan. Selesaikan & kirim kuis dulu.');
        return;
      }

      const { saveAttempt } = await import('../lib/cloudService');
      await saveAttempt({
        attemptId: session.attemptId,
        moduleId: session.moduleId,
        stage: 'evaluate',
        answers: session.answers,
        startedAt: session.startedAt,
        endedAt: session.submittedAt,
        score: session.score,
        version: session.version,
      });
      onNotify('✅ Hasil kuis tersimpan ke akun Google Anda.');
    } catch (err) {
      const message =
        err?.message === 'not-signed-in'
          ? 'Masuk dengan Google di halaman login agar hasil kuis bisa disimpan ke akun.'
          : `Gagal menyimpan ke akun: ${err?.message || 'periksa koneksi Anda.'}`;
      onNotify(message);
    } finally {
      setSaving(false);
    }
  };

  const navItems = [
    {
      id: 'home',
      label: 'Beranda',
      icon: <IconHome />,
      active: currentView === 'home',
      onClick: () => {
        onNavigateHome();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        closeMobile();
      },
    },
    {
      id: 'mulai-belajar',
      label: 'Mulai Belajar',
      icon: <IconGraduationCap />,
      active: currentView === 'module-5e',
      onClick: () => {
        onOpen5EStage('engage');
        closeMobile();
      },
    },
    {
      id: 'panel-guru',
      label: 'Panel Guru',
      icon: <IconUsers />,
      active: currentView === 'panel-guru',
      onClick: () => {
        onOpenPanelGuru();
        closeMobile();
      },
    },
  ];

  return (
    <>
      {/* Mobile Bar: pemicu buka sidebar di layar kecil */}
      <div className="sidebar-mobilebar">
        <button
          id="mobile-menu-toggle"
          type="button"
          className="sidebar-hamburger"
          onClick={() => setMobileOpen(true)}
          aria-label="Buka navigasi"
          aria-expanded={mobileOpen}
        >
          <IconHamburger />
        </button>
        <button
          type="button"
          className="sidebar-mobilebar-brand"
          onClick={() => {
            onNavigateHome();
            closeMobile();
          }}
          aria-label="Kembali ke Beranda"
        >
          <span className="sidebar-mobilebar-logo" aria-hidden="true">⚗️</span>
          <span className="sidebar-mobilebar-name">Kimi<span className="brand-accent">Lab</span></span>
        </button>
      </div>

      {/* Backdrop gelap saat sidebar mobile terbuka */}
      {mobileOpen && <div className="sidebar-backdrop" onClick={closeMobile} aria-hidden="true" />}

      <aside
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
        aria-label="Navigasi Utama"
      >
        {/* Brand + Tombol Collapse / Close */}
        <div className="sidebar-top">
          <button
            type="button"
            className="sidebar-brand"
            onClick={() => {
              onNavigateHome();
              closeMobile();
            }}
            title="KimiLab — Beranda"
          >
            <span className="brand-icon-box" aria-hidden="true">
              <IconFlask />
            </span>
            <span className="brand-text sidebar-label">
              <span className="brand-name">
                Kimi<span className="brand-accent">Lab</span>
              </span>
              <span className="brand-tag">Kimia SMA Interaktif • 5E</span>
            </span>
          </button>

          <button
            type="button"
            className="sidebar-collapse-btn"
            onClick={toggleCollapse}
            aria-label={collapsed ? 'Perlebar sidebar' : 'Perkecil sidebar'}
            aria-expanded={!collapsed}
            title={collapsed ? 'Perlebar sidebar' : 'Perkecil sidebar'}
          >
            <IconChevron collapsed={collapsed} />
          </button>

          <button
            type="button"
            ref={closeButtonRef}
            className="sidebar-close-btn"
            onClick={closeMobile}
            aria-label="Tutup navigasi"
          >
            <IconClose />
          </button>
        </div>

        {/* Menu Navigasi Utama */}
        <nav className="sidebar-nav" aria-label="Menu Utama">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              id={`sidebar-nav-${item.id}`}
              className={`sidebar-nav-item ${item.active ? 'active' : ''}`}
              onClick={item.onClick}
              aria-current={item.active ? 'page' : undefined}
              title={item.label}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span className="sidebar-nav-label sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bagian Akun */}
        <div className="sidebar-account">
          {authUser ? (
            <>
              <div className="sidebar-user-card" title={`Masuk sebagai ${authUser.name}`}>
                <div className="nav-user-avatar" aria-hidden="true">
                  {authUser.name ? authUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="nav-user-info sidebar-label">
                  <span className="nav-user-name">{authUser.name}</span>
                  <span className="nav-user-role">
                    {authUser.role === 'guru' ? '👨‍🏫 Guru' : `🎓 ${authUser.kelas || 'Siswa'}`}
                  </span>
                </div>
              </div>

              <div className="sidebar-user-actions">
                <button
                  type="button"
                  className="btn-nav-sync sidebar-action-btn"
                  onClick={handleSyncClick}
                  disabled={syncing}
                  title="Kirim hasil kuis yang tertunda ke akun Google Anda"
                  aria-label="Coba Kirim Lagi hasil kuis ke akun"
                >
                  <IconCloudSync />
                  <span className="sidebar-label">{syncing ? 'Mengirim…' : 'Coba Kirim Lagi'}</span>
                  {pendingCount > 0 && (
                    <span className="pending-badge" aria-label={`${pendingCount} hasil belum terkirim`}>
                      {pendingCount}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  className="btn-nav-save sidebar-action-btn"
                  onClick={handleSaveClick}
                  disabled={saving}
                  title="Simpan hasil kuis yang sudah dibekukan ke akun Google Anda"
                  aria-label="Simpan hasil kuis ke akun"
                >
                  <IconSave />
                  <span className="sidebar-label">{saving ? 'Menyimpan…' : 'Simpan ke Akun'}</span>
                </button>
                <button
                  type="button"
                  id="btn-nav-logout"
                  className="btn-nav-logout sidebar-action-btn"
                  onClick={onLogout}
                  title="Keluar dari akun dan kembali ke halaman login"
                  aria-label="Keluar dari akun"
                >
                  <IconLogout />
                  <span className="sidebar-label">Keluar</span>
                </button>
              </div>
            </>
          ) : (
            <button
              id="nav-auth-btn"
              type="button"
              className="btn-nav-login sidebar-login-btn"
              onClick={() => onOpenAuth('login')}
              title="Masuk ke Akun KimiLab"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="sidebar-label">Masuk / Akun</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
