import { createContext } from 'react';

// "Wadah" global untuk tema. Nilai default dipakai kalau
// komponen dipanggil di luar <ThemeProvider>.
export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

// Key localStorage untuk menyimpan pilihan user
export const THEME_STORAGE_KEY = 'theporto-theme';
