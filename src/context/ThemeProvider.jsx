import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext, THEME_STORAGE_KEY } from './ThemeContext';

function readSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

function getInitialTheme() {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  return readSavedTheme() ?? (prefersLight ? 'light' : 'dark');
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Pasang tema langsung ke <html> (dipakai juga di dalam view transition)
function applyThemeToDom(theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Jaga <html data-theme> selalu sinkron dengan state
  useEffect(() => {
    applyThemeToDom(theme);
  }, [theme]);

  // Selama user belum memilih manual, ikuti setting OS
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e) => {
      if (!readSavedTheme()) setThemeState(e.matches ? 'light' : 'dark');
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  /**
   * Ganti tema dengan animasi.
   * origin = { x, y } titik awal lingkaran (biasanya posisi tombol tema).
   */
  const setTheme = useCallback((next, origin) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* abaikan */
    }

    const swap = () => {
      applyThemeToDom(next);
      setThemeState(next);
    };

    // 1) Pengguna mematikan animasi → ganti langsung
    if (prefersReducedMotion()) {
      swap();
      return;
    }

    // 2) Browser lama (tanpa View Transitions) → fade warna singkat
    if (!document.startViewTransition) {
      const root = document.documentElement;
      root.classList.add('theme-switching');
      swap();
      window.setTimeout(() => root.classList.remove('theme-switching'), 300);
      return;
    }

    // 3) Browser modern → lingkaran melebar dari tombol tema
    const x = origin?.x ?? window.innerWidth - 40;
    const y = origin?.y ?? 40;
    // Jari-jari sampai sudut layar terjauh, supaya lingkaran menutup seluruh layar
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(swap);

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  }, []);

  // Dipanggil dari tombol: ambil posisi tengah tombol sebagai titik awal
  const toggleTheme = useCallback(
    (event) => {
      let origin;
      const el = event?.currentTarget;
      if (el?.getBoundingClientRect) {
        const rect = el.getBoundingClientRect();
        origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
      setTheme(theme === 'dark' ? 'light' : 'dark', origin);
    },
    [theme, setTheme]
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}