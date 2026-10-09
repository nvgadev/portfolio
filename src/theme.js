import { useEffect, useState } from 'react';

// Light by default; the visitor's choice is remembered in this browser.
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('vg-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('vg-theme', theme);
    } catch {
      /* storage unavailable: keep the in-memory choice */
    }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))];
}
