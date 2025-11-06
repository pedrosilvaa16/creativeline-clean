// /src/components/videos/ZoomVideoV1.tsx
"use client";

import { useLayoutEffect, useRef } from "react";

export default function ZoomVideoV1() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    let ctx: any;
    let cleanupLoaded: (() => void) | undefined;

    (async () => {
      // importa GSAP só no cliente
      const core = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      const gsap = (core as any).gsap || (core as any).default || core;
      const ScrollTrigger = (st as any).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const container = wrapRef.current;
      const video = videoRef.current;
      const content = contentRef.current;
      if (!container || !video || !content) return;

      // se o user prefere menos movimento: não anima, mas mostra o vídeo normalmente
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // estado inicial
      gsap.set(video, { scale: 0.5, transformOrigin: "50% 50%" });
      gsap.set(content, { xPercent: -40 });

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // markers: true, // ative para depurar
          },
        });

        tl.to(video, { scale: 1, ease: "none" })
          .to(content, { xPercent: 0, ease: "none" }, "<");
      }, wrapRef);

      const onLoaded = () => ScrollTrigger.refresh();
      video.addEventListener("loadeddata", onLoaded);
      cleanupLoaded = () => video.removeEventListener("loadeddata", onLoaded);

      const ro = new ResizeObserver(() => ScrollTrigger.refresh());
      ro.observe(document.documentElement);

      // cleanup
      return () => {
        cleanupLoaded?.();
        ro.disconnect();
        ctx?.revert?.();
      };
    })();

    return () => {
      cleanupLoaded?.();
      ctx?.revert?.();
    };
  }, []);

  // 👉 Render SEMPRE (mesmo se GSAP falhar, o vídeo aparece)
  return (
    <section className="zoom-video-area">
      <div className="video-container" ref={wrapRef}>
        <video
          ref={videoRef}
          loop
          muted
          autoPlay
          playsInline
          preload="auto"
          // controls // <- descomenta para depurar rapidamente
          style={{ display: "block" }}
        >
          <source src="/assets/video/2.mp4" type="video/mp4" />
        </video>

        <div className="video-items">
          <div className="content" ref={contentRef}>
            <h2>
              Marketing{" "}
              <strong>
                Agency <i className="fas fa-star-of-life" />
              </strong>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
