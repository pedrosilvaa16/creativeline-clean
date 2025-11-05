"use client";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const mounted = useRef(false);

  // evita animação para quem prefere menos movimento
  const reduced = typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const animateFollower = useCallback(() => {
    if (!mounted.current || reduced) return;

    // easing simples do follower para o rato
    pos.current.x += (mouse.current.x - pos.current.x) / 9;
    pos.current.y += (mouse.current.y - pos.current.y) / 9;

    if (cursorRef.current && followerRef.current) {
      gsap.set(followerRef.current, {
        left: pos.current.x - 20,
        top: pos.current.y - 20,
      });
      gsap.set(cursorRef.current, {
        left: mouse.current.x,
        top: mouse.current.y,
      });
    }

    rafId.current = requestAnimationFrame(animateFollower);
  }, [reduced]);

  useEffect(() => {
    mounted.current = true;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // listeners (passive) e arranque da animação
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    // inicia o loop de animação *depois* de tudo estar definido
    rafId.current = requestAnimationFrame(animateFollower);

    return () => {
      mounted.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [animateFollower]);

  return (
    <div className="cursor-hover-parent">
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </div>
  );
}
