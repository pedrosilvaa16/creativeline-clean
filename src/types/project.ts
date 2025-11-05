// src/types/project.ts
export type ProjectImage = {
  url: string;
  alt?: string | null;
};

export type ProjectSection = {
  title?: string | null;     // só para labeling interno (ex.: “Contexto”)
  html?: string | null;      // WYSIWYG do WP
};

export type ProjectModel = {
  slug: string;
  title: string;
  summary?: string | null;
  hero?: ProjectImage | null;
  gallery?: ProjectImage[];
  background?: ProjectSection | null;  // sectionBackground
  challenges?: ProjectSection | null;  // sectionChallenges
  solution?: ProjectSection | null;    // sectionSolution
  projectUrl?: string | null;
  date?: string | null;                // se quiseres exibir
  tag?: string | null;                 // opcional (para chips)
};
