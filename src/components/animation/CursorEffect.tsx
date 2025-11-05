"use client";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

const CursorEffect = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const mouse = useRef({ x: 0, y: 0 });

    const animateFollower = useCallback(() => {
        pos.current.x += (mouse.current.x - pos.current.x) / 9;
        pos.current.y += (mouse.current.y - pos.current.y) / 9;

        if (cursorRef.current && followerRef.current) {
            gsap.set(followerRef.current, {
                left: pos.current.x - 20,
                top: pos.current.y - 20,
            });
            gsap.set(cursorRef.current, {
                left: mouse.current.x,
                top: mouse.current.y,
            });
        }

        requestAnimationFrame(animateFollower);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.pageX;
            mouse.current.y = e.pageY;
        };

        document.addEventListener("mousemove", handleMouseMove);
        animateFollower();

        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [animateFollower]);

    return (
        <div className="cursor-hover-parent">
            <div className="cursor" ref={cursorRef} />
            <div className="cursor-follower" ref={followerRef} />
        </div>
    );
};

export default CursorEffect;