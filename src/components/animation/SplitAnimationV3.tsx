"use client"
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SplitText } from "../../types/SplitText.min.js";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface SplitAnimationProps {
    children: React.ReactNode;
}

const SplitAnimationV3 = ({ children }: SplitAnimationProps) => {
    const textRef = useRef<HTMLDivElement | null>(null);
    const [SplitTextConstructor, setSplitTextConstructor] = useState<typeof SplitText | null>(null);

    // Dynamically import SplitText
    useEffect(() => {
        const loadSplitText = async () => {
            try {
                const splitTextModule = await import("../../types/SplitText.min.js");
                setSplitTextConstructor(() => splitTextModule.SplitText);
            } catch (error) {
                console.error("Error loading SplitText:", error);
            }
        };
        loadSplitText();
    }, []);

    // Run the animation once SplitText is loaded
    useEffect(() => {
        if (SplitTextConstructor && typeof window !== "undefined" && window.innerWidth > 1023) {
            const el = textRef.current;
            if (el) {
                const splitEl = new SplitTextConstructor(el, {
                    type: "lines, words",
                    linesClass: "line",
                });

                const splitTl = gsap.timeline({
                    duration: 0.35,
                    ease: "power4",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                    },
                });

                splitTl.from(splitEl.words, {
                    yPercent: 100,
                    stagger: 0.025,
                });

                return () => {
                    splitEl.revert();
                    splitTl.kill();
                    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
                };
            }
        }
    }, [SplitTextConstructor]);

    return <h2 ref={textRef} className="title-left split-text">{children}</h2>;
};

export default SplitAnimationV3;