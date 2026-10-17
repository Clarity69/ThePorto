import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';
import styles from '../components/hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.container}>
        {/* Kolom Kiri - Info Utama */}
        <div>
          <div className={styles.badge}>$ whoami</div>
          <p className={styles.greeting}>Hi, I'm</p>
          <h1 className={styles.name}>Taro</h1>
          <h2 className={styles.role}>Informatics Student &amp; Software Developer</h2>
          <p className={styles.description}>
            I build practical software projects and explore web development, IoT, and data-driven applications. I learn primarily by building, breaking, debugging and improving real projects.
          </p>

          <div className={styles.ctaGroup}>
            <a
              href="https://github.com/Clarity69"
              target="_blank"
              rel="noreferrer"
              className={styles.btnPrimary}
            >
              <FaGithub size={18} />
              View GitHub
            </a>
            <a href="#projects" className={styles.btnSecondary}>
              See Projects
            </a>
          </div>
        </div>

        {/* Kolom Kanan - Terminal Card (dekoratif) */}
        <div className={styles.terminalCard}>
          <div className={styles.terminalHeader}>
            <div className={styles.dots} aria-hidden="true">
              <span className={styles.dotRed}></span>
              <span className={styles.dotYellow}></span>
              <span className={styles.dotGreen}></span>
            </div>
            <span className={styles.terminalTitle}>guest@Clarity69:~</span>
          </div>

          <div className={styles.terminalBody}>
            <div>
              <span className={styles.cmdPrompt}>$</span>
              <span className={styles.cmdKey}>whoami</span>
            </div>
            <div className={styles.cmdValue}>Taro</div>

            <div>
              <span className={styles.cmdPrompt}>$</span>
              <span className={styles.cmdKey}>role</span>
            </div>
            <div className={styles.cmdValue}>Informatics Student</div>

            <div>
              <span className={styles.cmdPrompt}>$</span>
              <span className={styles.cmdKey}>focus</span>
            </div>
            <div className={styles.cmdValue}>Web Development</div>

            <div>
              <span className={styles.cmdPrompt}>$</span>
              <span className={styles.cmdKey}>exploring</span>
            </div>
            <div className={styles.cmdValue}>IoT · Data Mining</div>

            <div aria-hidden="true">
              <span className={styles.cmdPrompt}>$</span>
              <span className={styles.cursor}></span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Social Bar — link berisi ikon saja, jadi wajib punya aria-label */}
      <aside className={styles.socialSidebar} aria-label="Social links">
        <a
          href="https://github.com/Clarity69"
          target="_blank"
          rel="noreferrer"
          className={styles.socialIcon}
          title="GitHub"
          aria-label="GitHub (opens in a new tab)"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/ahmad-taroqi-410187411/"
          target="_blank"
          rel="noreferrer"
          className={styles.socialIcon}
          title="LinkedIn"
          aria-label="LinkedIn (opens in a new tab)"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=taroqiafghani@gmail.com&su=Halo%20Taro%20-%20Diskusi%20Project"
          target="_blank"
          rel="noreferrer"
          className={styles.socialIcon}
          title="Gmail"
          aria-label="Send an email via Gmail (opens in a new tab)"
        >
          <SiGmail size={20} />
        </a>
      </aside>
    </section>
  );
}