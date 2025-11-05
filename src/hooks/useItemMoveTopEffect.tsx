"use client"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useItemMoveTopEffect = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll<HTMLElement>(".item-move-top-item");
        if (items.length === 0) return;

        const pbmitHeight = items[0].offsetHeight + 120;
        const spacer = 0;

        ScrollTrigger.matchMedia({
            "(min-width: 992px)": () => {
                items.forEach((item, i) => {
                    gsap.set(item, { top: i * 0 });

                    gsap.to(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom-=100",
                            end: "top top+=0",
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                        ease: "none",
                        scale: () => 1 - (items.length - i) * 0.0,
                    });

                    ScrollTrigger.create({
                        trigger: item,
                        start: "top 140px",
                        endTrigger: container,
                        end: `bottom top+=${pbmitHeight + items.length * spacer}`,
                        pin: true,
                        pinSpacing: false,
                    });
                });
            },
            "(max-width: 1025px)": () => {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
        };
    }, []);

    return containerRef;
};

export default useItemMoveTopEffect;
