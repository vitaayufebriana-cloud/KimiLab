/**
 * firebaseService.js — Inisialisasi & layanan Firebase KimiLab.
 *
 * Hanya memuat konfigurasi dari variabel lingkungan VITE_FIREBASE_*
 * (lihat .env.example / .env.local). Jika konfigurasi belum lengkap,
 * modul ini tetap aman diimpor: `isFirebaseConfigured` bernilai false
 * dan semua operasi akan gagal dengan pesan yang ramah (bukan crash).
 *
 * Catatan arsitektur (AGENTS.md §1):
 * - localStorage tetap sumber kebenaran utama (local-first).
 * - Firebase hanya dipakai sebagai sinkronisasi opsional hasil kuis
 *   (Authentication Google + Cloud Firestore collection `attempts`).
 */

import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured) {
  app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app); // Persistence default: IndexedDB (bertahan saat refresh)
  db = getFirestore(app);
}

export const FIREBASE_NOT_CONFIGURED_MESSAGE =
  'Firebase belum dikonfigurasi. Periksa file .env.local (isi VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_APP_ID) lalu jalankan ulang dev server.';

/**
 * Menunggu Firebase Auth memulihkan sesi yang tersimpan (jika ada).
 * Diperlukan karena setelah reload, `auth.currentUser` belum langsung tersedia.
 * @returns {Promise<object|null>} user Firebase atau null jika belum login
 */
export const waitForAuthUser = () =>
  new Promise((resolve) => {
    if (!auth) return resolve(null);
    if (auth.currentUser) return resolve(auth.currentUser);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

/**
 * Masuk dengan Google (popup).
 * @returns {Promise<{ success: boolean, user?: object, message: string }>}
 */
export const googleLogin = async () => {
  if (!auth) {
    return { success: false, message: FIREBASE_NOT_CONFIGURED_MESSAGE };
  }
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    return {
      success: true,
      user: result.user,
      message: `Berhasil masuk sebagai ${result.user.displayName || result.user.email}`,
    };
  } catch (err) {
    const code = err?.code || '';
    let message = 'Gagal masuk dengan Google. Silakan coba lagi.';
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
      message = 'Masuk dengan Google dibatalkan.';
    } else if (code === 'auth/popup-blocked') {
      message = 'Popup diblokir browser. Izinkan popup untuk situs ini lalu coba lagi.';
    } else if (code === 'auth/unauthorized-domain') {
      message =
        'Domain ini belum diizinkan di Firebase Console (Authentication → Settings → Authorized domains).';
    } else if (code === 'auth/operation-not-allowed') {
      message =
        'Provider Google belum diaktifkan di Firebase Console (Authentication → Sign-in method).';
    } else if (err?.message) {
      message = `Gagal masuk dengan Google: ${err.message}`;
    }
    console.warn('[firebaseService] googleLogin gagal:', err);
    return { success: false, message };
  }
};

/**
 * Keluar dari sesi Firebase (tidak menghapus sesi lokal —
 * itu ditangani oleh authHelper.logoutUser).
 */
export const firebaseSignOut = async () => {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (err) {
    console.warn('[firebaseService] signOut gagal:', err);
  }
};

export { auth, db };
