import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useUpDownScroll = <T extends HTMLElement>(ref: React.RefObject<T>) => {
    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.set(ref.current, { yPercent: 80 });

            gsap.to(ref.current, {
                yPercent: -80,
                ease: "none",
                scrollTrigger: {
                    trigger: ref.current,
                    end: "bottom center",
                    scrub: 1,
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [ref]);
};

export default useUpDownScroll;