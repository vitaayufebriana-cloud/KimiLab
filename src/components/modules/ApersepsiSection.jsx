import Accordion from '../common/Accordion';
import { apersepsiData } from '../../data/chemData';

/**
 * Komponen Apersepsi (Engage) Modul 1: Larutan Asam dan Basa
 * Menampilkan pengantar kontekstual, ilustrasi visual lemon dan sabun,
 * pertanyaan pemantik interaktif dalam bentuk accordion, serta jembatan materi penutup.
 * 
 * @param {{
 *   data?: typeof apersepsiData,
 *   onProceedToObjectives?: () => void
 * }} props
 */
export default function ApersepsiSection({
  data = apersepsiData,
  onProceedToObjectives,
}) {
  const { title, paragraphs, visuals, triggerQuestions, closingBridge } = data;

  return (
    <section className="apersepsi-section" aria-labelledby="apersepsi-main-title">
      {/* 1. Header Engage */}
      <div className="apersepsi-header">
        <div className="section-pill-tag">
          <span className="sparkle-icon" aria-hidden="true">💡</span>
          <span>{data.sectionTag || 'ENGAGE • APERSEPSI KONTEKSTUAL'}</span>
        </div>
        <h3 id="apersepsi-main-title" className="apersepsi-title">
          {title}
        </h3>
        <p className="apersepsi-subtitle">
          {data.subtitle || 'Mengamati fenomena kimia kontekstual di sekitar kita sebelum mendalami teori ionik'}
        </p>
      </div>

      {/* 2. Visual Lemon dan Sabun (Ilustrasi Kimiawi) */}
      <div className="apersepsi-visuals-grid" role="region" aria-label="Visual Ilustrasi Lemon dan Sabun">
        {/* Card 1: Jeruk Lemon (Asam) */}
        <div className="phenomenon-card phenomenon-acid">
          <div className="phenomenon-card-glow" aria-hidden="true"></div>
          <div className="phenomenon-visual-header">
            <span className="phenomenon-type-badge acid-badge">Sifat Asam (pH &lt; 7)</span>
            <span className="phenomenon-ph-tag">{visuals[0]?.phValue || 'pH ≈ 2,2'}</span>
          </div>

          <div className="phenomenon-svg-container">
            {/* SVG Ilustrasi Buah Lemon Segar & Irisan Asam Sitrat */}
            <svg
              className="phenomenon-svg"
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Ilustrasi jeruk lemon asam sitrat"
            >
              {/* Outer Glow Halo */}
              <circle cx="80" cy="80" r="70" fill="url(#lemon-radial)" opacity="0.25" />
              
              {/* Daun Lemon */}
              <path
                d="M105 32C118 24 135 28 138 42C130 52 114 50 105 46L105 32Z"
                fill="#10b981"
              />
              <path d="M106 38C116 38 128 42 136 44" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
              <path d="M98 46C103 44 105 40 106 36" stroke="#84cc16" strokeWidth="2.5" strokeLinecap="round" />

              {/* Kulit Luar Lemon */}
              <ellipse cx="80" cy="88" rx="56" ry="50" fill="#facc15" stroke="#eab308" strokeWidth="3" />
              {/* Lapisan Albedo Putih */}
              <ellipse cx="80" cy="88" rx="49" ry="43" fill="#fef08a" />
              {/* Daging Buah Lemon */}
              <ellipse cx="80" cy="88" rx="44" ry="38" fill="#fde047" stroke="#eab308" strokeWidth="1.5" />

              {/* Segmen/Bulir Irisan Lemon */}
              <g stroke="#f59e0b" strokeWidth="1.5" fill="#fef9c3">
                {/* Segmen Atas */}
                <path d="M80 88L70 56C76 54 84 54 90 56L80 88Z" />
                {/* Kanan Atas */}
                <path d="M80 88L104 64C109 69 113 76 114 83L80 88Z" />
                {/* Kanan Bawah */}
                <path d="M80 88L114 93C113 100 109 107 104 112L80 88Z" />
                {/* Bawah */}
                <path d="M80 88L90 120C84 122 76 122 70 120L80 88Z" />
                {/* Kiri Bawah */}
                <path d="M80 88L56 112C51 107 47 100 46 93L80 88Z" />
                {/* Kiri Atas */}
                <path d="M80 88L46 83C47 76 51 69 56 64L80 88Z" />
              </g>

              {/* Titik Pusat Lemon */}
              <circle cx="80" cy="88" r="4.5" fill="#fef08a" stroke="#eab308" strokeWidth="1" />

              {/* Droplet Air Asam Lemon */}
              <path
                d="M42 42C42 42 34 50 34 56C34 60.4 37.6 64 42 64C46.4 64 50 60.4 50 56C50 50 42 42 42 42Z"
                fill="#fde047"
                opacity="0.85"
                stroke="#eab308"
                strokeWidth="1.5"
              />

              <defs>
                <radialGradient id="lemon-radial" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div className="phenomenon-details">
            <h4 className="phenomenon-name">{visuals[0]?.name || 'Jeruk Lemon'}</h4>
            <div className="phenomenon-formula">
              <code>{visuals[0]?.chemicalName || 'Asam Sitrat (C₆H₈O₇)'}</code>
            </div>
            <p className="phenomenon-trait">
              <strong>Sensasi:</strong> {visuals[0]?.sensoryTrait || 'Rasa masam menyengat pada lidah'}
            </p>
            <div className="phenomenon-meta-row">
              <span className="meta-sub-pill">Ion Dominan: <strong>H⁺ / H₃O⁺</strong></span>
              <span className="meta-sub-pill">Lakmus: <strong>Merah</strong></span>
            </div>
          </div>
        </div>

        {/* Card 2: Sabun Pembersih (Basa) */}
        <div className="phenomenon-card phenomenon-base">
          <div className="phenomenon-card-glow base-glow" aria-hidden="true"></div>
          <div className="phenomenon-visual-header">
            <span className="phenomenon-type-badge base-badge">Sifat Basa (pH &gt; 7)</span>
            <span className="phenomenon-ph-tag">{visuals[1]?.phValue || 'pH ≈ 9,0 – 10,0'}</span>
          </div>

          <div className="phenomenon-svg-container">
            {/* SVG Ilustrasi Batang Sabun & Busa Sabun Licin */}
            <svg
              className="phenomenon-svg"
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Ilustrasi sabun pembersih basa licin"
            >
              {/* Outer Glow Halo */}
              <circle cx="80" cy="80" r="70" fill="url(#soap-radial)" opacity="0.25" />

              {/* Busa / Gelembung Sabun di Sekitar */}
              <circle cx="40" cy="46" r="14" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="36" cy="42" r="4" fill="#ffffff" fillOpacity="0.8" />

              <circle cx="125" cy="42" r="18" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="120" cy="36" r="5" fill="#ffffff" fillOpacity="0.8" />

              <circle cx="132" cy="78" r="9" fill="#0ea5e9" fillOpacity="0.3" stroke="#0ea5e9" strokeWidth="1.5" />
              <circle cx="32" cy="88" r="8" fill="#0ea5e9" fillOpacity="0.3" stroke="#0ea5e9" strokeWidth="1.5" />

              {/* Batang Sabun (Isometric Style) */}
              {/* Bagian Bawah Sabun (Bayangan) */}
              <rect x="42" y="78" width="80" height="48" rx="16" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
              {/* Badan Sabun */}
              <rect x="38" y="68" width="84" height="48" rx="16" fill="#38bdf8" stroke="#7dd3fc" strokeWidth="2.5" />

              {/* Kilauan / Refleksi Permukaan Sabun Yang Licin */}
              <path
                d="M48 76C54 74 72 73 88 74"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeOpacity="0.9"
              />
              <path
                d="M52 83C56 82 66 82 74 83"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.6"
              />

              {/* Busa Berbusa di Bawah Sabun */}
              <circle cx="58" cy="116" r="10" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="76" cy="118" r="12" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="96" cy="116" r="9" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />

              <defs>
                <radialGradient id="soap-radial" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div className="phenomenon-details">
            <h4 className="phenomenon-name">{visuals[1]?.name || 'Sabun Pembersih'}</h4>
            <div className="phenomenon-formula">
              <code>{visuals[1]?.chemicalName || 'Garam Asam Lemak (R-COONa)'}</code>
            </div>
            <p className="phenomenon-trait">
              <strong>Sensasi:</strong> {visuals[1]?.sensoryTrait || 'Permukaan tangan menjadi licin saat terkena air'}
            </p>
            <div className="phenomenon-meta-row">
              <span className="meta-sub-pill">Ion Dominan: <strong>OH⁻</strong></span>
              <span className="meta-sub-pill">Lakmus: <strong>Biru</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Paragraf Kontekstual Apersepsi (3 Paragraf Utama) */}
      <div className="apersepsi-narrative-box">
        <div className="narrative-tag-row">
          <span className="narrative-step-pill">Eksplorasi Konsep</span>
          <span className="narrative-info-text">Hubungan indera manusia dengan interaksi partikel mikroskopis</span>
        </div>

        <div className="narrative-paragraphs">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="narrative-p">
              <span className="p-num-marker" aria-hidden="true">
                {index + 1}
              </span>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* 4. Pertanyaan Pemantik (Accordion Interaktif) */}
      <div className="trigger-questions-wrapper">
        <div className="trigger-header-block">
          <div className="section-pill-tag">
            <span aria-hidden="true">❓</span>
            <span>Uji Keingintahuan Ilmiah</span>
          </div>
          <h4 className="trigger-title">Pertanyaan Pemantik</h4>
          <p className="trigger-desc">
            Klik masing-masing pertanyaan di bawah untuk membuka pembahasan konseptual kimia dan memperdalam pemahamanmu:
          </p>
        </div>

        {/* Reusable Accordion Component */}
        <Accordion items={triggerQuestions} allowMultiple={true} defaultOpenId="pertanyaan-1" />
      </div>

      {/* 5. Jembatan Materi (Teks Penutup) */}
      <div className="closing-bridge-card">
        <div className="closing-bridge-glow" aria-hidden="true"></div>
        <div className="closing-bridge-content">
          <div className="closing-bridge-icon" aria-hidden="true">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <div className="closing-bridge-text-wrap">
            <div className="bridge-tag-label">🌉 JEMBATAN MATERI • MENUJU MATERI INTI</div>
            <p className="closing-bridge-text">{closingBridge}</p>
          </div>
          {onProceedToObjectives && (
            <button
              type="button"
              className="btn-bridge-next"
              onClick={onProceedToObjectives}
            >
              <span>Pelajari Tujuan & Teori</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

