"use client";

import { useThemeStore, useThemeInit } from "@/store/themeStore";
import * as Switch from "@radix-ui/react-switch";

export default function Navbar() {
  useThemeInit(); 

  const darkMode = useThemeStore((s) => s.darkMode);
  const toggleDarkMode = useThemeStore((s) => s.toggleDarkMode);

  return (
    <nav className="w-full border-b p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">User Dashboard</h1>

      <div className="flex items-center gap-3">
        <span>Dark Mode</span>

        <Switch.Root
          className="w-12 h-6 bg-gray-300 rounded-full relative"
          checked={darkMode}
          onCheckedChange={toggleDarkMode}
        >
          <Switch.Thumb
            className={`block w-5 h-5 bg-white rounded-full transition-transform ${
              darkMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </Switch.Root>
      </div>
    </nav>
  );
}
