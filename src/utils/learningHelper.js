/**
 * learningHelper.js - Manajemen State & Progres Pembelajaran Learning Cycle 5E
 * Sintaks: Engage -> Explore -> Explain -> Elaborate -> Evaluate
 * 
 * Aturan Arsitektur (AGENTS.md):
 * - 100% Client-Side menggunakan localStorage browser (tanpa remote backend).
 * - Setiap tahap 5E menyumbang bobot 20% terhadap total progres modul (100%).
 * - Reaktif terhadap perubahan state dengan CustomEvent 'kimilab_5e_updated'.
 */

import { saveModuleProgress } from './storageHelper.js';

const STORAGE_5E_KEY = 'kimilab_5e_progress';
const STORAGE_OBSERVATION_KEY = 'kimilab_explore_observations';

/**
 * State Awal Progres 5E
 */
export const createInitial5EProgress = () => ({
  engage: {
    completed: false,
    predictions: {}, // { [questionId]: selectedKey }
    timestamp: null,
  },
  explore: {
    completed: false,
    analysisAnswers: {}, // { [qId]: answerText }
    timestamp: null,
  },
  explain: {
    completed: false,
    completedTopics: [], // array of topic ids, misal ['konsep-dasar', 'teori-arrhenius', ...]
    activeTopic: 'konsep-dasar',
    timestamp: null,
  },
  elaborate: {
    completed: false,
    studentAnswers: {}, // { [hotsId]: answerText }
    solutionNotes: '',
    timestamp: null,
  },
  evaluate: {
    completed: false,
    quizScore: null,
    attemptId: null,
    timestamp: null,
  },
});

/**
 * Mengambil status progres 5E dari localStorage
 * @returns {object}
 */
export const get5EProgress = () => {
  if (typeof window === 'undefined') return createInitial5EProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_5E_KEY);
    if (!raw) {
      const initial = createInitial5EProgress();
      window.localStorage.setItem(STORAGE_5E_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return {
      ...createInitial5EProgress(),
      ...parsed,
    };
  } catch (err) {
    console.warn('[learningHelper] Gagal membaca progres 5E:', err);
    return createInitial5EProgress();
  }
};

/**
 * Menghitung persentase keseluruhan (0 - 100%) berdasarkan status 5 tahap
 * @param {object} progress
 * @returns {number}
 */
export const calculate5EPercentage = (progress) => {
  if (!progress) return 0;
  const stages = ['engage', 'explore', 'explain', 'elaborate', 'evaluate'];
  let count = 0;
  stages.forEach((st) => {
    if (progress[st]?.completed) {
      count += 1;
    }
  });
  return Math.round((count / stages.length) * 100);
};

/**
 * Menyimpan pembaruan tahap 5E tertentu ke localStorage
 * @param {'engage' | 'explore' | 'explain' | 'elaborate' | 'evaluate'} stageId
 * @param {object} updates
 * @returns {object}
 */
export const save5EStageProgress = (stageId, updates = {}) => {
  if (typeof window === 'undefined') return updates;
  try {
    const current = get5EProgress();
    const nextStageState = {
      ...current[stageId],
      ...updates,
      timestamp: new Date().toISOString(),
    };

    const updated = {
      ...current,
      [stageId]: nextStageState,
    };

    window.localStorage.setItem(STORAGE_5E_KEY, JSON.stringify(updated));

    // Sinkronisasi persentase ke modul 'asam-basa'
    const totalPercent = calculate5EPercentage(updated);
    saveModuleProgress('asam-basa', totalPercent);

    // Memicu event reaktif
    window.dispatchEvent(new CustomEvent('kimilab_5e_updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.warn('[learningHelper] Gagal menyimpan tahap 5E:', err);
    return get5EProgress();
  }
};

/**
 * Mengambil daftar baris tabel pengamatan virtual lab dari localStorage
 * @returns {Array<object>}
 */
export const getExploreObservations = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_OBSERVATION_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[learningHelper] Gagal membaca tabel pengamatan:', err);
    return [];
  }
};

/**
 * Menambahkan satu baris pengamatan baru ke tabel
 * @param {object} observationRow
 * @returns {Array<object>}
 */
export const addExploreObservation = (observationRow) => {
  if (typeof window === 'undefined') return [];
  try {
    const current = getExploreObservations();
    const newRow = {
      id: 'obs_' + Date.now(),
      savedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      ...observationRow,
    };
    const updated = [newRow, ...current].slice(0, 20); // Batasi maks 20 riwayat pengamatan
    window.localStorage.setItem(STORAGE_OBSERVATION_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kimilab_observations_updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.warn('[learningHelper] Gagal menambahkan baris pengamatan:', err);
    return getExploreObservations();
  }
};

/**
 * Menghapus satu baris pengamatan
 * @param {string} rowId
 * @returns {Array<object>}
 */
export const deleteExploreObservation = (rowId) => {
  if (typeof window === 'undefined') return [];
  try {
    const current = getExploreObservations();
    const updated = current.filter((r) => r.id !== rowId);
    window.localStorage.setItem(STORAGE_OBSERVATION_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kimilab_observations_updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.warn('[learningHelper] Gagal menghapus baris pengamatan:', err);
    return getExploreObservations();
  }
};

/**
 * Membersihkan seluruh tabel pengamatan
 */
export const clearExploreObservations = () => {
  if (typeof window === 'undefined') return [];
  try {
    window.localStorage.removeItem(STORAGE_OBSERVATION_KEY);
    window.dispatchEvent(new CustomEvent('kimilab_observations_updated', { detail: [] }));
    return [];
  } catch (err) {
    console.warn('[learningHelper] Gagal mengosongkan tabel pengamatan:', err);
    return [];
  }
};

/**
 * Reset seluruh progres pembelajaran 5E
 */
export const reset5EAllProgress = () => {
  if (typeof window === 'undefined') return createInitial5EProgress();
  try {
    window.localStorage.removeItem(STORAGE_5E_KEY);
    window.localStorage.removeItem(STORAGE_OBSERVATION_KEY);
    const initial = createInitial5EProgress();
    window.dispatchEvent(new CustomEvent('kimilab_5e_updated', { detail: initial }));
    saveModuleProgress('asam-basa', 0);
    return initial;
  } catch (err) {
    console.warn('[learningHelper] Gagal reset progres 5E:', err);
    return createInitial5EProgress();
  }
};
