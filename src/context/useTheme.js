import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

// Pemakaian di komponen: const { theme, toggleTheme } = useTheme();
export default function useTheme() {
  return useContext(ThemeContext);
}
