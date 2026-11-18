/**
 * DeveloperFooter.jsx - Footer identitas pengembang KimiLab.
 * Menggantikan footer lama di Beranda: kini berisi nama pengembang,
 * lokasi pengembangan, dan informasi umum aplikasi.
 */
export default function DeveloperFooter() {
  return (
    <footer className="dev-footer" aria-label="Informasi Pengembang KimiLab">
      <div className="dev-footer-container">
        {/* Kolom Brand */}
        <div className="dev-footer-brand-col">
          <div className="dev-footer-brand">
            <div className="dev-footer-logo" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.31L4.2 20.2a1 1 0 0 0 .8 1.8h14a1 1 0 0 0 .8-1.8L14 9.31V2" />
                <path d="M8.5 2h7" />
                <path d="M7 16h10" />
              </svg>
            </div>
            <span className="dev-footer-brand-name">
              Kimi<span className="dev-footer-accent">Lab</span>
            </span>
          </div>
          <p className="dev-footer-tagline">
            Media Pembelajaran Kimia SMA Interaktif &amp; Mandiri berbasis sintaks
            Learning Cycle 5E (Engage, Explore, Explain, Elaborate, Evaluate).
          </p>
          <p className="dev-footer-legal">Standar Notasi: IUPAC &amp; Kemendikbudristek RI</p>
        </div>

        {/* Kolom Pengembang */}
        <div className="dev-footer-col">
          <h4>Pengembang</h4>
          <ul>
            <li>Adelya Fatichatur Rizqi Prayitno</li>
            <li>Mohammad Adzim Malik</li>
            <li>Vita Ayu Febriana</li>
          </ul>
        </div>

        {/* Kolom Lokasi Pengembangan */}
        <div className="dev-footer-col">
          <h4>Lokasi Pengembangan</h4>
          <ul>
            <li>Departemen Kimia</li>
            <li>Universitas Negeri Malang</li>
          </ul>
        </div>

        {/* Kolom Informasi */}
        <div className="dev-footer-col">
          <h4>Informasi</h4>
          <ul>
            <li>© 2026 KimiLab — Media Pembelajaran Kimia SMA Kelas XI</li>
            <li>Versi 1.0 • React 19 + Vite</li>
            <li>100% Client-Side Single Page Application (SPA)</li>
          </ul>
        </div>
      </div>

      <div className="dev-footer-bottom">
        <p>© 2026 KimiLab • Departemen Kimia, Universitas Negeri Malang.</p>
      </div>
    </footer>
  );
}
