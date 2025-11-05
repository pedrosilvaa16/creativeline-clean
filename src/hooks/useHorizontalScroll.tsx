import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useHorizontalScroll = () => {
    const animationRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        // ✅ Use matchMedia for better performance
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const sections = gsap.utils.toArray<HTMLElement>(".panel");
            const container = document.querySelector<HTMLDivElement>(".thecontainer");

            if (container && sections.length > 0) {
                animationRef.current = gsap.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        pin: true,
                        scrub: 1,
                        end: () => `+=${container.offsetWidth}`,
                    },
                });
            }
        });

        // ✅ Cleanup
        return () => {
            mm.revert(); // Cleans up all matchMedia animations
        };
    }, []);
};

export default useHorizontalScroll;