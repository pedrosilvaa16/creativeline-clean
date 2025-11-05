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
  minWidth?: number;      // breakpoint mínimo
  splitType?: string;     // "chars", "words", "lines"
}

const SplitAnimation = ({
  children,
  minWidth = 1024,
  splitType = "lines, words",
}: SplitAnimationProps) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [SplitText, setSplitText] = useState<SplitTextCtor | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        type GsapSplitModule = { SplitText?: SplitTextCtor };
        let mod: GsapSplitModule | undefined;
        // 1) tentativa padrão
        try { mod = await import("gsap/SplitText"); } catch {}
        // 2) fallback para dist
        if (!mod?.SplitText) { try { mod = await import("gsap/dist/SplitText"); } catch {} }

        if (alive && mod?.SplitText) {
          gsap.registerPlugin(mod.SplitText);
          setSplitText(() => mod.SplitText as SplitTextCtor);
        } else if (alive) {
          console.warn(
            "[SplitAnimation] Não foi possível carregar o SplitText. " +
            "Confirme se o plugin está disponível no pacote gsap."
          );
        }
      } catch (e) {
        console.error("Erro ao carregar SplitText:", e);
      }
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!SplitText) return;
    if (typeof window === "undefined" || window.innerWidth < minWidth) return;

    const el = textRef.current;
    if (!el) return;

    const split = new SplitText(el, {
      type: splitType,
      linesClass: "line",
    });

    const tl = gsap.timeline({
      defaults: { duration: 0.35, ease: "power4.out" },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });

    const targets = (split.words?.length ? split.words : split.lines) ?? [el];

    tl.from(targets, { yPercent: 100, opacity: 0, stagger: 0.025 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      split.revert();
    };
  }, [SplitText, minWidth, splitType]);

  return <div ref={textRef} className="split-text">{children}</div>;
};

export default SplitAnimation;
