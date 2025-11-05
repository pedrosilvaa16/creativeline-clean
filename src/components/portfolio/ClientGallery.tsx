"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import ModalVideo from "@/components/common/ModalVideo";

type MediaItem = {
  mediaItemUrl?: string | null;
  altText?: string | null;
  mediaDetails?: { width?: number | null; height?: number | null } | null;
};

export default function ClientGallery({
  images,
  videos,
  fallbackPoster,
}: {
  images: MediaItem[];
  videos: { url: string | null; file: string | null }[];
  fallbackPoster?: string;
}) {
  const [open, setOpen] = useState<string | null>(null);

  const cards = useMemo(() => {
    const imgCards =
      images.map((m, i) =>
        m?.mediaItemUrl
          ? { type: "image" as const, src: m.mediaItemUrl, alt: m.altText || `Gallery image ${i + 1}` }
          : null
      ).filter(Boolean) as { type: "image"; src: string; alt: string }[];

    const vidCards =
      videos.map((v, i) => {
        if (v.url) {
          if (v.url.includes("youtube.com") || v.url.includes("youtu.be")) {
            const id =
              v.url.includes("youtu.be")
                ? v.url.split("/").pop()
                : new URL(v.url).searchParams.get("v");
            if (id) return { type: "video" as const, src: `youtube:${id}`, poster: fallbackPoster };
          }
          if (v.url.includes("vimeo.com")) {
            const id = v.url.split("/").filter(Boolean).pop();
            if (id) return { type: "video" as const, src: `https://player.vimeo.com/video/${id}?autoplay=1`, poster: fallbackPoster };
          }
        }
        if (v.file) {
          return { type: "video" as const, src: v.file, poster: fallbackPoster };
        }
        return null;
      }).filter(Boolean) as { type: "video"; src: string; poster?: string }[];

    return [...imgCards, ...vidCards];
  }, [images, videos, fallbackPoster]);

  return (
    <section className="project-details-items default-padding">
      <div className="container">
        <div className="masonry">
            {cards.map((c, idx) => {
                if (c.type === "image") {
                    return (
                        <figure key={idx} className="masonry-item">
                            <Image
                                src={c.src}
                                alt={c.alt}
                                width={900}
                                height={900}
                                className="w-100 h-auto object-cover"
                            />
                        </figure>
                    );
                }
                // vídeo
                return (
                <div key={idx} className="masonry-item">
                    <button
                    type="button"
                    className="video-card w-100 rounded overflow-hidden shadow-sm position-relative"
                    onClick={() => setOpen(c.src)}
                    aria-label="Play video"
                    >
                    {c.poster ? (
                        <Image
                        src={c.poster}
                        alt="Video cover"
                        width={900}
                        height={900}
                        className="w-100 h-auto object-cover"
                        />
                    ) : (
                        <div style={{ aspectRatio: "16/9" }} />
                    )}
                    <span className="play-badge" aria-hidden>▶</span>
                    </button>
                </div>
                );
            })}
            </div>
      </div>

      {open && (
        <ModalVideo
          open={true}
          onClose={() => setOpen(null)}
          src={open}
          title="Gallery video"
        />
      )}

      <style jsx>{`
        .video-card { cursor: pointer; }
        .video-card .play-badge {
          position: absolute; inset: 0; display: grid; place-items: center;
          font-size: 42px; color: white; text-shadow: 0 2px 10px rgba(0,0,0,.6);
        }
        .video-card:hover .play-badge { transform: scale(1.08); }
        .masonry {
        /* deixa o browser decidir quantas colunas cabem */
        column-width: 22rem;      /* ~352px, ajusta ao gosto */
        column-gap: 1.5rem;       /* espaçamento horizontal */
        }

        @media (max-width: 575.98px) {
        .masonry { column-width: 18rem; } /* força menos colunas no mobile estreito */
        }

        .masonry-item {
        break-inside: avoid;          /* evita quebras no meio do item */
        -webkit-column-break-inside: avoid;
        margin: 0 0 1.5rem;           /* espaçamento vertical entre itens */
        display: block;
        }

        /* garantir que as media ocupam a coluna toda */
        .masonry-item > :global(img),
        .masonry-item .video-card {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 0.5rem;
        overflow: hidden;
        }
      `}</style>
    </section>
  );
}
