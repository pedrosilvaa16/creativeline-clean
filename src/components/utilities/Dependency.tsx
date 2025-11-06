// src/components/utilities/Dependency.tsx
"use client";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollTop from "@/components/scroll/ScrollTop";
import ThemeDark from "@/components/switcher/ThemeDark";

export default function Dependency() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Bootstrap JS
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch((err) => {
      console.error("Bootstrap loading error:", err);
    });

    // AOS animation init
    try {
      AOS.init({
        easing: "ease-out-back",
        duration: 1000,
        once: true,
        disable: window.innerWidth < 768,
      });
    } catch (e) {
      console.error("AOS init error:", e);
    }
  }, []);

  return (
    <>
      {/* === Scroll-to-Top button (com progress ring) === */}
      <ScrollTop
        showUnder={160}
        right={24}
        bottom={96} // 👈 sobe ligeiramente para dar espaço ao switcher
        withProgress
        icon={<i className="fas fa-long-arrow-up" />} // ícone igual ao demo
      />

      {/* === Theme switcher abaixo do scroll-top === */}
      <div className="theme-switcher-fixed">
        <ThemeDark />
      </div>
      {/* === Toast notifications === */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
