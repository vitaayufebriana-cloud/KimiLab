import { useState, useEffect, useRef } from 'react';

const PANEL_GURU_CODE = '130119';

/**
 * Modal input kode akses Panel Guru.
 * Menu "Panel Guru" di sidebar terlihat untuk semua orang, tetapi isinya
 * hanya bisa dibuka dengan kode akses yang benar. Status unlock diingat
 * selama sesi tab browser belum ditutup.
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   onSuccess: () => void,
 * }} props
 */
export default function PanelGuruModal({ isOpen, onClose, onSuccess }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [prevOpen, setPrevOpen] = useState(isOpen);
  const inputRef = useRef(null);

  // Reset form saat modal dibuka (pola "adjust state during render")
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setCode('');
      setError('');
    }
  }

  // Fokus ke input setiap kali modal terbuka
  useEffect(() => {
    if (!isOpen) return undefined;
    const timer = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Tutup dengan Escape
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim() === PANEL_GURU_CODE) {
      onSuccess();
      return;
    }
    setError('Kode akses salah. Periksa kembali kode yang Anda miliki.');
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="panel-guru-modal-title" onClick={onClose}>
      <div className="modal-content-box panel-guru-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-subtitle" style={{ color: 'var(--um-blue)' }}>Akses Terbatas</span>
            <h3 id="panel-guru-modal-title" className="modal-title" style={{ fontSize: '1.25rem' }}>
              Panel Guru KimiLab
            </h3>
          </div>
          <button type="button" id="btn-close-panel-guru-modal" className="modal-close-btn" onClick={onClose} aria-label="Tutup modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form className="panel-guru-form" onSubmit={handleSubmit}>
          <p className="panel-guru-desc">
            Halaman ini berisi pemantauan & alat bantu untuk pendidik. Masukkan kode akses guru untuk melanjutkan.
          </p>
          <label className="panel-guru-label" htmlFor="panel-guru-code-input">
            Kode Akses Guru
          </label>
          <input
            ref={inputRef}
            id="panel-guru-code-input"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            className="panel-guru-input"
            placeholder="••••••"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError('');
            }}
            aria-describedby={error ? 'panel-guru-error' : undefined}
            aria-invalid={Boolean(error)}
          />
          {error && (
            <p id="panel-guru-error" className="panel-guru-error" role="alert">
              {error}
            </p>
          )}
          <div className="panel-guru-actions">
            <button type="button" className="btn-ghost-plain" onClick={onClose}>
              Batal
            </button>
            <button type="submit" id="btn-submit-panel-guru-code" className="btn-nav-save" style={{ padding: '0.55rem 1.1rem' }}>
              Buka Panel Guru
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
