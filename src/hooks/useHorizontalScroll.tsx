import { RefObject, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 👇 aceita RefObject<HTMLDivElement | null>
const useHorizontalScroll = (wrapRef: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const mm = gsap.matchMedia();
    let ctx: gsap.Context | undefined;

    mm.add("(min-width: 1024px)", () => {
      const container = wrap.querySelector<HTMLDivElement>(".thecontainer");
      if (!container) return;

      ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".panel");
        if (!sections.length) return;

        const totalScroll = () =>
          Math.max(container.scrollWidth - window.innerWidth, 0);

        gsap.set(container, { display: "flex" });
        gsap.set(sections, { flex: "0 0 100vw", height: "100vh" });

        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            pinSpacing: true,
            end: () => `+=${totalScroll()}`,
            invalidateOnRefresh: true,
            // markers: true,
          },
        });
      }, wrapRef);
    });

    return () => {
      mm.revert();
      ctx?.revert();
    };
  }, [wrapRef]);
};

export default useHorizontalScroll;
