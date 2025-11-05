// src/components/dixor/ProjectHero.tsx
import Image from "next/image";
import { ProjectModel } from "@/types/project";

export default function ProjectHero({ project }: { project: ProjectModel }) {
  return (
    <div className="project-details-thumb">
      {project.hero?.url ? (
        <Image
          src={project.hero.url}
          alt={project.hero.alt || project.title}
          width={1920}
          height={1080}
          style={{ width: "100%", height: "auto" }}
        />
      ) : null}
      <div className="project-details-main-info">
        <h2 className="title">{project.title}</h2>
        {project.summary ? <p className="mt-15">{project.summary}</p> : null}
      </div>
    </div>
  );
}
