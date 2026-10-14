import { useState } from 'react';
import { FaGithub, FaFileCode, FaExpand } from 'react-icons/fa6';
import { featuredProjects, otherProjects } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import styles from '../components/projects.module.css';

export default function Projects() {
  // Project yang sedang dibuka di modal (null = modal tertutup)
  const [selectedProject, setSelectedProject] = useState(null);

  // Supaya kartu juga bisa dibuka pakai keyboard (Enter / Spasi)
  const handleKeyDown = (e, project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedProject(project);
    }
  };

  // Klik link "View Source" jangan ikut membuka modal
  const stop = (e) => e.stopPropagation();

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <p className={styles.categorySub}>PROJECTS</p>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleHash}>#</span> Featured projects
        </h2>
        <p className={styles.subtitle}>
          The projects that best show how I build — what problem each one solves and how it was put together.
        </p>

        <div className={styles.featuredGrid}>
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className={`${styles.featuredCard} ${styles.clickable}`}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => handleKeyDown(e, project)}
              role="button"
              tabIndex={0}
              aria-label={`Lihat detail ${project.title}`}
            >
              <div className={styles.cardFileTab}>
                <FaFileCode className={styles.fileIcon} />
                <span>{project.fileName}</span>
                <span className={styles.previewHint}>
                  <FaExpand size={11} /> Preview
                </span>
              </div>

              {/* Thumbnail kecil kalau project punya gambar */}
              {project.image && (
                <div className={styles.thumbWrap}>
                  <img
                    src={project.image}
                    alt={`Tampilan ${project.title}`}
                    className={styles.thumb}
                    loading="lazy"
                  />
                </div>
              )}

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <span className={styles.badgeFeatured}>FEATURED</span>
                </div>

                <p className={styles.description}>{project.description}</p>

                <ul className={styles.tagList}>
                  {project.tech.map((t, i) => (
                    <li key={i} className={styles.tag}>{t}</li>
                  ))}
                </ul>

                <div className={styles.cardFooter}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.sourceLink}
                    onClick={stop}
                  >
                    <FaGithub size={14} /> View Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <hr className={styles.divider} />

        <p className={styles.categorySub}>MORE</p>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleHash}>#</span> Other projects &amp; experiments
        </h2>
        <p className={styles.subtitle}>
          Coursework, tooling and desktop configuration — smaller in scope, but still real code.
        </p>

        <div className={styles.otherGrid}>
          {otherProjects.map((project) => (
            <article
              key={project.id}
              className={`${styles.otherCard} ${styles.clickable}`}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => handleKeyDown(e, project)}
              role="button"
              tabIndex={0}
              aria-label={`Lihat detail ${project.title}`}
            >
              <div>
                <h3 className={styles.projectTitle} style={{ marginBottom: '0.5rem' }}>
                  {project.title}
                </h3>
                <p className={styles.description}>{project.description}</p>
              </div>

              <div>
                <ul className={styles.tagList} style={{ marginBottom: '1rem' }}>
                  {project.tech.map((t, i) => (
                    <li key={i} className={styles.tag}>{t}</li>
                  ))}
                </ul>

                <div className={styles.cardFooter}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.sourceLink}
                    onClick={stop}
                  >
                    <FaGithub size={14} /> Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal detail — terbuka kalau selectedProject tidak null */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}