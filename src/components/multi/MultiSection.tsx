"use client";
import { useRef } from "react";
import useHorizontalScroll from "@/hooks/useHorizontalScroll";
import ExpertiseV1 from "../expertise/ExpertiseV1";
import ProjectIdeaV1 from "../project/ProjectIdeaV1";
import WhyChooseV1 from "../whyChoose/WhyChooseV1";

const MultiSection = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  useHorizontalScroll(wrapRef);

  return (
    <section className="multi-section" ref={wrapRef}>
      <div className="thecontainer">
        <div className="panel"><WhyChooseV1 /></div>
        <div className="panel bg-gray"><ExpertiseV1 /></div>
        <div className="panel contact-panel"><ProjectIdeaV1 /></div>
      </div>
    </section>
  );
};

export default MultiSection;
