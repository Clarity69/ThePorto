import { useEffect, useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import ThemeToggle from './ThemeToggle';
import styles from '../components/navbar.module.css';

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
    { label: 'Connect', href: '#connect' },
];

export default function Navbar() {
  // Menu yang sedang aktif (default: Home)
  const [activeMenu, setActiveMenu] = useState('Home');
  // Menu mobile (hamburger) terbuka atau tertutup
  const [menuOpen, setMenuOpen] = useState(false);

  // Selama menu terbuka: tutup dengan Esc,
  // atau otomatis tutup kalau layar dilebarkan ke ukuran desktop
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 769px)');
    const onResize = (e) => {
      if (e.matches) setMenuOpen(false);
    };

    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);

    // Cleanup: lepas listener saat menu ditutup / komponen hilang
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  // Klik link: tandai aktif + tutup menu mobile
  const handleNavClick = (label) => {
    setActiveMenu(label);
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Brand / Logo */}
        <a href="#home" className={styles.brand} onClick={() => handleNavClick('Home')}>
          &lt;<span className={styles.brandHighlight}>The Porto</span>/&gt;
        </a>

        <div className={styles.right}>
          {/* Menu: baris di desktop, panel dropdown di mobile */}
          <nav
            id="main-nav"
            className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
            aria-label="Navigasi utama"
          >
            <ul className={styles.navList}>
              {menuItems.map((item) => {
                const isActive = activeMenu === item.label;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => handleNavClick(item.label)}
                      className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ThemeToggle />

          {/* Tombol hamburger — hanya tampil di mobile (diatur lewat CSS) */}
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {menuOpen ? <FaXmark size={18} /> : <FaBars size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}