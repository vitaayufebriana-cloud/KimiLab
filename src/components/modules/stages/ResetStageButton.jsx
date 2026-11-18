import { useState, useEffect, useRef } from 'react';
import {
  save5EStageProgress,
  clearExploreObservations,
  createInitial5EProgress,
} from '../../../utils/learningHelper';
import { clearQuizStorage } from '../../../lib/localStore';

/**
 * Tombol Reset Progres Tahap 5E (per tahap).
 * Konfirmasi 2 langkah: klik sekali berubah jadi "Yakin? Klik lagi" selama 4 detik.
 * Lingkup reset = tahap itu saja:
 * - engage   : prediksi dikosongkan
 * - explore  : jawaban analisis dikosongkan + tabel pengamatan lab dihapus
 * - explain  : topik selesai & checkpoint dikosongkan
 * - elaborate: jawaban siswa & catatan dikosongkan
 * - evaluate : status tahap di-reset + sesi kuis tersimpan dihapus
 *
 * @param {{
 *   stageId: 'engage' | 'explore' | 'explain' | 'elaborate' | 'evaluate',
 *   onReset?: () => void,
 *   onNotify?: (message: string) => void,
 * }} props
 */
export default function ResetStageButton({ stageId, onReset, onNotify = () => {} }) {
  const [confirming, setConfirming] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      timerRef.current = setTimeout(() => setConfirming(false), 4000);
      return;
    }

    clearTimeout(timerRef.current);

    const initial = createInitial5EProgress()[stageId];
    save5EStageProgress(stageId, { ...initial });

    if (stageId === 'explore') {
      clearExploreObservations();
    } else if (stageId === 'evaluate') {
      clearQuizStorage('asam-basa');
    }

    if (typeof onReset === 'function') onReset();
    setConfirming(false);
    onNotify('🔄 Progres tahap ini telah di-reset.');
  };

  return (
    <button
      type="button"
      id={`btn-reset-stage-${stageId}`}
      className={`reset-stage-btn ${confirming ? 'confirming' : ''}`}
      onClick={handleClick}
    >
      {confirming ? 'Yakin Reset? Klik Lagi' : 'Reset Progres Tahap Ini'}
    </button>
  );
}
