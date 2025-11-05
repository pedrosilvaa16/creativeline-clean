// src/components/common/ModalVideo.tsx
"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type Channel = "youtube" | "vimeo";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  channel?: Channel;
  videoId: string;
  autoplay?: boolean;   // opcional
  title?: string;       // <- adicionar esta prop
};

function buildSrc(channel: Channel, id: string, autoplay: boolean) {
  if (channel === "vimeo") {
    const ap = autoplay ? 1 : 0;
    return `https://player.vimeo.com/video/${id}?autoplay=${ap}&muted=0&byline=0&portrait=0`;
  }
  const ap = autoplay ? 1 : 0;
  return `https://www.youtube.com/embed/${id}?autoplay=${ap}&rel=0&modestbranding=1`;
}

export default function ModalVideo({
  isOpen,
  onClose,
  channel = "youtube",
  videoId,
  autoplay = true,
  title = "Video modal",
}: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const src = buildSrc(channel, videoId, autoplay);

  const ui = (
    <div
      aria-modal="true"
      role="dialog"
      aria-label={title}
      className="cl-modalvideo__overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="cl-modalvideo__content">
        <button
          type="button"
          className="cl-modalvideo__close"
          aria-label="Fechar vídeo"
          onClick={onClose}
        >
          ×
        </button>

        <div className="cl-modalvideo__framewrap">
          <iframe
            className="cl-modalvideo__iframe"
            src={src}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title} // <- usar a prop
          />
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(ui, document.body) : null;
}
