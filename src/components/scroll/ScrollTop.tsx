"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  showUnder?: number;
  right?: number;
  bottom?: number;
  zIndex?: number;
  withProgress?: boolean;
  className?: string;
  icon?: React.ReactNode;
};

export default function ScrollTop({
  showUnder = 160,
  right = 24,
  bottom = 24,
  zIndex = 60,
  withProgress = false,
  className = "",
  icon,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const computeProgress = useMemo(
    () => () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const p =
        height > 0
          ? Math.min(100, Math.max(0, (scrollTop / height) * 100))
          : 0;
      setProgress(p);
      setVisible(scrollTop > showUnder);
    },
    [showUnder]
  );

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      computeProgress();
      rafId = requestAnimationFrame(update);
    };

    // inicializa num raf (evita setState síncrono)
    rafId = requestAnimationFrame(update);

    window.addEventListener("scroll", computeProgress, { passive: true });
    window.addEventListener("resize", computeProgress);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", computeProgress);
      window.removeEventListener("resize", computeProgress);
    };
  }, [computeProgress]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  const size = 48;
  const style: React.CSSProperties = {
    position: "fixed",
    right,
    bottom,
    zIndex,
    width: size,
    height: size,
    borderRadius: "9999px",
  };

  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Top"
      style={style}
      className={[
        "scroll-top-btn",
        "relative overflow-hidden",
        "rounded-full bg-white text-black shadow-lg",
        "flex items-center justify-center transition-transform hover:scale-105",
        className,
      ].join(" ")}
    >
      {withProgress && (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${size} ${size}`}
          className="absolute"
          style={{ inset: 0, margin: "auto", transform: "rotate(-90deg)" }}
          pointerEvents="none"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(0,0,0,0.08)"
            strokeWidth={stroke}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(173, 230, 49, 1)"
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
            style={{
              strokeDasharray: `${circumference}px`,
              strokeDashoffset: `${dashoffset}px`,
              transition: "stroke-dashoffset 120ms linear",
            }}
          />
        </svg>
      )}
      <span style={{ position: "relative", zIndex: 2, lineHeight: 1, fontSize: 18 }}>
        {icon ?? "↑"}
      </span>
    </button>
  );
}
