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
  /** breakpoint mínimo para aplicar o efeito (lg por defeito) */
  minWidth?: number;
  /** tipos de split: "chars", "words", "lines" (pode combinar com vírgulas) */
  splitType?: string;
}

const SplitAnimation = ({
  children,
  minWidth = 1024,
  splitType = "lines, words",
}: SplitAnimationProps) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [SplitText, setSplitText] = useState<SplitTextCtor | null>(null);

  // tenta importar SplitText a partir dos caminhos conhecidos do gsap.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // 1) tentativa padrão (build moderno)
        let mod: any;
        try { mod = await import("gsap/SplitText"); } catch {}
        // 2) fallback para dist (alguns bundlers)
        if (!mod?.SplitText) { try { mod = await import("gsap/dist/SplitText"); } catch {} }
        // 3) fallback para um ficheiro local caso o tenha (opcional)
        if (!mod?.SplitText) { try { mod = await import("@/lib/gsap/SplitText.min.js"); } catch {} }

        if (alive && mod?.SplitText) {
          gsap.registerPlugin(mod.SplitText);
          setSplitText(() => mod.SplitText as SplitTextCtor);
        } else if (alive) {
          console.warn(
            "[SplitAnimation] Não foi possível carregar o SplitText. " +
            "Confirme se o plugin está disponível (gsap/SplitText ou gsap/dist/SplitText " +
            "ou coloque um ficheiro local em src/lib/gsap/SplitText.min.js)."
          );
        }
      } catch (e) {
        console.error("Erro ao carregar SplitText:", e);
      }
    })();
    return () => { alive = false; };
  }, []);

  // animação quando o SplitText estiver disponível
  useEffect(() => {
    if (!SplitText) return;
    if (typeof window === "undefined" || window.innerWidth < minWidth) return;

    const el = textRef.current;
    if (!el) return;

    // dividir o elemento
    const split = new SplitText(el, {
      type: splitType, // "lines, words" por defeito
      linesClass: "line", // útil para overflow hidden por linha
    });

    // timeline + ScrollTrigger
    const tl = gsap.timeline({
      defaults: { duration: 0.35, ease: "power4.out" },
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });

    // anima palavras (se existir) ou fallback para linhas
    const targets = (split.words?.length ? split.words : split.lines) ?? [el];

    tl.from(targets, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.025,
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      // reverte as alterações DOM feitas pelo SplitText
      split.revert();
    };
  }, [SplitText, minWidth, splitType]);

  return <div ref={textRef} className="split-text">{children}</div>;
};

export default SplitAnimation;
