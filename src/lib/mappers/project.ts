// src/lib/mappers/project.ts
import { ProjectModel } from "@/types/project";

type WPGetPortfolioItem = {
  portfolio: {
    slug: string;
    title: string;
    date?: string | null;
    portfolioFields?: {
      summary?: string | null;
      heroImage?: { node?: { mediaItemUrl?: string | null } | null } | null;
      gallery?: { edges?: Array<{ node?: { mediaItemUrl?: string | null } | null }> | null } | null;
      sectionBackground?: string | null;
      sectionChallenges?: string | null;
      sectionSolution?: string | null;
      projectUrl?: string | null;
    } | null;
  } | null;
};

export function mapWPPortfolioToProjectModel(data: WPGetPortfolioItem): ProjectModel | null {
  const item = data?.portfolio;
  if (!item) return null;

  const f = item.portfolioFields ?? {};

  const heroUrl = f.heroImage?.node?.mediaItemUrl || null;
  const galleryUrls =
    (f.gallery?.edges ?? [])
      .map(e => e?.node?.mediaItemUrl)
      .filter(Boolean) as string[];

  return {
    slug: item.slug,
    title: item.title,
    date: item.date ?? null,
    summary: f.summary ?? null,
    hero: heroUrl ? { url: heroUrl, alt: item.title } : null,
    gallery: galleryUrls.map(url => ({ url, alt: item.title })),
    background: f.sectionBackground ? { title: "Contexto", html: f.sectionBackground } : null,
    challenges: f.sectionChallenges ? { title: "Desafios", html: f.sectionChallenges } : null,
    solution: f.sectionSolution ? { title: "Solução", html: f.sectionSolution } : null,
    projectUrl: f.projectUrl ?? null,
    tag: null, // se mais tarde quiseres derivar de categoria/taxonomia
  };
}
