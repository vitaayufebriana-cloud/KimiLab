import { useState } from 'react';
import { learningObjectives } from '../../data/chemData';

/**
 * Komponen Tujuan Pembelajaran Modul 1
 * Menampilkan 6 capaian pembelajaran kimia dengan checklist mandiri interaktif
 * @param {{ objectives?: Array<{ id: string, text: string, topic?: string, badge?: string }> }} props
 */
export default function LearningObjectives({ objectives = learningObjectives }) {
  // Siswa dapat menandai capaian kompetensi yang telah dipahami secara lokal
  const [checkedIds, setCheckedIds] = useState([]);

  const toggleCheck = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCheckAll = () => {
    if (checkedIds.length === objectives.length) {
      setCheckedIds([]);
    } else {
      setCheckedIds(objectives.map((o) => o.id));
    }
  };

  const completedCount = checkedIds.length;
  const totalCount = objectives.length;
  const percentComplete = Math.round((completedCount / totalCount) * 100);

  return (
    <section className="learning-objectives-section" aria-labelledby="learning-obj-heading">
      <div className="section-header-row">
        <div>
          <div className="section-pill-tag">
            <span>🎯 Capaian Pembelajaran Modul 1</span>
          </div>
          <h3 id="learning-obj-heading" className="learning-obj-title">
            Tujuan Pembelajaran
          </h3>
          <p className="learning-obj-desc">
            Setelah mempelajari modul ini, siswa diharapkan mampu menguasai 6 kompetensi esensial larutan asam-basa berikut:
          </p>
        </div>

        <div className="objective-progress-box">
          <div className="obj-progress-header">
            <span className="obj-progress-label">Pemahaman Siswa</span>
            <span className="obj-progress-val">{completedCount}/{totalCount} Tuntas</span>
          </div>
          <div className="obj-progress-track">
            <div
              className="obj-progress-bar"
              style={{ width: `${percentComplete}%` }}
              role="progressbar"
              aria-valuenow={percentComplete}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <button
            type="button"
            className="btn-mark-all-obj"
            onClick={handleCheckAll}
          >
            {completedCount === totalCount ? 'Batal Tandai Semua' : 'Tandai Semua Dipahami'}
          </button>
        </div>
      </div>

      <div className="objectives-grid">
        {objectives.map((obj, idx) => {
          const isChecked = checkedIds.includes(obj.id);
          return (
            <div
              key={obj.id}
              className={`objective-card ${isChecked ? 'objective-card-checked' : ''}`}
              onClick={() => toggleCheck(obj.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleCheck(obj.id);
                }
              }}
              aria-pressed={isChecked}
            >
              <div className="objective-card-top">
                <span className="objective-number-tag">
                  Tujuan 0{idx + 1}
                </span>
                {obj.badge && (
                  <span className="objective-badge-pill">{obj.badge}</span>
                )}
                <div className={`objective-checkbox ${isChecked ? 'checked' : ''}`} aria-hidden="true">
                  {isChecked ? '✓' : ''}
                </div>
              </div>

              <p className="objective-text">{obj.text}</p>

              {obj.topic && (
                <div className="objective-topic-tag">
                  <span>Topik: <strong>{obj.topic}</strong></span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

