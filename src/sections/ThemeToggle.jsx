import { FaMoon, FaSun } from 'react-icons/fa6';
import useTheme from '../context/useTheme';
import styles from '../components/themetoggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span className={`${styles.icon} ${isDark ? styles.visible : styles.hidden}`}>
        <FaMoon size={15} />
      </span>
      <span className={`${styles.icon} ${!isDark ? styles.visible : styles.hidden}`}>
        <FaSun size={16} />
      </span>
    </button>
  );
}
