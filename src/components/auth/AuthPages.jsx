import { useState } from 'react';
import {
  loginUser,
  registerStudent,
  registerTeacher,
  requestPasswordReset,
  resetPassword,
  loginWithGoogleProfile,
  STANDARD_TEACHER_CODE,
} from '../../utils/authHelper';
import './AuthPages.css';

export default function AuthPages({ initialMode = 'login', onBackToHome, onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [registerRole, setRegisterRole] = useState('siswa');

  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [googleTeacherCode, setGoogleTeacherCode] = useState('');

  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentUsername, setStudentUsername] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentConfirmPassword, setStudentConfirmPassword] = useState('');
  const [studentClass, setStudentClass] = useState('XI MIPA 1');
  const [studentSchool, setStudentSchool] = useState('');

  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherUsername, setTeacherUsername] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [teacherConfirmPassword, setTeacherConfirmPassword] = useState('');
  const [teacherSchool, setTeacherSchool] = useState('');
  const [teacherCode, setTeacherCode] = useState(STANDARD_TEACHER_CODE);

  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotPwd, setShowForgotPwd] = useState(false);

  const [alert, setAlert] = useState({ type: '', message: '' });
  const [googleLoading, setGoogleLoading] = useState(false);

  const clearAlert = () => setAlert({ type: '', message: '' });

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setAlert({ type: '', message: '' });
    if (nextMode === 'forgot') setForgotStep(1);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    clearAlert();

    const result = loginUser({ identifier: loginId, password: loginPassword });
    if (!result.success) {
      setAlert({ type: 'error', message: result.message });
      return;
    }

    setAlert({ type: 'success', message: result.message });
    onAuthSuccess?.(result.user, result.message);
  };

  const handleGoogleLogin = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);
    clearAlert();

    try {
      const { googleLogin, firebaseSignOut } = await import('../../lib/firebaseService');
      const result = await googleLogin();

      if (!result.success) {
        setAlert({ type: 'error', message: result.message });
        return;
      }

      const local = loginWithGoogleProfile({
        name: result.user.displayName,
        email: result.user.email,
        teacherCode: googleTeacherCode,
      });

      if (!local.success) {
        await firebaseSignOut();
        setAlert({ type: 'error', message: local.message });
        return;
      }

      setAlert({ type: 'success', message: local.message });
      onAuthSuccess?.(local.user, local.message);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error?.message || 'Gagal masuk dengan Google. Silakan coba lagi.',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleStudentRegisterSubmit = (event) => {
    event.preventDefault();
    clearAlert();

    if (studentPassword !== studentConfirmPassword) {
      setAlert({ type: 'error', message: 'Konfirmasi kata sandi tidak cocok.' });
      return;
    }

    const result = registerStudent({
      name: studentName,
      email: studentEmail,
      username: studentUsername,
      password: studentPassword,
      kelas: studentClass,
      sekolah: studentSchool,
    });

    if (!result.success) {
      setAlert({ type: 'error', message: result.message });
      return;
    }

    setAlert({ type: 'success', message: result.message });
    onAuthSuccess?.(result.user, result.message);
  };

  const handleTeacherRegisterSubmit = (event) => {
    event.preventDefault();
    clearAlert();

    if (teacherPassword !== teacherConfirmPassword) {
      setAlert({ type: 'error', message: 'Konfirmasi kata sandi tidak cocok.' });
      return;
    }

    const result = registerTeacher({
      name: teacherName,
      email: teacherEmail,
      username: teacherUsername,
      password: teacherPassword,
      sekolah: teacherSchool,
      kodeVerifikasi: teacherCode,
    });

    if (!result.success) {
      setAlert({ type: 'error', message: result.message });
      return;
    }

    setAlert({ type: 'success', message: result.message });
    onAuthSuccess?.(result.user, result.message);
  };

  const handleForgotRequestSubmit = (event) => {
    event.preventDefault();
    clearAlert();

    const result = requestPasswordReset(forgotEmail);
    if (!result.success) {
      setAlert({ type: 'error', message: result.message });
      return;
    }

    setAlert({ type: 'success', message: result.message });
    setForgotEmail(result.identifier);
    setForgotStep(2);
  };

  const handleForgotSetNewSubmit = (event) => {
    event.preventDefault();
    clearAlert();

    if (forgotNewPassword !== forgotConfirmPassword) {
      setAlert({ type: 'error', message: 'Konfirmasi kata sandi baru tidak sesuai.' });
      return;
    }

    const result = resetPassword({
      identifier: forgotEmail,
      newPassword: forgotNewPassword,
    });

    if (!result.success) {
      setAlert({ type: 'error', message: result.message });
      return;
    }

    setLoginId(forgotEmail);
    setLoginPassword(forgotNewPassword);
    setForgotNewPassword('');
    setForgotConfirmPassword('');
    setForgotStep(1);
    setMode('login');
    setAlert({ type: 'success', message: result.message });
  };

  const renderWatermarks = () => (
    <div className="auth-watermarks" aria-hidden="true">
      <svg className="auth-watermark auth-watermark-flask" viewBox="0 0 120 150" fill="none">
        <path d="M45 18h30M52 18v42L22 116a10 10 0 0 0 9 15h58a10 10 0 0 0 9-15L68 60V18" />
        <path d="M36 104h48" />
        <circle cx="54" cy="119" r="4" />
        <circle cx="70" cy="126" r="3" />
      </svg>
      <svg className="auth-watermark auth-watermark-ring" viewBox="0 0 140 140" fill="none">
        <path d="M70 16l47 27v54l-47 27-47-27V43z" />
        <circle cx="70" cy="70" r="27" />
        <path d="M70 43v54M46 56l48 28M94 56L46 84" />
      </svg>
      <svg className="auth-watermark auth-watermark-atom" viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="8" />
        <ellipse cx="70" cy="70" rx="52" ry="20" />
        <ellipse cx="70" cy="70" rx="52" ry="20" transform="rotate(60 70 70)" />
        <ellipse cx="70" cy="70" rx="52" ry="20" transform="rotate(120 70 70)" />
      </svg>
    </div>
  );

  return (
    <div className="auth-page">
      {renderWatermarks()}

      <div className="auth-shell">
        <header className="auth-header">
          <div className="auth-brand">
            <svg className="auth-brand-icon" viewBox="0 0 48 48" aria-hidden="true">
              <polygon points="24,3 42,13.5 42,34.5 24,45 6,34.5 6,13.5" fill="none" stroke="#00529C" strokeWidth="2.4" />
              <ellipse cx="24" cy="24" rx="17" ry="6.5" fill="none" stroke="#FACC15" strokeWidth="2.2" transform="rotate(-28 24 24)" />
              <ellipse cx="24" cy="24" rx="17" ry="6.5" fill="none" stroke="#FACC15" strokeWidth="2.2" transform="rotate(28 24 24)" />
              <circle cx="24" cy="24" r="4" fill="#00529C" />
              <text x="24" y="27.5" textAnchor="middle" fontSize="6" fontWeight="800" fill="#FFFFFF">K</text>
            </svg>
            <span className="auth-brand-name">
              <span className="auth-brand-kimi">Kimi</span>
              <span className="auth-brand-lab">Lab</span>
            </span>
          </div>
          <h1 className="auth-heading">Selamat Datang di KimiLab</h1>
          <p className="auth-subheading">Masuk untuk melanjutkan pembelajaran kimia Anda.</p>
        </header>

        <main className="auth-card" aria-label="Halaman autentikasi KimiLab">
          <div className="auth-view" key={`${mode}-${mode === 'forgot' ? forgotStep : 'main'}`}>
            {alert.message && (
              <div
                className={`auth-alert auth-alert-${alert.type}`}
                role={alert.type === 'error' ? 'alert' : 'status'}
              >
                {alert.message}
              </div>
            )}

            {mode === 'login' && (
              <form className="auth-form" onSubmit={handleLoginSubmit}>
                <div className="auth-field">
                  <label htmlFor="login-identifier">Email/Username</label>
                  <div className="auth-input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      id="login-identifier"
                      type="text"
                      placeholder="Email atau Nama Pengguna"
                      value={loginId}
                      onChange={(event) => setLoginId(event.target.value)}
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label htmlFor="login-password">Password</label>
                  <div className="auth-input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="4" y="10" width="16" height="11" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                    <input
                      id="login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      placeholder="Kata Sandi"
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="auth-eye"
                      onClick={() => setShowLoginPassword((visible) => !visible)}
                      aria-label={showLoginPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                      aria-pressed={showLoginPassword}
                    >
                      {showLoginPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                          <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5 0 9 4.5 9 7 0 1-.7 2.4-1.9 3.7M6.3 6.5C4.3 7.9 3 9.7 3 12c0 2.5 4 7 9 7 1.5 0 2.9-.4 4.1-1" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button type="submit" className="auth-primary-btn">Masuk</button>

                <button type="button" className="auth-text-link auth-forgot-link" onClick={() => switchMode('forgot')}>
                  Lupa Sandi?
                </button>

                <div className="auth-divider"><span>atau</span></div>

                <button type="button" className="auth-google-btn" onClick={handleGoogleLogin} disabled={googleLoading}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
                    <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29a11.86 11.86 0 0 0 0 10.76l3.98-3.09z" />
                    <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.88 8.87 4.77 12 4.77z" />
                  </svg>
                  <span>{googleLoading ? 'Menghubungkan ke Google…' : 'Masuk dengan Google'}</span>
                </button>

                <details className="auth-google-teacher">
                  <summary>Instruktur? Verifikasi akun guru Google</summary>
                  <label htmlFor="google-teacher-code">Kode Verifikasi Guru</label>
                  <input
                    id="google-teacher-code"
                    type="text"
                    placeholder="Isi hanya untuk akun guru baru"
                    value={googleTeacherCode}
                    onChange={(event) => setGoogleTeacherCode(event.target.value)}
                    autoComplete="off"
                  />
                  <p>Tanpa kode, akun Google baru didaftarkan sebagai siswa.</p>
                </details>

                <p className="auth-bottom-prompt">
                  Belum punya akun?{' '}
                  <button type="button" className="auth-text-link auth-inline-link" onClick={() => switchMode('register')}>
                    Daftar Sekarang
                  </button>
                </p>
              </form>
            )}

            {mode === 'register' && (
              <div className="auth-panel">
                <h2 className="auth-view-title">Buat Akun KimiLab</h2>
                <p className="auth-view-subtitle">Pilih peran Anda, lalu lengkapi data pendaftaran.</p>

                <div className="auth-role-choice" role="group" aria-label="Pilih peran saat registrasi">
                  <button
                    type="button"
                    aria-pressed={registerRole === 'siswa'}
                    className={registerRole === 'siswa' ? 'active' : ''}
                    onClick={() => {
                      setRegisterRole('siswa');
                      clearAlert();
                    }}
                  >
                    Siswa
                  </button>
                  <button
                    type="button"
                    aria-pressed={registerRole === 'guru'}
                    className={registerRole === 'guru' ? 'active' : ''}
                    onClick={() => {
                      setRegisterRole('guru');
                      clearAlert();
                    }}
                  >
                    Guru
                  </button>
                </div>

                {registerRole === 'siswa' ? (
                  <form className="auth-form" onSubmit={handleStudentRegisterSubmit}>
                    <div className="auth-field">
                      <label htmlFor="std-name">Nama Lengkap</label>
                      <input id="std-name" type="text" placeholder="Contoh: Ahmad Fauzan" value={studentName} onChange={(event) => setStudentName(event.target.value)} required />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="std-email">Email</label>
                      <input id="std-email" type="email" placeholder="siswa@sekolah.sch.id" value={studentEmail} onChange={(event) => setStudentEmail(event.target.value)} autoComplete="email" required />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="std-username">Username</label>
                      <input id="std-username" type="text" placeholder="ahmad_fauzan" value={studentUsername} onChange={(event) => setStudentUsername(event.target.value)} autoComplete="username" required />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="std-class">Kelas</label>
                      <select id="std-class" value={studentClass} onChange={(event) => setStudentClass(event.target.value)}>
                        <option value="XI MIPA 1">XI MIPA 1</option>
                        <option value="XI MIPA 2">XI MIPA 2</option>
                        <option value="XI MIPA 3">XI MIPA 3</option>
                        <option value="XI MIPA 4">XI MIPA 4</option>
                        <option value="XI F-1">XI Fase F-1 (Kurikulum Merdeka)</option>
                        <option value="XI F-2">XI Fase F-2 (Kurikulum Merdeka)</option>
                      </select>
                    </div>
                    <div className="auth-field">
                      <label htmlFor="std-school">Asal Sekolah</label>
                      <input id="std-school" type="text" placeholder="Contoh: SMAN 1 Kimia Digital" value={studentSchool} onChange={(event) => setStudentSchool(event.target.value)} required />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="std-pwd">Password</label>
                      <input id="std-pwd" type="password" placeholder="Minimal 6 karakter" value={studentPassword} onChange={(event) => setStudentPassword(event.target.value)} autoComplete="new-password" required />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="std-confirm-pwd">Konfirmasi Password</label>
                      <input id="std-confirm-pwd" type="password" placeholder="Ketik ulang kata sandi" value={studentConfirmPassword} onChange={(event) => setStudentConfirmPassword(event.target.value)} autoComplete="new-password" required />
                    </div>
                    <button type="submit" className="auth-primary-btn">Daftar sebagai Siswa</button>
                  </form>
                ) : (
                  <form className="auth-form" onSubmit={handleTeacherRegisterSubmit}>
                    <div className="auth-field">
                      <label htmlFor="tch-name">Nama Lengkap & Gelar</label>
                      <input id="tch-name" type="text" placeholder="Contoh: Dra. Nurul Hidayati, M.Pd." value={teacherName} onChange={(event) => setTeacherName(event.target.value)} required />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="tch-email">Email</label>
                      <input id="tch-email" type="email" placeholder="guru@sekolah.sch.id" value={teacherEmail} onChange={(event) => setTeacherEmail(event.target.value)} autoComplete="email" required />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="tch-username">Username</label>
                      <input id="tch-username" type="text" placeholder="nurul_hidayati" value={teacherUsername} onChange={(event) => setTeacherUsername(event.target.value)} autoComplete="username" required />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="tch-school">Asal Sekolah</label>
                      <input id="tch-school" type="text" placeholder="Contoh: SMAN 1 Kimia Digital" value={teacherSchool} onChange={(event) => setTeacherSchool(event.target.value)} required />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="tch-code">Kode Verifikasi Guru</label>
                      <input id="tch-code" type="text" placeholder={STANDARD_TEACHER_CODE} value={teacherCode} onChange={(event) => setTeacherCode(event.target.value)} required />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="tch-pwd">Password</label>
                      <input id="tch-pwd" type="password" placeholder="Minimal 6 karakter" value={teacherPassword} onChange={(event) => setTeacherPassword(event.target.value)} autoComplete="new-password" required />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="tch-confirm-pwd">Konfirmasi Password</label>
                      <input id="tch-confirm-pwd" type="password" placeholder="Ketik ulang kata sandi" value={teacherConfirmPassword} onChange={(event) => setTeacherConfirmPassword(event.target.value)} autoComplete="new-password" required />
                    </div>
                    <button type="submit" className="auth-primary-btn">Daftar sebagai Guru</button>
                  </form>
                )}

                <p className="auth-bottom-prompt">
                  Sudah memiliki akun?{' '}
                  <button type="button" className="auth-text-link auth-inline-link" onClick={() => switchMode('login')}>
                    Masuk
                  </button>
                </p>
              </div>
            )}

            {mode === 'forgot' && (
              <div className="auth-panel">
                <h2 className="auth-view-title">Lupa Sandi?</h2>
                <p className="auth-view-subtitle">
                  {forgotStep === 1
                    ? 'Masukkan email terdaftar untuk menyiapkan kata sandi baru.'
                    : `Email ${forgotEmail} telah diverifikasi. Buat kata sandi baru Anda.`}
                </p>

                {forgotStep === 1 ? (
                  <form className="auth-form" onSubmit={handleForgotRequestSubmit}>
                    <div className="auth-field">
                      <label htmlFor="forgot-email">Email</label>
                      <input id="forgot-email" type="email" placeholder="nama@sekolah.sch.id" value={forgotEmail} onChange={(event) => setForgotEmail(event.target.value)} autoComplete="email" required />
                    </div>
                    <button type="submit" className="auth-primary-btn">Kirim Link Reset Sandi</button>
                  </form>
                ) : (
                  <form className="auth-form" onSubmit={handleForgotSetNewSubmit}>
                    <div className="auth-field">
                      <label htmlFor="forgot-new-pwd">Kata Sandi Baru</label>
                      <div className="auth-input-wrap">
                        <input id="forgot-new-pwd" type={showForgotPwd ? 'text' : 'password'} placeholder="Minimal 6 karakter" value={forgotNewPassword} onChange={(event) => setForgotNewPassword(event.target.value)} autoComplete="new-password" required />
                        <button type="button" className="auth-eye" onClick={() => setShowForgotPwd((visible) => !visible)} aria-label={showForgotPwd ? 'Sembunyikan kata sandi baru' : 'Tampilkan kata sandi baru'} aria-pressed={showForgotPwd}>
                          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="auth-field">
                      <label htmlFor="forgot-confirm-pwd">Konfirmasi Kata Sandi Baru</label>
                      <input id="forgot-confirm-pwd" type={showForgotPwd ? 'text' : 'password'} placeholder="Ketik ulang kata sandi baru" value={forgotConfirmPassword} onChange={(event) => setForgotConfirmPassword(event.target.value)} autoComplete="new-password" required />
                    </div>
                    <button type="submit" className="auth-primary-btn">Simpan Kata Sandi Baru</button>
                  </form>
                )}

                <button type="button" className="auth-text-link auth-back-link" onClick={() => switchMode('login')}>
                  Kembali ke halaman Masuk
                </button>
              </div>
            )}
          </div>
        </main>

        <footer className="auth-footer">© 2026 KimiLab - Pembelajaran Kimia Interaktif</footer>

        {onBackToHome && (
          <button type="button" className="auth-home-link" onClick={onBackToHome}>
            ← Kembali ke Beranda
          </button>
        )}
      </div>
    </div>
  );
}
