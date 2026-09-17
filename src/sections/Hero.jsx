import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';
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

        {/* Kolom Kanan - Terminal Card */}
        <div className={styles.terminalCard}>
          <div className={styles.terminalHeader}>
            <div className={styles.dots}>
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

            <div>
              <span className={styles.cmdPrompt}>$</span>
              <span className={styles.cursor}></span>
            </div>
          </div>
        </div>
      </div>

    {/* Floating Social Bar */}
      <aside className={styles.socialSidebar}>
        <a 
          href="https://github.com/Clarity69" 
          target="_blank" 
          rel="noreferrer" 
          className={styles.socialIcon} 
          title="GitHub"
        >
          <FaGithub size={20} />
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noreferrer" 
          className={styles.socialIcon} 
          title="LinkedIn"
        >
          <FaLinkedin size={20} />
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noreferrer" 
          className={styles.socialIcon} 
          title="Instagram"
        >
          <FaInstagram size={20} />
        </a>
      </aside>
    </section>
  );
}