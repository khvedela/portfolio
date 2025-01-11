import { writable } from 'svelte/store';

// Check if running in the browser
const isBrowser = typeof window !== 'undefined';

// Initialize theme from localStorage or default to 'light'
const storedTheme = isBrowser ? localStorage.getItem('theme') || 'light' : 'light';
export const theme = writable(storedTheme);

// Toggle theme and persist it to localStorage
export function toggleTheme() {
  theme.update((currentTheme) => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    if (isBrowser) {
      localStorage.setItem('theme', newTheme);
    }
    return newTheme;
  });
}