import { useState } from 'react';

/**
 * Komponen Reusable Accordion untuk Pertanyaan Pemantik & Pembahasan
 * @param {{
 *   items: Array<{
 *     id: string|number,
 *     number?: number,
 *     question: string,
 *     answer: string,
 *     highlight?: string
 *   }>,
 *   allowMultiple?: boolean,
 *   defaultOpenId?: string|number
 * }} props
 */
export default function Accordion({ items = [], allowMultiple = true, defaultOpenId = null }) {
  const [openIds, setOpenIds] = useState(() => {
    return defaultOpenId ? [defaultOpenId] : [];
  });

  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const handleToggleAll = () => {
    if (openIds.length === items.length) {
      setOpenIds([]);
    } else {
      setOpenIds(items.map((item) => item.id));
    }
  };

  const isAllOpen = openIds.length === items.length && items.length > 0;

  return (
    <div className="accordion-root">
      <div className="accordion-header-bar">
        <span className="accordion-count-badge">
          {openIds.length} dari {items.length} pembahasan terbuka
        </span>
        <button
          type="button"
          className="accordion-toggle-all-btn"
          onClick={handleToggleAll}
          aria-label={isAllOpen ? 'Tutup semua pertanyaan' : 'Buka semua pertanyaan'}
        >
          {isAllOpen ? 'Tutup Semua Pembahasan' : 'Buka Semua Pembahasan'}
        </button>
      </div>

      <div className="accordion-list">
        {items.map((item, index) => {
          const isOpen = openIds.includes(item.id);
          const itemNum = item.number || index + 1;
          const buttonId = `accordion-btn-${item.id}`;
          const panelId = `accordion-panel-${item.id}`;

          return (
            <div
              key={item.id}
              className={`accordion-item ${isOpen ? 'is-open' : ''}`}
            >
              <button
                id={buttonId}
                type="button"
                className="accordion-trigger"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <div className="accordion-trigger-left">
                  <span className="accordion-number" aria-hidden="true">
                    0{itemNum}
                  </span>
                  <span className="accordion-title">{item.question}</span>
                </div>
                <div className="accordion-trigger-right">
                  <span className="accordion-badge-status">
                    {isOpen ? 'Tutup' : 'Lihat Jawaban'}
                  </span>
                  <span className="accordion-chevron" aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="accordion-panel"
                >
                  <div className="accordion-panel-content">
                    <div className="accordion-answer-badge">
                      <span className="answer-indicator-dot"></span>
                      <span>Pembahasan Ilmiah & Konsep Kimia:</span>
                    </div>
                    <p className="accordion-answer-text">{item.answer}</p>
                    {item.highlight && (
                      <div className="accordion-key-takeaway">
                        <span className="key-takeaway-label">💡 Kesimpulan Kunci:</span>
                        <span className="key-takeaway-text">{item.highlight}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

