import { useEffect, useState } from 'react';
import {
  FaGithub, FaFileCode, FaExpand, FaStar, FaCodeFork, FaArrowUpRightFromSquare,
} from 'react-icons/fa6';
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

// "/projects/home.webp" → "/projects/thumbs/home.webp" (versi 640px untuk kartu kecil)
// SVG & gambar eksternal tidak punya versi kecil → null (pakai gambar aslinya)
const thumbOf = (src) =>
  src?.startsWith('/projects/') && src.endsWith('.webp')
    ? src.replace('/projects/', '/projects/thumbs/')
    : null;

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
      {repo.stars > 0 && <span title="Stars"><FaStar size={11} /> {repo.stars}</span>}
      {repo.forks > 0 && <span title="Forks"><FaCodeFork size={11} /> {repo.forks}</span>}
      {repo.updatedAt && <span>Updated {formatDate(repo.updatedAt)}</span>}
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { repos, loading, error } = useGithubRepos(GITHUB_USER);

  // Elemen yang membuka modal → fokus dikembalikan ke sini setelah modal ditutup.
  // Disimpan di state (bukan ref) supaya lolos aturan react-hooks/refs.
  const [lastTrigger, setLastTrigger] = useState(null);

  useEffect(() => {
    if (selectedProject === null && lastTrigger) {
      lastTrigger.focus({ preventScroll: true });
    }
  }, [selectedProject, lastTrigger]);

  // Cari data GitHub tiap repo berdasarkan nama
  const repoMap = new Map(repos.map((r) => [r.name.toLowerCase(), r]));

  // Featured: data manual + info live dari API
  const featured = featuredProjects.map((p) => ({
    ...p,
    repo: repoMap.get(repoKey(p.github)),
  }));

  // Other: semua repo dari API, kecuali yang sudah ada di Featured,
  // fork, repo yang di-archive, repo profil README, dan hiddenRepos
  const featuredKeys = new Set(featuredProjects.map((p) => repoKey(p.github)));
  const liveOthers = repos
    .filter((r) => !r.fork && !r.archived)
    .filter((r) => !featuredKeys.has(r.name.toLowerCase()))
    .filter((r) => r.name.toLowerCase() !== GITHUB_USER.toLowerCase())
    .filter((r) => !hiddenRepos.includes(r.name.toLowerCase()))
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

  // Hierarki: 1 unggulan → 3 kartu grid → sisanya jadi daftar ringkas
  const [spotlight, ...restFeatured] = featured;
  const gridProjects = restFeatured.slice(0, 3);
  const listFeatured = restFeatured.slice(3);

  // Buka modal + ingat elemen pemicunya (untuk mengembalikan fokus)
  const openProject = (e, project) => {
    setLastTrigger(e.currentTarget);
    setSelectedProject(project);
  };

  const openOnKey = (e, project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProject(e, project);
    }
  };

  // Klik / Enter di link dalam elemen yang bisa diklik jangan ikut membuka modal
  const stop = (e) => e.stopPropagation();

  // Props bersama untuk semua elemen yang membuka modal
  const clickableProps = (project) => ({
    onClick: (e) => openProject(e, project),
    onKeyDown: (e) => openOnKey(e, project),
    role: 'button',
    tabIndex: 0,
    'aria-label': `Lihat detail ${project.title}`,
  });

  // Satu baris di daftar ringkas
  const renderRow = (project) => (
    <li key={`${project.title}-${project.id}`}>
      <div className={styles.row} {...clickableProps(project)}>
        <span className={styles.rowName}>{project.title}</span>
        <span className={styles.rowDesc}>{project.description}</span>
        <span className={styles.rowLang}>
          {(project.repo?.language ?? project.tech?.[0]) && (
            <>
              <span className={styles.langDot} />
              {project.repo?.language ?? project.tech[0]}
            </>
          )}
        </span>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className={styles.rowLink}
          onClick={stop}
          onKeyDown={stop}
          aria-label={`${project.title} on GitHub (opens in a new tab)`}
        >
          <FaArrowUpRightFromSquare size={13} />
        </a>
      </div>
    </li>
  );

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

        {/* ===== 1. Kartu unggulan ===== */}
        {spotlight && (
          <article
            className={`${styles.spotlight} ${styles.clickable} ${spotlight.image ? '' : styles.spotlightNoImage}`}
            {...clickableProps(spotlight)}
          >
            {spotlight.image && (
              <div className={styles.spotlightMedia}>
                <img
                  src={spotlight.image}
                  alt={`Tampilan ${spotlight.title}`}
                  className={styles.spotlightImg}
                />
              </div>
            )}

            <div className={styles.spotlightBody}>
              <div className={styles.cardFileTab}>
                <FaFileCode className={styles.fileIcon} />
                <span>{spotlight.fileName}</span>
                <span className={styles.previewHint}>
                  <FaExpand size={11} /> Preview
                </span>
              </div>

              <div className={styles.spotlightContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.spotlightTitle}>{spotlight.title}</h3>
                  <span className={styles.badgeFeatured}>FEATURED</span>
                </div>

                <p className={styles.description}>{spotlight.description}</p>

                {spotlight.points?.length > 0 && (
                  <ul className={styles.pointsList}>
                    {spotlight.points.slice(0, 2).map((pt, i) => (
                      <li key={i} className={styles.pointItem}>{pt}</li>
                    ))}
                  </ul>
                )}

                <ul className={styles.tagList}>
                  {spotlight.tech.map((t, i) => (
                    <li key={i} className={styles.tag}>{t}</li>
                  ))}
                </ul>

                <div className={styles.cardFooter}>
                  <div className={styles.links}>
                    <a href={spotlight.github} target="_blank" rel="noreferrer" className={styles.sourceLink} onClick={stop} onKeyDown={stop}>
                      <FaGithub size={14} /> View Source
                    </a>
                    {spotlight.demo && (
                      <a href={spotlight.demo} target="_blank" rel="noreferrer" className={styles.sourceLink} onClick={stop} onKeyDown={stop}>
                        <FaArrowUpRightFromSquare size={12} /> Live Demo
                      </a>
                    )}
                  </div>
                  <RepoStats repo={spotlight.repo} />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ===== 2. Grid 3 kartu ===== */}
        {gridProjects.length > 0 && (
          <div className={styles.featuredGrid}>
            {gridProjects.map((project) => (
              <article
                key={project.id}
                className={`${styles.featuredCard} ${styles.clickable}`}
                {...clickableProps(project)}
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
                    <img
                      src={project.image}
                      srcSet={
                        thumbOf(project.image)
                          ? `${thumbOf(project.image)} 640w, ${project.image} 1280w`
                          : undefined
                      }
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 380px"
                      alt={`Tampilan ${project.title}`}
                      className={styles.thumb}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className={styles.cardContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>

                  <p className={styles.description}>{project.description}</p>

                  <ul className={styles.tagList}>
                    {project.tech.map((t, i) => (
                      <li key={i} className={styles.tag}>{t}</li>
                    ))}
                  </ul>

                  <div className={styles.cardFooter}>
                    <a href={project.github} target="_blank" rel="noreferrer" className={styles.sourceLink} onClick={stop} onKeyDown={stop}>
                      <FaGithub size={14} /> View Source
                    </a>
                    <RepoStats repo={project.repo} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ===== 3. Daftar ringkas ===== */}
        <div className={styles.moreHeader}>
          <p className={styles.categorySub}>
            MORE {liveOthers.length > 0 && <span className={styles.liveBadge}>● live from GitHub</span>}
          </p>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleHash}>#</span> Other projects &amp; experiments
          </h2>
        </div>

        {error && (
          <p className={styles.apiNote}>
            Couldn&apos;t reach GitHub ({error}) — showing a saved list instead.
          </p>
        )}

        <ul className={styles.rowList}>
          {listFeatured.map(renderRow)}
          {loading
            ? [1, 2, 3].map((n) => (
              <li key={`skeleton-${n}`} className={styles.rowSkeleton} aria-hidden="true" />
            ))
            : others.map(renderRow)}
        </ul>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}