"use client";

import { useMemo } from "react";
import Image from "next/image";

type MediaItem = {
  mediaItemUrl?: string | null;
  altText?: string | null;
  mediaDetails?: { width?: number | null; height?: number | null } | null;
};

type Orientation = "landscape" | "portrait" | "square";

type BaseCard = {
  orientation: Orientation;
};

type ImageCard = {
  type: "image";
  src: string;
  alt: string;
} & BaseCard;

type VideoCard = {
  type: "video";
  url: string;
} & BaseCard;

type Card = ImageCard | VideoCard;

function getOrientationFromMedia(m: MediaItem): Orientation {
  const w = m.mediaDetails?.width ?? 0;
  const h = m.mediaDetails?.height ?? 0;

  if (!w || !h) return "landscape";

  if (w === h) return "square";
  if (w > h) return "landscape";
  return "portrait";
}

export default function ClientGallery({
  images,
  videos,
}: {
  images: MediaItem[];
  videos: { url: string | null; file: string | null }[];
}) {
  const cards: Card[] = useMemo(() => {
    const isImageUrl = (url: string) =>
      /\.(jpe?g|jpeg|png|webp|gif|avif)$/i.test(url);

    const isVideoUrl = (url: string) =>
      /\.(mp4|mov|m4v|webm|ogg)$/i.test(url);

    // 1) Itens vindos da galeria de imagens do WP
    const imgCards: Card[] = images
      .map((m, i) => {
        if (!m?.mediaItemUrl) return null;

        const url = m.mediaItemUrl;

        if (isImageUrl(url)) {
          return {
            type: "image",
            src: url,
            alt: m.altText || `Gallery image ${i + 1}`,
            orientation: getOrientationFromMedia(m),
          } as ImageCard;
        }

        if (isVideoUrl(url)) {
          return {
            type: "video",
            url,
            orientation: getOrientationFromMedia(m),
          } as VideoCard;
        }

        return null;
      })
      .filter(Boolean) as Card[];

    // 2) Itens vindos do campo de vídeos (também do WP)
    const vidCards: Card[] = videos
      .map((v) => {
        const url = v.file || v.url;
        if (!url) return null;
        if (!isVideoUrl(url)) return null;

        // aqui assumimos landscape por defeito; se precisares, podes
        // passar dimensões também neste objecto e usar uma função semelhante
        return {
          type: "video",
          url,
          orientation: "landscape",
        } as VideoCard;
      })
      .filter(Boolean) as Card[];

    return [...imgCards, ...vidCards];
  }, [images, videos]);

  const rows = useMemo(() => {
    type Row = { layout: "full" | "two"; items: Card[] };

    const result: Row[] = [];

    const isVerticalish = (c: Card) =>
      c.orientation === "square" || c.orientation === "portrait";

    let i = 0;
    while (i < cards.length) {
      const current = cards[i];
      const next = cards[i + 1];

      // Duas peças quadradas/verticais seguidas → bloco de 2 colunas
      if (isVerticalish(current) && next && isVerticalish(next)) {
        result.push({ layout: "two", items: [current, next] });
        i += 2;
        continue;
      }

      // Caso contrário → full-width
      result.push({ layout: "full", items: [current] });
      i += 1;
    }

    return result;
  }, [cards]);

  return (
    <section className="project-details-items default-padding">
      <div className="container">
        <div className="gallery-rows">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`gallery-row gallery-row--${row.layout}`}
            >
              {row.items.map((c, idx) => {
                if (c.type === "image") {
                  return (
                    <figure key={idx} className="gallery-item">
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

                // c.type === "video"
                return (
                  <div key={idx} className="gallery-item">
                    <video
                      src={c.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`media-video media-video--${c.orientation}`}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Rebenta a .container para a galeria ocupar a largura total */
        :global(.project-details-items .container) {
          max-width: none;
          padding-left: 0;
          padding-right: 0;
        }

        .gallery-rows {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
          width: 100%;
        }

        .gallery-row {
          width: 100%;
        }

        .gallery-row--full {
          display: block;
        }

        .gallery-row--full .gallery-item {
          width: 100%;
        }

        .gallery-row--two {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.75rem;
          align-items: stretch;
        }

        .gallery-item {
          position: relative;
          width: 100%;
        }

        /* Imagens e vídeos: base visual */
        .gallery-item :global(img),
        .media-video {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 1.5rem;
          object-fit: cover;
          overflow: hidden;
        }

        /* IMAGENS */
        .gallery-item :global(img) {
          object-fit: cover;
        }

        /* VÍDEOS – proporção dinâmica */
        .media-video--landscape {
          aspect-ratio: 16 / 9;
        }

        .media-video--square {
          aspect-ratio: 1 / 1;
        }

        @media (max-width: 1024px) {
          .gallery-rows {
            gap: 3rem;
          }
        }

        @media (max-width: 768px) {
          .gallery-row--two {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .gallery-rows {
            gap: 2.25rem;
          }
        }
      `}</style>

    </section>
  );
}
