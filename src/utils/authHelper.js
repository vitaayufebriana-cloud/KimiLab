/**
 * authHelper.js - Utilitas Manajemen Autentikasi Client-Side & Role-Based Access
 * Sesuai Aturan Arsitektur & Kebutuhan KimiLab:
 * - 100% Client-Side menggunakan localStorage browser (tanpa remote backend).
 * - Pemisahan Peran (Role): 'siswa' (Siswa SMA) dan 'guru' (Pendidik/Guru Kimia).
 * - Akun demonstrasi bawaan untuk Siswa dan Guru.
 * - Registrasi akun siswa lengkap (nama, email, username, password, kelas, sekolah).
 * - Registrasi akun guru lengkap (nama, email, username, password, sekolah, kode verifikasi pendidik).
 * - Fitur lupa kata sandi bertahap dengan instruksi pemulihan.
 * - Penyediaan daftar siswa nyata yang registrasi di browser untuk Dashboard Guru
 *   (tanpa data rekaan; akun bawaan demo dikeluarkan).
 */

const AUTH_USER_KEY = 'kimilab_auth_user';
const REGISTERED_USERS_KEY = 'kimilab_registered_users';
export const STANDARD_TEACHER_CODE = 'GURU-KIMILAB-2026';

// Akun demonstrasi awal
const DEFAULT_DEMO_USERS = [
  {
    name: 'Ahmad Fauzan',
    username: 'siswa',
    email: 'siswa@kimilab.id',
    password: 'password123',
    role: 'siswa',
    kelas: 'XI MIPA 2',
    sekolah: 'SMAN 1 Kimia Digital',
    createdAt: '2026-02-10T08:00:00.000Z',
  },
  {
    name: 'Ayu Febriana',
    username: 'ayufebriana',
    email: 'ayu@kimilab.id',
    password: 'password123',
    role: 'siswa',
    kelas: 'XI MIPA 1',
    sekolah: 'SMAN 1 Kimia Digital',
    createdAt: '2026-02-12T09:30:00.000Z',
  },
  {
    name: 'Dr. Dra. Nurul Hidayati, M.Pd.',
    username: 'guru',
    email: 'guru@kimilab.id',
    password: 'password123',
    role: 'guru',
    sekolah: 'SMAN 1 Kimia Digital',
    kodeVerifikasi: 'GURU-KIMILAB-2026',
    nip: '197804152005012004',
    createdAt: '2026-01-15T07:00:00.000Z',
  },
];

/**
 * Mengambil daftar pengguna terdaftar dari localStorage
 * @returns {Array<object>}
 */
export const getRegisteredUsers = () => {
  if (typeof window === 'undefined') return DEFAULT_DEMO_USERS;
  try {
    const raw = window.localStorage.getItem(REGISTERED_USERS_KEY);
    if (!raw) {
      window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(DEFAULT_DEMO_USERS));
      return DEFAULT_DEMO_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DEMO_USERS;
  } catch (err) {
    console.warn('Gagal membaca akun terdaftar dari localStorage:', err);
    return DEFAULT_DEMO_USERS;
  }
};

/**
 * Menyimpan daftar pengguna ke localStorage
 * @param {Array<object>} users
 */
const saveRegisteredUsers = (users) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.warn('Gagal menyimpan akun ke localStorage:', err);
  }
};

/**
 * Mengambil pengguna aktif saat ini
 * @returns {object|null}
 */
export const getCurrentAuthUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('Gagal membaca pengguna aktif dari localStorage:', err);
    return null;
  }
};

/**
 * Menyimpan pengguna aktif saat ini dan memicu event reaktif
 * @param {object|null} user
 * @param {boolean} remember
 */
export const setCurrentAuthUser = (user, _remember = true) => {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(AUTH_USER_KEY);
    }
    window.dispatchEvent(new CustomEvent('kimilab_auth_changed', { detail: user }));
  } catch (err) {
    console.warn('Gagal mengubah status autentikasi:', err);
  }
};

/**
 * Proses Login Berdasarkan Peran (Siswa atau Guru)
 * @param {{ identifier: string, password: string, role?: 'siswa' | 'guru', rememberMe?: boolean }} credentials
 * @returns {{ success: boolean, user?: object, message: string }}
 */
export const loginUser = ({ identifier, password, role = 'siswa', rememberMe = true }) => {
  const cleanId = (identifier || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  if (!cleanId || !cleanPass) {
    return { success: false, message: 'Harap isi username atau email serta kata sandi Anda.' };
  }

  const users = getRegisteredUsers();
  const found = users.find(
    (u) =>
      u.email.toLowerCase() === cleanId ||
      u.username.toLowerCase() === cleanId
  );

  if (!found) {
    return {
      success: false,
      message: 'Akun tidak ditemukan. Silakan periksa kembali atau pilih menu Registrasi.',
    };
  }

  if (found.password !== cleanPass) {
    return {
      success: false,
      message: 'Kata sandi tidak sesuai. Silakan coba lagi atau gunakan fitur Lupa Kata Sandi.',
    };
  }

  // Validasi kecocokan role (Siswa vs Guru)
  const userRole = (found.role || 'siswa').toLowerCase();
  const targetRole = (role || 'siswa').toLowerCase();
  if (userRole !== targetRole && !(userRole === 'siswa' && targetRole === 'siswa')) {
    const actualLabel = userRole === 'guru' ? 'Guru' : 'Siswa';
    return {
      success: false,
      message: `Akun ini terdaftar sebagai peran ${actualLabel}. Silakan ganti tab ke login sebagai ${actualLabel}.`,
    };
  }

  const activeUser = {
    name: found.name,
    username: found.username,
    email: found.email,
    role: found.role || 'siswa',
    kelas: found.kelas || (found.role === 'siswa' ? 'XI MIPA' : undefined),
    sekolah: found.sekolah || 'SMA',
    loginAt: new Date().toISOString(),
  };

  setCurrentAuthUser(activeUser, rememberMe);
  const greeting = activeUser.role === 'guru' ? `Bapak/Ibu ${activeUser.name}` : activeUser.name;
  return { success: true, user: activeUser, message: `Selamat datang kembali, ${greeting}!` };
};

/**
 * Registrasi Akun Siswa Baru
 * @param {{ name: string, email: string, username: string, password: string, kelas: string, sekolah: string }} data
 */
export const registerStudent = ({ name, email, username, password, kelas, sekolah }) => {
  const cleanName = (name || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanUsername = (username || cleanEmail.split('@')[0] || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();
  const cleanKelas = (kelas || '').trim();
  const cleanSekolah = (sekolah || '').trim();

  if (!cleanName || !cleanEmail || !cleanPass || !cleanKelas || !cleanSekolah) {
    return { success: false, message: 'Seluruh kolom formulir pendaftaran siswa wajib diisi.' };
  }

  if (cleanPass.length < 6) {
    return { success: false, message: 'Kata sandi minimal 6 karakter demi keamanan akun.' };
  }

  const users = getRegisteredUsers();
  const exists = users.some(
    (u) => u.email.toLowerCase() === cleanEmail || u.username.toLowerCase() === cleanUsername
  );

  if (exists) {
    return {
      success: false,
      message: 'Email atau username tersebut telah terdaftar. Silakan langsung masuk.',
    };
  }

  const newStudent = {
    name: cleanName,
    username: cleanUsername,
    email: cleanEmail,
    password: cleanPass,
    role: 'siswa',
    kelas: cleanKelas,
    sekolah: cleanSekolah,
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newStudent];
  saveRegisteredUsers(updatedUsers);

  const activeUser = {
    name: newStudent.name,
    username: newStudent.username,
    email: newStudent.email,
    role: 'siswa',
    kelas: newStudent.kelas,
    sekolah: newStudent.sekolah,
    loginAt: new Date().toISOString(),
  };

  setCurrentAuthUser(activeUser, true);
  return {
    success: true,
    user: activeUser,
    message: `Registrasi siswa berhasil! Selamat datang di KimiLab, ${newStudent.name}.`,
  };
};

/**
 * Registrasi Akun Guru Baru
 * @param {{ name: string, email: string, username: string, password: string, sekolah: string, kodeVerifikasi: string }} data
 */
export const registerTeacher = ({ name, email, username, password, sekolah, kodeVerifikasi }) => {
  const cleanName = (name || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanUsername = (username || cleanEmail.split('@')[0] || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();
  const cleanSekolah = (sekolah || '').trim();
  const cleanCode = (kodeVerifikasi || '').trim().toUpperCase();

  if (!cleanName || !cleanEmail || !cleanPass || !cleanSekolah || !cleanCode) {
    return { success: false, message: 'Seluruh kolom formulir pendaftaran guru wajib diisi.' };
  }

  if (cleanPass.length < 6) {
    return { success: false, message: 'Kata sandi minimal 6 karakter demi keamanan akun.' };
  }

  // Validasi kode verifikasi pendidik
  const validCodes = [
    STANDARD_TEACHER_CODE,
    'GURUKIMIA',
    'KIMILAB2026',
    'KIMIA2026',
    'PENDIDIK-KIMIA',
  ];
  const isCodeValid = validCodes.includes(cleanCode) || cleanCode.startsWith('GURU-') || cleanCode.length >= 8;

  if (!isCodeValid) {
    return {
      success: false,
      message: `Kode verifikasi guru tidak valid. Gunakan kode standar: ${STANDARD_TEACHER_CODE}`,
    };
  }

  const users = getRegisteredUsers();
  const exists = users.some(
    (u) => u.email.toLowerCase() === cleanEmail || u.username.toLowerCase() === cleanUsername
  );

  if (exists) {
    return {
      success: false,
      message: 'Email atau username tersebut sudah terdaftar. Silakan langsung masuk.',
    };
  }

  const newTeacher = {
    name: cleanName,
    username: cleanUsername,
    email: cleanEmail,
    password: cleanPass,
    role: 'guru',
    sekolah: cleanSekolah,
    kodeVerifikasi: cleanCode,
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newTeacher];
  saveRegisteredUsers(updatedUsers);

  const activeUser = {
    name: newTeacher.name,
    username: newTeacher.username,
    email: newTeacher.email,
    role: 'guru',
    sekolah: newTeacher.sekolah,
    loginAt: new Date().toISOString(),
  };

  setCurrentAuthUser(activeUser, true);
  return {
    success: true,
    user: activeUser,
    message: `Registrasi guru berhasil! Selamat datang di KimiLab, ${newTeacher.name}.`,
  };
};

/**
 * Permintaan Reset Kata Sandi (Step 1: Kirim Instruksi & Validasi Email)
 * @param {string} email
 * @returns {{ success: boolean, message: string, identifier?: string }}
 */
export const requestPasswordReset = (email) => {
  const cleanEmail = (email || '').trim().toLowerCase();
  if (!cleanEmail) {
    return { success: false, message: 'Harap masukkan alamat email atau username Anda yang terdaftar.' };
  }

  const users = getRegisteredUsers();
  const found = users.find(
    (u) => u.email.toLowerCase() === cleanEmail || u.username.toLowerCase() === cleanEmail
  );

  if (!found) {
    return {
      success: false,
      message: 'Alamat email atau username tidak ditemukan dalam sistem akun KimiLab.',
    };
  }

  return {
    success: true,
    identifier: found.email,
    message: `Tautan pemulihan dan instruksi reset kata sandi telah disiapkan untuk ${found.email}. Silakan buat kata sandi baru Anda di bawah.`,
  };
};

/**
 * Simpan Kata Sandi Baru (Step 2: Update Password)
 * @param {{ identifier: string, newPassword: string }} data
 * @returns {{ success: boolean, message: string }}
 */
export const resetPassword = ({ identifier, newPassword }) => {
  const cleanId = (identifier || '').trim().toLowerCase();
  const cleanPass = (newPassword || '').trim();

  if (!cleanId || !cleanPass) {
    return { success: false, message: 'Identitas akun dan kata sandi baru wajib diisi.' };
  }

  if (cleanPass.length < 6) {
    return { success: false, message: 'Kata sandi baru minimal 6 karakter.' };
  }

  const users = getRegisteredUsers();
  const index = users.findIndex(
    (u) =>
      u.email.toLowerCase() === cleanId ||
      u.username.toLowerCase() === cleanId
  );

  if (index === -1) {
    return {
      success: false,
      message: 'Akun tidak ditemukan dalam sistem.',
    };
  }

  users[index].password = cleanPass;
  users[index].updatedAt = new Date().toISOString();
  saveRegisteredUsers(users);

  return {
    success: true,
    message: 'Kata sandi berhasil diperbarui! Silakan masuk menggunakan kata sandi baru Anda.',
  };
};

/**
 * Masuk Cepat sebagai Mode Tamu (Anonim Siswa)
 */
export const loginAsGuest = (role = 'siswa') => {
  const guestUser = {
    name: role === 'guru' ? 'Guru Tamu' : 'Siswa Tamu',
    username: 'tamu_' + Math.floor(1000 + Math.random() * 9000),
    email: 'tamu@kimilab.local',
    role: role,
    kelas: role === 'siswa' ? 'XI MIPA' : undefined,
    sekolah: 'SMA Mandiri',
    isGuest: true,
    loginAt: new Date().toISOString(),
  };

  setCurrentAuthUser(guestUser, false);
  return guestUser;
};

/**
 * Logout
 */
export const logoutUser = () => {
  setCurrentAuthUser(null);
};

/**
 * Login / registrasi akun lokal untuk penyedia Google.
 * Role mengikuti pilihan tab (Siswa/Guru) di panel login.
 * - Jika email sudah terdaftar: pakai akun tersebut (role harus cocok dengan tab aktif).
 * - Jika belum: buat profil lokal baru bertanda provider 'google'
 *   (tanpa password â€” hanya bisa masuk lewat Google).
 * @param {{ name?: string, email?: string, role?: 'siswa' | 'guru' }} profile
 * @returns {{ success: boolean, user?: object, message: string }}
 */
export const loginWithGoogleProfile = ({ name, email, role = 'siswa' }) => {
  const cleanEmail = (email || '').trim().toLowerCase();
  if (!cleanEmail) {
    return { success: false, message: 'Google tidak mengembalikan alamat email. Coba lagi.' };
  }

  const targetRole = (role || 'siswa').toLowerCase() === 'guru' ? 'guru' : 'siswa';
  const emailDomain = cleanEmail.split('@')[1] || '';
  const users = getRegisteredUsers();
  const found = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (found) {
    const foundRole = (found.role || 'siswa').toLowerCase();
    if (foundRole !== targetRole) {
      const label = foundRole === 'guru' ? 'Guru' : 'Siswa';
      return {
        success: false,
        message: `Akun Google ini terdaftar sebagai peran ${label}. Silakan ganti tab ke login sebagai ${label}.`,
      };
    }
    const activeUser = {
      name: found.name,
      username: found.username,
      email: found.email,
      role: found.role || 'siswa',
      kelas: found.kelas || (found.role === 'siswa' ? 'XI MIPA' : undefined),
      sekolah: found.sekolah || 'SMA',
      provider: found.provider || 'local',
      loginAt: new Date().toISOString(),
    };
    setCurrentAuthUser(activeUser, true);
    return { success: true, user: activeUser, message: `Selamat datang kembali, ${activeUser.name}!` };
  }

  // Profil baru dari Google
  const displayName = (name || '').trim() || cleanEmail.split('@')[0];
  let username = cleanEmail.split('@')[0];
  if (users.some((u) => (u.username || '').toLowerCase() === username.toLowerCase())) {
    username = `${username}_${Math.floor(1000 + Math.random() * 9000)}`;
  }

  const newAccount = {
    name: displayName,
    username,
    email: cleanEmail,
    password: `google-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`, // tidak dipakai untuk login password
    role: targetRole,
    kelas: targetRole === 'siswa' ? 'XI MIPA 1' : undefined,
    sekolah: emailDomain ? emailDomain : 'SMA',
    provider: 'google',
    createdAt: new Date().toISOString(),
  };

  saveRegisteredUsers([...users, newAccount]);

  const activeUser = {
    name: newAccount.name,
    username: newAccount.username,
    email: newAccount.email,
    role: newAccount.role,
    kelas: newAccount.kelas,
    sekolah: newAccount.sekolah,
    provider: 'google',
    loginAt: new Date().toISOString(),
  };
  setCurrentAuthUser(activeUser, true);
  return {
    success: true,
    user: activeUser,
    message: `Akun ${targetRole === 'guru' ? 'Guru' : 'Siswa'} Google terdaftar: ${activeUser.name}`,
  };
};

/**
 * Mengambil daftar siswa nyata untuk ditampilkan di Dashboard Guru.
 * Hanya menampilkan akun siswa yang registrasi manual di browser ini —
 * akun bawaan demo (siswa@kimilab.id, ayu@kimilab.id) dikeluarkan agar
 * panel guru tidak menampilkan data rekaan.
 * Data progres per siswa tidak tersedia lintas akun di satu browser
 * (local-first), sehingga progres/nilai ditampilkan kosong ('–').
 * @returns {Array<object>}
 */
export const getTeacherStudentList = () => {
  const users = getRegisteredUsers();
  const demoStudentEmails = new Set(
    DEFAULT_DEMO_USERS
      .filter((u) => u.role === 'siswa')
      .map((u) => (u.email || '').toLowerCase())
  );

  return users
    .filter((u) => u.role === 'siswa' && !demoStudentEmails.has((u.email || '').toLowerCase()))
    .map((u) => {
      const createdAt = u.createdAt ? new Date(u.createdAt) : null;
      const registeredLabel =
        createdAt && !Number.isNaN(createdAt.getTime())
          ? `Terdaftar ${createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}`
          : '–';
      return {
        id: `reg-${u.username || u.email}`,
        name: u.name,
        username: u.username,
        email: u.email,
        kelas: u.kelas || '–',
        sekolah: u.sekolah || '–',
        stages: { engage: false, explore: false, explain: false, elaborate: false, evaluate: false },
        progressPercent: null,
        quizScore: null,
        status: 'Terdaftar — belum ada data belajar',
        lastActive: registeredLabel,
      };
    });
};
