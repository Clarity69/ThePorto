import { FaGithub, FaFileCode } from 'react-icons/fa6';
import { featuredProjects, otherProjects } from '../data/projectsData';
import styles from '../components/projects.module.css';

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        {/* Header 1: Featured Projects */}
        <p className={styles.categorySub}>PROJECTS</p>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleHash}>#</span> Featured projects
        </h2>
        <p className={styles.subtitle}>
          The projects that best show how I build — what problem each one solves and how it was put together.
        </p>

        {/* Featured Grid */}
        <div className={styles.featuredGrid}>
          {featuredProjects.map((project) => (
            <div key={project.id} className={styles.featuredCard}>
              <div className={styles.cardFileTab}>
                <FaFileCode className={styles.fileIcon} />
                <span>{project.fileName}</span>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <span className={styles.badgeFeatured}>FEATURED</span>
                </div>

                <p className={styles.description}>{project.description}</p>

                <p className={styles.pointsLabel}>WHAT IT DEMONSTRATES</p>
                <ul className={styles.pointsList}>
                  {project.points.map((pt, i) => (
                    <li key={i} className={styles.pointItem}>{pt}</li>
                  ))}
                </ul>

                <ul className={styles.tagList}>
                  {project.tech.map((t, i) => (
                    <li key={i} className={styles.tag}>{t}</li>
                  ))}
                </ul>

                <div className={styles.cardFooter}>
                  <a href={project.github} target="_blank" rel="noreferrer" className={styles.sourceLink}>
                    <FaGithub size={14} /> View Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pembatas Antar Bagian */}
        <hr className={styles.divider} />

        {/* Header 2: Other projects & experiments */}
        <p className={styles.categorySub}>MORE</p>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleHash}>#</span> Other projects &amp; experiments
        </h2>
        <p className={styles.subtitle}>
          Coursework, tooling and desktop configuration — smaller in scope, but still real code.
        </p>

        {/* Other Grid */}
        <div className={styles.otherGrid}>
          {otherProjects.map((project) => (
            <div key={project.id} className={styles.otherCard}>
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
                  <a href={project.github} target="_blank" rel="noreferrer" className={styles.sourceLink}>
                    <FaGithub size={14} /> Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}