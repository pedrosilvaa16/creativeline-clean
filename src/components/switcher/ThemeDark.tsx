"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

export default function ThemeDark() {
  const [isDark, setIsDark] = useState(true); // dark mode por defeito

  // Ao montar, lê o valor guardado e aplica no <html>
  useEffect(() => {
    try {
      const html = document.documentElement;
      const saved = localStorage.getItem(STORAGE_KEY);
      const dark = saved ? saved === "dark" : true; // default = dark

      html.classList.toggle("bg-dark", dark);
      html.style.colorScheme = dark ? "dark" : "light";
      setIsDark(dark);

      // Se for a 1ª visita, guarda como dark
      if (!saved) localStorage.setItem(STORAGE_KEY, "dark");
    } catch (e) {
      console.warn("Theme init error:", e);
    }
  }, []);

  // Função para alternar tema
  const toggleTheme = () => {
    try {
      const html = document.documentElement;
      const nextDark = !isDark;

      html.classList.toggle("bg-dark", nextDark);
      html.style.colorScheme = nextDark ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY, nextDark ? "dark" : "light");

      setIsDark(nextDark);
    } catch (e) {
      console.warn("Theme toggle error:", e);
    }
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
