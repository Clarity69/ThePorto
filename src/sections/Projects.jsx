import { useState } from 'react';
import { FaGithub, FaFileCode, FaExpand, FaStar, FaCodeFork } from 'react-icons/fa6';
import useGithubRepos from '../hooks/useGithubRepos';
import ProjectModal from './ProjectModal';
import styles from '../components/projects.module.css';
 import { featuredProjects, otherProjects, previewImages, hiddenRepos } from '../data/projectsData';

const GITHUB_USER = 'Clarity69';


// "https://github.com/Clarity69/My-Shell" → "my-shell"
const repoKey = (url) => url.replace(/\/+$/, '').split('/').pop().toLowerCase();

// Gambar preview otomatis dari GitHub (dipakai kalau tidak ada screenshot sendiri)
const githubPreview = (url, version = 1) => {
  const [owner, repo] = url.replace(/\/+$/, '').split('/').slice(-2);
  return `https://opengraph.githubassets.com/${version}/${owner}/${repo}`;
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

// Info live dari GitHub: bahasa · star · fork · update terakhir
function RepoStats({ repo }) {
  if (!repo) return null;
  return (
    <div className={styles.repoStats}>
      {repo.language && (
        <span>
          <span className={styles.langDot} />
          {repo.language}
        </span>
      )}
      <span title="Stars"><FaStar size={11} /> {repo.stars}</span>
      <span title="Forks"><FaCodeFork size={11} /> {repo.forks}</span>
      {repo.updatedAt && <span>Updated {formatDate(repo.updatedAt)}</span>}
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { repos, loading, error } = useGithubRepos(GITHUB_USER);

  // Cari data GitHub tiap repo berdasarkan nama
  const repoMap = new Map(repos.map((r) => [r.name.toLowerCase(), r]));

  // Featured: data manual + info live dari API
  const featured = featuredProjects.map((p) => ({
    ...p,
    repo: repoMap.get(repoKey(p.github)),
  }));

  // Other: semua repo dari API, kecuali yang sudah ada di Featured,
  // fork, repo yang di-archive, dan repo profil README (Clarity69/Clarity69)
  const featuredKeys = new Set(featuredProjects.map((p) => repoKey(p.github)));
    const liveOthers = repos
    .filter((r) => !r.fork && !r.archived)
    .filter((r) => !featuredKeys.has(r.name.toLowerCase()))
    .filter((r) => r.name.toLowerCase() !== GITHUB_USER.toLowerCase())
    .filter((r) => !hiddenRepos.includes(r.name.toLowerCase()))   // ← ini
    .map((r) => ({
      id: r.name,
      title: r.name,
      description: r.description || 'No description yet.',
      tech: r.topics.length > 0 ? r.topics : r.language ? [r.language] : [],
      github: r.url,
      demo: r.homepage || undefined,
      repo: r,
    }));

  // Kalau API gagal / kosong → pakai daftar manual lama
  // Gambar untuk modal: screenshot sendiri dulu, kalau tidak ada → preview GitHub
  const others = (liveOthers.length > 0 ? liveOthers : otherProjects).map((p) => ({
    ...p,
    image:
      p.image ??
      previewImages[repoKey(p.github)] ??
      githubPreview(p.github, p.repo ? Date.parse(p.repo.updatedAt) : 1),
  }));

  const openOnKey = (e, project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedProject(project);
    }
  };
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
          {featured.map((project) => (
            <article
              key={project.id}
              className={`${styles.featuredCard} ${styles.clickable}`}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => openOnKey(e, project)}
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

              {project.image && (
                <div className={styles.thumbWrap}>
                  <img src={project.image} alt={`Tampilan ${project.title}`} className={styles.thumb} loading="lazy" />
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
                  <a href={project.github} target="_blank" rel="noreferrer" className={styles.sourceLink} onClick={stop}>
                    <FaGithub size={14} /> View Source
                  </a>
                  <RepoStats repo={project.repo} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <hr className={styles.divider} />

        <p className={styles.categorySub}>
          MORE {liveOthers.length > 0 && <span className={styles.liveBadge}>● live from GitHub</span>}
        </p>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleHash}>#</span> Other projects &amp; experiments
        </h2>
        <p className={styles.subtitle}>
          Coursework, tooling and desktop configuration — smaller in scope, but still real code.
        </p>

        {error && (
          <p className={styles.apiNote}>
            Couldn&apos;t reach GitHub ({error}) — showing a saved list instead.
          </p>
        )}

        <div className={styles.otherGrid}>
          {loading
            ? // Kerangka kartu selama data dimuat
              [1, 2, 3].map((n) => <div key={n} className={styles.skeleton} aria-hidden="true" />)
            : others.map((project) => (
                <article
                  key={project.id}
                  className={`${styles.otherCard} ${styles.clickable}`}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => openOnKey(e, project)}
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
                      <a href={project.github} target="_blank" rel="noreferrer" className={styles.sourceLink} onClick={stop}>
                        <FaGithub size={14} /> Source
                      </a>
                      <RepoStats repo={project.repo} />
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}