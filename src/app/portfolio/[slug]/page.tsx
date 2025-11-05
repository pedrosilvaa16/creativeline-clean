import { notFound } from "next/navigation";
import ClientGallery from "@/components/portfolio/ClientGallery";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./styles.module.css";

import { getClient } from "@/lib/apollo";
import { GET_PORTFOLIO_ITEM, GET_PORTFOLIO_LIST } from "@/graphql/portfolio";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import ThemeDark from "@/components/switcher/ThemeDark";
import ModalVideo from "@/components/common/ModalVideo";

export const revalidate = 60;

/* ----------------------- Tipos ----------------------- */
type MediaItem = {
  mediaItemUrl?: string | null;
  altText?: string | null;
  mediaDetails?: { width?: number | null; height?: number | null } | null;
};

type GalleryEdge = { node?: MediaItem | null };

type PortfolioFields = {
  clientName?: string | null;
  projectTagline?: string | null;
  summary?: string | null;

  heroImage?: { node?: MediaItem | null } | null;

  sideBlock?: {
    sideText?: string | null;
    leftImage?: { node?: MediaItem | null } | null;
    rightImage?: { node?: MediaItem | null } | null;
  } | null;

  gallery?: { edges?: GalleryEdge[] | null } | null;

  mediaVideos?: {
    videoUrl?: string | null;
    videoFile?: { node?: MediaItem | null } | null;
  }[] | null;

  poster?: { node?: MediaItem | null } | null;
};

/** ⬇️ Termos da taxonomia PORTFOLIOCATEGORY */
type TermNode = { id: string; name?: string | null; slug?: string | null; uri?: string | null };

type PortfolioItemResponse = {
  portfolio?: {
    id: string;
    slug: string;
    title: string;
    portfolioFields?: PortfolioFields | null;
    /** ⬇️ Adicionamos os termos da taxonomia ao tipo */
    terms?: { nodes?: TermNode[] | null } | null;
  } | null;
};

type PortfolioListResponse = {
  portfolios?: { nodes?: { slug: string }[] | null } | null;
};

/* ----------------------- SSG ----------------------- */
export async function generateStaticParams() {
  const client = getClient();
  const { data } = await client.query<PortfolioListResponse>({
    query: GET_PORTFOLIO_LIST,
  });
  const nodes = data?.portfolios?.nodes ?? [];
  return nodes.filter(n => !!n?.slug).slice(0, 50).map(n => ({ slug: n.slug }));
}

/* ----------------------- SEO ----------------------- */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient();
  const { data } = await client.query<PortfolioItemResponse>({
    query: GET_PORTFOLIO_ITEM,
    variables: { slug },
  });

  const p = data?.portfolio;
  if (!p) return { title: "Project not found" };

  const f = p.portfolioFields || {};
  const title = f.clientName || p.title || "Project";
  const description = f.projectTagline || f.summary || "";

  const ogImage =
    f.heroImage?.node?.mediaItemUrl ||
    f.poster?.node?.mediaItemUrl ||
    f.gallery?.edges?.[0]?.node?.mediaItemUrl ||
    undefined;

  const baseUrl = "https://creativeline.pt";
  const fullUrl = `${baseUrl}/portfolio/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: `${baseUrl}/portfolio` },
      { "@type": "ListItem", position: 3, name: title, item: fullUrl },
    ],
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: "article",
      url: fullUrl,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    other: {
      "script:type": "application/ld+json",
      "script:innerHTML": JSON.stringify(jsonLd),
    },
  };
}

/* ----------------------- Página ----------------------- */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) return notFound();

  const client = getClient();
  const { data } = await client.query<PortfolioItemResponse>({
    query: GET_PORTFOLIO_ITEM,
    variables: { slug },
  });

  const p = data?.portfolio;
  if (!p) return notFound();

  const f = (p.portfolioFields || {}) as PortfolioFields;

  const title = f.clientName || p.title || "Project";
  const tagline = f.projectTagline || "";

  const hero = f.heroImage?.node || null;

  const left = f.sideBlock?.leftImage?.node || null;
  const right = f.sideBlock?.rightImage?.node || null;
  const sideText = f.sideBlock?.sideText || null;

  const galleryImages =
    (f.gallery?.edges || [])
      .map(e => e?.node)
      .filter(Boolean) as MediaItem[];

  const videos = (f.mediaVideos || []).map(v => ({
    url: v.videoUrl || null,
    file: v.videoFile?.node?.mediaItemUrl || null,
  }));

  /** ⬇️ Extrair a categoria (primeiro termo de PORTFOLIOCATEGORY) */
  const categories = (p.terms?.nodes ?? []).slice(0, 3); // até 3

  return (
    <>
      {/* ===== Breadcrumb ===== */}
      <Breadcrumb title={title} clientName={f.clientName || undefined} breadCrumb={f.clientName || p.title} />

      {/* ===== Hero opcional ===== */}
      {hero?.mediaItemUrl && (
        <section className="project-details-items default-padding-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="project-details-thumb mb-40">
                  <div className="ratio ratio-21x9 position-relative rounded-3 shadow-lg overflow-hidden">
                    <Image
                      src={hero.mediaItemUrl}
                      alt={hero.altText || `${title} — hero image`}
                      fill
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="object-fit-cover d-block"
                      style={{ objectPosition: "center center" }}
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Título/Tagline abaixo do hero */}
              <div className="col-lg-10 offset-lg-1">
                <div className="project-details-main-info">
                  <div className="project-single-tags">
                    {categories.length > 0 ? (
                      categories.map((t) => (
                        <Link key={t?.id || t?.slug}
                              href={t?.uri || "#"}
                              className="btn btn-lime btn-tag me-2">
                          {t?.name || "Uncategorized"}
                        </Link>
                      ))
                    ) : (
                      <span className="btn btn-lime btn-tag">Uncategorized</span>
                    )}
                  </div>

                  {tagline && <h2 className="title h2 mt-10 mb-20">{tagline}</h2>}
                  {f.summary && (
                    <div className="project-author-details mt-35">
                      <ul>
                        <li>
                          <div className="left-info"><h3>Client</h3></div>
                          <div className="right-info"><h3>{f.clientName || "—"}</h3></div>
                        </li>
                        <li>
                          <div className="left-info"><h3>Project Summary</h3></div>
                          <div className="right-info"><p>{f.summary}</p></div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== BLOCO 1 — duas imagens altas + texto lateral ===== */}
      {(left?.mediaItemUrl || right?.mediaItemUrl || sideText) && (
        <section className="project-details-items bg-gray default-padding">
          <div className="container">
            <div className="row align-items-start gx-3 gy-4">
              <div className="col-lg-3 d-flex">
                {left?.mediaItemUrl && (
                  <div className={`rounded overflow-hidden shadow-sm ${styles.sideCover}`}>
                    <Image
                      src={left.mediaItemUrl!}
                      alt={left.altText || "Left image"}
                      fill
                      sizes="(max-width: 991px) 100vw, 305px"
                      className={`${styles.objectFitCover} d-block`}
                    />
                  </div>
                )}
              </div>

              {/* ⬇️ Renderiza a da direita só se existir */}
              {right?.mediaItemUrl && (
                <div className={`rounded overflow-hidden shadow-sm ${styles.sideCover}`}>
                  <Image
                    src={right.mediaItemUrl}
                    alt={right.altText || "Right image"}
                    fill
                    sizes="(max-width: 991px) 100vw, 305px"
                    className={`${styles.objectFitCover} d-block`}
                  />
                </div>
              )}

              <div className="col-lg-6">
                <div className="ps-lg-4">
                  {tagline && <h2 className="h3 mb-3">{tagline}</h2>}
                  {sideText ? (
                    <div
                      className="text-lg leading-relaxed opacity-90"
                      dangerouslySetInnerHTML={{ __html: sideText }}
                    />
                  ) : (
                    <p className="opacity-75">Short project note goes here.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== BLOCO 2 — Galeria dinâmica (imagens + vídeos) ===== */}
      {(galleryImages.length > 0 || videos.length > 0) && (
        <ClientGallery
          images={galleryImages}
          videos={videos}
          fallbackPoster={f.poster?.node?.mediaItemUrl || undefined}
        />
      )}

      {/* ===== Navegação ===== */}
      <div className="project-pagination default-padding-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="project-paginvation-items">
                <div className="project-previous">
                  <Link href="/portfolio" scroll={false}>
                    <div className="icon"><i className="fas fa-angle-double-left" /></div>
                    <div className="nav-title">
                      <span>Back to Portfolio</span>
                      <h5>{title}</h5>
                    </div>
                  </Link>
                </div>
                <div className="project-all">
                  <Link href="/portfolio" scroll={false}><i className="fas fa-th-large" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ThemeDark />
    </>
  );
}
