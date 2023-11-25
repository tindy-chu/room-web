import React, { useEffect } from 'react';
import { create } from 'zustand';
import { Toaster } from 'react-hot-toast';

import themeJson from './assets/theme.json';
import GlobalSpinner from './components/globalSpinner';
import AppRouter from './AppRouter';

export type TAppState = {
  theme: 'dark' | 'light';
  loading: boolean;
  toggleTheme: () => void;
  user: {
    alias: string;
    email: string;
  };
};

export const useAppStore = create<TAppState>((set) => ({
  theme: localStorage.getItem('theme') === 'light' ? 'light' : 'dark',
  loading: false,
  toggleTheme: () => {
    set((state) => {
      const theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
      return { theme: theme };
    });
  },
  user: {
    alias: '',
    email: '',
  },
}));

const App: React.FC = () => {
  const appTheme = useAppStore((state) => state.theme);

  useEffect(() => {
    const theme = themeJson[appTheme];
    Object.keys(theme).forEach((key) => {
      document.documentElement.style.setProperty(
        key,
        theme[key as keyof typeof theme]
      );
    });
  }, [appTheme]);

  return (
    <>
      <AppRouter />
      <GlobalSpinner />
      <Toaster />
    </>
  );
};

export default App;
