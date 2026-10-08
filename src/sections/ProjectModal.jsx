import { useEffect, useRef } from 'react';
import { FaGithub, FaFileCode, FaXmark, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import styles from '../components/projectmodal.module.css';

/**
 * Modal detail project.
 * - project: object project yang dipilih (null = modal tertutup)
 * - onClose: dipanggil saat modal ditutup (tombol X, klik backdrop, atau Esc)
 *
 * Field opsional di projectsData yang ikut ditampilkan kalau ada:
 *   image, longDescription, points, demo, fileName
 */
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);

  // Buka / tutup <dialog> mengikuti state project
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden'; // kunci scroll halaman
    } else if (!project && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  // Klik di area gelap (di luar kotak modal) = tutup
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      onClose={onClose}          /* terpanggil juga saat tekan Esc */
      onClick={handleBackdropClick}
      aria-labelledby="project-modal-title"
    >
      {project && (
        <div className={styles.inner}>
          {/* Tab "file" ala editor, sama seperti kartu */}
          <div className={styles.fileTab}>
            <span className={styles.fileName}>
              <FaFileCode className={styles.fileIcon} />
              {project.fileName ?? `${project.title}.md`}
            </span>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Tutup detail project"
            >
              <FaXmark size={16} />
            </button>
          </div>

          <div className={styles.body}>
            {project.image && (
              <img
                src={project.image}
                alt={`Tampilan ${project.title}`}
                className={styles.image}
              />
            )}

            <h3 id="project-modal-title" className={styles.title}>
              {project.title}
            </h3>

            <p className={styles.description}>
              {project.longDescription ?? project.description}
            </p>

            {project.points?.length > 0 && (
              <>
                <p className={styles.label}>WHAT IT DEMONSTRATES</p>
                <ul className={styles.pointsList}>
                  {project.points.map((pt, i) => (
                    <li key={i} className={styles.pointItem}>{pt}</li>
                  ))}
                </ul>
              </>
            )}

            <p className={styles.label}>TECH STACK</p>
            <ul className={styles.tagList}>
              {project.tech.map((t, i) => (
                <li key={i} className={styles.tag}>{t}</li>
              ))}
            </ul>
          </div>

          <div className={styles.footer}>
            <a href={project.github} target="_blank" rel="noreferrer" className={styles.btnGhost}>
              <FaGithub size={14} /> View Source
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className={styles.btnPrimary}>
                <FaArrowUpRightFromSquare size={12} /> Live Demo
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}