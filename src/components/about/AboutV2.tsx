"use client";

import SplitAnimation from "../animation/SplitAnimation";
import Image from "next/image";
import banner1 from "@/assets/img/banner/1.jpg";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ModalVideo from "@/components/common/ModalVideo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "../counter/Counter";

gsap.registerPlugin(ScrollTrigger);

const AboutV2 = () => {
  const [isOpen, setOpen] = useState(false);
  const homeContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = homeContainerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.from(".home-container img, .home-container video", {
      width: "50%",
      duration: 1,
    }).to(".home-container img, .home-container video", {
      width: "100%",
      duration: 1,
    });

    tl.from(
      ".home-container .video",
      {
        opacity: 0,
        y: -100,
        duration: 1,
      },
      "<"
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div className="about-style-two-area default-padding-top overflow-hidden">
        <div className="container mb-80 mb-xs-50">
          <div className="row align-center">
            <div className="col-lg-5">
              <div className="about-style-two-info pr-50 pr-md-15 pr-xs-15">
                <h4 className="sub-title">About Us</h4>
                <h2 className="title">Best Modern Digital Agency.</h2>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="experience-card">
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer">
                      <Counter end={38} />
                    </div>
                    <div className="operator">K</div>
                  </div>
                  <span className="medium">Completed Projects</span>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 pl-50 pl-md-15 pl-xs-15">
              <SplitAnimation>
                <p className="split-text">
                  Diasert carets dolor sit amet consectetur adipisicing elit. Deserunt ullam
                  laboriosam, excepturi quibusdam ipsa sed maiores illo qui vel dicta impedit nobis
                  sapiente culpa non quis provident ex facilis voluptates.
                </p>
              </SplitAnimation>
              <Link className="btn-animation mt-10" href="/about-us">
                <i className="fas fa-arrow-right" /> <span>Know More</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="home-container" ref={homeContainerRef}>
            <Image src={banner1} alt="Image Not Found" priority />
            <div className="video">
              <Link
                href="#"
                scroll={false}
                className="popup-youtube video-play-button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                <i className="fas fa-play" />
                <div className="effect" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <ModalVideo
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        channel="youtube"
        videoId="izTDbJ23_ws"
        title="About video"
      />
    </>
  );
};

export default AboutV2;
