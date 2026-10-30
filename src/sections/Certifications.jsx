import { useEffect, useRef, useState } from 'react';
import {
  FaCertificate, FaGoogle, FaArrowUpRightFromSquare, FaExpand, FaXmark,
} from 'react-icons/fa6';
import { certificationsData, issuers, verifyUrl } from '../data/certificationsData';
import styles from '../components/certifications.module.css';

const issuerIcon = (issuer) => {
  if (issuer === 'google') return <FaGoogle />;
  if (issuer === 'credly') return <FaGoogle />;
  return <FaCertificate />;
};

// '2026-10-27' / '2026-10' → 'Oct 2026'
const formatDate = (d) =>
  new Date(`${d.slice(0, 7)}-01`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

// '/certs/x.webp' → '/certs/thumbs/x.webp' (versi kecil untuk kartu)
// Badge Credly sudah kecil → tidak punya versi thumbs
const thumbOf = (src) =>
  src?.startsWith('/certs/') && !src.startsWith('/certs/credly/') && src.endsWith('.webp')
    ? src.replace('/certs/', '/certs/thumbs/')
    : src;

// Terbaru di atas
const sorted = [...certificationsData].sort((a, b) => b.date.localeCompare(a.date));

// Jumlah kartu sebelum tombol "Show all"
const INITIAL = 6;

export default function Certifications() {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [preview, setPreview] = useState(null); // sertifikat yang sedang dibuka
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  // Buka / tutup <dialog> mengikuti state preview
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (preview && !dialog.open) dialog.showModal();
    if (!preview && dialog.open) dialog.close();
  }, [preview]);

  const openPreview = (e, cert) => {
    triggerRef.current = e.currentTarget;
    setPreview(cert);
  };

  const closePreview = () => {
    setPreview(null);
    triggerRef.current?.focus({ preventScroll: true });
  };

  const filters = [
    { key: 'all', label: 'All', count: sorted.length },
    ...Object.entries(issuers).map(([key, label]) => ({
      key,
      label,
      count: sorted.filter((c) => c.issuer === key).length,
    })),
  ].filter((f) => f.count > 0);

  const filtered = filter === 'all' ? sorted : sorted.filter((c) => c.issuer === filter);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL);

  return (
    <section className={styles.certs} id="certifications">
      <div className={styles.container}>
        <p className={styles.categorySub}>CERTIFICATIONS</p>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleHash}>#</span> Courses &amp; badges
        </h2>
        <p className={styles.subtitle}>
          Courses I&apos;ve completed and badges I&apos;ve earned — each one links to its verification page.
        </p>

        {/* Tombol filter (hanya tampil kalau ada lebih dari 1 penerbit) */}
        {filters.length > 2 && (
          <div className={styles.filters} role="group" aria-label="Filter sertifikat">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`${styles.chip} ${filter === f.key ? styles.chipActive : ''}`}
                aria-pressed={filter === f.key}
                onClick={() => {
                  setFilter(f.key);
                  setShowAll(false);
                }}
              >
                {f.label} <span className={styles.count}>{f.count}</span>
              </button>
            ))}
          </div>
        )}

        <ul className={styles.grid}>
          {visible.map((cert) => {
            const link = verifyUrl(cert);
            return (
              <li key={cert.id ?? cert.title} className={styles.card}>
                {cert.image && (
                  <button
                    type="button"
                    className={`${styles.thumbButton} ${cert.issuer === 'credly' ? styles.badgeThumb : ''}`}
                    onClick={(e) => openPreview(e, cert)}
                    aria-label={`Lihat sertifikat ${cert.title}`}
                  >
                    <img
                      src={thumbOf(cert.image)}
                      alt=""
                      className={styles.thumb}
                      loading="lazy"
                      width="480"
                      height="339"
                    />
                    <span className={styles.expand}><FaExpand size={12} /></span>
                  </button>
                )}

                <div className={styles.body}>
                  <div className={styles.meta}>
                    <span className={styles.icon}>{issuerIcon(cert.issuer)}</span>
                    <span className={styles.issuer}>{cert.org ?? issuers[cert.issuer] ?? cert.issuer}</span>
                    <span className={styles.dot} aria-hidden="true">·</span>
                    <time className={styles.date} dateTime={cert.date}>{formatDate(cert.date)}</time>
                  </div>

                  <h3 className={styles.title}>{cert.title}</h3>

                  {cert.skills?.length > 0 && (
                    <ul className={styles.tags}>
                      {cert.skills.map((s) => (
                        <li key={s} className={styles.tag}>{s}</li>
                      ))}
                    </ul>
                  )}

                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.verify}
                      aria-label={`Verify ${cert.title} (opens in a new tab)`}
                    >
                      {cert.id ?? 'Verify'} <FaArrowUpRightFromSquare size={11} />
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {filtered.length > INITIAL && (
          <button
            type="button"
            className={styles.showMore}
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
          >
            {showAll ? 'Show less' : `Show all (${filtered.length})`}
          </button>
        )}
      </div>

      {/* Preview sertifikat ukuran besar */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClose={closePreview}
        onClick={(e) => e.target === e.currentTarget && closePreview()}
        aria-label={preview ? `Sertifikat ${preview.title}` : undefined}
      >
        {preview && (
          <div className={styles.dialogInner}>
            <button type="button" className={styles.close} onClick={closePreview} aria-label="Tutup">
              <FaXmark size={18} />
            </button>
            <img
              src={preview.image}
              alt={`Sertifikat ${preview.title}`}
              className={`${styles.full} ${preview.issuer === 'credly' ? styles.fullBadge : ''}`}
            />
            <div className={styles.dialogFooter}>
              <span>{preview.title}</span>
              {verifyUrl(preview) && (
                <a href={verifyUrl(preview)} target="_blank" rel="noreferrer" className={styles.verify}>
                  Verify <FaArrowUpRightFromSquare size={11} />
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
