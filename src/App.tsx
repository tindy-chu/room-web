import React, { useEffect } from 'react';
import { create } from 'zustand';
import { Toaster } from 'react-hot-toast';

import Login from './screens/login';

import themeJson from './assets/theme.json';
import GlobalSpinner from './components/globalSpinner';

export type TAppState = {
  theme: 'dark' | 'light';
  loading: boolean;
  toggleTheme: () => void;
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
}));

const App: React.FC = () => {
  const appStore = useAppStore();

  useEffect(() => {
    const theme = themeJson[appStore.theme];
    Object.keys(theme).forEach((key) => {
      document.documentElement.style.setProperty(
        key,
        theme[key as keyof typeof theme]
      );
    });
  }, [appStore.theme]);

  return (
    <>
      <Login />
      <GlobalSpinner />
      <Toaster />
    </>
  );
};

export default App;
