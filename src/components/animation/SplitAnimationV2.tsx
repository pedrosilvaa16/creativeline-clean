"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Vars mínimas que usamos (compatível com GSAP) */
type SplitVars = {
  /** "chars", "words", "lines" (pode combinar com vírgulas) */
  type: string;
  linesClass?: string;
  [k: string]: unknown;
};

/** Forma mínima do SplitText que precisamos */
type SplitTextCtor = new (
  target: Element | string,
  vars?: SplitVars
) => {
  revert: () => void;
  chars?: Element[];
  words?: Element[];
  lines?: Element[];
};

interface SplitAnimationProps {
  children: React.ReactNode;
  minWidth?: number;
  splitType?: string;
}

const SplitAnimationV2 = ({
  children,
  minWidth = 1024,
  splitType = "lines, words",
}: SplitAnimationProps) => {
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const [SplitText, setSplitText] = useState<SplitTextCtor | null>(null);

  // Import dinâmico do SplitText (sem depender da tipagem oficial do módulo)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        let mod: unknown;
        try { mod = await import("gsap/SplitText"); } catch {}
        if (!mod) {
          try { mod = await import("gsap/dist/SplitText"); } catch {}
        }

        const maybeCtor = (mod as Record<string, unknown> | undefined)?.["SplitText"];

        if (alive && typeof maybeCtor === "function") {
          gsap.registerPlugin(maybeCtor as any);
          setSplitText(() => maybeCtor as SplitTextCtor);
        } else if (alive) {
          console.warn("[SplitAnimationV2] Não foi possível carregar o SplitText do GSAP.");
        }
      } catch (e) {
        console.error("Erro ao carregar SplitText:", e);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Anima quando SplitText estiver disponível
  useEffect(() => {
    if (!SplitText) return;
    if (typeof window === "undefined" || window.innerWidth <= minWidth) return;

    const el = textRef.current;
    if (!el) return;

    const splitEl = new SplitText(el, { type: splitType, linesClass: "line" });

    const splitTl = gsap.timeline({
      defaults: { duration: 0.35, ease: "power4.out" },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });

    splitTl.from((splitEl.words?.length ? splitEl.words : splitEl.lines) ?? [el], {
      yPercent: 100,
      opacity: 0,
      stagger: 0.025,
    });

    return () => {
      splitTl.scrollTrigger?.kill();
      splitTl.kill();
      splitEl.revert();
    };
  }, [SplitText, minWidth, splitType]);

  return <h2 ref={textRef} className="split-text">{children}</h2>;
};

export default SplitAnimationV2;
