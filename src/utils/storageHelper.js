/**
 * Utilitas Penyimpanan Progres Belajar Anonim
 * Berdasarkan AGENTS.md:
 * - 100% Client-side menggunakan localStorage browser.
 * - Tanpa data eksternal / login.
 * - Mendukung reset bersih via clearAllProgress / localStorage.clear().
 */

const STORAGE_KEY = 'kimilab_user_progress';

const DEFAULT_PROGRESS = {
  stoikiometri: 0,
  termokimia: 0,
  'asam-basa': 0,
};

export const getStoredProgress = () => {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch (err) {
    console.warn('Gagal membaca localStorage progres:', err);
    return DEFAULT_PROGRESS;
  }
};

export const saveModuleProgress = (moduleId, percentage) => {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const current = getStoredProgress();
    const clamped = Math.max(0, Math.min(100, Math.round(percentage)));
    const updated = {
      ...current,
      [moduleId]: clamped,
      lastUpdated: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Trigger custom event for reactive sync across components
    window.dispatchEvent(new Event('kimilab_progress_updated'));
    return updated;
  } catch (err) {
    console.warn('Gagal menyimpan progres ke localStorage:', err);
    return DEFAULT_PROGRESS;
  }
};

export const clearStoredProgress = () => {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('kimilab_progress_updated'));
    return DEFAULT_PROGRESS;
  } catch (err) {
    console.warn('Gagal membersihkan data progres:', err);
    return DEFAULT_PROGRESS;
  }
};

export const calculateOverallProgress = (progress) => {
  const keys = ['stoikiometri', 'termokimia', 'asam-basa'];
  const values = keys.map((k) => progress[k] || 0);
  const completedCount = values.filter((v) => v >= 100).length;
  const inProgressCount = values.filter((v) => v > 0 && v < 100).length;
  const totalPercent = Math.round(values.reduce((sum, val) => sum + val, 0) / keys.length);

  return {
    completedCount,
    inProgressCount,
    totalPercent,
    totalModules: keys.length,
  };
};
