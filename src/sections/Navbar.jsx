import { useState } from 'react';
import styles from '../components/navbar.module.css';

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
];

export default function Navbar() {
  // State untuk menandai menu mana yang aktif (default: Home)
  const [activeMenu, setActiveMenu] = useState('Home');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Brand / Logo: <Clarity69/> */}
        <a href="#home" className={styles.brand}>
          &lt;<span className={styles.brandHighlight}>The Porto</span>/&gt;
        </a>

        {/* Navigation Menu */}
        <nav>
          <ul className={styles.navList}>
            {menuItems.map((item) => {
              const isActive = activeMenu === item.label;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setActiveMenu(item.label)}
                    className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}