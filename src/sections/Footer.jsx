import { FaInstagram } from 'react-icons/fa6';
import styles from '../components/footer.module.css';

// Ganti dengan username Instagram-mu (tanpa @)
const INSTAGRAM_USER = 'taroqi_';

// Dihitung sekali saat file dimuat (bukan saat render) → aman untuk lint React Compiler
const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copy}>
          © {YEAR} <span className={styles.name}>Taro</span> · built with React + Vite
        </p>

        <a
          href={`https://www.instagram.com/${INSTAGRAM_USER}/`}
          target="_blank"
          rel="noreferrer"
          className={styles.social}
          aria-label={`Instagram @${INSTAGRAM_USER} (opens in a new tab)`}
        >
          <FaInstagram size={16} />
          <span>@{INSTAGRAM_USER}</span>
        </a>
      </div>
    </footer>
  );
}