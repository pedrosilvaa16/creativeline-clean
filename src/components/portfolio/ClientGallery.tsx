"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import ModalVideo from "@/components/common/ModalVideo";

type MediaItem = {
  mediaItemUrl?: string | null;
  altText?: string | null;
  mediaDetails?: { width?: number | null; height?: number | null } | null;
};

type Card =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: { type: "youtube" | "vimeo"; id: string }; poster?: string }
  | { type: "file"; url: string; poster?: string };

function parseVideoCard(
  v: { url: string | null; file: string | null },
  fallbackPoster?: string
): Card | null {
  if (v.url) {
    // YouTube
    if (v.url.includes("youtube.com") || v.url.includes("youtu.be")) {
      const id = v.url.includes("youtu.be")
        ? (v.url.split("/").pop() || "").split("?")[0]
        : new URL(v.url).searchParams.get("v") || "";
      if (id) return { type: "video", src: { type: "youtube", id }, poster: fallbackPoster };
    }
    // Vimeo
    if (v.url.includes("vimeo.com")) {
      const id = v.url.split("/").filter(Boolean).pop() || "";
      if (id) return { type: "video", src: { type: "vimeo", id }, poster: fallbackPoster };
    }
  }
  // Ficheiro local
  if (v.file) return { type: "file", url: v.file, poster: fallbackPoster };
  return null;
}

export default function ClientGallery({
  images,
  videos,
  fallbackPoster,
}: {
  images: MediaItem[];
  videos: { url: string | null; file: string | null }[];
  fallbackPoster?: string;
}) {
  const [open, setOpen] = useState<{ type: "youtube" | "vimeo"; id: string } | null>(null);

  const cards: Card[] = useMemo(() => {
    const imgCards: Card[] = images
      .map((m, i) =>
        m?.mediaItemUrl
          ? ({
              type: "image",
              src: m.mediaItemUrl,
              alt: m.altText || `Gallery image ${i + 1}`,
            } as const)
          : null
      )
      .filter(Boolean) as Card[];

    const vidCards: Card[] = videos
      .map((v) => parseVideoCard(v, fallbackPoster))
      .filter(Boolean) as Card[];

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

            if (c.type === "video") {
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
                    <span className="play-badge" aria-hidden>
                      ▶
                    </span>
                  </button>
                </div>
              );
            }

            // c.type === "file"
            return (
              <div key={idx} className="masonry-item">
                <a
                  className="video-card w-100 rounded overflow-hidden shadow-sm position-relative"
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open video file"
                >
                  {c.poster ? (
                    <Image
                      src={c.poster}
                      alt="Video file cover"
                      width={900}
                      height={900}
                      className="w-100 h-auto object-cover"
                    />
                  ) : (
                    <div style={{ aspectRatio: "16/9" }} />
                  )}
                  <span className="play-badge" aria-hidden>
                    ▶
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal para YouTube/Vimeo */}
      {open && (
        <ModalVideo
          isOpen={true}
          onClose={() => setOpen(null)}
          channel={open.type}
          videoId={open.id}
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
        .masonry { column-width: 22rem; column-gap: 1.5rem; }
        @media (max-width: 575.98px) { .masonry { column-width: 18rem; } }
        .masonry-item {
          break-inside: avoid; -webkit-column-break-inside: avoid;
          margin: 0 0 1.5rem; display: block;
        }
        .masonry-item > :global(img),
        .masonry-item .video-card {
          width: 100%; height: auto; display: block;
          border-radius: 0.5rem; overflow: hidden;
        }
      `}</style>
    </section>
  );
}
