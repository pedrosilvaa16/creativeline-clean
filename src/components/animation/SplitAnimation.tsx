"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Vars mínimas para o SplitText que usamos (compatível com GSAP). */
type SplitVars = {
  /** "chars" | "words" | "lines" (podes combinar com vírgulas) */
  type: string;
  linesClass?: string;
  [k: string]: unknown;
};

/** Forma mínima do SplitText que precisamos (método revert e coleções). */
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
  /** breakpoint mínimo para aplicar o efeito */
  minWidth?: number;
  /** "chars", "words", "lines" (pode combinar com vírgulas) */
  splitType?: string;
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
        // Não tipamos o módulo diretamente para evitar conflitos com o tipo oficial do GSAP.
        let mod: unknown;

        try {
          mod = await import("gsap/SplitText");
        } catch {
          // fallback para builds que expõem em /dist
        }
        if (!mod) {
          try {
            mod = await import("gsap/dist/SplitText");
          } catch {
            // fica undefined se não existir
          }
        }

        // Extrai SplitText do módulo desconhecido de forma segura
        const maybeCtor =
          (mod as Record<string, unknown> | undefined)?.["SplitText"];

        if (alive && typeof maybeCtor === "function") {
          // registar plugin e guardar o construtor com o nosso tipo mínimo
          gsap.registerPlugin(maybeCtor as any);
          setSplitText(() => maybeCtor as SplitTextCtor);
        } else if (alive) {
          console.warn(
            "[SplitAnimation] Não foi possível carregar o SplitText do GSAP."
          );
        }
      } catch (e) {
        console.error("Erro ao carregar SplitText:", e);
      }
    })();

    return () => {
      alive = false;
    };
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

  return (
    <div ref={textRef} className="split-text">
      {children}
    </div>
  );
};

export default SplitAnimation;
