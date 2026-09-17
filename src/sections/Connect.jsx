import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import styles from '../components/connect.module.css';

export default function Connect() {
  return (
    <section className={styles.connect} id="connect">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Let's Connect</p>
        <h2 className={styles.title}>Interested in my work?</h2>
        <p className={styles.lede}>
          Feel free to explore my projects or connect with me through GitHub, or
          the social links on this page.
        </p>

        <div className={styles.actions}>
          <a
            href="https://github.com/Clarity69"
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={18} />
            View GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/ahmad-taroqi-410187411/"
            className={styles.btnGhost}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size={18} />
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}