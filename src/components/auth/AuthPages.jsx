import { useState } from 'react';
import {
  loginUser,
  registerStudent,
  registerTeacher,
  requestPasswordReset,
  resetPassword,
  loginAsGuest,
  STANDARD_TEACHER_CODE,
} from '../../utils/authHelper';
import './AuthPages.css';

/**
 * Komponen Halaman Autentikasi KimiLab (Halaman Pertama)
 * Sesuai Permintaan Spesifikasi:
 * 1. Pilihan Role: Siswa & Guru
 * 2. Login Siswa & Login Guru terpisah dengan role-based redirect
 * 3. Registrasi Akun Siswa (Nama, Email, Username, Password, Konfirmasi, Kelas, Asal Sekolah)
 * 4. Registrasi Akun Guru (Nama, Email, Username, Password, Konfirmasi, Asal Sekolah, Kode Verifikasi)
 * 5. Lupa Kata Sandi Bertahap (Input Email -> Instruksi -> Buat Password Baru)
 * 6. Visual Laboratorium Kimia Digital (Molekul, Tabung Reaksi, Skala pH, Dark Theme)
 * 
 * @param {{
 *   initialMode?: 'login' | 'register' | 'forgot',
 *   onBackToHome?: () => void,
 *   onAuthSuccess: (user: object, message: string) => void
 * }} props
 */
export default function AuthPages({
  initialMode = 'login',
  onBackToHome,
  onAuthSuccess,
}) {
  // Mode autentikasi: 'login' | 'register' | 'forgot'
  const [mode, setMode] = useState(initialMode);
  // Role aktif: 'siswa' | 'guru'
  const [activeRole, setActiveRole] = useState('siswa');

  // Form State - Login
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Form State - Registrasi Siswa
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentUsername, setStudentUsername] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentConfirmPassword, setStudentConfirmPassword] = useState('');
  const [studentClass, setStudentClass] = useState('XI MIPA 1');
  const [studentSchool, setStudentSchool] = useState('');

  // Form State - Registrasi Guru
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherUsername, setTeacherUsername] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [teacherConfirmPassword, setTeacherConfirmPassword] = useState('');
  const [teacherSchool, setTeacherSchool] = useState('');
  const [teacherCode, setTeacherCode] = useState(STANDARD_TEACHER_CODE);

  // Form State - Lupa Kata Sandi (2 Step)
  const [forgotStep, setForgotStep] = useState(1); // 1 = input email, 2 = buat password baru
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotPwd, setShowForgotPwd] = useState(false);

  // Status Notifikasi / Alert
  const [alert, setAlert] = useState({ type: '', message: '' });

  const clearAlert = () => setAlert({ type: '', message: '' });

  // Autofill Akun Demonstrasi untuk Pengujian Instan
  const handleAutofillDemo = (role) => {
    setMode('login');
    setActiveRole(role);
    if (role === 'siswa') {
      setLoginId('siswa@kimilab.id');
      setLoginPassword('password123');
      setAlert({
        type: 'success',
        message: '⚡ Akun Siswa Demo terisi: siswa@kimilab.id / password123',
      });
    } else {
      setLoginId('guru@kimilab.id');
      setLoginPassword('password123');
      setAlert({
        type: 'success',
        message: '⚡ Akun Guru Demo terisi: guru@kimilab.id / password123',
      });
    }
  };

  // Submit Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    clearAlert();

    const res = loginUser({
      identifier: loginId,
      password: loginPassword,
      role: activeRole,
      rememberMe,
    });

    if (res.success) {
      setAlert({ type: 'success', message: res.message });
      if (onAuthSuccess) {
        onAuthSuccess(res.user, res.message);
      }
    } else {
      setAlert({ type: 'error', message: res.message });
    }
  };

  // Submit Registrasi Siswa
  const handleStudentRegisterSubmit = (e) => {
    e.preventDefault();
    clearAlert();

    if (studentPassword !== studentConfirmPassword) {
      setAlert({
        type: 'error',
        message: 'Konfirmasi kata sandi siswa tidak cocok. Mohon teliti kembali.',
      });
      return;
    }

    const res = registerStudent({
      name: studentName,
      email: studentEmail,
      username: studentUsername,
      password: studentPassword,
      kelas: studentClass,
      sekolah: studentSchool,
    });

    if (res.success) {
      setAlert({ type: 'success', message: res.message });
      if (onAuthSuccess) {
        onAuthSuccess(res.user, res.message);
      }
    } else {
      setAlert({ type: 'error', message: res.message });
    }
  };

  // Submit Registrasi Guru
  const handleTeacherRegisterSubmit = (e) => {
    e.preventDefault();
    clearAlert();

    if (teacherPassword !== teacherConfirmPassword) {
      setAlert({
        type: 'error',
        message: 'Konfirmasi kata sandi guru tidak cocok. Harap periksa kembali.',
      });
      return;
    }

    const res = registerTeacher({
      name: teacherName,
      email: teacherEmail,
      username: teacherUsername,
      password: teacherPassword,
      sekolah: teacherSchool,
      kodeVerifikasi: teacherCode,
    });

    if (res.success) {
      setAlert({ type: 'success', message: res.message });
      if (onAuthSuccess) {
        onAuthSuccess(res.user, res.message);
      }
    } else {
      setAlert({ type: 'error', message: res.message });
    }
  };

  // Submit Lupa Password - Step 1: Request Reset
  const handleForgotRequestSubmit = (e) => {
    e.preventDefault();
    clearAlert();

    const res = requestPasswordReset(forgotEmail);
    if (res.success) {
      setAlert({ type: 'success', message: res.message });
      setForgotStep(2);
    } else {
      setAlert({ type: 'error', message: res.message });
    }
  };

  // Submit Lupa Password - Step 2: Buat Password Baru
  const handleForgotSetNewSubmit = (e) => {
    e.preventDefault();
    clearAlert();

    if (forgotNewPassword !== forgotConfirmPassword) {
      setAlert({
        type: 'error',
        message: 'Konfirmasi kata sandi baru tidak sesuai.',
      });
      return;
    }

    const res = resetPassword({
      identifier: forgotEmail,
      newPassword: forgotNewPassword,
    });

    if (res.success) {
      setAlert({ type: 'success', message: res.message });
      setTimeout(() => {
        setMode('login');
        setForgotStep(1);
        setLoginId(forgotEmail);
        setLoginPassword(forgotNewPassword);
      }, 1500);
    } else {
      setAlert({ type: 'error', message: res.message });
    }
  };

  // Mode Tamu Anonim
  const handleGuestLogin = () => {
    const guest = loginAsGuest(activeRole);
    const msg = `🎉 Anda masuk sebagai ${activeRole === 'guru' ? 'Guru Tamu' : 'Siswa Tamu'}. Selamat belajar!`;
    setAlert({ type: 'success', message: msg });
    if (onAuthSuccess) {
      onAuthSuccess(guest, msg);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    clearAlert();
  };

  return (
    <div className="auth-page-wrapper">
      {/* Background Digital Lab Grid & Molecular Glow */}
      <div className="auth-digital-grid" aria-hidden="true"></div>
      <div className="auth-glow-cyan" aria-hidden="true"></div>
      <div className="auth-glow-navy" aria-hidden="true"></div>

      {/* Top Header Bar */}
      <header className="auth-top-bar">
        <div className="auth-brand-logo">
          <div className="auth-brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M10 2v7.31L4.2 20.2a1 1 0 0 0 .8 1.8h14a1 1 0 0 0 .8-1.8L14 9.31V2" />
              <path d="M8.5 2h7" />
              <path d="M7 16h10" />
            </svg>
          </div>
          <div className="auth-brand-name">
            Kimi<span>Lab</span>
            <span className="auth-brand-subtitle">Laboratorium Kimia Digital SMA</span>
          </div>
        </div>

        {/* Tab Switcher 3 Halaman Autentikasi */}
        <div className="auth-tabs-pill" role="tablist" aria-label="Navigasi Halaman Autentikasi">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
            className={`auth-tab-item ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            🔐 1. Masuk (Login)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'register'}
            className={`auth-tab-item ${mode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
          >
            📝 2. Registrasi Akun
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'forgot'}
            className={`auth-tab-item ${mode === 'forgot' ? 'active' : ''}`}
            onClick={() => switchMode('forgot')}
          >
            🔑 3. Lupa Kata Sandi
          </button>
        </div>

        {/* Quick Demo Autofill Buttons & Optional Back to Home */}
        <div className="auth-demo-actions">
          {onBackToHome && (
            <button
              type="button"
              className="auth-back-btn"
              onClick={onBackToHome}
              title="Kembali ke Beranda"
            >
              <span>← Beranda</span>
            </button>
          )}
          <button
            type="button"
            className="auth-demo-badge"
            onClick={() => handleAutofillDemo('siswa')}
            title="Uji coba cepat dengan akun siswa demo"
          >
            ⚡ Demo Siswa
          </button>
          <button
            type="button"
            className="auth-demo-badge auth-demo-teacher"
            onClick={() => handleAutofillDemo('guru')}
            title="Uji coba cepat dengan akun guru demo"
          >
            👨‍🏫 Demo Guru
          </button>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="auth-main-card">
        {/* Panel Kiri: Ilustrasi Visual Laboratorium Digital 5E */}
        <div className="auth-visual-panel">
          <div className="auth-visual-overlay"></div>

          {/* Molecular Floating Elements */}
          <div className="molecule-particle m-1" aria-hidden="true">
            <span>H⁺</span>
          </div>
          <div className="molecule-particle m-2" aria-hidden="true">
            <span>OH⁻</span>
          </div>
          <div className="molecule-particle m-3" aria-hidden="true">
            <span>pH</span>
          </div>
          <div className="molecule-particle m-4" aria-hidden="true">
            <span>H₂O</span>
          </div>

          <div className="auth-visual-content">
            <div className="auth-role-tag">
              <span>🔬 MEDIA PEMBELAJARAN KIMIA KELAS XI</span>
            </div>

            <h2 className="auth-visual-title">
              {mode === 'login' && 'PORTAL MASUK KIMILAB'}
              {mode === 'register' && 'GABUNG LABORATORIUM DIGITAL'}
              {mode === 'forgot' && 'PULIHKAN AKSES AKUN'}
            </h2>

            <p className="auth-visual-desc">
              Platform pembelajaran kimia interaktif materi <strong>Larutan Asam-Basa</strong> berbasis sintaks
              <strong> Learning Cycle 5E</strong> (Engage, Explore, Explain, Elaborate, Evaluate) dengan representasi
              makroskopik, submikroskopik, dan simbolik.
            </p>

            <div className="auth-5e-mini-flow">
              <div className="flow-step">
                <span className="dot dot-1"></span>
                <span>💡 Engage</span>
              </div>
              <div className="flow-sep">→</div>
              <div className="flow-step">
                <span className="dot dot-2"></span>
                <span>🔬 Explore</span>
              </div>
              <div className="flow-sep">→</div>
              <div className="flow-step">
                <span className="dot dot-3"></span>
                <span>📚 Explain</span>
              </div>
              <div className="flow-sep">→</div>
              <div className="flow-step">
                <span className="dot dot-4"></span>
                <span>🧪 Elaborate</span>
              </div>
              <div className="flow-sep">→</div>
              <div className="flow-step">
                <span className="dot dot-5"></span>
                <span>📝 Evaluate</span>
              </div>
            </div>

            <div className="auth-visual-features">
              <div className="feat-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Simulasi pH & Laboratorium Virtual Interaktif</span>
              </div>
              <div className="feat-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Studi Kasus HOTS: Limbah Cair Industri Tahu</span>
              </div>
              <div className="feat-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Evaluasi Kognitif C4–C5 & Pembahasan Ilmiah</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Kanan: Formulir Interaktif Berdasarkan Role */}
        <div className="auth-form-panel">
          <div className="auth-form-container">
            {/* Alert Notifikasi */}
            {alert.message && (
              <div className={`auth-alert-box ${alert.type}`} role="alert">
                <span className="alert-icon">
                  {alert.type === 'success' ? '✓' : '⚠️'}
                </span>
                <span>{alert.message}</span>
              </div>
            )}

            {/* Role Switcher Tab (Siswa vs Guru) */}
            <div className="role-switcher-card" role="group" aria-label="Pilih Jenis Pengguna">
              <span className="role-switcher-label">Pilih Jenis Pengguna:</span>
              <div className="role-switcher-buttons">
                <button
                  type="button"
                  id="tab-role-siswa"
                  className={`role-btn ${activeRole === 'siswa' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveRole('siswa');
                    clearAlert();
                  }}
                  aria-pressed={activeRole === 'siswa'}
                >
                  <span className="role-icon">🎓</span>
                  <span>Siswa SMA</span>
                </button>
                <button
                  type="button"
                  id="tab-role-guru"
                  className={`role-btn ${activeRole === 'guru' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveRole('guru');
                    clearAlert();
                  }}
                  aria-pressed={activeRole === 'guru'}
                >
                  <span className="role-icon">👨‍🏫</span>
                  <span>Guru / Pendidik</span>
                </button>
              </div>
            </div>

            {/* =============================================================
                1. HALAMAN LOGIN (SIGN IN) - SISWA ATAU GURU
                ============================================================= */}
            {mode === 'login' && (
              <form onSubmit={handleLoginSubmit} noValidate className="auth-form">
                <div className="form-header-row">
                  <h1 className="auth-form-title">
                    Masuk sebagai {activeRole === 'guru' ? 'Guru' : 'Siswa'}
                  </h1>
                  <span className="role-badge-pill">
                    {activeRole === 'guru' ? 'Portal Pendidik' : 'Portal Belajar Siswa'}
                  </span>
                </div>
                <p className="auth-form-subtitle">
                  {activeRole === 'guru'
                    ? 'Kelola daftar siswa, pantau perkembangan belajar sintaks 5E, dan analisis hasil kuis evaluasi.'
                    : 'Akses modul pembelajaran asam-basa, jalankan simulasi lab, dan simpan catatan kemajuan belajarmu.'}
                </p>

                {/* Input Email / Username */}
                <div className="auth-input-group">
                  <label htmlFor="login-identifier" className="auth-input-label">
                    Email atau Username
                  </label>
                  <div className="auth-input-box">
                    <span className="auth-input-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <input
                      id="login-identifier"
                      type="text"
                      className="auth-input-field"
                      placeholder={activeRole === 'guru' ? 'guru@kimilab.id atau username' : 'siswa@kimilab.id atau username'}
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      required
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Input Password */}
                <div className="auth-input-group">
                  <label htmlFor="login-password" className="auth-input-label">
                    Kata Sandi
                  </label>
                  <div className="auth-input-box">
                    <span className="auth-input-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                    <input
                      id="login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      className="auth-input-field"
                      placeholder="Masukkan kata sandi akun"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="auth-toggle-pwd-btn"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showLoginPassword ? 'Sembunyikan' : 'Tampilkan'}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Lupa Password */}
                <div className="auth-options-row">
                  <label className="auth-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Ingat sesi saya</span>
                  </label>

                  <button
                    type="button"
                    className="auth-forgot-link"
                    onClick={() => switchMode('forgot')}
                  >
                    Lupa Kata Sandi?
                  </button>
                </div>

                {/* Tombol Login Utama */}
                <button type="submit" id="btn-submit-login" className="auth-btn-primary">
                  <span>Masuk ke {activeRole === 'guru' ? 'Beranda Guru' : 'Beranda Siswa'}</span>
                  <span aria-hidden="true">→</span>
                </button>

                {/* Mode Tamu Instan */}
                <div className="auth-divider">
                  <span>Atau Akses Cepat</span>
                </div>

                <button
                  type="button"
                  className="auth-btn-guest"
                  onClick={handleGuestLogin}
                  title="Belajar langsung tanpa registrasi akun"
                >
                  <span>⚡ Masuk Cepat sebagai {activeRole === 'guru' ? 'Guru Tamu' : 'Siswa Tamu'}</span>
                </button>

                {/* Switch to Registration */}
                <div className="auth-footer-prompt">
                  <span>Belum memiliki akun {activeRole === 'guru' ? 'Guru' : 'Siswa'}?</span>
                  <button
                    type="button"
                    className="auth-switch-link"
                    onClick={() => switchMode('register')}
                  >
                    Daftar Akun Baru
                  </button>
                </div>
              </form>
            )}

            {/* =============================================================
                2. HALAMAN REGISTRASI (SIGN UP) - DUA FORM SPESIFIK ROLE
                ============================================================= */}
            {mode === 'register' && (
              <div className="auth-form">
                <div className="form-header-row">
                  <h1 className="auth-form-title">
                    Registrasi Akun {activeRole === 'guru' ? 'Guru' : 'Siswa'}
                  </h1>
                  <span className="role-badge-pill">
                    {activeRole === 'guru' ? 'Akun Pendidik' : 'Akun Pelajar'}
                  </span>
                </div>
                <p className="auth-form-subtitle">
                  {activeRole === 'guru'
                    ? 'Daftarkan profil guru untuk memantau progres belajar siswa secara terpusat.'
                    : 'Daftarkan diri untuk menyimpan riwayat tahapan 5E dan hasil nilai kuis kimia.'}
                </p>

                {/* FORM REGISTRASI SISWA */}
                {activeRole === 'siswa' ? (
                  <form onSubmit={handleStudentRegisterSubmit} noValidate>
                    <div className="auth-form-grid">
                      <div className="auth-input-group">
                        <label htmlFor="std-name" className="auth-input-label">Nama Lengkap</label>
                        <input
                          id="std-name"
                          type="text"
                          className="auth-input-field"
                          placeholder="Contoh: Ahmad Fauzan"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="auth-input-group">
                        <label htmlFor="std-email" className="auth-input-label">Alamat Email</label>
                        <input
                          id="std-email"
                          type="email"
                          className="auth-input-field"
                          placeholder="siswa@sekolah.sch.id"
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="auth-form-grid">
                      <div className="auth-input-group">
                        <label htmlFor="std-username" className="auth-input-label">Username</label>
                        <input
                          id="std-username"
                          type="text"
                          className="auth-input-field"
                          placeholder="ahmad_fauzan"
                          value={studentUsername}
                          onChange={(e) => setStudentUsername(e.target.value)}
                          required
                          autoComplete="username"
                        />
                      </div>

                      <div className="auth-input-group">
                        <label htmlFor="std-class" className="auth-input-label">Kelas</label>
                        <select
                          id="std-class"
                          className="auth-input-field auth-select"
                          value={studentClass}
                          onChange={(e) => setStudentClass(e.target.value)}
                        >
                          <option value="XI MIPA 1">XI MIPA 1</option>
                          <option value="XI MIPA 2">XI MIPA 2</option>
                          <option value="XI MIPA 3">XI MIPA 3</option>
                          <option value="XI MIPA 4">XI MIPA 4</option>
                          <option value="XI F-1">XI Fase F-1 (Kurikulum Merdeka)</option>
                          <option value="XI F-2">XI Fase F-2 (Kurikulum Merdeka)</option>
                        </select>
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label htmlFor="std-school" className="auth-input-label">Asal Sekolah</label>
                      <input
                        id="std-school"
                        type="text"
                        className="auth-input-field"
                        placeholder="Contoh: SMAN 1 Kimia Digital"
                        value={studentSchool}
                        onChange={(e) => setStudentSchool(e.target.value)}
                        required
                      />
                    </div>

                    <div className="auth-form-grid">
                      <div className="auth-input-group">
                        <label htmlFor="std-pwd" className="auth-input-label">Kata Sandi</label>
                        <input
                          id="std-pwd"
                          type="password"
                          className="auth-input-field"
                          placeholder="Minimal 6 karakter"
                          value={studentPassword}
                          onChange={(e) => setStudentPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                        />
                      </div>

                      <div className="auth-input-group">
                        <label htmlFor="std-confirm-pwd" className="auth-input-label">Konfirmasi Kata Sandi</label>
                        <input
                          id="std-confirm-pwd"
                          type="password"
                          className="auth-input-field"
                          placeholder="Ketik ulang kata sandi"
                          value={studentConfirmPassword}
                          onChange={(e) => setStudentConfirmPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                        />
                      </div>
                    </div>

                    <button type="submit" id="btn-submit-register-student" className="auth-btn-primary" style={{ marginTop: '14px' }}>
                      <span>Daftar Akun Siswa & Mulai Belajar</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </form>
                ) : (
                  /* FORM REGISTRASI GURU */
                  <form onSubmit={handleTeacherRegisterSubmit} noValidate>
                    <div className="auth-form-grid">
                      <div className="auth-input-group">
                        <label htmlFor="tch-name" className="auth-input-label">Nama Lengkap & Gelar</label>
                        <input
                          id="tch-name"
                          type="text"
                          className="auth-input-field"
                          placeholder="Contoh: Dra. Nurul Hidayati, M.Pd."
                          value={teacherName}
                          onChange={(e) => setTeacherName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="auth-input-group">
                        <label htmlFor="tch-email" className="auth-input-label">Alamat Email Guru</label>
                        <input
                          id="tch-email"
                          type="email"
                          className="auth-input-field"
                          placeholder="guru@sekolah.sch.id"
                          value={teacherEmail}
                          onChange={(e) => setTeacherEmail(e.target.value)}
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="auth-form-grid">
                      <div className="auth-input-group">
                        <label htmlFor="tch-username" className="auth-input-label">Username</label>
                        <input
                          id="tch-username"
                          type="text"
                          className="auth-input-field"
                          placeholder="nurul_hidayati"
                          value={teacherUsername}
                          onChange={(e) => setTeacherUsername(e.target.value)}
                          required
                          autoComplete="username"
                        />
                      </div>

                      <div className="auth-input-group">
                        <label htmlFor="tch-school" className="auth-input-label">Asal Sekolah</label>
                        <input
                          id="tch-school"
                          type="text"
                          className="auth-input-field"
                          placeholder="Contoh: SMAN 1 Kimia Digital"
                          value={teacherSchool}
                          onChange={(e) => setTeacherSchool(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label htmlFor="tch-code" className="auth-input-label">
                        Kode Validasi Akun Guru
                        <span className="code-hint"> (Kode standar: <code>{STANDARD_TEACHER_CODE}</code>)</span>
                      </label>
                      <input
                        id="tch-code"
                        type="text"
                        className="auth-input-field auth-code-input"
                        placeholder="Masukkan kode verifikasi pendidik"
                        value={teacherCode}
                        onChange={(e) => setTeacherCode(e.target.value)}
                        required
                      />
                    </div>

                    <div className="auth-form-grid">
                      <div className="auth-input-group">
                        <label htmlFor="tch-pwd" className="auth-input-label">Kata Sandi</label>
                        <input
                          id="tch-pwd"
                          type="password"
                          className="auth-input-field"
                          placeholder="Minimal 6 karakter"
                          value={teacherPassword}
                          onChange={(e) => setTeacherPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                        />
                      </div>

                      <div className="auth-input-group">
                        <label htmlFor="tch-confirm-pwd" className="auth-input-label">Konfirmasi Kata Sandi</label>
                        <input
                          id="tch-confirm-pwd"
                          type="password"
                          className="auth-input-field"
                          placeholder="Ketik ulang kata sandi"
                          value={teacherConfirmPassword}
                          onChange={(e) => setTeacherConfirmPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                        />
                      </div>
                    </div>

                    <button type="submit" id="btn-submit-register-teacher" className="auth-btn-primary" style={{ marginTop: '14px' }}>
                      <span>Daftar Akun Guru & Masuk Dashboard</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </form>
                )}

                <div className="auth-footer-prompt">
                  <span>Sudah memiliki akun terdaftar?</span>
                  <button
                    type="button"
                    className="auth-switch-link"
                    onClick={() => switchMode('login')}
                  >
                    Masuk ke Akun
                  </button>
                </div>
              </div>
            )}

            {/* =============================================================
                3. HALAMAN LUPA KATA SANDI (FORGOT PASSWORD) - 2 STEP
                ============================================================= */}
            {mode === 'forgot' && (
              <div className="auth-form">
                <div className="form-header-row">
                  <h1 className="auth-form-title">Pemulihan Kata Sandi</h1>
                  <span className="role-badge-pill">Step {forgotStep} dari 2</span>
                </div>

                {forgotStep === 1 ? (
                  // Step 1: Input Email Terdaftar
                  <form onSubmit={handleForgotRequestSubmit} noValidate>
                    <p className="auth-form-subtitle">
                      Masukkan alamat email terdaftar akun KimiLab Anda. Sistem akan memvalidasi akun dan membuka formulir pembuatan kata sandi baru.
                    </p>

                    <div className="auth-input-group">
                      <label htmlFor="forgot-email-input" className="auth-input-label">
                        Email atau Username Terdaftar
                      </label>
                      <div className="auth-input-box">
                        <span className="auth-input-icon" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                        </span>
                        <input
                          id="forgot-email-input"
                          type="text"
                          className="auth-input-field"
                          placeholder="Masukkan email (mis: siswa@kimilab.id)"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" id="btn-request-reset" className="auth-btn-primary" style={{ marginTop: '16px' }}>
                      <span>Kirim Instruksi & Buka Reset Sandi</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </form>
                ) : (
                  // Step 2: Buat Kata Sandi Baru
                  <form onSubmit={handleForgotSetNewSubmit} noValidate>
                    <p className="auth-form-subtitle">
                      Akun terverifikasi untuk <strong>{forgotEmail}</strong>. Silakan buat dan konfirmasi kata sandi baru Anda.
                    </p>

                    <div className="auth-input-group">
                      <label htmlFor="new-pwd-input" className="auth-input-label">
                        Kata Sandi Baru
                      </label>
                      <div className="auth-input-box">
                        <input
                          id="new-pwd-input"
                          type={showForgotPwd ? 'text' : 'password'}
                          className="auth-input-field"
                          placeholder="Minimal 6 karakter baru"
                          value={forgotNewPassword}
                          onChange={(e) => setForgotNewPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="auth-toggle-pwd-btn"
                          onClick={() => setShowForgotPwd(!showForgotPwd)}
                        >
                          {showForgotPwd ? 'Tutup' : 'Lihat'}
                        </button>
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label htmlFor="confirm-new-pwd-input" className="auth-input-label">
                        Konfirmasi Kata Sandi Baru
                      </label>
                      <div className="auth-input-box">
                        <input
                          id="confirm-new-pwd-input"
                          type={showForgotPwd ? 'text' : 'password'}
                          className="auth-input-field"
                          placeholder="Ketik ulang kata sandi baru"
                          value={forgotConfirmPassword}
                          onChange={(e) => setForgotConfirmPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                        />
                      </div>
                    </div>

                    <button type="submit" id="btn-save-new-pwd" className="auth-btn-primary" style={{ marginTop: '16px' }}>
                      <span>Simpan Kata Sandi Baru</span>
                      <span aria-hidden="true">✓</span>
                    </button>
                  </form>
                )}

                <div className="auth-footer-prompt">
                  <span>Sudah mengingat kata sandi Anda?</span>
                  <button
                    type="button"
                    className="auth-switch-link"
                    onClick={() => {
                      switchMode('login');
                      setForgotStep(1);
                    }}
                  >
                    Kembali ke Halaman Masuk
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Info KimiLab */}
      <footer className="auth-footer-note">
        <span>KimiLab SMA • Standar IUPAC & Pendekatan Pedagogi Sains 5E • 100% Client-Side Local-First</span>
      </footer>
    </div>
  );
}
