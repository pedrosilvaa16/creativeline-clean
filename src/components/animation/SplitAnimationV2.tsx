"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SplitTextCtor = new (
  target: Element | string,
  vars?: Record<string, any>
) => { revert: () => void; chars?: Element[]; words?: Element[]; lines?: Element[] };

interface SplitAnimationProps {
  children: React.ReactNode;
}

const SplitAnimationV2 = ({ children }: SplitAnimationProps) => {
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const [SplitText, setSplitText] = useState<SplitTextCtor | null>(null);

  // Import dinâmico do SplitText a partir do GSAP (sem caminho local)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        type GsapSplitModule = { SplitText?: SplitTextCtor };
        let mod: GsapSplitModule | undefined;
        try { mod = await import("gsap/SplitText"); } catch {}
        if (!mod?.SplitText) { try { mod = await import("gsap/dist/SplitText"); } catch {} }

        if (alive && mod?.SplitText) {
          gsap.registerPlugin(mod.SplitText);
          setSplitText(() => mod.SplitText as SplitTextCtor);
        } else if (alive) {
          console.warn("[SplitAnimationV2] Não foi possível carregar o SplitText do GSAP.");
        }
      } catch (e) {
        console.error("Erro ao carregar SplitText:", e);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Anima quando o SplitText estiver disponível
  useEffect(() => {
    if (!SplitText) return;
    if (typeof window === "undefined" || window.innerWidth <= 1023) return;

    const el = textRef.current;
    if (!el) return;

    const splitEl = new SplitText(el, {
      type: "lines, words",
      linesClass: "line",
    });

    const splitTl = gsap.timeline({
      defaults: { duration: 0.35, ease: "power4.out" },
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });

    splitTl.from(splitEl.words ?? [el], {
      yPercent: 100,
      opacity: 0,
      stagger: 0.025,
    });

    return () => {
      splitTl.scrollTrigger?.kill();
      splitTl.kill();
      splitEl.revert();
    };
  }, [SplitText]);

  return <h2 ref={textRef} className="split-text">{children}</h2>;
};

export default SplitAnimationV2;