// /src/hooks/useHorizontalScroll.tsx
import { RefObject, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useHorizontalScroll = (wrapRef: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!wrapRef.current) return;

    const mm = gsap.matchMedia();
    let ctx: gsap.Context | undefined;

    mm.add("(min-width: 1024px)", () => {
      const wrap = wrapRef.current!;
      const container = wrap.querySelector<HTMLDivElement>(".thecontainer");
      if (!container) return;

      ctx = gsap.context(() => {
        // panéis dentro deste wrapper
        const sections = gsap.utils.toArray<HTMLElement>(".panel");
        if (!sections.length) return;

        // largura total do conteúdo horizontal
        const totalScroll = () =>
          Math.max(container.scrollWidth - window.innerWidth, 0);

        // layout flex horizontal (garantia adicional)
        gsap.set(container, { display: "flex" });
        gsap.set(sections, { flex: "0 0 100vw", height: "100vh" });

        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,           // pin no wrapper
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            pinSpacing: true,        // mantém espaço para a secção seguinte
            end: () => `+=${totalScroll()}`, // **correto** p/ horizontal
            invalidateOnRefresh: true,
            // markers: true,
          },
        });
      }, wrapRef);
    });

    // cleanup
    return () => {
      mm.revert();
      ctx?.revert();
    };
  }, [wrapRef]);
};

export default useHorizontalScroll;
