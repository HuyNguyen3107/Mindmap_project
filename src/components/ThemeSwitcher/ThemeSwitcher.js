// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import "./ThemeSwitcher.scss";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="theme-switcher">
      {theme === "light" ? (
        <button onClick={() => setTheme("dark")}>
          <i className="pi pi-moon"></i>
        </button>
      ) : (
        <button onClick={() => setTheme("light")}>
          <i className="pi pi-sun"></i>
        </button>
      )}
    </div>
  );
}
