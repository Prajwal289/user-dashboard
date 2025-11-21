import { create } from "zustand";
import { useEffect } from "react";

type ThemeState = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: false, 

  setDarkMode: (value) =>
    set(() => {
      if (typeof window !== "undefined") {
        if (value) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("dark-mode", JSON.stringify(value));
      }

      return { darkMode: value };
    }),

  toggleDarkMode: () =>
    set((state) => {
      const newValue = !state.darkMode;

      if (typeof window !== "undefined") {
        if (newValue) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("dark-mode", JSON.stringify(newValue));
      }

      return { darkMode: newValue };
    }),
}));


export function useThemeInit() {
  const setDarkMode = useThemeStore((s) => s.setDarkMode);

  useEffect(() => {
    const saved = localStorage.getItem("dark-mode");
    const value = saved ? JSON.parse(saved) : false;

  
    if (value) document.documentElement.classList.add("dark");

    setDarkMode(value);
  }, [setDarkMode]);
}
