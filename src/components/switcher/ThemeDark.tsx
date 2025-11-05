"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

export default function ThemeDark() {
  // lê o valor guardado logo na inicialização (evita setState no effect)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true; // SSR fallback
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return true; // por defeito: dark
  });

  // aplica o tema ao <html> sempre que muda isDark
  useEffect(() => {
    try {
      const html = document.documentElement;
      html.classList.toggle("bg-dark", isDark);
      html.style.colorScheme = isDark ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch (e) {
      console.warn("Theme apply error:", e);
    }
  }, [isDark]);

  // alternar o tema
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div
      className="radio-btn"
      onClick={toggleTheme}
      role="button"
      aria-label="Toggle theme"
      title="Toggle dark/light mode"
    >
      <div className={`radio-inner ${isDark ? "active" : ""}`} />
    </div>
  );
}
