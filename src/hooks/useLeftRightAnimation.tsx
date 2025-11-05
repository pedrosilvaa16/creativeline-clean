import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useLeftRightAnimation = () => {
    const containerRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        // ✅ Create GSAP context for scoped animations (modern React approach)
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            if (!container) return;

            gsap.set(container, { autoAlpha: 0, xPercent: -20 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse",
                },
            }).to(container, {
                duration: 0.8,
                autoAlpha: 1,
                xPercent: 0,
                ease: "power2.out",
                clearProps: "all",
            });
        });

        // ✅ Automatically cleans up all ScrollTriggers & animations on unmount
        return () => ctx.revert();
    }, []);

    return containerRef;
};

export default useLeftRightAnimation;
