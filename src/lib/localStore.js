/**
 * localStore.js - Layanan Penyimpanan Lokal (Local-First) untuk Kuis Kimia
 * Sesuai PRD & AGENTS.md:
 * - 100% Client-Side menggunakan localStorage browser (tanpa database cloud eksternal).
 * - Menyimpan draf pilihan jawaban per butir secara instan dan reaktif.
 * - Versi soal ("v1") untuk menjamin kompatibilitas data.
 * - ID percobaan unik (UUID v4) untuk setiap pengerjaan kuis.
 * - Membekukan jawaban pretest/diagnostik saat dikirim sebelum pembahasan dibuka.
 * - Pengerjaan ulang setelah pembahasan selalu menghasilkan ID percobaan baru (UUID).
 * - Mendukung reset draf berkonfirmasi dan pemulihan otomatis saat halaman direfresh.
 */

const QUIZ_STORAGE_PREFIX = 'kimilab_quiz_';

/**
 * Helper pembuat UUID v4 yang tahan banting (fallback jika crypto.randomUUID belum tersedia)
 * @returns {string}
 */
export const generateUUID = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Menghasilkan kunci localStorage berdasarkan ID modul
 * @param {string} moduleId
 * @returns {string}
 */
export const getQuizStorageKey = (moduleId = 'asam-basa') =>
  `${QUIZ_STORAGE_PREFIX}${moduleId}`;

/**
 * Membuat struktur draf sesi kuis baru (Local-First)
 * @param {string} moduleId
 * @param {string} version
 * @returns {object}
 */
export const createInitialQuizSession = (moduleId = 'asam-basa', version = 'v1') => ({
  moduleId,
  version,
  attemptId: generateUUID(),
  status: 'draft', // 'draft' = pengerjaan aktif (belum beku) | 'submitted' = jawaban dibekukan & pembahasan dibuka
  answers: {}, // { [questionId]: 'A' | 'B' | 'C' | 'D' | 'E' }
  currentQuestionIndex: 0,
  viewMode: 'single', // 'single' (satu per satu) | 'list' (daftar lengkap)
  score: null, // skor akhir (0-100) setelah submit
  correctCount: 0,
  totalQuestions: 10,
  startedAt: new Date().toISOString(),
  submittedAt: null,
  history: [], // riwayat percobaan terdahulu
});

/**
 * Mengambil sesi kuis aktif dari localStorage.
 * Otomatis memulihkan draf atau membuat sesi baru jika belum ada.
 * @param {string} moduleId
 * @param {string} expectedVersion
 * @returns {object}
 */
export const getQuizSession = (moduleId = 'asam-basa', expectedVersion = 'v1') => {
  if (typeof window === 'undefined') {
    return createInitialQuizSession(moduleId, expectedVersion);
  }

  const key = getQuizStorageKey(moduleId);
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      const initial = createInitialQuizSession(moduleId, expectedVersion);
      window.localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }

    const parsed = JSON.parse(raw);
    // Jika versi berbeda, migrasikan dengan membuat sesi baru bertarget versi terkini
    if (parsed.version !== expectedVersion) {
      const migrated = {
        ...createInitialQuizSession(moduleId, expectedVersion),
        history: parsed.history || [],
      };
      window.localStorage.setItem(key, JSON.stringify(migrated));
      return migrated;
    }

    // Pastikan attemptId selalu ada (UUID)
    if (!parsed.attemptId) {
      parsed.attemptId = generateUUID();
      window.localStorage.setItem(key, JSON.stringify(parsed));
    }

    return parsed;
  } catch (err) {
    console.warn('[localStore] Gagal membaca sesi kuis dari localStorage:', err);
    return createInitialQuizSession(moduleId, expectedVersion);
  }
};

/**
 * Menyimpan draf pengerjaan kuis (jawaban per butir, index soal, viewMode)
 * Hanya boleh memperbarui jawaban jika status masih 'draft' (tidak dibekukan).
 * @param {string} moduleId
 * @param {object} updates
 * @returns {object}
 */
export const saveQuizDraft = (moduleId = 'asam-basa', updates = {}) => {
  if (typeof window === 'undefined') return updates;

  const current = getQuizSession(moduleId);

  // Jika sudah berstatus 'submitted', jangan timpa jawaban yang telah dibekukan
  const canUpdateAnswers = current.status === 'draft';

  const updatedSession = {
    ...current,
    currentQuestionIndex:
      typeof updates.currentQuestionIndex === 'number'
        ? updates.currentQuestionIndex
        : current.currentQuestionIndex,
    viewMode: updates.viewMode || current.viewMode || 'single',
    answers: canUpdateAnswers && updates.answers
      ? { ...current.answers, ...updates.answers }
      : current.answers,
    lastSavedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(
      getQuizStorageKey(moduleId),
      JSON.stringify(updatedSession)
    );
    window.dispatchEvent(new CustomEvent('kimilab_quiz_updated', { detail: updatedSession }));
  } catch (err) {
    console.warn('[localStore] Gagal menyimpan draf kuis:', err);
  }

  return updatedSession;
};

/**
 * Mengirim kuis (Submit) dan membekukan jawaban.
 * Menghitung skor akhir dan membuka akses pembahasan ilmiah.
 * @param {string} moduleId
 * @param {{ answers: object, questions: Array<object>, version?: string }} payload
 * @returns {object}
 */
export const submitQuizSession = (
  moduleId = 'asam-basa',
  { answers = {}, questions = [], version = 'v1' }
) => {
  if (typeof window === 'undefined') return null;

  const current = getQuizSession(moduleId, version);

  // Gunakan jawaban yang dikirimkan atau fallback ke draf tersimpan
  const finalAnswers = { ...current.answers, ...answers };

  // Hitung skor: jawaban benar / total soal * 100
  let correctCount = 0;
  questions.forEach((q) => {
    if (finalAnswers[q.id] === q.correctAnswer) {
      correctCount += 1;
    }
  });

  const totalQuestions = questions.length || 10;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const now = new Date().toISOString();

  // Status dibekukan ('submitted')
  const submittedSession = {
    ...current,
    status: 'submitted',
    answers: finalAnswers,
    score,
    correctCount,
    totalQuestions,
    submittedAt: now,
  };

  try {
    window.localStorage.setItem(
      getQuizStorageKey(moduleId),
      JSON.stringify(submittedSession)
    );
    window.dispatchEvent(
      new CustomEvent('kimilab_quiz_updated', { detail: submittedSession })
    );
  } catch (err) {
    console.warn('[localStore] Gagal menyimpan hasil submit kuis:', err);
  }

  return submittedSession;
};

/**
 * Mengosongkan draf jawaban aktif setelah konfirmasi pengguna.
 * Hanya berlaku saat status masih 'draft' dan tetap mempertahankan attemptId yang sama.
 * @param {string} moduleId
 * @param {string} version
 * @returns {object}
 */
export const resetQuizDraft = (moduleId = 'asam-basa', version = 'v1') => {
  if (typeof window === 'undefined') return null;

  const current = getQuizSession(moduleId, version);

  // Jika kuis belum disubmit, kosongkan draf pilihan
  const resetSession = {
    ...current,
    status: 'draft',
    answers: {},
    currentQuestionIndex: 0,
    score: null,
    correctCount: 0,
    submittedAt: null,
    lastSavedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(
      getQuizStorageKey(moduleId),
      JSON.stringify(resetSession)
    );
    window.dispatchEvent(
      new CustomEvent('kimilab_quiz_updated', { detail: resetSession })
    );
  } catch (err) {
    console.warn('[localStore] Gagal mereset draf kuis:', err);
  }

  return resetSession;
};

/**
 * Memulai pengerjaan ulang kuis (Retake) dengan ID percobaan baru (UUID).
 * Mengarsipkan hasil percobaan sebelumnya ke dalam riwayat (history).
 * @param {string} moduleId
 * @param {string} version
 * @returns {object}
 */
export const startNewQuizAttempt = (moduleId = 'asam-basa', version = 'v1') => {
  if (typeof window === 'undefined') return null;

  const current = getQuizSession(moduleId, version);

  // Arsipkan sesi terdahulu jika sudah berstatus submitted
  const newHistory = [...(current.history || [])];
  if (current.status === 'submitted' && current.attemptId) {
    newHistory.push({
      attemptId: current.attemptId,
      score: current.score,
      correctCount: current.correctCount,
      totalQuestions: current.totalQuestions,
      submittedAt: current.submittedAt,
      answers: current.answers,
    });
  }

  const freshSession = {
    moduleId,
    version,
    attemptId: generateUUID(), // UUID BARU sesuai Aturan 4
    status: 'draft', // Draf terbuka kembali untuk pengerjaan baru
    answers: {},
    currentQuestionIndex: 0,
    viewMode: current.viewMode || 'single',
    score: null,
    correctCount: 0,
    totalQuestions: current.totalQuestions || 10,
    startedAt: new Date().toISOString(),
    submittedAt: null,
    history: newHistory,
  };

  try {
    window.localStorage.setItem(
      getQuizStorageKey(moduleId),
      JSON.stringify(freshSession)
    );
    window.dispatchEvent(
      new CustomEvent('kimilab_quiz_updated', { detail: freshSession })
    );
  } catch (err) {
    console.warn('[localStore] Gagal memulai percobaan kuis baru:', err);
  }

  return freshSession;
};

/**
 * Membersihkan data kuis untuk modul tertentu dari localStorage (untuk testing / reset menyeluruh)
 * @param {string} moduleId
 */
export const clearQuizStorage = (moduleId = 'asam-basa') => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(getQuizStorageKey(moduleId));
    window.dispatchEvent(new Event('kimilab_quiz_updated'));
  } catch (err) {
    console.warn('[localStore] Gagal menghapus storage kuis:', err);
  }
};

export default {
  generateUUID,
  getQuizStorageKey,
  createInitialQuizSession,
  getQuizSession,
  saveQuizDraft,
  submitQuizSession,
  resetQuizDraft,
  startNewQuizAttempt,
  clearQuizStorage,
};

