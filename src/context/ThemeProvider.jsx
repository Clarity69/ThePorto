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

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  // theme berubah -> <html data-theme="..."> -> CSS variables ikut berganti
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
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

  // Pilihan manual disimpan supaya bertahan setelah reload
  const setTheme = useCallback((next) => {
    setThemeState(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* abaikan */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
