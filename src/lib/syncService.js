/**
 * syncService.js — Antrean sinkronisasi hasil kuis (local-first → cloud).
 *
 * Setiap submit kuis memasukkan satu "attempt" ke antrean lokal
 * (localStorage key `kimilab_pending_attempts`). Antrean dikirim ke
 * Firestore oleh `syncPending()` — bisa dipicu manual lewat tombol
 * "Coba Kirim Lagi" di Navbar, atau otomatis setelah login Google.
 *
 * Modul ini sengaja TIDAK mengimpor Firebase secara statis agar bundle
 * awal tetap ringan; Firebase dimuat dinamis hanya saat sync berjalan.
 */

import { sameAttempt } from './attemptContract';

export const PENDING_KEY = 'kimilab_pending_attempts';
const MAX_PENDING = 50;

/**
 * Membaca antrean attempt yang belum tersinkron.
 * @returns {Array<object>}
 */
export const getPendingAttempts = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PENDING_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[syncService] Gagal membaca antrean pending:', err);
    return [];
  }
};

export const getPendingCount = () => getPendingAttempts().length;

const persistQueue = (list) => {
  try {
    window.localStorage.setItem(PENDING_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('[syncService] Gagal menyimpan antrean pending:', err);
  }
  window.dispatchEvent(new CustomEvent('kimilab_pending_changed', { detail: list.length }));
  return list;
};

/**
 * Memasukkan attempt ke antrean pending (idempotent — tidak duplikat
 * berdasarkan attemptId atau kontrak sameAttempt).
 * @param {object} attempt
 * @returns {Array<object>} antrean terbaru
 */
export const enqueuePendingAttempt = (attempt) => {
  if (typeof window === 'undefined' || !attempt) return [];
  const list = getPendingAttempts();

  const isDuplicate = list.some(
    (item) =>
      (item.attemptId && attempt.attemptId && item.attemptId === attempt.attemptId) ||
      sameAttempt(item, attempt)
  );
  if (isDuplicate) return list;

  const next = [...list, { ...attempt, queuedAt: new Date().toISOString() }].slice(-MAX_PENDING);
  return persistQueue(next);
};

/**
 * Mengirim seluruh attempt pending ke Firestore.
 * - Berhasil → attempt dihapus dari antrean.
 * - Gagal jaringan/lainnya → attempt tetap di antrean untuk percobaan berikutnya.
 * - Belum login Google → berhenti, antrean tidak diubah.
 *
 * @returns {Promise<{ synced: number, failed: number, pending: number, reason?: string, message?: string }>}
 */
export async function syncPending() {
  const queue = getPendingAttempts();

  if (queue.length === 0) {
    window.dispatchEvent(
      new CustomEvent('kimilab_sync_completed', { detail: { synced: 0, failed: 0, pending: 0, reason: 'empty' } })
    );
    return { synced: 0, failed: 0, pending: 0, reason: 'empty' };
  }

  // Muat Firebase hanya saat dibutuhkan
  let saveAttempt, NotSignedInError;
  try {
    ({ saveAttempt, NotSignedInError } = await import('./cloudService'));
  } catch (err) {
    console.warn('[syncService] Gagal memuat modul cloud:', err);
    return { synced: 0, failed: 0, pending: queue.length, reason: 'module-error', message: err?.message };
  }

  const remaining = [];
  let synced = 0;
  let failed = 0;
  let stoppedEarly = false;

  for (let i = 0; i < queue.length; i += 1) {
    const attempt = queue[i];
    try {
      await saveAttempt(attempt);
      synced += 1;
    } catch (err) {
      failed += 1;
      remaining.push(attempt);

      if (NotSignedInError && err instanceof NotSignedInError) {
        // Belum ada sesi Firebase — sisanya jangan dicoba, tetap antre
        remaining.push(...queue.slice(i + 1));
        stoppedEarly = true;
        console.warn('[syncService] Sync dihentikan: belum login Google.');
        break;
      }
      console.warn('[syncService] Gagal mengirim attempt:', err);
    }
  }

  persistQueue(remaining);
  window.dispatchEvent(
    new CustomEvent('kimilab_sync_completed', {
      detail: { synced, failed, pending: remaining.length, reason: stoppedEarly ? 'not-signed-in' : 'done' },
    })
  );

  return {
    synced,
    failed,
    pending: remaining.length,
    reason: stoppedEarly ? 'not-signed-in' : 'done',
  };
}
