// src/components/dixor/ProjectGallery.tsx
import Image from "next/image";
import { ProjectModel } from "@/types/project";

export default function ProjectGallery({ project }: { project: ProjectModel }) {
  const images = project.gallery || [];
  if (!images.length) return null;

  return (
    <div className="single-grid">
      <div className="item-grid-colum">
        <div className="left-info">
          <h3>Galeria</h3>
        </div>
        <div className="right-info">
          <div className="thumb-grid">
            {images.map((img, i) => (
              <div className="project-details-thumb" key={`${img.url}-${i}`}>
                <Image
                  src={img.url}
                  alt={img.alt || project.title}
                  width={1400}
                  height={900}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
